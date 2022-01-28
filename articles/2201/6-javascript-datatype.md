# 【JavaScriptの入門】JavaScriptのデータ型とtypeof演算子

プログラミング言語には、言語ごとのデータの型というものが存在します。
例えば、「9」を数値、「'こんにちは'」を文字列、「function(){}」を関数など、それぞれデータの種類が異なるように、これらのデータにはそれぞれの型があるということです。

数値を扱った計算を行う時や、ある機能を持たせた関数を作る時など、今後具体的なブログラムを作成する際に、データ型について知っておくことはとても大切です。
そこで今回は、JavaScriptで扱うデータ型について深掘りしていきます。

## JavaScriptのデータ型
まず、JavaScriptのデータ型には、大きく「プリミティブ型」と「オブジェクト型」の2つに分けられます。

プリミティブ型は、単一で変化しない値を持つ一方、オブジェクト型は、複数の値を持ち、値が変化する型です。プリミティブ型以外ものは、オブジェクト型に該当します。

| プリミティブ型               | オブジェクト型                   |
|:--------------------------:|:----------------------------: |
| 単一の値を持つ               | 複数の値を持つ                   |
| 値は変化しない               | 値は変化する                     |
| 例：数値の10、文字列の'Hello' | 例：配列の['dog', 'cat', 'bird'] |

### プリミティブ型は不変性のデータ型
まず、プリミティブ型の値が単一で変化しないという点に疑問を持つかもしれません。
どういうことかと言うと、例えば、数値の「10」と「5」の持つ意味はいつも同じで「10 + 5」は、常に「15」になるということです。つまり、値そのものを表す不変性のデータ型と言うことです。
```javascript
let number1 = 10;
let number2 = 5;

console.log(number1 + number2); // 15
console.log(number1 === 10); // true
console.log(number1 + number2 === 15); // true
```

文字列で例えると、「'Hello'」と、'Hello, 'と'World'が連結した「'Hello, World'」は異なる値になります。常に単一の値を持つということが言えます。
```javascript
const sayhello1 = 'Hello';
const sayhello2 = 'Hello, ' + 'World';

console.log(sayhello1); // "Hello"
console.log(sayhello2); // "Hello, World"
console.log(sayhello1 === sayhello2); // false
```

### オブジェクト型は可変性のデータ型
では、オブジェクト型が複数の値を持ち、それらが変化していくというのはどういうことなのでしょうか。
「['dog', 'cat', 'bird']」というの複数の文字列の値を持っている配列を例として考えてみましょう。
'bird'を'rabbit'に変更したい場合、配列の中身が入れ替わることにより、配列自体が変化していきます。
このようなことから、オブジェクト型は、可変性のあるデータ型として認識できます。
```javascript
let pets = ['dog', 'cat', 'bird'];
console.log(pets); // ["dog", "cat", "bird"]

pets = ['dog', 'cat', 'rabbit'];
console.log(pets); // ["dog", "cat", "rabbit"]
```

## typeof演算子でプリミティブ型を調べる
プリミティブ型には、以下の7種類があります。

| プリミティブ型 | typeof | 特徴 | 例 |
|:-----------:|:--------:|:-----:|:---:|
| 数値         | number  | 整数または浮動小数点数 | 5, 3.14 |
| 文字列       | string  | 0文字以上の文字の集まり | 'Hello' |
| 長整数       | bigint   | 数値で扱えない大きな整数 | 1n |
| 真偽値       | boolean  | 真か偽であるかを判断する | true, false |
| undefined   | undefined| 値が未定義であることを示す | undefined |
| null        | object   | 意図的に値が存在しないことを表す| null |
| シンボル      | symbol  | 唯一無二のユニークな値を作る | Symbol() |

typeof演算子を使うことで、値がどの型に該当するのか調べることができます。
```javascript
typeof 型を調べたい値
```

実際にtypeof演算子を使って、各プリミティブの値がどの型に当てはまるか確認すると、以下のような結果が出ます。
```javascript
// 数値
console.log(typeof 5); // "number"

// 文字列
console.log(typeof 'Hello'); // "string"

// 長整数
console.log(typeof 1n); // "bigint"

// 真偽値
console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"

// undefined
console.log(typeof undefined); // "undefined"

// null
console.log(typeof null); // "object"

// シンボル
console.log(typeof Symbol()); // "symbol"
```

## typeof演算子でオブジェクト型を調べる
プリミティブ型でないものはすべてオブジェクト型になります。
そのため、多くの種類がオブジェクト型に該当します。
以下は、代表的なオブジェクト型です。

| オブジェクト型 | typeof | 特徴 | 例 |
|:-----------:|:--------:|:-----:|:---:|
| オブジェクト  | object   | 複数の値をプロパティとして管理する | [1, 2, 3] |
| 配列         | object   | 複数の値をリストとして管理する | {id:1, name: 'Tarou'} |
| 関数         | function | 複数の手続きを1つの処理として管理する | function(){} |
| 日時         | object   | 日時を扱う | new Date() |

こちらも同様にtypeof演算子を使うと、このような型の結果を得られることが確認できます。
```javascript
// オブジェクト
console.log(typeof [1, 2, 3]); // "object"

// 配列
console.log(typeof { id:1, name: 'Tarou' }); // "object"

// 関数
function saySomething() {
	console.log('hello');
}
console.log(typeof saySomething); // "function"

// 日時
console.log(typeof new Date()); // "object"
```

## データ型を意識すべき理由
どのプログラミング言語にも値の型というのが存在し、特定の処理を行うために、さまざまな値を操作していきます。
プログラミング言語の中には、厳密にデータ型を区別して表現するものもあります。
一方、JavaScriptは、他のプログラミング言語に比べると、データ型に対して寛容です。
例えば、数値の「10」と文字列の「'10'」が同じ値としてみなすこともできれば、区別することもできます。
```javascript
let number1 = 10;
let number2 = '10';

// 10と'10'を同じものとみなす
console.log(number1 == number2); // true

// 10と'10'を区別する
console.log(number1 === number2); // false
```

これは、自由で良い側面を持っていますが、開発を行ううえではデータ型を意識していないがゆえに思わぬエラーを発生させる原因にもなります。
そのため、常にデータ型の理解と意識を持っておくことが大切です。

## データ型を意識してコーディングを行おう
今回は、JavaScriptのデータ型とそれを調べるtypeof演算子について解説しました。

はじめは、JavaScriptの基本とも言える「プリミティブ型」を覚えて、それ以外は「オブジェクト型」と覚えていれば問題ありません。
また、typeof演算子を活用して、各データ型の結果を取得することに慣れておくのも良い方法です。

今後、各値の扱い方を取り上げていきますが、プリミティブ型とオブジェクト型の各値についてもっと詳しく知りたい方は、以下の記事も参考にしてみてください。
<a clink src="https://tcd-theme.com/2021/05/javascript-primitive.html"></a>
<a clink src="https://tcd-theme.com/2021/05/javascript-object.html"></a>

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/how-to-run-javascript.html"></a>
<a clink src="https://tcd-theme.com/2022/01/javascript-structure.html"></a>
<a clink src="https://tcd-theme.com/2022/01/javascript-basic-rule.html"></a>