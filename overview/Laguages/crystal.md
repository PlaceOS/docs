---
title: Crystal
description: Information and Resources related to the Crystal Programming Language
sidebar_position: 1
---

## Overview

Crystal is a programming language with the following goals:

* Have a syntax similar to Ruby (but compatibility with it is not a goal)
* Statically type-checked but without having to specify the type of variables or method arguments.
* Be able to call C code by writing bindings to it in Crystal.
* Have compile-time evaluation and generation of code, to avoid boilerplate code.
* Compile to efficient native code.

## Why Crystal?

Security: we can distribute a single static binary in a docker container, there is little chance of exploit.

Speed: the binaries are seriously fast, see [Spider-Gazelle](https://github.com/spider-gazelle/).

Developer happiness: all the benefits of Go Lang with the elegance of Ruby.

## Resources

### Installing Crystal

[Follow these instructions](https://crystal-lang.org/install)

###  Crystal Documentation

* [Language Reference](http://crystal-lang.org/reference)
* [Standard library API](https://crystal-lang.org/api)
* [Roadmap](https://github.com/crystal-lang/crystal/wiki/Roadmap)

## Spider-Gazelle

Spider-Gazelle is a Rails esque web framework with a focus on speed and extensibility for Crystal Lang. 

Spider-Gazelle is up to 35 times faster than Ruby on Rails.

![Speed Rankings](./assets/ranking.png)

### Reources

### Github

[Spider-Gazelle on Github](https://github.com/spider-gazelle/)

### Documentation

[Spider-Gazelle Documentation](https://spider-gazelle.net/#/)
