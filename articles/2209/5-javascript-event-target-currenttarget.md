# 【JavaScriptの基本】Event.targetとEvent.currentTarget

イベントの操作では、イベントが発生してる箇所を調べたい時が度々あります。
そのような時、```Event.target```や```Event.currentTarget```で検証を行うことが良くありますが、それらの性質は少し異なります。

今回は、```Event.target```と```Event.currentTarget```について解説していきます。

## Event.targetとEvent.currentTarget
イベントの情報を取得するには、```Event```オブジェクトのプロパティを参照します。
その中でも、イベントが発生した要素に関連する情報は、以下の2つのプロパティによって取得することができます。

|プロパティ名|参照先|
|:--:|:--:|
|```Event.target```|イベントが発生した要素|
|```Event.currentTarget```|ハンドラが登録された要素|

これらのプロパティは強力で便利ですが、異なる性質を持っているため、違いを理解しておくことは大切です。

ここでまずかんたんな実験として、親要素も子要素も持っていない```<input>```にハンドラを登録し、```Event```オブジェクトにアクセスしてみます。
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

どちらも```INPUT```と出力されるように、同じ要素を参照していることが分かります。
しかし、これだけでは二つのプロパティに決定的な違いは見られません。

これらの振る舞いは、バブリングが深く関わっています。
```Event.target```と```Event.currentTarget```の理解に繋げるために、前回の記事で解説したバブリングとキャプチャリングを学んでおくことをおすすめします。

以下で別のパターンを見ていきましょう。

## 子要素にハンドラを登録する場合
ここでは、親要素を持つ子要素にハンドラを登録したパターンで検証してみましょう。

次のコードは、```div > input```の親子関係に対し、```<input>```のみにハンドラを登録しています。
```html
<style>  
  #parent,#child {
    border: 2px solid blue;
    margin: 5px;
    padding: 20px;
    width: 300px;
  }
</style>

<h1>子要素にハンドラを登録する場合</h1>
<div id="parent">div
  <input id="child" type="button" value="Click me">
</div>

<script>
  let child = document.getElementById('child');
  child.addEventListener('click', (event) => {
    console.log(`target: ` + event.target.tagName);
    console.log(`currentTarget: ` + event.currentTarget.tagName);
  });
</script>
 ```
ボタンをクリックしてみます。

** target-currenttarget_2 **

すると、```event.target```と```event.currentTarget```はどちらも```INPUT```を取得することを確認できます。

クリックした箇所もハンドラを登録した箇所も```<input>```のため、予測できる結果です。

## 親要素にハンドラを登録する場合
次は、子要素を持つ親要素に対してハンドラを登録してみましょう。

以下は、```div > input```の親子関係に対し、```<div>```のみにハンドラを登録したパターンです。
```html
<style>  
  #parent,#child {
    border: 2px solid blue;
    margin: 5px;
    padding: 20px;
    width: 300px;
  }
</style>

<h1>親要素にハンドラを登録する場合</h1>
<div id="parent">div
  <input id="child" type="button" value="Click me">
</div>

<script>
  let parent = document.getElementById('parent');
  parent.addEventListener('click', (event) => {
    console.log(`target: ` + event.target.tagName);
    console.log(`currentTarget: ` + event.currentTarget.tagName);
  });
</script>
 ```
では、同じようにボタンをクリックしてみます。

** target-currenttarget_3 **

すると今後は、```event.target```と```event.currentTarget```で異なる要素が出力されます。

```event.target```は実際にイベントが発生した要素を取得するため、```INPUT```となります。これは、もっとも深い階層にいるターゲット要素です。

一方、```event.currentTarget```はハンドラが登録された要素を取得するため、```DIV```となります。
バブリングの原理から、クリックされた場所は関係ありません。
```<div>```の中にあるすべてのクリックをキャッチすることができるため、登録されたハンドラを実行することができます。

## まとめ
今回は、```Event.target```と```Event.currentTarget```について解説しました。

```plain
// ポイント
* Event.target：イベントが発生した要素
* Event.currentTarget：ハンドラが登録された要素
* 親要素にハンドラが登録されている場合、イベントが発生した場所が子要素であっても、Event.currenTargetで親要素を取得する
 ```

これらの振る舞いを理解しうまく使い分けられると、イベントが発生した要素は何か、ハンドラが登録されている要素は何か、的確に情報を得ることができます。


## 合わせて読みたいイベント概要シリーズ
第1回：イベントハンドラ
第2回：イベントリスナー
第3回：イベントオブジェクト
第4回：バブリングとキャプチャリング
第5回：Event.targetとEvent.currentTarget（当記事）