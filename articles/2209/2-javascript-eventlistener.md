# 【JavaScriptの基本】イベントリスナー

前回の記事でイベントハンドラを登録する方法について解説しましたが、もう一つイベントリスナーと呼ばれるハンドラを登録する方法があります。

HTML属性やDOMプロパティの場合、一つのイベントに一つしかハンドラを割り当てることができませんが、イベントリスナーでは複数のハンドラを割り当てることができます。

今回は、イベントリスナーの使い方について解説していきます。

## イベントリスナー
イベントリスナーは、他のイベントハンドラと同じように、イベントが発生した際に実行する関数を紐付けるための方法です。

```addEventListener```メソッドが使われることから、この方法だけイベントリスナーと呼ばれています。

イベントリスナーの特徴は、一つのイベントに対して複数のハンドラの割り当てができることです。
例えば、ボタンをクリックした時、ボタンの色を変えるのに加え、メッセージも表示したいような場合です。

DOMプロパティに二つのハンドラを割り当てようとすると、新しいプロパティが既存のものを上書きします。
```javascript
elem.onclick = function() {
  // ボタンの色を変更する処理
};

elem.onclick = function() {
  // メッセージを表示する処理
};
 ```
上記の場合、ボタンの色を変更する処理は行われず、メッセージを表示する処理のみが有効となります。

このような問題を解決してくれるのがイベントリスナーです。

以下で詳しく見ていきましょう。

## イベントリスナーの登録方法
イベントリスナーは、```EventTarget```オブジェクトに対して登録を行います。
```javascript
EventTarget.addEventListener();
```
```EventTarget```とは、イベントの受け取りやイベントリスナーを持つことのできるオブジェクトのことで、```Element```や```Document```、```Window```などが対象となります。

さらに、```addEventListener```メソッドには、以下の3つの引数を指定することができます。
```javascript
EventTarget.addEventListener(event, handler [, option]);
 ```
* ```type```：イベントの種類
* ```handler```：イベントハンドラとして紐付ける関数
* ```option```：オプションでイベントリスナーの特性を指定

以下は、ボタンをクリックすると"Clicked"とコンソールに出力されるコードです。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>
  let elem = document.getElementById('elem');
  elem.addEventListener('click', () => {
    console.log('Clicked'); 
  });
</script>
 ```

```addEventListener```の第一引数には、```'click'```のようにクリックイベントを指定しています。イベントハンドラでは```onclick```でしたが、イベントリスナーの場合```on```を省略したイベント名で記述します。

ボタンをクリックするとこのように表示されるはずです。

** eventlistener_1 **

もちろん第二引数には処理したいコードを直接書かずに、別途作成した関数を記述しても問題ありません。
```javascript
function sayClicked() {
  console.log('Clicked'); 
}

elem.addEventListner('click', sayClicked);
```
この場合、関数は```sayClicked()```ではなく、```sayClicked```のように括弧を付けずに記述することに注意してください。

## 複数のイベントリスナーの登録
複数のイベントリスナーを登録すると、その分だけハンドラを追加することができます。

同じ要素の同じイベントに対して複数のイベントリスナーを登録してみましょう。
次のコードを見てください。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>
  function handler1() {
    console.log('Hello!'); 
  }

  function handler2() {
    console.log('Thanks!'); 
  }

  function handler3() {
    console.log('Bye!');
  }

  let elem = document.getElementById('elem');
  elem.addEventListener('click', handler1); // "Hello!"
  elem.addEventListener('click', handler2); // "Thanks!"
  elem.addEventListener('click', handler3); // "Bye!"
</script>
 ```

** eventlistener_2 **

イベントが発生すると、イベントリスナーが登録されている順番に呼び出されます。
そのため、一回のクリックイベントで"Hello!" "Thanks!" "Bye!" の順で出力されていることが分かります。

## イベントリスナーの解除
```removeEventListener```メソッドで、既に登録されているイベントリスナーを解除することができます。
構文は```addEventListener```と同じです。
```javascript
EventTarget.removeEventListener(event, handler [, option]);
```

イベントリスナーを削除するには、既に割り当てた関数とまったく同じ関数を指定する必要があります。
```javascript
function sayHi() {
  console.log('Hi!');
}

// 同じ関数（sayHi）を割り当てる
target.addEventListener('click', sayHi);
target.removeEventListener('click', sayHi);
```

例えば、ボタンをクリックするとメッセージを出力し、同時にイベントリスナーを解除したいような場合、このように書くことができます。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>
  // 関数内でメッセージの出力とイベントリスナーの解除をしている
  function sayHi() {
    console.log('Hi!'); 
    this.removeEventListener('click', sayHi);
  }

  let elem = document.getElementById('elem');
  elem.addEventListener('click', sayHi); // "Hi!"
</script>
 ```
ボタンをクリックすると、"Hi"とメッセージが出力されるのと同時に、イベントリスナーが解除されています。それ以降ボタンをクリックしても何も起こりません。

** eventlistener_3 **

注意しなければいけないのは、ハンドラの削除には、割り当てたものとまったく同じである必要があるということです。

以下の場合、処理内容自体はまったく同じでも別の関数だと認識されます。
```javascript
target.addEventListener('click', () => {
  console.log('Hi!');
});

target.removeEventListener('click', () => {
  console.log('Hi!');
});

// "Hi!"
// "Hi!"
// "Hi!"
// "Hi!"
 ```

```removeEventeListener```は他の関数を取得していることとなり、ボタンを複数クリックするとその分だけ"Hi!"と出力されます。
そのため、ハンドラを削除したい場合には、関数を変数に保持するようにしましょう。

## まとめ
今回は、イベントリスナーの登録方法について解説しました。

```plain
// ポイント
* イベントリスナーは、イベントが発生した際に実行する関数を紐付けるための方法
* addEventListener()：イベントリスナーの登録
* removeEventListener()：イベントリスナーの解除
* 同じイベントに対して複数のハンドラを登録することができる
* イベントリスナーを解除するには、登録時と同じ関数であることが必要
 ```

イベントリスナーは、他のイベントハンドラと同じように、イベントが発生した時の処理を紐づける役割があります。
記述も長くなりがちですが、より柔軟にイベント処理を行えるため、習得しておくと良いでしょう。

## 合わせて読みたいイベント概要シリーズ
第1回：イベントハンドラ
第2回：イベントリスナー（当記事）