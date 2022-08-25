# 【JavaScriptの基本】長整数型（BigInt）

JavaScriptのデータ型の一つに長整数型というものがあります。

多くの場合、数値型を使って数値の操作や計算などを行いますが、長整数型は数値型では扱えない大きな整数を扱うことができます。

今回は、長整数型の扱い方について解説していきます。

## 長整数型（BigInt）
長整数型とは、任意の精度の整数を扱うデータ型です。

```10```や```3.14```などの数値型の値は、IEEE754 倍精度浮動小数であるため、正確に扱える数値の範囲に上限があります。

数値型で安全に扱える最大の数値は、以下のように求められます。
```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
 ```

数値型でこれよりも大きな値を扱うと、正確な結果を得られないことがあります。
```javascript
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992

// 9007199254740993にならない
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992
 ```

そこでES2020から長整数型（BigInt）が導入され、大きな値を正確に表現できるようになりました。

長整数は、整数リテラルの末尾に```n```を追加して作成することがでいきます。
```javascript
// 9007199254740991より大きな値を扱える
console.log(9007199254740992n); // 9007199254740992n
console.log(9007199254740993n); // 9007199254740993n
 ```

また、BigIntオブジェクトのコンストラクタを呼び出して作成することもできます。引数には数値または文字列が使えます。
```javascript
const num1 = BigInt(10);
console.log(num1); // 10n

const num2 = BigInt('10');
console.log(num2); // 10n
```

長整数は整数のみサポートされているため、小数点のを含めた場合はエラーとなります。
```javascript
// Invalid or unexpected token
let num = 3.14n;
```

## 長整数の扱い方
ここからは長整数の扱い方のパターンを見ていきましょう。

### 算術演算子
長整数は、数値と同じように算術演算子を扱うことができます。
```javascript
console.log(10n + 5n); // 15n
console.log(10n - 5n); // 5n
console.log(10n * 5n); // 50n
console.log(10n / 5n); // 2n
console.log(10n % 5n); // 0n
console.log(10n ** 5n); // 100000n
```

長整数での除算計算を行うと、小数点以下の値は切り捨てられます。
```javascript
// 2.5nとはならないため注意
console.log(5n / 2n); // 2n
```

長整数と数値を混在させることはできません。
```javascript
console.log(10n + 5); // Cannot mix BigInt and other types, use explicit conversions
```

インクリメント演算子やデクリメント演算子の場合も、数値と同じように使えます。
```javascript
let num = 10n;

console.log(++num); // 11n
console.log(num++); // 11n

num = 5n;

console.log(--num); // 4n
console.log(num--); // 4n
```

長整数は、単項マイナス演算子を使うことはできますが、単項プラス演算子はサポートされていないため、注意が必要です。
```javascript
console.log(-10n); // -10n
console.log(+10n); // Cannot convert a BigInt value to a number
```

### 比較演算子
長整数同士の比較演算はもちろん、長整数と数値の比較も行うことができます。
```javascript
console.log(10n > 5n); // true
console.log(10n >= 8); // true
```

気をつけておきたいのは、長整数と数値は型が異なることです。
同じ値を比べた時に、等価演算子を使うと```true```となった場合でも、厳密等価演算子を使うと```false```となります。
```javascript
console.log(10n == 10); // true
console.log(10n === 10); // false
```

### 論理値の評価
論理値の評価が行われる場面では、長整数は数値と同じように振る舞います。

例えば、```if(0)```が```false```となるように、```if(0n)```の```false```と評価されます。
```javascript
if (0n) {
  console.log('何も起きない');
}
```

また、AND演算子やOR演算子を使った短絡評価も数値と同じように動作します。
```javascript
console.log(10n && 5n); // 5n
console.log(0n && 5n); // 0n

console.log(10n || 5n); // 10n
console.log(0n || 5n); // 5n
```

### 長整数と数値の変換
単項プラス演算子は、数値ではない値を数値に変換するために使用される方法です。
混乱を招くため、長整数では単項プラス演算子がサポートされていません。

そのため、長整数を数値に変換したい場合には、```Number()```を使用することで対処できます。反対に、数値から長整数に変換したい場合には、```BigInt()```を使用します。
```javascript
let bigint = 10n;
let num = 5;

console.log(Number(10n)); // 10
console.log(BigInt(num)); // 5n
```

## まとめ
今回は、長整数型の扱い方について解説しました。

```plain
// ポイント
* 長整数型は、任意の精度の整数を扱うデータ型
* 数値型では扱えない9007199254740991以上の大きな値を扱える
* 演算子や論理値扱う場面では、ほとんどの場合数値型と同じように振舞う
* BigInt()やNumber()で長整数と数値を互いに変換できる
```

割と新しく導入された長整数型ですが、特に大きな値を扱う場合には、安定した結果を得ることができます。ぜひ参考にしてください。

## 長整数の関連記事
* 数値型（Number）
* 算術演算子
* プリミティブ型とラッパーオブジェクト