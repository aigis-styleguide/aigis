/*
---
name: Configs
category:
  - Documentation
  - Documentation/Configs
---

aigisは動作の多くをコンフィグファイル（`aigis_config.yml`）で制御します。全てのパスはコンフィグファイル（`aigis_config.yml`）が置かれている場所から相対的に解決されます。


## source: (`required`)
Type|Default
---|---
String or Array|undefined

スタイルガイドを生成するソースとなるファイル（またはディレクトリ）への相対的なパスを指定します。単一の指定と配列による複数指定のどちらも行えます。

> #### Example
ソースとして特定のファイルとディレクトリを指定したい場合には次のように指定します。
```yaml
source:
  - ./css/style.css
  - ./scss
```

## source_type: (optional)
Type|Default
---|---
String or Array|['.css', '.sass', '.scss', '.styl']

`source`にディレクトリが指定された場合、aigisは`source_type`に記述されている拡張子のファイルをソースの対象にします。デフォルトで`.css .sass .scss .styl`の4種類を対象とします。

> #### Example
ソースとするファイルのタイプを減らしたい場合、次のように対象とするタイプだけを指定します。
```yaml
source_type:
  - .css
  - .less
```
> ##### Markdownからスタイルガイドを生成する
> CSSのコメントブロック（<code>&#047;&#042; ~ &#042;&#047;</code>）と`---`で囲まれた設定の記述があれば、どんなファイルからでもスタイルガイドが生成できます。例えば、次のように`.md`を指定すればMarkdownファイルからスタイルガイドを生成できます。
```yaml
source_type: .md
```

## dest: (optional)
Type|Default
---|---
String|'./styleguide'

スタイルガイドを出力するフォルダを指定します。指定がない場合、`aigis_config.yml`のあるフォルダに`styleguide`フォルダを作成して出力されます。

> #### Example
```yaml
dest: ./path/to/destination
```

## dependencies: (optional)
Type|Default
---|---
String or Array|undefined

スタイルガイドに必要なファイルやディレクトリを指定します。指定されたファイルやディレクトリはスタイルガイドの出力先にコピーされます。

> #### Example
```yaml
dependencies:
  - ./path/to/css
  - ./path/to/images
  - ./path/to/style.css
```

## template_dir: (optional)
Type|Default
---|---
String|'./template'

スタイルガイドの生成に必要なテンプレートファイルが格納されているディレクトリを指定します。このディレクトリには`index.ejs`と`layout.ejs`の2つが含まれている必要があります。

> `template_engine`に`jade`を指定している場合には`index.jade layout.jade`を、`hbs`を指定している場合には`index.hbs layout.hbs`が必要になります。

> #### Example
```yaml
template_dir: './path/to/template_dir
```

## component_dir: (optional)
Type|Default
---|---
String|'./html'

外部ファイルからHTMLをドキュメントコメント内に挿入したいときに使える<code>!!\[](./path/to/file.html)</code>という構文で、インポートするファイルのパスを解決するときに使われます。

## template_engine: (optional)
Type|Default
---|---
String|'ejs'

スタイルガイドを生成する際に利用するテンプレートエンジンを指定します。aigisでは次の3つのテンプレートエンジンが利用できます。

* EJS（`ejs`）
* Jade（`jade`）
* Handlebars（`hbs`）

このディレクトリには、利用するテンプレートごとに決められた拡張子で`index.xxx`というファイルが格納されている必要があります。

> #### Example
Jadeを利用したい場合
```yaml
template_engine: jade
```

## log: (optional)
Type|Default
---|---
Boolean|false

`log`が`true`の場合、スタイルガイド生成の際に出力されるファイルの一覧などをコンソールに出力します。


## color_palette: (optional)
Type|Default
---|---
Boolean|true

aigisは、スタイルガイドのソースとなるファイルから全ての色を収集し、一覧できるように`color.html`という特別なページを出力します。

[サンプル: color.html](https://pxgrid.github.io/aigis/styleguide/color.html)

カラーパレットが必要ない場合、`false`を指定することでカラーパレットの出力を止めることができます。


## preview_class: (optional)
Type|Default
---|---
String|'aigis-preview'

aigisがコードブロック(````html`なので始まるブロック)からHTMLのプレビューを生成する際に、プレビューの外側の要素につくCSSのクラス名を指定できます。コンポーネントがスタイルガイドの影響を受けないようにスタイルを付けたり、JavaScriptから操作したい場合などに役に立ちます。

> #### プレビューの挿入
例えば、次のようなコードブロックを記述した場合
````
```html
<button>hoge</button>
```
````
次のようなHTMLが挿入されます。
```
<div class="aigis-preview">
  <button>hoge</button>
</div>
```


## output_collection: (optional)
Type|Default
---|---
String or Array|['category', 'tag']

出力するページのグループを指定します。`category`や`tag`以外にグルーピングして出力したい項目がある場合は`output_collection`に追加します。

例えばバージョニングを行っている場合には、コンポーネントの設定に次のように`version`を追加し、`output_collection`に`version`を追加することで`version`の値が同じコンポーネントがグルーピングされて出力されます。

````css
---
name: btn
category:
  - base
  - btn
version: 1
---
````

```
output_collection:
  - category
  - version
```

上記の指定の場合、`category`と`version`でまとめた2種類のページが出力されます。


## transform: (optional)
Type|Default
---|---
String or Array|['html', 'ejs', 'jade', 'hbs']

コードブロックに特定のタイプが指定されている場合、aigisはそのコードブロックを実際のHTMLとしてドキュメントに追加します。これによってマークアップの例を示すとともにプレビューの表示も手軽に行なえます。デフォルトでは`html` `jade` `ejs` `hbs`のプレビューが有効になっています。

もしプレビューとして表示したくないタイプがある場合には、表示したいタイプだけを`transform`に指定します。

```yaml
transform:
  - html
  - hbs
```

> #### テンプレートエンジンのコンパイル
`ejs` `jade` `hbs`のコードブロックは、コンポーネントの設定に`compile: true`を指定することで、コードブロックに設定の値を渡してコンパイルを行えます。
````
---
name: btn
category: btn
compile: true
data:
  value1: hoge
---
```ejs  
<h2><%- name %></h2>
<button><%- data.value1 %></button>
```  
````
上記の場合、次のように値が反映された状態のHTMLが挿入されます。
```html
<div class="aigis-preview">
  <h2>btn</h2>
  <button>hoge</button>
</div>  
```


## highlight: (optional)
Type|Default
---|---
Boolean|true

コードブロックのシンタックスハイライトを有効にするかを指定します。別のハイライトライブラリを使う場合ときなどは`highlight: false`とすることでaigisのハイライトをオフにできます。

## timestamp_format: (optional)
Type|Default
---|---
String|'YYYY/MM/DD HH:mm'

スタイルガイドを生成する際、aigisは`timestamp`という特別な変数をテンプレートに渡します。ドキュメントの更新日を記述したい際などに役にたつかもしれません。

`timestamp_format`に指定する形式は[Moment.jsのformat](http://momentjs.com/docs/#week-year-week-and-weekday-tokens)を参照してください。


*/
