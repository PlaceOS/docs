---
title: PlaceOS Skills
description: Skills required to work with and develop PlaceOS
---

When working with PlaceOS there is a set of high-level system areas, each with their own skill domains. 

The following information provides a guide to internal and external skills required in each domain.

## Configuration and Management

This is the core area of PlaceOS specific knowledge. 

All interaction is via Backoffice and encompasses effort to structure, integrate and deploy existing drivers and user interfaces with an already deployed base platform.

**External Knowledge:**
* `JSON` or `YAML` for Settings.
* Identity providers (SAML, OAuth2) for integrating platform authentication as well as service integrations.
* Familiarity with any external services, devices or systems that will integrate with PlaceOS. 
* Base level networking knowledge to be able to identify potential communication issues.

**PlaceOS Specific Knowledge**
* Core platform concepts - [drivers](../overview/drivers.md), [modules](../overview/modules.md), [zones](../overview/zones.md), [systems](../overview/systems.md)
* Backoffice User Interface and how to configure the above concepts
* [Triggers](../overview/triggers.md)
* Driver monitoring - comfort with and ability to watch a driver and debug connectivity or configuration issues

## Platform Deployment and Infrastructure

Deployment and provisioning of infrastructure for a PlaceOS instance within a client’s environment.

**External knowledge:**
* Containers
* Container orchestration (Kubernetes, or cloud vendor managed versions of this)
* Distributed applications within a web app context
* Linux system administration
* AWS / Google Cloud / Azure knowledge as appropriate if deploying to a hosted environment
* Distributed log tracing (ELK stack, or hosted equivalents)
* Strong networking ability
* Infrastructure security / blue team knowledge

**PlaceOS specific knowledge:**
* PlaceOS service architecture.
* Deployment tooling / configuration scripts.

## Driver Development

Further information can on driver development is in the [driver development tutorial](../tutorial/backend/write-a-driver.md).

**External knowledge:**
* Experience with Crystal Lang or Ruby
* Understanding of Git and Version Control

**PlaceOS Specific Knowledge:**
* Core platform concepts - [drivers](../overview/drivers.md), [modules](../overview/modules.md), [zones](../overview/zones.md), [systems](../overview/systems.md)
* Driver monitoring - comfort with and ability to watch a driver and debug connectivity or configuration issues

## Interface Development

### Mobile Application Development

No PlaceOS specific tooling exists in this space, the platform does expose a [RESTful API](api.md) and WebSocket endpoint for usage within native apps.

### Browser-based Application Development

For more information on development and tooling see the [TypeScript overview](../overview/Languages/typescript.md).

**External knowledge:**
* Modern web app development (SPA’s)
* Angular and associated tool chain (if using PlaceOS interface templates)
* TypeScript

**PlaceOS specific knowledge:**
* Core platform concepts - drivers, modules, zones, systems.
* PlaceOS APIs
* PlaceOS TypeScript client
* Composer
* Familiarity with PlaceOS interface templates and associated project structure.
