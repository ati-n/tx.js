

<img align="left" width="300" height="300" src="https://github.com/ati-n/tx.js/blob/main/tx-logo.svg">

# What is this ?

**Transplant.js** ( _or_ **`Tx.js`** ) is a strict syntactical superset of TypeScript.  
It uses “types on the left”-style declarations and the _classic_ C/C++/Java types like _int, double, str_ and _bool_.   


**Tx.js**  files can be created with the **`.tx`** extension.

You can read the [Docs here.](https://github.com/ati-n/tx.js/blob/main/docs.md)


<br><br><br>

## Installation
**Tx.js** uses the TypeScript compiler so make sure you have it installed aswell 

```shell
# Locally in your project
$ npm install -D typescript
$ npm install -D transplant-js

# Or globally with TypeScript (Recommended)
$ npm install -g typescript
$ npm install -g transplant-js
```

## How to run
After installation, you can use the Transplant.js compiler `txc`  
To compile **test.tx** run
```shell
$ txc test.tx
```
This command will create a `test.ts` and a `test.js` file. You can do whatever you want with them! 🥳
+ **Transplant.js**  always tries to keep the same file name.
+ Error handling is done by the TypeScript compiler, except input errors.


## How it works  
- Read the [Docs](https://github.com/ati-n/tx.js/blob/main/docs.md)  
```c#
// Write your code in Tx.js
    const int x = 10;
    str fact = 'Tx.js is awesome!';
    int[] myList = [ 3, 2, 1 ];
```
```typescript
// The Tx compiler converts it to TypeScript
    const x: number = 10;
    let fact: string = 'Tx.js is awesome!';
    let myList: number[] = [ 3, 2, 1 ];
```
```javascript
// Then the TypeScript compiler does the dirty job to convert it to JavaScript
    const x = 10;
    let fact = 'Tx.js is awesome!';
    let myList = [ 3, 2, 1 ];
```
---


## License
This project is licensed under the MIT license. For more information, see the [LICENSE](https://github.com/ati-n/tx.js/blob/main/LICENSE) file.
