var sheetId = "<Sheet ID>";
var sheet = SpreadsheetApp.openById(sheetId).getSheets();


function doGet(e) {
  return HtmlService.createHtmlOutputFromFile("index.html").setTitle("McDonald Daily Coupons");
}


function collect() {
  var curTime = new Date();

  sheet[0].getDataRange().getValues().
    forEach((account, rowIndex) => {
      if (rowIndex > 0) {
        if (Date.parse(curTime) > Number(account[4])) {
          var username = account[1], password = account[2], token = account[3];

          if (!checkToken(token)) {
            token = getToken(username, password);
            sheet[0].getRange(rowIndex + 1, 4).setValue(token);
          }

          sheet[0].getRange(rowIndex + 1, 6).setValue(lottery(token));
          sheet[0].getRange(rowIndex + 1, 5).setValue(Date.parse(Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd")) + 86400000);
        }
      }
    });

  sheet[0].getRange(1, 5).setValue(Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd"));

  updateList();
}


function updateList() {
  var cpnLength = -1;

  sheet[1].clearContents();
  sheet[1].getRange(1, 1).setValue("#");

  sheet[0].getDataRange().getValues().
    forEach((account, rowIndex) => {
      if (rowIndex > 0) {
        var username = account[1], password = account[2], token = account[3];
        if (!checkToken(token)) {
          token = getToken(username, password);
          sheet[0].getRange(rowIndex + 1, 4).setValue(token);
        }

        var sticker = getStickerNum(token);
        if (sticker[0] >= 0 && sticker[1] >= 0) {
          sheet[0].getRange(rowIndex + 1, 7).setValue(sticker[0]);
          sheet[0].getRange(rowIndex + 1, 8).setValue(sticker[1]);
        }

        sheet[1].getRange(rowIndex + 1, 1).setValue(rowIndex);

        getCouponList(token).
          forEach((coupon, cpnIndex) => {
            if (cpnIndex > cpnLength) {
              sheet[1].getRange(1, 2 + cpnIndex * 2).setValue("Coupon");
              sheet[1].getRange(1, 2 + cpnIndex * 2 + 1).setValue("Expire Date");
              cpnLength = cpnIndex;
            }

            sheet[1].getRange(rowIndex + 1, 2 + cpnIndex * 2).setValue(coupon[0]);
            sheet[1].getRange(rowIndex + 1, 2 + cpnIndex * 2 + 1).setValue(coupon[1]);
          });
      }
    });
}

function getStickerCoupon() {
  var cpnList = sheet[1].getDataRange().getValues(),
    list = []

  sheet[0].getDataRange().getValues().
    forEach((account, rowIndex) => {
      if (rowIndex > 0) {
        list.push([
          account[1].replace(/(?<=\d{4})\d{3}(?=\d{3})/, " *** "),
          account[6], account[7], cpnList[rowIndex].slice(1)]);
      }
    });

  return JSON.stringify(list);
}