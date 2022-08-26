# 【JavaScriptの基本】プロトタイプの仕組み

プログラミングでは、何かの機能を取得しそれを引き継ぐような一連の作業がしばしば発生します。

JavaScriptはプロトタイプベースの言語と位置付けられているように、プロトタイプという仕組みを使って、基盤となる機能を他へと拡張していきます。

今回は、プロトタイプの仕組みについて解説していきます。

## プロトタイプ
JavaScriptのオブジェクトは、```prototype```と呼ばれる機能を引き継ぐためのオブジェクトを持っています。

例えば、メソッドを持つmemberというオブジェクトと、memberオブジェクトに少し変更を加えたgroupというオブジェクトを作りたいとします。
その際に一からgroupを作成するのではなく、memberが持つ機能を再利用し必要な箇所だけ変更を加えることで、groupオブジェクトを作ることができます。

** prototype **

このように、プロトタイプは実態のあるオブジェクトが他のオブジェクトへ機能を継承するような仕組みを持っています。

## Objectはベースオブジェクト
JavaScriptのオブジェクトは、```Prototype```という隠しプロパティを持っており、そのプロパティによって定義された```prototype```オブジェクトを継承しています。

その継承の元となっているのが```Object```です。
```Object```の```prototype```オブジェクトは、```Array```や```Function```などの他のオブジェクトで利用できるプロパティやメソッドを提供しています。

** Object-prototype **

このように、```Object```がベースオブジェクトとなっています。

## オブジェクトはどのように作られるのか
ここでは、オブジェクトはどのように作られているのか具体的に見ていきましょう。

以下は、オブジェクトリテラルで空の```obj```を定義しています。
```javascript
let obj = {};
 ```
```{}```はリテラル表記であり、実態は```new Object()```と同様です。

では、```valueOf```メソッドを使って```obj```が持つプリミティブの値を確認してみます。
```javascript
console.log(obj.valueOf()); // {}
 ```
すると、オブジェクトの空の値が返ってきます。

しかし、なぜオブジェクトリテラルで空の```Obj```を定義しただけで、```valueOf```メソッドを呼び出すことができるのでしょうか。
それは、```Object```の```prototype```オブジェクトにこの```valueOf```メソッドが定義されているからです。

試しに以下を行なってみます。
```javascript
console.log(Object.prototype.valueOf); // "function"
```
すると、"function"が返ります。これは、```Object```の```prototype```オブジェクトに```valueOf```メソッドが定義されているということです。

さらに、```obj.valueOf```と```Object.prototype.valueOf```を比較してみます。
```javascript
let obj = {};

console.log(obj.valueOf === Object.prototype.valueOf); // true
```
trueが返るように、2つは同等のものであることが分かります。
つまり、```Object```のインスタンスである```obj```は、```Object.prototype```に定義されているメソッドやプロパティを継承しているということです。
そのことから、オブジェクトリテラルで作成した```obj```が```toString```メソッドを使うことができたという訳です。

インスタンス化されたオブジェクトは、作成と同時に```Object.prototype```オブジェクトに定義されているプロパティやメソッドを利用することができます。
このようなメソッド（プロパティ）のことをプロトタイプメソッド（プロパティ）と呼びます。

かんたんにまとめると、オブジェクトが作成される流れはこのようになります。
1. オブジェクトリテラルや```new Object```でインスタンス化する
2. ```Object.prototype```を確認する
3. 2を継承し、新しいオブジェクトを作成する

## まとめ
今回は、プロトタイプの仕組みについて解説しました。

```plain
// ポイント
* プロトタイプは、オブジェクトの作成時に自動的に作成される
* プロトタイプは、実態のあるオブジェクトから他のオブジェクトへ機能を継承する
* すべてのオブジェクトは、Prototypeという隠しプロパティを持っている
* Objectがベースオブジェクトとなる
 ```

JavaScriptでは、後に出てきたクラスがプロトタイプベースとして定義されているため、こまずはプロトタイプの仕組みを知っておくと良いでしょう。

## 合わせて読みたいプロトタイプシリーズ
第1回：プロトタイプの仕組み（当記事）
第2回：オブジェクトとプロトタイプ継承
