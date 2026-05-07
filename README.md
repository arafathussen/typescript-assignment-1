# Advanced Problem Solving with TypeScript & OOP

Hello there! 👋 Welcome to my repository for Assignment 1: **Advanced Problem Solving with TypeScript & OOP**. 

In this project, I've tackled 7 different coding problems to demonstrate my understanding of strict type safety, Object-Oriented Programming (OOP) concepts, and advanced TypeScript features like Generics and Type Guards. I've also written two technical blog posts to explain some core TypeScript concepts in a simple, easy-to-understand way.

## 📂 What's Inside? (File Structure)

Here is how I have organized the files for this assignment:

```text
├── solutions.ts
├── blog-1.md
├── blog-2.md
└── README.md
```

## 💻 Code Solutions (`solutions.ts`)

I have implemented all the problem-solving tasks inside a single file (`solutions.ts`). I made sure to follow strict TypeScript rules, use proper naming conventions, and keep the code clean (no `console.log` statements left behind!).

Here is a quick overview of what I solved:
1. **Array Filtering:** A function that strictly extracts even numbers from an array.
2. **String Reversal:** A clean approach to reversing a given string.
3. **Union Types & Type Guards:** A `checkType` function that safely identifies if a value is a `"String"` or `"Number"`.
4. **Generics & Constraints:** A strongly-typed `getProperty` function that uses `<T, K extends keyof T>` to prevent invalid object keys.
5. **Intersection Types:** A `toggleReadStatus` function that immutably updates a `Book` object.
6. **OOP & Inheritance:** A base `Person` class and a `Student` subclass demonstrating inheritance and proper parameter properties.
7. **Array Intersection:** A logical function to extract common elements between two arrays.

## 📝 Technical Blogs

Besides coding, I also wrote two blogs to share what I've learned:

1. **[Blog 1: Understanding Why `any` is a "Type Safety Hole" and `unknown` is your Best Friend](./blog-1.md)**
   - I discussed why using `any` is dangerous for a codebase and how `unknown`, combined with **Type Narrowing**, acts as a much safer alternative.

2. **[Blog 2: Generics in TypeScript: Reusable Code That Stays Strictly Typed](./blog-2.md)**
   - I explained how Generics can save us from writing repetitive code while maintaining 100% type safety, with real-world examples.

## 🚀 How to Run the Code

You can easily run the `solutions.ts` file directly using Node.js. Whether you are on Windows using **PowerShell** or on Linux/Mac using **Bash**, the command is the exact same.

Open your terminal (PowerShell, Bash, or Command Prompt) and run:

```powershell
node solutions.ts
```

---
*Thanks for checking out my work! Developed with strict adherence to TypeScript and OOP best practices.*
