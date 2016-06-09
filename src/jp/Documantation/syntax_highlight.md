/*
---
name: Syntax Highlight
category:
  - Documentation
  - Documentation/Syntax Highlight
---

aigisはシンタックスのハイライトに[Prism](http://prismjs.com/)を利用しています。シンタックスのカラーリングには[http://prismjs.com/download.html](http://prismjs.com/download.html)にあるテーマをダウンロードして利用できます。

## 使い方

ハイライトしたいコードブロックに次のようにキーワードを指定してください。

````html
```html  
<div class="awesome-class" data-awesome-attribute>
  <p>The quick brown fox jumps over the lazy dog</p>
</div>  
```
````

ハイライトできる言語は次のリストに入っているものです。

* [Prism#language-list](http://prismjs.com/#languages-list)

## Example

### JSX

#### Keyword: `jsx`

Write codeblock with `jsx` keyword then you get highlighted codeblock:

```jsx
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
```

### EJS

#### Keyword: `ejs`

```ejs  
<div class="awesome-class" data-awesome-attribute>
  <p><%- text -></p>
</div>
```  

### Jade

#### Keyword: `jade`

```jade
.awesome-class(data-awesome-attribute)
  p The quick brown fox jumps over the lazy dog
```

### Stylus

#### Keyword: `stylus`

```stylus
border-radius()
  -webkit-border-radius: arguments
  -moz-border-radius: arguments
  border-radius: arguments

body
  font: 12px Helvetica, Arial, sans-serif

a.button
  border-radius: 5px
```

*/
