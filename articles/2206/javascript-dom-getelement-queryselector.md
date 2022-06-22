# 【JavaScriptの基本】getElementとquerySelector

## 要素の取得
DOMの最上位にあるdocumentは、HTMLドキュメント全体を表すオブジェクトです。
Documentオブジェクトを用いることで、DOMツリーのノード、つまり要素を取得することができます。

Documentオブジェクトを使用したノードの取得方法は以下です。

### getメソッド
* document.getElementById：指定されたID属性が持つ要素を取得
* document.getElementsByClassName：指定されたClass属性が持つすべての要素を取得
* document.getElementsByTagName：指定されたタグを持つすべての要素を取得

### セレクター
* document.querySelector：指定されたセレクターに合致する文書中のはじめの要素を取得
* document.querySelectorAll：指定されたセレクターに合致する文書中のすべての要素を取得

## DOMの操作
では、実際にDOMの操作をしていきます。

ここでは、それぞれの要素が持っているinnerHTMLとtextContentというプロパティを使用します。
innerHTMLとtextContentと使うと、要素内のテキストにアクセスすることができます。

### getメソッドを使用した場合
```html
<h1>JavaScriptを扱うなら必須の知識。DOMの考え方を解説</h1> <h2>要素の取得</h2> <h2>DOMの操作</h2> <p id="text"></p>
```
```javascript
const getText = document.getElementById('text'); getText.textContent = 'DOMの操作中です';
```

HTMLの<p id=”text”></p>を見ると、テキストは空です。
JavaScriptのdocument.getElementById('text')により、textというid属性を持つ要素の取得ができます。
また、textContentというプロパティを用いることで、任意のテキストを出力することが可能です。

その結果、「DOMの操作中です」というテキストが表示されるはずです。
ここでは分かりやすいようにcssに#text {color: red};と指定し、赤文字にしています。

### セレクターを使用した場合
```html
<button>ボタンです</button> <button>ボタンです</button> <button>ボタンです</button>
```

```javascript
const getButton = document.querySelector('button'); getButton.innerHTML = '1番目のボタンです';
```

HTMLのbuttonタグにはすべて「ボタンです」というテキストが入っています。
JavaScriptのdocument.querySelector('button')により、HTMLの中のすべてのbuttonタグの中から、はじめの要素のみを取得できます。
また、innerHTMLというプロパティを用いることで、任意のテキストを出力することが可能です。

その結果、はじめのボタンのみ、「1番目のボタンです」というテキストが表示されます。

### innerHTMLとtextContentの違い
innerHTMLとtextContentには、違いがあるのでしょうか。
innerHTMLはHTMLを解釈してテキストを出力するのに対し、textContentはHTMLを解釈せずにそのままテキストを出力します。

以下の例を見てください。

```html
<p id="p1"></p> <p id="p2"></p>
```

```javascript
const p1 = document.getElementById('p1'); p1.innerHTML = '<innerHTMLです>'; const p2 = document.getElementById('p2'); p2.textContent = '<textContentです>';
```
innerHTMLは、HTMLを解釈するために<b>タグの機能を反映します。そのため「innerHTMLです」という太字のテキストが表示されます。
一方、textContentはHTMLを解釈しないため、<b>タグ自体を文字列として認識し、「<b>textContentです</b>」と、すべてテキスト表示されるのです。

このような表示結果の違いを参考に、innerHTMLとtextContentを使い分けていきましょう。

## まとめ
今回は、JavaScriptで使われるDOMについて解説しました。
DOMの構造や要素へのアクセス方法を知ることは、JavaScriptでプログラムを実装するために重要な知識です。

JavaScriptの便利なライブラリにReactやjQueryなどがありますが、どれもDOMとの関係性は深いです。
今後こういったライブラリを活用していくためにも、本記事を通してDOMの理解を深めていきましょう。