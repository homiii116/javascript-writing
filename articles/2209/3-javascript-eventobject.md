# 【JavaScriptの基本】イベントオブジェクト

イベントが発生しイベントハンドラやイベントリスナーが呼び出されると、イベントオブジェクトというものが渡されます。

イベントオブジェクトには、イベントの詳細情報が保管されています。
例えば、イベントハンドラが登録されている要素やイベントの種類などの情報です。

今回は、イベントオブジェクトについて解説していきます。

## イベントオブジェクト
イベントを適切に処理するためにも、今何が起こっているのか調べたい時があります。
そのような時、イベントに関する情報が格納されているイベントオブジェクトからヒントを得ることができます。

イベントの種類や対象の要素だけでなく、マウスの座標はどこにあるのか、どのキーが押されたのかなどです。

ブラウザはイベントが発生すると、イベントハンドラやイベントリスナーの引数としてイベントオブジェクトを渡します。
```html
<input id="elem" type="button" value="button">

<script>
  // イベントオブジェクトを引数に受け取る
  function showEventType(event) {
    // イベントの種類を出力
    console.log(event.type);
  }

  let elem = document.getElementById('elem');
  elem.addEventListener('click', showEventType); // click
</script>
```
イベントオブジェクトの引数には任意の名前が使えますが、開発者の間では```event```や```e```、```evt```などと記述して使われています。

## イベントオブジェクトのプロパティ
```Event```オブジェクトのプロパティを参照することで、さまざまな情報を取得することができます。
以下が```Event```オブジェクトのプロパティ例です。

|プロパティ名|参照先|
|:--:|:--:|
|```Event.type```|イベントの種類|
|```Event.target```|イベントが最初に発生した要素|
|```Event.currentTarget```|イベントが現在登録されている要素|
|```Event.bubbles```|イベントがバブリングするか示す|
|```Event.cancelable```|イベントがキャンセル可能か示す|
|```Event.timeStamp```|イベントが生成された時刻（ミリ秒）|
|```Event.clientX```, ```Event.clientY```|マウスカーソルのウィンドウ座標|

イベントの種類によって作成される```Event```オブジェクトが異なります。
マウス操作であれば```MouseEvent```オブジェクト、キーボード操作であれば```KeyboardEvent```オブジェクトのように、ユーザーがどのような操作をしたかで変わります。

他にもさまざまなプロパティが用意されていますが、イベントの種類のよっても異なるため、各イベントを扱う際に取り上げていきます。

## イベントオブジェクトの受け取り
イベントオブジェクトは、DOMプロパティに対してイベントハンドラを登録する場合と、```addEventListener```メソッドでイベントリスナーを登録する場合に受け取ることができます。

イベントオブジェクト受け取りの流れは以下です。
1. 要素に対してイベントハンドラやイベントリスナーを登録する
2. イベントが発生する
3. イベントオブジェクトが作られる
4. この時、ハンドラに登録したイベントの情報をイベントオブジェクトに格納
5. 呼び出した関数にイベントオブジェクトが渡される

では、どのような値が取得できるのか見てみましょう。
以下は、DOMプロパティにクリックイベントを割り当てたパターンです。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>  
  let elem = document.getElementById('elem');

  elem.onclick = function(event) {
    console.log('type: ' + event.type);
    console.log('target: ' + event.target);
    console.log('currentTarget: ' + event.currentTarget);
    console.log('bubbles: ' + event.bubbles);
    console.log('cancelable: ' + event.cancelable);
    console.log('timeStamp: ' + event.timeStamp);
    console.log('coordinate: ' + event.clientX + ', ' + event.clientY);
  };
</script>
 ```

** eventobject_1 **

この場合、発生したイベントはクリック操作のため、```MouseEvent```オブジェクトが作成されています。
```MouseEvent```オブジェクトのプロパティにアクセスすることで、上記のような情報を取得することができます。

## handleEvent()
```addEventListener```メソッドの第二引数には、関数以外にもオブジェクトを割り当てることができます。
```handleEvent```は、そのオブジェクトとして設定するメソッドです。

```javascript
elem.addEventListener('click', {
  handleEvent(event) {
    ...
  }
});
 ```
別の言い方をすると、```addEventListener```のハンドラにオブジェクトが指定されると、イベント発生時に```object.handleEvent(event)```が呼び出されます。

そのため、クラスを扱うことも可能です。
以下のように、複数のイベントに対して同じオブジェクトを使うこともできます。
```html
<h2>Do something on this page.</h2>
<p id="text"></p>

<script>
  class Event {
    handleEvent(event) {
      switch(event.type) {
        case 'click':
          text.textContent = 'You clicked!';
          break;
        case 'mousemove':
          text.textContent = 'You moved a mouse!';
          break;
      }
    }
  }

  let event = new Event();
  let text = document.getElementById('text');

  document.addEventListener('click', event);
  document.addEventListener('mousemove', event);
</script>
 ```
この場合、```event```オブジェクトは、```click```と```mousemove```のイベントタイプに反応します。

このページ上のどこかでクリックした場合とマウスを動かした場合で、異なるメッセージを表示することができます。

クリックした場合：
** eventobject_2 **

マウスを動かした場合：
** eventobject_3 **

## まとめ
今回は、イベントオブジェクトについて解説しました。

```plain
// ポイント
* イベントオブジェクトには、ハンドラに登録されているイベントの情報が格納されている
* イベントが発生すると、イベントオブジェクトがハンドラの引数として渡される
* Eventオブジェクトのプロパティにアクセスすることでイベントの情報を取得できる
* handleEventは、addEventeListenerメソッドの第二引数にオブジェクトとして指定するメソッド
 ```

イベントオブジェクトは、イベントのさまざまな操作における確認やデバッグなどで使われます。イベントの種類によっても異なるため、パターン毎に振る舞いを確認してみると良いでしょう。

## 合わせて読みたいイベント概要シリーズ
第1回：イベントハンドラ
第2回：イベントリスナー
第3回：イベントオブジェクト（当記事）