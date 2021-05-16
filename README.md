![image alt <](https://github.com/ati-n/tx.js/blob/main/tx-logo.svg)
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
```ruby
#// Write your code in tx.js
    const int x = 10;
    double y = 1.23456789123456789;
    string s = 'tx.js is awesome!';
```
```typescript
// The tx compiler converts it to TypeScript
    const x: number = 10;
    let y: bigint = 1.23456789123456789;
    let s: string = 'tx.js is awesome!';
```
```javascript
// Then the TypeScript compiler does the dirty job to convert it to JavaScript
    const x = 10;
    let y = 1.23456789123456789;
    let s = 'tx.js is awesome!';
```
---
## More to come

+ protected namespaces
+ syntax highlighter
+ and more..

## License
This project is licensed under the MIT license. For more information, see the [LICENSE](https://github.com/ati-n/tx.js/blob/main/LICENSE) file.
