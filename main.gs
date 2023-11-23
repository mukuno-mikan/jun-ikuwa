const SHEET_NAME = 'viewer_counts';

function triggerGetTwitchStreams(){
  var response = getTwitchStreams(
    "user_login=kato_junichi0817"
    + "&user_login=yuyuta0702"
    + "&user_login=hanjoudesu"
    + "&user_login=oniyadayo"
    + "&user_login=euriece"
    + "&user_login=mokouliszt1"
  );

  // var response = getTwitchStreams(
  //   "user_login=cr_rion"
  //   + "&user_login=fa_inkya"
  //   // + "&user_login=hanjoudesu"
  //   // + "&user_login=oniyadayo"
  // );

  var data = checkAndFormatData(response);
  if(data == null) return;

  writeData(data);
}

function checkAndFormatData(data){
  // JSONをobjectで扱えるように変換
  const formattedData = JSON.parse(data.getContentText());
  Logger.log(formattedData.data);

  return formattedData.data.length >= 1 ? formattedData.data : null;
}

function writeData(data) {
  var sheet = getSheet();
  var timestamp = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

  // データをシートに書き込む
  for (var i = 0; i < data.length; i++) {
    let next_row = sheet.getLastRow() + 1;

    sheet.appendRow([
      data[i].user_name,
      data[i].viewer_count,
      // '=IFERROR(B2-INDEX(B$1:B1,MAX(IF(A2=A$1:A1,ROW(A$1:A1)))),0)',
      '=IFERROR(B' + next_row + '-INDEX(B$1:B' + (next_row - 1) + ',MAX(IF(A' + next_row + '=A$1:A' + (next_row - 1)+ ',ROW(A$1:A' + (next_row - 1) + ')))),0)',
      timestamp
    ]);
  }
}

function getSheet(){
  // シートを取得する
  var sheet = SpreadsheetApp.openById(getPropertySpreadsheetId()).getSheetByName(SHEET_NAME);

  // 存在しないときは、作成する
  if(sheet == null){
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName(SHEET_NAME);
    
    var header = [
      "user_name",
      "viewer_count",
      "difference_previous",
      "timestamp"
    ];

    sheet.appendRow(header);
  }
  return sheet;
}
