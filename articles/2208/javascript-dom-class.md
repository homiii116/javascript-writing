# 【JavaScriptの基本】クラスの変更 -classList

要素をスタイリングする方法として、多くの場合CSSクラスが使われています。
```<div class="...">```, ```.class { color: white; }```のように、CSSでクラスを生成し、要素にclass属性を追加する方法です。

しかし、あらかじめ設定しているスタイルだけでなく、Webページの動きによってスタイルを変化させたいような場合、どうしたら良いのでしょうか。

そこで今回は、スタイリングにも深く関わるクラスの変更方法について解説していきます。

## クラスの変更とスタイル
クラスの変更は、DOM操作の中でも頻繁に行われる操作の一つです。
クラスを使用すると、HTMLドキュメントの特定の要素に対して、CSS側でスタイルを付与することができます。

例えば、ダークモードへの切り替えのような場面です。
ボタンを押すとWebサイトの背景色が黒くなり、ボタンを戻すと背景色が白くなるようなWebサイトがあるとします。

CSSでは、以下の2つのクラスが用意されてるイメージです。
* ```.light-mode { background-color: white; }```：背景色が白い状態
* ```.dark-mode { background-color: black; }```：背景色が黒い状態

この用意したCSSクラスを元に、「ボタンを押したらdark-modeクラスを付与する」「ボタンを戻したらlight-modeを付与する」のようなクラスの変更を行います。

ここでまず知っておくと良いのがclassNameプロパティです。
classNameプロパティは、要素のclass属性にアクセスすることができます。
```html
<body class="main box">
  <script>
    console.log(document.body.className); // main box
  </script>
</body>
```

また、新たにクラスを割り当てることもできます。その場合既存のすべてのクラスを新しいクラスに置き換えます。
```html
<body class="main box">
  <script>
    console.log(document.body.className = 'message'); // message
  </script>
</body>
```

クラスリストを確認したい場合やクラス全体を置き換えたい場合にはclassNameプロパティは便利ですが、多くの場合は1つのクラスの追加や削除が必要です。
そのために利用されるのがclassListプロパティです。

## classList
classListプロパティは、特定の要素のclass属性のリストを返します。
```javascript
element.classList;
 ```
返されるリスト自体は読み取り専用ですが、classListプロパティは以下の特別なメソッドを持っており、これらによってクラスの変更を行うことができます。

* ```classList.add()```：クラスの追加
* ```classList.remove()```：クラスの削除
* ```classList.toggle()```：クラスの切り替え
* ```classList.contains()```：クラスの有無の確認
* ```classList.replace()```：クラスの置き換え

順番に見ていきましょう。

### クラスの追加
addメソッドは、対象の要素にクラスを追加します。
```javascript
element.classList.add('class');
```
引数には追加したいクラス名を指定します。

例えば、以下のように"light"というclass属性を持つ```<div>```があるとします。
```html
<div class="light">
  <p>Hello!</p>
</div>
```

後にダークモードに切り替えられるように、"dark"というclass属性を追加するとこのように記述できます。
```javascript
let div = document.querySelector('div');
div.classList.add('dark');

console.log(div.className); // light dark
```
さっきまでは"white"というclass属性のみを持っていましたが、"dark"が追加されました。

### クラスの削除
removeメソッドは、対象の要素からクラスを削除します。
```javascript
element.classList.remove('class');
```
引数には削除したいクラス名を指定します。

では、先ほど追加した"dark"というclass属性を削除してみます。
```html
<div class="light dark">
  <p>Hello!</p>
</div>

<script>
  let div = document.querySelector('div');
  div.classList.remove('dark');

  console.log(div.className); // light
</script>
```
今度は、```<div>```のclass属性から"dark"が削除され"light"だけが残りました。

### クラスの有無の切り替え
toggleメソッドを使うと、対象の要素が持つクラスの有無を切り替えることができます。
```javascript
element.classList.toggle('class');
```
クラスが存在する場合はそのクラスを削除しfalseを返します。
反対に、クラスが存在しない場合はクラスを追加してtrueを返します。

良く使われるクリックイベントを例に見てみましょう。
次のhtmlとcssファイルがあるとします。
```html
<h1 id="main">Hello!</h1>
<button onclick="toggleClass()">クラスの切り替え</button>
```

```css
.text-color {
  color: red;
}
```
この時点では、「Hello!」というテキストとクラスを切り替えるためのボタンが用意されているだけです。

** toggle_1 **

JavaScriptで、toggleメソッドの引数に"text-color"を指定して、text-colorクラスの有無の切り替えを行います。
```javascript
function toggleClass() {
  let target = document.getElementById('main');
  target.classList.toggle('text-color');
}
```
では、ボタンをクリックしてみます。

** toggle_2 **

すると、テキストの色が赤に変わっていることが確認できます。
もう一度ボタンをクリックすると、テキストの色が黒に戻ります。

** toggle_1 **

デフォルトの状態では、```<h1>```は"text-color"というclass属性を持っていませんでした。
しかし、ボタンをクリックすることで、toggleメソッドが発動され、"text-color"を追加する作業が行われます。
もう一度ボタンをクリックすると、今度は"text-color"を削除する作業が行われます。

このように、toggleメソッドを使うと、何かの動作をきっかけにclass属性を追加・削除させることができます。

### クラスの有無の確認
containsメソッドは、対象の要素がクラスを持っているか確認します。
```javascript
element.classList.contains('class');
```
クラスが存在すればtrueを返し、存在しなければfalseを返します。

先ほどのボタンクリックの例を取り上げてクラスの有無を確認してみましょう。
```javascript
function toggleClass() {
  let target = document.getElementById('main');
  target.classList.toggle('text-color');

  // クラスの有無の確認
  console.log(target.classList.contains('text-color')); 
}
```

ボタンをクリックすると、コンソールに"true"と表示されます。
つまり、"text-color"クラスが存在するということです。

** contains_1 **

さらにもう一度ボタンをクリックすると、コンソールに"false"と表示されます。
これで"text-color"クラスが無くなったということが分かります。

** contains_2 **

### クラスの置き換え
containsメソッドは、対象の要素のクラスを他のクラスに置き換えます。
```javascript
element.classList.replace('oldClass', 'newClass');
```
第一引数には削除したい既存のクラス名を指定し、第二引数には置き換えたい新しいクラス名を指定します。

以下のコードを見てください。
```html
<span class="a b c d e"></span>
```
```<span>```は、"a", "b", "c", "d", "e"と5つのclass属性を持っています。

この中から"c"のみクラス名を置き換えてみます。
```javascript
let span = document.querySelector('span');
// cをxに置き換え
let newClass = span.classList.replace('c', 'x');

span.textContent = span.classList;
 ```

** replace **

ブラウザで確認すると、「abxde」と表示され、cがxに変更されていることが分かります。
このように、任意のクラス名のみ置き換えることができます。

## まとめ
今回は、classListプロパティを利用したクラスを変更する方法について解説しました。

```plain
// ポイント
* classList.add()：クラスの追加
* classList.remove()：クラスの削除
* classList.toggle()：クラスの切り替え
* classList.contains()：クラスの有無の確認
* classList.replace()：クラスの置き換え
```

classListを活用することで、Webページの動きに合わせたスタイリングを行うことができます。使用できるメソッドと一緒に覚えていきましょう。

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
第11回：ノードの追加・置き換え・削除
第12回：要素にテキストを追加する方法
第13回：クラスの変更 -classList（当記事）