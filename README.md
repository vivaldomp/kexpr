# kexpr

**kexpr** is a lightweight and secure conditional expression engine for Node.js and browsers.  
It lets you evaluate JavaScript-like boolean expressions against dynamic data contexts with full support for custom functions.

## Features

- Evaluate boolean expressions with dynamic data contexts.
- Built-in support for common utility functions.
- Extendable with custom functions.
- Works seamlessly in both Node.js and browser environments.

---

## Installation

To install **kexpr**, use npm:

```bash
npm install kexpr
```

---

## Usage

### Creating an Evaluator and Evaluating Expressions

#### Without Context

You can evaluate expressions without providing a context:

```typescript
import { Evaluator } from 'kexpr';

const evaluator = Evaluator.create();
const expression = 'true || false';

(async () => {
  const result = await evaluator.runExpr(expression);
  console.log(result); // Output: true
})();
```

#### With Context

You can also evaluate expressions with a dynamic data context:

```typescript
import { Evaluator } from 'kexpr';

const evaluator = Evaluator.create();
const expression = 'input.value > 10';
const context = {
  input: {
    value: 15,
  },
};

(async () => {
  const result = await evaluator.runExpr(expression, context);
  console.log(result); // Output: true
})();
```

---

## Built-in Functions

**kexpr** comes with several built-in utility functions. Below is a list of available functions and examples of their usage:

### `versionCheck`

Checks if a version satisfies a given semver condition.

```typescript
const expression = 'versionCheck(input.version, ">=1.0.0 <2.0.0")';
const context = { input: { version: '1.5.0' } };
const result = await evaluator.runExpr(expression, context); // true
```

### `randomPerc`

Checks if a random percentage falls within a given range.

```typescript
const expression = 'randomPerc(10, input.customerId, 123)';
const context = { input: { customerId: 2000 } };
const result = await evaluator.runExpr(expression, context); // true or false
```

### `randomPercRange`

Checks if a random percentage falls within a specific range.

```typescript
const expression = 'randomPercRange(0, 10, input.customerId, 123)';
const context = { input: { customerId: 2000 } };
const result = await evaluator.runExpr(expression, context); // true or false
```

### `after`

Checks if the current date is after a given date.

```typescript
const expression = 'after("2000-01-01")';
const result = await evaluator.runExpr(expression); // true
```

### `before`

Checks if the current date is before a given date.

```typescript
const expression = 'before("3000-01-01")';
const result = await evaluator.runExpr(expression); // true
```

### `match`

Checks if a value matches a regular expression.

```typescript
const expression = 'match(input.text, "^h.*o$")';
const context = { input: { text: 'hello' } };
const result = await evaluator.runExpr(expression, context); // true
```

### `concatString`

Concatenates multiple strings.

```typescript
const expression = 'concatString("hello", " ", "world") === "hello world"';
const result = await evaluator.runExpr(expression); // true
```

### `stripWhitespaces`

Removes all whitespaces from a string.

```typescript
const expression = 'stripWhitespaces(" h e l l o ") === "hello';
const result = await evaluator.runExpr(expression); // true
```

---

## Adding Custom Functions

You can extend **kexpr** by adding your own custom functions.

### Example: Adding a Custom Function

```typescript
import { Evaluator } from 'kexpr';

const customFunctions = {
  add: (a: number, b: number): number => a + b,
};

const evaluator = Evaluator.create({ customFunctions });

const expression = 'add(5, 10) == 15';
const result = await evaluator.runExpr(expression); // true
```

---

## Acknowledgments

This project makes use of the following external libraries:

- [semver](https://github.com/npm/node-semver): A library for semantic versioning in JavaScript.
- [jexl](https://github.com/TomFrost/Jexl): A powerful JavaScript Expression Language for evaluating expressions.
- [pino](https://github.com/pinojs/pino): A fast, low-overhead logging library for Node.js.

We acknowledge and thank the authors and contributors of these libraries for their work.

---

## License

This project is licensed under the MIT License.