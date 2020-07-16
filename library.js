var deviceId = "Awesome-Device",
  deviceUuid = "uu1d0f4we50med3v1ce",
  platform = "Virtual",
  osVersion = "10",
  appVersion = "2.2.1";


/* Remove coupon ID from the name */
function removeId(str) {
  str = str.split("G")[0];
  if ("_( ".indexOf(str[str.length - 1]) > -1) {
    str = str.substr(0, str.length - 1);
  }
  return str;
}

/* Post Mc-API Request */
function apiRequest(token, url) {
  var payload = {
    "access_token": token,
    "source_info": {
      "model_id": deviceId,
      "device_uuid": deviceUuid,
      "platform": platform,
      "os_version": osVersion,
      "app_version": "2.2.1",
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

/* MD5 function for GAS(GoogleAppsScript) */
/* Reference: https://gist.github.com/KEINOS/78cc23f37e55e848905fc4224483763d */
function MD5(input, isShortMode) {
  var isShortMode = !!isShortMode; // Be sure to be bool
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