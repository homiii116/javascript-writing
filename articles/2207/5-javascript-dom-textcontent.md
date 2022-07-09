# 【JavaScriptの基本】ノードのテキストの取得と書き込み -textContent

HTMLファイルの中にはテキストを持っているノードがあり、DOM操作の一つにノード内のテキストにアクセスする場面も多くあります。

今回は、textContentプロパティを用いたノードのテキストの取得や書き込み方法について解説していきます。

## テキストの取得
textContentLプロパティは、特定のノードに対して、ノード内のテキストを文字列で取得します。
```javascript
node.textContent;
```
戻り値は、対象のテキストが連結されたDOMStringオブジェクトです。
ノードの種類によって返ってくるテキストが異なります。

テキストノードやコメントノードの場合、そのノードの内側のテキストを返します。
また、要素ノードやドキュメントノードの場合、すべての子ノード（コメントノードと処理命令ノード以外）のテキストを連結したものを返します。

各ノードに対するノードのテキストの一覧は以下です。
|ノードの種類|ノードのテキスト|
|:--:|:--:|
|1 要素ノード|子ノードのテキストの連結|
|2 属性ノード|子ノードのテキストの連結|
|3 テキストノード|内側のテキスト|
|4 CDATAセクション|内側のテキスト|
|5 実体参照|子ノードのテキストの連結|
|6 実体宣言|子ノードのテキストの連結|
|7 処理命令|内側のテキスト|
|8 コメントノード|内側のテキスト|
|9 ドキュメント|子ノードのテキストの連結|
|10 ドキュメントタイプ|子ノードのテキストの連結|
|11 ドキュメントの断片|子ノードのテキストの連結|
|12 記法|子ノードのテキストの連結|

まずはかんたんな例として、以下の```<h1>```のテキストを取得してみます。
```html
<h1>Hello!</h1>

<script>
  let element = document.querySelector('h1');
  console.log(element.textContent); // "Hello!"
</script>
```
```<h1>```の中にある「Hello!」というテキストが取得できます。。

今度は、タグを増やして```<div>```の内側にあるテキストを取得してみます。
```html
<div>
  <h1>Hello!</h1>
  <p>My name is JavaScript.</p>
</div>

<script>
  let element = document.querySelector('div');
  console.log(element.textContent); 
  /*
  "

    Hello!
    My name is JavaScript.
  
  "
  */
</script>
 ```
```<div>```のすべての子ノードのテキストが連結された値が返ります。
要素ノードを対象とした場合、すべての子ノードのテキストが含まれるため、空白ノードも対象です。
そのため、"Hello! My name is JavaScript"の前後の空白も含まれるということになります。


## テキストの書き込み
textContentプロパティは、新しいテキストを書き込むこともできます。
```javascript
node.textContent = 'value';
```

以下は、空の```<p>```に対してテキストを書き込んだ例です。
```html
<div>
  <h2>Hello!</h2>
  <p></p>
</div>

<script>
  let element = document.querySelector('p');
  element.textContent = 'My name is JavaScript.';
</script>
 ```

** textcontent_1 **
このように、```<p>```の内側に新しく「My name is JavaSCript」と書き込むことができます

もし、既に対象のノードがテキストを持っている場合、新しく書き込んだテキストに置き換わります。
```html
<div>
  <h2>Hello!</h2>
  <p>My name is JavaScript.</p>
</div>

<script>
  let element = document.querySelector('h2');
  element.textContent = 'Hi!';
  console.log(element.textContent); // "Hi!"
</script>
```
元々テキストを持っている```<h2>```に対して、新しいテキストを設定すると、「Hello!」から「Hi!」に置き換わることが確認できます。
また、```<h2>```が持っているテキストをコンソール出力すると、"Hi!"という値を持っていることが分かります。

では次に、いくつかの子ノードを持っているノードに対してテキストを書き込んでみましょう。
```<div>```を対象に新しくテキストを設定します。
```html
<div>
  <h2>Hello!</h2>
  <p>My name is JavaScript.</p>
</div>

<script>
  let element = document.querySelector('div');
  element.textContent = 'I am learning DOM.';
</script>
```

** textcontent_3 **

すると、元々あったすべてのテキストが無くなり、新しく書き込んだ「I am learning DOM.」のみが表示されます。

```<div>```に対して子ノード検索を行うと、テキストノードのみ持っていることが分かります。
```javascript
for (let i = 0; i < element.childNodes.length; i++) {
  console.log(element.childNodes[i]); // #text
}
```
このことから、textContentによる書き込みは次のことが言えます。
* 対象のノードに子孫ノードがあれば削除される
* 設定した新しいテキストノードがに置き換わる

## innerHTMLとtextContentの違い
innerHTMLプロパティとtextContentプロパティが混同してしまう方もいるかもしれません。
テキストの書き込みに対してどちらも使用することができますが、機能の根本的な部分が異なります。
* innerHTML：要素内のHTMLを返す
* textContent：ノードが持っているテキストを返す

2つを比べてみます。
```html
<div>
  <h2>Hello!</h2>
  <p>My name is JavaScript.</p>
</div>
```
innerHTML：
```javascript
let element = document.querySelector('div');
console.log(element.innerHTML);
/*
  "

    <h2>Hello!</h2>
    <p>My name is JavaScript.</p>
  
  "
*/
```

textContent：
```javascript
let element = document.querySelector('div');
console.log(element.textContent);
/*
  "

    Hello!
    My name is JavaScript.
  
  "
*/
```
innerHTMLプロパティはタグなども含まれるHTMLを返すのに対し、textContentプロパティの特徴は、純粋にテキストのみを取得しています。

特にテキストを書き込むことに注力を当てると、textContentプロパティの方が安全性が高いです。

例えば、ユーザーから受け取った任意のテキストを表示したい場合を比較してみましょう。

innerHTML：
```html
<div id="elem"></div>

<script>
  let element = document.getElementById('elem');
  elem.innerHTML = '<h1>Hello, World!</h1>';
</script>
```

** textcontent_4 **

innerHTMLプロパティでは、書き込まれた内容はHTMLとして扱われます。
そのため、「Hello, World!」というテキストが見出しとして表示されます。

textContent：
```html
<div id="elem"></div>

<script>
  let element = document.getElementById('elem');
  elem.textContent = '<h1>Hello, World!</h1>';
</script>
```

** textcontent_5 **

一方、textContentプロパティでは、書き込まれた内容はすべてテキストとして表示します。そのため```<h1>```のようなタグもそのままテキストとして表示されます。

自身のWebサイトにユーザーから受け取ったテキストを表示するような場面では、ユーザーのテキストはそのままテキストとして扱った方が無難です。
予期せぬHTMLをWebサイトに影響させないためにも、単純にテキストを扱うような場面ではtextContextを用いる方が正確に行えます。

## まとめ
今回は、textContentプロパティを使ったノードのテキストの取得や書き込み方法について解説しました。

```plain
// ポイント
* node.textContent：ノードのテキストを文字列で取得する
* node.textContent = 'value'：ノードにテキストの書き込みを行う
* 対象のノードに子孫ノードがある場合、書き込みを行うと既存ノードは削除され、新しいテキストに置き換わる
```

ポイントを参考に、innerHTMLとの違いも復習しながら理解に繋げていきましょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML
第7回：ノードのテキストの取得と書き込み -textContent（当記事）



