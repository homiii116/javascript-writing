# 【JavaScriptの基本】Dateオブジェクトと静的メソッド

```new Date()```を呼び出すと、Dateオブジェクトのインスタンスが作成され、それに付随するメソッドが使えるようになります。
しかしDateオブジェクトには、インスタンスを生成しなくても使える静的メソッドも用意されています。

今回は、Dateオブジェクトが持つ静的メソッドについて解説していきます。

## Dateオブジェクトの静的メソッド
Dateオブジェクトには、以下の静的メソッドが提供されています。

|メソッド|機能|
|:--:|:--:|
|Date.now()|UTCからの経過ミリ秒を表す数値を返す|
|Date.parse()|UTCからの経過ミリ秒を表す数値を返す|
|Date.UTC()|月の日を取得（1から31）|

* Date.now()：現在時刻を表す数値を、UTCからの経過ミリ秒で返す
* Date.parse()：指定した文字列を解釈して、UTCからの経過ミリ秒を返す
* Date.UTC()：指定した年月日や時刻を解釈して、UTCからの経過ミリ秒を返す

上記はすべてUTCからの経過ミリ秒を返します。
そのため、経過ミリ秒を取得するインスタンスメソッド```new Date(...).getTime()```と意味合い的には変わりません。

しかし、静的メソッドは、Dateオブジェクトをインスタンス化する必要がないため、実行スピードを高めたり、ガベージコレクション（不要になったメモリ領域を解放する機能）に負荷をかけにくくするメリットがあります。
そのため、単純に経過ミリ秒を取得したいだけであれば、これらの静的メソッドを使うことでパフォーマンスが上がる可能性があります。

## Date.now()
```Date.now()```は、現在時刻のUTCからの経過ミリ秒を返します。
```javascript
let ms = Date.now();

console.log(ms); // 1654608126592
```
```1654608126592```は、現在時刻に対するUTCからのミリ秒です。

例えば、ある処理の実行時間を計算するには、以下のようにすることができます。
```javascript
// 処理の開始時間
let startTime = Date.now();

// 何かしらの処理
for (let i = 1; i < 100000; i++) {
  let doSomething = i * i;
}

// 処理の終了時間
let endTime = Date.now();

// 終了ミリ秒 - 開始ミリ秒 = 実行時間のミリ秒
console.log(`実行時間：${endTime - startTime}ミリ秒`); // "実行時間：6ミリ秒"
 ```

## Date.parse()
```Date.parse()```は、日時を表す文字列を解釈してUTCからの経過ミリ秒を返します。
厳格なフォーマットは決まっていませんが、以下のような表記が推奨されています。
```javascript
Date.parse(YYYY-MM-DDThh:mm:ss.sssZ)
 ```
* YYYY-MM-DD：年-月-日
* T：区切り文字として使用
* hh:mm:ss.sss：時:時:分:ミリ秒
* Z：タイムゾーンを示す文字で、UTCからの+-hh:mmやZを使用

例えば、以下の呼び出しはすべて同じ値を返します。
```javascript
let ms_1 = Date.parse('2022-01-01');
let ms_2 = Date.parse('2022-01-01T00:00:00.000+00:00')
let ms_3 = Date.parse('2022-01-01T00:00:00.000Z');

console.log(ms_1); // 1640995200000
console.log(ms_2); // 1640995200000
console.log(ms_3); // 1640995200000
```

また、```Date.parse('datestring')```と```new Date('datestring').getTime()```は、同じ結果を得られますが、このような単純な時間の取得であれば前者の方が簡潔です。
```javascript
// Date.parse()
let static = Date.parse('2022-03-31T12:30:45');
console.log(static);

// new Date().getTime()
let instance = new Date('2022-03-31T12:30:45');
console.log(instance.getTime());
```

## Date.UTC()
```Date.UTC()```は、年や月、時や分などの指定した値に対して、UTCからの経過ミリ秒を返します。
引数に年は必須ですが、その他は省略可能です。
```javascript
Date.UTC(year, month, date, hours, minutes, secounds, ms);
 ```
* year：4桁表記で必ず指定
* month：0(1月)〜11(12月)で指定
* date：1〜31で指定
* hours：0〜23で指定
* minutes/secounds：0〜59で指定
* ms：0〜999で指定

例えば、以下の呼び出しはすべて同じ値を返します。
```javascript
let ms_1 = Date.UTC(2022);
let ms_2 = Date.UTC(2022, 0);
let ms_3 = Date.UTC(2022, 0, 1, 0, 0, 0, 0);

console.log(ms_1); // 1640995200000
console.log(ms_2); // 1640995200000
console.log(ms_3); // 1640995200000
```

1999年12月31日23時59分59秒のUTCからの経過ミリ秒を取得したい場合には、このように表現することができます。
```javascript
// 12月の場合、第二引数は11となる
let ms = Date.UTC(1999, 11, 31, 23, 59, 59);

console.log(ms); // 946684799000
```

## まとめ

素早く経過ミリ秒を取得したい場合には、静的メソッドが使えます。