// Twitch APIへのアクセストークンを取得する関数
function getTwitchAccessToken() {
  const url = 'https://id.twitch.tv/oauth2/token';
  const payload = {
    'client_id': TWITCH_CLIENT_ID,
    'client_secret': TWITCH_CLIENT_SECRET,
    'grant_type': 'client_credentials'
  };

  var options = {
    'method': 'post',
    'contentType': 'application/x-www-form-urlencoded',
    'payload': payload
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());

  return data.access_token;
}

// TwitchAPIを実行する
function RunTwitchHelixAPI(urlBelowHelix){
  const url = 'https://api.twitch.tv/helix' + urlBelowHelix;
  const accessToken = getTwitchAccessToken();

  const options = {
    'method': 'get',
    'headers': {
      'Client-ID': TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${accessToken}`
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response);

  return response;
}

/**
 * 全ストリームの一覧を取得する。
 * https://dev.twitch.tv/docs/api/reference/#get-streams
 */
function getTwitchStreams(query) {
  const urlBelowHelix = `/streams?` + query;
  return RunTwitchHelixAPI(urlBelowHelix);
}

// // ユーザー情報取得
// function getTwitchCreatorInfo(username) {
//   const url = `/users?login=${username}`;
//   RunTwitch(url);
// }

// // チャンネル情報取得
// function getTwitchChannelsInfo(username) {
//   const url = `/search/channels?query=${username}`;
//   RunTwitch(url);
// }

function debug(){
  // var data = getStream(
  //   "user_login=kato_junichi0817"
  //   + "&user_login=yuyuta0702"
  //   + "&user_login=hanjoudesu"
  //   + "&user_login=oniyadayo"
  // );

  var response = getTwitchStreams(
    "user_login=okinawapex"
    + "&user_login=petit2434"
    // + "&user_login=hanjoudesu"
    // + "&user_login=oniyadayo"
  );

}