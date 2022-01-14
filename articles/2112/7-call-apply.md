# 【JavaScriptの応用】thisの参照先を指定するcall/applyメソッドの使い方

JavaScriptにおけるthisの値は、基本的に関数の実行時に決定します。
しかし、call/applyメソッドと使うことで、関数実行時においてthisの参照先を指定することが可能です。
今回は、thisを制御するためのcall/applyメソッドについて解説していきます。

## call/applyメソッドとは
「call/applyメソッド」は、関数オブジェクトのメソッドです。
関数として定義されているものは、これらのメソッドを呼び出すことができます。

では、これらのメソッドを使うと、どのようなことができるのでしょうか。
それは、明示的にthisの参照先を指定して関数を実行するという点です。
一言で言えば、元のthisの値を無理やり変更することができるというイメージです。

## call/applyメソッドの使い方
説明だけでは理解しにくいかもしれないので、例を参考にしながら見ていきましょう。

### 基本的な振る舞い
まずは、基本的な振る舞いを見てみます。
以下は、testという関数を単純に呼び出すパターンと、call/applyメソッドを呼び出したパターンです。
```javascript
function test() {
  console.log('test');
}

test(); //"test"
test.call(); //"test"
test.apply(); //"test"
```
すべて同じ結果となりました。
さらにcall/applyメソッドは、関数test自身を指していることが分かります。

では、出力先にthisを指定し、同じように関数とメソッドの呼び出しを行うとどうでしょうか。
```javascript
function test() {
    console.log(this);
}

test(); //Window
test.call(); //Window
test.apply(); //Window
```
非strictモード下のthisは、すべての関数の呼び出しパターンにおいてWindowオブジェクトを参照していることが分かります。
これだけでは、単純に関数を呼び出しているだけでthisの値を制御しているとは言えません。

ここでcall/applyの構文と役割をしておく必要があります。

### callメソッドの基本構文
以下は、callメソッドの基本構文です。
第1引数にthisの値を指定し、第2引数以降には呼び出す関数の引数を指定します。
```javascript
関数.call(thisの値, ...関数の引数);
```

### applyメソッドの基本構文
以下は、applyメソッドの基本構文です。
第1引数にthisの値を指定し、第2引数には関数の引数を配列として指定します。
```javascript
関数.apply(thisの値, [関数の引数]);
```

### call/applyメソッドの役割
つぎに、call/applyメソッドに引数を入れて動きを見てみましょう。
```javascript
let user = {name: 'World'};

function greeting(message) {
	return `${message}, ${this.name}!`;
}

//callメソッド
const call = greeting.call(user, 'Hello');
console.log(call); //"Hello World!"

//applyメソッド
const apply = greeting.apply(user, ['Nice to meet you']);
console.log(apply); //"Nice to meet you, World!"
```
callメソッドの第1引数にthisの値としてuserオブジェクトを指定し、関数greetingを呼び出しています。
また、第2引数に指定した'Hello'が関数greetingの引数messageに入っていることが分かります。

applyメソッドも同様です。
applyメソッドの第1引数にthisの値としてuserオブジェクトを指定した状態で関数greetingを呼び出しています。
また、applyメソッドの第2引数に指定した配列['Nice to meet you']は、関数が呼ばれると自動的に中身が展開され、関数greetingの引数messageに入ります。

補足ですが、thisが必要ない場合には、第1引数にnullを渡すのが一般的です。
```javascript
function greeting(message) {
	return message;
}

const call = greeting.call(null, 'Hello');
console.log(call); //"Hello"

const apply = greeting.apply(null, ['Nice to meet you']);
console.log(apply);//"Nice to meet you"
```
いかがでしょうか。
call/applyメソッドは、通常関数の呼び出し先によって決定されるthisの値を、明示的に指定することができ、それによって関数やメソッドを別のオブジェクトに割り当てることができます。

## call/applyメソッドの違い
call/applyメソッドはほとんど同じ動きをしますが、違いもあります。
それは、関数の引数への値の渡し方です。
```javascript
let user = {name: '太郎'};

function add(a, b) {
	return `${this.name}のスコアの合計は${a + b}です`;
}

//パターン1
console.log(add.call(user, 10, 20)); //"太郎のスコアの合計は30です"
console.log(add.apply(user, [30, 40])); //"太郎のスコアの合計は70です"

//パターン2
let score1 = {a: 10, b: 20}
let score2 = [30, 40];
console.log(add.call(user, score1.a, score1.b)); //"太郎のスコアの合計は30です"
console.log(add.apply(user, score2)); //"太郎のスコアの合計は70です"
```
上記のように、callメソッドは、第2引数以降をそのまま指定するのに対し、applyメソッドは、第2引数を配列に入れて指定する点が異なります。

## まとめ
今回は、call/applyメソッドについて解説しました。

thisの振る舞いを理解していればthisの挙動を予想することができます。
しかし、thisの値を指定しておきたい場合や、予期しないthisの挙動を発生させないためにも、call/applyメソッドを知っておくと役に立ちます。

初心者がつまづきやすいと言われるthisですが、これらのメソッドを使いながら理解を深めていきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2021/12/javascript-this.html"></a>
