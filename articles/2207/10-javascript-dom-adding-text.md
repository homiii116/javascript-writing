# 【JavaScriptの基本】要素にテキストを追加する方法

Webページには必ずテキストが使われています。
DOM操作では、さまざまな方法を使ってテキストの生成や追加ができます。

しかし、扱う手法によって構文や手順、動作が異なるため、どれを使うべきか迷ってしまうことも少なくありません。

そこで今回は、要素にテキストを追加するメソッド・プロパティとそれらの違いについて取り上げます。

## innerHTML・textContent
まずはおさらいとして、innerHTML・textContentプロパティによるテキストの追加です。

空の```<p>```が2つがあるとします。
各```<p>```に、innerHTMLとtextContentプロパティを使って、変数textを追加します。
```html
<p id="text1"></p>
<p id="text2"></p>

<script>
  let text = '<b>テキスト</b>';

  let text1 = document.getElementById('text1');
  text1.innerHTML = text; // innerHTMLでhtmlを追加

  let text2 = document.getElementById('text2');
  text2.textContent = text; // textContentでテキストを追加
</script>
 ```

** innerhtml_textcontent ** 

どちらも```<p>```にテキストが追加されていることが確認できますが、```<b>```を要素と捉えるかテキストと捉えるが異なります。

innerHTMLプロパティの場合、```<b>```を要素と捉える一方、textContentプロパティの場合、```<b>```は純粋なテキストと捉えます。

## createTextNode
createTextNodeメソッドは、新しいテキストノードを作成します。
```javascript
document.createTextNode(text);
 ```

テキストノードを作成するだけでは使用できないため、多くの場合他の要素の中に作成したテキストを追加します。
そこで良く使われるのが、ノードを追加するためのappendメソッドです。

次のように、appendメソッドの引数にcreateTextNodeメソッドを指定することで、テキストを対象のノードに追加することがでいます。
```javascript
node.append(document.createTextNode(text));
 ```

では、先ほどのコードにもう一つ```<p>```を増やして、createTextNodeメソッドでテキストを追加してみましょう。
```html
<p id="text1"></p>
<p id="text2"></p>
<p id="text3"></p> <!-- 追加 -->

<script>
  let text = '<b>テキスト</b>';

  // innerHTML
  let text1 = document.getElementById('text1');
  text1.innerHTML = text; 

  // textContent
  let text2 = document.getElementById('text2');
  text2.textContent = text;

  // createTextNode
  let text3 = document.getElementById('text3');
  text3.append(document.createTextNode(text)); 
</script>
 ```

** createtextnode **

createTextNodeメソッドは、textContentプロパティと同じ振る舞いを示すことが分かります。
このことから、createTextNodeメソッドによるテキストの追加は、引数に指定した値が純粋なテキストとして扱われます。

## ノードの追加メソッド
前回の記事で紹介したノードを追加するメソッドを使って、テキストを追加することもできます。
次のメソッドの引数に文字列を指定した場合、テキストノードが追加されます。

* node.prepend()：ノードの先頭に追加
* node.append()：ノードの末尾に追加
* node.before()：ノードの前に追加
* node.after()：ノードの後に追加

今回は、beforeメソッドを使って検証してみます。
```javascript
node.before(strings);
```

以下は、```<p>```の前にテキストを追加するコードです。
```html
<p>テキスト</p>

<script>
  let p = document.querySelector('p');
  p.before('追加テキスト');
</script>
```

** before **

「追加テキスト」という文字が「テキスト」の上に追加されました。

では、```<b>```のようなタグも一緒に引数に指定するとどのような結果になるでしょうか。
```html
<p>テキスト</p>

<script>
  let p = document.querySelector('p');
  p.before('<b>追加テキスト</b>');
</script>
```

** before_2 **

今度は、```<b>```もテキストとして表示されるようになりました。

つまり、textContentプロパティと同じように、純粋なテキストを追加するために使用できます。

## insertAdjacentHTML
ここまでで、```createTextNode(text)```と```before(text)```は、```textContent = 'text'```と同じような振る舞いをすることが分かりました。

安全に文字列を挿入するという点では便利ですが、```innerHTML = '<tag>text</tag>'```のように、タグを要素として解釈した上でテキストを追加したい時もあるかもしれません。

そのような時には、insertAdjacentHTMLメソッドが使用できます。
```javascript
element.insertAdjacentHTML(position, html);
```

第一引数には、テキストを追加したい位置を次の文字列で指定します。
* 'beforebegin'：対象の要素の前にhtmlを追加
* 'afterbegin'：対象の要素の子要素の先頭にhtmlを追加
* 'beforeend'：対象の要素の子要素の末尾にhtmlを追加
* 'afterend'：対象の要素の後にtextをhtmlを追加

第二引数には、HTMLの文字列を指定します。

次のコードを見てください。
```html
<div>
  <p>Hello!</p>
</div>
```

** insertadjacenthtml_1 **
現時点では、「Hello!」というテキストが表示されています。

では、次のように記述するとどのような表示に変わるでしょうか。
```html
<div>
  <p>Hello!</p>
</div>
<script>
  let div = document.querySelector('div');

  div.insertAdjacentHTML('afterbegin', '<h2>Introduction</h2>');
  div.insertAdjacentHTML('afterend', '<p>Have a nice day.</p>');
</script>
```

** insertadjacenthtml_2 **

「Introduction」という見出しと「Have a nice day.」という段落が追加されました。
各テキストは、```<h2>```や```<p>```で囲まれていますが、これらはHTMLの要素として認識されます。

そのため、html上では次のように作用します。
```html
<div>
  <h2>Introduction</h2>
  <p>Hello!</p>
</div>
<p>Have a nice day.</p>
```

このように、insertAdjacentHTMLメソッドは、要素を含むテキストを指定の場所に追加できるため、用途も幅広く便利です。

## まとめ
今回は、要素にテキストを追加する方法について解説しました。

単純にテキストやタグの書き込みであれば、innerHTMLやtextContentプロパティが手軽に使えます。

テキストをまとめて追加したい場合や特定の場所を指定したい場合などには、createTextNodeメソッドやbeforeメソッド、加えてhtmlを追加したい場合にはinsertAdjacentHTMLメソッドが便利です。

少しずつ使い分けできるように練習していきましょう。

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
第12回：要素にテキストを追加する方法（当記事）
