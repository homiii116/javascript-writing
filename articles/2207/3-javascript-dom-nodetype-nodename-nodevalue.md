# 【JavaScriptの基本】ノードの種類・名前・値の取得

ノードには、要素ノードやテキストノードなどさまざまな種類があるように、ノードによって付けられている名前やそれが持つ値が異なります。

今回は、ノードの種類や名前、値の取得方法について解説していきます。

## ノードの種類を取得
nodeTypeプロパティを使うと、ノードの種類を取得することができます。
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
  <h2>見出し</h2>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
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
nodeNameプロパティを使うと、ノードの名前を取得することができます。
```javascript
node.nodeName;
```
戻り値は、ノードの名前を表すDOMStringオブジェクトで、ノードの種類によって戻り値の形式が異なります。

例えば、要素ノードであればその要素ノードを表すタグ名が返され、ドキュメントノードであれば常に```#document```という値が返されます。
```html
<body>
  <h2>見出し</h2>
  <ul>
    <li>リスト1</li>
    <li>リスト2</li>
    <li>リスト3</li>
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
  <h2>見出し</h2>
  <div>
    <p>テキスト1</p>
    <p>テキスト2</p>
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

## ノードの値を取得
nodeNameプロパティを使うと、ノードの値を取得することができます。
```javascript
node.nodeValue;
```
ノードの値を表すDOMStringオブジェクトが戻り値として返されます。
どのような値が返されるかは、ノードの種類によって異なります。

ノードの種類に対するノードの値の一覧は以下です。
|ノードの種類|ノードの値|
|:--:|:--:|
|1 要素ノード|null|
|2 属性ノード|属性値|
|3 テキストノード|テキストの値|
|4 CDATAセクション|CDATAセクションの値|
|5 実体参照|null|
|6 実体宣言|null|
|7 処理命令|処理命令の値|
|8 コメントノード|コメントの値|
|9 ドキュメント|null|
|10 ドキュメントタイプ|null|
|11 ドキュメントの断片|null|
|12 記法|null|

非要素ノードであるテキストノードやコメントノードのコンテンツを読む際などに利用することができます。
以下は、```<h2>```に囲まれているテキストとその隣にあるコメントを読む例です。
```html
<body>
  <h2>Hi!</h2><!-- コメント -->

  <script>
    let text = document.getElementsByTagName('h2')[0];
    console.log(text.firstChild.nodeValue); // "Hi!"

    let comment = text.nextSibling;
    console.log(comment.nodeValue); // " コメント "
  </script>
</body>
```

また、nodeValueプロパティの代わりに、dataプロパティを使用する方法もあります。
上記の例をdataプロパティに置き換えるとこのようになります。
```html
<body>
  <h2>Hi!</h2><!-- コメント -->

  <script>
    let text = document.getElementsByTagName('h2')[0];
    console.log(text.firstChild.data); // "Hi!"

    let comment = text.nextSibling;
    console.log(comment.data); // " コメント "
  </script>
</body>
```
nodeValueプロパティとdataプロパティは、ノードの値の取得において変わりないため、どちらを使用しても問題ありません。

さらに、nodeValueプロパティは値の取得だけでなく、値を設定することもできます。
```javascript
node.nodeValue = 'value';
```
値の設定は、テキストノードやコメントノードなどに対して有効で、nullが返されるノードに対しては反映されません。

次の例を見てください。
```html
<body>
  <h2>やることリスト</h2>
  <ul>
    <li>買い物</li>
    <li>掃除</li>
    <li>犬の散歩</li>
  </ul>

  <script>
    let elements = document.querySelectorAll('li');
    for (let i = 0; i < elements.length; i++) {
      let value = elements[i].firstChild.nodeValue;
      console.log(value = elements[i] + 'value');
    }
    // "1: 買い物"
    // "2: 掃除"
    // "3: 犬の散歩"
  </script>
</body>
```
```<li>```の子ノードであるテキストノードに対してnodeValueプロパティを使い、テキストの値を取得しています。
さらに、テキストの値の前にインデックス番号に1を足した値を代入することで、新しいテキストの値が設定されています。

** nodeValue **

これにより、やることリストの先頭に番号が追加されたことが確認できます。

## まとめ
今回は、ノードの種類・名前・値を取得する方法を解説しました。

```plain
// ポイント
* nodeType：ノードの種類を取得
* nodeName（tagName）：ノードの名前を取得
* nodeValue（data）：ノードの値を取得
 ```

これらのプロパティを使って取得できるノードの情報は、ReactなどのJavaScriptライブラリでも使われます。
自身で作成したHTMLドキュメントの内容をノードに変換して調べてみてください。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得（当記事）
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML（