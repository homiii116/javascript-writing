# 【JavaScriptの基本】DOMナビゲーション

DOMはノードと呼ばれるHTMLの要素やテキストなどに対して、色々な操作を行うことができます。
DOM上の操作はdocumentオブジェクトを通して行われ、そこからノード間を行き来したり、任意のノードを取得することができます。

今回は、DOM全体の関係性を見ながらノードへのアクセス方法を解説していきます。

## DOMナビゲーション
DOM上の操作は、まずdocumentオブジェクト（ドキュメントノード）にアクセスする必要があります。
その後、特定のノードへの移動や取得を行うことができます。
例えば、```<h1>```で囲まれたテキストの色を変更したい場合にも、```document```を通して要素ノードへアクセスします。

このようなノード間の関係を利用して目的のノードにアクセスすることを、DOMナビゲーションと表現されます。またアクセスに利用されるプロパティをナビゲーションプロパティと呼びます。

ノードへのアクセスは、ノードの立ち位置や使用できるプロパティによって異なります。
各ノードのアクセス方法を見ていきましょう。

## 上位部ノードのアクセス
まずは、上位部ノードである```<html>```, ```<head>```, ```<body>```へのアクセス方法です。
これらは共通してdocumentプロパティとしてdocumentオブジェクトに対して直接利用します。
```javascript
document.プロパティ;
```

* ```document.documentElement```：```<html>```へのアクセスを行う
これによりhtmlタグ内に書かれている全体のコンテンツにアクセスすることができます。

* ```document.head```：```<head>```へのアクセスを行う
これにより、headタグ内に書かれているコンテンツにアクセスすることができます。

* ```document.body```：```<body>```へのアクセスを行う
これはbodyタグ内に書かれているコンテンツ、つまりコンテンツの本文に当たります。

次のコードを見てください。
```html
<!DOCTYPE html>
<html>
<head>
  <title>タイトル</title>
</head>
<body>
  <h1>見出し</h1>
  <p>段落</p>

  <script>
    console.log(document.documentElement); // html
    console.log(document.head); // head
    console.log(document.body); // body
  </script>
</body>
</html>
```
html, head, bodyタグが用意されているHTMLドキュメントに対して、これらのプロパティを用いると、各ノードにアクセスできることが分かります。

さらに、innerHTMLプロパティを使うと、ノードの中身を参照することができます。

htmlの中身を参照：
```javascript
console.log(document.documentElement.innerHTML);

/* 
  <head>
    <title>タイトル</title>
  </head>
  <body>
    <h1>見出し</h1>
    <p>段落</p>

    <script>
      console.log(document.documentElement.innerHTML); 
      console.log(document.head.innerHTML); 
      console.log(document.body.innerHTML); 
    </script>
  </body>
*/
```

headの中身を参照：
```javascript
console.log(document.head.innerHTML);

// <title>タイトル</title>
```

bodyの中身を参照：
```javascript
console.log(document.body.innerHTML);

/*
  <h1>見出し</h1>
  <p>段落</p>

  <script>
    console.log(document.documentElement.innerHTML); 
    console.log(document.head.innerHTML); 
    console.log(document.body.innerHTML); 
  </script>
*/
```

scriptタグがheadタグ内にある場合は、```document.body```はnullになるため注意が必要です。
```html
<!DOCTYPE html>
<html>
<head>
  <title>タイトル</title>
  <script>
    console.log(document.body); // null
  </script>
</head>
<body>
  <h1>見出し</h1>
  <p>段落</p>
</body>
</html>
```
これは、ブラウザがscriptを読み込む時点でbodyを読み込めていないためです。
そのため、HTML側でJavaScriptを用意する場合には、scriptタグを用意する位置に注意しましょう。

## 下位部ノードの構成
下位部ノードのアクセスには、次のキーワードを理解しておくことが大切です。

* 子ノード：指定された要素の直接の子要素
* 子孫ノード：指定された要素の中にあるすべての要素
* 兄弟ノード：互いに同じ階層にいる要素

前回の記事でノードの関係性について解説しましたが、ここでもう一度復習しておきましょう。
以下のコードを見てください。
```html
<html>
<body>
  <h1>見出し</h1>
  <p>段落</p>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>
</body>
</html>
```
```<h1>```, ```<p>```, ```<ul>```は、bodyの直接の子要素であるため子ノードとなります。
また、bodyの中にあるすべての要素は子孫ノートです。そのため、```<h1>```などの直接の子要素を含め、さらにネストされた要素```<li>```が子孫ノードとなります。
複数ある```<li>```は、```<ul>```の子ノードであり、互いにお同じ階層にあるため、兄弟ノードとなります。

## 下位部ノードのアクセス
下位部のアクセスには、以下のプロパティが使用できます。
* childNodes：子ノードの取得
* firstChild, lastChild：最初と最後の子ノードの取得
* nextSibling, previousSibling：後ろと前の兄弟ノードの取得
* parentNode：親ノードの取得

一つずつ見ていきましょう。

### childNodes
childNodesプロパティは、子ノードにアクセスします。
```document.body.childNodes```とすると、```<body>```の子ノードを取得します。
```html
<html>
<body>
  <h1>見出し</h1>
  <p>段落</p>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>

  <script>
    console.log(document.body.childNodes); 
    // NodeList(8) [text, h1, text, p, text, ul, text, script]
  </script>
</body>
</html>
 ```
この場合、textは空白ノードに当たります。
ブラウザ表示では確認できませんが、DOM上では空白もtextとして認識されることが分かります。

また、これらの子ノードを一つずつ取り出すこともできます。
```javascript
for (let i = 0; i < document.body.childNodes.length; i++) {
  console.log(document.body.childNodes[i]);
}
// #text
// h1
// #text
// <p>段落</p>
// #text
// <ul>...</ul>
// #text
// <script>...</script>
 ```

### firstChild, lastChild
firstChildとlastChildプロパティは、最初と最後の子ノードへアクセスすることができます。
```html
<html>
<body>
  <h1>見出し</h1>
  <p>段落</p>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>

  <script>
    console.log(document.body.firstChild); // #text
    console.log(document.body.lastChild);  // script
  </script>
</body>
</html>
```

childNodesの一番最初の要素は、firstChildと同じノードです。
また、childNodesの一番最後の要素は、lastChildと同じノードです。
```javascript
const body = document.body;

console.log(body.childNodes[0] === body.firstChild);
// true

console.log(body.childNodes[body.childNodes.length - 1] === body.lastChild);
// true
```

### nextSibling, previousSibling
nextSiblingプロパティは後ろの兄弟ノードへアクセスし、previousSiblingプロパティは前の兄弟ノードへアクセスします。

例えば、このような横並びのHTMLファイルがあるとします。
```html
<html><head><title>タイトル</title></head><body><h1>見出し</h1></body></html>
 ```

```<head>```の後ろまたは右の兄弟ノードは、```<body>```となります。
```javascript
console.log(document.head.nextSibling); // body
```

反対に、```<body>```の前または左の兄弟ノードは、```<head>```です。
```javascript
console.log(document.body.previousSibling); // head
 ```

```<body>```の次または右の兄弟ノードはないため、アクセスしようとするとnullが返ります。
```javascript
console.log(document.body.nextSibling); // null
 ```

HTMLファイルに書かれている各要素が改行されていたり空白がある場合には、空白ノードが発生することに注意してください。
```html
<html>
<head>
  <title>タイトル</title>
</head>
<body>
  <h1>見出し</h1>
</body>
</html>
 ```

先ほどとは異なり、```<head>```の後ろ、```<body>```の前の兄弟ノードは共にテキストノードとなります。
```javascript
console.log(document.head.nextSibling); // #text
console.log(document.body.previousSibling); // #text
```

### parentNode
親ノードにアクセスするには、parentNodeプロパティを使います。
```html
<html>
<head>
  <title>タイトル</title>
</head>
<body>
  <h1>見出し</h1>

  <script>
    console.log(document.head.parentNode); // html
    console.log(document.body.parentNode);  // html
  </script>
</body>
</html>
```
```<head>```と```<body>```の親ノードはどちらも```<html>```です。

## 要素ノードのみアクセス
これまでのプロパティは、テキストノードやコメントノードを含む、すべてのノードに対するアクセスでした。
しかし、多くの場合テキストノードやコメントノードは不要で、HTMLページのコンテンツに携わる要素ノードのみにアクセスしたいことが大半です。

その場合、次のプロパティを用います。
* children：子の要素ノードの取得
* firstElementChild, lastElementChild：最初と最後の子の要素ノードの取得
* nextElementSibling, previousElementSibling：後ろと前の兄弟の要素ノードの取得
* parentElement：親の要素ノードの取得

```Node```ではなく、```Element```というキーワードがあります。
Elementは、要素という意味を表し、これにより要素ノードのみを取得することができます。
使い方は、すべてのノードに対するナビゲーションプロパティと同じです。

では、最後にchildNodesプロパティとchildrenプロパティを見比べてみます。

chilsNodes：
```html
<html>
<body>
  <h1>見出し</h1>
  <p>段落</p>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>

  <script>
    console.log(document.body.childNodes); 
    // NodeList(8) [text, h1, text, p, text, ul, text, script]
  </script>
</body>
</html>
 ```

children：
```html
<html>
<body>
  <h1>見出し</h1>
  <p>段落</p>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
  </ul>

  <script>
    console.log(document.body.children); 
    // NodeList(8) [text, h1, text, p, text, ul, text, script]
  </script>
</body>
</html>
 ```

childNodesプロパティでは、空白によるテキストノードも取得していましたが、childrenプロパティでは、要素ノードのみを取得していることが確認できます。

## まとめ
今回は、ノードへのアクセス方法について解説しました。

アクセスしたいノードによってプロパティの使い分けが必要ですが、DOMの構成やノードの関係性を理解していくにつれ慣れていきます。
DOMは奥が深いため、少しずつ練習していきましょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション（当記事）