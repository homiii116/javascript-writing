# 【JavaScriptの応用】プロトタイプとメソッド

JavaScriptでは、```__proto__```プロパティを使って、オブジェクトが持つプロトタイプにアクセスすることができます。

プロトタイプを確認するだけであれば```__proto__```は便利ですが、実際には古い方法であり非推奨となっています。

しかし、現在は```__proto__```の代わりとなるメソッドが用意されています。

そこで今回は、プロトタイプの確認や設定のためのメソッドについて解説していきます。

## Object.getPrototypeOf()
```Object.getPrototypeOf```メソッドは、オブジェクトのプロトタイプを返します。
```javascript
Object.getPrototyoeOf(object);
 ```

## Object.setPrototypeOf()

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

例えば、```user```という名前の```Object```があるとします。
以下は、```user```をプロトタイプとして、新しい```user1```というオブジェクトを作成した物です。
```javascript
let user = {
  id: true
};

// userをプロトタイプとして新しいオブジェクトを作成
let user1 = Object.create(user);

console.log(user1.id); // true
 ```

```Object.create```メソッドは、任意で第二引数を指定することができます。
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


null