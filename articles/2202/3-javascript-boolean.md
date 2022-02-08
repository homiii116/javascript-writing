# 【JavaScriptの入門】JavaScriptにおける論理型（Boolean）

ある条件下で値をtrue（真）かfalse（偽）か判定させるために、使われているのが論理型です。
JavaScriptでは、条件分岐や繰り返し文などのさまざまな処理で論理値が利用されています。
そこで今回は、論理型とは何か、またその判定結果について解説していきます。

## 論理型（Boolean）

論理型が持つ値は、trueまたはfalseの2つのみです。
trueは真（正しい）を意味し、falseは偽（正しくない）を意味します。
このtrueやfalseの値のことを「論理値」または「真偽値」と呼びます。

typeof演算子を使ってtrueとfalseの型を調べると「boolean」と表記されます。
```javascript
console.log(typeof true); // "boolean"
console.log(typeof false); // "boolean"
```

論理型は、このようにtrueまたはfalseの値を格納することができます。
```javascript
let over16YearsOld = true; // 16歳以上はOK
let under15YearsOld = false; // 15歳以下はNG
```

また、論理型は、比較の判定をする際によく利用されています。
```javascript
console.log(3 < 5); // true
console.log('javascript' === 'JavaScript'); // false
```

例えば、ある条件下において値が正しい場合は1の処理を、正しくない場合は2の処理を行いたい時などです。JavaScriptでは、if文やfor文などが用いられます。
```javascript
if (3 < 5) { // 値がtrueのため、1の処理を行う
  console.log('1: 値は正しいです'); 
} else { 
  console.log('2: 値は間違いです');
}

// "1: 値は正しいです"
```

## 論理型の判定
ある条件下におけるプログラムを作成する際には、論理型がtrueと判定するか、falseと判定するかを理解しておくことが大切です。

では、どのような値がtrueとみなされるのか、またfalseとみなされるのかについて見ていきましょう。

ここでは、if文を例に取り上げながら論理型の判定を解説していきます。
難しいことは取り上げませんが、あらかじめif文について学習したい方は以下の記事を参考にしてください。
<a clink src="https://tcd-theme.com/2021/03/javascript-if.html"></a>

## falseとみなされる値
まずは、falseとみなされる値です。
これらを先に覚えておけば、その他の値はtrueとみなされる値となるため便利です。

falseとなる値は8つあります。

|値|意味|
|:---:|:---:|
|false|falseキーワード|
|0|数値のゼロ|
|-0|数値のマイナスゼロ|
|0n|BigInt型の0n|
|""|空の文字列|
|null|値が存在しない|
|undefined|未定義の値|
|NaN|非数|

これらの値をif文の条件式に記述すると、falseと評価され、ifブロックの処理を実行しません。

```javascript
if (false) {}
if (0) {}
if (-0) {}
if (0n) {}
if ("") {}
if (null) {}
if (undefined) {}
if (NaN) {}
```

以下は、if文の条件式に空の文字列が記述されているため、falseと判定され、ifブロックを実行せず、elseブロックの処理が実行されます。

```javascript
if ("") { 
  console.log('true');
} else {
  console.log('false'); 
}

// "false"
```

## trueとみなされる値
falseとみなされる値以外は、すべてtrueとみなされる値です。
例えば以下のような値が該当します。

|値|意味|
|:---:|:---:|
|true|trueキーワード|
|10|数値|
|"文字列"|文字列|
|1n|長整数|
|{}|オブジェクト|
|[]|配列|

これらの値をif文の条件式に記述すると、trueと評価され、ifブロックの処理を実行します。

```javascript
if (true) {}
if (10) {}
if ("文字列") {}
if (1n) {}
if ({}) {}
if ([]) {}
```

例を見て見ましょう。
以下は、if文の条件式に100という数値が記述されているため、trueと判定され、ifブロックに書かれている処理が実行されています。

```javascript
if (100) { 
  console.log('true');
} else {
  console.log('false'); 
}

// "true"
```

## まとめ
今回は、論理型について解説しました。
if文のような論理値が要求される場面では、値がtrueとなるのかfalseとなるのか理解していないと、意図した処理結果を得られない可能性があります。

ぜひこの機会にtrueとなる値、falseとなる値を覚えておきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2022/01/javascript-typeofdata.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-string.html"></a>
<a clink src="https://tcd-theme.com/2022/02/javascript-number.html"></a>






