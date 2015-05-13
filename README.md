# Ronde

Components Styleguide generator.

コンポーネントのスタイルガイドを目指す。イメージはnode版hologram

## way

* CSSファイルのコメントにスタイルガイド用の記述を行う
  * Markdownで記述
  * 設定はCSON

## done

* 済:テンプレートをわける
  * header
  * footer
  * main
  * sidemenu
* 済:タグ機能
  * tagsかな
* 出力
  * 済:カテゴリごと
  * コメント単位？
* ボツ:KSS構文
* 済:Scss対応
* 済:Stylus対応
* 済:codeblockのhighlight
  * scss, sass
  * stylus
  * less
* 済:どのcssファイルから出力されたかモジュール単位の出力に刻印を入れる
  * relativeで
* 済:ユーザーが拡張できるように
  * configにotherがあったらそれをテンプレートに渡してあげる?
  * configそのまま渡せばいいかも
* 済:設定をYAMLとJSONで書けるように

## ToDo

* デバッグロッグを出す
* headermenuいる？
* Handlebarsのテンプレートをキャッシュする
* moduleのnameからページ内容のモジュール一覧（#リンクでとべる）
* 同じtagまとめたページ
* カテゴリなしのコメントをuncategolized的なやつにまとめる
* highlightの背景を設定する
* 時間のフォーマットを指定できるように
