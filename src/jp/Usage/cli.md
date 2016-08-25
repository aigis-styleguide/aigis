/*
---
name: コマンドラインから利用する
category:
  - Usage
  - Usage/CLI
---

## インストール

```
npm i node-aigis
```

## バージョンの確認とヘルプの表示

### バージョンを表示する

```
$ ./node_modules/.bin/aigis --version
1.0.0
```

### ヘルプを表示する

```
$ ./node_modules/.bin/aigis --help
Usage: aigis run -c ./path/to/aigis_config.yml

Commands:
  run   Generate styleguide
  init  Copy template & theme & config file

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  node_modules/.bin/aigis run -c ./config_file.yml
  node_modules/.bin/aigis init -e jade
```


## aigisを実行する

```
./node_modules/.bin/aigis run
```

### オプション

|name|alias|value|
|---|---|---|
|`--config`|`-c`|./path/to/aigis_config.yml|


## 設定ファイルとテンプレートを作成する

```
./node_modules/.bin/aigis init
```

### オプション
|name|alias|value|
|---|---|---|
|`--engine`|`-e`|ejs, jade, hbs|


*/
