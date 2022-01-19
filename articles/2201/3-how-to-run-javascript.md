# 【JavaScriptの入門】JavaScriptってどこに書くの？プログラムを実行するための準備

これからJavaScriptの学習を始めようと思っている人や始めたばかりの人は、そもそもどこにJavaScriptを記述したら良いのか疑問を持つかもしれません。
コーディングを始める前段階として、JavaScriptで書かれたプログラムを実行するための準備が必要です。
今回は、JavaScriptの記述場所について解説します。あわせて実行結果の確認も行ってみましょう。

## HTMLファイルに記述
もっとも基本的な方法として、HTMLファイルに直接JavaScriptのコード記述することができます。

### script要素
HTMLでは、さまざまなタグを使ってページの構成やコンテンツを作成していきますが、JavaScriptを記述するためのタグも用意されています。
HTMLファイルの中でJavaScriptを記述するには、scriptタグを使用します。
```html
<script>
	// ここにコードを記述する
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
	// head内に記述するパターン
</script>
</head>
	<body>
		<h1>JavaScriptの記述場所</h1>
		<script>
			// body内に記述するパターン
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
		console.log('HTMLファイルに記述')
	</script>
</body>
```

では、htmlファイルに上記のコードを記述し、結果を確認してみましょう。
以下のような結果がブラウザで表示されるです。

img

### scriptタグはbodyの終了タグの直前に書く理由
厳密には、scriptタグを「headタグ内」または「bodyの終了タグの直前」のどちらに用意するかに決まりはありません。
では、なぜbodyの終了タグの直前にscriptタグを用意するのが主流と言われているのでしょうか。

まず、「HTMLの要素をすべて読み込んでからJavaScriptを実行するため」です。

通常、Webブラウザは、HTMLを上から下の順番で読み込んでいきます。
このHTMLを解析する処理のことを「HTMLパース」と呼びます。
途中でscriptタグや外部ファイルが見つかると、HTMLパースが一旦中断し、scriptタグや外部ファイル内に書かれた処理の実行を優先します。

img

この理由から、headタグ内にscriptタグを用意することにより、JavaScriptの処理が終わってからでないと、HTML要素の読み込みが行われないというわけです。
結果として、ユーザーがWebページにアクセスしても、すぐに画面に内容が表示されないという問題が考えられます。

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
	<div id="content">scriptタグ以降の要素</div>
</body>
```
scriptタグ内に書かれたJavaScriptのコードは、そのタグよりも前にあるHTML要素にアクセスはできますが、そのタグよりも後にあるHTML要素にはアクセスできなくなります。
これにはDOMの概念の理解が必要になりますが、ここでは頭の片隅に入れておく程度で問題ありません。

一方、先にJavaScriptを実行してからbodyタグ内の内容を読み込ませたいという場合には、headタグ内にscriptタグを用意します。

JavaScriptの処理内容によって、scriptの用意する場所を使い分ける必要があるということになりますが、はじめの段階では、bodyの終了タグの直前に用意するのを意識しておくと良いでしょう。

## JavaScriptファイルを作成
HTMLファイルに直接JavaScriptを記述する以外に、JavaScript専用のファイルを用意する方法があります。

かんたんなプログラムであれば、HTMLファイルに直接JavaScriptのコード記述する方法でも問題ありませんが、コードの記述量が増えれば増えるほど、HTMLファイル自体の可読性が下がってしまったり、コードのメンテナンスにも手間がかかってしまいます。
そのため、「.js」の拡張子でJavaScriptのファイルを用意するのが一般的です。

例として、以下のHTMLファイルに直接JavaSCriptを記述していたものを、JavaScriptファイルに書き換えた場合を見てみましょう。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>JavaScriptの記述場所</title>
</head>
	<body>
		<h1>JavaScriptの記述場所</h1>
		<script>
			console.log('HTMLファイルに記述');
		</script>
	</body>
</html>
```

上記をJavaScriptファイルに書き換えると、このように書くことができます。
ここでは、「main.js」という名前のJavaScriptファイルを作成しています。
```javascript
// main.js
console.log('JavaScriptファイルを用意');
```
別ファイルを用意する場合には、scriptタグを記述する必要がありません。
至ってシンプルです。

つぎに、HTMLファイルからJavaScriptファイルを読み込みます。
```html
<script src="JavaScriptファイルのパス"></script>
```
ファイルのパスとは、JavaScriptファイルが存在する場所を指定することです。
HTMLファイルとJavaScriptファイルが同じディレクトリ（同じ階層）にある場合は、このように書くことができます。

```html
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>JavaScriptの記述場所</title>
</head>
	<body>
		<h1>JavaScriptの記述場所</h1>
		<!-- bodyの終了タグの直前にJavaScriptファイルを読み込む -->
		<script src="./main.js"></script> 
	</body>
</html>
```

これで完成です。
では、JavaScriptのコードが反映されているか結果を確認してみましょう。
以下のような結果が表示されていれば、読み込み成功です。

img

## まとめ
今回は、JavaScriptで書かれたプログラムを実行するための準備について解説しました。

HTMLファイルにscriptタグを用いて直接JavaScriptを記述する方法、またはJavaScriptファイルを作成する方法があります。

ぜひ、これらの方法を用いて、console.log('')などのかんたんなプログラムを作成し、実行してみてください。