/*
---
name: Configs
category:
  - Documentation
  - Documentation/Configs
---

Aigis control a lot of action with a configuration file (`aigis_config.yml`). All path names are interpreted relative from a configuration file (`aigis_config.yml`) directory.

## source: (`required`)
Type|Default
---|---
String or Array|undefined

Specify relative path to a source file (or directory) which is a source for generating style guide. You can specify single specified value or arrayed value.

> #### Example
In case of setting specific file and directory name to `source` value, see below:
```yaml
source:
  - ./css/style.css
  - ./scss
```

## source_type: (optional)
Type|Default
---|---
String or Array|['.css', '.sass', '.scss', '.styl']

In case of setting directory name to `source` value, Aigis will aim at source file which has an extension in `source_type`. By default, there are four type of extensions, `.css`, `.sass` and `.scss`, and `.styl`.

> #### Example
If you want to filter the type of source, set `source_type` value you want as follows.
```yaml
source_type:
  - .css
  - .less
```
> ##### Generate style guide with Markdown
> Aigis can generate style guide from every text file which has CSS comment block (<code>&#047;&#042; ~ &#042;&#047;</code>) and configuration block which is surrounded by `---`
> For example, Aigis generates from Markdown file when you set `source_type` to `.md`
```yaml
source_type: .md
```

## dest: (optional)
Type|Default
---|---
String|'./style guide'

Specify destination directory. If you didn't specify it, Aigis will make a destination directory named `style guide` at the configuration file (`aigis_config.yml`) directory.

> #### Example
```yaml
dest: ./path/to/destination
```

## dependencies: (optional)
Type|Default
---|---
String or Array|undefined

Specify dependent file and directory for the style guide. The specified file and directory is copied to the destination directory.

> #### Example
```yaml
dependencies:
  - ./path/to/css
  - ./path/to/images
  - ./path/to/style.css
```

## template_dir: (optional)
Type|Default
---|---
String|'./template'

Specify directory of template for generating style guide. This directory needs to contain `index.ejs` and `layout.ejs`.

> If you specified `jade` to `template_engine`, the directory needs to contain `index.jade` and `layout.jade`.
>
> If you specified `hbs` to `template_engine`, the directory needs to contain `index.hbs` and `layout.hbs`.

> #### Example
```yaml
template_dir: './path/to/template_dir
```

## component_dir: (optional)
Type|Default
---|---
String|'./html'

Specify directory of imported html file. This option value is used for resolving a path of imported file when you want to append external file using special phrase (<code>!!\[](./path/to/file.html)</code>).

## template_engine: (optional)
Type|Default
---|---
String|'ejs'

Specify template engine for generating style guide. Three type of template engines can be used in aigis as follows.

* EJS（`ejs`）
* Jade（`jade`）
* Handlebars（`hbs`）

This directory needs to contain a `index.xxx` (e.g. index.jade) which has an extension for the template engine you choose.

> #### Example
If you want to use Jade, see below:
```yaml
template_engine: jade
```

## log: (optional)
Type|Default
---|---
Boolean|false

List of generated files will be displayed to the console when this `log` is true.

## color_palette: (optional)
Type|Default
---|---
Boolean|true

Aigis generates a color palette page named `color.html` which has all the color that are used in your files.

[Sample: color.html](https://pxgrid.github.io/aigis/styleguide/color.html)

If you don't need the color palette, specify `false` to this option and then Aigis don't generate the color palette page.

## preview_class: (optional)
Type|Default
---|---
String|'aigis-preview'

Specify class name of the preview area which contains previewed component when Aigis generated a previewed component from the code block.
So, This option helps to operate your component with JavaScript or add a CSS which is unaffected by CSS of style guide

> #### Appending previewed component
For example, you wrote a code block as follows.
````html
```html
<button>hoge</button>
```
````
Aigis appends the following HTML to your style guide.
```html
<div class="aigis-preview">
  <button>hoge</button>
</div>
```


## output_collection: (optional)
Type|Default
---|---
String or Array|['category', 'tag']

Specify outputted page group. If you want to output page group besides `category` and `tag`, set group name to `output_collection`.

For example, In the case of your components require versioning, you added `version` to your components configuration block as follows.

````css
---
name: btn
category:
  - base
  - btn
version: 1
---
````

And then you set `version` to `output_collection`. Finally, Aigis will generate a page for the components which is grouped by same `version` value.

```yaml
output_collection:
  - category
  - version
```

In the case of above specified, two type of pages (`category` and `version`) will be outputted.

## transform: (optional)
Type|Default
---|---
String or Array|['html', 'ejs', 'jade', 'hbs']

In the case of code block has a special extension, Aigis will generate an actual HTML from the code block.
It can help you to show markup example and previewed component.

`html` `jade` `ejs` `hbs` will be enabled by default.

If you don't want to generate previewed component from the code block, specify `transform` value which you want.

```yaml
transform:
  - html
  - hbs
```

> #### Compile code block with template engine
If you specify `compile: true` in configuration block of your component, The code block which is specify `ejs` or `jade` or `hbs` will be compiled by using configuration value of the configuration block.
> ````yaml
---
name: btn
category: btn
compile: true
data:
  value1: hoge
---
```ejs  
<h2><%- name %></h2>
<button><%- data.value1 %></button>
```  
````
In the above case, Aigis will append HTML like the following by using configuration values.
```html
<div class="aigis-preview">
  <h2>btn</h2>
  <button>hoge</button>
</div>  
```


## highlight: (optional)
Type|Default
---|---
Boolean|true

Specify enabling or disabling syntax highlighting for the code block. If you want another syntax highlighting library, specify `highlight: false` and then Aigis will disable the syntax highlighting.

## timestamp_format: (optional)
Type|Default
---|---
String|'YYYY/MM/DD HH:mm'

When aigis generate style guide, Aigis will path through special variable named `timestamp` to your template. It helps to mention about publish date of your style guide.

Please refer [format of Moment.js](http://momentjs.com/docs/#week-year-week-and-weekday-tokens) about The format of `timestamp_format` value.

## template_global_data: (optional) `Only Handlebars`
Type|Default
---|---
Boolean| true

⚠ This feature is only Handlebars template.

When you specify 'false', enabling handlebars include to pass contextual params.

> #### Example
aigis_config.yml
>````yaml
template_global_data: false
transform:
  - html
  - hbs
````
your css
````yaml
---
name: Button
compile: true
---
Button styles.
* Base button style.
* Use `a` or `button` tag.
```hbs
{{include './button.html' label='Buy'}}
```
````
button.html
````html
<button>{{label}}</button>
````
Output html for style guide is below:
```html
<div class="aigis-preview">
  <button>Buy</button>
</div>
```

*/
