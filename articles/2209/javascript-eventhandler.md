# 【JavaScriptの基本】イベントハンドラ

JavaScriptには、何かの操作のタイミングで任意の処理を紐付けるイベントという機能があります。

例えば、キーボードを打つと音が鳴ったり、画面をスクロールするとポップアップ画像が表示されたりと、このような処理にもイベントが使われています。

そこで今回は、イベントを登録するためのイベントハンドラについて解説します。

## イベント
イベントとは、何かが起きた際に知らせる信号です。
マウスのクリックやカーソルを合わせる動き、キーボードの入力、ページの読み込みなど、ユーザーが行うさまざまなアクションを指します。

代表的なイベントには以下のようなものがあります。

* マウスイベント
* キーボードイベント
* フォーム要素イベント
* ドキュメントイベント
* CSSイベント　など

特定のイベントについては、イベントシリーズの後半の記事で解説します。

## イベントハンドラ
イベントハンドラとは、アクションが発生した際に実行する関数を紐付けるための方法です。
以下のようなイベントの種類に対応したイベントハンドラを登録することができます。

* ```onclick```：要素がクリックされた時
* ```onmouseover```：要素にカーソルが置かれた時
* ```onchange```：要素の内容が変わった時
* ```ondrag```：要素がドラッグされた時
* ```onsubmit```：フォームが送信された時
* ```onkeypress```：キーが押された時
* ```onload```：ページが読み込まれた時　など

このように```on```＋ イベント名のように記述します。

イベントハンドラを登録する方法はいくつかありますが、ここでは以下の2つの方法を見ていきましょう。

### HTML属性
はじめは、HTML要素の属性にイベントハンドラを登録する方法です。
イベントハンドラをHTML要素の属性に割り当てるため、HTML上で設定を行います。

例えば、```input```要素に対して```onclick```を使用すると、このように記述することができます。
```html
<p>Click this button.</p>
<input type="button" value="button" onclick="console.log('Clicked')">
 ```
```onclick```属性に対する値として、実行したい関数を記述します。
ここでは、```console.log('Clicked')```を属性値として割り当てることで、要素がクリックされた時に"Clicked"と出力されるようになります。

** eventhandler_1 **

HTML属性に直接コードを書くだけでなく、JavaScriptで関数を作成し、イベントハンドラとしてその関数を呼び出すこともできます。その場合、```onイベント名="関数()"```のように記述します。

以下のコードは、別途定義した```changeText```関数を```onclick```のイベントハンドラとして割り当てています。
```html
<p id="text">Click this button.</p>
<input type="button" value="button" onclick="changeText()">

<script>
  function changeText() {
    let getText = document.getElementById('text');
    getText.textContent = 'You clicked!';
  }
</script>
```

クリック前：
** eventhandler_2 **

クリック後：
** eventhandler_3 **

ボタンをクリックすると"Click this button"から"You clicked"というテキストに変わりました。

また、HTML属性は大文字と小文字を区別しません。
そのため、```onclick```以外にも```ONCLICK```や```onCLlick```などでも同じ動作をします。通常は```onclick```ようにすべて小文字表記にします。

### DOMプロパティ
もう一つは、DOMプロパティを使ってイベントハンドラを登録する方法です。
要素のプロパティに対してイベントハンドラを割り当てるため、JavaScript上で設定を行います。

では、```input```要素に対して```onclick```を使用し、イベントハンドラを登録してみましょう。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button">

<script>
  let elem = document.getElementById('elem');
  elem.onclick = function() {
    console.log('Clicked');
  };
</script>
 ```
```elem.プロパティ = イベントハンドラ```のように、要素のプロパティに対して実行したい関数を紐付けます。
先ほどと同じように、ボタンをクリックすると"Clicked"とコンソール出力されます。

** eventhandler_4 **

また、別途用意した関数とイベントハンドラとして割り当てることもできます。
```javascript
function sayClicked() {
  console.log('Clicked');
}

elem.onclick = sayClicked;
```
この場合、関数は```sayClicked()```ではなく、```sayClicked```のように括弧を付けずに記述することに注意してください。

イベントハンドラが登録されているプロパティに対して```null```を代入すると、イベントハンドラを解除することができます。
```javascript
elem.onclick = null;
```

## イベントハンドラの記述の違い
以下の2つは同じように動作します。

HTML属性に割り当て：
```html
<input type="button" value="button" onclick="sayClicked()">
<script>
  function sayClicked() {
    console.log('Clicked');
  }
</script>
```

DOMプロパティに割り当て：
```html
<input id="elem" type="button" value="button">
<script>
  function sayClicked() {
    console.log('Clicked');
  }

  let elem = document.getElementById('elem');
  elem.onclick = sayClicked;
</script>
```

```onclick```は、どちらもすべて小文字で記述していますが、2つの方法には違いがあります。

まず、HTML属性は大文字と小文字を区別しません。そのため、```onclick```以外にも```ONCLICK```や```onCLlick```などでも同じ動作をします。通常は```onclick```ようにすべて小文字表記にします。
```html
 <!-- すべてOKだが、通常はすべて小文字 -->
<input onclick="">
<input ONCLICK="">
<input onClick="">
 ```

一方、DOMプロパティでは大文字と小文字を区別します。そのため、```onclick```のようにすべて小文字表記にします。
```javascript
// すべて小文字
elem.onclick = function() {};
```

また、関数の記述方法にも違いがあります。
HTML属性へ関数を割り当てる際には、```関数()```のように関数の後ろに括弧を付けるのに対して、DOMプロパティでは括弧を付けません。

HTML属性に割り当て：
```html
<!-- 正しい -->
<input type="button" value="button" onclick="sayClicked()">
<!-- 誤り -->
<input type="button" value="button" onclick="sayClicked">
```

DOMプロパティに割り当て：
```javascript
// 正しい
elem.onclick = sayClicked;
// 誤り
elem.onclick = sayClicked();
```

##　イベントハンドラは一つのみ割り当て可 
HTML属性値やDOMプロパティにイベントハンドラを登録した際、これらの属性値やプロパティは一つの値しか保管できません。
そのため、同じイベントに対して登録できるイベントハンドラは一つのみです。

以下のように、一つ以上のイベントハンドラを割り当てようとすると、既存のイベントハンドラが新しいものに上書きされます。
```html
<p>Click this button.</p>
<input id="elem" type="button" value="button" onclick="console.log('Hello!')">

<script>
  // 新しいイベントハンドラ
  let elem = document.getElementById('elem');
  elem.onclick = function() {
    console.log('Thank you!');
  };
</script>
```

** eventhandler_5 **

## まとめ
今回は、イベントハンドラの登録方法について解説しました。

```plain
// ポイント
* イベントは、ユーザーが行うさまざまなアクション
* イベントハンドラは、アクションが発生した際に実行する関数を紐付けるための方法
* HTML属性に割り当て：onclick="..."
* DOMプロパティに割り当て：elem.onclick = function() {}
* 同じイベントに対して登録できるイベントハンドラは一つのみ
```

イベントハンドラは、イベント操作でもっとも基礎的で重要な機能です。ポイントをおさえて理解に繋げていきましょう。

## 合わせて読みたいイベントシリーズ
第1回：イベントハンドラ（当記事）



