# 【JavaScriptの基本】新しいイベントの発生

イベントはブラウザを見ているユーザーの操作によって発生しますが、JavaScriptで新しいイベントを作成し、特定の対象でイベントを実行することもできます。

今回は、新しいイベントの発生方法について解説していきます。

## 新しいイベントの作成
新しいイベントを発生させるためには、ますイベントの作成が必要です。
```Event```オブジェクトのコンストラクタを使用します。
```javascript
new Event(eventtype[, option]);
```
第一引数には、以下のいずれかでイベントの種類を文字列で指定します。
* 既存のイベント名：```'click'```や```'mousedown'```など
* カスタムイベント名：```'hi'```などの任意のカスタムイベント名

第二引数は、省略可能で以下の値を指定することができます。
* ```bubbles```：```true```の場合、イベントをバブリング可能にする
* ```cancelable```：```true```の場合、イベントをキャンセル可能にする

デフォルトではどちらも```false```です。

例えば、新しくクリックイベントを作成するには、このように書くことができます。
```javascript
let event = new Event('click');
```

##　イベントの実行
イベントを作成した後、```dispatchEvent```メソッドを使ってイベントの実行をすることで、イベントを発生させることができます。
```javascript
EventTarget.dispatchEvent(event);
```

引数には、上記で作成した```Event```オブジェクトを指定します。
```javascript
let event = new Event('click');
target.dispatchEvent(event);
```

また、発生したイベントがユーザーによるものか、```dispatchEvent```メソッドによるものか調べることができます。
```Event.isTrusted```を参照して```true```の場合、ユーザー操作によるものです。JavaScriptで生成されたイベントは```false```となります。

次のコードを見てください。
```html
<h2>Click buttons</h2>
<input id="btn1" type="button" value="button1">
<input id="btn2" type="button" value="button2">

<script>
  let btn1 = document.getElementById('btn1');
  let btn2 = document.getElementById('btn2');

  btn1.onclick = (e) => {
    console.log('btn1: ' + e.isTrusted);

    let event = new Event('click');
    btn2.dispatchEvent(event);
  };

  btn2.onclick = (e) => {
    console.log('btn2: ' + e.isTrusted);
  };
</script>
 ```
2つの```<input>```に対して、どちらもクリックイベントの指定がされているのと、ハンドラの中で```e.isTrusted```で参照できる値を出力しています。

その内```btn1```のハンドラの中では、```btn2```のクリックイベントも発生させています。つまり、button1をクリックすると、button2のクリックも発動するということです。

では、button1をクリックしてみます。

** eventdispatch_1 **

button1のクリックはユーザーの操作によって行われたものであるため、```true```が返ります。一方、button2のクリックはJavaScript側で作成したイベントのため、```false```が返ります。

次にbutton2をクリックしてみます。

** eventdispatch_2 **

今度は、button2にはユーザー操作によって行われたイベントしか登録されていないため、```true```のみが返ります。

このように、ユーザー以外のイベントを作成し実行できることが分かります。

## カスタムイベント
既存イベントを新しく作成するだけでなく、独自のカスタムイベントを作成することもできます。

以下は、```hi```と言う名前のカスタムイベントを実行したコードです。
```html
<h1>This is H1</h1>
<h2 id="text"></h2>

<script>
  // ドキュメントでイベントをキャッチする
  document.addEventListener('hi', (e) => {
    console.log('Hi from ' + e.target.tagName);
  });

  // カスタムイベント'hi'を作成する際、バブリングを設定する
  let event = new Event('hi', {bubbles: true});
  let text = document.getElementById('text');
  text.dispatchEvent(event);
</script>
```

** eventdispatch_3 **

```"Hi from H2"```がコンソールに出力されているように、```<h2>```で発生したイベントが```document```に伝搬し、そこで設定したハンドラが実行されています。

既存イベントとほとんど同じように作成することができますが、補足するべきポイントは、カスタムイベントの場合```addEventListener```を使う必要があることです。

既存のイベントであれば、```on<event>```でイベントを指定できますが、カスタムイベント場合、```onhi```のように指定しても動かないためです。

また、カスタムイベントには、```new CustomEvent()```を使うことで任意の情報を設定することができます。
```javascript
new CustomEvent(eventtype[, option]);
 ```
第二引数には、オプションで```detail```プロパティを持たせることが可能です。

以下は、自身のプロフィールをカスタムイベントで表示させるためのコードです。
```html
<h1 id="text">Hi, this is Hanako!</h1>

<script>
  // detailプロパティにプロフィール情報を格納する
  let event = new CustomEvent('info', {
    detail: {
      name: 'Hanako Yamada',
      city: 'Tokyo', 
      age: 25,
      job: 'Developer'    
    }
  });

  let text = document.getElementById('text');
  text.addEventListener('info', (e) => {
    console.log('Here is my info');
    // e.detailでプロフィール情報の一覧を参照する
    console.log(e.detail);
  });

  text.dispatchEvent(event);
</script>
```

** eventdispatch_4 **

このように、```detail```プロパティは任意のデータを保管することができます。
```new CustomEvent()```は、カスタムイベントをより明確にするためにも有効です。

## まとめ
今回は、新しいイベントの発生方法について解説しました。

```plain
// ポイント
* Eventコンストラクタは、既存のイベントまたは独自のカスタムイベントを新しく作成する
* dispatchEventメソッドは、新しく作成したイベントを実行する
* カスタムイベント場合、CustomEventコンストラクタでより詳細のデータを保持できる
```

## 合わせて読みたいイベント概要シリーズ
第1回：イベントハンドラ
第2回：イベントリスナー
第3回：イベントオブジェクト
第4回：バブリングとキャプチャリング
第5回：Event.targetとEvent.currentTarget
第6回：イベント移譲
第7回：デフォルト動作のキャンセル
第8回：新しいイベントの発生（当記事）