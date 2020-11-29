---
title: Swift Reference Guide (working title)
published: false
date: ""
tags: ["technology"]
unsplash-image-id: ""
description: ""
---

## The Basics

**Var** - similar to the `var` and `let` keyword in JS. Used to initialize scoped variables.

**Let** - analogous to `const` in JS. Once it's declared, it cannot be mutated. Small subtlety here is that it can be initialized without being set, and eventually set later, but still **_only_** once.

**Optionals** - If you're familiar with TypeScript, these are similar to nullable values. You declare an optional by appending a `?` at the end of the data type declaration. It's essentially telling Swift, this property may or may not have a value associated with it. If not, the value is set to `nil` and no compilation errors are thrown. Any data type in Swift can be set as an optional.

- In order to retrieve a value from an optional, you must unwrap it in Swift. There are two methods to unwrapping an optional, a _forced_ unwrap where Swift pulls the value out without checking for its existence (the onus is on you to check this). The other (more streamlined) option is to store it in a temp variable if it exists, or keep moving along if it doesn't. Both options shown below:

```
// declare your optional
var optionalString: String?

// shorter, more concise approach
if let unwrappedString = optionalString {
    print(unwrappedString)
} else {
    //...no value, do something else
}

// must check for value here or app could crash
if optionalString != nil {
    // we are force unwrapping here by using the bang (!) operator
    var unwrappedString = optionalString!
    print(unwrappedString)
}
```

## Data Types

All of your primitive data types (`bool`, `char`, `int`, `float`, etc) are available in Swift, as well as some of your other common types (`string`, `array`). There are also a few others you might not be familiar with if you're coming from JS (`dictionary`, `set`, `enum`). Again, if you're familiar with TypeScript, the syntax may look pretty familiar:

```
var myString: String
var myInt: Int
var myIntArray: [Int] // Array of Int
var students: [Int: String] // Dictionary of Int keys and String values
enum animalEnum {
    case lion
    case tiger
    case bear
}
```

With strings also comes string interpolation, which does exist in Swift but the syntax may look a bit odd:

```
let firstName = "Foo"
let lastName = "Barr"
let age = 30

//string interpolation
print("Hello, my name is \(firstName) \(lastName), and I'm \(age) years old!")
```

## Functions

Functions are structured in a similar way to what you might be used to, with a few minor differences thrown in. Functions are declared with the `func` keyword. Any parameters must identify their data type, and any calling function must explicitly define the arguments it's passing to the function.

```
func printHappyBirthdayMessage(age: Int, name: String) {
    print("Happy birthday, \(name)! I can't believe you're already \(age) years old!)
}

printHappyBirthdayMessage(age: 30, name: "Foo Bar")
```

If you're returning a value, you must identify its data type as well, using the arrow syntax (this may look familiar to arrow functions in JS):

```
func calculateSqFeet(length: Int, width: Int) -> Int {
    return length * width
}
```

## Loops

There are three major types of loops in Swift: `while`, `repeat-while` (aka `do-while`), and `for-in` loops. All of these should sound familiar if you're coming from JavaScript. The main one that you'll probably find yourself using is the `for-in` and its syntax is pretty much the same as JavaScript.

There are some cool things you can do with loops though, including using the `range` operator to increment by 1:

```
for number in 0...10 {
    print(number) // this will print out all numbers 0 to 10, including 10
}

for number in 0..<10 {
    print(number) // this will print out all numbers 0 to 9
}
```

## Structs and Classes

Structs are very similar to classes in that they group pieces of information into one body or object. A few differences between the two are structs cannot implement inheritance and are considered value types, whereas classes are considered reference types in Swift.

Structs also support initializers that get called anytime a new struct is instantiated, but they are not required. The difference here is that classes do require initializers (think constructors in other languages) if default values are not provided. Classes also allow for `de-initializers` that are used for cleanup after a class reference is removed from memory by the ARC (Automatic Reference Counting), otherwise known as the garbage collector in other languages. Both classes and structs can contain `protocols` and `subscripts` as well.

```
struct Book {
    // static properties
    var title: String
    var author: String
    var genre: String
    var publishYear: Int
    var currentPage: Int
    var totalPages: Int

    //computed property - also available in classes
    var remainingPages: Int {
        // excluding a setter makes it a readonly computed prop
        get {
            return totalPages - currentPage
        }
    }

    // methods
    func overview() -> String {
        return "\(title) is a \(genre) book, written by \(author) in \(publishYear)"
    }
}

var newBook = Book(title: "1984", author: "George Orwell", genre: "Fantasy", publishYear: 1949)

print(newBook.overview()) // "1984 is a Fantasy book, written by George Orwell in 1949"
```

## Closures

Closures in Swift are blocks of code that you intend to pass to a function or method. You can think of this as an anonymous function you might pass to another function in JavaScript. There are a few ways to write and pass closures and the following three ways are all valid syntax for declaring closures:

```
struct Product {
    var id: Int
    var name: String
    var seller: String
    var price: Float
}

let product1 = Product(id: 1, name: "Book", seller: "Foo Industries", price: 12.00)
let product2 = Product(id: 2, name: "Movie", seller: "Foo Industries", price: 15.00)
let product3 = Product(id: 3, name: "Furniture", seller: "Bar Industries", price: 25.50)

let allProducts = [product1, product2, product3]

func sortByPrice(firstProduct: Product, secondProduct: Product) -> Bool {
    if firstProduct.price <= secondProduct.price {
        return true
    } else {
        return false
    }
}

// Closure examples

// 1) just pass in the defined function above
let priceSortedProducts = allProducts.sorted(by: sortByPrice)
// 2) using the "in" keyword
let nameSortedProducts = allProducts.sorted(by: {
    (firstProduct: Product, secondProduct: Product) -> Bool
    in
    if firstProduct.name <= secondProduct.name {
        return true
    } else {
        return false
    }
})
// 3) using the reserved $index Swift provides
let sellerSortedProducts = allProducts.sorted { $0.seller <= $1.seller }
sellerSortedProducts
```

As you can see in the last example, you can condense your closure down and even remove the `return` statement if you can manage to fit it all on one line of code.

## Extensions

A lot of times, you'll want to extend some behavior that might make it easier to reuse across your application. Swift makes it easy to extend almost all objects, structs, and classes by using the `extension` keyword. For example, if I wanted to add some functionality to the native `String` type, I could add the following extension method:

```
extension String {
    func makeSpongebobCase() -> String {
        var newString = ""

        for (index, char) in self.enumerated() {
            let newChar = index % 2 == 0 ? char.uppercased() : char.lowercased()

            newString.append(newChar)
        }

        return newString
    }
}

let text = "Swift is a tough language!"

print(text.makeSpongebobCase()) // SwIfT Is a tOuGh lAnGuAgE!
```

## Protocols

A `protocol` in Swift is a way to formalize how a class or struct should behave and what they can do. The easiest way to describe a protocol is essentially a manuscript or list of requirements necessary to implement some behavior or code (in other languages this could be analogous to an `interface`).

The syntax for implementing a protocol is by first inheriting any base classes needed, and then protocols at the end of the class declaration:

`class MySubClass: MySuperClass, SomeProtocol { }`

Unlike classes, you can adopt multiple protocols in Swift by simply separating each one with commas.

Defining a protocol is as simple as listing any required properties and methods needed to implement said protocol:

```
protocol DogProtocol {
    // what methods are required?
    func bark()
    func eat()
    func drink()

    // what properties/data types are required?
    var name: String { get set }
    var breed: String { get }
    var age: Int { get set }
}
```

## Some caveats to consider

- Parentheses are not required in `if` statements, but are ok. The `{}` **_are_** required, however.
- Semi-colons are not required to end a line of code.
- Switch statements do not _flow through_, meaning a `break` is not needed as an exit condition in a case block. Once a matching case has been found, the following code runs and the switch statement is exited.
  - Multiple case conditions can be checked at once, however, by using comma delimited values:
  ```
  switch (myValue) {
      // checking multiple cases
      case 1, 2, 3:
          print("case met")
      case 4:
          //do something else
  }
  ```
- If a function has the possibility of throwing an error, the `throws` keyword must be explicitly stated in the function definition, for example:
  - `func makeNetworkCall(url: String) throws -> Int`
- When implementing a function that may throw an error, a `do-catch` block might be necessary (similar to a `try-catch` block in other languages).
  - For example, calling the function above might look something like:
  ```
  do {
      result = try makeNetworkCall("www.example.com")
  } catch {
      // ...do something here
  }
  ```
  - If you don't care about catching the error, you can shorten the above code even more using an optional:
  ```
  if let result = try? makeNetworkCall("www.example.com") {
      print result
  }
  ```
- A good alternative to a bunch of `if/else` conditions in a function that has a number of optional parameters is the `guard` clause. Any `guard` must have an `else` block that contains an exit condition if the `guard` evaluates to true:

```
    func myOptionalFunction(param1: String?, param2: Int?, param 3: String?) {
        guard let p1 = param1,
            let p2 = param2,
            let p3 = param3 else {
            // ...return/throw/break/continue statement
        }

        // p1, p2, and p3 all accessible here since guard clause was used
    }
```

- Another useful keyword is `defer`. If you find yourself needing to close a connection, or dispose of an object in multiple places, this is a crucial keyword to take advantage of. In Swift, `defer` will ensure that a block of code runs before exiting the calling block of code (whether thats through a return statement, throwing an error, etc). Defining a `defer` block is simple:

```
func processRequest() {
    openConnection()

    defer {
        // something that needs to happen at the end of this function, regardless of what happens during the call of the function
        closeConnection()
    }
}
```
