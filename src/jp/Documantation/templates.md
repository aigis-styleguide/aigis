/*
---
name: Templates
category:
  - Documentation
  - Documentation/Templates
---

スタイルガイドの生成にはテンプレートが必要になります。aigisではテンプレートとして次の3種類のテンプレートエンジンから選択して利用することができます。

### 利用できるテンプレートエンジンと拡張子

* EJS: `.ejs`
* Jade: `.jade`
* Handlebars: `.hbs`

選択するテンプレートエンジンごとに決められた拡張子で`index.xxx`というファイルを作成してください。


> GitHubのリポジトリにはテーマを含めたexamplesがありますので、参考にしてみてください。このドキュメント自体もaigisで生成されたものなので、合わせて参考にしてみてください。
* [aigis/examples](https://github.com/pxgrid/aigis/tree/master/examples)
* [aigis/gh-pages/src](https://github.com/pxgrid/aigis/tree/gh-pages/src/template)

## インデックステンプレート

スタイルガイドの生成にはテンプレートファイルとして`index.xxx`が必要になります。
> #### インデックステンプレートのファイル名
`template_engine`に`ejs`をしている場合には`index.ejs`が、`jade`を指定している場合には`index.jade`が、`hbs`を指定している場合には`index.hbs`が必要になります。
テンプレートエンジンの指定については[Documentation/Configs]()を参照。

### テンプレートのサンプル

EJSのテンプレートの例です。テンプレートで参照している値は、スタイルガイド生成用にaigisがコンパイルした時に渡す値です。

```ejs  
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link href="<%= root %>aigis_assets/css/doc.css" rel="stylesheet">
  </head>
  <body>
    <header>
      <%- config.name %>
    </header>
    <nav>
      <%- helper.renderCollectionTree('category') %>
    </nav>
    <main>
      <%- html %>
      <% if(components.length) { %>
        <% components.forEach((component) => { %>
          <%- component.config.name %>
          <%- component.html %>
        <% }) %>
      <% } %>
    </main>
    <footer>Last updated: <%- timestamp %></footer>
  </body>
</html>
```  

# テンプレートで使える値

aigisはコンパイル時につぎの値を元にテンプレートに渡しスタイルガイドを生成します。

Name|Type
---|---
components|Array
html|String
root|String
config|Object
timestamp|String
helper|Object

テンプレートでこの値を使ってスタイルガイドを構築します。

## components

コンポーネントのHTMLなどが入ったオブジェクトの配列。

たとえば`./css/style.css`に次のようなコンポーネントを記述した場合:

```yaml
---
name: component name
category:
  - mod
  - btn
---

## component

this is component!
```

`components[0]`には次のようなコンポーネントが格納される:

```js  
{
  md: '## component\n\nthis is component!', // コンポーネントのドキュメント部分
  html: '<h2>component</h2><p>this is component</p>', // ドキュメント部分をパースしたHTML
  config: { // コンポーネントのコンフィグ部分
    name: 'component name',
    category: ['mod', 'btn'] 
  },
  sourcePath: '/css/style.css' // ドキュメントが記述されているファイルへのパス
}
```  

## html

インデックスページ用のMarkdownファイルをパースしたHTMLが格納されている。

`index.ejs`では次のようにすることで、インデックスページとコンポーネントページを同一のテンプレートでレンダリングすることができます。

```html
<main>
  <%- html %>
  <% if(components.length) { %>
  ...
  <% } %>
</main>
```


## root

出力されるページから見た、コンフィグファイルの`dest`で指定されたフォルダへの相対パスが格納されています。`<head>`要素などにCSSファイルへの参照を相対パスで書く際に利用できます。ファイルの参照を絶対パスで行う場合には使う必要はないでしょう。

> #### Example
```ejs  
<link href="<%= root %>aigis_assets/css/doc.css" rel="stylesheet">
```  


## config

コンフィグファイル(`aigis_config.yml`)の内容が格納されたオブジェクトです。例えばコンフィグファイルの`name`という項目をテンプレートで使いたい場合、次のように`config.name`とすることで参照できます。

> #### Example
config:
```yaml
name: styleguide!
```
template:
```ejs  
<header>
  <%- config.name %>
</header>
```  
output:
```html  
<header>
  styleguide!
</header>
```  

## timestamp

`aigis run`が実行された時間が格納されています。形式はコンフィグファイルの`timestamp_format`で指定できます。

`timestamp_format`に指定する形式は[Moment.jsのformat](http://momentjs.com/docs/#week-year-week-and-weekday-tokens)を参照してください。

> #### Example
config:
```yaml
timestamp_format: YYYY/MM/DD HH:mm
```
template:
```ejs  
<footer>
  <%- timestamp %>
</footer>
```  
output:
```html
<footer>
  2016/04/07 17:11
</footer>
```


## helper

複雑な処理が必要な場面で役に立つテンプレートヘルパーの集まりです。

### helper.createCollectionTree(collection_name)

aigisはコンフィグファイルの`output_collection`にある値でコンポーネントをグルーピングして出力します。デフォルトでは`category`と`tag`が設定してあります。コレクションは次のように`/`を使うことで階層表現をすることができます。

```yaml
---
name: component
category:
  - parent/child
---
```

このコンポーネントの場合、parentカテゴリの下のchildカテゴリに所属しています。スタイルガイドの出力はこの階層情報を持ちながら出力されます。こういった階層をサイドメニューなどとして表現するのはとても面倒ですので、用意されていたヘルパーを使って簡単に行えるようにしてあります。

(このドキュメントのサイドメニューもこのヘルパーを使って出力されたものです。)

> #### Example
```ejs  
<nav>
  <%- helper.renderCollectionTree('category') %>
</nav>
```  

*/
