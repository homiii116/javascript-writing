# 【JavaScriptの基本】ノードの追加・置き換え・削除

前回の記事では、新しくノードを作成するメソッドについて解説しました。

新しく作成したノードは、DOMの特定の場所に追加することでページに反映することができます。
反対に、ノードを作成しただけではページにはまだ反映されていない状態のため、確認することができません。

そこで今回は、ノードの追加・置き換え・削除方法について解説していきます。

## ノードの追加
新しく作成したノードをDOM上に反映させるには、HTMLドキュメント上のどこかに追加する必要があります。
例えば、```<div>```のような要素ノードを新しく作成し、それを```<body>```の中に表示したいような時です。

このような場合、ノードを追加するためのメソッドが使えます。追加のためのメソッドは次の通りです。

* ```node.prepend()```：ノードの先頭に追加
* ```node.append()```：ノードの末尾に追加
* ```node.before()```：ノードの前に追加
* ```node.after()```：ノードの後に追加

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
引数に文字列を指定した場合には自動的にテキストノードが追加されます。
また、複数の引数を指定することもでき、その場合はまとめて追加されます。

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
ul.prepend(firstList); // <ul>の先頭にfirstListを追加

let lastList = document.createElement('li'); 
lastList.append('項目4'); 
ul.append(lastList); // <ul>の末尾にlastListを追加
```

** prepend_append_2 **

すると、「項目0」と「項目4」がそれぞれリストの先頭と末尾に追加されていることが分かります。
結果的に次のようなリストの構成になります。
```html
<ul>
  <li>項目0</li>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
  <li>項目4</li>
</ul>
```

prepend・appendメソッドは、複数の引数を指定できることから、1回の呼び出しで2つ以上の要素やテキストを追加できます。
例えば、以下はテキストと要素が追加されます。
```javascript
let div = document.createElement('div');
let p = document.createElement('p');
div.append('Hello!!', p); // テキストと要素を追加

console.log(div.childNodes); // NodeList(2) [text, p]
```

'Hello!'という値を持つテキストノードと、```<p>```が追加されていることが分かります。

### ノードの前または後に追加
beforeメソッドは、対象のノード前にノードを追加します。
```javascript
node.before(nodes or strings);
```

また、afterメソッドは、対象のノードの後にノードを追加します。
```javascript
node.after(nodes or strings);
```

引数には追加したいノードまたは文字列を指定し、文字列を指定した場合には自動的にテキストノードが追加されます。
複数の引数を指定することもでき、その場合はまとめて追加されます。

先ほどのリストのコードを見てください。
今後は```<ul>```の前と後に```<p>```を追加してみます。
```html
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>

<script>
  let ul = document.querySelector('ul');

  let beforeList = document.createElement('p');
  beforeList.append('項目始まり');
  ul.before(beforeList); // <ul>の前にbeforeListを追加

  let afterList = document.createElement('p');
  afterList.append('項目終わり');
  ul.after(afterList); // <ul>の後にafterListを追加
</script>
```

** before_after **

「項目始まり」と「項目終わり」のテキストが項目の前後に追加されていることが確認できます。
これをコードで表すと、次のような構成になります。
```html
<p>項目始まり</p>
<ul>
  <li>項目1</li>
  <li>項目2</li>
  <li>項目3</li>
</ul>
<p>項目終わり</p>
```


## ノードの置き換え
ノードを他のノードに置き換えるには、```node.replaceWith()```を使います。
```javascript
node.replaceWith(nodes or strings);
```
引数に指定されたノードまたは文字列で置き換えます。
文字列の指定はテキストノードに置き換えられ、複数の引数の指定は対象のノードを複数のノードに置き換えられます。

次のコードを見てください。
```html
<p>買い物リスト</p>
<ul>
  <li>鶏肉</li>
  <li>卵</li>
  <li>牛乳</li>
</ul>
```

** replacewith_1 ** 

```<p>```を```<h2>```に置き換えてみます。
```javascript
let p = document.querySelector('p'); 
let h2 = document.createElement('h2');

p.replaceWith(h2); // <p>を<h2>に置き換える
 ```

** replacewith_1 ** 

すると「買い物リスト」と言うテキストが削除されました。
```<p>```が```<h2>```に置き換わったものの、中身のテキストノードも一緒に置き換わります。
実際には、```<h2>```の中身が空の状態です。
```html
<h2></h2>
<ul>
  <li>鶏肉</li>
  <li>卵</li>
  <li>牛乳</li>
</ul>
```

テキストを残したい、あるいは置き換えたい場合には、要素にテキストを追加することで対応できます。
```javascript
let p = document.querySelector('p'); 
let h2 = document.createElement('h2');

h2.append('買い物リスト'); // <h2>にテキストを追加
p.replaceWith(h2); // <p>を<h2>に置き換える
 ```

** replacewith_3 **

これで```<p>```をテキストを持つ```<h2>```に置き換えることができました。

## ノードの削除
ノードを削除するには、```node.remove()```を使います。
```javascript
node.remove();
```
```remove()```の前に指定されたノードに対して削除を行います。

以下のコードを見てください。
一番最後の```<li>```を削除したい場合、このように書くことができます。
```html
<p>買い物リスト</p>
<ul>
  <li>鶏肉</li>
  <li>卵</li>
  <li>牛乳</li>
</ul>

<script>
  let ul = document.querySelector('ul');
  ul.lastElementChild.remove(); // <ul>内の一番最後の<li>を削除
</script>
```

** remove_1 **

一番最後の項目「牛乳」が削除されたことが分かります。

子ノードを持つノードをを削除した場合には、子ノードも一緒に削除されます。
例えば、以下はすべての```<li>```を含む```<ul>```を削除します。
```html
<p>買い物リスト</p>
<ul>
  <li>鶏肉</li>
  <li>卵</li>
  <li>牛乳</li>
</ul>

<script>
    let ul = document.querySelector('ul');
    ul.remove();
</script>
```

** remove_2 **

これで最終的に残るのは```<p>```のみです。
```html
<p>買い物リスト</p>
 ```

## まとめ
今回は、ノードの追加・置き換え・削除方法について解説しました。

```plain
// ポイント
* node.prepend()：ノードの先頭に追加
* node.append()：ノードの末尾に追加
* node.before()：ノードの前に追加
* node.after()：ノードの後に追加
* node.replaceWith()：ノードの置き換え
* node.remove()：ノードの削除
```

ノードの追加や置き換え、削除を行い、Webページに動きを付けることが良くあります。
ノードの作成と一緒に使えるようになると便利です。

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
第10回：新しいノードの作成
第11回：ノードの追加・置き換え・削除（当記事）