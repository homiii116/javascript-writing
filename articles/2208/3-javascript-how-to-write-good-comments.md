# 【JavaScriptの基本】良いコメントを書くためのポイント

JavaScriptでは、```//```や```/* */```を使ってコメントを表現することができます。
そして多くのプログラマーは、できる限り簡潔に分かりやすくコメントを書くことを意識します。

もちろんそれは大事なことではありますが、分かりやすいコメント＝良いコメントとは言えない場合があります。

今回は、良いコメントを書くためのポイントについて解説していきます。

## 悪いコメントの例
コメントは、通常コードを説明するためのものです。
そのため、初学者はプログラムの中で起こっていることを解説するためにコメントを書く傾向があります。
```javascript
function add(a, b) {
  // aとbを足した数を返す
  return a + b;
}

// 実引数に1と2を入れてコンソールに出力する
console.log(add(1, 2));
```
しかし、```return a + b```や```console.log(...)```など、コードを見れば内容が分かるものに対してコメントを書く必要はありません。
通常はコードを見ただけで理解できるべきだからです。

例えば、以下のような数値の計算を行う関数の場合、これらのコメントが必要であるかどうか考えてみましょう。
```javascript
function showDivisibleNum(length, num) {
  // 1からlengthまでの間、繰り返し処理を行う
  for (let i = 1; i <= length; i++) {
    // numで割り切れる数があれば出力する
    if (i % num == 0) {
      console.log(i);
    }
  }
}

showDivisibleNum(128, 24);
// 24
// 48
// 72
// 96
// 120
```

まず、関数名showDivisibleNumは、「割り切れる数を表示する」という意味です。
名前の通り、何かで割った時に割り切れる数値を表示するという憶測ができます。

for文では、1から引数に指定したlengthの数までの間、順番に何かの処理を行っています。

if文は、1からlengthまでの数値を引数に指定したnumの数で割り、その結果0になる数を出力しています。

このことから、1からlengthまでの数の中でnumで割り切れる数を出力するプログラムであることが分かります。

では、改めてコメントなしのコードを見てみましょう。
```javascript
function showDivisibleNum(length, num) {

  for (let i = 1; i <= length; i++) {
    if (i % num == 0) {
      console.log(i);
    }
  }
}

showDivisibleNum(128, 24);
// 24
// 48
// 72
// 96
// 120
```

関数の中身を順番に見ていくと、プログラムの中で起こっていることが理解できるはずです。関数名や引数、各計算から、情報を得ることができます。
このように、関数自身が何を行なっているかを伝えているため、コメントを残す必要はありません。

まずは、方法を説明するようなコメントは必要最低限にすることを意識しましょう。

## 良いコメント
良いコメントを書くポイントは、説明の分かりやすさはもちろん、コメントが必要な箇所かそうでない箇所の見極めでもあります。

上記で述べたように、通常は方法を説明するようなコメントは必要ありません。
一方、コメントを書くべき時もあります。

### 理由を説明するコメント
処理の制約がある場合には、第三者が理解できるようにコメントを残します。

例えば、既に決められた要件や仕様があったとします。
実装した開発者本人以外の人が見た時、なぜそのような処理がされているのか理由が分かるようにコメントを記述することは大切です。

```javascript
// 実行するプレイリストの数は10個までの要件あり
const PLAY_LIST = 10;

for (let i = 0; i < PLAY_LIST; i++) {
  ...
}
```

なぜ変数の値が10でないといけないのかは、コードでは表現できません。
そのため、理由を説明するようなコメントは、第三者にとっても開発者本人にとっても、必要な情報として役に立ちます。

### 関数を文書化するコメント
大規模な開発を行う場合やチームで開発を行う場合には、一定のルールをコメントとして残すことがあります。
例えば、変数や受け取る引数の型、オブジェクトの種類、開発者の名前などを説明する場合です。

代表的な方法として、JavaScriptで書かれたコードを文書化するためのJSDocというマークアップ言語がコメントとして使われています。
```javascript
/**
   * Userクラスのインスタンスを作成する
   * @constructor
   * @param {string} name - 名前
   * @param {number} age - 年齢
   */
function User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
...
```
上記のコメントから、User関数はコンストラクタであること、引数には文字列型のnameと数値型のageが指定されていることが分かります。

このようなコメントにより、関数のアーキテクチャを理解することができます。
また、コメントを統一化するという目的にも使われ、プログラムの全体的な可読性にも繋がります。

JSDocについては今後別の記事で解説しますが、このような方法があることを知っておくと便利です。

## まとめ
今回は、良いコメントを書くためのポイントについて解説しました。

```plain
// コメントを残す場面
* なぜそうなったのか理由を説明する場合
* 関数のアーキテクチャを説明する場合
* コメントを統一化する場合
```

良い開発者を目指すには、コードが書けるかだけでなく、良いコメントを書けるかも重要な要素になってきます。
まずはこれまでのコメントが本当に必要なものであるかを見直し、少しずつ良いコメントが書けるように練習していきましょう。

## 合わせて読みたいJavaScript事前知識シリーズ