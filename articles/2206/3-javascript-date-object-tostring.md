# 【JavaScriptの基本】Dateオブジェクトとインスタンスメソッド -文字列の取得

Dateオブジェクトを作成すると、日時に関するさまざまな情報にアクセスすることができますが、時にはその情報を文字列として取得したい場面もあります。

今回は、Dateオブジェクトの値を文字列で取得する方法を解説します。

## 日付と時刻を文字列で取得するメソッド
Dateオブジェクトの日付や時刻を文字列で取得するメソッドはいくつかありますが、ここでは以下の代表的なメソッドを取り上げます。

* toString()
* toDateString()
* toTimeString()
* toUTCString()

これらのメソッドを使うと、Dateオブジェクトが持っている日時の情報を人間が読みやすい形式の文字列に変換することができます。

順番に見ていきましょう。

## 日付と時刻の文字列を取得
日付と時刻の値を文字列として取得するには、```toString()```を使います。
```javascript
let date = new Date();

console.log(date.toString()); // "Thu Jun 09 2022 15:59:21 GMT+0200 (中央ヨーロッパ夏時間)"
console.log(typeof date.toString()); // "string"
```
タイムゾーンは、ローカルの環境で設定されているタイムゾーンです。
また、データ型は文字列であることが分かります。

現在日時の値を持つDateオブジェクトを作成しただけだと、その値はオブジェクトとして認識されます。
```javascript
let date = new Date();

console.log(date); // Thu Jun 09 2022 15:59:21 GMT+0200 (中央ヨーロッパ夏時間)
console.log(typeof date); // "object"
```

## 日付の文字列を取得
日付の値を文字列として取得するには、```toDateString()```を使います。
```javascript
let date = new Date();

console.log(date.toDateString()); // "Thu Jun 09 2022"
```
Dateオブジェクトの日付の部分のみを表す文字列が返ります。

## 時刻の文字列を取得
時刻の値を文字列として取得するには、```toTimeString()```を使います。
```javascript
let date = new Date();

console.log(date.toTimeString()); // "16:11:58 GMT+0200 (中央ヨーロッパ夏時間)"
```
Dateオブジェクトの時刻の部分のみを表す文字列が返ります。

以下は、2001年1月31日15時30分の値を持つDateオブジェクトです。
```toString()```、```toDateString()```、```toTimeString()```を使ってアクセスすると、それぞれの必要な情報のみが取得できることが確認できます。
```javascript
let date = new Date(2000, 12, 31, 15, 30);

console.log(date.toString()); // "Wed Jan 31 2001 15:30:00 GMT+0100 (中央ヨーロッパ標準時)"
console.log(date.toDateString()); // "Wed Jan 31 2001"
console.log(date.toTimeString()); // "15:30:00 GMT+0100 (中央ヨーロッパ標準時)"
 ```

## UTC+0のタイムゾーンの値を文字列で取得
上記のメソッドは、ローカルタイムゾーンで値の文字列を取得するものでした。

UTC+0のタイムゾーンの値を文字列で取得したい場合には、```toUTCString()```を使います。
```javascript
let date = new Date();

// ローカルタイムゾーンでの日時の文字列
console.log(date.toString()); // "Thu Jun 09 2022 16:26:11 GMT+0200 (中央ヨーロッパ夏時間)"
// UTC+0のタイムゾーンでの日時の文字列
console.log(date.toUTCString()); // "Thu, 09 Jun 2022 14:26:11 GMT"
```
UTCのタイムゾーンが使用されるため、```toString()```と比較すると、時刻に差が出ていることが分かります。

## 指定したロケールの文字列を取得
