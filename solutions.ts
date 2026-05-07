function filterEvenNumbers(numbersArr: number[]): number[] {
  const evenNumbers = numbersArr.filter(
    (num: number): boolean => num % 2 === 0
  );
  return evenNumbers;
}



function reverseString(mainString: string): string {
  const reversedString = mainString.split("").reverse().join("");
  return reversedString;
}



type StringOrNumber = string | number;

function checkType(valueToCheck: StringOrNumber): string {
  if (typeof valueToCheck === "string") {
    return "String";
  } else {
    return "Number";
  }
}



function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}



interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus(bookObj: Book): Book & { isRead: boolean } {
  return {
    ...bookObj,
    isRead: true,
  };
}



class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`;
  }
}



function getIntersection(arr1: number[], arr2: number[]): number[] {
  const commonElements = arr1.filter((num: number): boolean =>
    arr2.includes(num)
  );
  return commonElements;
}

