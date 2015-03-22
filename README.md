# Ronde

Components Styleguide generator.

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
