# 【JavaScriptの入門】JavaScriptにおける文字列型（String）

文字列型は、数値型と同じようにJavaScriptで頻繁に使われている基本の型です。
今回は、JavaScriptにおける文字列型について解説していきます。
文字列の作成や、文字列を使った操作方法を学んでいきましょう。

## 文字列型（String）
JavaScriptの文字列型は、typeof演算子を使って型を調べると「string」と表記されます。言葉の通り文字が連結した列であることを意味します。
```javascript
console.log(typeof '文字列'); // "string"
```

もう少し詳しく構造的な話をすると、例えば、コンピュータ上には、「あ」という文字をそのまま保存することができないため、ビット列へ変換し、コンピュータに認識させることが必要です。この文字からビット列へ変換することをエンコード（文字符号化）と呼びます。

そこで重要になってくるのが、「Unicode」と「UTF-16」です。
```plain
// ポイント
*Unicodeは、世界中で使われている文字を集め、各文字に対して文字コードが振られている仕様
*UTF-16は、Unicodeで定義されている文字を16ビットのビット列に変換するためのエンコード方式
```

つまり、JavaScriptでは、文字列を扱うために、文字コードとしてUnicode、エンコード方式としてUTF-16を採用しているということです。
ここでは、ポイントだけおさえておけば問題ありません。

## 文字列の扱い方
ここからは、文字列の扱い方を見ていきましょう。

### 文字列を作成する
以下の3種類の引用符を使って文字列を作成することができます。

・ダブルクォート："Hello"
・シングルクォート：'Hello'
・バッククォート： \`Hello\`

まず、ダブルクォートとシングルクォートは、どちらも単純な引用符で、文字全体を囲うと、文字列を作成することができます。
```javascript
let string1 = "文字列";
let string2 = '文字列';

console.log(string1); // "文字列"
console.log(string2); // "文字列"

console.log(string1 === string2); // true
```

ダブルクォートとシングルクォートに意味の違いはありません。
プロジェクトのコーディング規約によっても異なり、JavaScriptに関する参考資料もさまざまです。
どちらを使うかは好みの問題ですが、統一するように心がけましょう。

バッククォートは、文字全体を囲うことで、文字列を作成できる点は上記2つと変わりありません。
それに加え、文字列中に改行を入力できること、文字列中に変数を埋め込むことができます。
```javascript
// 一般的な文字列の作成
let string = `Hello!` ;
console.log(string); // "Hello!"

// 文字列の改行
let javascript = `I
love
JavaScript`;
console.log(javascript);
/*
"I
love
JavaScript"
*/

// 変数の埋め込み
let year = 2022;
console.log(`Hello, ${year}!`); // "Hello, 2022!"
```

バッククォートで囲まれた文字の間に、変数を${}の中にラップすることで、文字列の中に埋め込むことができます。これをテンプレートリテラルと呼びます。

また、変数だけでなく、その中で算術表現をすることも可能です。
```javascript
console.log(`498 + 235 = ${498 + 235}`); // "498 + 235 = 733"
```

このような変数の埋め込みを他のクォートで表現することはできません。
単純に文字列として表示されてしまうため、注意してください。
```javascript
let name = 'John';

console.log("My name is ${name}"); // "My name is ${name}"
```

### 文字列を改行する
シングルクォートまたはダブルクォートで作成した文字列を改行するには、エスケープシーケンスを使用します。
改行したい位置にエスケープシーケンスである「\n」を入力します。
```javascript
let phrase = "Hi,\nI am learning JavaScript\nIt's so fun!"

console.log(phrase);
/*
"Hi,
I am learning JavaScript
It's so fun!"
*/
```

### 文字列を結合する
文字列を結合するには、文字列結合演算子「+」を使います。
```javascript
let name = 'Java' + 'Script';
console.log(name); // "JavaScript"
```

また、変数と文字列を結合することも可能です。
```javascript
let name = 'JavaScript';
console.log('Learning ' + name + ' is so fun!'); // "Learning JavaScript is so fun!"
```

### 文字列の長さを調べる
文字列の長さを調べるには、lengthプロパティを用います。
調べたい文字列の後ろに「.length」を繋げると、その文字列の要素の長さが返ります。

```javascript
console.log('こんにちは'.length); // 5
```

## まとめ
今回は、JavaScriptの文字列型の扱い方について解説しました。
```plain
// ポイント
*JavaScriptの文字列型は、UnicodeとUTF-16で格納されている
*文字列の作成には、ダブルクォオート、シングルクォート、バッククォートを使う方法がある
*テンプレートリテラルを使って、変数を文字列内に埋め込むことができる
*\nで文字列の改行、+で文字列の連結、.lengthで文字列の長さを調べることができる
```

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/javascript-typeofdata.html"></a>
<a clink src="https://tcd-theme.com/2021/05/javascript-primitive.html"></a>
<a clink src="https://tcd-theme.com/2021/05/javascript-primitive.html"></a>


