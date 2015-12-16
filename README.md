# aigis

Here's an example aigis comment.

<pre>
/*
---
name: module_name
category:
    - button/standard
    - base
---

## This is a standard button module

* You can write markdown.

```html
&lt;a class="btn"&gt;
  This is a Button
&lt;/a&gt;
```

.btn {
  color: white;
  background-color: tomato;
  text-align: center;
  width: 200px;
  line-height: 40px;
  display: inline-block;
}

*/
</pre>

## Installation

```sh
npm install -g node-aigis
```

## Config file

```yaml
name: StyleGuide Name
source:
    - ./path/to/source/foder
    - /path/to/source/file.css
dest: ./path/to/destination
dependencies:
    - ./build
timestamp_format: YYYY/MM/DD HH:mm
template: ./path/to/template
md_class:
    blockquote: [className]
    heading: [className]
    hr: [className]
    list: [className]
    paragraph: [className]
    table: [className]
    tablrow: [className]
    tablecell: [className]
    link: [className]
    image: [className]
highlight: true
highlight_theme: dracula
inject:
    - html
    - jade
    - js
    - coffee
```

## Generate style guide.

```sh
aigis ./path/to/aigis_config.yml
```

## Others

* [gulp plugin](https://github.com/pxgrid/gulp-aigis)
* [Styleguide Template](https://github.com/pxgrid/aigis-theme)
