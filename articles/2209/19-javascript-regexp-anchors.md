# 【JavaScriptの応用】文字列の先頭と末尾

正規表現では、文字列の先頭や末尾、単語の境界を示すメタ文字が使用されます。
このような文字の位置を表すメタ文字のことをアンカーと呼びます。

今回は、文字列の先頭と末尾を表すアンカーについて解説していきます。

## 文字列の先頭^
キャレット```^```は、文字列の先頭にマッチします。

例えば```/^Y/```は、```"Y```から始まる文字列にマッチします。
```javascript
let reg = /^Y/;

console.log(reg.test('Yamada Hanako')); // true
console.log(reg.test('Yes or No?')); // true
console.log(reg.test('Woo-hoo, Yeaaah!')); // false
```

以下は、文字列が小文字のアルファベットか数字から始まっているかテストしているコートです。
キャレット```^```が角括弧```[]```の前にあることに注目してください。
```javascript
let reg = /^[a-z0-9]/;
let str = 'call911';

console.log(reg.test(str)); // true
```

もしキャレット```^```が角括弧```[]```内の先頭にある場合、意味が異なるため注意が必要です。
```javascript
// 文字集合の否定
let reg = /[^a-z0-9]/;
let str = 'call911';

console.log(reg.test(str)); // false
```
小文字のアルファベットと数字以外の文字とマッチするという反対の意味になるため、変数```str```はマッチしません。

## 文字列の末尾$
ドル```$```は、文字列の末尾にマッチします。

例えば```/.com$/```は、```".com```で終わる文字列にマッチします。
```javascript
let reg = /.com$/;

console.log(reg.test('abc@gmail.com')); // true
console.log(reg.test('https://www.apple.com')); // true
console.log(reg.test('https://www.yahoo.co.jp')); // false
```

文字列がより正確にパターンに沿っているか確認するために、キャレット```^```とドル```$```の両方のアンカーを使用することが良くあります。
```javascript
// 8文字の小文字アルファベットか数字
let reg = /^[a-z0-9]{8}$/;
let str = 'abcd1234';

console.log(reg.test(str)); // true
```

## 単語の区切り
```\b```は、単語の先頭と単語の末尾にマッチします。

```\b文字```のように単語の前に```\b```を記述することで、単語の先頭にその文字が来ることを表します。
反対に、```文字\b```のように単語の後ろに```\b```を記述した場合、単語の末尾にその文字が来ることを意味します。

では、正規表現に```\bout```と```out\b```を使ったパターンを見てみましょう。
```javascript
// 共通の入力文字
let str1 = 'outbound';
let str2 = 'go out';
let str3 = 'throughout';

// 単語の先頭にoutが来る
let reg1 = /\bout/;
console.log(reg1.test(str1)); // true
console.log(reg1.test(str2)); // true
console.log(reg1.test(str3)); // false

// 単語の末尾にoutが来る
let reg2 = /out\b/;
console.log(reg2.test(str1)); // false
console.log(reg2.test(str2)); // true
console.log(reg2.test(str3)); // true
```

* ```"outbound"```：```\bout```にマッチ
* ```"go out"```：```\bout```と```out\b```どちらにもマッチ
* ```"throughout"```：```out\b```にマッチ

このように、単語の区切りをマッチさせていることが分かります。

## まとめ
今回は、文字列の先頭と末尾を表すアンカーについて解説しました。

```plain
// ポイント
* キャレット^：文字列の先頭にマッチする
* ドル$：文字列の末尾にマッチする
* \b文字：単語の先頭にマッチする
* 文字\b：単語の末尾にマッチする
```

## 合わせて読みたい正規表現シリーズ
第1回：正規表現のパターンとフラグ
第2回：文字クラス
第3回：文字集合と範囲
第4回：文字列の先頭と末尾（当記事）