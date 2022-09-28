# 【JavaScriptの応用】文字クラス

前回の記事では正規表現の概要や代表的なパターンについて取り上げましたが、ここからはより実践的な利用を目的に考えていきましょう。

正規表現の文字クラスは、数字やアルファベットなど文字の種類を区別します。
例えば、固定の文字列や、また文字列の中から任意の一文字にマッチするかなどを検証できます。

今回は、文字クラスについて解説していきます。

## 数字\d（digit）
```\d```は、あらゆる数字の文字にマッチします。
以下は、文字列の中から最初の数字を探します。
```javascript
let reg = /\d/;
let str = 'Hello123';

console.log(str.match(reg)); // ["1"]
 ```

例えば、123-4567という郵便番号があり、そのすべての数字を取得したい場合、```g```フラグを一番後ろに記述します。
```javascript
let reg = /\d/g;
let tel = '123-4567';

console.log(tel.match(reg)); // ["1", "2", "3", "4", "5", "6", "7"]
 ```

さらに、```join```メソッドで各数字を集結させることもできます。
```javascript
let reg = /\d/g;
let tel = '123-4567';

console.log(tel.match(reg).join('')); // "1234567"
 ```

## 半角英数字\w（word）
```\w```は、半角英数字にマッチします。ラテンのアルファベットや数字の文字、またアンダースコアを含みます。

例えば、```/\w/```は、```'JavaScript!'```の```"J"```や、```'$50'```の```"5"```にマッチします。
以下は、一致するすべての文字を取得したコードです。
```javascript
let reg = /\w/g;

let str1 = 'JavaScript!';
let str2 = '$50';

console.log(str1.match(reg)); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]
console.log(str2.match(reg)); // ["5", "0"]
 ```
```'JavaScript!'```の```'!'```と、```'$50'```の```"$"```以外取得できたことが分かります。

## スペース\s（space）
```\s```は、スペースにマッチします。スペース、タブ```\t```、改行```\n```、改ページ```\f```を含みます。

以下は、文字列の中から最初のスペースを探します。
```javascript
let reg = /\s/;
let str = 'A B C';

console.log(str.match(reg)); // [" "]
 ```

例えば、```\w\s\d```は、半角英数字 → スペース → 数字と続く文字列を意味します。
以下は文字列をすべて文字クラスを使って表現した例です。
```javascript
let reg = /\w\s\w\w\w\w\s\w\w\w\d/;
let str = 'I love CSS3';

console.log(str.match(reg)); // ["I love CSS3"]
 ```
各文字クラスが個々の文字に対応し、最終的に文字列を取得できることが確認できます。

## 逆クラス
```\d```, ```\w```, ```\s```の文字クラスには、逆の意味を持つクラスが存在します。これらを大文字で表すことで逆クラスとして作用します。

* ```\D```：数字以外の文字にマッチ
* ```\W```：半角英数字以外の文字にマッチ
* ```\S```：スペース以外の文字にマッチ

```javascript
let reg1 = /\D/;
let str1 = 'Hello123';

let reg2 = /\W/;
let str2 = 'JavaScript!';

let reg3 = /\S/;
let str3 = 'A B C';

console.log(str1.match(reg1)); // ["H"]
console.log(str2.match(reg2)); // ["!"]
console.log(str3.match(reg3)); // ["A"]
 ```

数字クラスで取り上げた電話番号を取得する場合、次のように記述することもできます。
```javascript
let reg = /\D/g;
let tel = '123-4567';

console.log(tel.replace(reg, '')); // "1234567"
```
文字列の中から数字ではない文字を検索し、それを空文字に置き換えることで対応します。

## 記述したの文字パターン
記述した文字にマッチするか検索するには、単純に```/文字/```と記述します。
```javascript
let reg = /CDE/;

let str1 = 'CDE';
let str2 = 'ABCDE';
let str3 = 'CDEFG';
let str4 = 'CD';
let str5 = 'CDYZ';

console.log(reg.test(str1)); // true
console.log(reg.test(str2)); // true
console.log(reg.test(str3)); // true
console.log(reg.test(str4)); // false
console.log(reg.test(str5)); // false
```
```CDE```の全ての文字が同じ順番で含まれているパターンには、```true```が返ります。

## 任意の一文字
ドット```.```は、一部の文字を除くあらゆる一文字とマッチします。
```javascript
let reg = /./;
let str = 'XYZ';

console.log(str.match(reg)); // ["X"]
 ```

多くの場合は他の正規表現の中で使われ、任意の文字を表します。
例えば、次の文字列パターンはすべてマッチします。
```javascript
let reg = /Java.cript/;

let str1 = 'JavaScript';
let str2 = 'Java-cript';
let str3 = 'Java cript';

console.log(str1.match(reg)); // ["JavaScript"]
console.log(str2.match(reg)); // ["Java-cript"]
console.log(str3.match(reg)); // ["Java cript"]
 ```
```.```の箇所が半角英数字やハイフン、スペースいずれの場合もマッチしていますが、文字の欠如ではないため何かしらの文字が必要です。

また、```/./```は以下の文字にはマッチしません。
* ```\n```
* ```\r```
* ```\u2028```
* ```\u2029```

例えば、改行文字```\n```を含めた文字列にはマッチしません。
```javascript
let reg = /Java.cript/;
let str = 'Java\ncript';

console.log(str.match(reg)); // null
```

しかし、フラグ```s```を使用することで、```.```を改行文字```\n```にも一致させることができます。
```javascript
let reg = /Java.cript/s;
let str = 'Java\ncript';

console.log(str.match(reg)); 
/* 
  ["Java
  cript"]
*/
```

## まとめ
今回は、文字クラスについて解説しました。

```plain
// ポイント
* 文字クラスは、数字やアルファベットなど文字の種類を区別する
* \d：数字
* \w：半角英数字
* \s：スペース
* \D, \W \Sは、上記の逆クラス
* /文字/：任意の文字パターン
* /./：あらゆる一文字
```

## 合わせて読みたい正規表現シリーズ
第1回：正規表現のパターンとフラグ
第2回：文字クラス（当記事）

