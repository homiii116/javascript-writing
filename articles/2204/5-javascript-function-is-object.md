# 【JavaScriptの入門】関数オブジェクト

JavaScriptには、文字列や数値、配列などのさまざまな値があり、値はすべて型を持っています。
JavaScriptでは、関数はオブジェクト型の値の一種です。
そのため、他のあらゆる値と同じように操作することができます。

そこで今回は、関数がオブジェクトであることについて取り上げていきます。

## 関数オブジェクト
関数は、関数オブジェクトと呼ばれるオブジェクトの一つです。
関数は呼び出すだけでなく、変数に代入したり、プロパティの操作などができます。

このように関数が他のオブジェクトと同様に扱えることを第一級関数（ファーストクラスファンクション）と呼びます。

かんたんなイメージとしては、呼び出し可能な実行オブジェクトという位置付けです。

関数がオブジェクトであることを意識して、どのようなことができるのか見ていきます。

## 関数オブジェクトの呼び出し
もっとも一般的なのは、関数を関数として呼び出すことです。
```関数名();```と記述することで、関数にまとめた処理を呼び出すことができます。

```javascript
function sayHi() {
  console.log('Hello');
}

sayHi(); // 'Hello'
 ```

## 関数オブジェクトの参照
関数呼び出しの際に、関数名の後ろの括弧```()```が無ければ、その関数は実行されません。

しかし、関数がオブジェクトであるということを考えてみてください。
単純に関数名のみ記述した場合は、定義した関数そのものを参照します。
```javascript
function sayHi() {
  console.log('Hello');
}

// 関数の後ろに括弧が無い
console.log(sayHi); 
/* 
  function sayHi() {
    console.log('Hello');
  }
*/
```
関数のコードが出力されることが分かります。


## 関数オブジェクトの代入
定義した関数を変数に代入してから呼び出すこともできます。

次のコードを見てください。
```javascript 
function sayHi() { // 1 
  console.log('Hello');
}

let greeting = sayHi; // 2 

sayHi(); // 3 "Hello"
greeting(); // 4 "Hello"
```
流れはこのようになっています。
1. 関数```sayHi```を定義
2. 関数```sayHi```を変数```greeting```に代入
3. 関数```sayHi```を呼び出す → ```'Hello'```を出力される
4. 変数```greeting```を呼び出す → ```'Hello'```を出力される

つまり、```sayHi()```と```greeting()```のどちらの方法でも同じ関数を参照することになり、どちらの方法でも呼び出すことができます。


上記は、関数宣言で定義した後に変数に代入する場合で説明しました。
しかし、関数を変数に代入したり、その変数を使って操作する場合には、関数式で定義する方法が使われます。
```javascript
const sayHi = function() {
  console.log('Hello');
}

sayHi(); // "Hello"
```
このように、関数式であればはじめから関数を値として定義できます。

## 関数オブジェクトのプロパティ
関数オブジェクトには使用可能なプロパティがあり、デバッグ時などに役に立ちます。

```name```プロパティを使うと、関数作成時の関数名を参照することができます。
```javascript
function sayHi() {
  console.log('Hello');
}

console.log(sayHi.name); // "sayHi"

// 関数sayHiを変数hiと変数heyに代入
let hi = sayHi;
let hey = sayHi;

// 元の関数名が出力される
console.log(hi.name); // "sayHi"
console.log(hey.name); // "sayHi"
 ```
関数がいくつかの変数に代入された場合でも、nameプロパティを使うと元の関数名へアクセスします。

また、```length```プロパティは、関数が持つ引数の数を示します。
```javascript
function func1() {}
function func2(a) {}
function func3(a, b, c) {}

console.log(func1.length); // 0
console.log(func2.length); // 1
console.log(func3.length); // 3
```
実際に渡された引数の数ではなく、関数定義時に記述された引数の数を取得することができます。

## まとめ
今回は、関数オブジェクトについて解説しました。

関数のメインの役割は、処理を一つにまとめて再利用可能にすることです。
しかし、関数がオブジェクトであるという点を意識すると、値としてさまざまな操作ができるようになります。

これを機に、関数の使い方の幅を広げていきましょう。

## 合わせて読みたいJavaScript関数の関連記事
第1回：[関数と宣言](https://tcd-theme.com/2022/04/javascript-function-declaration.html)
第2回：[関数と引数](https://tcd-theme.com/2022/04/javascript-function-parameter-argument.html)
第3回：[関数と戻り値](https://tcd-theme.com/2022/04/javascript-function-return.html)
第4回：[関数式](https://tcd-theme.com/2022/04/javascript-function-expressions.html)
第5回：[関数オブジェクト](https://tcd-theme.com/2022/04/javascript-function-is-object.html)（当記事）