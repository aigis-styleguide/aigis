/*
---
name: Syntax Highlight
category:
  - Documentation
  - Documentation/Syntax Highlight
---

Aigis using [atom/highlights](https://github.com/atom/highlights) for highlighting which is used in [Atom Editor](https://atom.io/).
So you can choose every [Atom's themes](https://atom.io/themes)!

Also, you can add syntax highlight support language. Please contact us on [pxgrid/aigis-marked#issues](https://github.com/pxgrid/aigis-marked/issues) or send PRs.

## Basic Usage

Write codeblock with `keyword` like below (use `html`):

````
```html
<div class="awesome-class" data-awesome-attribute>
  <p>The quick brown fox jumps over the lazy dog</p>
</div>
```
````

See the following list: [atom/highlights/tree/master/deps](https://github.com/atom/highlights/tree/master/deps), you can highlight from listed languages.

Also, you can use the following unlisted keywords

* `jsx`
* `ejs`
* `jade`
* `stylus`

## JSX

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

## EJS

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

## Stylus

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
