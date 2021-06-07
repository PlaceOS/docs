---
title: OAuth2
description: OAuth2 Standard Overview and Use with PlaceOS
sidebar_position: 3
---

## Overview

OAuth is an open standard for access delegation, commonly used as a way for internet users to grant websites or applications access to their information on other websites but without giving them the passwords.

OAuth provides clients secure delegated access to server resources on behalf of the owner.  
It specifies a process for resource owners to allow third-party access to their server resources.
Most importantly, it allows access without providing credentials.  

OAuth works directly with HTTP.
It issues access tokens to third-party clients through an authorization server.  
The resource owner approves which tokens get issued.
The third party then uses the token to access the protected resources hosted by the resource server.


## OAuth2 in PlaceOS

PlaceOS uses the OAuth Standard (OAuth2) to integrate to third-party services including:
- Microsoft Graph API
- Google API
- Cisco Meraki

OAuth provides PlaceOS access to read and write specific information needed for our application.

The Service Provider (SP) can impose extra permissions and scopes including read/write permissions.  

PlaceOS also offers OAuth Access to our Staff and Booking API.  

## Resources

- [OAuth2 Official Site](https://oauth.net/2/)
- [OAuth2 RFC](https://datatracker.ietf.org/doc/html/rfc6749)

*[HTTP]: Hypertext Transfer Protocol