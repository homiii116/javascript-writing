# 【JavaScriptの入門】JavaScriptでコードを書く時の基本ルール

JavaScriptを書くうえで、まず覚えておきたいのがコードを書く際のルールです。
今回は、コードの空白や改行を入れる方法やコメントを書く方法など、JavaScript共通の基本ルールを紹介していきます。
スムーズにコーディングが行えるようにしっかりと身につけていきましょう。

## 大文字と小文字の区別
JavaScriptでは、アルファベットの大文字と小文字は別ものとして区別されます。

以下の例は、変数名「hello」をコンソールに出力する際の2つのパターンです。
```javascript
let hello = 'hello';

console.log(hello); // 'hello'

console.log(Hello); // エラー
```

「console.log(hello);」と記述した方は、問題なく「'hello'」と出力されます。
一方、「console.log(Hello);」と記述した方は、Hが大文字のため、変数名「Hello」が未定義とな判断され、エラーになります。
そのため、変数名を付ける際や、既に定義されている変数名を呼び出す際にも、大文字と小文字を正確に記述する必要があります。

## コードの空白
式や文には、空白や改行が使われています。それらは基本的に自由に式中や文中に挿入することが可能です。

以下の2つは、「const」「id」「=」「1」それぞれの単語の間に異なる大きさの空白が入っています。
これらは全く同じ式として動作しますが、スペース1つ分の空白を入れることが一般的です。
```javascript
const id = 1; // 単語間のスペース1つ
const   id  =  1; //　単語間のスペース2つ
```

単語の途中に空白を入れるとエラーになるため注意してください。
```javascript
const i d = 1; //　エラー
```

## コードの改行とインデント
ブロック文やコードが長くなる文では、改行が使われます。

以下の2つは、同じ意味を持つif文ですが、それぞれ改行がないパターンと改行があるパターンで表現されています。
```javascript
// 改行なし
if (true) console.log('Hello'); //'Hello'

// 改行あり
if (true) { // ブロック
  console.log('Hello'); // 'Hello'
}
```
上記のような簡潔なコードであれば、改行をせずに1行の形式で書くこともできますが、改行ありのコードブロックを用いた方が、読みやすいと判断されることが多いです。

また、改行をした行は、インデントを用いて論理的にコードを表します。インデントするには、2または4つのスペースか、タブキーを使います。
```javascript
// スペース2
if (true) {
  console.log('Hello'); // 'Hello'
}

// スペース4
if (true) {
    console.log('Hello'); // 'Hello'
}
```

どのスペース数を選ぶかは、個人の好みに合わせて問題ありません。
色々なコードを目にする機会が増えた段階で、自分にあった書き方を見つけるのでも良いですし、チームプロジェクトを行うことがあればそのチームのコーディングルールによって変えることもあります。

1つの関数であっても、多くの場合は、関数の中身を機能ごとに分解することが可能です。
その場合、改行ごとにインデントを行ってしまうと、どんどん階層が深くなり、可読性が低くなってしまいます。そのため、インデントは行わずに、新しい行を挿入することでコードを読みやすくします。

```javascript
function getNum() {
  let count = 0; // インデントあり
  //
  for (let i = 0; i < 5; i++) { // インデントなし。行挿入
    count++; // インデントあり
  }
  //
  return count; // インデントなし。行挿入
}

console.log(getNum()); // 5
```

## コードの区切り
JavaScriptでは、文を区切るために文末にセミコロン;を付けます。
```javascript
let hi = 'Hi!'; //セミコロン;

const sayHi = function() {
  console.log(hi); //セミコロン;
}; // セミコロン;

sayHi(); // 'Hi!'
```

プログラミング言語によっては、文末のセミコロンがないと必ずエラーとなる厳格なものや、セミコロンがオプションで使われているような自由度の高いものもあります。

JavaScriptでは、セミコロンを付けずに文を改行した場合、意図しない位置で文が区切られてしまう場合があります。厳密には、JavaScriptにもセミコロンを使用しなくて良い例外もありますが、予期しないエラーの可能性を避けるため、はじめのうちは文セミコロンを使用する方が無難です。

## コメント
プログラムの中に、メモとしてコメントを残すことができます。
既に、この記事のサンプルコードの中にもコメントが使用されているのを気が付いた方もいるかもしれません。

コメントは、主にコードの説明を書くために利用されます。コメントを残した場合、コメントの有効部分はプログラムのコードとして評価されません。

一行ずつコメントを書く場合には、「//」を用いいます。「//」の後ろから行末までがコメントとして認識されます。
```javascript
// 一行コメント
// コメントはプログラムのコードとして評価されない
```

複数行のコメントを残したい場合には、「/**/」を用いいます。「/*」と「*/」で囲まれた部分がコメントとして認識されます。
```javascript
/* 
  複数行コメント
  この中のコメントはプログラムのコードとして評価されない
*/
```

また、既に書かれたコードをコメント化することもできます。
例えば、プログラムの不具合の原因と思われるコードを一時的に無効にしたい場合などです。このようなコメントのことを「コメントアウト」と呼びます。
```javascript
let hi = 'Hi!'; 

/*
  const sayHi = function() {
    console.log(hi); 
  }; 

  sayHi(); 
*/
```
原因と思われるコードをコメントアウトしておくことで、コードを無効にしつつも保管しておくことができます。不具合の修正が終わったら、最終的にコメントアウトを削除することで、コードを元に戻すこともできます。

## 基本ルールを身につけて、今後のコーディングに生かそう
今回は、JavaScriptで使われている共通の基本ルールについて解説しました。

基本ルールを身に付けていれば、正しくコーディングができるようになるだけでなく、エラーを回避することに繋がります。
今回紹介した中には、手段を選ぶことのできるルールもありましたが、それは今後、自身が好きなコーディングスタイルが選べるようになったり、どの方法が良いか議論できるように役立ちます。

より良いコードを書くためには、基礎を理解していることがもっとも大切です。少しずつ慣れていきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/what-is-javascript.html"></a>
<a clink src="https://tcd-theme.com/2022/01/how-to-run-javascript.html"></a>
<a clink src="https://tcd-theme.com/2022/01/javascript-structure.html"></a>