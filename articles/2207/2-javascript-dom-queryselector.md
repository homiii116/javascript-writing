# 【JavaScriptの基本】要素ノードの検索 -querySelector

DOMでは、getElementメソッドの他に、querySelectorメソッドを用いて特定の要素ノードを検索することができます。さらに幅広い用途に使えるため、知っておくと便利です。

今回は、querySelectorメソッドを用いた要素ノードの検索方法を解説していきます。

## querySelectorメソッド
querySelectorメソッドは、指定したCSSセレクタに一致する要素ノードを取得します。
厳密には、次の種類があります。

* ```querySelectorAll()```：指定したCSSセレクタのすべての要素ノードを取得
* ```querySelector()```：指定したCSSセレクタの最初の要素ノードを取得

CSSセレクタの情報を元に要素ノードを検索するため、細かい検索できることがメリットです。

## CSSセレクタの種類
CSSでは、HTMLドキュメント上の要素にスタイルを付けるためにセレクタが用いられます。

例えば、以下の```h1```, ```.text```, ```#nav```はCSSセレクタです。
```css
h1 {
  color: blue;
}

.text {
  font-size: 16px;
}

#nav {
  background-color: black; 
}
```
これらは普段から目にしている方も多いのではないでしょうか。
CSSセレクタは、CSSのもっとも基本的なルールではありますが、querySelectorメソッドを使ったDOM操作でも使われます。

CSSセレクタには次のような種類があります。
|セレクタ|対象|例|
|:--:|:--:|:--:|
|全称セレクタ|すべての要素|*{}|
|要素セレクタ|タグ名|h1{}|
|クラスセレクタ|class属性の値|.text|
|idセレクタ|id属性の値|#nav|
|属性セレクタ|指定属性を持つ要素|a[title] {}|
|疑似要素セレクタ|選択された要素の一部|p::first-line {}|
|疑似クラスセレクタ|選択された要素の全体|button:hover {}|

また、セレクタを組み合わせて要素を絞る際に、結合子が使われることもあります。
例えば、```<div>```の配下にある```<h2>```を選択したい時などです。
|結合子|対象|例|
|:--:|:--:|:--:|
|子孫結合子|子孫要素|div h2|
|小結合子|子要素|#main > p|
|隣接兄弟結合子|直後の要素|h1 + p|
|一般兄弟結合子|後ろにある要素|h1 ~ p|

querySelectorメソッドは、引数にこれらのCSSセレクタを指定して要素ノードを取得します。
CSSセレクタの書き方は他にも色々ありますが、基本的な書き方を今一度確認しておくと良いでしょう。

## querySelectorAll()
querySelectorAllメソッドの構文以下の通りです。
```javascript
document.querySelectorAll(css);
```
引数にCSSセレクタを指定し、それに一致するすべての要素を取得します。
この時、要素が1つまたは複数含まれるNodeListオブジェクトが返されます。

取得した要素ノードの数の取得や、各要素ノードを取り出すことができます。
```html
<div>
  <h2>見出し</h2>
  <p class="text">テキスト</p>
  <p class="text">テキスト</p>
  <p class="text">テキスト</p>
</div>

<script>
  // "text"というclass属性を持つ要素をすべて取得
  let elements = document.querySelectorAll('.text');

  // 取得した要素の数
  elements.length;
  // 1番目の要素
  elements[0];
</script>
```
textというクラス名を持つ要素を取得したい場合、```'.text'```と引数に指定します。
getElementsByClassNameメソッドでは、```'text'```のようにドット演算子が付きません。
混同しないためにも、querySelectorメソッドはCSSセレクタ形式の記述方法ということに注意してください。


例えば、次のようなHTMLドキュメントがあるとします。
```html
<h2>My hobby</h2>
<p>Do you want to know?</p>
<div>
  <p>I</p>
  <p>like</p>
  <p>studying</p>
</div>
<div>
  <p>JavaScript</p>
  <p>so</p>
  <p>much</p>
</div>
```

```<p>```をすべて取得したい場合には、このように書くことができます。
```javascript
let elements = document.querySelectorAll('p');

for (let element of elements) {
  console.log(element.innerHTML); 
}
// "Do you want to know?"
// "I"
// "like"
// "studying"
// "JavaScript"
// "so"
// "much"
 ```
HTMLドキュメントには、複数の```<p>```と```<div>```があるだけです。
その中ですべての```<p>```が持つテキストを表示しています。

もし```<div>```の配下にある一番最後の```<p>```のみを取得したい場合、このように書くことができます。
```javascript
let elements = document.querySelectorAll('div > p:last-child');

for (let element of elements) {
  console.log(element.innerHTML); 
}
// "studying"
// "much"
```
2つある```<div>```の中から、それぞれの一番後ろにある配下の```<p>```が取得できていることが分かります。これで特定の```<p>```が持つテキストのみ表示することができます。

## querySelector()
querySelectorメソッドの構文は以下の通りです。
```javascript
document.querySelector(css);
```
引数にCSSセレクタを指定し、それに一致する一つの要素ノードを取得します。
一致する要素ノードが複数ある場合には、一番最初の要素ノードが返ります。

```querySelector(css)```は、```querySelectorAll(css[0])```と意味合い的には同じです。
しかし特定の要素ノード一つだけ取得したい場合には、```querySelector(css)```の方が処理が速く短いコードで済むため、メリットとなります。

次のコードを見てください。
```html
<div>
  <h2>見出し</h2>
  <p class="text">テキスト1</p>
  <p class="text">テキスト2</p>
  <p class="text">テキスト3</p>
</div>

<script>
  // "text"というclass属性を持つ一番最初の要素を取得
  let element = document.querySelector('.text');
  console.log(element.innerHTML); // "テキスト1"
</script>
 ```
HTMLドキュメントには、```"text"```というclass属性を持つ要素が3つあります。
```document.querySelector('.text')```によって、一番最初の要素のみが取得されるため、出力される値は```"テキスト1"```となります。

では、以下のコードではどの値が出力されるでしょうか。
```html
<ul>
  <li>赤</li>
  <li>青</li>
  <li>黄</li>
</ul>
<ul>
  <li>緑</li>
  <li>紫</li>
  <li>白</li>
</ul>

<script>
  let element = document.querySelector('ul > li');
  console.log(element.innerHTML);
</script>
 ```
```<ul>```の配下にある```<li>```が対象であることが分かります。
一見、2つある```<ul>```の中でそれぞれ一番最初の```<li>```が持つ```"赤"```と```"緑"```が表示されそうにも思えますが、取得できるのは一つの要素ノードのみです。

そのため、```<ul>```の配下にある```<li>```の全体で一番最初の```<li>```のみが取得でき、出力されるのは```"赤"```のみとなります。
```javascript
// "赤"
 ```

## まとめ
今回は、querySelectorメソッドを使って要素ノードを取得する方法を解説しました。

```plain
// ポイント
* querySelectorAll()：指定したCSSセレクタのすべての要素ノードを取得
* querySelector()：指定したCSSセレクタの最初の要素ノードを取得
```

querySelectorメソッドは、任意のCSSセレクタが書けるためより柔軟に要素ノードにアクセスすることができます。
getElementメソッドとうまく使い分けていきましょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector（当記事）