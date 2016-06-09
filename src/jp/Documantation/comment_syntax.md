/*
---
name: Comment Syntax
category:
  - Documentation
  - Documentation/Comment Syntax
---

aigisではコメントブロック(<code>&#047;&#042; ~ &#042;&#047;</code>)にコンポーネントの__コンフィグ__と、コンポーネントの__ドキュメント__を合わせて記述します。次のコードの`---`で囲まれているブロックがコンフィグ(YAML)、それ以下がドキュメント(Markdown)になります。

````yaml
---
name: component name
tag:
  - base
  - latest
category:
  - component
  - component/button
---

## This is a component document

* Base button component.
* Use `a` or `button` tag.

Here's an example code.

```html
<a class="btn">Button</a>
```
````

このコンフィグとドキュメントをセットに、コンポーネントのスタイルガイドを生成します。


## コンフィグブロック

`---`で囲まれた部分がコンポーネントのコンフィグです。コンフィグはYAML形式で記述します。

> より正確に言うとコメントブロックの開始行(<code>&#047;&#042;</code>)の次の行に`---`がある必要があります。


```yaml
---
name: component name
tag:
  - base
  - latest
category:
  - component
  - component/button
---
```

コンフィグファイル(`aigis_config.yml`)の`output_collection:`に、コンポーネントのコンフィグの項目名(`category`や`tag`)を指定することで、その項目ごとにコンポーネントをグルーピングしてスタイルガイドを生成することができます。

> デフォルトでは`category`と`tag`をグルーピングして出力します。


## ドキュメントブロック

コンポーネントのドキュメントではMarkdown([GitHub flavored markdown](https://help.github.com/categories/writing-on-github/))を使うことができます。

コードブロック(<code>&#8242;&#8242;&#8242;</code>)では特定のキーワードを指定することでシンタックスハイライトが有効になります。詳しくは[Documentation/Syntax Highlight](../Syntax-Highlight/)を参照してください。

>aigisでは[chjj/marked](https://github.com/chjj/marked)を使ってMarkdownをコンパイルします。また、Highlightなどの処理を行うために、[aigis-marked](https://github.com/pxgrid/aigis-marked/)というカスタムレンダラを使用しています。

## コンフィグの値を使ってプレビューを生成する

aigisはコードブロック(<code>&#8242;&#8242;&#8242;</code>)に特定のキーワードをつけることでプレビューを生成し挿入します。EJSやJadeのようなテンプレートエンジンからプレビューを生成したい場合、コンフィグに`compile: true`を指定することでコンフィグに書かれた値をもとにプレビューを生成できます。

> プレビュー挿入の有効/無効の切り替えはコンフィグファイルの`transform:`で指定できます。`ejs`のときだけプレビューを有効にする場合には、次のように`transform:`に`ejs`だけを指定します。
```yaml
transform:
  - ejs
```

EJSのコードブロックからHTMLのプレビューを生成するには、次のようなコンフィグを記述します。`compile:`の項目はコンポーネントごとに切り替えることができます。(Defaultでは`false`)

````yaml
---
name: component name
tag:
  - base
  - latest
category:
  - component
  - component/button
data:
  value1: hoge
  value2: fuga
compile: true
---

```ejs  
<div>
  <h2><%- name %></h2>
  <p><%- data.value1 %></p>
  <p><%- data.value2 %></p>
</div>
```  
````

上記のコンフィグとコードブロックから次のようなHTMLがコードブロックの手前に挿入されます。Jade、Handlebarsも同様にコンパイルしたプレビューを生成することができます。

````html  
<div>
  <h2>component name</h2>
  <p>hoge</p>
  <p>fuga</p>
</div>
````  

*/
