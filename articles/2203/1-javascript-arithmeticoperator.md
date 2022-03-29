# 【JavaScriptの入門】算術演算子

多くの演算子は学校などで既に学んでおり、プログラミングの場でも直感的に使用しやすいものがあります。例えば、加算「+」や減算「-」などの算術演算子です。

「+」は数値を足すための役割がありますが、実際には文字列結合演算子や単項プラス演算子と呼ばれるその他の機能も持っています。

そこで今回は、算術演算子とは何か、またそれらの役割について解説していきます。

## オペランドと二項/単項演算子
算術演算子の説明の前に、まずオペランド、二項/単項演算子というキーワードについても知っておくと便利です。

演算子は、何かしら対象のものを持ち、その対象のことをオペランドと呼びます。
例えば、以下の「2 + 3」という加算演算では、「+」が対象とする「2」と「3」がオペランドになります。
```javascript
2 + 3;
```
これを文字化してみると、加算演算子に対して、前と後ろにオペランドがあることが分かります。
このように2つのオペランドを取る演算子のことを二項演算子と呼びます。
```javascript
// 二項演算子
前のオペランド　演算子　後ろのオペランド
```

また、前後のどちらかだけにオペランドを取る演算子もあります。
以下は、前置/後置インクリメントと呼ばれる演算子で、演算子の前後にオペランドを置きます。
```javascript
// 前置インクリメント
++1;
//　後置インクリメント
1++;
```
このように、1つのオペランドを取る演算子のことを単項演算子と呼びます。
```javascript
// 単項演算子
オペランド　演算子
演算子　オペランド
```

## 算術演算子
算術演算子は、主に数値的な計算を行うための記号で、以下がサポートされています。

・加算「+」
・減算「-」
・乗算「*」
・除算「/」
・剰余「%」
・べき乗「**」

## 二項演算子
では、2つのオペランドを取る算術演算子について見ていきましょう。

### 加算演算子（+）
加算演算子は、演算子の前後にある数値を足す演算子です。
```javascript
console.log(2 + 3); // 5
```

### 文字列結合演算子（+）
数値を加算するための加算演算子は、少し特別です。
数値ではなく文字列に適用された場合には、お互いの文字列を結合することができます。
```javascript
console.log('Hello,' + ' World!'); // Hello, World!
```

つまり加算演算子は、数値同士、または文字列同士に演算を行います。

### 減算演算子（-）
減算演算子は、前のオペランドから後ろのオペランドを引く演算子です。
```javascript
console.log(7 - 2); // 5
```

### 乗算演算子（*）
乗算演算子は、2つの数値を掛ける演算子です。
```javascript
console.log(2 * 4); // 8
```

### 除算演算子（/）
除算演算子は、前のオペランドを後ろのオペランドで割る演算子です。
```javascript
console.log(10 / 5); // 2
```

### 乗除演算子（%）
剰余演算子は、前のオペランドを後ろのオペランドで割った際の余りを出す演算子です。
```javascript
console.log(4 % 2); // 0
console.log(5 % 3); // 2
```

### べき乗演算子（**）
べき乗演算子は、前のオペランドを後ろのオペランドの回数掛ける演算子です。
```javascript
console.log(2 ** 2); //  4（2の2乗）
console.log(3 ** 5); // 243（3の5乗）
```

## 単項演算子
つぎに、1つのオペランドを受け取る算術演算子について見ていきましょう。

### 単項プラス演算子（+）
単項プラス演算子は、オペランドを数値に変換する演算子です。
```javascript
console.log(+1); // 1
```
数値に対して単項プラス演算子を使っても、結果は記述した数値が返るだけであり、メリットはほぼありません。
しかし、数値以外のオペランドを対象とすると、数値に変更できるものは数値に変換することができます。
```javascript
console.log(+'23'); // 23
```

数値に変換できないものは、NaNという特殊な値に変換されます。
```javascript
console.log(+'string'); // NaN
```

### 単項マイナス演算子（-）
単項マイナス演算子は、オペランドを負の数値に変換する演算子です。
```javascript
console.log(-5); // -5
```

単項マイナス演算子も、数値以外のオペランドで数値に変換できるものは数値に変換されます。
```javascript
console.log(-'5'); // -5
console.log(-'string'); // NaN
```

### インクリメント演算子（++）
インクリメント演算子は、オペランドの数値を1増やす演算子です。
オペランドの前または後ろに「++」を記述します。
```javascript
// 前置インクリメント
++数値（オペランド）
// 後置インクリメント
数値（オペランド）++
```
インクリメント演算子は、オペランドの前後のどちらに置くかによって、評価の順番が異なります。

前置インクリメントは、変数numに対して先に+1を行います。
その後、numの結果を返します。
```javascript
// 前置インクリメント
let num = 1;
console.log(++num); // 2
console.log(num); // 2
```

一方、後置インクリメントは、先に変数numの結果を返します。
その後、numに対して+1を行います。
```javascript
// 後置インクリメント
let num = 1;
console.log(num++); // 1
console.log(num); // 2
```

どちらもオペランドの数値を1増やすことに変わりはありませんが、評価の順番が異なることを覚えておくと良いでしょう。

### デクリメント演算子（--）
デクリメント演算子は、オペランドの数値を1減らす演算子です。
オペランドの前または後ろに「--」を記述します。
```javascript
// 前置デクリメント
--数値（オペランド）
// 後置デクリメント
数値（オペランド）--
```
デクリメント演算子も、前置デクリメントか後置デクリメントかによって、評価の順番が異なります。
```javascript
// 前置デクリメント
let num = 1;
console.log(--num); // 0
console.log(num); // 0

// 後置デクリメント
let num = 1;
console.log(num--); // 1
console.log(num); // 0
```

## まとめ
今回は、二項/単項演算子を交えながら、算術演算子について解説していきました。

算術演算子は、単純な足し算や引き算を行う四則演算に使われるだけでなく、値に1を増やしたり減らすなどと、さまざまな役割を持っています。

```plain
// キーワード
*オペランド
*二項演算子（加算、減算、乗算、除算、剰余、べき乗）
*単項演算子（単項プラス/マイナス、インクリメント/デクリメント）
```

まずはキーワードを頭に入れ、実際に使いながらそれぞれの役割を覚えていきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2021/05/javascript-operator.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-operator-priority.html"></a>