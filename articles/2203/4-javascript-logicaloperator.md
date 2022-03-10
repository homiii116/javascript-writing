# 【JavaScriptの入門】論理演算子

JavaScriptでは、複数の条件に対して、対象とするものが真であるか偽であるか評価するために、論理演算子が使われます。

今回は、論理演算子の種類や使い方、事例を取り上げていきます。

## 論理演算子
論理演算子は、真偽値（true、false）を扱う演算子で、以下の3つを表現します。
|種類|演算子|説明|
|:--:|:---:|:---:|
|AND | &&  |かつ  |
|OR  |\|\| |または|
|NOT |!    |否定  |

論理演算子は真偽値を扱うと表現しましたが、オペランドは必ずtrueまたはfalseである必要はなく、数値や文字列など、どのような型のオペランドにも対象とします。
真偽値以外のオペランドを対象とする場合には、評価を行うために、ルールに従ってtrueまたはfalseに変換されます。

## 論理演算子の使い方
ここからは、種類別に論理演算子の使い方を見ていきましょう。

### AND演算子（&&）
AND演算子は、前と後ろのオペランド両方が真の場合trueを返し、そうでない場合はfalseを返します。
```javascript
オペランド && オペランド
```

```javascript
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false
```

以下の評価結果を見てください。
```javascript
let num = 5;

// true && true 
console.log(num > 2 && num === 5); // true

// true && false
console.log(num > 2 && num === 6); // false
```
内部的には、このように評価されています。
・num > 2をtrue、num === 5をtrueと評価 → 全体の結果はtrue
・num > 2をtrue、num === 6をfalseと評価 → 全体の結果はfalse

このようにオペランドが真偽値でない場合、trueまたはfalseに変換して評価されることが分かります。

AND演算子は、if文などで、与えられたすべての条件を満たしているか確認する場合に使われます。
```javascript
let age = 7;
let height = 130;

if (age > 6 && height > 128) { // true && true　として評価される
  console.log('ジェットコースターの乗車条件を満たしています');
}

// "ジェットコースターの乗車条件を満たしています"

```

### OR演算子（||）
OR演算子は、前または後ろのオペランドの少なくとも一つが真の場合trueを返し、そうでない場合falseを返します。
```javascript
オペランド || オペランド
```

```javascript
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false
```

以下の例を見て分かるように、両方のオペランドが偽の場合を除き、結果は常にtrueとなります。
```javascript
let num = 5;

// true && true
console.log(num > 2 || num === 5); // true

// true && false
console.log(num > 2 || num === 6); // true

// false && false
console.log(num > 6 || num === 6); // false
```

OR演算子は、if文などで、与えられた条件のいずれかを満たしているか確認する場合に使われます。
```javascript
let scoreA = 80;
let scoreB = 65;

if (scoreA >= 80 || scoreB >= 70) { // true || false として評価される
  console.log('テストに合格しました')
}

// "テストに合格しました"
```

### NOT演算子（!）
NOT演算子は、オペランドが真であればfalseを返し、オペランドが偽であればtrueを返します。
つまり、オペランドの評価結果を反転した真偽値を返すと言うことです。
```javascript
!オペランド
```
```javascript
console.log(!true); // false
console.log(!false); // true
```

以下の例では、num > 10の評価はfalseとなります。
NOT演算子は、それを反転させた結果を返すため、全体の結果はtrueになります。
```javascript
let num = 5;

// 評価はfalse
console.log(!(num > 10)); // true
```

NOT演算子は、if文などで、与えられた条件を否定したい場合に使われます。
```javascript
let otherLang = false;

if (!otherLang) {
  console.log('この語学学校では日本語以外を話すことを禁止しています');
}

// "この語学学校では日本語以外を話すことを禁止しています"
```

## 偽とされる値
真偽値を使用した場合や、数値的な計算を行った場合には、trueまたはfalseのどちらに評価されるのか想像ができます。
しかし、そうでない場合、どのような値がtrueまたはfalseに該当するのか以下のルールを知っておく必要があります。
・偽の値はfalseとなる
・偽ではない値はtrueになる

偽の値とは、以下の7種類の値のことです。
・false
・null
・undefined
・0
・0n
・NaN
・""（空文字）

まず偽の値だけ覚えておいて、それ以外はtrueになることを知っておくと良いでしょう。

## 短絡評価
AND演算子は、前のオペランドが偽の場合、後ろのオペランドは評価しません。
```javascript
true && console.log('このコンソールは実行される'); // "このコンソールは実行される"

// 前のオペランドが偽のため、後ろのオペランドは評価されない
false && console.log('このコンソールは実行されない'); 
```
AND演算子は、すべてのオペランドが真である必要があるため、前のオペランドが偽と評価された時点で、結果がfalseとなることが分かっています。

また、OR演算子は、前のオペランドが真の場合、後ろのオペランドを評価しません。
```javascript
false || console.log('このコンソールは実行される'); // "このコンソールは実行される"

// 前のオペランドが偽のため、後ろのオペランドは評価されない
true || console.log('このコンソールは実行されない');
```
OR演算子は、オペランドのどちらか一つが真であれば良いので、前のオペランドが真と評価された時点で、結果がtrueとなることが分かります。

このように、値が決まった時点でそれ以上評価を行わないことを短絡評価と呼びます。

短絡評価のアルゴリズムに注目してみるとさらに理解しやすいです。
以下で見てみましょう。

### AND演算子は最初の偽値を探す
AND演算子は、つぎの順番で動きます。
```javascript
value1 && value2;
```
・前から後ろの順番でオペランドを評価する
・各オペランドを真偽値に変換する
・もし前のオペランドの評価が偽の場合、その時点で評価をストップし、そのオペランドを返す
・すべてのオペランド評価された場合（すべて真の場合）、後ろのオペランドを返す

```javascript
// 前のオペランドが偽の場合、そのオペランドを返し、後ろのオペランドは無視される
console.log(null && '後ろのオペランド'); // null
console.log(0 && '後ろのオペランド'); // 0

// 前のオペランドが真の場合、後ろのオペランドを返す
console.log(1 && '後ろのオペランド'); // "後ろのオペランド"
console.log('1' && '後ろのオペランド'); // "後ろのオペランド"
```

### OR演算子は最初の真値を探す
OR演算子は、つぎの順番で動きます。
```javascript
value1 || value2;
```
・前から後ろの順番でオペランドを評価する
・各オペランドを真偽値に変換する
・もし前のオペランドの評価が真の場合は、その時点で評価をストップし、そのオペランドを返す
・すべてのオペランドが評価された場合（すべて偽の場合）、後ろのオペランドを返す

```javascript
// 前のオペランドが真の場合、そのオペランドを返し、後ろのオペランドは無視される
console.log(100 || '後ろのオペランド'); // 100
console.log('hello' || '後ろのオペランド'); // "hello"

// 前のオペランドが偽の場合、後ろのオペランドを返す
console.log("" || '後ろのオペランド'); // "後ろのオペランド"
console.log(undefined || '後ろのオペランド'); // "後ろのオペランド"
```

## まとめ
今回は、論理演算子について解説しました。

```plain
// ポイント
*比較演算子は、真偽値を扱う演算子
*AND（かつ）、OR（または）、NOT（否定）演算子を表現する
*真偽値をすべて覚えるのではなく、偽とされる値を理解していると良い
*値が決まった時点でそれ以上評価を行わないことを短絡評価と言う
```

論理演算子は、比較演算子などの演算子と一緒に使われることも多くあります。
どの値が真または偽になるか、他の演算子を用いて試してみてください。


### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/03/javascript-operator-priority.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-arithmeticoperator.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-assignmentoperator.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-comparisonoperator.html"></a>
