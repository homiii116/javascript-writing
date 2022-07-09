# 【JavaScriptの基本】要素の属性の操作

HTMLでは、タグがid属性やclass属性などの属性を持つことができます。
また、プロパティやメソッドを使用して属性値の取得や変更、新しい属性値の設定などを行うことができます。

そこで今回は、要素の属性に関わる操作方法を解説していきます。

## HTML属性とDOMプロパティ
HTML属性は、要素の動作を制御するための特別な機能です。
```<body id="">```や```<input type="">```のidやtypeが属性に該当します。

HTML属性は、標準のものと非標準のものに分かれます。
例えば、idは```<body>```に対しても```<input>```に対しても適用できる標準の属性です。一方、typeは```<input>```に対しては標準の属性ですが、```<body>```に対しては非標準となります。

このように、どのタグにも使用できる属性と特定のタグで使用できる属性があります。

では、なぜその区別が必要なのでしょうか。
それは、ブラウザがタグに対してDOMオブジェクトを作成する際の対応が異なるためです。
標準の属性の場合はDOMプロパティが生成されるのに対し、非標準の場合はプロパティが生成されないためです。

例：
```html
<body id="intro" type="text">
  
  <script>
    console.log(document.body.id); // // intro
    console.log(document.body.type); // undefined
  </script>
</body>
 ```
上記の例では、id属性はbodyタグに対して標準の属性であるため、id自身のプロパティを使用することができます。よって、```document.body.id```でid属性が持つ値を参照します。
一方、type属性はbodyタグに対して非標準の属性であるため、プロパティを使用するとundefinedが返ります。

このように、標準属性であればそのままプロパティとして属性名が使用できます。
```javascript
element.属性名;
```

また、属性名に対して属性値を設定することもできます。
```javascript
element.属性名 = 'value';
```
次のコードを見てください。
```html
<div>
  <a href="https://sample.com">URL</a>
</div>
  
<script>
  let element = document.querySelector('a');
  element.href = 'https://abcde.com';
  console.log(element.href); // "https://abcde.com/"
</script>
```

** dom_attributes_1 **
元々は、aタグのhref属性に"https://sample.com"が指定されていました。
```element.href = 'https://abcde.com'```によって、href属性の値が変更されたことがコンソールで確認できます。

元々要素に指定されていなかった属性値を追加することも可能です。
```html
<div>
  <a href="https://sample.com">URL</a>
</div>
  
<script>
  let element = document.querySelector('a');
  element.href = 'https://abcde.com'; // 属性値の設定（変更）
  element.target = '_blank'; // 属性値の追加

  console.log(element.href); // "https://abcde.com/"
  console.log(element.target);
</script>
```

** dom_attributes_2 **

今度は、aタグのtarget属性とその値が追加されました。

## メソッド
プロパティを用いてかんたんに属性にアクセスすることができますが、プロパティはすべての属性には対応していません。
しかしすべての属性にアクセスできるメソッドが用意されています。

では、詳しく見ていきましょう。

### 属性値の取得

### 属性値の設定



