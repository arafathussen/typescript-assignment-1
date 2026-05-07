# Generics in TypeScript: Reusable Code That Stays Strictly Typed

## Introduction: The "Any" Dilemma

As you begin to write TypeScript, you end up hitting this annoying wall. You want to write flexible functions or data structures which can accept a variety of data. At the same time, you want the TypeScript compiler to remain vigilant and strict on your code.

If the function uses a generic `any`, then you will lose all type safety. But if you implement the same functionality across each individual type of data that you're interested in (strings, numbers, booleans), you end up with hundreds of lines of code that repeat and are hard to maintain. 

So, the question is how to write reusable and strictly typed code? Enter **Generics**. Generics enable writing a program that adapts to any type passed by the caller, and provides all the compiler information needed in the process.

---

## The Problem Generics Solve

Suppose you have a function that expects an array and returns the first element. It could be written for numbers:

```ts
function firstNumber(items: number[]): number | undefined {
  return items[0];
}
```

What if you need the first string of an array of strings? If you want to write one, you would have to write another:

```ts
function firstString(items: string[]): string | undefined {
  return items[0];
}
```

If that is the case, you'll have to write it again for booleans, objects, and etc. That's very inefficient and doesn't follow the DRY (Don't Repeat Yourself) principle.

Lazily using `any`:

```ts
function firstItem(items: any[]): any {
  return items[0];
}
```

This works for all inputs, but now the compiler has no idea on the type of data being returned. Passing in an array of numbers, you might be tempted to use `.toUpperCase()` on the result, without TypeScript warning you.

---

## The Solution: A Generic Function

Generics solve this problem in a very nice way by adding what are called Type Parameters. A type parameter is similar to a variable, except that it contains a type instead of a value.

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}

const name = first(["Alice", "Bob"]);   // TypeScript infers 'T' as string
const age  = first([10, 20, 30]);       // TypeScript infers 'T' as number
```

The `<T>` is the type parameter in this function. It is a temporary variable that is substituted during the function call. We didn't have to explicitly specify the type of `T` when calling the function as TypeScript is smart enough to learn it from the type of argument we provided!

There is a return type `T | undefined` that is derived from the input type automatically. Now you've got one implementation that is 100% type-safe.

---

## Constraining Generics: Keeping Them in Check

In some cases, a function should not be a general one that will accept any type. You may wish for it to only accept objects with a certain property. The `extends` keyword can be used to restrict a generic type.

We can write a function, for instance to return the value of an object's key, when given an object and a key:

```ts
function getProperty<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John Doe", age: 21 };

const userName = getProperty(user, "name");   // Works! Returns a string.
const userEmail = getProperty(user, "email"); // ❌ Error: "email" is not a key of user
```

In this example:
1. `T` has to be an object.
2. `K` is constrained to be one of the valid keys of `T` (`extends keyof T`).
3. The return type is the type of that specific property (`T[K]`).

It will now actively look for an invalid key and the compiler knows exactly what type it's returning.

---

## Generic Interfaces and Classes

Generics aren't limited to functions, they are extremely powerful for data structures such as Interfaces and Classes.

### Generic Interfaces
Think of a typical API response. The format of the response is typically similar, but the content of the `data` section will vary based on the endpoint.

```ts
interface ApiResponse<TData> {
  status: number;
  data: TData;
  error?: string;
}

const userResponse: ApiResponse<{ id: number; name: string }> = {
  status: 200,
  data: { id: 1, name: "Alice" }
};

const listResponse: ApiResponse<string[]> = {
  status: 200,
  data: ["apple", "banana", "cherry"]
};
```

### Generic Classes
Generics can also be used to create strictly typed classes such as a simple Stack data structure:

```ts
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
// numberStack.push("thirty"); // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'.
```

---

## Why Generics Matter at Scale

Generics are really a lifesaver in a large codebase. They offer you three big benefits:

1. **Write once, reuse forever:** Write a utility function or data structure once and use with any type forever.
2. **Strong Inference:** You'll receive perfect suggestions in your IDE, and strict error checking in the language you fed.
3. **Safer Refactors:** If you alter the shape of an object, TypeScript will automatically point out all the locations where a generic is being misapplied.

## Conclusion

In the realm of TypeScript, generics are the last word in flexibility and safety. They allow you to reuse components and change them as per the callers' requirement while ensuring that the compiler is well aware of the components processed by the code. 

It could be a little helper function, or a large, fully-fledged API wrapper, but generics are the key to keeping your TypeScript code completely DRY and strictly typed. Once they are mastered, you won't want to use `any` again!