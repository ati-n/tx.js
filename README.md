# What is this ?

**tx.js** is a pseudo compiler for Javascript with TypeScript.

It enables typenames for variables such as _int, double, string_ and _bool_.

**tenet.js**  files are created with the **`.tx`** extension.


## Installation
```
-- Locally in your project

$ npm install -D typescript
$ npm install -D tx.js

-- Or globally with TypeScript

$ npm install -g typescript
$ npm install -g tx.js
```

## How to run

To compile **test.tx** run
```
$ txc test.tx
```

This command will create a `test.ts` and a `test.js` file. You can do whatever you want with them! 🥳
+ **tx.js**  always keeps the same file name.
+ Error handling is done by the TypeScript compiler.
---
## More to come

+ Automatic conversion to let/const
+ type check by Typescript
+ protected namespaces
+ syntax highlighter
+ and more..
