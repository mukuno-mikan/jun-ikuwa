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
    const next_row = sheet.getLastRow() + 1;

    /**
     * 例）C7に入力されている式
     * =IFERROR(B8-INDEX(B$1:B7,MAX(IF(A8=A$1:A7,ROW(A$1:A7)))),0)
     * 
     * 前回差 = IFERROR(B8-[前回のviewer_count],0)
     * [前回のviewer_count] = INDEX(B$1:B7,[user_nameが一致する一番大きい行番号])
     * [user_nameが一致する一番大きい行番号] = MAX([user_nameが一致する行番号郡])
     * [user_nameが一致する行番号郡] = IF(A8=A$1:A7,ROW(A$1:A7))
     */
    let differencePreviousFormula = '=IFERROR(B' + next_row + '-INDEX(B$1:B' + (next_row - 1) + ',MAX(IF(A' + next_row + '=A$1:A' + (next_row - 1)+ ',ROW(A$1:A' + (next_row - 1) + ')))),0)';

    const startedAt = Utilities.formatDate(new Date(data[i].started_at), "Asia/Tokyo", "yyyy/MM/dd HH:mm:ss");

    sheet.appendRow([
      data[i].user_name,
      data[i].viewer_count,
      differencePreviousFormula,
      timestamp,
      startedAt
    ]);

    let difference_previous = sheet.getRange("C" + next_row).getValue();
    if(difference_previous == 0) return;

    /**
     * 前回の配信の最後の視聴者数との差を前回差としないようにする。
     * 
     * 例）C7に入力されている式
     * =IFERROR(IF(E8=INDEX(E$1:E7,MAX(IF(A8=A$1:A7,ROW(A$1:A7)))),difference_previous,0),0)
     * 
     * started_atが一致していたら、前回比を記載し、そうでなければ0を記載。 = IFERROR(IF(E8=[前回のstarted_at],difference_previous,0),0)
     * [前回のstarted_at] = INDEX(E$1:E7,[user_nameが一致する一番大きい行番号])
     */
    differencePreviousFormula = '=IFERROR(IF(E' + next_row + '=INDEX(E$1:E' + (next_row - 1) + ',MAX(IF(A' + next_row + '=A$1:A' + (next_row - 1)+ ',ROW(A$1:A' + (next_row - 1) + ')))),' + difference_previous + ',0),0)';
    sheet.getRange('C' + next_row).setFormula(differencePreviousFormula);

    difference_previous = sheet.getRange("C" + next_row).getValue();
    if(difference_previous == 0) return;

    /**
     * 配信開始直後の視聴者数増加を前回差としないようにする。
     * 
     * 例）C7に入力されている式
     * =IFERROR(IF(INDEX(B$1:B7,MAX(IF(A8=A$1:A7,ROW(A$1:A7))))<>0,difference_previous,0),0)
     * 
     * 前回のviewer_countが0でないとき、前回比を記載し、そうでなければ0を記載。 = IFERROR(IF([前回のviewer_count]<>0,difference_previous,0),0)
     * [前回のviewer_count] = INDEX(B$1:B7,[user_nameが一致する一番大きい行番号])
     */
    differencePreviousFormula = '=IFERROR(IF(INDEX(B$1:B' + (next_row - 1) + ',MAX(IF(A' + next_row + '=A$1:A' + (next_row - 1)+ ',ROW(A$1:A' + (next_row - 1) + '))))<>0,' + difference_previous + ',0),0)';
    sheet.getRange('C' + next_row).setFormula(differencePreviousFormula);

    difference_previous = sheet.getRange("C" + next_row).getValue();
    if(difference_previous == 0) return;

    /**
     * 配信開始直後の視聴者数増加を前回差としないようにする。
     * 
     * 例）C7に入力されている式
     * =IFERROR(IF(E8<>INDEX(E$1:E7,MAX(IF(A8=A$1:A7,ROW(A$1:A7)))),difference_previous,0),0)
     * 
     * viewer_countが一致しないとき、前回比を記載し、そうでなければ0を記載。 = IFERROR(IF(B8<>[前回のviewer_count],difference_previous,0),0)
     * [前回のviewer_count] = INDEX(B$1:B7,[user_nameが一致する一番大きい行番号])
     */
    differencePreviousFormula = '=IFERROR(IF(B' + next_row + '<>INDEX(B$1:B' + (next_row - 1) + ',MAX(IF(A' + next_row + '=A$1:A' + (next_row - 1)+ ',ROW(A$1:A' + (next_row - 1) + ')))),' + difference_previous + ',0),0)';
    sheet.getRange('C' + next_row).setFormula(differencePreviousFormula);

    difference_previous = sheet.getRange("C" + next_row).getValue();
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

function debug(){
  Logger.log(getSheet().getRange("C9").getValue());
}
