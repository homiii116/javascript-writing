# 【JavaScriptの入門】コメントの書き方

コメントは、コードの可読性を高めるための説明文です。
コメントを書くと言うのは、コードを書くのと同じくらいプログラマーにとっては重要なことです。

しかし初学者からすれば、どのようなコメントを残すべきか悩むポイントでもあります。
そこで今回は、基本的なコメントの書き方について解説していきます。

## JavaScriptのコメント
コメントは、コードの説明を記述するために利用されます。そのため、コメント自体はコードとして評価されません。
このJavaScriptシリーズ記事でも、コードの解説を行うためにコメントを使っています。
前回の「コードを書く時の基本ルール」でも少し取り上げましたが、ここではコメントの書き方に注力を当てて見ていきましょう。

JavaScriptのコメントの書き方には、一般的に以下の2種類があります。

* ```//```：1行コメント
* ```/* */```：複数行コメント

### 一行コメント
一行コメントは名前で分かるように、一行単位でコメントを残すために利用します。
```javascript
// 一行コメントです
// この部分はコードとして評価されません
```
```//```の後ろから行末までがコメントとして認識されます。
```//```とテキストの間にスペースを1つ空けるのが一般的です。
基本的には、短い説明を記述する際に使います。

```//```と同じ行に書かれたテキストがコメントとなるため、```//```なしに改行した場合、その部分はコメントではなくなります。
```javascript
// 1行コメント
　　改行した部分はコメントではなくなる
 ```

### 複数行コメント
複数行コメントも名前の通り、複数行単位でコメントを残すために利用されます。
```javascript
/*
  複数行コメント
  囲まれている範囲はコードとして評価されない
*/
```
```/*```と```*/```で囲まれた範囲がコメントとして認識されます。
```/*```と```*/```の間に入るテキストは、改行とインデントを行なって記述するのが一般的です。
一行コメントとは異なりテキストを改行しながら記述できるため、長い説明が必要な場合に便利です。

複数行コメントの中に複数行コメントを書くことはできません。
```/* */```の中にさらに```/* */```をネストすると構文エラーとなります。
```javascript
/*
  複数行コメント1
  /* 
    複数行コメント2
  */
*/
 ```

## HTML-likeコメント
ES2015から追加されたHTML-likeコメントという記述方法もあります。
HTML-likeと呼ばれるように、HTMLのコメントと同じ形式で記述します。
```javascript
<!-- この行はコメント
  console.log('この行はJavaScriptのコード'); // "この行はJavaScriptのコード"
--> この行もコメント
```
```<!--```と```-->```がそれぞれ一行コメントとして認識されます。
真ん中の```console.log()```は、JavaScriptのコードとして実行されるため、"この行はJavaScriptのコードです"と出力されます。

また、開始タグはコードと同じ行の途中から書くこともできます。一方、終了タグは必ず行の先頭にしか書くことができません。
```javascript
let num = 1; <!-- 開始タグは行の途中でもOK
  console.log(num); // 1
--> 終了タグは行の先頭のみ
 ```
この場合も、真ん中のコードはJavaScriptのコードとして実行されるため、1が出力されます。

では、なぜこのような仕様が存在するのでしょうか。それは、歴史的背景が関係しています。

昔はJavaScript非対応のブラウザでは、```<script>```を認識できず、その中に書かれたコードが表示されていました。
そのため、画面にコードが表示されてしまわないように、```<script>```の中をHTMLコメントで囲むという対策が取られていました。
```html
<script language="javascript">
<!--
  console.log(1);
-->
</script>
```
現在はすべてのブラウザで```<script>```が対応しているため、この対策は不要ですが、```<script>```の中にHTMLコメントが書かれているWebサイトはまだ残っています。
そのため、このようなサイトのJavaScriptが動作するように、昔からの実装に仕様を合わせた結果、HTML-likeコメントが追加されたということです。
このような新しい仕様が古い仕様に合わせることを後方互換性と呼びます。

JavaScriptを含むさまざまなプログラミング言語は、時代によって仕様が更新される毎に、機能も増えていきます。
HTML-likeコメントを取り入れる必要はありませんが、言語が進化していくように、それに付随する歴史を学んでいくことは大切です。

## コメントを書く位置
パッと見て理解できる分かりやすいコメントを書くのは、意外とかんたんなことではありませんが、まずはコメントを書く位置を意識すると良いでしょう。

### コードの上に書く
コメントは、説明したいコードの上に書くことが一般的です。
```javascript
// カウンターを初期化
let count = 0;
```

このようにコードの下にコメントを書くこともできます。
```javascript
let count = 0;
// カウンターを初期化
```
しかし、コードは基本的に上から下の順番で処理されていきます。
コードに付随するコメントであることを考えると、コードの上にコメントが書かれている方が処理の流れが理解しやすくなります。

### コードと同じ行に書く
また、コードと同じ行の末尾にコメントを書くこともできます。このようなコメントをインラインコメントと呼びます。
```javascript
let counter = 0; // カウンターを初期化
```
インラインコメントは、同じ行に書かれているコードのみに関連している必要があります。そのため、どの処理に対するコメントなのか一目見て分かります。

一方、一行に書かれているコードやコメントが長くなると、横のスクロールが必要になる場合があります。複数行でのコメントを表現することができないため、返って見にくくなってしまいます。

### 改行とインデントを行う
コメントが長くなる場合には、改行やインデント行うことを心がけましょう。

仮に次のようなコードがあったとします。
```javascript
// 足し算を行う関数。引数にaとbを指定し、戻り値を返す
function add (a, b) {
  return a + b;
}
```

一行でも読めなくはないですが、改行して箇条書きにする方が見やすくなります。
```javascript
/*
  足し算を行う関数
  引数：a, b
  戻り値：a + b
*/
function add (a, b) {
  return a + b;
}
```

## コメントアウト
コメントは、テストやデバッグを行うためにも使われます。
既に書かれたコードをコメント化し、一時的にコードとしての機能を無効化にします。このようなコメントのことをコメントアウトと呼びます。
```javascript
console.log(1);
// console.log(2)
```

例えば、プログラムを実行した際に、期待していなかった挙動が発生した場合、どのコードに原因があるのかを確認します。
疑われるコードをコメントアウトすることでエラーの原因を見つけ、修正を行うことができます。
```javascript
let a = 5;
/*
  function add (a, b) {
    return a ++ b; 
  }
*/
```

## まとめ
今回は、基本的なコメントの書き方について解説しました。

```plain
* 一行コメント：//以降から行末までに書かれたコメント
* 複数行コメント：/*と*/に囲まれた範囲に書かれたコメント
* HTML-likeコメント：後方互換性のための存在するコメント
* コードを書く位置を意識する
* テストやデバッグにコメントアウトが使われる
```

コメントを書く作業は、思っている以上に難しく時間がかかる作業でもあります。
まずは基本的な書き方を覚え、少しずつ適切なコメントが残せるようにしていきましょう。

## 合わせて読みたいJavaScript事前知識シリーズ

