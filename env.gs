
function getPropertyTwitchClientId(){
  return getPropertyWrapper("TWITCH_CLIENT_ID");
}

function getPropertyTwitchClientSecret(){
  return getPropertyWrapper("TWITCH_CLIENT_SECRET");
}

function getPropertySpreadsheetId(){
  return getPropertyWrapper("SPREAD_SHEET_ID");
}

function getPropertyWrapper(name){
  return PropertiesService.getScriptProperties().getProperty(name);
}
