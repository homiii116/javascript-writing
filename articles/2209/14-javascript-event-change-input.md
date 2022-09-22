# 【JavaScriptの基本】デーの更新

```<input>```, ```<textarea>```, ```<select>```などの要素は、ユーザーによって値が常に変更されていきます。

今回は、このようなデータ更新に伴って発生するイベントについて解説していきます。

## change
```change```は、ユーザーが要素の値を変更した時に発生するイベントです。値が変更されている間ではなく、値の変更が完了した時にトリガされます。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```change```|あり|不可|

例えば、テキストボックスは文字の入力が終了し、他のものにフォーカスが移ると```change```イベントが発生します。
```html
<label>Name：<input type="text" id="name"></label>
<input type="button" value="button">
<p id="result"></p>

<script>
  let name = document.getElementById('name');
  let result = document.getElementById('result');

  name.onchange = function() {
    result.textContent = name.value; 
  };
</script>
```

文字入力中：

** change_1 **

buttonクリック後：

** change_2 **

選択メニューやラジオボタンの場合は、元の値から別の値へ選択が変わった直後に```change```イベントが発生します。

## input
```input```は、ユーザーが要素の値を変更した時に発生するイベントです。```change```イベントと異なり、値が変更される度にトリガされます。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```change```|あり|不可|

テキストボックスに文字の入力や削除をし変更を行うと、その度に```input```イベントが発生します。
```html
<input placeholder="Enter your name" id="name">
<p id="result"></p>

<script>
  let name = document.getElementById('name');
  let result = document.getElementById('result');

  name.oninput = function() {
    result.textContent = name.value; 
  };
</script>
 ```

文字入力中：

** input_1, 2 **

文字削除中：

** input_3 **

```input```イベントの場合も、選択メニューやラジオボタンでは、元の値から別の値へ選択が変わった直後にイベントが発生します。

## copy, cut, paste
```copy```はユーザーが要素の値をコピー操作をした時、```cut```は値をカット操作をした時、```paste```は値をペースト操作した時に発生するイベントです。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```copy```|なし|不可|
|```cut```|なし|不可|
|```paste```|なし|不可|

イベントが発生しハンドラが実行されると、```Event```オブジェクトを継承した```ClipboardEvent```オブジェクトが引数に渡されます。
```ClipboardEvent.clipboardData```プロパティは、ユーザーが行ったコピー/カット/ペースト操作の情報を取得することができます。

以下は、テキストボックスに文字```abcdef```を入力し、コピー/ペースト操作を行った例です。
```html
<input type="text" id="input">

<script>
  function getDate(e) {
    // コピー/ペーストのデータを取得する
    console.log(e.type + ' : ' + e.clipboardData.getData('text/plain'));
  }

  let input = document.getElementById('input');
  input.addEventListener('copy', getDate);
  input.addEventListener('paste', getDate);
</script>
 ```

** copy-paste **

コピーを行った情報と、ペースト時に何の値をペーストしたのかが出力されます。

また、```event.preventDefault()```を使ってこれらのアクションを無効にすることができます。
次のコードは、コピー/カット/ペースト操作をブロックしています。
```html
<input type="text" id="input">
<p id="log"></p>

<script>
  let log = document.getElementById('log');

  function noCopy(e) {
    log.innerHTML += 'コピー操作は禁止されています<br>';
    e.preventDefault();
  }

  function noCut(e) {
    log.innerHTML += 'カット操作は禁止されています<br>';
    e.preventDefault();
  }

  function noPaste(e) {
    log.innerHTML += 'ペースト操作は禁止されています<br>';
    e.preventDefault();
  }

  let input = document.getElementById('input');

  input.oncopy = noCopy;
  input.oncut = noCut;
  input.onpaste = noPaste;
</script>
 ```

テキストボックスで入力した値をコピー/カット/ペーストしようとしても、それらの操作は無効となり、禁止されているメッセージが表示されます。

** copy-cut-paste **

## まとめ
今回は、データ更新に伴うイベントについて解説しました。

```plain
// ポイント
* change：ユーザーが要素の値を変更し、それが終了した時に発生するイベント
* input：ユーザーが要素の値を変更する度に発生するイベント
* copy/cut/paste：ユーザーが要素の値をコピー/カット/ペースト操作した時に発生するイベント
 ```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動
第3回：マウスイベント -座標とキー
第4回：キーボードイベント
第5回：フォーカスイベント
第6回：データの更新（当記事）








