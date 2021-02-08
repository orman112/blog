---
title: Integrating Firebase Admin SDK with Azure Functions
published: false
date: "2021-02-07"
tags: ["technology"]
unsplash-image-id: ""
description: ""
---

# Initial Notes

## Overview

- Going to be building a web api using azure functions with firebase admin sdk integration (to verify client side JavaScript Web Tokens JWT))

## Setup

- CLI requirements
- Follow this guide: https://www.apollographql.com/docs/apollo-server/deployment/azure-functions/
- `yarn install`
- `yarn add firebase-admin`
- At this point, explain difficulty in finding resources for serverless approach (need [service account file](https://firebase.google.com/docs/admin/setup#initialize-sdk))
- For this post, only use environment variables referring to local.settings.json for local dev and [application settings](https://docs.microsoft.com/en-us/azure/azure-functions/functions-how-to-use-azure-function-app-settings?tabs=portal#settings) in Azure Portal.

## Local Development

- `yarn build` to create dist directory
- `func host start`
- Should be able to read out firebase env files (maybe a method to create and then read from cloud firestore)

## Deployment

- Follow this guide: https://www.apollographql.com/docs/apollo-server/deployment/azure-functions/#deploying-the-project-to-azure-using-the-azure-cli
- Prove same functionality (read/write) works in cloud as well
