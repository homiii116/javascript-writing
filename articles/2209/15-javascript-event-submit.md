# 【JavaScriptの基本】フォームの送信

通常、フォームに入力されたデータはサーバーに送られますが、
その前にデータの確認を行ったり、あるいは送信を中止したいことがあります。

このような時、```submit```イベントを使用して、フォームの検証を行うことができます。

今回は、フォーム送信時に利用される```submit```イベントについて解説していきます。

## submitイベント
```submit```イベントは、フォームが送信された時に発生するイベントです。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```submit```|あり|不可|

フォームの設置には、主に入力用フォーム```<input type="text">```と送信ボタン```<input type="submit">```などの要素が用意されます。

```html
<input type="text">
<input type="submit" value="Submit">
 ```

** submit_1 **

そして、フォームに入力された内容を送信するために、主に以下の二つの方法が取られ、```submit```イベントに繋がります。
1. 入力用フォーム```<input type="text">```で```Enter```キーを押す
2. 送信ボタン```<input type="submit">```を押す

```submit```イベントは、ユーザーがフォーム上で```Enter```キーを押したり送信ボタンを押すことで発生しますが、要素的には```<form>```から発生していることに注意が必要です。

```<input >```や```<button>```から発生するものではないため```<form>```に対して```submit```イベントを割り当てるようにします。

以下は、フォーム送信時にログメッセージが表示されるコードです。
```html
<form id="form">
  <label>Your name：<input type="text" id="name"></label>
  <input type="submit" value="Submit">
</form>
<p id="log"></p>

<script>
  let form = document.getElementById('form');
  let log = document.getElementById('log');

  form.addEventListener('submit', () => {
    log.textContent = 'Form submitted!';
  });
</script>
```

ボタンをクリックするかフォーム上で```Enter```キーを押すと処理が実行されます。

** submit_2 **

もし送信処理は行わずに送信前の確認としてメッセージの表示のみ行いたい場合もあるかもしれません。
```<form>```の```onsubmit```属性に```return false```を記述するとフォームの送信は行われなくなります。
```html
<form id="form" onsubmit="return false">
  <label>Your name：<input type="text" id="name"></label>
  <input type="submit" value="Submit">
</form>
 ```

しかし送信ボタンのクリックならわかりますが、なぜ```Enter```キーでも同様に動作するのでしょうか。

理由は、フォーム上で```Enter```キーが押された時、送信ボタンの```<input type="submit">```でクリックイベントが発生するからです。
```html
<form id="form" onsubmit="return false">
  <label>Your name：<input type="text" id="name"></label>
  <input type="submit" value="Submit" onclick="console.log('Click event')">
</form>
 ```
フォームには```onclick```を設定していないにも関わらず、```Enter```キーを押すとクリックイベントが発動し、コンソール出力が行われます。

** click **

## submitメソッド
```submit()```とは、JavaScript側でフォーム送信を制御するためのメソッドです。
```javascript
form.submit();
 ```

通常、```<input type="submit">```などとしてhtml要素に送信ボタンを作成し、フォーム送信が行われますが、```submit```メソッドを使用することで手動でフォーム送信を行うことができます。

次の例を見てください。
```html
<form id="form">
  <label>Your name：<input type="text" id="name"></label>
  <button id="btn">Submit</button>
</form>
<p id="log"></p>

<script>
  let name = document.getElementById('name');
  let log = document.getElementById('log');
  let btn = document.getElementById('btn');

  // ボタン要素にクリックイベントを登録
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    log.innerHTML = `Form submitted by ${name.value}`;

    // ドキュメント内のformに対して送信を行う
    document.form.submit();
  });
</script>
```
```<button>```で送信ボタンを設置しクリックイベントを割り当てています。また、ハンドラとして次の処理を登録しています。
* フォーム送信時のデフォルト動作のキャンセル
* メッセージと入力した名前の表示
* 入力内容の送信

では、フォームに名前を入力してボタンを押してみます。

入力中：

** submit_3 **

ボタンクリック後：

** submit_4 **

```Enter```キーを押しても同様の処理が行われます。

これでJavaScriptで任意の処理と同時にフォームの送信ができました。

## まとめ
今回は、フォーム送信時に利用される```submit```イベントについて解説しました。

```plain
// ポイント
* submitイベント：フォームが送信された時に発生するイベント
* submitイベントはform要素から発生する
* submitメソッド：JavaScript側でフォーム送信を制御するためのメソッド
```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動
第3回：マウスイベント -座標とキー
第4回：キーボードイベント
第5回：フォーカスイベント
第6回：データの更新
第7回：フォームの送信（当記事）






