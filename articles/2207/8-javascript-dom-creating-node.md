# 【JavaScriptの基本】ノードの作成

これまでのDOM操作では、既存のノードにアクセスしたり変更を行う方法を見ていきました。

既存のコンテンツを変更するだけでなく、元々無かったコンテンツを新しく作成することで、よりダイナミックにページを変更することができます。
そこで今回は、新しいノードを作成する方法を解説していきます。

## ノードを作成するメソッド
動的なページを作成している際、その場で新しい要素を作成したい場合があるかもしれません。そのような場合、ノードを作成するためのメソッドが使用できます。

どのようなノードを作成したいか、その種類によって使用できるメソッドが異なります。
以下が各ノードに対応するメソッドです。

* createElement()：要素ノードの作成
* createTextNode()：テキストノードの作成
* createAttribute()：属性ノードの作成
* createComment()：コメントノードの作成

主にcreateElementメソッドとcreateTextNodeメソッドが使われます。
それでは一つずつ見ていきましょう。

## 要素ノードの作成
createElementメソッドを使うと、要素ノードを作成することができます。
```javascript
document.createElement(tag);
 ```
引数に指定されたタグの新しい要素ノードが生成されます。戻り値はElementオブジェクトです。

例えば、divタグの要素ノードを新しく作成したい場合、このように書くことができます。
```javascript
let element = document.createElement('div');
 ```

変数elementに対して、ノードの種類や名前、値を確認してみます。
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
createTextNodeメソッドを使うと、テキストノードを作成することができます。
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

## コメントノードの作成

## まとめ

