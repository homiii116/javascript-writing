# 【JavaScriptの基本】ノードの種類・名前・コンテンツの取得

ノードには、要素ノードやテキストノードなどさまざまな種類があります。
また、ノードによって付けられている名前やそれが持つコンテンツが異なります。

今回は、ノードの種類や名前、コンテンツの取得方法について解説していきます。

## ノードの種類を取得
ノードの種類を取得するには、nodeTypeプロパティを使います。
```javascript
node.nodeType;
```
戻り値として、ノードの種類を表す数値が返されます。
良く使われる要素ノードやテキストノード、ドキュメントノードは以下の数値を持っています。
* 要素ノード：1
* テキストノード：3
* ドキュメントノード：9

次のコードを見てください。
```html
<body>
  <h2>夏休みの計画</h2>
  <ul>
    <li>ヨーロッパ旅行</li>
    <li>家の大掃除</li>
    <li>車の買い替え</li>
  </ul>

  <script>
    console.log(document.nodeType); // 9 
    console.log(document.body.nodeType); // 1 
    console.log(document.body.firstChild.nodeType); // 3 

    let element = document.querySelector('ul > li:first-child');
    console.log(element.nodeType); // 1 
  </script>
</body>
```
このように調べたいノードに対してnodeTypeプロパティを使用すると、その種類を取得することができます。
nodeTypeプロパティは、数値で管理されているため手っ取り早く種類の参照を行いたい時に使えます。

その他、ノードの種類の一覧は以下の通りです。
|戻り値|意味|
|:--:|:--:|
|1|要素ノード|
|2|属性ノード|
|3|テキストノード|
|4|CDATAセクション|
|5|実体参照|
|6|実体宣言|
|7|処理命令|
|8|コメントノード|
|9|ドキュメント|
|10|ドキュメントタイプ|
|11|ドキュメントの断片|
|12|記法|

## ノードの名前を取得
ノードの名前を取得するには、nodeNameプロパティを使います。
```javascript
node.nodeName;
```
戻り値は、ノードの名前を表すDOMStringオブジェクトで、ノードの種類によって戻り値の形式が異なります。

例えば、要素ノードであればその要素ノードを表すタグ名が返され、ドキュメントノードであれば常に```#document```という値が返されます。
```html
<body>
  <h2>夏休みの計画</h2>
  <ul>
    <li>ヨーロッパ旅行</li>
    <li>家の大掃除</li>
    <li>車の買い替え</li>
  </ul>

  <script>
    console.log(document.nodeName); // #document
    console.log(document.body.nodeName); // BODY
    console.log(document.body.firstChild.nodeName); // #text

    let element = document.querySelector('ul > li:first-child');
    console.log(element.nodeName); // LI
  </script>
</body>
```

ノードの種類に対するノードの名前の一覧は以下です。
|ノードの種類|ノードの名前|
|:--:|:--:|
|1 要素ノード|タグ名|
|2 属性ノード|属性値|
|3 テキストノード|#text|
|4 CDATAセクション|#cdata-section|
|5 実体参照|実体参照名|
|6 実体宣言|実体名|
|7 処理命令|処理命令の値|
|8 コメントノード|#comment|
|9 ドキュメント|#document|
|10 ドキュメントタイプ|ドキュメントタイプの値|
|11 ドキュメントの断片|#document-fragment|
|12 記法|記法名|
取得するノードによって、名前が毎回変わるものもあれば常に一定のものもあります。

もう一つ、tagNameプロパティを使って要素ノードの名前を取得することもできます。
nodeNameプロパティとの違いは、ノードの範囲です。
例えば、bodyに対して2つのプロパティを使うと、得られる値は同じです。
```javascript
document.body.nodeName; // → BODY
document.body.tagName; // → BODY
```
しかし、tagNameプロパティの場合、対象のノードは要素ノードだけです。
つまり、nodeNameプロパティでは全体のノードによってサポートされている一方、tagNameプロパティの場合には要素ノードのみサポートされている点が異なります。
```javascript
element.tagName;
```

次の例を見てください。
```html
<body>
  <h2>ノードの名前</h2>
  <div>
    <p>nodeNameプロパティはすべてのノードが対象</p>
    <p>tagNameプロパティは要素ノードが対象</p>
  </div>

  <script>
    console.log(document.nodeName); // #document
    console.log(document.tagName); // undefined

    console.log(document.body.firstChild.nodeName); // #text
    console.log(document.body.firstChild.tagName); // undefined

    let elem = document.querySelector('div > p:first-child');
    console.log(elem.nodeName); // P
    console.log(elem.tagName); // P
  </script>
</body>
```
対象とするノードによって得られる値が異なることが分かります。

しかし、要素ノードのみを対象とする場面では、nodeNameプロパティもtagNameプロパティも大差ないため、どちらを使っても問題はありません。

## ノードのコンテンツを取得

### nodeValue

### innerHTML

### textContent