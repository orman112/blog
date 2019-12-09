---
title: Exploring React Hooks
published: false
date: ""
tags: ["technology", "javascript", "react"]
unsplash-image-id: "TxzjVxnWYq4"
description: "React Hooks"
---

Example Code: **https://github.com/pkellner/pluralsight-course-using-react-hooks**
**Reference module 4, episode 8, :43 seconds of react-redux course for more information on hooks**

# Intro

- React hooks allow developers to declaritively create functionality in a much more concise manner.
- Gets rid of the need for things like class constructors, getState and setState to maintain state within components.

# 3 most common:

## useState

- State helps build highly performant web apps.
- Typically used to track only a single javascript object or value
- React team recommends multiple useState calls to update primitive types, rather than one call to update a complex JavaScript object
- Let's the developer track state across components very easily
- Initialized with an array (getter and setter) and, if desired, a default value is specified as an argument to useState()

## useRef

- Primarily used to allow direct access to a DOM element
- Great for accessing and manipulating dom atttribues directly
- Gives the developer access to DOM elements when other means are not satisfactory

## useEffect

- useEffect causes side effects to React functional components (causing them to become non pure -- the same result is not _guaranteed_ given the same inputs)
- when a functional component is first called, a function associated with useEffect is triggered
- when the functional component completes, a different function associated with useEffect is executed
- useEffect is a great tool for adding and removing listeners for DOM elements
- Gives the ability to easily set objects, typically state, when components start and finish
- If no arguments are passed (an empty array), useEffect has the same effect as componentDidMount();

# Less common hooks

- These additional hooks allow for improved performance, global configuration support, and cleaner/more concise code.
-

## useContext

- Makes it trivial to access context in any functional components
- Common use case for this hook is storing config information/data and having it available in any functional component within the app

### context API

- Creating a context (context API) came before hooks. This hook (useContext) is just used to _consume_ the context that is created.
- React v16.3.0 released context API
  - Create a shared context at some level, where any component below that level has access to that shared context
  - Makes accessing data in functions in any place your React app ver simple and straight forward.
  - Removes the necessity to manually pass data between components through props (Prop drilling, Higher Order Components anti-patterns -- class inheritence to pass data around)
- Context API has a Provider that accepts a value of any Javascript object

## useReducer

- useState is built on top of useReducer (with a very thin layer between them)
- A reducer is simply a function that takes in a previous state as the first param and an action as the 2nd param, and returns a new state.
- Allows for a nice, elegant solution to organize state management.

## useCallback

- Along with useMemo, helps with performace of your React apps (using memoization - apply definition)
  - Memoization - optimization technique used to primarily speed up applications by returning cached results
- Caches a function

## useMemo

- Along with useMemo, helps with performace of your React apps (using memoization - apply definition)
- Memoizes a value on the client (React app)
- The second parameter to the useMemo hook is the dependency array. If any of these values change, the memoized version is dumped and the values are re-rendered.

## Common patterns for using React hooks

## other notes

- React Hooks can only be called from functional React components
- Within those functional components, hooks may only be called from the top level
  - Can't be called inside loops, conditional logic, or nested functions
  - The reason ^^ is that React counts on hooks being called in the same order, every time
  - If they were called within functions or conditional logic, this order could not be guaranteed
  - ESLint Plugin (npm install eslint-plugin-react-hooks) warns the developer if React hooks are being used incorrectly
