# 【JavaScriptの基本】新しいノードの作成 

これまでのDOM操作では、既存のノードにアクセスしたり変更を行う方法を見ていきました。

動的なページを作成するには、既存のコンテンツを変更するだけでなく、時には元々無かったコンテンツを新しく作成することも必要です。
そこで今回は、新しいノードを作成する方法を解説していきます。

## ノードを作成するメソッド
動的なページを作成している際、その場で新しい要素を作成したい場合があるかもしれません。
そのような場合、新しくノードを作成するためのcreate系メソッドが使用できます。

どのようなノードを作成したいか、種類によって使用できるメソッドが異なります。
以下が各ノードに対応するメソッドです。

* ```createElement()```：要素ノードの作成
* ```createTextNode()```：テキストノードの作成
* ```createAttribute()```：属性ノードの作成
* ```createComment()```：コメントノードの作成

主にcreateElementメソッドが使用されますが、ノードの作成方法としては共通してインプットしておくと良いでしょう。

それでは一つずつ見ていきます。

## 要素ノードの作成
createElementメソッドを使うと、新しい要素ノードを作成することができます。
```javascript
document.createElement(tag);
 ```
引数に指定されたタグの新しい要素ノードが生成されます。戻り値はElementオブジェクトです。

例えば、divタグの要素ノードを新しく作成したい場合、このように書くことができます。
```javascript
let element = document.createElement('div');
 ```

変数elementに対して、ノードの種類や名前、値を取得してみます。
その際、nodeType・nodeName・nodeValueプロパティを使うとかんたんに確認することができます。
```javascript
console.log(element.nodeType); // 1
console.log(element.nodeName); // "DIV"
console.log(element.nodeValue); // null
```
ノードの種類は1です。これは要素ノードに該当します。
ノードの名前は"DIV"で、名前の通りdivタグであることを表します。
また、ノードの値はnullとなります。要素ノード自体には値がないためです。

これらの結果からdivタグが作成されたことが分かります。

## テキストノードの作成
createTextNodeメソッドを使うと、新しいテキストノードを作成することができます。
```javascript
document.createTextNode(text);
 ```
引数に指定されたテキストの新しいテキストノードが生成されます。戻り値はTextオブジェクトです。

では、テキストノードを作成し検証してみましょう。
```javascript
let text = document.createTextNode('Hello!');

console.log(text.nodeType); // 3
console.log(text.nodeName); // #text
console.log(text.nodeValue); // "Hello!"
 ```

ノードの種類は3、つまりテキスノードです。
ノードの名前は#textです。テキストノードであれば常に#textというラベル付された名前が返されます。
さらにノードの値は引数に指定したテキスト"Hello!"となります。

これで"Hello!"という値を持つテキストノードが作成されたことが確認できました。

## 属性ノードの作成
createAttributeメソッドは、新しい属性ノードを作成します。
```javascript
document.createAttribute(attribute);
 ```
引数に指定された属性名の新しい属性ノードが生成されます。戻り値はAttrオブジェクトです。

例えば、'header'という値を持つ属性を作成する場合、次のように書くことができます。
```javascript
let attr = document.createAttribute('id');
attr.value = 'header';

console.log(attr.nodeType); // 2
console.log(attr.nodeName); // "id"
console.log(attr.nodeValue); // "header"
 ```
2は属性ノード、"id"が属性名、"header"が属性値となります。
これで"header"という値を持つid属性を作成することができました。

## コメントノードの作成
createCommentメソッドは、新しいコメントノードを作成します。
```javascript
document.createComment(comment);
 ```
引数に指定されたコメントの新しいコメントノードが生成されます。戻り値はCommentオブジェクトです。

では、これまでと同じように新しくコメントノードを作成してみましょう。
```javascript
let comment = document.createComment('Fixed the bug');

console.log(comment.nodeType); // 8
console.log(comment.nodeName); // #comment
console.log(comment.nodeValue); // "Fixed the bug"
 ```
8がコメントノード、#commentがコメントノードを表す常に一定のノード名です。
さらに、"Fixed the bug"というコメントノードが持つ値が取得できていることが分かります。

## まとめ
今回は、新しいノードを作成するメソッドについて解説しました。

```plain
// ポイント
* createElement()：要素ノードの作成
* createTextNode()：テキストノードの作成
* createAttribute()：属性ノードの作成
* createComment()：コメントノードの作成
 ```

```create```という名前が付くように、ノードを作成するための機能を持ちます。
そのため、新しく作成したノードはあくまで作成されただけで、実際に活用するにはDOMに追加する必要があります。
詳しくは、次の記事で解説していきますが、まずはノードの作成方法を覚えておくと良いでしょう。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement
第4回：要素ノードの検索 -guerySelector
第5回：ノードの種類・名前・値の取得
第6回：要素内のHTMLコンテンツの取得と書き込み -innerHTML
第7回：ノードのテキストの取得と書き込み -textContent
第8回：要素の属性の取得・設定・削除
第9回：要素のスタイルの取得・設定・削除
第10回：新しいノードの作成（当記事）