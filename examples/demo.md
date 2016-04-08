/*
---
name: Syntax Highlight
category:
  - demo
  - demo/Syntax Highlight
---

## `js`

```js
new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  filters: {
    marked: marked
  }
})
```

## `jsx`

```jsx
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(<HelloMessage name="John" />, mountNode);
```

## `html`

```html
<a class="ag-btn">Button</a>
<button class="ag-btn ag-btn--primary">Button</button>
```

## `ejs`

```ejs
<a class="ag-btn"><%- name %></a>
<button class="ag-btn ag-btn--primary"><%- name %></button>
```

## `jade`

```jade
a.ag-btn
  != name
button.ag-btn.ag-btn--primary
  != name
```

## `hbs`

```hbs
{{include './button.html'}}
<hr>
<a class="ag-btn">{{name}}</a>
<button class="ag-btn ag-btn--primary">{{name}}</button>
```

*/
