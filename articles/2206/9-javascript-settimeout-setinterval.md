# 【JavaScriptの基本】setTimeoutとsetIntervalによる関数スケジューリング

作成した関数をすぐに実行する場合もありますが、あるタイミングで実行するようにしたい場合もあります。
JavaScriptでは、setTimeoutとsetIntervalを使って関数呼び出しのスケジューリングを行います。

今回は、タイマー機能の実装で良く使用されるsetTimeoutとsetIntevalについて解説していきます。

## スケジューリングを行うメソッド
関数呼び出しのスケジューリングを行うには、次の2つのメソッドが使用できます。
* ```setTimeout()```：指定時間経過後に1回だけ関数を実行する
* ```setInterval()```：指定した一定時間ごとに関数を実行する

機能としては、関数の実行をタイマーで設定するようなイメージです。

また、これらのメソッドによって起動したタイマーをキャンセルすることもできます。
* ```clearTimeout()```：setTimeoutによる関数の呼び出しをキャンセルする
* ```clearInterval()```：setIntervalによる関数の呼び出しをキャンセルする

構文自体はほとんど同じですが、機能が異なります。
順番に見ていきましょう。

## setTimeoutメソッド
setTimeoutは、指定した時間が経過した後に1度だけ関数を呼び出します。

構文は次のようになります。
```javascript
setTimeout(func, delay, arg1, arg2, ...); 
```
引数にはそれぞれ以下を指定します。
* func：呼び出したい関数
* delay：関数を実行するまでの遅延時間（ミリ秒）
* arg1, arg2...：関数の引数があれば指定

例えば、このコードは3秒後に関数を実行します。
```javascript
function sayHi() {
  console.log('Hello!');
}

setTimeout(sayHi, 3000);
// "Hello!"
```

もしsayHi関数に引数がある場合には、このように書くことができます。
```javascript
function sayHi(message, myname) {
  console.log(message + 'My name is ' + myname);
}

setTimeout(sayHi, 3000, 'Hi, ', 'Emma');
// "Hi, My name is Emma"
```

setTimeoutを呼び出すと、その戻り値としてタイマー識別子が返ります。
これはタイマーを識別するためのIDのようなもので、clearTimeoutで関数実行をキャンセルする際に使われます。
そのため、setTimeoutは、```timerId```のように変数に代入して使用されることが多いです。
```javascript
// タイマー識別子
let timerId = setTimeout(...);
```

## clearTimeoutメソッド
clearTimeoutは、setTimeoutによる関数の実行を取り消します。

キャンセルするための構文は以下です。
```javascript
clearTimeout(timerId);
```
引数にはキャンセルしたい関数のタイマー識別子を指定します。
このタイマー識別子は、上記で解説したsetTimeoutを呼び出した時の戻り値として返るIDのことです。

例えば、このように書くことができます。
```javascript
let timerId = setTimeout(...);
clearTimeout(timerId);
```

次のコードでは、関数が1秒後に実行されるようにスケジューリングを行い、その後キャンセルをしています。
```javascript
let timerId = setTimeout(() => {
  console.log('実行されない');
}, 1000);

clearTimeout(timerId);
// 何も起きない
```
1秒経過して関数が呼び出される前にキャンセルが行われるため、結果としては何も実行されません。

多くの場合、イベントのような何かしらのアクションを引き金に、タイマーセットやキャンセルが行われます。
例えば、以下のようなボタンをクリックする時などです。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>タイマーサンプル</title>
</head>
<body>
  <p>タイマーサンプル</p>
  <input id="start" type="button" value="start">
  <input id="stop" type="button" value="stop">

  <script>
    let timerID;
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    // スタートボタンをクリックすると5秒後に関数が実行される
    startButton.addEventListener('click', () => {
      timerId = setTimeout(() => {
        console.log('5秒経過しました');
      }, 5000);
    });

    // ストップボタンをクリックするとタイマーが取り消しされる
    stopButton.addEventListener('click', () => {
      clearTimeout(timerId);
      console.log('タイマーがキャンセルされました');
    });
  </script>
</body>
</html>
```

画面のように、スタートボタンをクリックすると5秒後に```'5秒経過しました'```とコンソールに出力されます。

** setTimeout

一方、スタートボタンをクリックしてから5秒以内にストップボタンをクリックすると、関数の実行がキャンセルされます。

** clearTimeout

このように、何かのアクションをきっかけにタイマーのコントロールを行うことが一般的です。

## setIntervalメソッド
setIntervalは、指定した時間間隔で定期的に関数を呼び出します。

構文は引数を含めsetTimeoutと同じです。
```javascript
setInterval(func, delay, arg1, arg2, ...); 
```

例えば、このコードは3秒ごとに関数を実行しています。
```javascript
function sayHi() {
  console.log('Hello!');
}

setInterval(sayHi, 3000);
// "Hello!"
// "Hello!"
// "Hello!"
// ...
```
ブラウザがクリアされるかタイマーがキャンセルされない限り、3秒ごとに```"Hello!"```が出力され続けます。

setIntervalが実行されると、戻り値としてタイマー識別子が返ります。
そのため、後でタイマーを取り消しができるように、タイマー識別子変数に代入して使われることがあります。
```javascript
// タイマー識別子
let timerId = setInterval(...);
```

## clearIntervalメソッド
clearIntervalは、setIntervalによる関数の実行を取り消します。

キャンセルするための構文は以下です。
```javascript
let timerId = setInterval(...);
clearInterval(timerId);
```

スタートボタンとストップボタンをクリックする時の挙動を見てみましょう。
```html
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>タイマーサンプル</title>
</head>
<body>
  <p>タイマーサンプル</p>
  <input id="start" type="button" value="start">
  <input id="stop" type="button" value="stop">

  <script>
    let counter = 1;
    let timerID;
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');

    // スタートボタンをクリックすると1秒ずつ関数が実行される
    startButton.addEventListener('click', () => {
      timerId = setInterval(() => {
        console.log(counter + '秒経過しました');
        counter++;
      }, 1000);
    });

    // ストップボタンをクリックするとタイマーが取り消しされる
    stopButton.addEventListener('click', () => {
      clearInterval(timerId);
      console.log('タイマーがキャンセルされました');
    });
  </script>
</body>
</html>
```

画面のようにスタートボタンをクリックすると、1秒ごとに経過時間が出力されます。

** setInterval


一方、スタートボタンをクリックしてから5秒後にストップボタンをクリックすると、5秒までの間は経過時間が出力され、それ以降は関数の実行がキャンセルされます。

** clearInterval

また、setIntervalでタイマーのセットを行った後、指定経過時間後に自動でタイマーをキャンセルすることもできます。
```javascript
let counter = 1;
let timerId = setInterval(() => {
  console.log(counter + '秒経過しました');
  counter++;
}, 1000);

setTimeout(() => {
  clearInterval(timerId);
  console.log('タイマーをキャンセルしました')
}, 5000);
// "1秒経過しました"
// "2秒経過しました"
// "3秒経過しました"
// "4秒経過しました"
// "5秒経過しました"
// "タイマーをキャンセルしました"
```
setTimeoutの引数にclearIntervalを指定することで、指定した時間経過後に関数の実行を取り消すことができます。
この場合、5秒までの間はコンソール出力が行われ、5秒すぎると出力が行われなくなります。

## まとめ
今回は、setTimeoutとsetIntervalによる関数実行のスケジューリングについて解説しました。

```plain
// ポイント
* setTimeoutは、指定時間経過後に1回だけ関数を実行する
* setIntervalは、指定した一定時間ごとに関数を実行する
* タイマーを取り消すためのclearTimeoutとclearIntervalがある
* タイマー取り消しにはタイマー識別子が使われる
```

これらのメソッドを使用したプログラムは以下の記事で紹介しています。
ぜひ参考にしてみてください。

## setTimeoutとsetIntervalの関連記事
・スライドショーの作り方
・カウントダウンタイマーの作り方
・ストップウォッチのの作り方

