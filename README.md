![image alt <](https://github.com/ati-n/tx.js/blob/main/tx-logo.svg)
# What is this ?

**transplant.js** ( _or_ **`tx.js`** ) is a Javascript compiler relying heavily on TypeScript.  
It uses “types on the left”-style declarations and the 'classic' C/C++/Java types like _int, double, str_ and _bool_.  
See the [Docs here.](https://github.com/ati-n/tx.js/blob/main/docs.md)

**tx.js**  files can be created with the **`.tx`** extension.


## Installation
**tx.js** uses the TypeScript compiler so make sure you have it installed aswell 

```shell
# Locally in your project
$ npm install -D typescript
$ npm install -D transplant-js

# Or globally with TypeScript (Recommended)
$ npm install -g typescript
$ npm install -g transplant-js
```

## How to run
After installation, you can use the transplant.js compiler `txc`  
To compile **test.tx** run
```shell
$ txc test.tx
```
This command will create a `test.ts` and a `test.js` file. You can do whatever you want with them! 🥳
+ **transplant.js**  always keeps the same file name.
+ Error handling is done by the TypeScript compiler, except input errors.


## How it works  
See the [Docs here](https://github.com/ati-n/tx.js/blob/main/docs.md)  
```ruby
#// Write your code in tx.js
    const int x = 10;
    double y = 99.9999;
    str s = 'tx.js is awesome!';
```
```typescript
// The tx compiler converts it to TypeScript
    const x: number = 10;
    let y: number = 99.9999;
    let s: string = 'tx.js is awesome!';
```
```javascript
// Then the TypeScript compiler does the dirty job to convert it to JavaScript
    const x = 10;
    let y = 99.9999;
    let s = 'tx.js is awesome!';
```


## Table of types

| Tx.js       | JavaScript |
|-------------|------------|
| int         | number     |
| double      | number     |
| big         | bigint     |
| str         | string     |
| bool        | boolean    |
| obj         | object     |
| sym         | symbol     |
| any         | any        |

---


## License
This project is licensed under the MIT license. For more information, see the [LICENSE](https://github.com/ati-n/tx.js/blob/main/LICENSE) file.
