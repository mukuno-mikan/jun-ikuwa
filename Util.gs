function formatTwitchData(inputString) {

  // 中括弧を取り除いて、カンマで分割
  var keyValuePairs = inputString.slice(1, -1).split(', ');

  // データを格納するオブジェクト
  var formattedData = {};

  // 各キーと値を整形
  keyValuePairs.forEach(function (pair) {
    var parts = pair.split('=');
    var key = parts[0];
    var value = parts[1];

    // 数値の場合、パース
    if (!isNaN(value)) {
      value = parseFloat(value);
    }

    // 文字列の場合、ダブルクォーテーションで囲む
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(function (item) {
        return item.trim();
      });
    } else if (typeof value === 'string') {
      value = '"' + value + '"';
    }

    formattedData[key] = value;
  });

  // 整形されたデータを表示
  Logger.log(JSON.stringify(formattedData, null, 2));
}
