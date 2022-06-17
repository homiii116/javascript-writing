# 【JavaScriptの実践】ストップウォッチの作り方

Dateオブジェクトで日時を扱えるようになると、さまざまな機能やプログラムを作ることができます。
これまで当ブログでは、アナログ時計やカウントダウンタイマーの作り方を紹介してきましたが、どちらも一定時間に時間がカウントされるものでした。

今回は、少し異なる機能が必要なストップウォッチの作り方を解説していきます。
ストップウォッチのアルゴリズムについて考えながら、Dateオブジェクトの理解を深めていきましょう。

アナログ時計やカウントダウンタイマーの作り方は、以下の記事を参考にしてください。
<a clink src="https://tcd-theme.com/2021/08/javascript-analogclock.html"></a>
<a clink src="https://tcd-theme.com/2021/08/javascript-countdowntimer.html"></a>

## デモ
今回はこのようなストップウォッチを実装していきます。
ストップウォッチの実装では、時間のカウントだけでなく停止やリセットをする機能が必要です。
* 動画

## HTML・CSSの準備
まずはHTMLとCSSを用意します。

### HTML
```html
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<title>Stopwatch</title>
<link rel='stylesheet' type='text/css' href='styles.css'>
</head>
<body>
  <h1>Stopwatch⌚️</h1>
  <div id="container">
    <div id="time">00:00:00.000</div>
    <div id="buttons">
      <input id="start" type="button" value="start">
      <input id="stop" type="button" value="stop">
      <input id="reset" type="button" value="reset">
    </div>
  </div>  
  <script src='main.js'></script>
</body>
</html>
```

### CSS
```css
html, body {
  font-family: 'Roboto mono';
  font-size: 16px;
  background-color: #1e90ff;
}

h1 {
  color: #ffffff;
  text-align: center;
  font-size: 2rem;
  margin: 3rem;
}

#container {
  background-color: #ffffff;
  width: 540px;
  border-radius: 1rem;
  margin: 0 auto;
  padding: 1.5rem;
}

#time {
  color: #1e90ff;
  font-size: 3rem;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0,139,253,0.25);
  margin: .5rem;
}

#buttons {
  font-size: 3rem;
  text-align: center;
}

#start, #stop, #reset {
  font-size: 1.5rem;
  border-radius: .3rem;
  box-shadow: 0 0 20px rgba(77, 78, 79, 0.25);
}
```

表示するテキストやスタイルは好みに合わせて変更してください。

## JavaScriptでストップウォッチを実装
ここからはJavaScriptの解説をしていきます。

### 全体のコード
```javascript
const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// 開始時間
let startTime;
// 停止時間
let stopTime = 0;
// タイムアウトID
let timeoutID;

// 時間を表示する関数
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours()-1).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}

// スタートボタンがクリックされたら時間を進める
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  displayTime();
});

// ストップボタンがクリックされたら時間を止める
stopButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
});

// リセットボタンがクリックされたら時間を0に戻す
resetButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = '00:00:00.000';
  stopTime = 0;
});
```
今回のストップウォッチの実装には、次の機能がポイントです。
* 開始時間と停止時間を取得し、時間を更新する
* 取得したカウント時間を時・分・秒・ミリ秒に修正し、2桁または3桁表示する
* ボタンを有効化・無効化する

では、順番にコードを見ていきましょう。

### 要素を取得する
まずは、表示したい時間と各ボタンの要素を取得します。
```javascript
const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
```
上から、表示する時間、スタートボタン、ストップボタン、リセットボタンです。

### 変数を用意する
次に、時間をカウントするために必要な変数を用意します。
```javascript
let startTime;
let stopTime = 0;
let timeoutID;
```
startTimeはストップウォッチを開始した時の変数、stopTimeは停止した時の変数（デフォルト値は0）です。
またtimeoutIDは、時間のカウントを止める際に必要な変数です。

### 現在のカウント時間を表示する
現在のカウント時間を表示するためには、Dateオブジェクトを使用します。
displayTime関数がメインの機能になります。
```javascript
function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const h = String(currentTime.getHours()-1).padStart(2, '0');
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = `${h}:${m}:${s}.${ms}`;
  timeoutID = setTimeout(displayTime, 10);
}
```
currentTime変数に代入されている```new Date()```の引数には、現在時刻から開始時間を引き、さらに停止時間を足した値が指定されています。これで現在のカウント時間を取得することができます。

また、```getHours()```・```getMinutes()```・```getSeconds()```・```getMiliseconds()```で、取得した現在のカウント時間から時・分・秒・ミリ秒に修正する必要があります。
```padStart(2, '0')```は、各位の時間を2桁表示（ミリ秒は3桁表示）するためにのメソッドです。

さらに```time.textContent```で、デフォルトの値00:00:00.000を現在のカウント時間に上書きします。

さいごに、timeoutID変数に```setTimeout(displayTime, 10)```を代入します。
setTimeoutは、第二引数に指定した時間経過後に第一引数の関数を呼び出す関数で、戻り値はtimeoutIDです。
後ほど解説しますが、```clearTimeout(timeoutID)```を呼び出すことで、タイムアウトがキャンセルされます。

これで現在のカウント時間を表示する機能が出来上がりました。

### スタートボタンの機能を付ける
後は、各ボタンの機能を付けていきます。
以下は、スタートボタンのコードです。
```javascript
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;
  startTime = Date.now();
  displayTime();
});
 ```

```startButton.addEventListner('click'), () => {}```によって、スタートボタンがクリックされたら、その中に書いてあるプログラムが実行されるようになります。

スタートボタンがクリックされた後は、ストップボタンのみクリックできるようになると便利です。
そのため、```stopButton.disabled = false```でストップボタンを有効に、反対に、スタートボタンとリセットボタンはクリックできないように無効にします。

また、```Date.now()```で現在時刻を取得し、スタートボタンがクリックされた時刻をstartTime変数に代入します。
さらに、カウントされている時間が表示されるようにdisplayTime関数を呼び出します。

### ストップボタンの機能を付ける
ストップボタンがクリックされた場合は、スタートボタンとリセットボタンを有効にし、ストップボタンを無効にします。
```javascript
stopButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearTimeout(timeoutID);
  stopTime += (Date.now() - startTime);
});
 ```
また、先ほど少し説明した```clearTimeout(timeoutID)```で、タイムアウトがキャンセルされます。よってストップウォッチのカウント機能をキャンセルすることができます。

stopTime変数には、ストップボタンがクリックされた時刻からスタートボタンがクリックされた時刻を引き、さらにstopTime自身の時間を足した値を代入します。
これでストップボタンがクリックされる度に、カウント時間が累算されていきます。

### リセットボタンの機能を付ける
リセットボタンがクリックされた場合には、スタートボタンのみを有効にし、ストップボタンとリセットボタンは無効にします。
```javascript
resetButton.addEventListener('click', function() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  time.textContent = '00:00:00.000';
  stopTime = 0;
});
```
```time.textContent = '00:00:00.000'```で、表示していたカウント時間を元に戻します。
また、```stopTime = 0```で停止時間を0にリセットします。
これでリセットボタンがクリックされたら、すべての値を0に戻すことができます。

以上ですべてのの実装が完了です。

## まとめ
今回は、JavaScriptでストップウォッチの作る方法を解説しました。

Dateオブジェクトでの時刻の取得をするだけでなく、時間の更新や停止を行う方法を取り上げました。
どのような機能が必要かポイントを箇条書きにしていくと、アルゴリズムが見えてくるので、ぜひ実践してみてください。

## ストップウォッチの関連記事
・データ型 -オブジェクト
・Dateオブジェクトの作成
