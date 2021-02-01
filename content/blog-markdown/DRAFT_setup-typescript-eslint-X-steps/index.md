---
title: Setting Up Typescript with ESLint in X Easy Steps
published: false
date: "2021-02-01"
tags: ["technology", "typescript", "eslint", "javascript"]
unsplash-image-id: ""
description: ""
---

# Setup

New way of using ESLint with TS (no more tsconfig.json)
https://eslint.org/blog/2019/01/future-typescript-eslint

- `yarn init -y`
- `yarn add -D typescript eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
- Create eslint file `touch .eslintrc.js`
  - Add any necessary config options to the file (make sure to also install any necessary dependancies): https://github.com/thefrugaldev/dotfiles/blob/master/react.eslintrc.js (react & react native)
  - if you're using airbnb's config, make sure to install any peer dependancies as well.
- Add a `lint` script to your `package.json` file.
  - `"lint": "yarn eslint --ext .ts ."`
- Run the previous script `yarn lint`

Thats it!
