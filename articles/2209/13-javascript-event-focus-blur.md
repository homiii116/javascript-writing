# 【JavaScriptの基本】フォーカスイベント

フォームに文字を入力する際、フォームをクリックしたりキーボードの```Tab```キーを押します。
この操作はフォーカスと呼ばれるアクションで、フォームがフォーカスを受け取ることで発生するイベントです。

今回は、フォーカスイベントについて解説していきます。

## focusとblur
```focus```とは、要素がフォーカスを受け取った時に発生するイベントのことです。
```blur```は、その反対に一度フォーカスを受け取った要素がフォーカスを失った時に発生するイベントです。

どのような場面でフォーカスイベントが発生するのか具体的にイメージしてみましょう。

```focus```には、多くの場合データを受け入れる準備を行う役割があります。
これには、例えばパスワードやEメールを入力することができる瞬間のことを指します。

```blur```は、データの受け入れが完了した際の役割です。
パスワードの入力完了後、それをチェックしたりチェック後にサーバーに送信したりするための処理などを行います。

次のコードを見てください。
* ```focus```：入力欄にフォーカスが当てられている間、背景色をピンクにする
* ```blur```：入力欄からフォーカスが外れた時に背景色を白に戻す

```html
<p>Your email:</p>
<form>
  <input type="email" id="email">
</form>

<script>
  let email = document.getElementById('email');
  
  email.addEventListener('focus', (e) => {
    e.target.style.background = 'pink';
  });

  email.addEventListener('blur', (e) => {
    e.target.style.background = "";
  });
</script>
```

メールアドレスを入力している間は、入力欄の背景色がピンクに変わります。

** focus-blur_1 **

入力完了後、入力欄の外をクリックすると背景色が白に戻ります。

** focus-blur_2 **

## イベント移譲
```focus```と```blur```は、デフォルトではバブリングは起こりません。またデフォルト動作のキャンセルも不可となります。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```focus```|なし|不可|
|```blur```|なし|不可|

そのため以下の例は機能しません。
```html
<form id="form">
  <input type="text" value="Name" id="name">
  <input type="email" value="Email" id="email">
</form>

<script>
  let form = document.getElementById('form');
  
  form.addEventListener('focus', (e) => {
    e.target.style.background = 'pink';
  });

  form.addEventListener('blur', (e) => {
    e.target.style.background = "";
  });
</script>
```

** focus-blur_3 **

理由は、```focus```と```blur```がバブリングしないことから、```<form>```に当てられたイベントは```<form>```でのみ起こるためです。

しかし、```<input id="name">```と```<input id="email">```それぞれにイベントを割り当てるのは手間です。

それを解決するために二つの方法があります。

一つ目は、キャプチャリングフェーズでイベント伝搬を有効にする方法です。
```addEventListener()```の第三引数に```true```を記述します。
```html
<form id="form">
  <input type="text" value="Name" id="name">
  <input type="email" value="Email" id="email">
</form>

<script>
  let form = document.getElementById('form');
  
  // 第三引数にtrueを指定する
  form.addEventListener('focus', (e) => {
    e.target.style.background = 'pink';
  }, true);

  // 同じく
  form.addEventListener('blur', (e) => {
    e.target.style.background = "";
  }, true);
</script>
 ```

** focus-blur_4 **

もう一つは、```focusin```と```focusout```イベントを使う方法です。
```focus```と```blur```と同じように使用できますが、```focusin```と```focusout```はバブリングが発生します。

この場合、```onfocusin```や```onfocusout```は使用できません。```addEventListener()```で割り当てることが必要です。
```html
<form id="form">
  <input type="text" value="Name" id="name">
  <input type="email" value="Email" id="email">
</form>

<script>
  let form = document.getElementById('form');
  
  // focusinイベント
  form.addEventListener('focusin', (e) => {
    e.target.style.background = 'pink';
  });

  // focusoutイベント
  form.addEventListener('focusout', (e) => {
    e.target.style.background = "";
  });
</script>
 ```

** focus-blur_5 **

## tabindex
フォーカスイベントは、```<a>```, ```<button>```, ```<input>```, ```<textarea>```, ```<select>```などの対話型要素に使うことができます。

一方、```<div>```, ```<p>```, ```<table>```などの対話型要素でないものは、デフォルトではフォーカスされません。

任意の要素にもフォーカスを当てるには、要素の属性値に```tabindex```を使用します。
また、```Tab```キーによる順次ナビゲーションを指定することも可能です。

```html
<style>
  li { cursor: pointer; }
    :focus { font-weight: bold; }
</style>

<ul>
  <li tabindex="1">Tabindex 1</li>
  <li tabindex="0">Tabindex 0</li>
  <li tabindex="2">Tabindex 2</li>
  <li tabindex="3">Tabindex 3</li>
  <li tabindex="-1">Tabindex -1</li>
</ul>
```

各リストをクリックするとフォーカスが当たり文字が太くなります。
また、最初のリストをクリックした後、```Tab```キーを押すと、```Tabindex 1```  → ```2``` → ```3``` → ```0```の順で、フォーカスが移動していきます。

** focus-blur_6, 7, 8, 9

どの要素も```tablindex```を持っていればフォーカスは有効となりますが、```0```と負の数は他の値と少し異なります。

```tabindex="0"```の順次ナビゲーションは有効ですが、順序は常に最後です。
```tabindex="-1"```のように負の数を指定した場合、フォーカスを持つことはできますが、順次ナビゲーションは到達しません。そのため、```Tab```キーを押しても無視されます。

## まとめ
今回は、フォーカスイベントについて解説しました。

```plain
// ポイント
* focus：要素がフォーカスを受け取った時に発生するイベント
* blur：一度フォーカスを受け取った要素がフォーカスを失った時に発生するイベント
* キャプチャリングフェーズを有効にするか、focusin/focusoutイベントを使ってバブリングさせることができる
* tablindexで対話型要素以外にもフォーカスを当てることができる
```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動
第3回：マウスイベント -座標とキー
第4回：キーボードイベント
第5回：フォーカスイベント（当記事）
