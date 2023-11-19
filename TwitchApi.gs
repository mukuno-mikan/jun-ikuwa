const TWITCH_API_URL = 'https://api.twitch.tv/helix';

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

  options = {
    'method': 'get',
    'headers': {
      'Client-ID': TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${data.access_token}`
    }
  };

  return options;
}

function RunTwitch(url){
  const options = getTwitchAccessToken();

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());

  if (data.data.length > 0) {
    const creator = data.data[0];
    Logger.log(creator);
  } else {
    Logger.log('User not found.');
  }
}

// ユーザー情報取得
function getTwitchCreatorInfo(username) {
  const url = `${TWITCH_API_URL}/users?login=${username}`;
  RunTwitch(url);
}

// チャンネル情報取得
function getTwitchChannelsInfo(username) {
  const url = `${TWITCH_API_URL}/search/channels?query=${username}`;
  RunTwitch(url);
}

// 配信情報取得
function getTwitchStreamInfo(username) {
  const url = `${TWITCH_API_URL}/streams?user_login=${username}`;
  RunTwitch(url);
}

function debug(){
  getTwitchCreatorInfo("kato_junichi0817");
  
  getTwitchChannelsInfo("kato_junichi0817");
  // getTwitchChannelsInfo("oniyadayo");

  getTwitchStreamInfo("kato_junichi0817");
  // getTwitchStreamInfo("oniyadayo");
}

