# 【JavaScriptの基本】デフォルト動作のキャンセル

ブラウザには、リンクをクリックするとURLへアクセスしたり、フォームの送信ボタンをクリックすると情報がサーバーに送られるなどのデフォルト動作が設定されています。

しかし、JavaScriptでイベント操作を行う際に、このようなブラウザのデフォルト動作は必要ないことがあります。

今回は、デフォルト動作をキャンセルするための方法について解説します。

## Event.preventDefault()
```Event```オブジェクトの```prevendDefault```メソッドを使うと、イベントに対するデフォルト動作をキャンセルすることができます。
```javascript
Event.preventDefault();
 ```

デフォルト動作のキャンセルは、```Event.cancelable```の値が```true```の場合に可能です。

通常、リンクをクリックすると指定のURLへジャンプします。
例えば、以下の"Click me"をクリックした場合、```e.cancelable```プロパティにアクセスすると、```true```が返ります。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = e => console.log(e.cancelable); // "true"
</script>
```
つまり、URLへジャンプするなどのデフォルト動作が設定されているため、これをキャンセルすることができるということです。

デフォルト動作をキャンセルするには、このように書くことができます。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = (e) => {
    e.preventDefault();
  };
</script>
```
すると、"Click me"をクリックしても何も起こりません。

もしくは、イベントハンドラで```false```を返すことでキャンセルすることもできます。
この方法はイベントリスナーでは使用できません。```on<event>```を使ったイベントハンドラのみ有効です。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = function() {
    return false;
  };
</script>
```
この場合も"Click me"をクリックしてもURLにジャンプしません。

## チェックボックスの切り替えを無効にする
他のパターンでも検証してみましょう。

ブラウザでは、チェックボックスをクリックする際、デフォルトの動作によってチェックを切り替えることができます。

例えば、以下の4つのチェックボックスがあるとします。
```html
<p>あなたが関心のあるプログラミング言語は以下です。</p>
<form id="box">
  <input type="checkbox"checked>
  <label for="js">JavaScript</label>

  <input type="checkbox">
  <label for="php">PHP</label>

  <input type="checkbox">
  <label for="c">C</label>

  <input type="checkbox">
  <label for="java">Java</label>
</form>
<div id="output"></div>
```

** preventdefault_1 **

デフォルトでJavaScriptにチェックが付いていますが、このチェックを外したり他の言語にチェックを付けることもできます。

** preventdefault_2 **

次のような方法で、複数のチェックを付けたり外したりできる既存の動作を止めることができます。
```javascript
let box = document.getElementById('box');
box.addEventListener('click', (e) => {
  let output = document.getElementById('output');
  output.innerHTML += '<code>preventDefault()</code>によってチェックを変更できません<br>';
  e.preventDefault();
});
```

JavaScriptのチェックを外そうとしたり、他の言語にチェックを入れようとクリックをしても、チェックを変更することができません。

** preventdefault_3 **

## Event.defaultPrevented
```Event.defaultPrevented```は、デフォルト動作がキャンセルされたか論理値で返します。

```Event.preventDefault()```によって、デフォルト動作がキャンセルされた場合、```true```が返ります。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = (e) => {
    e.preventDefault();
    console.log(e.defaultPrevented); // "true"
  };
</script>
```

例えば、リンクをクリックした場合と、ドキュメント内のどこか（リンク以外）をクリックした場合で、表示するテキストを分けたいとします。どちらの場合もデフォルト動作は不要のためキャンセルします。
```html
<a id="link" href="/">Link</a>
<p id="output"></p>

<script>
  let output = document.getElementById('output');
  let link = document.getElementById('link');

  link.onclick = (e) => {
    e.preventDefault();
    output.innerHTML += 'リンクをクリックしました<br>';
  };

  document.onclick = (e) => {
    e.preventDefault();
    output.innerHTML += 'ドキュメントをクリックしました<br>';
  };
</script>
```

この状態でドキュメント上のどこかをクリックすると、"ドキュメントをクリックしました"を表示されます。

** preventdefault_4 **

問題は、リンクをクリックした場合です。
リンクをクリックすると、リンクをクリックした際のテキストだけでなく、ドキュメントをクリックした際のテキストも表示されてしまいます。バブリングが発生しているためです。

** preventdefault_5 **

これを解決するための方法として、```defaultPrevented```プロパティが使用できます。
```document```のハンドラの中で、```Event.defaultPrevented```でデフォルト動作がキャンセルされたかどうかを確認します。
```html
<a id="link" href="/">Link</a>
<p id="output"></p>

<script>
  let output = document.getElementById('output');
  let link = document.getElementById('link');

  link.onclick = (e) => {
    e.preventDefault();
    output.innerHTML += 'リンクをクリックしました<br>';
  };

  document.onclick = (e) => {
    // 既にリンクがクリックされていれば何もしない
    if (e.defaultPrevented) return;

    e.preventDefault();
    output.innerHTML += 'ドキュメントをクリックしました<br>';
  };
</script>
```
もし、```link```の中でハンドラが実行されていれば```document```ではハンドラを実行する必要がありません。
```if (e.defaultPrevented) return```で制御できます。

** preventdefault_6 **

これでリンクがクリックされた場合は、リンク用のみのテキストが表示されるようになりました。

## まとめ
今回は、デフォルト動作をキャンセルする方法について解説しました。

```plain
// ポイント
* ブラウザには多くのデフォルト動作がある　例：URLへのアクセス、ボックスへのチェック、フォーム送信など
* prevendDefault()は、イベントに対するデフォルト動作をキャンセルすることができる
* defaultPreventedは、デフォルト動作がキャンセルされたか論理値で返す
```

これらの方法を使うことで、不要なアクションや予期していなかったアクションを防ぐことができます。

## 合わせて読みたいイベント概要シリーズ
第1回：イベントハンドラ
第2回：イベントリスナー
第3回：イベントオブジェクト
第4回：バブリングとキャプチャリング
第5回：Event.targetとEvent.currentTarget
第6回：イベント移譲
第7回：デフォルト動作のキャンセル（当記事）