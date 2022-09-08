# 【JavaScriptの基本】イベント移譲

バブリングによって、ターゲット要素から親要素にイベントを伝搬させることができます。
しかし、子要素がいくつもある場合、各子要素にハンドラを割り当てて親要素までイベントを伝搬させるのは少し手間です。

そこでイベント移譲という仕組みを使って、より多くの要素を処理できるようにします。
今回は、イベント移譲について解説していきます。

## イベント移譲
イベント移譲とは、各子要素にハンドラを登録する代わりに、共通の親要素に対してハンドラを一括して登録する仕組みです。Event delegationとも呼ばれます。

この概念は多くの要素を一度に処理できるため、とても強力なイベントハンドリングでもあります。
例えば、複数の子要素のどれかしらにイベントが発生した際に、共通のハンドラを実行したいという場合です。

以下のようなHTMLがあるとします。
```html
<ul>
  <li>アイテム1</li>
  <li>アイテム2</li>
  <li>アイテム3</li>
  <li>アイテム4</li>
  <li>アイテム5</li>
</ul>
```

このHTMLページ上のいずれかのアイテムがクリックされたら、クリックしたアイテム名を出力する場合、単純にこのように書くことができます。
```html
<style>  
  body {
    width: 740px;
  }

  #parent,li {
    border: 2px solid blue;
    margin: 5px;
    padding: 10px;
    list-style: none;
  }
</style>

<ul id="parent">
  <li onclick="console.log('item1')">Item1</li>
  <li onclick="console.log('item2')">Item2</li>
  <li onclick="console.log('item3')">Item3</li>
  <li onclick="console.log('item4')">Item4</li>
  <li onclick="console.log('item5')">Item5</li>
</ul>
```
では、アイテム1から5まで1回ずつクリックしてみます。

** event-delegation_1 **

すると、各アイテム名が出力されることが確認できます。

しかし、処理はまったく同じなのに、5回も```onclick```を設定するのは手間です。

これをイベント移譲で考えると、すべての```<li>```に```onclick```を割り当てるのではなく、```<ul>```でイベントをキャッチしハンドラを実行するように設定することができます。

##　イベント移譲の考え方
ここでは、イベント移譲を利用して先ほどのアイテム名の表示を実装してみましょう。

```html
<style>  
  body {
    width: 740px;
  }

  #parent,li {
    border: 2px solid blue;
    margin: 5px;
    padding: 10px;
    list-style: none;
  }
</style>

<ul id="parent">
  <li id="item1">Item1</li>
  <li id="item2">Item2</li>
  <li id="item3">Item3</li>
  <li id="item4">Item4</li>
  <li id="item5">Item5</li>
</ul>

<script>
  function showItem(e) {
    // クリックされたターゲット要素がLIであれば、その要素のidを出力
    if (e.target.nodeName === 'LI') {
      console.log(e.target.id);
    };
  }

  // 親要素に対してハンドラを登録
  let parent = document.getElementById('parent');
  parent.addEventListener('click', e => showItem(e));
</script>
```

では、各アイテムを1回ずつクリックしてみます。

** event-delegation_2 **

すると、```e.target.id```によって、要素のid属性に登録されている値が出力されます。

子要素で発生したクリックイベントが親要素まで伝搬されます。これはバブリングの現象です。
そのため、親要素でもクリックイベントをキャッチし、ハンドラを実行できるというわけです。

このようにイベントを親に移譲することで、子要素の方で一つずつハンドラを登録しなくても一括してイベントの管理ができます。

## イベント移譲の例
イベント移譲は、イベント処理をより効率化するために便利な機能です。
もう一つイベント移譲の利用例を見てみましょう。

例えば、このような3×3のマス目に1〜9の数字が振られているとします。
```html
<style>
  body {
    width: 740px;
  }

  table {
    border: 2px solid green;
    padding: 10px;
  }

  td {
    border: 1px solid gray;
    padding: 30px;
    font-weight: bold;
  }

  .panel-color {
    background-color: yellow;
  }
</style>

<table>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
    <tr>
    <td>4</td>
    <td>5</td>
    <td>6</td>
  </tr>
    <tr>
    <td>7</td>
    <td>8</td>
    <td>9</td>
  </tr>
</table>
```

** event-delegation_3 **

では、どこかのマス目がクリックされた時、クリックされた箇所が分かるように背景色を黄色に変えてみましょう。

考えるポイントは以下です。
* ```<td>```ではなく、```<table>```にハンドラを設定する
* ```event.target```でクリックされたターゲット要素を取得する
* クリックされたのが```<td>```であればにCSSクラスを付与する
* 既にクリックされた要素からはCSSクラスを外す

コードはこのようになります。
```javascript
let id;
let table = document.getElementById('parent');

table.addEventListener('click', (e) => {
  let target = e.target; // クリックされた場所を取得（ターゲット要素）

  if (target.tagName != 'TD') return; // ターゲット要素がTDでなければ何もしない
  
  switchClass(target); // クラスを切り替える
});

function switchClass(target) {
  if (id) { // もしidを持っていたら.bg-colorを外す
    id.classList.remove('bg-color');
  } 
  
  id = target; 
  id.classList.add('bg-color'); // ターゲット要素に.bg-colorを追加する
}
```
では、1のマス目をクリックしてみます。

** event-delegation_4 **

すると1のマス目の背景色が黄色に変わります。
次に、5のマス目をクリックするとどうでしょうか。

** event-delegation_5 **

今度は、1のマス目の背景色が消え、5のマス目の背景色が黄色になりました。

子要素の```<td>```で発生したイベントを親要素の```<table>```でキャッチすることで、すべての子要素の動きを察知し、CSSクラスを追加したり外したりすることができます。
このようなコードは、後から```<td>```が増えたとしても、追加でハンドラを登録必要がありません。


## まとめ
今回は、イベントの移譲について解説しました。

```plain
// ポイント
* イベント移譲は、共通の親要素に対してハンドラを一括して登録する仕組み
1. 共通する親要素にハンドラを登録する
2. e.targetでイベントが発生した要素を調べる
3. 目的の要素でイベントが発生していたらハンドラを実行する
```

イベント移譲は、イベント処理を最適化するために役に立つため、利用できる場面があれば積極的に使ってみると良いでしょう。

## 合わせて読みたいイベントシリーズ
第1回：イベントハンドラ
第2回：イベントリスナー
第3回：イベントオブジェクト
第4回：バブリングとキャプチャリング
第5回：Event.targetとEvent.currentTarget
第6回：イベント移譲（当記事）

