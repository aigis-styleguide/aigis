/*
---
name: Syntax Highlight
category:
  - Documentation
  - Documentation/Syntax Highlight
---

Aigis using [Prism](http://prismjs.com/) for highlighting.
So you can download color theme from [prismjs.com/download](http://prismjs.com/download.html).

## Basic Usage

Write codeblock with `keyword` like below (use `html`):

````html
```html
<div class="awesome-class" data-awesome-attribute>
  <p>The quick brown fox jumps over the lazy dog</p>
</div>
```
````

See the following list: [Prism#language-list](http://prismjs.com/#languages-list), you can highlight from listed languages.

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

## Jade

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
