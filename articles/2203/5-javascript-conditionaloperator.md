# 【JavaScriptの入門】条件演算子（三項演算子）

JavaScriptには、演算子の中でも特にユニークな条件演算子というものがあります。
if...else文の代わりとして良く使用されるため、覚えておくと便利です。

今回は、条件演算子とは何か、また使い方について解説していきます。

## 条件演算子（三項演算子）
条件演算子とは、条件によって処理を分ける演算子です。
一般的な条件分岐よりも簡潔な記述で済むため、if...else文の代わりに使用されることがあります。

また、3つのオペランドを扱うことから三項目演算子とも呼ばれています。
```javascript
オペランド 条件演算子 オペランド 条件演算子 オペランド
```
JavaScriptの多くは、単項演算子または二項演算子を扱うため、条件演算子の使い方は他のものよりユニークです。

## 条件演算子の使い方
条件演算子は、「?」と「:」を使って、条件式とtrue/falseの時の式を分けて書きます。
以下は条件演算子の構文です。
```javascript
条件式 ? trueの時の式 : falseの時の式
```

条件演算子は、条件式を評価した結果がtrueであれば、trueの時の式を評価した結果を返します。
反対に、条件式を評価した結果がfalseであれば、falseの時の式を評価した結果を返します。

```plain
条件式を評価 → 結果がtrue → trueの時の式を評価 → 結果を返す
条件式を評価 → 結果がfalse → falseの時の式を評価 → 結果を返す
```

以下の例を見てください。
条件式の評価の結果によって、AまたはBを返すことが分かります。
```javascript
// 条件式の評価がtrueの場合
let a = true ? "A" : "B";
console.log(a); // "A"

// 条件式の評価がfalseの場合
let b = false ? "A" : "B";
console.log(b); // "B"
```

条件式は真偽値以外の値も入れることができます。その場合、trueまたはfalseどちらに当てはまるか評価を行います。

サンプルコードを見てみましょう。
```javascript
let age = 19;

let drink = (age >= 20) ? "Beer" : "Orange Juice";
console.log(drink); // "Orange Juice"
```

まず、条件式に記述されている「age >= 20」を評価します。
変数ageには19が代入されているため、「年齢が20歳以上」という条件式の評価はfalseです。
よって、返される値は"Orange Juice"となります。

上記の例をif...else文で書き換えると以下のようになります。
```javascript
let age = 19;
let drink;

if (age >= 20) {
  drink = "Beer";
} else {
  drink = "Orange Juice";
}

console.log(drink); // "Orange Juice"
```

このように、if文だと複数行にもなる条件処理が、条件演算子を用いると簡潔に書くことができます。

複数の条件がある場合や、細かく処理を分けたい場合には、if文の方が適している場合もあります。

## まとめ
今回は、条件演算子について解説しました。

```plain
// ポイント
*条件演算子は、条件によって処理を分ける演算子
*「?」と「:」を用いて3つのオペランドを取ることから三項目演算子とも呼ばれる
*条件式の評価がtrueであれば、trueの時の式を評価する
*条件式の評価がfalseであれば、falseの時の式を評価する
```

条件分岐を使用する際には、ぜひ三項演算子を取り入れてみてください。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/03/javascript-arithmeticoperator.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-assignmentoperator.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-comparisonoperator.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-logicaloperator.html"></a>
