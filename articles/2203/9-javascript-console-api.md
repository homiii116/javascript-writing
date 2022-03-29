# 【JavaScriptの入門】Console API

Console APIは、正しい値が渡されているか検証したり、エラーを見つけ対処する際に役に立ちます。
JavaScript入門シリーズにも度々登場する```console.log```もConsole APIの一つですが、他にも数多くの種類があります。
今回は、Console APIとは何か、またどのような機能があるか解説していきます。

## コンソールとは
そもそもコンソールとは何か疑問を持っている方もいるかもしれません。
コンソールとは、コンピュータの入出力を行うための装置です。
JavaScriptにおいてコンソールと言うと、一般的には各ブラウザの開発者ツールに備わっているコンソールのことを指します。

## Console API
Console APIは、consoleオブジェクトを用いて、ブラウザのデバッグコンソール（ChromeのDeveloper Toolsなど）へアクセスします。
デバッグとは、プログラムの誤りを見つけて、それを手直しすることです。
Concole APIも、多くの場合デバッグのために使用されています。

例えば、```console.log()```の引数に、表示したい値を記述すると、引数に記述した値がコンソール画面に表示されます。

```javascript
console.log(1); // 1
```

試しに、ChromeのDeveloper Toolsを使ってコンソール画面で評価を確認してみましょう。

```plain
1. Chromeを立ち上げる
2. 右クリックで検証を選択 / Macのショートカットの場合、option + command + i を押す
3. Consoleタブを開く
4. 空白部分にconsole.log(1);を入力し、enterキーを押す
```

引数に入れた1が、文字としてコンソールに表示されているはずです。
** log 画像

このように、Console APIを使うことで、コンソール画面上でさまざまな検証を行うことができます。

「この値は何だろう」「何で処理がまく実行されないのだろう」などと疑問を持ったら、それをコンソールに表示してみると解決することが多くあります。

## consoleオブジェクトのメソッド
上記では、consoleオブジェクトに用意されているlogメソッドというものを使用しましたが、数あるメソッドの内の1つに過ぎません。
consoleオブジェクトには、logメソッド以外にもさまざまなメソッドが用意されてます。

ここからは、便利なメソッドをいくつか紹介していきます。

### console.log()
logメソッドは、引数に渡された値を一般的なログ情報として出力します。
引数の中には、どのような型の値でも使用できます。
```javascript
console.log(2 + 2); // 4
console.log('JavaScript'); // "JavaScript"
console.log(true); // true
console.log([1, 2, 3]); // [1, 2, 3]
```

### console.error()
errorメソッドは、引数に渡された値をエラーメッセージとして出力します。
コードテストを行う際に使用され、デフォルトではエラーメッセージが赤色で表示されます。
```javascript
console.error('エラー'); // "エラー"
```
** error画像

### console.warn()
warnメソッドは、引数に渡された値を警告ログとして出力します。
コードテストを行う際に役立ち、デフォルトでは警告メッセージは黄色で表示されます。
```javascript
console.warn('警告'); // "警告"
```

** warn画像

### console.clear()
clearメソッドは、コンソールを一括クリアするために使用します。
コンソールがエラーやメッセージで一杯になった際に使用すると便利です。「Console was cleared」と表示されます。
```javascript
console.clear();
```

** clear画像

### console.table()
tableメソッドは、表形式で出力を行います。
オブジェクトや配列を、表形式のデータとして表示することで可読性が高まります。
```javascript
console.table(['a', 'b', 'c']);
```

** table画像

### console.count()
countメソッドは、指定されたラベルが呼び出された回数を出力します。
繰り返し処理の中で、特定の処理が何回実行されているか確認することができます。

```javascript
for (let i = 0; i < 3; i++) {
  console.count('ラベル');
}
```

** count画像

## まとめ
今回は、Console APIについて解説しました。
一般的には```console.log```が良く知られていますが、その他のconsoleメソッドもうまく使い分けられるようになると、効率良くデバッグを行うことができます。

JavaScriptの学習・開発において、Condole APIをフル活用していきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2021/04/javascript-popup.html"></a>

