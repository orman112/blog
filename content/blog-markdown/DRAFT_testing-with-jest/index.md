---
title: Testing with Jest (working title)
published: false
date: ""
tags: ["technology"]
unsplash-image-id: ""
description: ""
---

- There are a number of testing frameworks in JavaScript
  - Jest: most popular in React
  - Mocha: highly configurable with large ecosystem of support
  - Jasmine
  - Tape: leanest and simplest
  - Ava

# Jest

- Jest comes bundled with create-react-app
- Snapshot testing

**React Test Utils** is a helper library specifically for testing React components (built by Facebook) - Shallow render (only render single component) so no DOM required - Not good for testing events on DOM elements - Render into Document renders component and children

- Due to verbose api and low level utils, many people prefer other alternatives

**Enzyme** created by AirBnB to make it easier to assert, manipulate, and traverse React Components' output (https://reactjs.org/docs/test-utils.html) - Has very extensible methods like `find` to help you find and manipulate DOM components (by tag, id, class, etc)

- Calling React Test Utils behind the scene (serves as an abstraction so you don't have to worry about low level details)
- Uses JSDOM (in-memory DOM) to simulate the browser
- Has methods like shallow (where you can reference JSX) or mount (for actual DOM testing)

**React Testing Library** smaller API and encourages writing tests that reflect how your application is going to be used by the end user (official recommendation by React -- link above)

- Unlike Enzyme, there is no shallow rendering, components are always mounted
- Philosophy that you should focus on what the end user sees
- Queries (getByText, getByTitle, etc) in RTL also come with an implied assertion so no explicit assertion (expect methods) are necessary
- Can also destructure debug method in RTL to get a nice color-coded view of what is rendered within a component (output of RTL's render method)
