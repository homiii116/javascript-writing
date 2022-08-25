# 【JavaScriptの基本】オブジェクトとプロトタイプ継承

前回の記事では、主にベースとなる```Object```を基準にプロトタイプの仕組みについて解説しました。

しかし、他のオブジェクトがどのようにプロトタイプを継承しているのか、まだピンときていないかもしれません。

今回は、オブジェクトとプロトタイプ継承について解説していきます。

## Objectのプロトタイプ
まずは単純な```Object```のプロトタイプから見ていきましょう。
ここでは、```__proto__```プロパティを使ってプロトタイプを確認していきます。

オブジェクトリテラルで```obj```が作成された時、```Object.prototype```が継承されます。
```javascript
let obj = {};

console.log(obj.__proto__); // {}

// Object.prototypeを継承している
console.log(obj.__proto__ == Object.prototype); // true
```

その後、プロトタイプメソッドが呼ばれると、```Object.prototype```からメソッドが取り出されます。
例えば、```obj.toString()```の場合、このようにして確認できます。
```javascript
let obj = {};

console.log(obj.toString == obj.__proto__.toString); // true
console.log(obj.toString == Object.prototype.toString); // true
 ```

また、```obj.__proto__.__proto__```は、追加のプロトタイプがありません。
```javascript
console.log(obj.__proto__.__proto__); // null
 ```

## 他のオブジェクトのプロトタイプ
```Array```や```Function```、```Date```など、他のオブジェクトもまたプロトタイプにメソッドを保持しています。

例えば、```Array```も```Object```と同じように、```Array.prototype```を持っています。
```Array```のインスタンスは、次のように```Array.prototype```を継承します。
```javascript
let arr = [];

console.log(arr.__proto__); // []
console.log(arr.__proto__ == Array.prototype); // true
 ```

さらに、```Array.prototype```は```Object.prototype```を継承しているため、```Array```のインスタンスは```Object.prototype```も継承していることになります。
```javascript
let arr = [];

// Array.prototypeを継承している
console.log(arr.__proto__); // []

// Object.prototypeを継承している
console.log(arr.__proto__.__proto__); // {}
 ```
```Array```のインスタンスが```Object.prototype```を継承しているということから、```Object.prototype```に定義されているメソッドも利用できるということです。

以下は、```object.prototyoe.hasOwnProperty```メソッドを呼び出した例です。
```javascript
let arr = [];

console.log(arr.hasOwnProperty); // function hasOwnProperty() {}

// Array.prototypeを継承している
console.log(arr.hasOwnProperty == arr.__proto__.hasOwnProperty); // true

// Object.prototypeを継承している
console.log(arr.hasOwnProperty == Object.prototype.hasOwnProperty); // true
 ``` 

そして、プロトタイプチェーンをたどると最終的にnullになります。
```javascript
console.log(arr.__proto__.__proto__.__proto__); // null
 ```

このことから、```Array```のインスタンスは、以下の流れでプロトタイプの継承が行われていると言えます。
1. ```Array```のインタンス
2. ```Array.prototype```
3. ```Object.prototype```
4. null

これは、```Function```も同じように動作します。
```javascript
function fn() {}

// Function.prototypeを継承している
console.log(fn.__proto__); // function() {}

// Object.prototypeを継承している
console.log(fn.__proto__.__proto__); // {}

console.log(fn.__proto__.__proto__.__proto__); // null
```

** Objects-prototype **

このように、すべてのオブジェクトは、プロトタイプの先頭に```Object.prototype```を持っている、すなわち```Object```を継承しているということです。

## プリミティブな値
オブジェクトがプロトタイプを継承することは分かりましたが、複雑なことにプリミティブの値でも似たような現象が起こります。

```String```や```Number```はオブジェクトではありません。
しかし、これらのプリミティブの値に対してプロパティへアクセスする時、それに対応する一時的なラッパーオブジェクトが作られます。

例えば、文字列が```String```のインスタンスメソッドを呼び出すような時です。
```javascript
let str = 'Hello!';

// プリミティブの値でもメソッドの呼び出しができる
str.toUpperCase();
```

```str```にアクセスする際にラッパーオブジェクトに変換されるため、このような現象が起こります。
詳しくはラッパーオブジェクトの記事で解説しますが、それらのオブジェクトのメソッドも、```String.prototype```や```Number.prototype```のように利用可能なプロトタイプに存在します。

## まとめ
今回は、オブジェクトとプロトタイプ継承について解説しました。

```plain
// ポイント
* すべてのオブジェクトはプロトタイプにメソッドを保持する
* 配列や関数は、Array.prototypeやFunction.prototypeを継承している
* プロトタイプの先頭には、Object.prototypeが存在する
* プリミティブな値でもラッパーオブジェクトによってプロトタイプにメソッドを保持している
 ```

オブジェクトがどのように```Object.prototyoe```を継承し、メソッドを呼び出せているのか分かりました。少しずつ理解を深めていきましょう。

## 合わせて読みたいプロトタイプシリーズ
第1回：プロトタイプの仕組み
第2回：オブジェクトとプロトタイプ継承（当記事）