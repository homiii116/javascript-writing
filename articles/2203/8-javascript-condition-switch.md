# 【JavaScriptの入門】条件分岐：switch文

JavaScriptの条件分岐には、switch文を使った手法があります。
これは、対象の値が複数のパターンのいずれかと一致するか否かによって、処理を分ける方法です。

今回は、switch文による条件分岐の使い方を解説していきます。

## switch文
switch文は、if文と同様に式の評価結果に基づいて条件分岐を行います。
対象の値を複数のパターンと比較する点が特徴で、かんたんに言えば、複数のif文を持つようなイメージです。

以下がswitch文の基本構文です。
switch文は、1つ以上のcaseと任意でdefault文を持ちます。
```javascript
switch (式) {
  case 値1:
    式の評価結果が値1と一致する場合に実行する処理;
    break;
  case 値2:
    式の評価結果が値2と一致する場合に実行する処理;
    break;
  default:
    式がどのcaseにも一致しない場合に実行する処理;
}
```

** switch画像

以下の例を見てみましょう。
```javascript
let city = 'Tokyo';

switch(city) {
  case 'Osaka':
    console.log('日本の第2の都市です');
    break;
  case 'Tokyo':
    console.log('日本の首都です');
    break;
  default:
    console.log('その他の都市です');
}

// "日本の首都です"
```
switch文は、変数cityとはじめのcaseである'Osaka'との比較を行います。結果は一致しません。
つぎに、2つ目のcaseである'Tokyo'と比較をします。
ここでの比較は一致するため、```case 'Tokyo'```に続く処理を実行します。
処理は、もっとも近いbreakまで行った後、switch文を抜けます。

## switch文の仕組み
switch文は、if文に比べて複雑な作りになっているため、はじめのうちはどのように処理が行われているのか理解しづらい側面があります。

仕組みはこのようになっています。
* 式の評価を行う
* 式の評価結果とはじめのcaseの値を比較し、その後つぎのcaseへと続く
* 一致するcaseが見つかった場合、該当するcaseの中の処理をbreak文またはswitch文の終わりまで実行する
* 一致するcaseがない場合、default文の中の処理を実行する

switch文の構成をif文として見てみると、理解しやすくなります。

switch文は、まず式を評価します。
```javascript
switch (式) {
  case...
}
```

続いて、式の評価結果と一致する値を探します。
この時、厳密等価演算子```===```によって比較されます。
```javascript
switch (式) {
  // if (式 === '値1')
  case 値1:
}
```

一致する値が見つかった場合、該当するcaseの中の処理を実行します。
case内にbreak文があればそこで処理が終了し、switch文から抜けます。
```javascript
switch (式) {
  // if (式 === '値1')
  case 値1:
    console.log('値1');
    break;
}
```

もし、はじめのcaseと一致しなければ、次のcaseへ移動し、改めて式との比較が行われます。
最終的に一致するcaseが見つからない場合、default文の処理を実行します。

```javascript
switch (式) {
  // if (式 === 値1)
  case 値1:
    console.log('値1');
    break;
  // else if (式 === 値2)
  case 値2:
    console.log('値2');
    break;
  // else
  default:
    console.log('デフォルト');
}
```

## break文
switch文の各caseでは、基本的に```break;```を用いて、switch文を抜けるようにします。

break文は省略することができますが、break文を書かない場合、注意が必要です。
式の評価結果と一致するcaseにbreak文が記述されていなかった場合、条件に一致するか関係なく、その先のcaseの処理がbreak文が見つかるまで、またはswitch文が終わるまで実行されます。

break文がない例を見てみましょう。
```javascript
let city = 'Tokyo';

switch(city) {
  case 'Osaka':
    console.log('日本の第2の都市です');
    // break文なし
  case 'Tokyo':
    console.log('日本の首都です');
    // break文なし
  case 'Hokkaido':
    console.log('日本でもっとも面積がある都市です')
    // break文なし
  default:
    console.log('その他の都市です');
}

// "日本の首都です"
// "日本でもっとも面積がある都市です"
// "その他の都市です"
```

変数cityは、```case 'Tokyo'```と一致するため、その先の処理を実行していきます。
しかし、break文がないため、そのままswitch文の終わりまですべての処理が行われていることが分かります。

このように、break文を記述しないと意図しないcaseの処理まで実行されてしまうため、意図的な処理以外は、基本的に各caseにbreak文を書くようにしましょう。

## if文との比較
switch文は、多くの場合if文に書き換えることができます。

```javascript
// switch文
let city = 'Tokyo';

switch(city) {
  case 'Osaka':
    console.log('日本の第2の都市です');
    break;
  case 'Tokyo':
    console.log('日本の首都です');
    break;
  default:
    console.log('その他の都市です');
}
```

```javascript
// if文
let city = 'Tokyo';

if (city === 'Osaka') {
  console.log('日本の第2の都市です');
} else if (city === 'Tokyo') {
  console.log('日本の首都です');
} else {
  console.log('その他の都市です');
}

// "日本の首都です"
```

しかし本来は、switch文をif文の代用として使用するのではなく、関数を用いて条件に対する値を```return```で返す場合に使うことが多いです。
```javascript
function getCity (city) {
  switch (city) {
    case 'Osaka':
      return '日本の第2の都市です';
    case 'Tokyo':
      return '日本の首都です';
    default:
      return 'その他の都市です';
  }
}

console.log(getCity('Tokyo')); // "日本の首都です"
```

あくまで一例のため、ここでは関数の使い方を覚える必要はありません。

まずは、switch文は複数のパターンの中から一致する値を探すという認識を持っていると良いでしょう。

## まとめ
今回は、switch文による条件分岐について解説しました。

```plain
// ポイント
* switch文は、複数のパターンから一致する値を見つけ、処理を実行する
* caseとdefault文で条件分岐した処理を扱う
* caseにbreak文を記述しない場合、その先のcaseの処理が実行される
```

### JavaScript関連情報
<a clink src="https://tcd-theme.com/2021/04/javascript-switch.html"></a>
<a clink src="https://tcd-theme.com/2022/03/javascript-condition-if.html"></a>