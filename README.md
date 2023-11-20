# jun-ikuwa
純いくわ。に付いて分析する。

# 導入
- `env.gs`に記載している、環境変数をGAS設定画面から設定する  

# レートリミット

## TwitchAPI
30 request / minutes  
https://dev.twitch.tv/docs/extensions/frontend-api-usage/#rate-limits

## GASのURL Fetch
13.88888888890 request / minutes
https://developers.google.com/apps-script/guides/services/quotas?hl=ja

# 容量

## Googleスプレッドシート
セル数、5,000,000が上限

## Googleドライブ
15GB
