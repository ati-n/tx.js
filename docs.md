# Transplant.js

When I first heard about TypeScript, I was very excited, because I am so used to declaring types for everything in C/C++/Java etc.
I thought that Javascript is very cool because of its flexibility, but gives a lot of headache when you try to debug where the hell something became null or undefined.

When I was getting to know TypeScript, immediately I got confused with the type syntax.

`let x: number`...what?

What is this syntax? I know Javascript uses this syntax under the hood, but is it really... appealing?

I didn't like it. I thought `int x` would be a million times better, get rid of that `let` come on.. The syntax would be ~~almost~~ like Java..

---

## Explicit types

If you know TypeScript, you're already good to go.
Tx **is** TypeScript code with classic _"types on the left”-style declarations_ and the type annotations you know and love from other languages.

Here's an example. The above code is written in TypeScript...

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

Would be written like this in Tx:

```typescript
function greet(str person, Date date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

Well, this doesn't look much.. (Markdown hasn't supported Tx syntax yet, so <g>**str**</g> isn't highlighted).
But this is not what Tx is only doing!

---

## Everyday types

Types appear in many places in TypeScript and so do in Tx.

When you would declare something with a type in eg. Java, you do that in Tx. When it's rather confusing to use a type declaration (for example TypeScript union types before declaring a variable, _more on that later_), Tx follows TypeScript's syntax.

---

### Primitives

<br>
Tx primitives are `int`, `double`, `str`, `bool`, `big` and `sym`.

TypeScript (and Javascript) `number` is a **double-precision 64-bit floating point format (IEEE 754)**, so every number is basically a float.
In Tx you can still choose if you want `int` or `double`, why is that? Because now you can really distinguish between integers and floating point numbers! At first I only wanted to use `int` for every number, but that would've been so incorrect grammatically, so I added `double`. These are nonetheless the same, just here for convenience.

The other primitives are very straight forward, TypeScript's `string` is called `str` in Tx, `boolean` is `bool`, `biging` is `big` and `symbol` is `sym`.

The other two Javascript primitives `undefined` and `null` doesn`t have special syntax.

### Arrays

<br>

Tx's array types are written as `int[]` for `[1,2,3]` . You can use the other syntax `Array<int>`, this means the same.

### Type Annotations for Variables

<br>

When you delcare a variable in TypeScript, you would do something like this:

```typescript
let myName: string = "Joey";
```

This is though considered a 'bad practice' and the <g>: string</g> isn't needed, because TypeScript tries to _infer_ the types in the code.

Still it would be _great_ if all variable types would've got their annotations without too much typing.

Let's look at Tx:

```python
str myName = 'Joey';
```

This code compiles to the previous TypeScript code!  
If you want a constant variable, just type `const` before the type:

```c#
const int myNum = 56;
```

This will become

```typescript
// This is TypeScript
const myNum: number = 56;
```

### Functions

<br>

#### Parameter Type Annotations

```typescript
function greet(str name) {
  console.log("Hello, " + name + "!");
}
```

#### Return type Annotations

There are multiple options to write functions in TypeScript

```typescript
function monthsPerYear() {
  return 12;
}
```

### Object Types

<br>

Here is an example of Tx keeping the TypeScript syntax format, when we annotated the `sum` parameter with a type with two properties - `x` and `y` - both are `int` types.

```typescript
function add(sum: { int x, int y }) {
    return sum.x + sum.y;
}
add({ x: 3, y: 7 });
```

You already saw in the very first example, that Tx uses the left-side type syntax in function parameters, but when the parameter is an object it's just better to not go into something like ~~`add({int x, int y} sum)`~~. Looks ugly and confusing.

Optional properties are the same in Tx and in TypeScript (use `?`)

```typescript
function yourName(obj: { str first; str last? }) {
  // ...
}
// Both OK
yourName({ first: "Joey" });
yourName({ first: "Yugi", last: "Moto" });
```

### Union types

<br>

TypeScript's union types were very controversial for me when I first learned about them. What's the point of strong typing if you can dodge it and _still have multiple types_ ?

I kept TypeScript's syntax format, because ~~`(int | str id)`~~ looks confusing and I don't like union types (use **Type Aliases** instead!)

```typescript
function printLicensePlate(id: int | str) {
  console.log("Your License plate is: " + id);
}
// Both OK
printLicensePlate(9021007);
printLicensePlate(`CA-6707S`);
```

### Type Aliases

<br>

```typescript
type Coordinate = {
    double x,
    double y,
}

function printCoords(Coordinate coord) {
    console.log("X is " + coord.x);
    console.log("Y is " + coord.y);
}

printCoords({ x: 37.2340392, y: 122.44361 });
```

A type alias can be used to name a union type.

```python
type ID = int | str;
```

```typescript
function printLicensePlate( ID id ) {
    console.log("Your License plate is: " + id);
}
```

That's a better way to utilize union types in Tx.

### Interfaces

<br>

Interfaces are very similar to Type aliases, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable. [More about this here.](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

A key difference in Tx is that you **should only use comma as the separator** and not semicolon in interfaces and type aliases.

```c#
interface Coordinate = {
    double x, // not semicolon!
    double y,
}
```

```typescript
function printCoords(Coordinate coord) {
    console.log("X is " + coord.x);
    console.log("Y is " + coord.y);
}

printCoords({ x: 37.2340392, y: 122.44361 });
```

### Literal types

When you (for some reason) want to have something like this:

```typescript
// This is TypeScript
let greetings: "hello" = "hello";
```

Then you have to use the TypeScript's syntax. Again, how dumb would ~~`"hello" greetings = "hello"`~~ looks?

On the other hand, combining literals into a type alias union work great:

```typescript
type RPS = "rock" | "paper" | "scissors";
}

function play(str player, RPS choice) {
    console.log(player + " chose " + choice);
}
play("Joey", "rock");
play("Yugi", "paper");
play("Kaiba", "Blue-Eyes White Dragon"); // Wrong
// Argument of type '"Blue-Eyes White Dragon"' is not assignable to parameter of type '"rock" | "paper" | "scissors"'
```

### Enums

<br>

Enums work just as they do in TypeScript.

```typescript
enum Colors {
  RED,
  BLUE,
  GREEN,
  YELLOW,
}
```

### Less common primitives

#### bigint

```typescript
// Creating a bigint via the BigInt function
const big oneHundred = BigInt(100);

// Creating a BigInt via the literal syntax
const big anotherHundred = 100n;
```

#### symbol

```typescript
const sym firstName = Symbol("name");
const sym secondName = Symbol("name");
```

<style>
r { color: Red }
o { color: Orange }
g { color: lightseagreen }
</style>