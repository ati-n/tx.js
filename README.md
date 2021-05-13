# What is this ?

**transplant.js** ( _or_ **`tx.js`** ) is a pseudo compiler for Javascript with TypeScript.

It enables typenames for variables such as _int, double, string_ and _bool_.

**tx.js**  files are created with the **`.tx`** extension.


## Installation
**tx.js** uses the TypeScript compiler so make sure you have it installed

Use `npx install` so the package is automatically executed to use the transplant.js compiler `txc`
```
-- Locally in your project

$ npm install -D typescript
$ npx install -D transplant-js

-- Or globally with TypeScript

$ npm install -g typescript
$ npx install -g tx.js
```

## How to run

To compile **test.tx** run
```
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
