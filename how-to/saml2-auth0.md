---
title: Configure SAML2 with Auth0
description: Steps required for enabling SAML2 sign on for PlaceOS with Auth0
sidebar_order: 7
---

Use this page in tandem with [Configuring PlaceOS for SAML2](configure-saml.md) if you are using Auth0 domains for SSO.
You should follow [Auth0 instructions](https://auth0.com/docs/dashboard/guides/applications/register-app-spa) to a register a single-page-app for SAML SSO using Auth0.


## Configuration

* The `Name` of the application can be the domain name of your instance of PlaceOS 
* On the `Addons` tab, enable SAML2 Web App and use [these steps](https://auth0.com/docs/protocols/saml/saml2webapp-tutorial) as a guide
* Set the `Application Callback URL` to match the `Assertion URL` in PlaceOS, e.g. `https://auth/adfs/callback?id=adfs-XXXXXX`
* Paste in the below for `Settings`:

  ```json
  {
    "mappings": {
        "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
        "first_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
        "last_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
        "login_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/windowsaccountname"
    }
  }
  ```

*[SSO]: Single Sign On