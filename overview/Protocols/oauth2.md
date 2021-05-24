---
title: OAuth2
description: Overview of the 2 types of drivers
sidebar_position: 3
---

## Overview

OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

OAuth provides clients a "secure delegated access" to server resources on behalf of a resource owner. 

It specifies a process for resource owners to authorize third-party access to their server resources without providing credentials. 

Designed specifically to work with Hypertext Transfer Protocol (HTTP), OAuth essentially allows access tokens to be issued to third-party clients by an authorization server, with the approval of the resource owner. 

The third party then uses the access token to access the protected resources hosted by the resource server.

## OAuth2 in PlaceOS

PlaceOS uses the OAuth Standard (OAuth2) to integrate to various third-party services, including:
- Microsoft Graph API
- Google API
- Cisco Meraki

Per design, OAuth provides PlaceOS authorised access to read and modify specific informaion within the scope of our application.

Additional permissions and scopes can be imposed by the service provider (SP) including read/write permissions. 

PlaceOS also offers OAuth Access to our Staff and Booking API. 

## Resources

- [OAuth2 Official Site](https://oauth.net/2/)
- [OAuth2 RFC](https://datatracker.ietf.org/doc/html/rfc6749)