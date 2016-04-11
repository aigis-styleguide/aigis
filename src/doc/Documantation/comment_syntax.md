/*
---
name: Comment Syntax
category:
  - Documentation
  - Documentation/Comment Syntax
---

aigisではコメントブロック(<code>&#047;&#042; ~ &#042;&#047;</code>)にコンポーネントのコンフィグと、コンポーネントのドキュメントを合わせて記述します。次のコードの`---`で囲まれているブロックがコンフィグ、それ以下がドキュメントになります。

````css
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



### 値を使ってプレビューをレンダリングする

aigisはコードブロック(<code>&#8242;&#8242;&#8242;</code>)に特定のキーワードをつけることでプレビューを作成します。EJSやJadeのようなテンプレートエンジンからプレビューを生成したい場合、コンフィグに`compile: true`を指定することでコンフィグに書かれた値をもとにプレビューを生成できます。

`````yaml
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
  <%- data.value1 %>
  <%- data.value2 %>
</div>
```  
`````

*/
