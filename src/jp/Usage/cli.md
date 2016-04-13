/*
---
name: With CLI
category:
  - Usage
  - Usage/CLI
---

## Installation

```
npm i node-aigis
```

## Version & Help

### Show version

```
$ ./node_modules/.bin/aigis --version
1.0.0
```

### Show help

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


## Run aigis

```
./node_modules/.bin/aigis run
```

### options

|name|alias|value|
|---|---|---|
|`--config`|`-c`|./path/to/aigis_config.yml|


## Init config file & templats

```
./node_modules/.bin/aigis init
```

### options
|name|alias|value|
|---|---|---|
|`--engine`|`-c`|ejs, jade, hbs|


*/
