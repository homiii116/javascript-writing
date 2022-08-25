# 【JavaScriptの基本】プロトタイプとメソッド

JavaScriptでは、```__proto__```プロパティを使って、オブジェクトが持つプロトタイプにアクセスすることができます。

プロトタイプを確認するだけであれば```__proto__```は便利ですが、実際には古い方法であり非推奨となっています。

現在では```__proto__```の代わりとなるメソッドが用意されています。
そこで今回は、プロトタイプの確認や設定のためのメソッドについて解説していきます。

## Object.create()
```Object.create```メソッドは、既存のオブジェクトをプロトタイプとして継承し、新しいオブジェクトを作成します。

第一引数に指定した```prototype```オブジェクトを継承します。
```javascript
Object.create(prototype);
 ```

オブジェクトリテラルでオブジェクトを作成すると、同時に```Object.prototype```を継承します。これを```Object.create```メソッドで書くと次のようになります。
```javascript
// let obj = {} と同じ
let obj = Object.create(Object.prototype);
```

もちろん```toString```などの```Object.prototype```に用意されているメソッドも使用できます。
そのため、以下は同じものとして見なされます。
```javascript
let obj = Object.create(Object.prototype);

console.log(obj.toString === Object.prototype.toString); // true
```

例えば、```user```という名前の```Object```があるとします。
```user```をプロトタイプとして、新しい```user1```というオブジェクトを作成するとこのように書くことができます。
```javascript
let user = {
  id: true
};

// userをプロトタイプとして新しいオブジェクトを作成
let user1 = Object.create(user);

console.log(user1.id); // true
 ```

また、```Object.create```メソッドは、任意で第二引数を指定することができます。
新しいオブジェクトにプロパティを追加したい際に記述します。
```javascript
Object.create(prototype[, descriptors]);
```

では、```user1```に追加のプロパティを指定してみましょう。
```javascript
let user = {
  id: true
};

// 新しいオブジェクト作成時にプロパティを追加
let user1 = Object.create(user, {
  age: {
    value: 20
  }
});

console.log(user1.age); // 20
 ```
```user```には無かった```age```というプロパティを追加することができました。

### Object.prototypeを継承しない
```Object```は、インスタンス作成時に```Object.prototype```を継承します。
しかし、継承したくない場合はどうしたら良いのでしょうか？

そのような場合、```Object.create(null)```で、プロパティやメソッドを持たない空のオブジェクトを作成することができます。
```javascript
let obj = Object.create(null);

console.log(obj.hasOwnProperty); // undefined
 ```

```obj```は、```Object.prototype```を継承していないため、そのプロトタイプメソッドである```hasOwnProperty```を呼び出すことができません。

代わりに、ES2022から導入された```Object.hasOwn```メソッドが使えます。対象のオブジェクトが```Object.prototype```を継承しなくても有効です。
```javascript
let obj = Object.create(null);

console.log(Object.hasOwn(obj)); // false
 ```
これで```obj```は、プロパティを持っていない空のオブジェクトであることが確認できます。

## Object.getPrototypeOf()
```Object.getPrototypeOf```メソッドは、オブジェクトのプロトタイプを取得します。

引数にオブジェクトを指定すると、そのオブジェクトのプロトタイプが返ります。
```javascript
Object.getPrototypeOf(obj);
 ```

では、先ほど作成した```user1```のプロトタイプを確認してみましょう。
```javascript
let user = {
  id: true
};

let user1 = Object.create(user);

// user1はuserのプロトタイプを継承している
console.log(Object.getPrototypeOf(user1)); // { id: true }
console.log(Object.getPrototypeOf(user1) === user); // true
```
```user1```が```user```の値を参照している（と同じ）であることが確認できます。

## Object.setPrototypeOf()
```Object.setPrototypeOf```メソッドは、オブジェクトのプロトタイプを設定します。

第一引数にオブジェクト、第二引数に設定したいプロトタイプを指定します。
```javascript
Object.getPrototypeOf(obj, prototype);
 ```

ここでは、```user1```に対して、新たにプロトタイプを設定してみましょう。
まずこの時点では、```user1```と```user```が同じであることが確認できます。
```javascript
let user = {
  id: true
};

let user1 = Object.create(user);

// user1はuserのプロトタイプを継承している
console.log(Object.getPrototypeOf(user1) === user); // true
 ```

では、第一引数に```user1```、第二引数に```user_new```を設定して、```user1```のプロトタイプを変更してみます。
```javascript
let user_new = {
  age: 20
};

// user1のプロトタイプをuser_newに変更
Object.setPrototypeOf(user1, user_new);

console.log(Object.getPrototypeOf(user1) === user_new); // true
```
このように、```user1```のプロトタイプが```user_new```に変更されていることが分かります。

そのため、元々継承元であった```user```とは、別のものとなります。
```javascript
console.log(Object.getPrototypeOf(user1) === user); // false
```


## まとめ
今回は、プロトタイプの確認や設定を行うためのメソッドについて解説しました。

```plain
// ポイント
* Object.create()：既存のオブジェクトをプロトタイプとして継承して新しいオブジェクトを作成する
* Object.create(null)：Object.prototypeを継承しないオブジェクトを作成する
* Object.getPrototypeOf()：オブジェクトのプロトタイプを取得する
* Object.setPrototypeOf()：オブジェクトのプロトタイプを設定する
```

## 合わせて読みたいプロトタイプシリーズ
第1回：プロトタイプの仕組み
第2回：オブジェクトとプロトタイプ継承
第3回：プロトタイプとメソッド（当記事）

