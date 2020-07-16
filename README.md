# McDonald's Daily Coupon Collector
[![MyGet](https://img.shields.io/github/license/Hash7ag/mcddaily-collector)](https://github.com/Hash7ag/mcddaily-collector/blob/master/LICENSE)

The coupon collector for Taiwanese [McDonald's Daily](https://www.mcdonalds.com.tw/tw/ch/promotion/news_mcddaily.html) application.

Other Languages: English, [繁體中文](README.zh-tw.md)

## Introduction
- Collector is built on [Google App Script](https://www.google.com/script/start/), which can help us run the script every day.
- Everyone can use their own Google Account to launch Collector.

> Note: This script might stop working in the near future, as they have changed the hashing algorithm from simple MD5 to AES encryption + Base64 hashing using a differently formatted string.

## Setup
1. Create a spreadsheet in your [Google Drive](http://drive.google.com/), and add the second worksheets in it.
2. Edit the first worksheet as below:

|   #   |     Username      |     Password      | Token | Last Update | Last Coupon | Expiring Sticker | Next Month Sticker |
| :---: | :---------------: | :---------------: | :---: | :---------: | :---------: | :--------------: | :----------------: |
|   1   | \<Your Username\> | \<Your Password\> |       |             |             |                  |                    |
|  ...  | \<More Username\> | \<More Password\> |       |             |             |                  |                    |
> Fill your username and your password of each of McDonald's Daily at the username column and the password column.
> 
> Leave the blank cell empty, it will be automatically filled by Collector.
3. Create a [Google App Script](https://www.google.com/script/start/) project in your [Google Drive](http://drive.google.com/).
4. Download or clone the script of Collector.
    ```sh
    git clone https://github.com/Hash7ag/mcddaily-collector.git
    ```
5. Edit the variable `sheetId`, at the first line of `main.js`, to the [Spreadsheet ID](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id), which is created at Step1.
    ```javascript
    var sheetId = "<Sheet ID>";
    ```
6. Upload `main.js`, `mcddaily-api.js`, `library.js`, and `index.html` to the project created at step 3 via [clasp](https://github.com/google/clasp) or copy-paste.
7. Call the function `collect` every day to collect coupon via [Triggers](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually).
8. Call the function `updateList` every day(or hour) to update the coupon list which shows on web app via [Triggers](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually).
9. Deploy your project as a [web app](https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app).
10. Enjoy!