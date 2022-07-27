# 【JavaScriptの基本】ノードの追加・置き換え・削除

前回の記事では、新しくノードを作成するメソッドについて解説しました。

新しく作成したノードは、DOMの特定の場所に追加することでページに反映することができます。
反対に、ノードを作成しただけではページにはまだ挿入されていない状態のため、確認することができません。

そこで今回は、ノードの追加・置き換え・削除方法について解説していきます。

## ノードの追加
新しく作成したノードをDOM上に反映させるには、HTMLドキュメント上のどこかに追加する必要があります。
例えば、```<div>```のような要素ノードを新しく作成し、それを特定の位置で表示したいような時です。

このような場合、ノードを追加するためのメソッドが使えます。追加のためのメソッドは次の通りです。

* prepend()：ノードの先頭に追加
* append()：ノードの末尾に追加
* appenChild()：ノードの末尾に追加
* before()：ノードの前に追加
* after()：ノードの後に追加

順番に見ていきましょう。

### ノードの先頭または末尾に追加
prependメソッドは、対象のノードの子ノードの先頭にノードを追加します。
```javascript
node.prepend(nodes or strings);
```

また、appendメソッドは、対象のノードの子ノードの末尾にノードを追加します。
```javascript
node.append(nodes or strings);
```

どちらのメソッドも共通して、引数には追加したいノードまたは文字列を指定します。
引数に文字列を指定した場合には自動的にテキストノードになります。
複数の引数を指定することもでき、その場合はまとめて追加されます。

次のコードを見てください。
```html
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>
```

ブラウザで確認すると3つの項目が表示されます。
** prepend_append_1 **

では、prependメソッドとappendメソッドを使って、項目の先頭と末尾に新しい項目を追加してみます。
```javascript
let ul = document.querySelector('ul');

let firstList = document.createElement('li'); 
firstList.append('項目0'); 
ul.prepend(firstList); // ulの先頭にfirstListを追加

let lastList = document.createElement('li'); 
lastList.append('項目4'); 
ul.append(lastList); // ulの末尾にlastListを追加
```

** prepend_append_2 **

すると、「項目0」と「項目4」がそれぞれリストの先頭と末尾に追加されていることが分かります。

prepend・appendメソッドは、複数の引数と指定できることから、要素とテキストの2つのノードを追加したい時などに便利です。
```javascript
let div = document.createElement('div');
let p = document.createElement('p');
div.append('Hello!!', p);

console.log(div.childNodes); // NodeList(2) [text, p]
```

補足として、appendChildメソッドを使って、対象のノードの子ノードの末尾にノードを追加することもできます。
```javascript
node.appendChild(node);
```

appendメソッドとの違いは次の通りです。
* appendメソッドはノードの他に文字列の追加ができるが、appendChildメソッドはノードのみが対象
* appendメソッドは複数のノードや文字列を追加できるが、appendChildメソッドはノードを1つだけ追加できる

1つだけノードを追加したいと言う場合には、より安全に追加することができます。

## ノードの置き換え
* node.replaceWith()

## ノードの削除
* node.remove()