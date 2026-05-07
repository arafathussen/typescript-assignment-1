# Understanding Why `any` is a "Type Safety Hole" and `unknown` is your Best Friend

## Introduction: The Trap of `any`

Suppose that you have begun a large project that is written in TypeScript. You know that you're getting some data from an external API, but the compiler is complaining because it doesn't know the shape of the data. You are in a hurry to get your work done and enter `: any` to remove the red squiggly lines. Ah, peace! 

But let's take a few weeks to fast forward. If you attempted to call `.toUpperCase()` on an object that was not a string, your application will crash when it is deployed. 

This is a classic case of `any`. The `any` type renders all of TypeScript's error-checking capabilities useless: if a programmer makes a mistake, the program will run just as if the type had never been specified. It works like a "type safety hole," in that errors can find their way into your codebase through it. Fortunately, in TypeScript we have a much safer alternative: `unknown`. 

In this blog post, we'll see why `any` is bad, what is the point of using `unknown` when the data we're accessing is unpredictable and how can we use `unknown` values safely using **Type Narrowing**.

---

## The Problem With `any`

The `any` type indicates that the TypeScript compiler should trust the author to know what he or she is doing and should disregard the type. 

Once a variable is declared as `any`, you can do anything with it, even if it doesn't make any kind of sense. Non-existent methods can be called, missing properties are used, and it can be given to functions that require different data types.

```ts
let userData: any = "Hello Developer";

userData.toUpperCase();       // Works fine, because it's a string.
userData.someRandomMethod();  // TypeScript ignores this, but it will CRASH at runtime!
userData();                   // TypeScript allows calling it as a function! Crash!

const age: number = userData; // Silently assigns a string to a number variable.
```

`any` is contagious. Any variable that is assigned an `any` value loses its type safety as well. A single `any` can cause the entire module to be lost. This is why it is called a **"hole"**—because runtime errors are able to seep right through your type-checking net.

---

## When you enter the word `unknown`: The Safe Choice

If `any` implies that I don't care what its type is, then `unknown` implies that I have a value, but I don't know what it is yet, so please protect me.

Like `any`, you can assign absolutely any value to an `unknown` variable. The magic is that of TypeScript: **Only a type of value can be returned, and TypeScript will not let you do anything with an `unknown` value until you prove it.**

```ts
let apiResponse: unknown = fetchSomeData();

// ❌ TypeScript Error: 'apiResponse' is of type 'unknown'.
apiResponse.toUpperCase(); 

// ❌ TypeScript Error: Type 'unknown' is not assignable to type 'number'.
const userAge: number = apiResponse; 
```

This is precisely the kind of behavior you desire for some unpredictable data like user input, parsed JSON or API responses. Before you can use the data it must be validated by the compiler.

---

## Type Narrowing: Making `unknown` Useful

If you can't use an `unknown` value directly, then what do you do with it? Type Narrowing is where it comes in.

Type narrowing is the process of looking at the logic of a type and determining a more specific type for some value. After you select the type in a conditional block, TypeScript keeps track of the type and will allow you to use it safely.

There are some typical ways to limit types:

### 1. Using `typeof` Operator
Primitive types such as strings, numbers and more can be narrowed down using standard JavaScript `typeof` checks.

```ts
function processValue(value: unknown) {
  if (typeof value === "string") {
    // TypeScript now knows 'value' is a string!
    console.log(value.toUpperCase()); 
  } else if (typeof value === "number") {
    // TypeScript knows it's a number here.
    console.log(value.toFixed(2));
  } else {
    console.log("Unsupported type");
  }
}
```

### 2. Custom Type Guards
However, if the object is complex, then `typeof` is not sufficient and returns `"object"` for such objects. Rather, we can write custom Type Guards which are a special type of boolean type predicate that returns `arg is SomeType`.

```ts
interface User {
  id: number;
  name: string;
}

// Custom Type Guard
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data
  );
}

function greetUser(payload: unknown) {
  if (isUser(payload)) {
    // Inside this block, TypeScript treats 'payload' as a 'User' object.
    console.log(`Welcome back, ${payload.name}!`);
  } else {
    console.log("Invalid user data.");
  }
}
```

Notice the difference? Without using `any`, it would have been possible to have a malformed payload that would have crashed our app. However, a compiler requires us to deal with uncertainty in a manner that is appropriate when we use the `unknown` type and type narrowing.

---

## Conclusion

Using `any` might add flexibility, but you're losing all the power that is TypeScript. It is a practice that leads to ticking time bombs in your codebase.

However, `unknown` gets you to be a responsible developer. It may be dynamic data, but it needs validation prior to use. With the help of type narrowing, you can deal with unknown external data without losing the strictness of type safety. 

The next time you're tempted to go around the compiler check with a use of `any`, consider using the type `unknown`. You will be grateful to your future self (and teammates)!