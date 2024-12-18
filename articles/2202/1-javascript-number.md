# 【JavaScriptの入門】JavaScriptにおける数値型（Number）

ほとんどのプログラミング言語では、何かしらの形で数値の操作を行なっています。
JavaScriptにおいても数値はもっとも基本の対象です。
今回は、JavaScriptで扱う数値の種類や、どのように数値が扱われているのか解説していきます。

## 数値型（Number）
JavaScriptの数値型は、typeof演算子を使って型を調べると「number」と表記されます。
```javascript
console.log(typeof 3); // "number"
```

また、文字列型は、数値リテラルと表現されることもあります。
```plain
// リテラルとは？
*直接データ型に格納できる値
*数値、文字列、真偽値、nullなど
```

JavaScriptで扱われる数値型は、すべて64ビットの浮動小数点数として表現されます。
一見、整数と少数が区別されているように見えても、すべて64ビットの浮動小数点数で扱われています。

少し難しく聞こえるかもしれませんが、かんたんに言えば、整数を扱う場合も、内部では少数で計算されているということです。

以下は、整数を扱っているようにも見えますが、処理系がきり良く表示しているだけであり、実は「1.0」や「2.0」という少数が扱われています。

```javascript
let number1 = 1;
let number2 = 2;
console.log(number1 + number2); // 3
```

他のプログラミング言語では、整数と少数を別の型として区別するものも多くある一方、JavaScriptでは、整数も少数も同じ数値の型として扱う点が特徴的です。

### IEEE754　倍精度浮動小数点数
JavaScriptの数値がすべて小数で計算されていることは分かりましたが、64ビットの浮動小数点数についてまだピンときていない方もいるかもしれません。

64ビットの浮動小数点数をより詳細に言うと、JavaScriptの数値型は、IEEE754　倍精度浮動小数点数に該当します。これは、64ビットの範囲内でどのように少数を表現するか定められているフォーマットです。

以下の少数の計算を見てください。

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
```
単純に暗算や電卓で計算を行うと、「0.3」となるはずですが、JavaScriptの計算結果では、「0.30000000000000004」となります。
コンピュータ上では、0.1や0.2がそれぞれきりの悪い数であり、コンピュータ上で表現できる近似値に無理やり当てはめた結果です。
ぴったり0.1や0.2という数ではなく、「0.1000000......」「0.2000000....」という数として認識しているということです。

このような挙動から、64ビットのデータ量で数値を正確に表すには限界があることが分かります。
これはIEEE754 倍精度浮動小数点数の仕様であるため、避けようのない挙動ではありますが、JavaScriptの数値型を理解するには、こういった挙動が起こり得ることも知っておくことが大切です。

```plain
// ポイント
*JavaScriptの数値型は、整数と少数を区別しない
※すべてIEEE754　倍精度浮動小数点数で表す
*64ビットのデータ量では限界があり、数値の計算にズレが生じる場合がある
*電卓アプリなど、固定小数点数の精度が求められるアプリ開発には不向き
```

## 数値の扱い方
数値型の特徴を掴んだところで、ここからは数値の扱い方を見ていきましょう。

### 整数リテラルを使う
整数リテラルは、以下の4つの種類で表現することができます。

|10進数|16進数|8進数|2進数|
|:---:|:---:|:---:|:---:|
|単純な数値|色やエンコード文字|ファイルのパーミッション|ビット演算|
|0から9のみを使った数値|0xではじまる数値|0oではじまる数値|0bではじまる数値|

まず、0から9の数字のみで書かれた数値は、10進数として扱われます。
日常で良く使用する数値は、10進数に当たります。
```javascript
console.log(1); // 1
console.log(100); // 100
console.log(255); // 255
```

「0x」からはじまる数値は、16進数として認識されます。
色やエンコード文字を示す文字として幅広く扱われています。
```javascript
console.log(0xff); // 255
// 大文字と小文字は同じ意味
console.log(0xFF); // 255
```

8進数と2進数は、それほど使われませんが、ファイルのパーミッションやビット演算に使用されています。
それぞれ8進数を「0o」、2進数が「0b」からはじまる数値で表現します。
```javascript
console.log(0o377); // 255 8進数表記
console.log(0b11111111); // 255 2進数表記
```

### 浮動小数点数リテラルを使う
浮動小数点数リテラルは、以下の2つの方法で表現することができます。

・ドット.を含んだ数値をそのまま記述する
表示したい数値をそのまま記述すれば良いので難しいことはありません。
```javascript
console.log(3.14); // 3.14
// 0からはじまる浮動小数点数は、0を省略可
console.log(.123); // 0.123
```

・eまたはEを含んだ数値で記述する
eまたはEを追加することで、0の数を指定することができます。
```javascript
console.log(7.2e5); // 7.2 * 100000 → 720000

console.log(3e5); // 300000
// eとEは同じ意味
console.log(3E5); // 300000
```

### 桁の大きい数値を書く場合
例えば、1億を書く場合、単純にこのように記述することはできます。
```javascript
const number = 100000000;
console.log(number); // 100000000;
```

しかし、桁が大きくなればなるほど、書き間違いや読み間違いも発生しやすくなります。
その場合、桁の区切りにアンダースコアを使用して表現すると分かりやすいです。
```javascript
const number = 100_000_000;
console.log(number); // 100000000
```

また、浮動小数点数リテラルのようにeまたはEを使用することで、0の記述を省略することができます。
```javascript
const number = 1e8;
console.log(number); // 100000000
```

### 数値を文字列に変換（toString）
「toString」は、対象の数値を指定の記数法で文字列に変換するメソッドです。
```javascript
number.toString(記数法);
```
2進数から36進数までの記数法で表現することができます。
デフォルトは10進数で、この場合は省略可能です。

```javascript
let number = 50;

console.log(number.toString()); // "50"
console.log(number.toString(16)); // "32"
console.log(number.toString(8)); // "62"
console.log(number.toString(2)); // "110010"
console.log(number.toString(36)); // "1e"
```

もちろん数値を指定の記数法に変換しただけではなく、「数値を文字列に変換している」という点も忘れてはいけません。
```javascript
let number = 50;

console.log(number.toString() === 50); // false
console.log(number.toString() === '50'); // true
```

また、数値に対して直接toStringメソッドを使用する場合は、数値を括弧で囲うか、数値の後ろに空白を入れる必要があります。
```javascript
console.log(50.toString()); // エラー

console.log((50).toString()); // "50"
console.log(50 .toString()); // "50"
```

## まとめ
今回は、JavaScriptの数値型の扱い方について解説しました。
```plain
// ポイント
*JavaScriptの数値型は、すべてIEEE754　倍精度浮動小数点数で表す
*10、16、8、2進数の整数リテラルの表現がある
*ドットを含んだ数値やeまたはEを含んだ浮動小数点数リテラルの表現がある
*桁が大きい数値には、アンダースコアやeやEを使って可読性を高める方法がある
*toStringメソッドで、数値を文字列に変換できる
```

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/javascript-typeofdata.html"></a>
<a clink src="https://tcd-theme.com/2021/05/javascript-primitive.html"></a>