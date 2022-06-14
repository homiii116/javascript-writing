# 【JavaScriptの基本】Dateオブジェクトとインスタンスメソッド -文字列の取得

Dateオブジェクトを作成すると、日時に関するさまざまな情報にアクセスすることができますが、時にはその情報を文字列として取得したい場面もあります。

今回は、Dateオブジェクトの値を文字列で取得する方法を解説します。

## 日付と時刻を文字列で取得するメソッド
Dateオブジェクトの日付や時刻を文字列で取得するメソッドはいくつかありますが、ここでは以下の代表的なメソッドを取り上げます。

* ```toString()```
* ```toDateString()```
* ```toTimeString()```
* ```toUTCString()```

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

## UTC+0のタイムゾーンの値を文字列で取得
これまでのメソッドは、ローカルタイムゾーンで値の文字列を取得するものでした。

UTC+0のタイムゾーンの値を文字列で取得したい場合には、```toUTCString()```を使います。
```javascript
let date = new Date();

// ローカルタイムゾーンでの日時の文字列
console.log(date.toString()); // "Thu Jun 09 2022 16:26:11 GMT+0200 (中央ヨーロッパ夏時間)"
// UTC+0のタイムゾーンでの日時の文字列
console.log(date.toUTCString()); // "Thu, 09 Jun 2022 14:26:11 GMT"
```
UTCのタイムゾーンが使用されるため、```toString()```と比較すると、時刻に差が出ていることが分かります。

## 指定したロケールの書式で値の文字列を取得
指定したロケールの書式で日時の値を取得することもできます。
```toString()```、```toDateString()```、```toTimeString()```それぞれの```to```の直後に```Locale```を記述します。
```javascript
Dateオブジェクト.toLocaleString(ロケール);
Dateオブジェクト.toLocaleDateString(ロケール);
Dateオブジェクト.toLocaleTimeString(ロケール);
```
次のようにロケールを表す引数を指定します。
```javascript
let date = new Date(2020, 10, 20, 15, 30);

// 日-月-年-時刻の順
console.log(date.toLocaleString('en-GB')); // "20/11/2020, 15:30:00"
console.log(date.toLocaleDateString('en-GB')); // "20/11/2020"
console.log(date.toLocaleTimeString('en-GB')); // "15:30:00"
```
```'en-GB'```を引数に指定すると、英国の書式で値の文字列を取得します。

次のコードは、上から順番に、日本、韓国、フランス、米国のローケールを指定したものです。
```javascript
let date = new Date(2020, 10, 20, 15, 30);

// 日本
console.log(date.toLocaleString('ja-JP')); // "2020/11/20 15:30:00"
console.log(date.toLocaleDateString('ja-JP')); // "2020/11/20"
console.log(date.toLocaleTimeString('ja-JP')); // "15:30:00"

// 韓国
console.log(date.toLocaleString('ko-KR')); // "2020. 11. 20. 오후 3:30:00"
console.log(date.toLocaleDateString('ko-KR')); // "2020. 11. 20."
console.log(date.toLocaleTimeString('ko-KR')); // "오후 3:30:00"

// 米国
console.log(date.toLocaleString('en-US')); // "11/20/2020, 3:30:00 PM"
console.log(date.toLocaleDateString('en-US')); // "11/20/2020"
console.log(date.toLocaleTimeString('en-US')); // "3:30:00 PM"
```
それぞれ確認すると、書式が少しずつ異なることが分かります。
このように、見慣れた書式で日時の情報を文字列で取得することができます。

## まとめ
今回は、Dateオブジェクトの値を文字列で取得する方法について解説しました。

Dateオブジェクトには、値を文字列で取得するためのさまざまなメソッドがあるため、目的に応じて使い分けられると良いでしょう。
任意の書式で値の文字列を取得することで、開発者やユーザーにとって扱いやすい日時を表現することができます。

## 合わせて読みたいDateオブジェクトシリーズ
第1回：Dateオブジェクトの作成
第2回：Dateのインスタンスメソッド-日付・時刻の取得
第3回：Dateオブジェクトとインスタンスメソッド -文字列の取得
第4回：Dateオブジェクトとインスタンスメソッド -経過ミリ秒の取得
第5回：Dateオブジェクトと静的メソッド