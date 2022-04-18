# 【JavaScriptの入門】argumentsオブジェクト

通常、関数に渡された値は順番に引数に格納されます。
argumentsオブジェクトを使用すると、渡された引数をその関数内で参照することができます。
今回は、argumentsオブジェクトとは何か、また使い方を解説していきます。

## argumentsオブジェクト
argumentsオブジェクトとは、関数内で使用できるローカル変数です。
argumentsオブジェクトには、関数に渡された引数の値がすべて格納されており、関数内で値を参照することができます。

Array-like（配列風）なオブジェクトであることが特徴で、インデックスを使って値にアクセスします。
例えば、関数に3つの引数が渡された場合、次のように引数の値にアクセスします。
```javascript
arguments[0]; // 1番目の引数
arguments[1]; // 2番目の引数
arguments[2]; // 3番目の引数
```

## 値の取得
一般的な方法として、関数に渡された値を参照するには、仮引数として記述した変数を使う方法があります。
```javascript
function getNum(id) { // 仮引数を定義
  console.log(id); 
}

getNum(10);
// 10
```

しかし、argumentsオブジェクトには、仮引数の定義とは関係なく、実際に渡された値すべてが格納されています。
そのため、仮引数の定義がなくても、値を参照することができます。
```javascript
function getNum() { // 仮引数なし
  console.log(arguments[0]); 
  console.log(arguments[1]); 
  console.log(arguments[2]); 
}

getNum(10, 20, 30);
// 10
// 20
// 30
```

上記では、実引数として渡した引数```10, 20, 30```という値すべてがargumentsオブジェクトに格納されます。
argumentsオブジェクトを使って値にアクセスし、コンソール出力をしています。

## 引数の数の取得
仮引数と実引数の数が異なる場合、エラーとはならず、次のような挙動が起こります。
```plain
* 実引数が仮引数より多い場合 → 余った実引数は無視される
* 実引数が仮引数より少ない場合 → 格納されなかった仮引数はundefinedとなる
```
```javascript
function getNum(x, y) {
  console.log('x: ' + x);
  console.log('y: ' + y);
}

// 実引数が仮引数よりも多い場合
getNum(1, 2, 3);
// "x: 1"
// "y: 2"

// 実引数が仮引数よりも少ない場合
getNum(1);
// "x: 1"
// "y: undefined"
```

しかし、関数を呼び出す際に、仮引数の数と同じだけの実引数が渡されるとは限りません。
実際に渡される値が不明な場合、想定していた引数の値が取得できないことも起こり得ます。
このような場合に、```arguments.length```を使うことで実際に渡された引数の数を取得することができます。
```javascript
function getNum(x, y) {
  console.log('引数の数: ' + arguments.length);
}

getNum(1, 2, 3);
// "引数の数: 3"

getNum(1);
// "引数の数: 1"
```
上記では、関数が呼び出されると、argumentsオブジェクトのlengthプロパティで引数の数を取得し、それをコンソール出力しています。

## argumentsオブジェクトの便利な点
argumentsオブジェクトは、引数の数が決まっていない場合や、あらかじめ定義された仮引数よりも多くの実引数が存在する場合に便利です。

次のコードを見てください。
引数の数だけ値の加算を行う関数です。
```javascript
function countNum() {
  let sum = 0;
  // 引数の数だけ順番に加算していく繰り返し処理
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  console.log('引数の値の合計: ' + sum);
}

countNum(1, 2, 3, 4, 5);
// "引数の値の合計: 15"

countNum(11, 22, 33);
// "引数の値の合計: 66"
```
実際の引数の数を取得するために、lengthプロパティを使用します。
その後、順番に引数の値を加算し、合計を出力しています。

引数がいくつあっても引数の数が変動しても、実際に渡された引数の分だけ加算が行われる仕組みです。

## argumentsオブジェクトの注意点
argumentsオブジェクトを使用するには、いくつかの注意する点もあります。

* アロー関数では使用できない
* Array-likeオブジェクトだが、配列メソッドは使用できない
* 仮引数だけを見て、実際に渡される引数がいくつあるのか判断できない

argumentsオブジェクトは、関数宣言と関数式で使用することはできますが、アロー関数では使用できません。（アロー関数は別記事で解説）
アロー関数内でargumentsオブジェクトを使用した場合、エラーとなります。

また、argumentsオブジェクトは一見配列のように見えますが、配列とは異なります。
そのため、```map```や```splice```など、配列メソッドは使用できません。

もう一つは、関数の仮引数だけ見ても、実際に渡された引数が何であるか判断しにくいという状況を作りやすい点です。
argumentsオブジェクトには実際に渡されたすべての引数が格納されていることが便利でもありますが、その反面で関数へリクエストする引数が分かりにくくなることがあります。

引数の数が決まっていない場合には、```length```プロパティを用いて引数の数を取得したり、```restパラメーター```を用いて対策することができます。

restパラメーターについては以下の記事を参考にしてください。
<a clink src="https://tcd-theme.com/2021/10/javascript-spread-rest.html"></a>

## まとめ
今回は、argumentsオブジェクトについて解説しました。

```plain
// ポイント
* argumentsオブジェクトは、関数内で使用できるローカル変数
* 実際に渡された引数がすべて格納される
* arguments[index]で引数の値を参照できる
* arguments.lengthで実際に渡された引数の数を取得できる
```

関数オブジェクトを用いることで、比較的容易に引数の値を取得することができます。
ぜひ参考にしてください。

## 合わせて読みたいJavaScript関数の関連記事
第1回：[関数と宣言](https://tcd-theme.com/2022/04/javascript-function-declaration.html)
第2回：[関数と引数](https://tcd-theme.com/2022/04/javascript-function-parameter-argument.html)
第3回：[関数と戻り値](https://tcd-theme.com/2022/04/javascript-function-return.html)
第4回：[関数式](https://tcd-theme.com/2022/04/javascript-function-expressions.html)
第5回：[関数オブジェクト](https://tcd-theme.com/2022/04/javascript-function-is-object.html)
第6回：[argumentsオブジェクト](https://tcd-theme.com/2022/04/javascript-arguments-object.html)（当記事）
