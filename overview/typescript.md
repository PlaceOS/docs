---
title: Typescript
description: Typescript is an open-source language which builds on JavaScript
sidebar_position: 8
---

## Overview

TypeScript is an open-source language which builds on JavaScript, one of the world’s most used tools, by adding static type definitions.

Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.

## Typescript and Angular

Angular applications can only be built with Typescript.
As Angular is the predominant language used for PlaceOS Frontend Applications this makes Typescript a requirement.

### Versioning

For Typescript, the version is dictated by the Angular version.

Angular 12 (currently used by PlaceOS Frontends) supports Typescript version 4.2.4.

## Typescript References and Tooling

The [Typescript Handbook](https://www.typescriptlang.org/docs/handbook) provides detailed documentation specifically related to Typescript. 

PlaceOS use [NX](https://nx.dev/) which is a suite of powerful tools to assist with testing and building Javascript Applications.

NX adds [Jest](https://jestjs.io/) for Unit Testing and [Cypress](https://www.cypress.io/) for Integration and End-to-End Testing.

The [Angular CLI](https://angular.io/cli) is a command-line interface that lets you develop, scaffold and maintain Angular applications and is used with PlaceOS Frontend Applications.

## Automated Browser Testing

Automated browser testing may be used to validate application test cases. Any [Selenium](https://www.selenium.dev/) based automated test suite would be suitable for this purpose, including tools such as [Katalon Studio](https://www.katalon.com/).

