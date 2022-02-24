# 【JavaScriptの入門】演算子の優先順位

JavaScriptでは、多くの場合演算子を使ってプログラムを作成していきます。
演算子には、優先順位が決められており、評価される順番が異なります。
今回は、演算子の優先順位について解説していきます。

##  演算子とは
演算子とは、演算処理を記号で表したものです。
例えば、「5 + 3」のような足し算で使われる加算演算子「+」も演算子の一種です。
```javascript
let num = 5 + 3; // 加算演算
```

演算子には他にも沢山の種類があり、どのような処理を行うのかに応じて使い分ける必要があります。
以下は、掛け算を行うための乗算演算子「*」や、割り算を行うための除算演算子「/」を使用した例です。
```javascript
let num1 = 5 * 3; // 乗算演算
let num2 = 5 / 3; // 除算演算
```

## 演算子の優先順位
JavaScriptでは、演算子の優先順位が決められており、優先順位の高いものから演算処理が行われます。

### 演算子の優先順位が異なる場合
つぎの「+」と「*」の演算子を使った例を見てください。
```javascript
let num = 5 + 3 * 10;
```
この2つの演算で先に「+」の演算を行った場合、以下のような結果になります。
```javascript
let num = 5 + 3;
let total = num * 10;

console.log(total); // 80
```

反対に、先に「*」の演算を行うとどうなるでしょうか。
```javascript
let num = 3 * 10;
let total = num + 5;

console.log(total); // 35
```

「+」か「*」のどちらの演算を先に行うのかによって、得られる結果が異なることが分かります。

このような場合、演算子の優先順位によって演算が行われる順番が決められます。
乗算の方が加算よりも優先順位が高く評価されるため、式が左から右の順番に処理されるのではなく、先に乗算が実行されます。
```javascript
let num = 5 + 3 * 10; // 3 * 10を先に評価
console.log(num); // 35
```

### 演算子の優先順位が同じ場合
つぎに、「/」と「*」の演算子を使った例を見てください。
```javascript
let num = 12 / 3 * 4;
```

先に「/」の演算を行うと以下のような結果になります。
```javascript
let num = 12 / 3;
let total = num * 4;

console.log(total); // 16
```

反対に、先に「*」の演算を行うとこのような結果になります。
```javascript
let num = 3 * 4;
let total = num / 12;

console.log(total); // 1
```

こちらも「/」か「*」のどちらの演算を先に行うのかによって、得られる結果が異なりました。
しかし、除算と乗算の優先順位は同じです。
演算子の優先順位が同じ場合、演算子の結合性に従って演算の順序が決められます。
除算と乗算の結合性は、どちらも左結合のため、除算が先に評価されることになります。
```javascript
let num = 12 / 3 * 4; // (12 / 3) * 4; と同じ
console.log(num); // 16
```

### グループ化を行った場合
もう一つ例を見てみましょう。
以下は、除算の方が加算よりも優先順位が高いため、除算が先に行われた結果となります。
```javascript
let num = 10 + 2 / 6;
console.log(num); // 10.333333333333334
```

では、加算を括弧で囲ってみるとどうなるでしょうか。
```javascript
let num = (10 + 2) / 6;
console.log(num); //　2
```
これも演算子の優先順位が関係しています。
括弧の優先順位が高いため、括弧の中の加算が処理されている結果です。
「（）」は、括弧の中にあるものをグループ化するため、グループ化演算子と呼びます。

優先順位の異なる演算子を複数使う場合には、このようにグループ化演算子が用いられることも多いです。

## 演算子の結合性
優先順位が異なる演算子では、優先順位の高い演算子が先に実行されるため、結合性は特に関係ありません。
しかし、同じ優先順位の演算子が複数存在する場合、それらの結合性によって、処理順序が変わります。

結合性は、左から右に結合する「左結合」と、右から左に結合する「右結合」に分かれます。
```javascript
a + b - c; // 左結合。(a + b) - c;　と同じ
a = b = c; // 右結合。a = (b = c); と同じ 
```
左から右の順で評価される左結合のものがほとんどですが、参考程度に右結合のものもあるということを意識しておくと良いでしょう。

以下は、演算子の優先順位と結合性の一覧です。
上から優先順位が高いものに並んでいます。
|優先順位|結合性|演算子|種類|
|:--:|:--:|:--:|:--:|
|19|なし|(...)|グループ化|
|18|左|... . ...|メンバへのアクセス|
|-|左|...[...]|メンバへのアクセス|
|-|なし|new...(...)|引数リストあり|
|-|左|...(...)|関数呼び出し|
|-|左|?.|オプショナルチュイニング|
|17|右|new...|引数リストなし|
|16|なし|...++|後置インクリメント|
|-|なし|...--|後置デクリメント|
|15|右|!|論理否定|
|-|右|~|ビットNOT|
|-|右|+|単項プラス|
|-|右|-|単項マイナス|
|-|右|++...|前置インクリメント|
|-|右|--...|前置デクリメント|
|-|右|typeof...|typeof|
|-|右|void...|void|
|-|右|delete...|delete|
|-|右|await...|await|
|14|右|...**...|べき乗|
|13|左|...*...|乗算|
|-|左|.../...|除算|
|-|左|...%...|乗余|
|12|左|...+...|加算|
|-|左|...-...|減算|
|11|左|...<<...|左ビットシフト|
|-|左|...>>...|右ビットシフト|
|-|左|...>>>...|符号なし右ビットシフト|
|10|左|...<...|小なり|
|-|左|...<=...|小なりイコール|
|-|左|...>...|大なり|
|-|左|...>=...|大なりイコール|
|-|左|...in...|in|
|-|左|...instanceof...|instanceof|
|9|左|...==...|等価|
|-|左|...!=...|不等価|
|-|左|...===...|厳密等価|
|-|左|...!==...|厳密不等価|
|8|左|...&...|ビットAND|
|7|左|...^...|ビットXOR|
|6|左|...`|`...|ビットOR|
|5|左|...&&...|論理AND|
|4|左|...`||`...|論理OR|
|-|左|...??...|Null合体|
|3|右|... ? ... : ...|条件|
|2|右|...=...|代入 「※1」|
|1|左|,|カンマ|

「※1」の代入には、数多くの種類があるため省略しています。
他にも以下の代入演算子あります。
「+=」「-=」「**=」「*=」「/=」「%=」「<<=」「>>=」「>>>=」「&=」「^=」「|=」「&&=」「||=」「??=」

## まとめ
今回は、演算子の優先順位について解説しました。

もちろんプログラムを作成する上では、後に演算子の種類や使い方の知識が必要になりますが、ここでは、演算がどのよう順番で処理されるのかに注目してきました。

JavaScriptでは、複数の演算子を組み合わせながら処理を書いていく場面も多く、演算処理の優先順位によっては、得られる結果が異なるため、これらの仕組みを知っておくことは大切です。

ぜひ参考にしてください。

### JavaScript関連記事
<a clink src="https://tcd-theme.com/2021/05/javascript-operator.html"></a>