---
title: TypeScript
description: TypeScript is an open-source language which builds on JavaScript
sidebar_position: 8
---

## Overview

TypeScript is an open-source language which builds on JavaScript by adding static type definitions.

Types provide a way to describe the shape of an object, providing better documentation, and allowing TypeScript to validate that your code is working correctly.

## TypeScript and Angular

Angular applications can only be built with TypeScript.
As Angular is the predominant language used for PlaceOS frontend applications this makes TypeScript a requirement.

### Versioning

For TypeScript, the version is dictated by the Angular version.

Angular 12 (currently used by PlaceOS Frontends) supports TypeScript version 4.2.4.

## TypeScript References and Tooling

The [TypeScript Handbook](https://www.TypeScriptlang.org/docs/handbook) provides detailed documentation specifically related to TypeScript. 

PlaceOS use [NX](https://nx.dev/) which is a suite of powerful tools to assist with testing and building JavaScript Applications.

NX adds [Jest](https://jestjs.io/) for Unit Testing and [Cypress](https://www.cypress.io/) for Integration and End-to-End Testing.

The [Angular CLI](https://angular.io/cli) is a command-line interface that lets you develop, scaffold and maintain Angular applications and is used with PlaceOS Frontend Applications.

## Automated Browser Testing

Automated browser testing may be used to validate application test cases. 
Any [Selenium](https://www.selenium.dev/) based automated test suite would be suitable for this purpose, including tools such as [Katalon Studio](https://www.katalon.com/).
