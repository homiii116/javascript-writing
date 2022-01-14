# 【JavaScriptの入門】JavaScriptってどうやって使うの？プログラムを実行するための準備について解説

これからJavaScriptの学習を始めようと思っている人や始めたばかりの人は、そもそもどこにJavaScriptを記述したら良いのか疑問を持つかもしれません。
コーディングを始める前段階として、JavaScriptで書かれたプログラムを実行するための準備という作業が必要です。
今回は、プログラムを実行するための準備について解説します。あわせて実行結果の確認も行ってみましょう。

## HTMLファイルに記述
もっとも基本的な方法として、HTMLファイルに直接JavaScriptのコード記述することができます。

### script要素
HTMLでは、さまざまなタグを使ってページの構成やコンテンツを作成していきますが、JavaScriptを記述するためのタグが用意されています。
HTMLファイルの中でJavaScriptを記述するには、scriptタグを使用します。
```html
<script>
	//ここにコードを記述する
</script>
```

かんたんなコードの例として、コンソール出力を行った場合、このように記述することができます。
```html
<script>
	console.log('コンソール出力しました');
</script>
```

ここで、HTMLファイルのどこにscriptタグを用意したら良いのかという疑問が生まれますね。
では、もう少しHTMLファイルの全体を見てみましょう。

### script要素を用意する場所
HTMLファイルにscript要素を用意してJavaScriptを記述する場合は、headタグかbodyタグの中に用意します。
```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>JavaScriptの記述場所</title>
<script>
	//head内に記述するパターン
</script>
</head>
	<body>
		<h1>JavaScriptの記述場所</h1>
		<script>
			//body内に記述するパターン
		</script>
	</body>
</html>
```

さらに、近年ではbodyの終了タグの直前にscriptタグを用意することが主流となっています。
```html
<body>
	<h1>JavaScriptの記述場所</h1>
	<h2>scriptタグを用意する</h2>
	<p>bodyの終了タグの直前に配置するのが一般的</p>
	<script>
		console.log('scriptタグを配置しました')
	</script>
</body>
```

しかし厳密には、scriptタグを「headタグ内」または「bodyの終了タグの直前」のどちらに用意するかに決まりはありません。

では、なぜbodyの終了タグの直前にscriptタグを用意するのが主流と言われているのでしょうか。

### scriptタグはbodyの終了タグの直前に書く
まず、「HTMLの要素をすべて読み込んでからJavaScriptを実行するため」です。
通常、Webブラウザは、HTMLを上から下の順番で読み込んでいきます。
途中でscriptタグや外部ファイルが見つかると、他のHTML要素の読み込みを一旦中断し、scriptタグや外部ファイル内に書かれた処理の実行を優先します。
```flowchart
```

この理由から、headタグ内にscriptタグを用意すると、JavaScriptの処理が終わってからでないと、HTML要素の読み込みが行われないというわけです。
そのため、ユーザーがWebページにアクセスしても、すぐに画面に内容が表示されないという問題が考えられます。

もう一つは、「scriptタグ以降にあるHTML要素にアクセスできなくなるため」です。
```html
<body>
	<h1>JavaScriptの記述場所</h1>
	<h2>scriptタグを用意する</h2>
	<script>
		const el = document.getElementById('content'); 	// アクセスできずにエラーになる
		el.innerHTML = 'scriptタグ以降の要素です';
	</script>
	<!-- scriptタグの後ろに用意 -->
	<div id="content">scriptタグ以降の要素</h2>
</body>
```
scriptタグ内に書かれたJavaScriptのコードは、そのタグよりも前にあるHTML要素にアクセスはできますが、そのタグよりも後にあるHTML要素にはアクセスできなくなります。
これにはDOMの概念の理解が必要になりますが、ここでは頭の片隅に入れておく程度で問題ありません。

一方、先にJavaScriptを実行してからbodyタグ内の内容を読み込ませたいという場合には、headタグ内にscriptタグを用意します。

JavaScriptの処理内容によって、scriptの用意する場所を使い分ける必要があるということになりますが、はじめの段階では、bodyの終了タグの直前に用意するのを意識すると良いでしょう。

## JavaScriptファイルを作成

## ブラウザのコンソールで利用

## まとめ