# 【JavaScriptの入門】アロー関数

JavaScriptには、```function```キーワードを使った関数定義以外に、アロー関数と呼ばれる書き方があります。関数式をさらに簡略した記法です。

アロー関数は、できることとできないことが明確に分かれており、初心者にとっては少し扱いにくい側面もあります。

そこで今回は、構文にフォーカスして、アロー関数の定義方法を解説していきます。
まずは構文をしっかり身に付けていきましょう。

## アロー関数
アロー関数は、従来の関数式を簡略化した関数定義の構文です。
名前の通り、矢印のような記号```=>```を使って、関数を定義します。

```javascript
let 変数名 = (引数, ...) => {
  実行する処理;
  ...
  return 戻り値;
};
```

同じコードを従来の関数式で定義すると、このように表現できます。
```javascript
let 変数名 = function(引数, ...) {
  実行する処理;
  ...
  return 戻り値;
};
```

ほとんど同じような構文ですが、関数式で使う```function```キーワードの代わりに、イコールと大なり記号```=>```が置き換わっていることが分かります。

アロー関数で定義した関数を呼び出すには、次のように記述します。
```javascript
変数名(引数, ...)
```

以下は、引数に渡された数値を合計する関数です。
```javascript
//アロー関数を使った関数定義
let sum = (x, y) => { 
  let result = x + y;
  return result;
};

// 関数の呼び出し
let num = sum(1, 2);
console.log(num); // 3
```

関数式の書き方に慣れていれば、アロー関数の構文に対してあまり抵抗を感じないかもしれません。
まずは、関数式の簡略化した記法をイメージしておけば大丈夫です。

## アロー関数の構文
アロー関数は、引数の有無や実行する処理の数によって、書き方のパターンが異なります。
ここではアロー関数の構文を段階的に見ていきましょう。

### 引数の書き方
仮引数がない場合、空の括弧```()```を記述します。
```javascript
// 仮引数がない場合
let funcA = () => {};
```

仮引数が1つだけ入る時、括弧```()```を省略することができます。
もちろん括弧を記述しても問題ありません。
```javascript
// 仮引数が1つだけの場合
let funcB = (x) => {};
// または
let funcC = x => {};
```

仮引数が2つ以上入る時は、通常の関数定義と同じように、括弧```()```の中に、必要な引数を記述します。
```javascript
// 仮引数が複数ある場合
let funcD = (x, y) => {};
```

### return文の書き方
実行する処理が1行のみの場合、ブロック```{}```と```return```を省略することができます。これらを記述しても意味合いは同じです。
```javascript
// 実行する処理が1行だけの場合
funcE = x => { return x * 2};
// または
funcF = x => x * 2;
```

実行する処理が複数行ある場合、ブロック```{}```と```return```が必要です。
```javascript
// 実行する処理が複数行ある場合
funcG = (x, y) => { 
  let result = x + b;
  return result; 
};
```

これらのルールを踏まえると、アロー関数の方が複雑で読みにくいように見えるかもしれません。
しかし、構造に慣れてしまえば不必要な記述を避けられるため便利です。

## アロー関数の例
さいごに、上記で取り上げたいくつかのパターンを使って、実際のコードを見ていきましょう。

引数無し＋処理が1行の場合
```javascript
let sayHi = () => console.log('Hello!');

sayHi(); 
// "Hello!"
```

引数が1つのみ＋処理が1行の場合
```javascript
let sayHi = name => console.log('Hello, ' + name);

sayHi('JavaScript'); 
// "Hello, JavaScript"
```

引数が複数＋処理が複数行の場合
```javascript
let sayHi = (text, name) => {
  let message = console.log(text + name);
  return message;
};

sayHi('How are you, ', 'JavaScript?');
// "How are you, JavaScript?"
```

冒頭にも述べたように、アロー関数は他の関数と比べてできることとできないことがあります。
アロー関数のその他の興味深い機能を知るには、関数に携わる他の知識が必要になるため、このJavaScript関数シリーズをチェックした上で、以下の記事を参考にしてください。
<a clink src="https://tcd-theme.com/2021/06/javascript-function2.html"></a>

## まとめ
今回は、アロー関数の使い方の基礎を解説しました。
アロー関数は引数や処理状況で、書き方のパターンが異なります。

1. 括弧```()```あり：引数が無い、または複数ある場合
2. 括弧```()```なし：引数が1つだけの場合
3. ブロック```{}```＋```return```あり：処理文が複数行ある場合
4. ブロック```{}```＋```return```なし：処理文が1行のみの場合

## 合わせて読みたいJavaScript関数の関連記事
第1回：[関数と宣言](https://tcd-theme.com/2022/04/javascript-function-declaration.html)
第2回：[関数と引数](https://tcd-theme.com/2022/04/javascript-function-parameter-argument.html)
第3回：[関数と戻り値](https://tcd-theme.com/2022/04/javascript-function-return.html)
第4回：[関数式](https://tcd-theme.com/2022/04/javascript-function-expressions.html)
第5回：[関数オブジェクト](https://tcd-theme.com/2022/04/javascript-function-is-object.html)
第6回：[argumentsオブジェクト](https://tcd-theme.com/2022/04/javascript-arguments-object.html)
第7回：[アロー関数](https://tcd-theme.com/2022/04/javascript-arrow-function-basic.html)（当記事）


