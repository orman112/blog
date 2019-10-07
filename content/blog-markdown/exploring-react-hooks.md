---
title: Exploring React Hooks
published: false
date: ""
tags: "technology javascript react hooks"
unsplash-image-id: "TxzjVxnWYq4"
description: "React Hooks"
---

Example Code: **https://github.com/pkellner/pluralsight-course-using-react-hooks**

# 3 most common:

## useState

- State helps build highly performant web apps.
- Typically used to track only a single javascript object or value
- React team recommends multiple useState calls to update primitive types, rather than one call to update a complex JavaScript object
- Let's the developer track state across components very easily

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
