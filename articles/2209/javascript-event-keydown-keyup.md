# 【JavaScriptの基本】キーボードイベント -keydownとkeyup

キーボードイベントは、ユーザーによるキーボードの操作のことです。
例えば、特定のキーが押されたらメッセージを表示したり、あるいはどのキーが押されたか確認したい時などにキーボードイベントが使用されます。

そこで今回は、キーボードイベントのkeydownとkeyupについて解説していきます。

## keydownとkeyup
```keydown```はキーが押された時に発生するイベントで、```keyup```は押されていたキーが離された時に発生するイベントです。

これらのイベントにおけるバブリングの発生やデフォルト動作のキャンセルは、以下の通りです。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```keydown```|あり|可|
|```keyup```|あり|可|

```keydown```イベントと```keyup```イベントが発生したら、それぞれのイベント名を出力するテストを行ってみます。
```html
<p>Press a key</p>
<textarea id="area"></textarea>

<script>
  let area = document.getElementById('area');
  area.onkeydown = () => console.log('keydown');
  are.onkeyup = () => console.log('keyup');
</script>
```

テキストフィールドの中で適当な文字を入力してみましょう。
ここでは```a```を入力します。

** keyboard-event_1 **

すると、```keydown``` → ```keyup```の順で出力されます。

このように、キーを押す作業とキーを離す作業によって文字の入力が行われることが分かります。

## キー情報
キーボードイベントが発生しハンドラが実行されると、引数として```KeyboardEvent```オブジェクトが渡されます。
```KeyboardEvent```オブジェクトには、イベント発生時に押されたキーの情報を持っています。

### codeとkeyプロパティ
以下のプロパティにアクセスすると、キー情報を文字列で取得します。

* ```code```：押されたキー
* ```key```：押されたキーを表す文字

```code```プロパティは実際に押された物理的なキーコードを取得する一方、```key```プロパティは押されたキーを表す文字を取得します。

例えば、```a```が押されたパターンと```Shift + a```が押されたパターンでは、```KeyboardEvent.key```は異なる文字を取得します。

```html
<p>Press keys</p>
<textarea id="area"></textarea>

<script>
  let area = document.getElementById('area');
  area.onkeydown = (e) => {
    console.log('key: ' + e.key);
  };
</script>
```

```a```を押した場合：

** keyboard-event_2 **

```Shift + a```を押した場合：

**　keyboard-event_3 **


しかし、```KeyboardEvent.code```はどちらもパターンも同じ結果です。

```html
<p>Press keys</p>
<textarea id="area"></textarea>

<script>
  let area = document.getElementById('area');
  area.onkeydown = (e) => {
    console.log('code: ' + e.code);
  };
</script>
```

```a```を押した場合：

** keyboard-event_4 **

```Shift + a```を押した場合：

**　keyboard-event_5 **

このように、```KeyboardEvent.key```は文字であるため、```Shift + a```を押すことで入力したキーが大文字の```A```であると判断します。
```Keyboard.code```の場合、```Shift```が押されているかどうかは関係なく、物理的に押されたキーコード、つまり```KeyA```を取得します。

|押されたキー|key|code|
|:--:|:--:|:--:|
|```a```|a|KeyA|
|```Shift+a```|A|KeyA|

### キーコード
```KeyboardEvent.code```で取得した```KeyA```のように、すべてのキーはキーコードを持っています。

キーボード上の位置やキーの種類に応じてコードが異なります。

|キーの種類|キーコード|例|
|:--:|:--:|:--:|
|文字キー|```Key<letter>```|```KeyA```, ```KeyZ```|
|数字キー|```Digit<number>```|```Digit1```, ```Digit9```|
|特殊キー|キーの名前|```ShiftLeft```,```Tab```|

```Shift```キーのように、キーボードの左右に二箇所配置されている場合、キーの名前に加えて```Left```または```Right```が示されます。

また、文字キーを表すキーコードは、```key<letter>```ではなく```Key<letter>```のように、最初の文字が大文字となるため注意が必要です。
押されたキーコードによって条件分岐を行いたい場合には、```e.code == "Key<letter>"```となります。

### 文字以外のキー
キーが文字ではなく特殊キーの場合、```KeyboardEvent.key```はどのような値を取得するでしょうか。
このような場合、```key```プロパティと```code```プロパティは類似しています。

|押されたキー|key|code|
|:--:|:--:|:--:|
|```Tab```|Tab|Tab|
|```Enter```|Enter|Enter|
|```Shift```|Shift|ShiftLeft|

実際にTab, Enter, Shiftキーを押したパターンをブラウザで検証してみます。

```html
<p>Press keys</p>
<textarea id="area"></textarea>

<script>
  let area = document.getElementById('area');
  area.onkeydown = (e) => {
    console.log('key: ' + e.key);
    console.log('code: ' + e.code);
  };
</script>
 ```

** keyboard-event_6 **

上述の通り、```key```プロパティは押されたキーを表す文字を取得します。つまり、キーの意味を表すため、特殊キーの名前を取得する場合がほとんどです。

しかし、```code```プロパティは厳密なキーを取得します。
Shiftを押した場合、```key```プロパティはキーの位置まで取得しない一方、```code```プロパティは位置まで厳密に区別します。

## 修飾子キー
前回の記事、マウスイベントの座標とキーでも解説しましたが、以下は```KeyboardEvent```オブジェクトの専用プロパティです。

イベント時にこれらのキーが押された場合```true```が返ります。

* ```altKey```：Altキーが押された場合
* ```ctrlKey```：Controlキーが押された場合
* ```shiftKey```：Shiftキーが押された場合
* ```metaKey```：Metaキーが押された場合

キーボードイベント時に、ShiftキーやControlキーが一緒に押されているか確認したい時に、これらのプロパティを使うと便利です。

例えば、テキストフィールドに```Shiftキー+z```が押されたらメッセージを表示したいような場合です。
```html

```


