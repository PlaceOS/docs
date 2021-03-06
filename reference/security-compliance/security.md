---
title: Security
description: General security and encryption information about PlaceOS
---

A core challenge that PlaceOS solves is providing a secure way to connect and interact with physical spaces. 

Deployments form an interface that isolates individual hardware components and subsystems of a building from direct communications. 

Connectivity to these is then provided by a modern API service that supports regular patching and updates to safely support integration.

## Data in Transit

PlaceOS APIs and static resources are served over HTTPS only.

### Supported Protocols

* TLS v1.2
* TLS v1.3

### Supported Ciphers

* EECDH+AESGCM
* EDH+AESGCM
* AES256+EECDH
* AES256+EDH

Unique Diffie-Hellman parameters are generated for each new server.

SSL certificates can be provided and signed by your internal CA or generated by Place Technology and signed by [Let’s Encrypt](https://letsencrypt.org).

## Data at Rest

Minimal configuration information is stored on disk as part of the on-premise infrastructure. 

All system settings support encryption via AES256-GCM. 

This is stored by the data service and includes:

|Information Type |Description |
|---| ---|
|System and Zone configuration|<ul><li>System (room) / Zone names</li><li>System / Zone descriptions</li><li>Room resource mailbox address (if using a calendar integration)</li><li>System / Zone settings</li></ul>|
|Device Settings|<ul><li>Device name</li><li>Device description</li><li>Device configuration</li><li>Device role based account username</li><li>Device role based account password (encrypted) </li></ul>|
|Device metadata|<ul><li>1 month history of online/offline status of each device</li></ul>|
|User data|<ul><li>Email address</li><li>First and last name</li><li>Username</li><li>User’s permissions within PlaceOS application</li><li>Federated authentication source</li></ul>|

The search service stores an optimised index of system, zone and device names and descriptions.

## Authentication

All API requests use short-lived Auth tokens obtained via OAuth2.

Authentication for token creation takes place via an external identify service (SSO). 

Options include SAML2 and OAuth2.

No PlaceOS components store or have access to SSO user credentials at any point during authentication.

In cases where an external identify provider is not available (dev / staging environments), local role-based accounts may be created. 

Credentials for these are encrypted using scrypt (256 bit AES using GCM ciphers) prior to storage. 

No “default” passwords exist for these.

## Privacy 

No information is ever transmitted externally by the platform. 

Default deployment configurations do not include any remote telemetry, data collection or remote components.

Information collected by device and service integrations is dependent on driver functionality and versions used. 

All drivers are open source and individually auditable within each deployment.