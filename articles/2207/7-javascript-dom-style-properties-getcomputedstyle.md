# 【JavaScriptの基本】要素のスタイルの取得・設定・削除

HTMLで要素にスタイルを付与する場合、styleタグを用いたり要素ごとにstyle属性を設定します。
JavaScriptからは、要素に対してスタイルを取得したり設定を行うことができます。

今回は、要素のスタイリングを行うプロパティやメソッドについて解説していきます。

## 要素のスタイリング方法
要素にスタイルを付与するには、HTMLとは別で作成したCSSファイル上で設定する方法が一般的ですが、HTML側でスタイルの設定を行うこともできます。

HTMLでスタイリングを行う場合には、次の2つの方法が使われます。
* styleタグの用意：例　```<style></style>```
* style属性の設定：例　```<div style=""></div>```

例えば、「Hello!」というテキストの色を赤色にしたい場合、2通りのパターンで書くことができます。

styleタグ：
```html
<head>
  <style> h1 { color: red; } </style>
</head>
<body>
  <h1>Hello!</h1>
</body>
```

style属性：
```html
<body>
  <h1 style="color: red;">Hello!</h1>
</body>
```
ブラウザではどちらも同じ表示です。

** style_1 **

## スタイルの設定
styleプロパティを使うと、要素のスタイルを設定することができます。
```element.style```に続けて、プロパティ名と付与したい実際の値を記述します。
```javascript
element.style.プロパティ名 = 'value';
 ```
この方法は、要素に対してstyle属性にスタイルを設定する場合と同じです。
例えば、```element.style.width="540px"```は、```<div style="width:540px">```と同等に機能します。

多くのプロパティ名は、CSSプロパティ名と同じように使用できますが、一部例外もあります。
```javascript
// CSSプロパティと同じ
element.style.color // color
element.style.height // height

// CSSプロパティと異なる
element.style.backgroundColor // background-color
element.style.fontSize // font-size
element.style.cssFloat // float
```
CSSプロパティ名が```background-color```のように複数語で形成されているものは、キャメルケースが使われます。

次の例を見てください。
```html
<div>
  <h2>Hello!</h2>
  <p>Welcome to my website.</p>
<div>
  
<script>
  let element = document.querySelector('div');
  element.style.border = '1px solid blue';
  element.style.width = '540px';
</script>
```

** style_2 **

ブラウザで確認してみると、```<div>```にstyle属性にスタイルが追加されていることが分かります。

## スタイルの削除
スタイルを削除したい場合、値にnullを代入します。
```javascript
element.style.プロパティ名 = null;
```

```<div```付与している枠線のスタイルを削除するには、このように書くことができます。
```html
<div style="border: 1px solid blue;">
  <h2>Hello!</h2>
  <p>Welcome to my website.</p>
<div>
  
<script>
  let element = document.querySelector('div');
  element.style.border = null;
</script>
```

** style_3 **

この時、スタイルを削除できるのはstyle属性で設定されているプロパティです。sylteタグで設定されているプロパティに対しては削除できません。

また、時々、スタイルを隠したいような場面もあるかもしれません。
スタイルを含む要素そのものを隠すには、styleプロパティに対して```display = 'none'```を記述します。
```javascript
element.style.display = 'none';
 ```

例えば、ボタンがクリックされたら要素を隠したいような場面で活用できます。
```html
<div>
  <h2>Hello!</h2>
  <p>Welcome to my website.</p>
  <p style="color: blue;">Is it your first time to visit?</p>
<div>
<button onClick="hideElement();">要素を隠す</button>

<script>
  function hideElement() {
    let element = document.getElementById('message');
    element.style.display = 'none';
  }
</script>
```

クリック前：
** style_4 **

クリック後：
** style_5 **

```element.style.display = 'none'```は、```<p style="display:none">```と同じ機能を持ちます。
そのため、実質的にはスタイルを削除した訳ではなく、一時的に要素を非表示にするイメージです。

## スタイルの取得
styleプロパティは、style属性のスタイルに対して、設定や削除などをかんたんに行うことができますが、styleタグで用意されたスタイルを操作することはできません。
```html
<head>
  <style> h2 { color: red; } </style>
</head>
<body>
  <h2>Hello!</h2>
  <p>Welcome to my website.</p>
    
  <script>
    let h2 = document.querySelector('h2');
    let p = document.querySelector('p');
    p.style.color = 'blue';

    console.log(h2.style.color); // 読み込めない
    console.log(p.style.color); // "blue"
  </script>
</body>
```

しかし、styleタグで用意したスタイルを後から変更する際に、現在の値を調べたいという場面があるかもしれません。
そのような場合、getComputedStyleメソッドが使用できます。
```javascript
let getStyle = getComputedStyle(element);
 ```
戻り値は、CSSStyleDeclarationオブジェクトと呼ばれるスタイルが格納されたオブジェクトです。

そこから特定のスタイルの値を取得するために、返ってきたオブジェクトに対してアクセスしたいプロパティ名を記述します。
```javascript
// 例
let getStyle = getComputedStyle(element);
getStyle.color; // フォントカラーを取得
getStyle.width; // 横幅を取得
```

次の例を見てください。
```html
<head>
  <style>
    body { 
      color: blue; 
      margin: 5px;
    } 
  </style>
</head>
<body>
    
  <script>
    let getStyle = getComputedStyle(document.body);

    console.log(getStyle.color); // "rgb(0, 0, 255)"
    console.log(getStyle.marginBottom); // "5px"
  </script>
</body>
 ```
```<style>```内に用意した```<body>```に対するスタイルを取得しています。
コンソールでは、フォントの色と下の余白に関する値が確認できます。

## まとめ
今回は、要素のスタイルの取得・設定・削除方法について解説しました。

```plain
// ポイント
* element.style.プロパティ名 = 'value'：スタイルの設定
* element.style.プロパティ名 = null：スタイルの削除
* element.style.display = 'none'：要素の非表示
* getComputedStyle(element)：スタイルの取得
 ```

DOM操作では、要素のスタイルに対して変更を行う場面が良くあります。
ぜひ参考にしてください。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML
第7回：ノードのテキストの取得と書き込み -textContent
第8回：要素の属性の取得・設定・削除
第9回：要素のスタイルの取得・設定・削除（当記事）

