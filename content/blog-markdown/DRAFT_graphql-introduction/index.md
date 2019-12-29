---
title: GraphQL Introduction (working title)
published: false
date: ""
tags: ["technology"]
unsplash-image-id: ""
description: ""
---

## Queries

- Queries can have names (similar to Classes in OOP)
  - Can run individual queries by their name in the GraphQLHub
- Spaces, commas and newlines are all optional in GraphQL queries (they are there to make the operations more human readable)
  - Completely ignored by the GraphQL parser on the server

## Fields

- Represented in blue in GraphQLHub
- Two types of fields
  - Scalar fields
    - Most basic types in a GraphQL schema.
    - [Represent primitive types](https://graphql.org/learn/schema/#scalar-types) (integer, float string, bool, id)
  - Complex fields
    - Must supply a selection set (scalar fields) anytime a complex field is introduced
    - Objects represented in complex fields usually have a custom type (defined by the end api service)
    - Collection fields are represented by Lists that contain objects of these custom types
- Fields are modeled after functions
  - They accept parameters as input and will output a response
  - Parameters with a trailing exclamation mark denote a required argument (types in GraphQL are nullable by default)
  - Output is determined by **_resolver functions_**

## Variables

- Allows for reusability across queries
- Variables in GraphQL require a scope (typically at the query name/class level) and a type
- Variables allow the clients or consumers of the GraphQL service to avoid any **_string building operations_** at runtime

## Directives

- Allow for customizing or modifying the behavior of the GraphQL runtime execution engine
- Commonly used alongside variables to customize the response based on the variable's values
- Examples of built-in directives for GraphQL that must be supported by any implementation of GraphQL are the [skip and include directives](https://graphql.org/learn/queries/#directives)
- Signified by using the **_@_** symbol and the name must be unique
- Directives also accept a list of arguments (similar to fields)
  - The @include/@skip directives accept an _if_ argument, which is of type boolean, that has to resolve to true for the query to execute
- Directives also have a list of locations that specify where we can use them
  - The @include/@skip directives can be used on fields and fragments

```javascript
query TestQuery($includeRepos: Boolean!, $currentUserName: String!) {
  graphQLHub
  github {
    user(username: $currentUserName) {
      githubId: id
      company
      avatar_url
      repos @include(if: $includeRepos) {
        name
      }
    }
  }
}

//Variables
{
  "currentUserName": "thefrugaldev",
  "includeRepos": true
}
```

## Aliases

- Aliases are helpful when the data exposed by the GraphQL server have different property names then the client is using
- Aliases avoid any additional processing or translational logic on the client/UI side
- Aliases can be used on any field to customize its appearance in the response to the UI
  - Allows for clients to have an extra layer of control over the response
- Aliases also allow for the same field to be requested more than once as different property names

```javascript
query TwoUsers($userName1: String!, $userName2: String!) {
  github {
    user1: user(username: $userName1) {
      githubId: id
      company
      avatar_url
    }
    user2: user(username: $userName2) {
      githubId: id
      company
      avatar_url
    }
  }
}

//Variables
{
  "userName1": "thefrugaldev",
  "userName2": "caritobd91"
}
```

## Fragments

- https://graphql.org/learn/queries/#fragments
- _"Fragments are what make GraphQL composable"_
- Allow for reusability and avoid repeating similar queries
  - Prevents common manual mistakes when additional fields are added later
- Fragments are defined using the **_fragment_** keyword and also have identifying names/classes similar to **_Queries_**
- Fragments also specify which type the fragment can be used
- To use a fragment in an operation, prefix the object name with spread operator
- Fragments usually map one-to-one to different components within a UI

  - Every component within the UI will have an associated fragment in the GraphQL document
  - The allows the different components to own **_only_** the parts of the overall data schema that they care about (Single Responsibility Principle??)

```javascript
query TwoUsers($userName1: String!, $userName2: String!) {
  github {
    user1: user(username: $userName1) {
      ...UserInfo
    }
    user2: user(username: $userName2) {
      ...UserInfo
    }
  }
}

fragment UserInfo on GithubUser{
  id
  company
  avatar_url
}

//Variables
{
  "userName1": "thefrugaldev",
  "userName2": "caritobd91"
}
```
