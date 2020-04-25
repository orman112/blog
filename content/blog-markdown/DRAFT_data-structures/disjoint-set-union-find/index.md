---
title: Disjoint-Set/Union-Find
published: false
date: ""
tags: ["data structures"]
---

# Disjoint-Set/Union-Find Data Structure

> _Note: All illustrations below are from the Algorithms, Part I course on [Coursera](https://www.coursera.org/learn/algorithms-part1). I plan to circle back and provide my own implementations of the structures/algorithms covered in this series at a later date._

A _disjoint-set_ (also referred to as a _union-find_ data structure) is a data structure that tracks a set of elements partitioned into a group of disjoint subsets (_connected components_)

![](./connected-components-illustration.png)

**Dynamic Connectivity**

- A dynamic connectivity structure maintains information about the connected components of a graph.
- Given a set of _N_ objects:
  - Connect two objects (**_Union_ command**)
  - Determine if there is a path connecting two objects (**_Find_ query**)

![Union-Find Illustration](./example-illustration.png "union find illustration")

**Quick Find**

- Algorithm used to solve the dynamic [connectivity problem](#DynamicConnectivity).
- _Find_ is a very efficient command in this algorithm as it is in constant time.
  - Given id[] of size _N_ check if p and q are connected:
  - `id[p] === id[q]`
- _Union_ is measured in quadratic time as the time to solve is dependent on the size of the array and the number of values that must change as a result.
  - When changing a value of `id[q]`, you much change all entries who value is equal (connected) to `id[q]` as well.

![Quick-Find Illustration](./quick-find-illustration.png "quick find illustration")
