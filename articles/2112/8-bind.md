# 【JavaScriptの応用】bindメソッドを使ってthisを束縛する方法。call/applyメソッドとの違いも解説
thisの値を指定することができるbindメソッド。
bindという名前の通り、thisを束縛するために利用されます。

今回は、thisを自由に制御するために便利なbindメソッドについて解説と、類似のcall/applyメソッドとの違いについて取り上げます。

## bindメソッドとは
「bindメソッド」とは、thisの値を束縛し、新しい関数を生成するためのメソッドです。
「thisの束縛」以外にも、「関数の紐付け」などど表現されることがあります。

bindメソッドが呼ばれると、関数を実行するのではなく、与えられたthisの値を持った新しい関数を生成するというのが特徴です。

## bindメソッドの使い方
では、具体的にbindメソッドの使い方を見ていきましょう。

### bindメソッドの基本構文
以下は、bindメソッドの基本構文です。
第1引数にthisの値を指定し、第2引数以降には紐付けたい関数の引数を指定します。
```javascript
関数.bind(thisの値, ...関数の引数);
```
### bindメソッドの役割
bindメソッドを実際に使ってみると、以下のように書くことができます。
```javascript
let user = {
	name: 'Tarou'
};

function greeting(message) {
	return `${message}, ${this.name}!`;
}

//関数greetingをラップした新しい関数（getUser）を作る
const getUser = greeting.bind(user, 'Hello');
console.log(getUser()); //"Hello, Tarou!"
```
関数greetingでは、thisがuserオブジェクトに束縛され、さらにbindメソッドによって関数greetingがラップされた新しい関数が生成されています。

上記で取り上げた例を単純な関数で表現するとこのようになります。
```javascript
let user = {
	name: 'Tarou'
};

function greeting(message) {
	return `${message}, ${this.name}!`;
}

//bindメソッドを使うと、以下のような元の関数をラップする新しい関数を作る
const getUser = () => {
	return greeting.call(user, 'Hello');
};

console.log(getUser()); //"Hello, Tarou!"
```
いかがでしょうか。
bindメソッドは、thisやその他の引数を束縛した関数を作る役割があることが分かります。

## call/applyメソッドとの違い
bindメソッドは、call/applyメソッドと混同されがちですが、異なる動きを持っています。

以下を見ながらbindメソッドとcallメソッドの動きを比べてみましょう。
```javascript
//bindメソッドのパターン
let user = {
	name: 'Tarou',
	greeting: function() {
		console.log(`Hello, ${this.name}!`);
	}
};

const sayHi = user.greeting.bind(user); //thisを束縛した関数sayHiを作る
sayHi(); //"Hello, Tarou!"
setTimeout(sayHi, 2000); //"Hello, Tarou!" 2秒後に関数sayHiが実行される


//callメソッドのパターン(applyメソッドも同様)
let user = {
	name: 'Tarou',
	greeting: function() {
		console.log(`Hello, ${this.name}!`);
	}
};

const sayHi = user.greeting.call(user); //"Hello, Tarou!" ここでthisを指定した関数greetingが実行される
sayHi(); //"Uncaught TypeError: sayHi is not a function"
```
bind/call/applyメソッドを使うと、thisの値を指定することができるという点は同じです。
しかし、call/applyメソッドの場合は、メソッドが呼ばれた瞬時に元の関数が実行されるのに対して、bindメソッドは、メソッドが呼ばれたと同時に新しい関数を作り、新しい関数にthisや引数の値を引継ぎます。
call/applyは、新しい関数を作成するわけではないため、関数sayHiを実行しても関数として認識されずエラーとなります。

## まとめ
今回は、bindメソッドの役割と類似のcall/applyメソッドとの違いについて解説しました。

bindメソッドと使うと、thisの値を固定化し、thisや引数を新しい関数へ紐付けができるようになります。
call/applyメソッドと似たような役割がありますが、まずは、「thisを束縛して新しい関数を作るのがbindメソッド」と覚えておくと良いでしょう。

bindメソッドをうまく活用して、thisを自由自在に使えるように実践していきましょう。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2021/12/javascript-this.html"></a>
<a clink src="https://tcd-theme.com/2021/12/javascript-call-apply.html"></a>