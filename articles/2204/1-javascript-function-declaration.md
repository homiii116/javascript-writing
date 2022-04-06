# 【JavaScriptの入門】関数と宣言

関数を使うと一連の手続きを一つにまとめることができます。
何度も同じ処理を書く必要は無く、一度関数を定義してしまえば必要な箇所でその関数を何度も呼び出すことができます。

例えば、Console APIの```console.log```も関数の一つです。
```console.log```は、引数に記述された値をコンソールに表示するための処理をまとめたものです。

関数はプログラムの主要の要素であるため、構造を理解しておくことが重要です。
そこで今回は、関数の定義方法や呼び出し方法について解説していきます。

## 関数宣言
関数を定義する方法はいくつかありますが、```function```キーワードを使用した関数定義のことを、関数宣言と呼びます。
もっとも一般的な関数の定義方法で、この記事でも関数宣言を取り上げて解説していきます。

```javascript
function 関数名() {
  実行する処理;
}
 ```

関数は以下の要素で構成されています。
* ```function```キーワード：関数宣言に必要な予約語
* 関数名：任意の名前＋括弧```()```
* 関数の中身：ブロック```{}```＋実行する処理

関数を定義するには、```function```キーワードの後ろに関数名と括弧```()```を記述します。
関数名には、変数名と同様のルールに従って任意の名前を付けることができます。（詳しくは[変数名のルールと命名規則](https://tcd-theme.com/2022/02/javascript-variable-rule.html)の記事を参考にしてください）
また、ブロック```{}```とその中に関数が呼び出された際に実行したい処理を記述します。この部分が関数本体となります。

次のコードを見てください。
関数宣言のルールに従って```showMessage```という関数を定義したものです。
```javascript
function showMessage() {
  console.log('Hello!');
}
 ```
関数が呼び出されると、```'Hello!'```という文字列をコンソールに出力することができます。

関数の中身の処理は、一つに限らずいくつも格納することができます。
```javascript
function showMessage() {
  console.log('Hello!');
  console.log('こんにちは!');
  console.log('¡Hola!')
}
 ```

実行する処理が一つであっても、ブロック```{}```を省略することはできません。
```javascript
function showMessage() console.log('Hello!'); // ×ブロックは省略できない
```

## 関数の呼び出し
関数を利用するには、関数を呼び出す必要があります。
作成した関数は、その関数名と括弧```()```で呼び出すことができます。
```javascript
関数名();
```

では、先ほど定義した関数を呼び出してみます。
```javascript
function showMessage() {
  console.log('Hello!');
}
// 関数の呼び出し
showMessage(); // "Hello!"
```
関数を呼び出すことで、関数の中に記述してある```console.log('Hello!')```を実行できます。

また、同じ関数を何度も呼び出すことができます。
```javascript
function showMessage() {
  console.log('Hello!');
}

showMessage(); // "Hello!"
showMessage(); // "Hello!"
```

すでに関数で処理をまとめているため、後でメッセージ内容を変更する必要が出た場合、関数の中のコード1箇所を修正するだけで済みます。
```javascript
function showMessage() {
  console.log('Thank you!'); // 1箇所の修正で済む
}

showMessage(); // "Thank you!"
showMessage(); // "Thank you!"
```

関数に定義していなければ、必要な分だけ修正が必要です。
```javascript
// 2箇所修正が必要
console.log('Thank you!'); // "Thank you!"
console.log('Thank you!'); // "Thank you!"
```

## 関数の命名
関数名を付けようとする時、どのように命名するべきか悩むことがあるかもしれません。

関数はアクションであるため、関数名には動詞から始めることが良くあります。
まずは、これを参考に関数名を付けるのも良いでしょう。
* show...：値を表示する
* get...：値を返す
* check...：値を確認する
* calc...：値を計算する
* create...：値を生成する

例えば、このような関数名を作ることができます。
```javascript
function showMessage(){...} // メッセージを表示する
function getUser(){...} // ユーザー情報を取得する
function checkAge(){...} // 年齢を確認する
function calcTime(){...} // 時間を計算する
function createForm(){...} // フォームを生成する
```

関数名の付け方で大事な点は、関数が行うことを正確に表現することです。
コードを読む人にとって手掛かりを得られるように心がけましょう。

## ローカル変数
関数の中で定義された変数をローカル変数と呼びます。
ローカル変数は、関数内のみで参照ができます。
```javascript
function showMessage() {
  let user = 'JavaScript'; // ローカル変数
  console.log('Hello, ' + user);
}

showMessage(); // "Hello, JavaScript"
```

関数の外から変数を呼び出そうとすると、エラーとなります。
```javascript
function showMessage() {
  let user = 'JavaScript';
  console.log('Hello, ' + user);
}

// 関数のローカル変数にアクセスするとエラー
console.log('Hello, ' + user); // "Uncaught ReferenceError: user is not defined"
```

## グローバル変数
関数の外で定義されている変数をグローバル変数と呼びます。
関数はグローバル変数にアクセスすることができます。
```javascript
let user = 'JavaScript'; // グローバル変数

function showMessage() {
  console.log('Hello, ' + user); // グローバル変数にアクセス
}

showMessage(); // "Hello, JavaScript"
```

同じ名前の変数が関数内に定義されている場合、関数はグローバル変数を無視しローカル変数を使います。
```javascript
let user = 'JavaScript'; // グローバル変数

function showMessage() {
  let user = 'PHP'; // グローバル変数と同じ名前のローカル変数
  console.log('Hello, ' + user); // ローカル変数にアクセス
}

showMessage(); // "Hello, PHP"
```

## まとめ
今回は、関数の定義方法や呼び出し方法について解説しました。

```plain
// ポイント
* 関数宣言は、functionキーワードを使って関数を定義すること
* 関数名()で関数を呼び出せる
* 関数命名には、動詞を使用して関数のアクションを表現する
* 関数内の変数をローカル変数、関数外の変数をグローバル変数と呼ぶ
```

関数は、プログラムのメインの機能でもあるため、まずは構造を学んでいくことから始めましょう。