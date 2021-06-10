---
title: PlaceOS API Authentication
description: Steps required for authenticating against the PlaceOS API
sidebar_position: 6
---

Access to ACAEngine is secured via [OAuth2](https://auth0.com/docs/authorization/which-oauth-2-0-flow-should-i-use#is-the-client-a-native-mobile-app-).
Before interacting, your app or integration will need to authenticate and obtain a valid access token. 
Once authenticated, this token must accompany all requests.

This can either be included as an `Authorization` header (recommended):

```
http example.com/api/control/systems 'Authorization:bearer <access token>'
```

Or, as a query parameter:

```
http example.com/api/control/systems bearer_token==<access token>
```

## Registering Your Application

All applications using the ACAEngine API need to be registered in Backoffice. 
Details on this can be found in the Backoffice user guide.

Once registered, take note of the `client_id` and `client_secret` or `redirect_uri`, depending on the auth flow your application will use.

## Obtaining An Access Token

Using OAuth2, a few approaches are available to obtain an access token. 

Here's some recommendations based on common API uses:

|Auth Flow |Recommended Use Case |
|---|---|
Implicit|Web, mobile and desktop apps communicating directly with the ACAEngine API.|
Authorization Code|Web, mobile and desktop apps where your back-end communicates with the ACAEngine API on behalf of a user.|
Password Grant|Server-to-server integration and highly trusted environments.|

### Implicit

Authentication and direct API access from client side applications can be safely achieved via the OAuth implicit flow without your application needing to intercept any user details. 

This allows federated identity services to be used and your users security and privacy to be preserved.

All interaction within this flow takes place within a client-side user agent, making it a great choice for standalone apps.

To authenticate you will need to direct users to the authorisation endpoint, accompanied by your registered application details.

