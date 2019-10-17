---
title: Exploring React Hooks
published: false
date: ""
tags: ["javascript", "react", "hooks"]
unsplash-image-id: "TxzjVxnWYq4"
description: "React Hooks"
category: "technology"
---

Example Code: **https://github.com/pkellner/pluralsight-course-using-react-hooks**

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

# Less common hooks

- These additional hooks allow for improved performance, global configuration support, and cleaner/more concise code.
-

## useContext

-

## useReducer

## useCallback

## useMemo

# other notes

- React Hooks can only be called from functional React components
- Within those functional components, hooks may only be called from the top level
  - Can't be called inside loops, conditional logic, or nested functions
  - The reason ^^ is that React counts on hooks being called in the same order, every time
  - If they were called within functions or conditional logic, this order could not be guaranteed
  - ESLint Plugin (npm install eslint-plugin-react-hooks) warns the developer if React hooks are being used incorrectly
