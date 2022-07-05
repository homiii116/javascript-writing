# 【JavaScriptの基本】要素ノードの検索 -getElement

ナビゲーションプロパティを使うと、子ノードや兄弟ノードなどにかんたんにアクセスすることができます。
しかし例えば、あるクラスを持つ要素など、特定の要素ノードに直接アクセスしたい場合には、どうすれば良いのでしょうか。

今回は、getElementと呼ばれる要素を検索するメソッドについて解説していきます。

## getElementメソッド
DOMでは、getElementメソッドを用いて特定の要素ノードを検索することができます。
getElementメソッドには、次の種類があります。

* ```getElementById()```：id属性で検索を行う
* ```getElementsByClassName()```：class属性で検索を行う
* ```getElementsByTagName()```：タグ名で検索を行う
* ```getElementsByName()```：name属性で検索を行う

これらのメソッドによって、HTMLドキュメントから指定したidやclassを探し、特定の要素ノードを取得することができます。

では、getElementメソッドを用いて要素ノードの取得方法を見ていきましょう。

## getElementById()
getElementByIdメソッドは、指定したid属性を持つ要素ノードを取得します。
他のメソッドと比べて少し特殊で、すべてのノードに対して使用できる訳ではなく、documentオブジェクトに対してのみ使用可能です。
```javascript
document.getElementById(id);
```

例えば、id属性の値に```"text"```が指定された要素ノードを取得する場合、このように記述します。
```javascript
document.getElementById('text');
```

id属性の値は、HTMLドキュメント上で唯一の値である必要があります。そのため、getElementの"Element"は単数形です。
同じidを持つ要素ノードが複数ある場合、基本的に一番はじめの要素ノードを取得しますが、この振る舞いは予測できないため、idの値は一つにするようにしましょう。

以下コードを見てください。
```html
<div>
  <h2>見出し</h2>
  <p id="text">テキスト</p>
  <p>テキスト</p>
</div>

<script>
  // "text"というid属性を持つ要素を取得
  let element = document.getElementById('text');
  // テキストを変更
  element.innerHTML = 'テキストを変更します';
</script>
```
```innerHTML = ' '```で要素の中身のテキストを指定した値に変更することができます。
これにより、指定したid属性を持つpタグのみテキストが変更されます。

** getelementbyid **

## getElementsBy*()
getElemntsByClassName, getElementsByTagName, getElementsByNameメソッドは、documentオブジェクトだけでなく、elementオブジェクトに対しても使用できます。
```javascript
document.getElementsBy*();
element.getElementsBy*();
 ```

### getElementsByClassName()
getElementsByClassNameメソッドは、指定したclass属性を持つ要素ノードを取得します。

例えば、class属性の値に```"text"```が指定された要素ノードを取得する場合、このように記述します。
```javascript
document.getElementsByClassName('text');
 ```
戻り値として、```"text"```というclass属性を持つ1つまたは複数のNodeListオブジェクトが返されます。これは要素ノードが格納されたコレクションになります。

getElementsの"Elements"が複数形であることに注目してください。
idは単一の値しか持てませんが、classの場合同じ値を複数の要素ノードに付与できるためです。
良く発生するエラーの一つに、この"s"の付け忘れがあるため、注意しましょう。
```javascript
document.getElementsByClassName('text'); // ○ 複数形
document.getElementByClassName('text'); // × 単数形
 ```
同じclass属性の値を持つ要素ノードは、HTMLドキュメントに書かれている順番でインデックスが振られています。

以下のコードは、一見```"text"```クラスを持つすべての要素ノードのテキストを変更できるようにも見えますが、実際は何も変更されません。
```html
<div>
  <h2>見出し</h2>
  <p class="text">テキスト</p>
  <p class="text">テキスト</p>
  <p class="text">テキスト</p>
</div>

<script>
  let elements = document.getElementsByClassName('text');
  elements.innerHTML = 'テキストを変更します';
</script>
```
** getelementsbyclassname_1 **

理由は、```document.getElementsByClassName('text')```がtextと言うデータのコレクション自体を取得しているためです。つまり要素ノードの集合体ということです。
そのため、コレクションの中身である個々の要素を取得するには、インデックスを指定するか反復処理を行う必要があります。
```javascript
// インデックスを指定して1番目の要素を取得
let element = document.getElementsByClassName('text')[0];
element.innerHTML = 'テキストを変更します';
```
** getelementsbyclassname_2 **

```javascript
// 反復処理ですべての要素を一つずつ取得
let elements = document.getElementsByClassName('text');

for (let i = 0; i < elements.length; i++) {
  elements[i].innerHTML = 'テキストを変更します';
}
 ```
** getelementsbyclassname_3 **

また、elementオブジェクトに対してgetElementsByClassNameメソッドを使うと、特定の要素ノードの子孫ノードに対してclass検索をすることができます。
```javascript
element.getElementsByClassName(classname);
 ```

次のコードは、```"block"```というid属性を持つ要素ノードの子孫の中から```"text"```というclass属性を持つ要素ノードを検索し、テキストを変更したものです。
```html
<div>
  <h1>見出し</h1>
  <p class="text">テキスト</p>
  <div id="block">
    <p class="text">テキスト</p>
    <p class="text">テキスト</p>
  </div>
</div>

<script>
  let block = document.getElementById('block');
  let texts = element.getElementsByClassName('text');

  for (let i = 0; i < texts.length; i++) {
    texts[i].innerHTML = 'テキストを変更します';
  }
</script>
```
これにより、divタグに囲まれているpタグのテキストのみが変更され、divタグの外にあるpタグは同じclass属性を持っていますがテキストが変更されないことが確認できます。

** getelementsbyclassname_4 **

### getElementsByTagName()
getElementsByTagNameメソッドは、指定したタグの要素ノードを取得します。

例えば、pタグの要素ノードを取得する場合、このように記述します。戻り値は、pタグの要素ノードが格納されたコレクションです。
```javascript
document.getElementsByTagName('p');
 ```

インデックスを指定したり反復処理を行って個々の要素を取得します。
```javascript
// インデックスを指定して1番目の要素を取得
let element = document.getElementsByTagName('p')[0];

// すべての要素を一つずつ取得
let elements = document.getElementsByTagName('p');
for (let i = 0; i < elements.length; i++) {
    // 処理...
}
 ```

getElementsByTagNameメソッドも、elementオブジェクトに対して使用すると特定の要素ノードの子孫の中からさらに特定の要素ノードを取得することができます。
```javascript
element.getElementsByTagName(tagname);
```

また、特定のタグを持つ要素ノードを取得した後に、ナビゲーションプロパティを使うこともできます。
例えば、以下のHTMLファイルがあるとします。
```html
<h1>見出し1</h1>
<p>テキスト</p>
<p>テキスト</p>
<div>
  <h2>見出し2</h2>
  <p>テキスト</p>
  <p>テキスト</p>
</div>
```
この状態でブラウザ画面を確認するとこのようになります。

** getelementsbytagname_1 **

では、divタグの配下にある要素ノードのみ、テキストの色を変更してみます。
ここではchildrenプロパティを使用します。
```javascript
// divタグの要素ノードを取得（インデックスで1番目を指定）
let tag = document.getElementsByTagName('div')[0];
// divタグの子の要素ノードを取得
let elements = tag.children;

// 取得した子の要素ノードのテキストの色を変更
for (let i = 0; i < elements.length; i++) {
  elements[i].style.color = 'red';
}
```

** getelementsbytagname_2 **

このように、特定の要素ノードを取得した後に、それが持つ子ノードをかんたんに取得することもできます。

### getElementsByName()
getElementsByNameメソッドは、指定したname属性を持つ要素ノードを取得します。

例えば、name属性の値に```"favorite"```が指定された要素ノードを取得する場合、このように記述します。戻り値は、```"favorite"```というclass属性を持つ要素ノードが格納されたコレクションです。
```javascript
document.getElementsByName('favorite');
 ```

getElementsByNameメソッドは頻繁に使われることはありませんが、例えばボタンの機能を実装する際に使えます。
```html
<p>あなたのお気に入りスポットはどれですか？</p>
<label><input type="radio" name="favorite" value="山">山</label>
<label><input type="radio" name="favorite" value="海">海</label>
<label><input type="radio" name="favorite" value="森">森</label>

<button onClick="showFavorite()">選択したお気に入りを表示</button>

<script>
  function showFavorite() {
    // "favorite"というname属性を持つ要素ノードを取得
    let elements = document.getElementsByName('favorite');

    // 反復処理で要素を一つずつ取得
    for (let i = 0; i < elements.length; i++) {
      // もしラジオボタンにチェックが入ったら、その値を表示
      if (elements[i].checked) {
        console.log(elements[i].value);
      }
    }
  }
</script>
 ```
```"favorite"```というname属性が指定されたすべてのラジオボタンを取得し、反復処理でさらに一つずつ取得します。
if文によって、もしラジオボタンがチェックされたら、そのボタンのvalue属性に指定されている値を表示することができます。

よって、山を選択して表示ボタンをクリックすると、山とコンソール表示されることが確認できます。

** getelementsbyname **

## まとめ
今回は、getElementメソッドを使って要素ノードを取得する方法を解説しました。

```plain
// ポイント
* getElementById()：id属性で検索を行う
* getElementsByClassName()：class属性で検索を行う
* getElementsByTagName()：タグ名で検索を行う
* getElementsByName()：name属性で検索を行う
 ```
特定の要素ノードにアクセスする際に、これらのメソッドを使ってみたり、ナビゲーションメソッドと合わせて使ってみてください。

## 合わせて読みたいDOMシリーズ
第1回：DOMの仕組みと構造
第2回：DOMナビゲーション
第3回：要素ノードの検索 -getElement（当記事）
第4回：要素ノードの検索 -guerySelector
