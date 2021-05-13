![image alt <](https://raw.githubusercontent.com/ati-n/tx.js/71bfbfdfd99fa2a26a2beaf62dd8a16c5ad1db1f/tx-logo.svg)
# What is this ?

**transplant.js** ( _or_ **`tx.js`** ) is a pseudo compiler for Javascript with TypeScript.  
It enables typenames for variables such as _int, double, string_ and _bool_.

**tx.js**  files can be created with the **`.tx`** extension.


## Installation
**tx.js** uses the TypeScript compiler so make sure you have it installed aswell 

```shell
# Locally in your project
$ npm install -D typescript
$ npm install -D transplant-js

# Or globally with TypeScript
$ npm install -g typescript
$ npm install -g tx.js
```

## How to run
After installation, you can use the transplant.js compiler `txc`  
To compile **test.tx** run
```shell
$ txc test.tx
```

This command will create a `test.ts` and a `test.js` file. You can do whatever you want with them! 🥳
+ **transplant.js**  always keeps the same file name.
+ Error handling is done by the TypeScript compiler.
---
## More to come

+ Automatic conversion to let/const
+ type check by Typescript
+ protected namespaces
+ syntax highlighter
+ and more..

## License
This project is licensed under the MIT license. For more information, see the [LICENSE](https://github.com/ati-n/tx.js/blob/main/LICENSE) file.
