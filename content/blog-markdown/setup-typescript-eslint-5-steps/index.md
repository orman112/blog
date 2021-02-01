---
title: Setting Up Typescript with ESLint in 5 Easy Steps
published: true
date: "2021-02-01"
tags: ["technology", "typescript", "eslint", "javascript"]
unsplash-image-id: "uJrRY8gUm7E"
description: "One bit of toil I always struggle with when creating a new project is getting my linter and typescript integration set up correctly. I decided this would be a perfect time to document the quick, and very easy, steps involved to doing just that."
---

## Backstory

In June 2019, the team at Microsoft shared a [roadmap](https://github.com/Microsoft/TypeScript/issues/29288) for TypeScript which included an overhall to the way they handle linting. One of the major changes to come about was the deprecation of TSLint and the adoption of ESLint as the formal linter of choice.

This article assumes you are starting a brand new project, but if you want to migrate from TSLint over to ESLint, the VSCode team has provided a [wonderful walkthrough](https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration).

Because of these changes, the ESLint team is no longer maintaining the `typescript-eslint-parser` package and they instead [recommend using](https://eslint.org/blog/2019/01/future-typescript-eslint) `@typescript-eslint/parser`.

## Setup

In order to get started, you'll need to navigate to your projects directory and run the following sequence of commands:

#### 1. `yarn init -y`

This will create a brand new `project.json` file using the recommended default configuration.

##### 2. `yarn add -D typescript eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`

This installs the necessary base packages to get typescript and eslint integrated into the project.

##### 3. `touch .eslintrc.js`

This creates your eslint configuration file where you can specify rules, options, settings, and much more. You'll want to add any necessary configuration options to the file as a part of this step. Make sure to also install any necessary dependencies, if you're extending a base configuration such as `airbnb`. I've provided a few example configuration files [here](https://github.com/thefrugaldev/dotfiles). These may be helpful if you're using react, react native, or node as your framework of choice, otherwise feel free to start with a blank slate. If you are using a base configuration, you'll want to make sure to install any peer dependencies as well.

##### 4. Add a `lint` script to your `package.json` file that was created in step 1.

```
"scripts": {
  "lint": "eslint --ext .ts ."
}
```

##### 5. Finally, run the previous script `yarn lint` to search for any errors or warnings in your `.ts` and `.tsx` files.

Thats it! I hope this quick reference guide served useful to you as you begin to build out your next great project!

> **Quick Note**: if you're extending the `airbnb-typescript` configuration, you may run across the following error:
>
> ```
> Error: Error while loading rule '@typescript-eslint/dot-notation': You have used a rule which requires parserServices to be generated.
> ```
>
> If this happens, you'll first need to add a `.tsconfig` file to your project, either manually or with the following command: `npx tsc --init`. Once that's been created, you'll want to update your `.eslintrc.js` file and include `project: './tsconfig.json'` under the `parserOptions` section.
