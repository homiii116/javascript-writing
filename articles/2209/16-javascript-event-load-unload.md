# 【JavaScriptの基本】ページのロードとアンロード

Webページへアクセスしてからページを離れるまでの一連の流れには、一つひとつのアクションに応じたイベントが発生しています。

今回は、ページのロード/アンロードに関連するイベントについて解説していきます。

## ページのライフサイクル
Webページにアクセスすると、文書や画像などが表示され、それらの情報を閲覧することができ、反対にページから離れようとすると、時折Webページから離れたいか確認するメッセージが表示されることがあります。

このような現象は、ユーザーがページにアクセスしてから離れるまでのページのライフサイクルが関係しており、各フェーズで次のイベントが発生しています。

* ```DOMContentLoaded```：HTMLの読み込みが終わりDOMツリーの構築が完了した時
* ```load```：画像やスタイルシートなどの全てのリソースの読み込みが完了した時
* ```unload```：ページやリソースがアンロードされる時
* ```beforeunload```：ページやリソースがアンロードされる直前

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```DOMContentLoaded```|あり|可|
|```load```|なし|不可|
|```unload```|なし|不可|
|```beforeunload```|なし|可|

一つずつ見ていきましょう。

## DOMContentLoaded
```DOMContentLoaded```イベントは、HTMLページの読み込みが終わり、DOMツリーの構築が完了した時に発生するイベントです。
この時点では、まだページに含まれる画像やスタイルシートの読み込みが完了しているとは限りません。

```DOMContentLoaded```イベントは、```document```オブジェクトに対して発生します。
HTML属性やDOMプロパティは使用できず、```addEventListener```メソッドのみ有効です。
```javascript
let text = document.getElementById('text');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is loaded and parsed!');
});
// "DOM is loaded and parsed!"
```

```document.readyState```のプロパティを使うと、ページの読み込み状況を確認することができます。
以下の読み込み状況を表す文字列が返されます。

* ```loading```：HTMLページの読み込み・DOMの解析中
* ```interactive```：上記が完了し、画像などのリソースの読み込み中
* ```complete```：全ての読み込みが完了

例えば、DOMの解析が完了したかどうか確認したい場合、このように書くことができます。
```html
<h1>HTML page</h1>
<p id="text"></p>

<script>
  let text = document.getElementById('text');
  function showMessage() {
    text.textContent = 'DOM is ready!';
  }

  if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', showMessage);
  } else {  
    showMessage();
  }
</script>
 ```

** domcontentloaded **

このように、もしDOMの解析中であれば終わり次第メッセージを表示し、既に準備が整っている場合にはすぐにメッセージを表示するようにできます。

## load
```load```イベントは、HTMLページに含まれる画像やスタイルシートなどの全てのリソースの読み込みが完了した時点で発生するイベントです。
```window```オブジェクトに対して発生します。

```window.onload```プロパティを使用するか、```addEventListener('load', ハンドラ)```が使用できます。
```javascript
// window.onload
window.onload = () => {
  console.log('Page is fully loaded!'); // "Page is fully loaded!"
};

// addEventListener
window.addEventListener('load', () => {
  console.log('Page is fully loaded!'); // "Page is fully loaded!"
});
 ```

以下の例では、```load```イベントが発生することにより画像の読み込みが完了するため、画像のサイズを正しく取得しそれを表示することができます。
```html
<script>
  window.addEventListener('load', () => {
    let img = document.getElementById('img');
    console.log('Page is fully loaded!'); 
    console.log(`Image size: ${img.offsetHeight} × ${img.offsetWidth}`);
  });
</script>

<img id="img" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="100" width="120">
```

** load **

## unload
```unload```イベントは、文書やリソースがアンロードされる時の発生するイベントです。
ユーザーがページを離れる時、```window```オブジェクトに対して```unload```イベントが発生します。

ユーザーは```unload```イベントで起こったことを直接確認できないため、```confirm```や```alert```などのやり取りも効果がありません。
また、ウィンドウを閉じるなどの動作を遅延なく行うことはできますが、別のページへ遷移する前に確認を行なったりすることはできないため、ほとんど使われません。

別のページへ遷移するのをキャンセルしたい場合には、以下の```beforeunload```イベントを使用します。

## beforeunload
```beforeunload```イベントは、文書やリソースがアンロードされる直前に発生するイベントです。ページを離れたりウィンドウを閉じる直前の状態です。
```window```オブジェクトに対して発生します。

このイベントによって、ユーザーが現在のページから別のページへ遷移しようとする動きがあった場合、ユーザーに現在のページを終了するかどうか確認を取ることができます。

例えば、以下ではGoogleのサイトへ飛ぶリンクをクリックすると、このサイトを離れるかどうか確認のメッセージが表示されます。
```html
<script>
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = "";
  });
</script>

<a href="https://www.google.co.jp/">Google</a>
```

** beforeunload **

この場合、```e.preventDefault()```でデフォルト動作をキャンセルする必要があります。
また、```e.returnValue```プロパティに文字列を代入し、確認メッセージの値をセットします。
しかし、多くのブラウザでは独自のメッセージを表示するため、ここでは空文字```" "```をセットし、Chromeが返すメッセージを表示するようにしています。

## まとめ
今回は、ページのロード/アンロードに関連するイベントについて解説しました。

```plain
// ポイント
* DOMContentLoaded：HTMLの読み込みが終わりDOMツリーの構築が完了した時
* load：画像やスタイルシートなどの全てのリソースの読み込みが完了した時
* unload：ページやリソースがアンロードされる時
* beforeunload：ページやリソースがアンロードされる直前
 ```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動
第3回：マウスイベント -座標とキー
第4回：キーボードイベント
第5回：フォーカスイベント
第6回：データの更新
第7回：フォームの送信
第8回：ページのロードとアンロード（当記事）




