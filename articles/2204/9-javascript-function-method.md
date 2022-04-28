# 【JavaScriptの入門】関数とメソッド

JavaScriptでは、度々メソッドという概念が登場します。
メソッドは一言で表すと、オブジェクトが持っている関数のことです。

今回は、JavaScriptにおけるメソッドとは何か、使い方を解説していきます。

## メソッド
メソッドとは、オブジェクトがプロパティとして持っている関数のことです。
JavaScriptでは、一般的な関数とメソッドの機能的な違いはありません。
そのため、どちらも同じ関数です。

しかし、呼び方を区別した方が分かりやすいため、オブジェクトがプロパティとして持っている関数を特別にメソッドと呼んでいます。

```plain
関数：ある一連の手続きを1つの処理としてまとめ、複数の箇所から呼び出せる機能
メソッド：オブジェクトがプロパティとして持っている関数（上記の関数を持っている）
```

## オブジェクトのプロパティ
メソッドの使い方を解説する前に、オブジェクトのプロパティについておさらいしておきましょう。

オブジェクトは、キー（key）と値（value）がペアになったプロパティを持っています。
```javascript
const obj = {
  // プロパティ
  key: value
};
```

次のオブジェクトでは、```id```, ```name```, ```age```がキーとなり、```1```, ```'John'```, ```25```がそれぞれのキーに対応する値になります。
```javascript
const user = {
  id: 1,
  name: 'John',
  age: 25
};
```

## メソッドの定義
オブジェクトは、同じような形式でメソッド（関数）を持つことができます。

キーの箇所にメソッド名を指定し、値の箇所に関数を定義します。
関数には、```function```キーワードを使った関数式かアロー関数が使えます。
```javascript
const obj = {
  // functionキーワードでのメソッド
  methodA: function() {
    ...
  },
  // アロー関数でのメソッド
  methodB: () => {
    ...
  }
};
```
上記は、```obj```というオブジェクトに、```methodA```と```methodB```と言う名前のメソッドが定義されています。

予めメソッドを用意するのではなく、空のオブジェクトを定義してから、メソッドを定義することもできます。
```javascript
const obj = {};

// functionキーワードでのメソッド
obj.methodA = function() {};
// アロー関数でのメソッド
obj.methodB = () => {};
```

例えば、元々作成してあったオブジェクトに、後からメソッドを追加することもできます。
```javascript
const user = {
  id: 1,
  name: 'John',
  age: 25
};

// userオブジェクトにsayHiメソッドを追加
user.sayHi = function() {
  console.log('Hello');
};
```

また、宣言済みの関数をメソッドとして使うことも可能です。
```javascript
const user = {
  id: 1,
  name: 'John',
  age: 25
};

// 最初に関数を記述
function sayHi() {
  console.log('Hello');
}

// userオブジェクトにsayHiメソッドを追加(sayHi関数)
user.sayHi = sayHi;
```

## メソッドの呼び出し
定義したメソッドは、```オブジェクト.メソッド名()```のようにして呼び出すことができます。

では、先ほど作成したメソッドを呼び出してみます。
```javascript
const user = {
  id: 1,
  name: 'John',
  age: 25
};

user.sayHi = function() {
  console.log('Hello');
};

// メソッドの呼び出し
user.sayHi();
// "Hello"
```

## メソッドの短縮記法
これまでは、プロパティに関数を代入する方法を紹介しました。
ES2015から追加された機能に、メソッドのための短縮記法があります。

```javascript
const obj = {
  // 従来のメソッド
  methodA: function() {
    ...
  },
  // 短縮されたメソッド
  methodB() {
    ...
  }
}
```
このように、```function()```を省き、単純に```メソッド名()```として書くことができるため、スッキリして見えます。

以下のコードでは、```sayHi```と言う名前のメソッドが定義されています。
```sayHi(){メソッドの処理}```と書くことで、従来と同じメソッドの定義ができます。
```javascript
const obj = {
  sayHi() {
    console.log('Hello! This is method.');
  }
};

obj.sayHi();
// "Hello! This is method."
 ```

## まとめ
今回は、メソッドについて解説しました。

```plain
// ポイント
* メソッドは、オブジェクトのプロパティに格納されている関数のこと
* プロパティにメソッド名と関数のセットで定義する
* オブジェクト.メソッド名()でメソッドを呼び出せる
* メソッド名(){}として定義する短縮記法がある
```

メソッドの短縮記法は、オブジェクトのメソッドだけではなく、クラスのメソッドでも使われています。
そのため、メソッドの使い方に慣れてきたら、できるだけ短縮記法に統一して書けるようになると良いでしょう。

## 合わせて読みたいJavaScript関数の関連記事
第1回：[関数と宣言](https://tcd-theme.com/2022/04/javascript-function-declaration.html)
第2回：[関数と引数](https://tcd-theme.com/2022/04/javascript-function-parameter-argument.html)
第3回：[関数と戻り値](https://tcd-theme.com/2022/04/javascript-function-return.html)
第4回：[関数式](https://tcd-theme.com/2022/04/javascript-function-expressions.html)
第5回：[関数オブジェクト](https://tcd-theme.com/2022/04/javascript-function-is-object.html)
第6回：[argumentsオブジェクト](https://tcd-theme.com/2022/04/javascript-arguments-object.html)
第7回：[アロー関数](https://tcd-theme.com/2022/04/javascript-arrow-function-basic.html)
第8回：[コールバック関数](https://tcd-theme.com/2022/04/javascript-callback-function.html)
第9回：[関数とメソッド](https://tcd-theme.com/2022/04/javascript-function-method.html)（当記事）