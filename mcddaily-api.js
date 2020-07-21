function getStickerNum(token) {
  try {
    var result = apiRequest(token, "https://api1.mcddailyapp.com/num/get_list"), num = [0, 0];

    if (result["rc"] != "1") throw "error";
    else {
      for (i in result["results"]["stickers"]) {
        var expireDate = Date.parse(result["results"]["stickers"][i]["object_info"]["expire_datetime"]),
          curMonth = Date.parse(Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy/MM/01 00:00:00"));
        //31 DAYS = 2678400000
        if (expireDate - curMonth <= 2678400000) num[0]++;
        else num[1]++;
      }
      return num;
    }
  }
  catch (e) {
    return [-1, -1]
  }
}


function getCouponList(token) {
  try {
    var result = apiRequest(token, "https://api1.mcddailyapp.com/coupon/get_list"), list = [];

    if (result["rc"] != "1") throw "error";
    else {
      for (i in result["results"]["coupons"]) {
        if ("redeem_datetime" in result["results"]["coupons"][i]) continue;

        else {
          var expireDate = Date.parse(result["results"]["coupons"][i]["object_info"]["redeem_end_datetime"]),
            curDate = Date.parse(Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy/MM/dd HH:mm:ss"));

          if (expireDate >= curDate) {
            var cpnName = removeId(result["results"]["coupons"][i]["object_info"]["title"]),
              cpnExpireTime = result["results"]["coupons"][i]["object_info"]["redeem_end_datetime"].split(" ")[0];

            list.push([cpnName, cpnExpireTime]);
          }
        }
      }
      return list;
    }
  }
  catch (e) {
    return [];
  }
}


function lottery(token) {
  try {
    var result = apiRequest(token, "https://api1.mcddailyapp.com/lottery/get_item");

    if (result["rc"] != "1") throw result["rm"];
    else {
      var item = "";
      if (Object.keys(result["results"])[0] == "coupon") {
        item = result["results"]["coupon"]["object_info"]["title"];
      }
      else {
        item = result["results"][Object.keys(result["results"])[0]]["object_info"]["title"];
      }
      return [true, removeId(item)];
    }
  }
  catch (e) {
    return [false, e.toString()];
  }
}


function checkToken(token) {
  var curTime = new Date(),
    payload = {
      "access_token": token,
      "OrderNo": deviceUuid + Utilities.formatDate(curTime, "Asia/Taipei", "yyyyMMddHHmmss"),
      "mask": MD5("Mc" + deviceUuid +
        Utilities.formatDate(curTime, "Asia/Taipei", "yyyyMMddHHmmss") +
        platform + osVersion + deviceId + deviceUuid +
        Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss") +
        appVersion + token + "Donalds"),
      "source_info": {
        "model_id": deviceId,
        "device_uuid": deviceUuid,
        "platform": platform,
        "os_version": osVersion,
        "app_version": appVersion,
        "device_time": Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss")
      }
    };
  try {
    var result = JSON.parse(UrlFetchApp.fetch("https://api.mcddaily.com.tw/verify_member_access_token",
      { method: "POST", contentType: "application/json", payload: JSON.stringify(payload) }));

    return result["rc"] == "1";
  }
  catch (e) {
    return false;
  }
}


function getToken(account, password) {
  var curTime = new Date(),
    payload = {
      "account": account,
      "password": password,
      "OrderNo": deviceUuid + Utilities.formatDate(curTime, "Asia/Taipei", "yyyyMMddHHmmss"),
      "mask": MD5("Mc" + deviceUuid +
        Utilities.formatDate(curTime, "Asia/Taipei", "yyyyMMddHHmmss") +
        platform + osVersion + deviceId + deviceUuid +
        Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss") +
        appVersion + account + password + "Donalds"),
      "source_info": {
        "model_id": deviceId,
        "device_uuid": deviceUuid,
        "platform": platform,
        "os_version": osVersion,
        "app_version": appVersion,
        "device_time": Utilities.formatDate(curTime, "Asia/Taipei", "yyyy/MM/dd HH:mm:ss")
      }
    };

  try {
    var result = JSON.parse(UrlFetchApp.fetch("https://api.mcddaily.com.tw/login_by_mobile",
      { method: "POST", contentType: "application/json", payload: JSON.stringify(payload) }));

    if (result["rc"] != "1") {
      return result["rm"];
    }
    else {
      return result["results"]["member_info"]["access_token"];
    }
  }
  catch (e) {
    return e.toString();
  }
}
