# 概要
人気配信者の加藤純一さんが配信を始めると、  
他の配信を見ている人が「純行くわ」と発言して加藤純一さんの配信を見に行く現象があります。

実際に何人ぐらいが流れているのかを調べてみました。

# 成果物
https://lookerstudio.google.com/reporting/ee45624d-5291-4713-b0bf-9a875c74752c/page/p_5gllpjoxbd

![スクリーンショット 2023-11-24 155247](https://github.com/mukuno-mikan/jun-ikuwa/assets/151359967/eefb7b57-dfd3-45b4-90bb-453b0057a603)


# 使用技術
<img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/twitch_tile_logo_icon_170382.png"  height="100"><!-- https://icon-icons.com/icon/twitch-tile-logo/170382 -->
<img src="https://cdn.icon-icons.com/icons2/3912/PNG/512/looker_logo_icon_247812.png"  height="100"><!-- https://icon-icons.com/icon/looker-logo/247812 -->
<img src="https://cdn.icon-icons.com/icons2/152/PNG/128/spreadsheets_21737.png"  height="100"><!-- https://icon-icons.com/icon/spreadsheets/20289 -->
<img src="https://cdn.icon-icons.com/icons2/2642/PNG/512/google_script_apps_logo_icon_159351.png"  height="100"><!-- https://icon-icons.com/icon/google-script-apps-logo/159351 -->


- [Twitch API(動画配信用PF(Twitch)の情報を取得)](https://dev.twitch.tv/docs/api/)
- [Looker Studio(BIツール)](https://www.plan-b.co.jp/blog/seo/31762/)
- [Google Spread Sheets(オンライン表計算ソフト)](https://www.stock-app.info/media/spreadsheet/)
- [Google Apps Script(ローコード プラットフォーム)](https://satori.marketing/marketing-blog/gas-introduction/)




# レートリミット
- [TwitchAPI ( 30 request / minutes )](https://dev.twitch.tv/docs/extensions/frontend-api-usage/#rate-limits)
- [GAS URL取得の呼び出し ( 13 request / minutes ← 20,000 / day)](https://developers.google.com/apps-script/guides/services/quotas?hl=ja)

# 容量
- Googleスプレッドシート(セル数、5,000,000が上限)
- Googleドライブ(15GB)
