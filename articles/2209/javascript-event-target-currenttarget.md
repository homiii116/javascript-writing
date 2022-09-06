# 【JavaScriptの基本】Event.targetとEvent.currentTargetの違い

イベントの操作では、イベントが発生してる箇所を調べたい時が度々あります。
そのような時、```Event.target```や```Event.currentTarget```で検証を行うことが良くありますが、それらの性質は少し異なります。

今回は、```Event.target```と```Event.currentTarget```の違いについて解説していきます。

## Event.targetとEvent.currentTarget
イベントの情報を取得するには、```Event```オブジェクトのプロパティを参照します。
その中でも、イベント発生に関連する情報は以下のプロパティによって取得することができます。

|プロパティ名|参照先|
|:--:|:--:|
|```Event.target```|イベントが発生した要素|
|```Event.currentTarget```|ハンドラが登録された要素|

まず、かんたんな実験として、```<input>```にクリックイベントを登録し、```Event```オブジェクトにアクセスしてみます。
```tagName```プロパティを使って、```event.target```と```event.currentTarget```が持つ要素を取得します。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>  
  let elem = document.getElementById('elem');

  elem.onclick = function(event) {
    console.log('target: ' + event.target.tagName);
    console.log('currentTarget: ' + event.currentTarget.tagName);
  };
</script>
 ```

では、```<input>```をクリックしてみます。
** target-currenttarget_1 **

すると、どちらも"INPUT"と出力されるように、同じ要素を参照していることが分かります。

これだけでは、二つのプロパティに違いは見られません。
```Event.target```と```Event.currentTarget```の違いを理解するには、前回の記事で紹介したバブリングとキャプチャリングが関わっています。

では、もう少し別のパターンで見ていきましょう。

## 







