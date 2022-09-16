# 【JavaScriptの基本】マウスイベント -カーソル移動

前回は、マウスのボタン操作によるイベントを見てきましたが、ここではマウスのカーソルが要素間を移動する時のイベントを見ていきます。

## カーソル移動イベントの種類
マウスイベントには、大きくボタン操作とカーソル移動に分けられます。
その中で以下はカーソル移動によるマウスイベントです。

* ```mousemove```：カーソルが要素内で動いた時
* ```mouseover/mouseout```：カーソルが要素に乗った時と離れた時
* ```mouseenter/mouseleave```：カーソルが要素に入った時と出た時

各イベントにおけるバブリングの発生やデフォルト動作のキャンセルは、次の通りに設定されています。

|イベント|バブリング|キャンセル|
|:--:|:--:|:--:|
|```mousemove```|あり|可|
|```mouseover/mouseout```|あり|可|
|```mouseenter/mouseleave```|なし|不可|

一つずつ見ていきましょう。

## mousemove
```mousemove```イベントは、マウスのカーソルが要素上で動いた時に発生するイベントです。動き続けている間は連続でイベントが発生します。

以下は、```<div>```と```<p>```の上でカーソルを動かした時に、```mousemove```イベントが発生した場所を出力するコードです。
```html
<style>
  body {
    width: 540px;
  }

  #outer,#inner {
    border: 2px solid blue;
    padding: 10px;
  }
</style>

<div id="outer">div
  <p id="inner">p</p>
</div>

<script>
  let outer = document.getElementById('outer');
  outer.onmousemove = e => {
    console.log('mousemove target :' + e.target.tagName);
  };
</script>
 ```

では、```<div>```と```<p>```の上にカーソルを当てて、適当に動かしてみます。

** cursorevents_1 **

```mousemove```イベントは、カーソルの移動時に発動します。そのため、一瞬カーソルを動かすだけでも、複数回イベントが発生することが分かります。

## mouseoverとmouseout
```mouseover```イベントはカーソルが要素に乗った時に発生し、```mouseout```イベントはカーソルが要素から離れた時に発生するイベントです。

これらのイベントに対して```event.target```を使用すると、マウスが乗った要素と離れた要素を調べることができます。
```html
<style>
  body {
    width: 540px;
  }

  #outer,#inner {
    border: 2px solid blue;
    padding: 10px;
  }
</style>

<div id="outer">div
  <p id="inner">p</p>
</div>

<script>
  let outer = document.getElementById('outer');
  outer.onmouseover = e => {
    console.log('mouseover target :' + e.target.tagName);
  };

  outer.onmouseout = e => {
    console.log('mouseout target :' + e.target.tagName);
  };
</script>
 ```

例えば、枠の外 → ```div``` → ```p``` → ```div```の順番でカーソルを動かしてみるとこのように反応します。

** cursorevents_2 **

しかし、上記で解説した```mousemove```や```mouseover/mouseout```イベントは、すべての移動で発生するとは限りません。
ユーザーが高速にカーソルを動かした場合、カーソルが通過したはずの要素でも、それに気付かずにスキップされる可能性があります。

例えば、次のような```<div>```にネストされた複数の```<p>```のような場合です。
```html
<style>
  body {
    width: 540px;
  }

  #div,p {
    border: 2px solid blue;
    padding: 10px;
  }
</style>

<div id="div">div
  <p id="p1">p1</p>
  <p id="p2">p2</p>
  <p id="p3">p3</p>
  <p id="p4">p4</p>
</div>

<script>
  let div = document.getElementById('div');
  div.onmouseover = e => {
    console.log('mouseover target :' + e.target.id);
  };

  div.onmouseout = e => {
    console.log('mouseout target :' + e.target.id);
  };
</script>
 ```
```div```から```p4```まですべての要素の上を高速で移動してみます。

** cursorevents_3 **

すると、最初と最後の要素だけが認識され、間の```<p>```3つはイベントが発生しませんでした。

動かし方やスピード次第では、イベントは全く起きない可能性もあれば、一部のイベントのみ起きる可能性もあります。

## mouseenterとmouseleave
```mouseenter```イベントはカーソルが要素に入った時に発生し、```mouseleave```イベントはカーソルが要素から出た時に発生します。

```mouseover/mouseout```は、すべての要素の出入りを検知しますが、それが余計になることがあります。
そのような場合、```mouseenter/mouseleave```イベントが使用できます。

ここでも検証してみましょう。
```html
<style>
  body {
    width: 540px;
  }

  #outer,#inner {
    border: 2px solid blue;
    padding: 10px;
  }
</style>

<div id="outer">div
  <p id="inner">p</p>
</div>

<script>
  let outer = document.getElementById('outer');
  outer.onmouseenter = e => {
    console.log('mouseenter target :' + e.target.tagName);
  };

  outer.onmouseleave = e => {
    console.log('mouseleave target :' + e.target.tagName);
  };
</script>
 ```

では、枠の外 → ```div``` → ```p``` → ```div``` → 枠の外と、上から下にカーソルを移動させてみます。

** cursorevents_5 **

すると、```mouseenter target :DIV```と```mouseleave target :DIV```のみが出力されます。

なぜなら、```mouseenter```イベントは、要素に入った瞬間のみイベントをトリガするためです。```mouseleave```イベントも同じように、要素から出た瞬間だけです。
つまり、要素間の移動は関係ありません。

これには```mouseenter/mouseleave```イベントがバブリングしないことに関係があります。

```mouseover/mouseout```イベントを割り当てた要素に子要素がある場合、バブリングが起こるためその子要素の出入りまでイベントがトリガされますが、```mouseenter/mouseleave```の場合、バブリングがないため子要素は無視されます。

そのため、```mouseenter/mouseleave```イベントは単独の要素に対してトリガすると言う点で非常にシンプルで明確です。

## まとめ
今回は、マウスイベントのカーソル移動について解説しました。

```plain
// ポイント
* マウスイベントのカーソル移動には、mousemove, mouseover/mouseout, mouseenter/mouseleaveなどがある
* mousemove, mouseover/mouseoutは、間の要素がスキップされることがある
* mouseover/mouseoutはバブリングが起こるため、すべての要素の出入りを検知する
* mouseenter/mouseleaveはバブリングが起こらないため、子要素は無視される
 ```

## 合わせて読みたいイベント詳細シリーズ
第1回：マウスイベント -ボタン操作
第2回：マウスイベント -カーソル移動（当記事）



