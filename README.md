# Ronde

Components Styleguide generator.

コンポーネントのスタイルガイドを目指す。イメージはnode版hologram

## way

* CSSファイルのコメントにスタイルガイド用の記述を行う
  * Markdownで記述
  * 設定はCSON


### CSON記述例

```css
/*
---
name: "hoge"
category: [
  "hoge"
  "hogehoge"
]
lib: [
  "jquery"
]
---
*/
```

### コードブロックとか

パースするときにブロック内部のコードをHTMLに追加する。

\```html
<div class="hoge">hoge</div>
\```

と書くとHTMLの要素として実際に追加される。

`js` か `javascript` を指定するとコードブロック内のコードをscript要素で囲んで追加する。コードの実行にライブラリが必要な場合はCSONの`lib`にライブラリの名前を指定する。ライブラリのパスは別途`config.cson`に記述する。

## 設定ファイル（config.cson）

全体の設定ファイル。CSONで書く。以下のフィールドを持つ

|プロパティ名|型|デフォルト|役割|
|---|---|---|---|
|name|String|Component Guide|プロジェクト名っぽいの。共通ヘッダーとかあればそこに出力される|
|source|Array|["./css"]|ガイドを作成するCSSのあるフォルダを指定する。配列で複数指定可能|
|dest|String|"./ronde"|出力するフォルダを指定する。|
|doc_assets|String|"./doc_assets"|ドキュメントに必要なJS/CSSが入ってるフォルダを指定|
|(考え中)dependency|Array|---|doc_assets以外の依存。|
|lib|Object|---|コンポーネントが使うライブラリなどをコメント内から指定するためのkeyと、"doc_assets"からの相対パスのvalueの組み合わせ|
|md_template|String|"./md_template"|markedのカスタムレンダラに指定するHandlebarsのテンプレート置き場。|
|md_class|Array|[]|上記テンプレートの要素に追加するクラスを指定する。|


## 機能




## strategy

### CSS

* コメントに
  * コンポーネント名
  * HTML
* 既存のスタイルガイドと連携できるように
* もしくはnode-kss?とかをwrapする

### JS

* コメントに
  * コンポーネント名
  * 動かしたいスクリプト
  * 依存関係
    * require?
    * npmでとってくる？
* settingにextra library的な項目を追加する
    
### 定義ファイル

* JS？
* Ronde.component("コンポーネント名")で関連するファイルをとってくる
* Webpackとか？
* 依存してるJS/CSSの解決

# 実装案

## コードブロックを実際に差し込むやつ(injector)

* ストリームで実装する
  * 将来的に jade とか coffee を表示したいときコンパイルの処理が挟めるように

```
inject = new Injector()
inject.html(code)
```

とかこんな感じにしたい

## markedのカスタムレンダラ

* handlebarsのテンプレートを参照するようにしておく
* オプションでテンプレートのフォルダを変えられるといいかも（やりすぎ？）
