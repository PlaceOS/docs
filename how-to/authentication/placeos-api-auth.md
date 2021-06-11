---
title: PlaceOS API Authentication
description: Steps required for authenticating against the PlaceOS API
sidebar_position: 6
---

Access to PlaceOS is secured via [OAuth2](https://auth0.com/docs/authorization/which-oauth-2-0-flow-should-i-use#is-the-client-a-native-mobile-app-).
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

All applications using the PlaceOS API need to be registered in Backoffice. 
Details on this can be found in the [Add an Application](../backoffice/add-application.md) guide.

Once registered, take note of the: 
    * `client_id` 
    * `client_secret` 
    * `redirect_uri` (optional based on the auth flow your application will use)

## Obtaining An Access Token

Using OAuth2, a few approaches are available to obtain an access token. 

Here's some recommendations based on common API uses:

|Auth Flow |Recommended Use Case |
|---|---|
Implicit|Web, mobile and desktop apps communicating directly with the PlaceOS API.|
Authorization Code|Web, mobile and desktop apps where your back-end communicates with the PlaceOS API on behalf of a user.|
Password Grant|Server-to-server integration and highly trusted environments.|

### Implicit

Authentication and direct API access from client side applications can be safely achieved via the OAuth implicit flow without your application needing to intercept any user details. 

This allows federated identity services to be used and your users security and privacy to be preserved.

All interaction within this flow takes place within a client-side user agent, making it a great choice for standalone apps.

To authenticate you will need to direct users to the authorisation endpoint, accompanied by your registered application details.

//link to apiary

Your users will then be prompted to authenticate via your configured identity provider and authorize your application. Once access is granted they will then be returned to your redirect URL with the access token included as a URI fragment.

`https://<your registered redirect URI>#access_token=<token>`

Your application may then parse this token and use it for API requests.

:::tip
URI fragments can be accessed from JavaScript with `document.location.hash`.
:::

:::caution
If you included a `state` parameter (you should), this will also be returned and should be validated against your original request prior to commencing any interaction.
:::


### Authorization Code

When building application that contains server-side components you may find a need to provide users the ability to grant your infrastructure access to interact with the PlaceOS on their behalf. 

This is commonly encountered if you have staff or venue app and your PlaceOS deployment is not accessible from public networks, or you may be interacting with the API asynchronously or in response to events from other systems.

As with the implicit flow, at no point does your application require direct knowledge of user credentials.

Using this flow, users first authorize your application by creating a short-lived authorization code. 

This is then passed to your back-end components, where it can be redeemed for an access token.

To generate the authorisation code, direct your users to the authorisation endpoint with code as the requested response type.

//link to apiary

After authenticating and authorising your application, users will be redirected to your configured redirect URI with an authorisation code as part of the request parameters.

`https://<your registered redirect URI>/?code=<authorisation code>`

:::caution
This response will also include the `state` parameter if it was included in your original request. 
This should be validated before continuing.
:::

Your backend infrastructure may then extract this and exchange it for an access token that can be used to perform actions as the authorising user by using the token endpoint.


### Password Grant

The Oauth2 password grant flow provides a good option for server-to-server integration, or when designing a system where direct knowledge of both user, and application secrets is acceptable.

:::danger
This flow should not be used as part of any components distributed to users or un-trusted endpoints. 
This includes usage within client side code for web apps or mobile apps, including in compiled form.
:::

This flow provides the ability to directly exchange a username and password for an access token as a single request.

//link to apiary

## Session Lifetime

When receiving a token, the server response will include a token expiry - `expires_in` - which is the number of seconds the token is valid for. 
By default, this is 14 days. 
When this period has elapsed your application will need to obtain a new access token. 
This can be done either by repeating the original authentication flow, or using a refresh token if provided.

### Refresh Tokens

Along with the `access_token`, successful authentication requests may also contain a refresh_token. 
This can be used to renew the session at any time, extending access as long as both the application registration and user are still valid.

//link to apiary

### Token Revocation

To end a session, applications should request a token revocation. 
This will invalidate the token, preventing further use.

//link to apiary