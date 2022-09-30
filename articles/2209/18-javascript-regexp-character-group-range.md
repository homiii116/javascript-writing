# 【JavaScriptの応用】文字集合と範囲

正規表現では、特定の文字だけでなく、文字を集合させたり範囲を定めることが良くあります。例えば、文字がAからCのどれかにマッチしているか確認したい時などです。

今回は、文字集合と範囲について解説していきます。

## 集合
角括弧```[]```内に複数の文字を記述することで、その文字のいずれか一つにマッチします。

例えば、```[aeo]```の場合、```'a'```, ```'e'```, ```'o'```のいずれかの文字を表しています。これを集合と呼びます。
```javascript
let reg = /H[aeo]llo/;

let str1 = 'Hello';
let str2 = 'Hallo';
let str3 = 'Hollo';

console.log(str1.match(reg)); // ["Hello"]
console.log(str2.match(reg)); // ["Hallo"]
console.log(str3.match(reg)); // ["Hollo"]
```
上記は、全ての文字列が文字集合にマッチしているパターンです。

いずれかの文字にマッチすることに注意が必要です。
集合の中の複数の文字が含まれている場合、マッチしません。
```javascript
let reg = /H[aeo]llo/;
// aとeが含まれている
let str = 'Haello';

console.log(str.match(reg)); // null
```

反対に、```[^...]```とキャレットと呼ばれる脱字符号を角括弧内```[]```の先頭に記述することで、文字集合を否定することができます。

以下の例では、```'a'```, ```'b'```, ```'c'```のいずれかの文字を除いた文字を検索しています。
```javascript
let reg = /[^abc]/g;

let str1 = 'apple';
let str2 = 'grape';
let str3 = 'banana';

console.log(str1.match(reg)); // ["p", "p", "l", "e"]
console.log(str2.match(reg)); // ["g", "r", "p", "e"]
console.log(str3.match(reg)); // ["n", "n"]
```

## 範囲
角括弧```[]```の中でハイフン```-```を記述することで、ハイフンの左に記述した文字と右に記述した文字の範囲を指定し、その中に含まれる連続した文字にマッチさせることができます。
```javascript
// 数字の0から9までの範囲
let reg1 = /[0-9]/;
// 大文字のAからzまでの範囲
let reg2 = /[A-Z]/;
// 小文字のaからzまでの範囲
let reg3 = /[a-z]/;
```

英数字のいずれかの文字にマッチさせたい時、このように記述されることが良くあります。
```javascript
let reg = /[A-Za-z0-9]/;
```

0から5までの数字の集合を作る時、```[012345]```と記述するのは手間ですが、
```[0-5]```と短く記述しても同じ意味を表現することができます。
```javascript
// 次の二つは同じ意味を持つ
let reg1 = /[012345]/;
let reg2 = /[0-5]/;
 ```

また、範囲指定する場合もキャレット文字```^```を使用して範囲を除外することができます。
次の例では、メールアドレスを表す文字列の中から数字以外の文字を探します。
```javascript
let reg = /[^0-9]/g;
let email = 'abcd123@gmail.com';

console.log(email.match(reg).join('')); // "abcd@gmail.com"
```

## 範囲の短縮記法
文字範囲を表現する時、短縮形として文字クラスが使用できる場合があります。
```javascript
// /[0-9]/と同じ
let reg1 = /\d/;

// /[a-zA-Z0-9]/と同じ
let reg2 = /\w/;

// /[\f\n\r\t\v\u2028\u2029\]/などと同じ
let reg3 = /\s/;
```
短縮記法が用意されているものに関しては、文字クラスを使用した方が可読性が高まることもあるため知っておくと便利です。

## 集合の中のエスケープ
通常、特殊文字を文字通りのまま評価させたい場合、その文字をエスケープ```\```する必要があります。

しかし、角括弧```[]```の中で特別な意味を持つもの以外は、エスケープなしに特殊文字をそのままの文字として使用できます。

次の特殊文字は以下の条件に応じて、エスケープせずに文字として認識されます。
* 記号```+ . ()```： 角括弧内にある場合
* ハイフン```-```：先頭または末尾にある場合
* キャレット```^```：先頭以外にある場合

次の例では、正規表現```[+.()^-]```は```+.()^-```のいずれかの文字にマッチすることを表します。
```javascript
let reg = /[+.()^-]/g;

let str = '1 + 5.0 - 2';

console.log(str.match(reg)); // ["+", ".", "-"]
```
```str```変数に代入されている```+```, ```.```, ```-```がそれぞれそのままの文字としてマッチされていることが分かります。

## まとめ
今回は、文字集合と範囲について解説しました。

```plain
// ポイント
* 集合：角括弧[]内に複数の文字を記述してグループ化する
* 範囲：角括弧[]内にハイフン-を記述して文字の範囲を定める
* 文字クラスを使用することで、範囲の記述を短縮できる
* 集合の中ではほとんどの場合、特殊記号がそのままの文字として評価される
 ```

## 合わせて読みたい正規表現シリーズ
第1回：正規表現のパターンとフラグ
第2回：文字クラス
第3回：文字集合と範囲（当記事）