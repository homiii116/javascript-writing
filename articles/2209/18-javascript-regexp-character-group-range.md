# 【JavaScriptの応用】文字集合と範囲

正規表現では、特定の文字だけでなく、文字を集合させたり範囲を定めることが良くあります。例えば、文字がAからCのどれかにマッチしているか確認したい時などです。

今回は、文字グループと範囲について解説していきます。

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
上記は、全ての文字列が文字集合にマッチします。

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
let str3 = 'orange';

console.log(str1.match(reg)); // ["p", "p", "l", "e"]
console.log(str2.match(reg)); // ["g", "r", "p", "e"]
console.log(str3.match(reg)); // ["o", "r", "n", "g", "e"]
```

## 範囲
角括弧```[]```の中でハイフン```-```を記述することで、ハイフンの左に記述した文字と右に記述した文字の範囲を指定し、その中に含まれる連続した文字にマッチさせることができます。
```javascript
// 数字の0から9までの範囲
let reg1 = /[0-9]/;
// 大文字のAからzまでの範囲
let reg1 = /[A-Z]/;
// 小文字のaからzまでの範囲
let reg3 = /[a-z]/;
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
```