var deviceId = "Awesome-Device",
  deviceUuid = "uu1d0f4we50med3v1ce",
  platform = "Virtual",
  osVersion = "10",
  appVersion = "2.2.1";


/* Remove coupon id */
function removeId(str) {
  if (str.indexOf("G") > 5) {
    str = str.split("G")[0];
    if ("_( ".indexOf(str[str.length - 1]) > -1) {
      str = str.substr(0, str.length - 1);
    }
  }
  else if (str.indexOf("G") > -1) {
    str = str.split(")")[1];
  }

  return str;
}

/* Post McdDaily-API Request */
function apiRequest(token, url) {
  var payload = {
    "access_token": token,
    "source_info": {
      "model_id": deviceId,
      "device_uuid": deviceUuid,
      "platform": platform,
      "os_version": osVersion,
      "app_version": appVersion,
      "device_time": Utilities.formatDate(new Date(), "Asia/Taipei", "yyyy/MM/dd HH:mm:ss")
    }
  };
  try {
    return JSON.parse(UrlFetchApp.fetch(url, { method: "POST", contentType: "application/json", payload: JSON.stringify(payload) }));
  }
  catch (e) {
    return "{'rc': 0}"
  }
}

/**
 * ------------------------------------------
 *   MD5 function for GAS(GoogleAppsScript)
 *
 * You can get a MD5 hash value and even a 4digit short Hash value of a string.
 * ------------------------------------------
 * Usage1:
 *   `=MD5("YourStringToHash")`
 *     or
 *   `=MD5( A1 )` with the same string at A1 cell
 *   result:
 *     `FCE7453B7462D9DE0C56AFCCFB756193`.
 *     For your sure-ness you can verify it in your terminal as below.
 *     `$ md5 -s "YourStringToHash"`
 * Usage2:
 *   `=MD5("YourStringToHash", true)` for short Hash
 *    result:
 *     `6MQH`
 *     Note that it has more conflict probability.
 *
 * How to install:
 *   Copy the scipt, pase it at [Tools]-[Script Editor]-[<YourProject>]
 *   or go https://script.google.com and paste it.
 *   For more details go:
 *     https://developers.google.com/apps-script/articles/
 * Latest version:
 *   https://gist.github.com/dotysan/36b99217fdc958465b62f84f66903f07
 * Author:
 *   KEINOS @ https://github.com/keinos
 * Reference and thanks to:
 *   https://stackoverflow.com/questions/7994410/hash-of-a-cell-text-in-google-spreadsheet
 * ------------------------------------------
 *
 * @param {(string|Bytes[])} input The value to hash.
 * @param {boolean} isShortMode Set true for 4 digit shortend hash, else returns usual MD5 hash.
 * @return {string} The hashed input
 * @customfunction
 *
 */
function MD5(input, isShortMode) {
  var isShortMode = (isShortMode == true) ? true : false;
  var txtHash = '';
  var rawHash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.MD5,
    input);
  if (!isShortMode) {
    for (i = 0; i < rawHash.length; i++) {
      var hashVal = rawHash[i];
      if (hashVal < 0) {
        hashVal += 256;
      };
      if (hashVal.toString(16).length == 1) {
        txtHash += '0';
      };
      txtHash += hashVal.toString(16);
    };
  } else {
    for (j = 0; j < 16; j += 8) {
      hashVal = (rawHash[j] + rawHash[j + 1] + rawHash[j + 2] + rawHash[j + 3])
        ^ (rawHash[j + 4] + rawHash[j + 5] + rawHash[j + 6] + rawHash[j + 7]);
      if (hashVal < 0) {
        hashVal += 1024;
      };
      if (hashVal.toString(36).length == 1) {
        txtHash += "0";
      };
      txtHash += hashVal.toString(36);
    };
  };
  // change below to "txtHash.toUpperCase()" if needed
  return txtHash.toLowerCase();
}