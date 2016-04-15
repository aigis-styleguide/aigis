/*
---
name: Templates
category:
  - Documentation
  - Documentation/Templates
---

>  you are free to make your style guide look however you would like. If you don't feel like going through this process yourself, you can take a look at the templates in our [examples](https://github.com/pxgrid/aigis/tree/master/examples) and [this document's assets](https://github.com/pxgrid/aigis-docs/tree/gh-pages/src/template), and use the assets defined there instead.

Aigis require HTML templates. You can choose template engine from following list.

* EJS: `.ejs`
* Jade: `.jade`
* Handlebars: `.hbs`

You have to create `index.xxx`. (xxx is `ejs` or `jade` or `hbs`)

## Index Template

Aigis needs `index.xxx` (e.g. index.jade) for generating a style guide.

> #### Naming for template file of index page
- If you specified `template_engine: ejs`, aigis will need `index.ejs`.
- If you specified `template_engine: jade`, aigis will need `index.jade`.
- If you specified `template_engine: hbs`, aigis will need `index.hbs`.

Please refer [Documentation/Configs](../Documentation/Configs/) about more details for `template_engine` option.

### Sample Template

This is EJS sample template. Aigis pass referenced values to template when generate style guide.

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

# Pass values

When style guide was generated, aigis will pass the following values.

Name|Type
---|---
components|Array
html|String
root|String
config|Object
timestamp|String
helper|Object

## components

`component` value is Array which contains Object. The Object has HTML of the component.

For example, you wrote the following compponent in your CSS.

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

`components[0]` contains the following Object.

```js  
{
  md: '## component\n\nthis is component!', // Document for this component
  html: '<h2>component</h2><p>this is component</p>', // Parsed html of document
  config: { // Configurnation for this component
    name: 'component name',
    category: ['mod', 'btn'] 
  },
  sourcePath: '/css/style.css' // File path for this document
}
```  

## html

`html` value contains HTML result of the parsed Markdown.

In `index.ejs`, you can write a template for rendering a page of index and component on the same page as follows.

```
<main>
  <%- html %>
  <% if(components.length) { %>
  ...
  <% } %>
</main>
```

## root

`root` value cantian a relative path is the `dest` directory in your configurnation file from generated page
This value is used to write a relative path which is interpreted a css file in `<head>`.
If you want to use absolute path, you don't need to use this value.

> #### Example
```ejs  
<link href="<%= root %>aigis_assets/css/doc.css" rel="stylesheet">
```  


## config

`config` value contains a Object which has a detail of a configurnation file (`aigis_config.yml`)
For example, you can refer `config.name` in your template file if you want to use `name` in your configurnation file.

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

`timestamp` value contains a time from the execution end time of `aigis run`.
The format of this value can be specified `timestamp_format` in configurnation file.
Please refer [Moment.js format](http://momentjs.com/docs/#week-year-week-and-weekday-tokens) for the format of `timestamp_format`

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

`helper` value has a lot of template helper for complicated process in your template.

### helper.createCollectionTree(collection_name)

Aigis outputs groupd components by `output_collection` value in configurnation file.
By default, Specify `category` and `tag`.
コレクションは次のように`/`を使うことで階層表現をすることができます。

```yaml
---
name: component
category:
  - parent/child
---
```

In the avove case, This component belongs `child` category in parent category.
スタイルガイドの出力はこの階層情報を持ちながら出力されます。
こういった階層をサイドメニューなどとして表現するのはとても面倒ですので、用意されていたヘルパーを使って簡単に行えるようにしてあります。

(The sidebar for this document was outputted by this helper.)

> #### Example
```ejs  
<nav>
  <%- helper.renderCollectionTree('category') %>
</nav>
```  

*/
