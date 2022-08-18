# 【JavaScriptの応用】オブジェクトとプロトタイプ継承

前回の記事では、プロトタイプとは何か、主にベースとなる```Object```を基準にその仕組みについて解説しました。

しかし、他のオブジェクトがどのようにプロトタイプを継承されているのか、まだピンときていないかもしれません。

今回は、オブジェクトとプロトタイプ継承について解説していきます。

## Object.prototype
まずは単純な```Object```のプロトタイプから見ていきましょう。
ここでは、```__proto__```プロパティを使ってプロトタイプを確認してみます。

```javascript
let obj = {};

console.log(obj.__proto__); // {}
console.log(obj.__proto__ == Object.prototype); // true
```
オブジェクトリテラルで```obj```を定義したため、この時点で既にプロトタイプが継承されています。
そのため、```Object```のインスタンスは```Object.prototype```が

## Array.prototype

## Function.prototype


## 他のオブジェクトのプロトタイプを確認する
```Array```や```Function```などの他のオブジェクトも```Object.prototype```を継承します。


```Object```の場合：
```javascript
const obj = {};

// Object.prototypeから継承している
console.log(obj.__proto__); // {}

console.log(obj.__proto__.__proto__); // null
 ```
* ```Object```のインスタンス → ```Object.prototype```

```Array```の場合：
```javascript
const arr = [];

// Array.prototypeから継承している
console.log(arr.__proto__); // []

// Object.prototypeから継承している
console.log(arr.__proto__.__proto__); // {}

console.log(arr.__proto__.__proto__.__proto__); // null
 ```
* ```Array```のインスタンス → ```Array.prototype``` → ```Object.prototype```

```Function```の場合：
```javascript
function checkProto() {};

// Function.prototypeから継承している
console.log(checkProto.__proto__); // f() {}

// Object.prototypeから継承している
console.log(checkProto.__proto__.__proto__); // {}

console.log(checkProto.__proto__.__proto__.__proto__); // null
 ```
* ```Function```のインスタンス → ```Function.prototype``` → ```Object.prototype```

どのオブジェクトもプロトタイプを辿っていくと、最終的には```Object.prototype```を継承し、nullにたどり着くことが分かります。