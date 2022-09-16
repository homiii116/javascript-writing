# 【JavaScriptの基本】マウスイベント -座標とキー

マウスイベントが発生しハンドラが実行されると、引数として```MouseEvent```オブジェクトが渡されます。
そして```MouseEvent```オブジェクトは、マウスの位置を表す座標やクリックされたキーの情報を持っています。

今回は、マウスイベントで取得できる座標とキーの情報について解説します。

## 座標
すべてのマウスイベントには、座標を取得するプロパティが用意されています。
その中でも良く使われるのが以下の2種類のプロパティです。

* ```clientX/Y```：ウィンドウの水平/垂直座標
* ```pageX/Y```：ドキュメントの水平/垂直座標

```clientX/Y```プロパティは、現在見ているブラウザウィンドウの左上を原点とした座標です。そのため、ページがスクロールされた場合、座標の値は変化します。

一方、```pageX/Y```プロパティは、ドキュメント全体の左上を原点とした座標です。これは文書が見えていない範囲含むため、ページがスクロールされたとしても座標の値は変わりません。

次のような1ページに収まらない縦に長いHTMLドキュメントがあるとします。
```html
<style>
  body {
    width: 540px;
  }

  #box {
    border: 2px solid blue;
    height: 200px;
  }

  p {
    padding: 10px;
  }
</style>

<h2>座標を取得する</h2>
<div id="box">
  <p>Click here □</p>
</div>
 ```

** event-coordinates_1 **

次のコードのように、チェックボックスをクリックした場合に取得できる座標を検証してみましょう。
```javascript
let box = document.getElementById('box');
box.addEventListener('click', e => {
  console.log('clientX: ' + e.clientX);
  console.log('clientY: ' + e.clientY);
  console.log('pageX: ' + e.pageX);
  console.log('pageY: ' + e.pageY);
});  
```

まずは、ページがスクロールされていない状態でクリックしてみます。

** event-coordinates_2 **

この場合、```clientX/Y```（ウィンドウ座標）と```pageX/Y```（ドキュメント座標）はまったく同じ座標です。

次に、"Click here"がページの上に来るようにスクロールし、チェックボックスをクリックします。

** event-coordinates_3 **

すると、```clientY```の座標が```156```から```23```に変わりました。これは```clientX/Y```がウィンドウに相対的だからです。

この場合、横にスクロールしていないため```clientX```の値は変わりません。
縦のスクロールに動きに合わせて、```clientY```の座標が影響しています。

一方、```pageX/Y```はドキュメントに相対するため座標は変わりません。

## キー
マウスイベント時に修飾子キーが押された場合、そのキーに関する情報を取得することができます。

以下がキーに対応するプロパティです。イベント時にこれらのキーが押された場合```true```が返ります。

* ```altKey```：Altキーが押された場合
* ```ctrlKey```：Controlキーが押された場合
* ```shiftKey```：Shiftキーが押された場合
* ```metaKey```：Metaキーが押された場合

これらのプロパティを利用することで、特定のキーとクリックに反応したハンドラを実行することができます。

また、Macユーザーの場合には注意が必要です。
多くのアプリケーションでは、WindowsやLinuxがControlキーを使うのに対し、MacではCommandキーを使うことがあります。

Commandキーは、```metaKey```プロパティに値します。
そのため、マウスイベント＋Controlキーを組み合わせたい場合には、```if (event.metaKey || event.ctrlKey)```とチェックするのが無難です。

次の例を見てください。
```html
<button id="btn">Shift key + Click</button>
<p id="msg"></p>

<script>
  let btn = document.getElementById('btn');
  let msg = document.getElementById('msg');

  btn.addEventListener('click', e => {
    if (e.shiftKey) {
      msg.innerHTML += 'Success!<br>';
    } else {
      msg.innerHTML += 'Press Shift key and Click!<br>';
    }
  });
</script>
```

画面に表示されているボタン上で、Shiftボタンとマウスの左ボタンを押すと、"Success!"というメッセージが表示されます。

** event-keys_1 **

もし、Commandキーを押した場合やマウスの左ボタンをクリックしただけの場合、"Press Shift key and Click!"のメッセージが表示されます。

** event-keys_2 **

このように、マウスイベントと修飾子キーを組み合わせることで、さらに細かくハンドラを制御することができます。

## まとめ
今回は、マウスイベントで取得できる座標とキーの情報について解説しました。

```plain
// ポイント
* clientX/Y：ウィンドウの水平/垂直座標を取得する
* pageX/Y：ドキュメントの水平/垂直座標を取得する
* 修飾子キーに対応するプロパティには、altKey, ctrlKey, shiftKey, etaKeyがある
* これらのキーが押されるとtrueが返る
```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動
第3回：マウスイベント -座標とキー（当記事）

