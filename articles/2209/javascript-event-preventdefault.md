# 【JavaScriptの基本】デフォルト動作のキャンセル

ブラウザには、リンクをクリックするとURLへアクセスしたり、フォームの送信ボタンをクリックすると情報がサーバーに送られるなどのデフォルト動作が設定されています。

しかし、JavaScriptでイベント操作を行う際に、このようなブラウザのデフォルト動作は必要ないことがあります。

今回は、デフォルト動作をキャンセルするための方法について解説します。

## Event.preventDefault()
```Event```オブジェクトの```prevendDefault```メソッドを使うと、イベントに対するデフォルト動作をキャンセルすることができます。
```javascript
Event.preventDefault();
 ```

デフォルト動作のキャンセルは、```Event.cancelable```の値が```true```の場合のみ可能です。

通常、リンクをクリックすると指定のURLへジャンプします。
例えば、以下の"Click me"をクリックした場合、```e.cancelable```プロパティにアクセスすると、```true```が返ります。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = e => console.log(e.cancelable); // "true"
</script>
```
つまり、デフォルト動作が設定されているため、これをキャンセルすることができるということです。

リンクへジャンプしないようにデフォルト動作をキャンセルするには、このように書くことができます。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = (e) => {
    e.preventDefault();
    console.log(e.cancelable);
  };
</script>
```
"Click me"をクリックしても何も起こりません。

もしくは、イベントハンドラで```false```を返すことでキャンセルすることもできます。
この方法はイベントリスナーでは使用できません。```on<event>```を使ったイベントハンドラのみ有効です。
```html
<a id="link" href="/">Click me</a>

<script>
  let link = document.getElementById('link');
  link.onclick = function() {
    return false;
  };
</script>
```
この場合も"Click me"をクリックしてもURLにジャンプしません。

## チェックボックスを無効にする

