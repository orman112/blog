---
title: Getting Familiar with Redis Data Types
published: true
date: "2019-09-25"
tags: ["technology", "redis"]
unsplash-image-id: "t0SlmanfFcg"
description: "I've been interested in learning more about Redis, and when work presented me the opportunity, I jumped right in. In this post, I'll explore some of the common data types in Redis and when it makes sense to use each. I'll also provide some funny, real-world examples."
---

[Redis](https://redis.io/) is an open-source, in-memory data store. Although there are many use cases, including acting as a message broker, Redis is commonly used as a caching mechanism. I've recently been looking into utilizing this caching service at work. With that in mind, I figured I would write up a quick post about some of the more common data types supported in Redis, and when you might expect to use them.

> _Note: All examples below are utilizing the `redis-cli` but feel free to follow along using the [playground](https://try.redis.io/)._

## **Keys**

If you are already somewhat familiar with caching, you'll understand that most values are retrieved using a _key_ to lookup said value. In typical caching systems, this key is represented by a primitive string. In Redis, however, keys are binary safe, which means that you can use something as simple as "thefrugaldev" as your key, or something as complex as the content of a JPEG file. With that being said, it is [recommended on their docs](https://redis.io/topics/data-types-intro#redis-keys) to stick with a schema (ex: "object-type:id") rather than really condensed or complex keys, as this can have an impact on lookup performance. Keys can also be assigned for a [limited (expiry) time](https://redis.io/commands/expire) as seen in the example below.

### **Example**

```bash
> set key some-value
OK

# Expire key after 5 seconds
> expire key 5
(integer) 1

# Get TTL for key
> ttl key
(integer) 5

# Get key after TTL has expired
> get key
(nil)
```

## **Strings**

Strings are the most basic kind of Redis data type and have a max value of 512 MB. Strings, similar to keys in Redis, are binary safe, meaning they can contain any type of data including JPEG images, serialized objects, etc.

### **When to use strings**

Strings are useful when you need to encode a lot of data in a little amount space. This may include caching HTML fragments or pages. Because Redis does not have a dedicated integer type, strings can also be used to represent a base-10, 64-bit signed integer. Built-in Redis commands including [INCR](https://redis.io/commands/incr) (increment) or [DECR](https://redis.io/commands/decr) (decrement) can then be used to adjust these integer values.

### **Example**

```bash
> set thefrugaldev awesome
OK

> get thefrugaldev
"awesome"
```

## **Lists**

If you are familiar with Linked List data types, you are already on your way to understanding Lists in Redis. Lists in Redis are essentially Linked Lists of [string values](#Strings), sorted by insertion order. A List in Redis offers a very generous max length of 2<sup>32</sup> - 1 elements (more than 4 billion elements). Similar to a Linked List, when elements are added to a Redis List they can be inserted at the head (beginning) or tail (end) of the list very quickly since it's an O(N) operation. However, these operations can become super slow if you're accessing anything near the middle of a very large list.

### **When to use lists**

A very common use case for Redis Lists is the social network example. [Twitter uses Redis Lists](https://www.infoq.com/presentations/Real-Time-Delivery-Twitter/) to display the latest tweets in a real-time approach. Redis also recommends using lists for communication between processes, where one (the producer) pushes elements onto the list and then the other (consumer) pulls the items off the list and takes some action.

### **Example**

```bash
# Create a new list
# todolist: "cut the grass"
> lpush todolist "cut the grass"
(integer) 1

# Add a new item to the list
# todolist: "cut the grass", "make the bed"
> rpush todolist "make the bed"
(integer) 2

# Add an item to the beginning of the list
# todolist: "pay the electricity bill!", "cut the grass", "make the bed"
> lpush todolist "pay electricity bill!"
(integer) 3

# Remove an item from the list
# todolist: "pay the electricity bill!", "cut the grass"
> rpop todolist
"make the bed"
```

## **Sets**

Redis Sets are an _unordered_ collection of strings. Because there is no guarantee on the order in which a set is returned to the user, operations are always _O_(1), or constant time, regardless of the number of elements within the set. Sets in Redis will never allow repeated members, so adding the same element multiple times will still result in the set only containing one copy of the element. This means that adding an element does not require an initial check to see if it already exists within the set. Unions, intersections, difference operations are all possible with Redis sets and are executed rather quickly.

### **When to use sets**

Sets are great for identifying relationships between entities. For example, keeping track of the individuals that make up a team. Because set values are always unique, another good example for utilizing sets is keeping track of unique visitors to a website or webpage.

### **Examples**

```bash
# Create a set for an amazing basketball team
> sadd "chicago bulls" "michael jordan" "scottie pippen" "dennis rodman" "luc longley" "ron harper"
(integer) 5

# Get all the members in the set
# note that the returned set is not in the order they were added
> smembers "chicago bulls"
1) "scottie pippen"
2) "michael jordan"
3) "luc longley"
4) "dennis rodman"
5) "ron harper"

# Determine if a given value is a member of a set
> sismember "chicago bulls" "michael jordan"
(integer) 1

> sismember "chicago bulls" "larry bird"
(integer) 0
```

## **Hashes**

Redis Hashes are maps between string fields and string values, and are great for storing more complex data. With that in mind, they are perfect for representing objects and, like [lists](#Lists), hashes can store more than 2<sup>32</sup> - 1 (4 billion) field-value pairs.

### **When to use sets**

If you're familiar with object-oriented programming, which I'm assuming a lot of you are, Hashes are a great way to represent and cache these objects. One great example I've read while
researching is inventory information for an e-commerce site.

### **Examples**

```bash
# Create a Hash and set multiple values at once
> hmset developer:001 "username" "thefrugaldev" "height" "5'10" "favorite beer" "bourbon"
OK

# Get the value associated with a hash field
> hget developer:001 "favorite beer"
"bourbon"

# Get all the fields and values in a hash
> hgetall developer:001
1) "username"
2) "thefrugaldev"
3) "height"
4) "5'10"
5) "favorite beer"
6) "bourbon"
```

### **Sorted Sets**

Sorted sets are similar in nature to [sets](#Sets), where they are non-repeating collections of strings. There is a subtle difference in that every member of a sorted set is associated with a score. **Scores** are a range of integers that can be expressed precisely. Sorted sets use a double 64-bit floating point number to represent the score, and this is what will ultimately be used to sort the given set.

While members of a sorted sets are unique, similar to [sets](#Sets), scores may be repeated. Sorted sets begin sorting the set as items are added, which is an _O_(log(_n_)) operation. This improves performance when retreiving an element from the sorted set, making it an _O_(1), or constant time, operation because it's already sorted.

Assuming an element is added to a sorted set with a unique score, the element will be sorted on that score appropriately. However, if the score provided is similar to another score already in the set, the elements will be sorted lexographically (alphabetically). One other thing to note, sorted sets are variadic, meaning they have an indefinite arity, or the number of arguments a function accepts.

### **When to use sorted sets**

One of the best examples I've come across in relation to using sorted sets comes from Redis' own [documentation](https://redis.io/documentation). There are many commands to use when keeping track of leaderboards in an online multiplayer game, including [ZADD](https://redis.io/commands/zadd) when a new score is submitted, [ZRANGE](https://redis.io/commands/zrange) to pull the top of the leaderboard, and [ZRANK](https://redis.io/commands/zrank) to find a specific users' ranking, all with impressive speed.

### **Example**

```bash
# Create a sorted set with multiple members
> zadd "college football team rankings" 1 "georgia bulldogs" 3 "alabama crimson tide" 130 "florida gators" 2 "clemson tigers" 9 "notre dame" 6 "oklahoma sooners" 7 "auburn tigers" 5 "ohio state buckeyes" 8 "wisconsin" 4 "lsu tigers"
(integer) 10

# Get the score of individual members
> zscore "college football team rankings" "georgia bulldogs"
1.0
> zscore "college football team rankings" "florida gators"
130.0

# Return a range of members in a sorted set, by index
> zrange "college football team rankings" 0 8
1) "georgia bulldogs"
2) "clemson tigers"
3) "alabama crimson tide"
4) "lsu tigers"
5) "ohio state buckeyes"
6) "oklahoma sooners"
7) "auburn tigers"
8) "wisconsin"
9) "notre dame"
```

These are just some of the common data types I've run across while initially exploring Redis. If you'd like to explore further, a full list of data types with their associated commands can be found [here](https://redis.io/commands). I hope you've had some fun following along and enjoyed learning about some of the more useful data types in Redis; I know I did.
