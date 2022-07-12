# 【JavaScriptの基本】要素の属性の取得・設定・削除

HTMLでは、id属性やclass属性などの属性をタグが持つことができます。
また、プロパティやメソッドを使用して属性の取得や設定などを行うことができます。

そこで今回は、要素の属性に関わる操作方法を解説していきます。

## HTML属性とDOMプロパティ
そもそもHTML属性は、要素の動作を制御するための特別な機能です。
```<body id="">```や```<input type="">```のidやtypeが属性に該当します。

HTML属性は、標準のものと非標準のものに分かれます。
例えば、idは```<body>```に対しても```<input>```に対しても適用できる標準の属性です。一方、typeは```<input>```に対しては標準の属性ですが、```<body>```に対しては非標準となります。

このように、どのタグにも使用できる属性と特定のタグで使用できる属性があります。

では、なぜその区別が必要なのでしょうか。
それは、ブラウザがタグに対してDOMオブジェクトを作成する際の対応が異なるためです。
標準の属性の場合はDOMプロパティが生成されるのに対し、非標準の場合はプロパティが生成されません。

例：
```html
<body id="intro" type="text">
  
  <script>
    console.log(document.body.id); // // "intro"
    console.log(document.body.type); // undefined
  </script>
</body>
 ```
上記の例では、id属性はbodyタグに対して標準の属性であるため、id自身のプロパティを使用することができます。よって、```document.body.id```でid属性が持つ"intro"を参照します。
一方、type属性はbodyタグに対して非標準の属性であるため、プロパティを使用するとundefinedが返ります。

このように、標準属性であればそのままプロパティとして属性名が使用できます。
```javascript
element.属性名;
```

また、属性名に対して属性値を設定することもできます。
```javascript
element.属性名 = 'value';
```
次のコードを見てください。
```html
<div>
  <a href="https://sample.com">URL</a>
</div>
  
<script>
  let element = document.querySelector('a');
  element.href = 'https://abcde.com';
  console.log(element.href); // "https://abcde.com/"
</script>
```

** dom_attributes_1 **

元々は、aタグのhref属性に"https://sample.com"が指定されていました。
```element.href = 'https://abcde.com'```によって、href属性の値が変更されたことがコンソールで確認できます。

元々要素に指定されていなかった属性値を追加することも可能です。
```html
<div>
  <a href="https://sample.com">URL</a>
</div>
  
<script>
  let element = document.querySelector('a');
  element.href = 'https://abcde.com'; // 属性値の設定（変更）
  element.target = '_blank'; // 属性値の追加

  console.log(element.href); // "https://abcde.com/"
  console.log(element.target); // "_blank"
</script>
 ```

** dom_attributes_2 **

今度は、aタグのtarget属性とその値が追加されました。

## HTML属性とメソッド
属性が非標準の場合、DOMプロパティを持てないことが分かりました。
しかし、以下のメソッドで非標準を含むすべての属性にアクセスすることができます。

* getAttribute()：属性値の取得
* getAttributeNames()：属性の一覧の取得
* setAttribute()：属性値の設定
* removeAttribute()：属性の削除

一つずつ見ていきましょう。

### 属性値の取得
getAttributeメソッドは、要素の属性値を取得します。
```javascript
element.getAttribute(name);
```
引数には取得したい属性値の属性名を指定します。class属性の値を取得したい場合には、```getAttribute('class')```と記述します。

次の例を見てください。
```html
<h1 id="standard">見出し</h1>
<p something="not-standard">段落</p>
  
<script>
  let h1 = document.querySelector('h1'); 
  let p = document.querySelector('p');

  console.log(h1.getAttribute('id')); // // "standard"
  console.log(p.getAttribute('something')); // "non-standard"
</script>
```
```<h1>```にはid属性、```<p>```にはsomethingという非標準の属性を指定しています。
getAttributeメソッドでそれらの属性にアクセスすると、"standard"と"non-standard"という値が取得できました。

### 属性の一覧の取得
getAttributeNamesメソッドは、要素に設定されている属性の一覧を取得します。
```javascript
element.getAttributeNames();
```
戻り値として属性名が格納された配列が返されます。
```html
<div id="box" class="intro">
  <h2>Hello!</h2>
<div>
  
<script>
  let element = document.querySelector('div');
  let names = element.getAttributeNames();

  for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
  }
  // "id"
  // "class"
</script>
 ```
もし、属性値も一緒に取得したい場合には、getAttributeメソッドが使用できます。
```javascript
console.log(element.getAttribute(names[i]));
// "box"
// "intro"
```

### 属性値の設定
setAttributeメソッドは、要素の属性に対して値を設定します。
```javascript
element.setAttribute(name, value);
```
引数には属性名と設定したい値を指定します。
既に属性名に対して値が設定されていた場合には、新しい属性値に置き換わります。

以下は、```<div>```のclass属性に"intro"、id属性に"main"という値を設定した例です。
```html
<div id="box">
  <h2>Hello!</h2>
<div>
  
<script>
  let element = document.querySelector('div');

  // class属性の値を追加
  element.setAttribute('class', 'intro');
  // id属性の値を置き換え
  element.setAttribute('id', 'main');

  console.log(element.getAttribute('class')); // "intro"
  console.log(element.getAttribute('id')); // "main"
</script>
```
元々無かったclass属性に"intro"という値が追加され、id属性の"box"が"main"という値に置き換わりました。

### 属性の削除
removeAttributeメソッドは、要素に設定されている属性を削除します。
```javascript
element.removeAttribute(name);
```
引数には削除したい属性の属性名を指定します。

ここでおさらいを踏まえてかんたんな実装をしてみましょう。
ボタンをクリックすると属性が追加・削除され、スタイルに変化が見られるようにします。

まず、htmlとcssファイルにそれぞれ次のように記述します。
```html
<div>
  <h2 id="title">Hello!</h2>
  <p>My name is JavaScript.</p>
<div>
<button onClick="changeAttributes();">属性を変更</button>
```

```css
body {
  width: 400px;
}

#title {
  border: 2px solid blue;
  box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
}

.text {
  border: 2px solid yellow;
  box-shadow: 12px 12px 2px 1px rgba(223, 243, 142, 0.604);
}
```
ブラウザを表示すると、「Hello!」というテキストに装飾がされていることが確認できます。

** dom_attributes_3 ** 

JavaScript側で、属性を変更と書かれているボタンをクリックすると、```<h2>```に設定されているid属性を削除し、```<p>```に新しく"text"というclass属性を設定します。
```javascript
function changeAttributes() {
  let h2 = document.querySelector('h2');
  let p = document.querySelector('p');

  h2.removeAttribute('id');
  p.setAttribute('class', 'text');
}
```
```h2.removeAttribute('id')```で、```<h2>```のid属性を削除することができます。

では、ボタンをクリックしてみます。

** dom_attributes_4 **

すると、「Hello!」のスタイルが無くなり、「My name is JavaScript.」にスタイルが追加されました。

## まとめ
今回は、要素の属性の取得・設定・削除方法について解説しました。

```plain
// 属性が標準の場合
* element.属性名：属性値の取得
* element.属性名 = 'value'：属性値の設定

// すべての属性（非標準を含む）
* getAttribute()：属性値の取得
* getAttributeNames()：属性の一覧の取得
* setAttribute()：属性値の設定
* removeAttribute()：属性の削除
 ```
属性の操作にはさまざまな方法がありますが、まずはDOMプロパティが使えないか検討し、非標準の属性や複雑な処理が必要な場合にはメソッドを使うと良いでしょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML
第7回：ノードのテキストの取得と書き込み -textContent
第8回：要素の属性の取得・設定・削除（当記事）
