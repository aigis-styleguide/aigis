/*
---
name: Syntax Highlight
category:
  - Documentation
  - Documentation/Syntax Highlight
---

aigisはシンタックスハイライトにAtomエディタで使われている[atom/highlights](https://github.com/atom/highlights)を利用していますので、シンタックスハイライトのカラーリングに[Atom's themes](https://atom.io/themes)にあるテーマを利用できます。

シンタックスハイライトの言語サポートを増やしたいときには[pxgrid/aigis-marked#issues](https://github.com/pxgrid/aigis-marked/issues)にissueを立ててもらうか、PRを送ってください。(Contribute Guideは準備中です)

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

* [atom/highlights/tree/master/deps](https://github.com/atom/highlights/tree/master/deps)

次のリストの言語もハイライトすることが可能です。

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
