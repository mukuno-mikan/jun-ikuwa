const SHEET_NAME = 'viewer_counts';

function triggerGetTwitchStreams(){
  // APIからデータを取得する
  var response = getTwitchStreams(
    "user_login=kato_junichi0817"
    + "&user_login=yuyuta0702"
    + "&user_login=hanjoudesu"
    + "&user_login=oniyadayo"
  );
}

function writeDataToSheet(url) {
  // 実行日時を取得する
  var date = new Date();

  var formattedDate = date.toLocaleDateString(
    "ja-JP",
    { year: 'numeric', month: '2-digit', day: '2-digit' }
  );

  

    // const data = JSON.parse(response.getContentText());
  
  if (data.data.length > 0) {
    const creator = data.data;
    return creator;
  } else {
    return null;
  }
  

  // データをシートに書き込む
  for (var i = 0; i < data.length; i++) {
    let next_row = sheet.getLastRow() + 1;
    sheet.appendRow([
      data[i].user_name,
      data[i].viewer_count,
      '=IFERROR(B2-INDEX(B$1:B1,MAX(IF(A2=A$1:A1,ROW(A$1:A1)))),0)',
      formattedDate
    ]);
  }
}

function getSheet(){
  // シートを取得する
  var sheet = SpreadsheetApp.openById(SPREAD_SHEET_ID).getSheetByName(SHEET_NAME);

  // 存在しないときは、作成する
  if(sheet == null){
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName(sheetName);
    
    var header = [
      "user_name",
      "viewer_count",
      "difference_previous",
      "created_at"
    ];

    sheet.appendRow(header);
  }
  return sheet;
}
