# 【JavaScriptの入門】JavaScriptにおけるnull型・undefined型

undefined型とnull型は、他のプリミティブのデータ型に比べると特殊なデータ型です。
これらが持つ値の意味に疑問を持つ方もいるのではないでしょうか。
今回は、そのような疑問を解消できるように、undefined型・null型とは何か、またそれらの違いについて解説していきます。

## null型
null型は、少し変わったデータ型で、自身の「null」という値のみを持っています。
null値には、「値が空」「値がない」「値が不明」という意味があります。

typeof演算子を使って型を調べると「object」が返されます。
```javascript
console.log(typeof null); // "object"
```

ここで「なぜオブジェクト？」という疑問が生まれますね。
nullがオブジェクトと判定されるのは、公式に認められている言語的なエラーで、互換性が維持されています。
つまり、nullはオブジェクトではなく、単に言語のエラーによってオブジェクトと判定されているということです。

null型は、意図的に値が存在しないことを表します。
```javascript
let name = null;
console.log(name); // null
```

意図的にという点がポイントで、変数が特定のオブジェクトや値を参照していないことを示したり、データが存在するか確認するために使用されています。

例えば、以下のようなケースです。
userというオブジェクトのnameプロパティに、初期値としてnullを設定しています。
また、if文を使用してデータが空であれば「データがありません」という処理を行っています。
```javascript
let user = {
  name: null // 値が空であることを明示する
}

if (user.name === null) {
  console.log('データがありません')
}

// "データがありません"
```
このようにデータあるかどうかを判定し、その判定結果によって処理を分けて行うことができます。

## undefined型
undefined型も、null型と同じく特殊なデータ型で、自身の「undefined」という値のみを持っています。
undefined値には、「値が未定義」「値が代入されていない」という意味があります。

typeof演算子を使って型を調べると「undefined」が返されます。
```javascript
console.log(typeof undefined); // "undefined"
```

変数は宣言されているが値が代入されていない場合、その値はundefinedとなります。
```javascript
let name;
console.log(name); // undefined
```

技術的にはundefined型もnull型と同じように、変数にundefinedの値を代入することは可能です。
```javascript
let name = undefined;
console.log(name); // undefined
```

しかし、この方法はあまり推奨されていません。
undefined型は、変数が割り当てられているか、そうでないか確認するために使われているからです。
意図的に値が空であることを明示するに場合には、null型を使うのが一般的です。

## nullとundefinedの違い
nullとundefinedは、どちらも「値がない」ことを意味する点は共通しています。
意味合い的な違いは、nullは「値自体が存在しないため、値がない」、undefinedは「値が代入されていないため、値が無い」というイメージです。

実際にはこれらの意味を厳密に理解し使い分けるのは、現役のプログラマーでもかんたんではありません。
「nullを使うべきだ」、「undefinedを使うべきだ」という論点となるテーマだからです。

そのため、ここでは意味合い的な違いではなく、JavaScriptの言語上での仕様の違いを見ていきます。

### 自然発生するか/しないか
nullは、明示的に使わない限り、自然に発生するものではありません。
反対に、undefinedは、明示的に使わなくても、値が代入されていない場合には、自然に発生してきます。
```javascript
let name1 = null; //　nullを明示している
console.log(name1); // null

let name2; // undefinedを明示しているわけではない
console.log(name2); // undefined
```

オブジェクトに存在しないプロパティにアクセスした際にも、undefinedが返ります。
```javascript
let user = {
  name: 'John'
}

console.log(user.name); // "John" → nameプロパティは存在する
console.log(user.age); // undefined → ageプロパティは存在しない
```

既に代入されていたと思っていた値にアクセスしたところ、undefinedが返ってきて、スペルミスが原因だったことに気が付くこともあります。
```javascript
let fruits = ['apple', 'banana', 'blueberry'];
console.log(fruit); // fruit is not defined" → fruitではなくてfruits（複数形）
```
このようにundefinedは自然発生するため、見かける頻度も多くなります。

### typeof演算子
さいごにデータ型の違いについて復習しておきましょう。
typeof演算子でデータ型を調べると、nullは「object」であるのに対し、undefinedは「undefined」が返ります。
```javascript
console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
```

## まとめ
今回は、null型とundefined型について解説しました。
nullとundefinedは理解しにくい側面もありますが、それらの値はプログラムのどこに挙動が起こっているのかヒントになります。

まずはかんたんな特徴を掴んでいきましょう。
```plain
// ポイント
*null型は、意図を持ってnullを代入して値がないことを示す
*undefined型は、値が代入されていないため値がないことが示される
```

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/javascript-typeofdata.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-string.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-number.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-boolean.html"></a>

