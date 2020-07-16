# McDonald's Daily Coupon Collector
[![MyGet](https://img.shields.io/github/license/Hash7ag/mcddaily-collector)](https://github.com/Hash7ag/mcddaily-collector/blob/master/LICENSE)

自動化[麥當勞報報](https://www.mcdonalds.com.tw/tw/ch/promotion/news_mcddaily.html)抽取優惠卷應用

其它語言：[English](README.md)、繁體中文

## 介紹
- 本應用基於 [Google App Script](https://www.google.com/script/start/) 進行開發，每日自動化執行。
- 使用者可以使用自己 Google 帳號進行架設。

> 注意：本應用在未來隨時可能無法支援，因麥當勞報報已將簡易的 MD5 雜湊演算法換成 AES 加密演算法。

## 設置步驟
1. 在自己的 [Google Drive](http://drive.google.com/) 新增 Google 試算表，並新增第二工作表。
2. 於第一頁工作表輸入以下內容：

|   #   |   Username   |   Password   | Token | Last Update | Last Coupon | Expiring Sticker | Next Month Sticker |
| :---: | :----------: | :----------: | :---: | :---------: | :---------: | :--------------: | :----------------: |
|   1   | \<您的帳號\> | \<您的密碼\> |       |             |             |                  |                    |
|  ...  | \<更多帳號\> | \<更多密碼\> |       |             |             |                  |                    |
> 分別於 Username 欄位及 Password 欄位輸入麥當勞報報之帳號及密碼。
> 
> 剩餘空白欄位請保持空白，本應用會自動化填入內容。
3. 在自己的 [Google Drive](http://drive.google.com/) 新增 [Google App Script](https://www.google.com/script/start/) 專案。
4. 下載或複製本應用程式碼。
    ```sh
    git clone https://github.com/Hash7ag/mcddaily-collector.git
    ```
5. 將 `main.js` 第一行程式碼變數 `sheetId` 改成第一步驟所創建的[試算表 ID](https://developers.google.com/sheets/api/guides/concepts#spreadsheet_id)。
    ```javascript
    var sheetId = "<Sheet ID>";
    ```
6. 透過 [clasp](https://github.com/google/clasp) 或複製貼上，將`main.js`、`mcddaily-api.js`、`library.js`及`index.html` 上傳至第三步驟所創建的專案。
7. 透過[觸發條件](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually)每天呼叫 `collect` 函式進行優惠卷抽取。
8. 透過[觸發條件](https://developers.google.com/apps-script/guides/triggers/installable#managing_triggers_manually)每天（或每小時）呼叫 `updateList` 函式更新網頁優惠卷列表。
9. 將專案部屬為網路應用程式。
10. Enjoy！