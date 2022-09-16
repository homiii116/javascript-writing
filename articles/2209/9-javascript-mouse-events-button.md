# 【JavaScriptの基本】マウスイベント -ボタン操作

これまでのイベントシリーズでは、イベントの全体的な操作について見てきましたが、その中では主にクリックイベントを使用して解説してきました。

クリックイベントはマウスイベントの一つで、マウスイベントにもさまざまな種類や特徴があります。

そこで今回は、マウスイベントのボタン操作について解説します。

## ボタン操作イベントの種類
マウスイベントには数多くの種類があります。主にボタン操作とカーソル移動に分けられます。
その中でも、以下が代表的なボタン操作によるマウスイベントです。

* ```click```：マウスの左ボタンをクリックした時
* ```dblclick```：マウスの左ボタンをダブルクリックした時
* ```contextmenu```：マウスの右ボタンをクリックしコンテキストメニューを開こうとした時
* ```mousedown/mouseup```：マウスのいずれかのボタンを押した瞬間と離した瞬間

クリック操作一つとっても、左クリックや右クリック、またダブルクリックはすべて異なるイベントです。

これまでで、既にクリックボタンは見てきましたが、その他のイベントも使い方はほとんど同じです。
要素の属性値とDOMプロパティにイベントハンドラを登録する場合、```on<event>```と記述します。また、```addEventListener```メソッドを使う場合には、イベント名のみを引数に記述します。
```html
<!-- 要素の属性値 -->
<input type="button" value="button" on<event>="ハンドラ関数()">

<script>
// DOMプロパティ
button.on<event> = ハンドラ関数;

// イベントリスナー
button.addEventListener('event', ハンドラ関数);
</script>
```

各イベントにおけるバブリングの発生やデフォルト動作のキャンセルは、以下の通りに設定されています。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```click```|あり|可|
|```dblclick```|あり|可|
|```contextmenu```|あり|可|
|```mousedown/mouseup```|あり|可|

## ボタン操作が発生する順番
ボタン操作では、発生するイベントの順番が決まっています。

例えば、あるボタンを左クリックする際、最初にボタンを押す瞬間を捉える```mousedown```イベントが発生します。ボタンが押されると、それが離された時に```mouseup```イベント、すべて終えると```click```イベントが発生します。

以下は、```click```, ```mousedown```, ```mouseup```が発生する順番を検証した結果です。
```html
<h2>Click this button</h2>
<input id="btn" type="button" value="button">

<script>
  let btn = document.getElementById('btn');

  btn.addEventListener('click', () => console.log('click'));
  btn.addEventListener('mousedown', () => console.log('mousedown'));
  btn.addEventListener('mouseup', () => console.log('mouseup'));
</script>
```

ボタンを左クリックすると、```mousedown``` → ```mouseup``` → ```click```の順で出力されることが分かります。

** mouseevents_1 **

また、同じ要素に対して```click```イベントと```dblclick```イベントのハンドラを登録した場合を見てみましょう。
```html
<h2>Click this button</h2>
<input id="btn" type="button" value="button">

<script>
  let btn = document.getElementById('btn');

  btn.addEventListener('click', () => console.log('click'));
  btn.addEventListener('dblclick', () => console.log('dblclick'));
</script>
```

左ボタンを短い間隔で2回クリックした場合、どのような結果が得られるでしょうか。

** mouseevents_3 **

すると、```click```イベントが2回発生した後、```dblclick```イベントが1回発生していることが分かります。

このように、ユーザーの一つのアクションは複数のイベントによって起こることがあります。

## マウスボタン
ボタン操作によるマウスイベントには、```button```プロパティが用意されており、
それによって正確なマウスのボタンを把握することができます。

多機能マウスの場合、```event.button```で取得できる値は以下です。
|ボタンの種類|取得できる値|
|:--:|:--:|
|左ボタン|0|
|ホイールボタン|1|
|右ボタン|2|
|戻るボタン|3|
|進むボタン|4|

以下は、```mousedown```イベントがどのボタンで発生したか調べるためのコードです。

```html
<h2>Click this button</h2>
<input id="btn" type="button" value="button">

<script>
  let btn = document.getElementById('btn');
  btn.addEventListener('mousedown', (e) => console.log('mousedown: ' + e.button));
</script>
```

左ボタンと右ボタンを1回ずつクリックしてみます。

** mouseevents_2 **

すると、0と2の値を取得していることが確認できます。

ほとんどの場合0か2の値を取りますが、特に```mousedown/mouseup```イベントは、ボタンの種類に関係なくイベントが発生するため、どのボタンがクリックされたのか区別することが可能です。

## コンテキストメニューのキャンセル
```contextmenu```イベントは、コンテキストメニューを開こうとした時に発生します。

通常、マウスの右ボタンをクリックするかコンテキストメニューキーを押すとコンテキストメニューが開くように、デフォルトでその動作が設定されています。

ここでは、その既存の動作をキャンセルし、独自のテキストを表示するようにします。
```html
<button>Open context menu</button>
<button id="text">See our original message</button>

<script>
  let text = document.getElementById('text');
  text.addEventListener('contextmenu', e => {
    e.preventDefault();
    text.textContent = 'Tada!';
  });
</script>
 ```

一つ目のボタンを右クリックすると、コンテキストメニューが開きます。

** mouseevents_4 **

二つ目のボタンを右クリックすると、今度はコンテキストメニューは表示されず、ボタンが独自のテキストに切り替わります。

** mouseevents_5 **

## まとめ
今回は、マウスイベントのボタン操作について解説しました。

```plain
// ポイント
* マウスイベントのボタン操作には、click, dblclick, contextmenu, mousedown/mouseupなどがある
* ボタン操作は発生する順番が決まっていて、複数のボタン操作によって一つのアクションが発生することがある
* buttonプロパティで、イベントが発生したマウスのボタンを調べることができる
```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作（当記事）

