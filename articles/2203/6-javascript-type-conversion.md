# 【JavaScriptの入門】型変換とルール

多くの場合、JavaScriptで使われているさまざまな値は、演算子や関数によってデータ型が変換されています。
暗黙的にデータ型が変換される場合もあれば、明示的に変換が行われる場合もあります。

今回は、型変換とそのルールについて解説していきます。

## 文字列変換
文字列変換は、文字列形式の値が必要とされた場合に自動的に行われます。
例えば、文字列と数値を「+」演算子で連結すると、自動的に数値の部分は文字列に変換されたうえで連結が行われます。
```javascript
console.log('文字列' + 1); // "文字列1"
```

また、Stringコンストラクタ関数を使って、明示的に文字列に変換することができます。
```javascript
String(値);
値.toString();
```
数値以外にもいろいろな値を変換できます。
```javascript
// プリミティブ型
console.log(String(1)); // "1"
console.log(String(true)); // "true"
console.log(String(undefined)); // "undefined"

// オブジェクト型
console.log(String([1, 2, 3])); // "1,2,3"
console.log(String({ key: 'value'})); // "[object Object]"
console.log(String(function() {})); // "function() {}"
```

Stringコンストラクタ関数を使った明示的な型変換は、オブジェクト型の値に対してあまり意味のある文字列を返しません。
そのため、一般的には数値などのプリミティブ型の値に使われます。

## 数値変換
数値変換は、数学的な表現が行われた際に自動的に発生します。
例えば、「/」や「*」演算子などで数値と演算を行った場合、非数値の値は数値に変換されます。
```javascript
console.log(10 / "2"); // 5
console.log(2 * true); // 2
```

また、明示的に数値へ変換する場合には、Numberコンストラクタ関数を使用できます。
```javascript
Number(値);
```

```javascript
// 数値に変換できるもの
console.log(Number("123")); // 123
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0

// 数値に変換できないもの
console.log(Number("String")); // NaN
console.log(Number(undefined)); // NaN
```

文字列を数値に変換する場合は、文字列が表す数値に変換されますが、文字列に数値ではない文字が含まれる場合はNaNが返ります。

また、nullは0になる一方、undefinedはNaNになります。

|値|変換後|
|:--:|:--:|
|string|文字列から読み取れる数値|
|true|1|
|false|0|
|null|0|
|undefined|NaN|

## 真偽値変換
真偽値変換は、条件式が使われる場面などで自動的に発生します。
例えば、if文の条件式に値が記述される場合です。
```javascript
if (1 < 2) { // 評価はtrue
  console.log("正しいです");
}
// "正しいです"
```

以下はfalseとなる値です。
* false
* null
* undefined
* 0
* 0n
* NaN
* ""

反対に、これら以外の値はtrueとなります。

また、Booleanコンストラクタ関数を使って任意の値を真偽値に変換することができます。
```javascript
Boolean(値);
```

```javascript
// trueとなる値
console.log(Boolean("文字列")); // true
console.log(Boolean(1)); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true

// falseとなる値
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
```

## まとめ
今回は、型変換とそのルールについて解説しました。

```plain
* 文字列変換には、Stringコンストラクタ関数が利用できる
* 数値変換には、Numberコンストラクタ関数が利用できる
* 真偽値変換には、Booleanコンストラクタ関数が利用できる
```

暗黙的に起こる型変換は意図しない結果となる可能性もあるため、極力使うのは避け、明示的に変換を行う関数を利用しましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/02/javascript-string.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-string.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-boolean.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-null-undefined.html"></a>