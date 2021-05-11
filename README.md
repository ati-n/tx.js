# What is this ?

**tenet.js** is a pseudo compiler for Javascript with TypeScript.

It enables typenames for variables such as _int, double, string_ and _bool_.

**tenet.js**  files are created with the **`.tjs`** extension.


## Installation
```
-- Locally in your project

$ npm install -D typescript
$ npm install -D tenet.js

-- Or globally with TypeScript

$ npm install -g typescript
$ npm install -g tenet.js
```

## How to run

To compile **test.tjs** run
```
$ tenet test.tjs
```

This command will create a `test.ts` and a `test.js` file. You can do whatever you want with them! 🥳
+ **tenet.js**  always keeps the same file name.
+ Error handling is done by the TypeScript compiler.
---
## More to come

+ Automatic conversion to let/const
+ type check by Typescript
+ protected namespaces
+ syntax highlighter
+ and more..
