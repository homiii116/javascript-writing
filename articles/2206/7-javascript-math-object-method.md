# 【JavaScriptの基本】Mathオブジェクトと静的メソッド

JavaScriptには、数値処理に便利な関数や定数がMathオブジェクトから提供されています。
具体的な数値計算を行う際は、Mathオブジェクトの静的メソッドが活用できます。

今回は、良く使われる静的メソッドについて取り上げていきます。

## 丸め
数値処理でもっとも使われる操作の一つに丸めがあります。
丸めは、数値を整数にするという意味で、小数点以下の切り上げや切り捨てなどのことです。

Mathオブジェクトには、数値を整数に丸めるための以下のメソッドがあります。

* ```Math.floor()```：小数点以下を切り捨てる
* ```Math.ceil()```：小数点以下を切り上げる
* ```Math.round()```：小数点以下を四捨五入する

Math.floorメソッドによる切り捨ては、引数に指定した値以下で最大の整数値を返します。```3.1```は```3```になり、```-3.1```は```-4```になります。

Math.ceilメソッドによる切り上げは、引数に指定した値以上で最小の整数値を返します。
```3.1```は```4```になり、```-3.1```は```-3```になります。

Math.roundメソッドによる四捨五入は、引数に指定した値の少数部分が0.5よりも小さい場合切り捨てられ、それ以外は切り上げられます。
```3.1```は```3```、```3.5```は```4```、```-3.6```は```-4```になります。

それぞれのメソッドを使って値を取得してみると、以下のようになります。
```javascript
// 切り捨て
console.log(Math.floor(3.1)); // 3
console.log(Math.floor(3.6)); // 3
console.log(Math.floor(-3.1)); // -4
console.log(Math.floor(-3.6)); // -4
// 切り上げ
console.log(Math.ceil(3.1)); // 4
console.log(Math.ceil(3.6)); // 4
console.log(Math.ceil(-3.1)); // -3
console.log(Math.ceil(-3.6)); // -3
// 四捨五入
console.log(Math.round(3.1)); // 3
console.log(Math.round(3.6)); // 4
console.log(Math.round(-3.1)); // -3
console.log(Math.round(-3.6)); // -4
```

また、単純に小数点以下を切り落としたい場合には、```Math.trunc()```が使えます。
Math.truncメソッドは、丸めを使わずに小数点以下を切り落とした整数値を返します。
```javascript
// 単純な小数部分の切り捨て
console.log(Math.trunc(3.1)); // 3
console.log(Math.trunc(3.6)); // 3
console.log(Math.trunc(-3.1)); // -3
console.log(Math.trunc(-3.6)); // -3
```

## 乱数の生成
Mathオブジェクトは、乱数の生成にも良く使われます。
```Math.random()```は、0から1までの（1は含まない）ランダムな数値を返します。
```javascript
console.log(Math.random()); // 0.2265433382558497
```

繰り返し処理の中で実行すると、毎回数値が異なることが分かります。
```javascript
for (let i = 0; i < 5; i++) {
  console.log(Math.random());
}

// 0.2836544218394843
// 0.15769995331825704
// 0.3018481943423239
// 0.5009235018630784
// 0.9429669660153723
```

任意の範囲内で乱数を生成したい場合などに活用できます。
次の例は、Math.randomメソッドを使って、11から100の範囲で乱数を生成するコードです。
```javascript
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

console.log(getRandomNum(11, 100));
// 99
// 65
// 21
// 33
// 18
```

## 最大値/最小値の取得
複数の数値の中から最大値や最小値を取得したい場合には、```Math.max()```と```Math.min()```が使えます。
Math.maxメソッドは、引数に指定した複数の値の中から、最大のものを返します。Math.minメソッドは、引数に指定した複数の値の中から、最小のものを返します。
```javascript
// 最大値
console.log(Math.max(2, 5, 11, -10, 1)); // 11
// 最小値
console.log(Math.min(2, 5, 11, -10, 1)); // -10
 ```

例えば、いくつかの数値が配列に格納されているとします。
その配列から最大値または最小値を取り出す場合、spread演算子```...```を使うと便利です。
```javascript
let years = [1990, 2002, 2015, 1987, 1975];

console.log(Math.max(...years)); // 2015
console.log(Math.min(...years)); // 1975
```

## 累乗の計算
指定の数だけ値を累乗したい場合には、```Math.pow()```が使えます。
Math.powメソッドは、引数に指定した底の数を指数の分だけ累乗した結果を返します。
```javascript
Math.pow(底, 指数);
```

累乗を行った例は以下です。
```javascript
// 値が正の場合
console.log(Math.pow(2, 10)); // 1024
console.log(Math.pow(10, 1.5)); // 31.622776601683793
// 値が負の場合
console.log(Math.pow(2, -1)); // 0.5
console.log(Math.pow(-3, 2)); // 9
// 値が0の場合
console.log(Math.pow(2, 0)); // 1
console.log(Math.pow(0, 2)); // 0
```

## まとめ
今回は、良く使われるMathオブジェクトの静的メソッドについて解説しました。

紹介したもの以外にも、三角関数や平方根を計算する際に使われるメソッドなど、多数のメソッドが用意されています。
数値計算を行う際には、ぜひ活用してみてください。

## 合わせて読みたいMathオブジェクトシリーズ
第1回：Mathオブジェクトと静的プロパティ
第2回：Mathオブジェクトと静的メソッド（当記事）
