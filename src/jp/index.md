## => [Documents in English](../en/)

## node-aigisのインストール

aigisのインストールはNPMで行います。ターミナルから次のコマンドで`node-aigis`をインストールします。

```shell
$ npm install --save-dev node-aigis
```

そしてaigisが正しくインストールされているか、次のコマンドを実行して確認します。`x.x.x`のようなバージョン番号が表示されれば正しくインストールされています。


```shell
$ ./node_modules/.bin/aigis -v
$ 1.0.0
```

## コンフィグファイルとHTMLテンプレートの作成

スタイルガイドの生成にはコンフィグファイルと、HTMLテンプレートが必要です。  
aigisでは`init`コマンドを実行することで、コンフィグファイルとテンプレートのひな形を利用することができます。

```shell
$ ./node_modules/.bin/aigis init
Created the following files and directories:
  aigis_config.yml
  aigis_assets
  template_ejs
```


> #### テンプレートエンジンの選択
aigisでは３つのテンプレートエンジンが利用できます。`aigis init`を実行する際に`--engine`オプションで利用するテンプレートエンジンを指定できます。
#### 利用できるテンプレートエンジンと値
* EJS（`ejs`）
* Jade（`jade`）
* Handlebars（`hbs`）
>
#### 例）テンプレートエンジンにJadeを利用する場合 
```shell
$ ./node_modules/.bin/aigis init --engine jade
```

### コンフィグファイルの編集

`init`で生成された`aigis_config.yml`を編集して、`source`の項目にスタイルガイドの元となるファイルを指定します。

例えば`style.css`を元にスタイルガイドを生成したい場合`source: ./style.css`のように指定します。

> #### sourceの指定方法 
`source`はファイルとフォルダのどちらでも指定できます。次のように配列の形で指定することもできます。
```yaml
source:
  - ./lib/css
  - ./style.css
```


>`init`で生成された`aigis_config.yml`では、`source`としてテーマで使われているCSSが指定されています。そのままaigisを実行することで、テーマのスタイルガイドを生成することができます。

## CSSにコメントを追加する

`source`に指定したCSSファイルに、スタイルガイド用のコメントを追加します。

CSSのコメントブロック（<code>&#047;&#042; ~ &#042;&#047;</code>）に次のようなスタイルガイド生成用のコメントを追加します。

````yaml
---
name: base button
category: module/button
---

## This is base button

* Base button style.
* Use `a` or `button` tag.

```html
<a class="btn">Button</a>
```
````

これはとてもシンプルなドキュメントコメントです。ドキュメントコメントの詳細については[次のドキュメント]()を参照してください。


## aigisの実行

次のコマンドでaigisを実行してスタイルガイドを生成します。

```shell
$ ./node_modules/.bin/aigis run -c ./aigis_config.yml
```

ドキュメントコメントから次のようなスタイルガイドが生成されます。

<a href="/aigis-docs/doc/doc_assets/sample/styleguide/category/module/button/index.html" target="_blank">サンプル</a>

> `-c`オプション無しで`run`コマンドが実行されたとき、aigisは実行されたディレクトリから`aigis_config.yml`を探して実行します。

`init`で生成された`./aigis_assets/css/theme.css`にスタイルガイド用のコメントが記述してあります。また、`node-aigis`のパッケージにはexamplesがありますので、合わせて参考にしてみてください。

ほか、aigisの詳しい機能についてはドキュメントを参照してください。
