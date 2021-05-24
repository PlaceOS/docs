---
title: TypeScript
description: TypeScript is an open-source language which builds on JavaScript
sidebar_position: 2
---

## Overview

[TypeScript](https://www.typescriptlang.org/) is an open-source language which builds on JavaScript by adding static type definitions.
Types provide a way to describe the shape of an object, provide better documentation, and allow TypeScript to validate your code.

## TypeScript and Angular

Angular applications must be built with TypeScript.
As PlaceOS frontend applications are mainly written in Angular, they need TypeScript.

### Versioning

TypeScript version depends on your Angular version.

PlaceOS Frontends uses Angular 12 and TypeScript 4.2.4.

## TypeScript References and Tooling

The [TypeScript Handbook](https://www.TypeScriptlang.org/docs/handbook) provides detailed documentation specifically related to TypeScript. 

PlaceOS uses [NX](https://nx.dev/) tools to assist with testing and building JavaScript Applications.

NX adds [Jest](https://jestjs.io/) for Unit Testing and [Cypress](https://www.cypress.io/) for Integration and End-to-End Testing.

The [Angular CLI](https://angular.io/cli) lets you develop, scaffold and maintain Angular applications. 
It's used with PlaceOS frontend applications.

## Automated Browser Testing

Automated browser testing can check application test cases. 
Any [Selenium](https://www.selenium.dev/) based automated test suite would be suitable for this purpose.
One possible tool is [Katalon Studio](https://www.katalon.com/).

*[CLI]: Command-line Interface