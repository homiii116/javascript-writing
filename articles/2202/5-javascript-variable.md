# 【JavaScriptの入門】変数と宣言

プログラミング言語には、あらゆるデータを保管し、必要なときに再利用できるようにする変数という機能があります。

この記事では、変数の役割や変数宣言について解説していきます。
プログラムを作成する上では変数の扱いは必須の知識となるため、変数とは何かしっかり理解できるようにしていきましょう。

## 変数とは
「変数」とは、文字列や数値など、さまざまなデータのための名付けされた保管場所のことです。
変数にアクセスすることで、格納されたデータをあとから参照したり変更することができます。

ネームステッカーが貼られた"箱"をイメージすると、変数という概念をかんたんにイメージすることができます。

例えば、「ticket」というラベルが貼られた箱があるとします。
その中には、チケット代金1500円として「1500」という数値が入っています。

*画像*

これで箱の中身を確認したり、削除して変更することができます。

つぎに、以下の例を見てください。
```javascript
console.log('チケット1人分は' + 1500 + '円です'); // "チケット1人分は1500円です"
console.log('チケット2人分は' + 1500 * 2 + '円です'); // "チケット2人分は3000円です"
console.log('チケット5人分は' + 1500 * 5 + '円です'); // "チケット5人分は7500円です"
```
チケット1枚1500円に人数分を掛けた計算し、出力しています。
しかし、毎回1500を記載しなければいけなかったり、値段が変わった場合にはすべて変更しなければいけなくなります。

しかし、あらかじめチケット代を箱の中に入れておくとどうでしょうか。
```javascript
let ticket = 1500; // 変数宣言

console.log('映画のチケット1人分は' + ticket + '円です'); // "チケット1人分は1500円です"
console.log('映画のチケット2人分は' + ticket * 2 + '円です'); // "チケット2人分は3000円です"
console.log('映画のチケット5人分は' + ticket * 5 + '円です'); // "チケット5人分は7500円です"
```
ticketという箱に、チケット代の1500を入れておくことで、必要なときに箱の中身を取り出すことができます。
つまり、毎回1500と書く手間が省けますね。

あとで値段が変わった場合にも、箱の中身だけ変更すれば良いので楽です。
```javascript
let ticket = 1700; // 1500→1700円に値上がり。ここだけ変更すれば良い
```

変数を利用することで、プログラムの効率性が高まることが分かります。
変数名を見ただけでどのようなデータであるか認識できるようになるのも変数の便利なところです。

## 変数宣言
JavaScriptには、「const」「let」「var」の3つのキーワードを用いた変数宣言の方法があります。
元々はvarのみが使用されていましたが、ECMAScript2015から、varを問題を回避するためにconst、letが追加されました。

|const|let|var|
|:--:|:--:|:--:|
|初期値が必要|初期値は省略可|初期値は省略可|
|値を再代入できない|値を再代入できる|値を再代入できる|
|変数を再宣言できない|変数を再宣言できない|変数を再宣言できる|

これらは共通して、キーワードと変数に付ける名前を記述して、変数宣言を行います。
```javascript
キーワード 変数名 = 初期値（格納したいデータ）;
```

では、それぞれの変数宣言について詳しく見ていきましょう。

### const
constは、値を再代入できない変数を宣言できます。
キーワードに続けて、変数名と必ず初期値を設定します。

以下は、「countryName」という変数を宣言し、初期値に「Japan」という文字列を定義した例です。
```javascript
const countryName = 'Japan';
```

一度宣言した変数に対して、あとから値を代入しようとするとエラーになります。
```javascript
const countryName = 'Japan';
countryName = 'Australia'; // "Uncaught TypeError: Assignment to constant variable."
```

### let
letは、値を再代入できる変数を宣言できます。
キーワードに続けて、変数名と初期値を設定します。
```javascript
let countryName = 'Japan';
```

constとは異なり、初期値を設定せずに変数を定義することが可能です。
このとき、変数にアクセスしてみると、undefinedという値を参照します。
初期値が設定されていない場合は、このようにデフォルト値にundefinedが設定されるためです。
```javascript
let countryName;
console.log(countryName); // undefined
```

初期値が設定されていない変数には、代入演算子「=」を使って値を置くことができます。
```javascript
let countryName;
countryName = 'Japan';
```

値の代入を何度でも行うことができます。
```javascript
let countryName = 'Japan';
countryName = 'Australia'
countryName = 'Canada';

console.log(countryName); // "Canada"
```

### var
varは、値を再代入できる変数を宣言できます。
キーワードに続けて、変数名と初期値を設定します。
```javascript
var countryName = 'Japan';
```

変数の宣言時に初期値を省略できる点や、何度でも値の再代入ができる点もletと同じです。
```javascript
var countryName;
countryName = 'Japan';
countryName = 'Australia';

console.log(countryName); // "Australia"
```

### varの問題点
これまでの説明だけだと、letとvarはまったく同じであるように感じます。
しかし、letがvarの問題を回避するために追加されたように、これらには違いがあります。

varを使うと、同じ名前の変数を再度定義することが可能です。これを変数の再宣言と呼びます。
意図せずに変数を再宣言してしまい、値を上書きしてしまうリスクが発生します。
```javascript
var num = 1;
var num = 2;
```

一方、letでは変数を再宣言することはできません。
そのため、二重に変数を定義してしまうことを防ぐことができます。
```javascript
let num = 1;
let num = 2;

// "Uncaught SyntaxError: Identifier 'num' has already been declared"
```

ほとんどのケースで、letかconstに置き換えることが可能です。
そのためできるだけvarの使用を避け、変数の再代入の有無などに合わせてletとconstを使い分ける方が良いでしょう。

letとconstの使い分け方は、以下の記事を参考にしてみてください。
<a clink src="https://tcd-theme.com/2021/04/javascript-let-const.html"></a>


## まとめ
今回は、JavaScriptの変数と宣言について解説しました。

```plain
// ポイント
*constは、再代入できない変数を宣言する
*letは、再代入できる変数を宣言する
*varは、再代入できる変数を宣言するが、変数の再宣言によるバグ発生のリスクもある
```

これらのポイントを意識して、今後の変数の活用に役立ててください。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/02/javascript-string.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-number.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-boolean.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-null-undefined.html"></a>