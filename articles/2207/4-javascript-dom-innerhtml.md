# 【JavaScriptの基本】要素内のHTMLコンテンツの取得と書き込み -innerHTML

HTMLファイルの中身には、コンテンツを構成するためにタグやテキストなどが使われています。
DOM操作では、何かのアクションをきっかけにタグを変更したり、テキストの内容を変更するなど、ページを変更するために使われる手法があります。

今回は、innerHTMLプロパティを使って、HTMLコンテンツの取得や書き込みを行う方法を解説していきます。

## HTMLコンテンツの取得
innerHTMLプロパティは、特定の要素に対して、要素内のHTML文を文字列で取得します。
```javascript
element.innerHTML;
```

HTMLファイルに以下のコンテンツが記述されているとします。
```html
<h1>Hello!</h1>
 ```
```<h1>```に対してinnerHTMLプロパティを使うと、```<h1>```内にあるコンテンツを取得することができます。
```javascript
let element = document.querySelector('h1');
console.log(element.innerHTML); // "Hello!"
```
このように```Hello!```という文字列がコンソール表示されるはずです。

次に、```<div>```に対してinnerHTMLプロパティを使ってみます。
```html
<div>
  <p>こんにちは</p>
  <p>はじめまして</p>
</div> 

<script>
  let element = document.querySelector('div');
  console.log(element.innerHTML);
</script>
 ```
すると今度は、```<body>```に含まれるすべてのコンテンツを取得します。
```javascript
/*
"
  <p>こんにちは</p>
  <p>はじめまして</p>
"
*/
 ```
innerHTMLプロパティは、一見要素内のテキストのみを取得するようにも見えますが、要素内のすべてのHTMLコンテンツを取得することが分かります。
そのため、ターゲットとする要素内にタグが含まれればそのタグも取得することになります。

## HTMLコンテンツの書き込み
innerHTMLプロパティは、参照するだけでなく新しくHTML文の書き込みを行うことができます。
```javascript
element.innerHTML = 'value';
```

例えば、以下のように空のpタグが用意されているとします。
```html
<div>
  <h2>Hello!</h2>
  <p></p>
</div>
```
この時点でブラウザで確認すると「Hello!」とだけ表示されています。

** innerhtml_1 **

中身が空のpタグに対して、```innerHTML = 'value'```を使うと、```'value'```に指定した値が書き込まれます。
```javascript
let element = document.querySelector('p');
element.innerHTML = 'My name is JavaScript.';
```

** innerhtml_2 **
先ほどは表示されていなかった「My name is JavaScript.」が表示されるようになりました。

上記は空の```<p>```の中に単純なテキストを書き込む例でしたが、タグごと書き込みを行うこともできます。
例えば、空の```<div>```に対して```<h2>```とテキストを書き込むとこのようになります。
```html
<div></div>

<script>
  let element = document.querySelector('div');
  element.innerHTML = '<h2>Hello!</h2>';
</script>
```

** innerhtml_3 **

innerHTMLプロパティは、単なるテキストの読み込みではなく、```<h2>```を要素として、```Hello!```をテキストとして解釈します。

## HTMLコンテンツの置き換え
```element.innerHTML = 'value'```でHTMLコンテンツを書き込むことができますが、その動作はコンテンツの追加ではなく"置き換え"であることに注意が必要です。

例えば、次のコードのように```<div>```に対して新しい```<p>```を書き込む場合です。
```html
<div>
  <h2>Hello!</h2>
  <p>My name is JavaScript.</p>
</div>

<script>
  let element = document.querySelector('div');
  element.innerHTML = '<p>Nice to see you!</p>';
</script>
 ```

既にある```<p>My name is JavaScript.</p>```の下に、新しく書き込んだ```<p>Nice to see you!</p>```が追加されるようにも思えます。
しかし実際には、画面のように古いコンテンツは削除され、新しいコンテンツに置き換わります。

** innerhtml_4 **

「Nice to see you!」を表示され、事前に用意していたコンテンツから入れ替わりました。
このように、アクセスした要素内に既存のコンテンツがある場合、新たに書き込みを行うと内容が置き換わります。

## outerHTML
補足ですが、innerHTMLの似たような機能に、outerHTMLプロパティというものがあります。
outerHTMLプロパティは、特定の要素に対して、その要素と要素内のHTML文を文字列で取得することができます。
```javascript
element.outerHTML;
```
innerHTMLプロパティとの違いは、要素自身も含むという点です。その違いを見比べてみましょう。

innerHTML：
```html
<h1>Hello!</h1>

<script>
  let element = document.querySelector('h1');
  console.log(element.innerHTML); // "Hello!"
</script>
 ```

outerHTML：
```html
<h1>Hello!</h1>

<script>
  let element = document.querySelector('h1');
  console.log(element.outerHTML); // "<h1>Hello!</h1>"
</script>
 ```

innerHTMLプロパティが```<h1>```のコンテンツのみ取得するのに対し、outerHTMLプロパティは対象とする```<h1>```も取得していることが分かります。

また、HTMLコンテンツの書き込みは、少し特殊な動作をします。
次のコードを見てください。
```html
<div>Hello!</div>

<script>
  let element = document.querySelector('div');
  element.outerHTML = '<p>How are you?</p>';
</script>
```
ブラウザで確認すると、元々用意していたdivタグ内の「Hello!」が、pタグに囲まれた「How are you?」という内容に置き換わっています。
ここまでは予測できる挙動です。

しかし、```element.outerHTML```の値をコンソール表示すると、元々用意してあった```<div>Hello!</div>```を参照していることが確認できます。
```javascript
console.log(element.outerHTML); // "<div>Hello!</div>"
```

** outerhtml_1 **

次のようなことが起きています。
* ```<div>Hello!</div>```がHTMLドキュメントから削除される
* ```<p>How are you?</p>```がその場に挿入される
* ```<div>```はそのまま古い値を持っている

HTMLドキュメント上からは```<div>```は削除されますが、そのまま古いその値を保持しています。
そのため、outerHTMLプロパティでのコンテンツの書き込みは、古いコンテンツから新しいコンテンツへの置き換えではなく、新しいコンテンツを作成しているいう点に注意しましょう。

多くの場面ではinnerHTMLプロパティで済みますが、outerHTMLの挙動も知っておくとより柔軟にコンテンツの取得ができるようになります。

## まとめ
今回は、innerHTMLプロパティの使い方を中心に、HTMLコンテンツの取得や書き込み方法について解説しました。

```plain
// ポイント
* element.innerHTML：要素内のHTML文を文字列で取得する
* element.innerHTML = 'value'：HTMLコンテンツの書き込みを行う
* innerHTMLプロパティで既存の要素に書き込みを行う場合、追加ではなく置き換えとなる
```

innerHTMLプロパティは、他の類似プロパティなどと混同されがちですが、機能を見直してみると、しっかり使い分けできるようになっていきます。
一つずつ理解していきましょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML（当記事）