/*
---
name: Comment Syntax
category:
  - Documentation
  - Documentation/Comment Syntax
---

In aigis, Documenting __component's configuration__ and __component's documentation__ in comment block (<code>&#047;&#042; ~ &#042;&#047;</code>).
The block is surrounded by `---` is configuration (YAML) and after yaml block is a documentation (Markdown).

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

The component's style guide wil be generated from this configuration block and documentation block.

## Configuration block

The block is surrounded by `---` is configuration (YAML). Documenting the configuration with YAML forms.

> To be more precise, `---` needs to contain at the next line of starting line of comment block (<code>&#047;&#042;</code>).

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

Specifying config keys of components (default is `category` and `tag`) in `output_collection:` which is in the configuration file ( `aigis_config.yml`) , you can generate a components style guide grouped by the specified configuration keys.

> `category` and `tag` are grouped and output by default.

## Documentation block

You can use Markdown ([GitHub flavored markdown](https://help.github.com/categories/writing-on-github/)) in documentation block of the component

Enabled syntax highlight if you specified special keyword into code block (<code>&#8242;&#8242;&#8242;</code>).
Please see [Documentation/Syntax Highlight](../Syntax-Highlight/) for more details.

> Aigis compiles with [chjj/marked](https://github.com/chjj/marked) and original custom renderer named [aigis-marked](https://github.com/pxgrid/aigis-marked/) for syntax highlighting

## Customize Code Example Renderers

Aigis generates previewed components and appends it to the style guide, using a code block (<code>&#8242;&#8242;&#8242;</code>) which has a language identifier.

Aigis can compile the components with a template engine, using the key / values in the configuration block.

To enable this, set `compile: true` in configuration block and specify the syntax of the template engine as a language identifer in the code fence.

You can write the component include the keys in the template syntax which you specify. Aigis compiles the components using the values of the keys.

> If you want to enable or disable previewed components, set `transform:` value in configuration block.
> In the case of enable only `ejs`, set `transform:` value to `ejs` only as follows.
```yaml
transform:
  - ejs
```

Describe configuration to generate from sample code block by using EJS.
You can set `compile:` value each component. By default is `false`.

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

The previewed component which was generated from the above configuration and sample code block will be prepend the sample code block.

````  
<div>
  <h2>component name</h2>
  <p>hoge</p>
  <p>fuga</p>
</div>
````  

Jade and Handlebars also can generate compiled previewed component.

*/
