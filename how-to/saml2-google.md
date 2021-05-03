---
id: saml2-google
title: Configure SAML2 with Google Workspace
description: Steps required for enabling SAML2 sign on for PlaceOS on Google Workspace
sidebar_order: 5
---

PlaceOS uses a Custom SAML App to provide integrated SSO via Google User Authentication. 
For detailed steps, see [Google's guide on setting up SAML](https://support.google.com/a/answer/6087519?hl=en)

PlaceOS requires:
- Organization data
- Organization path
- Users full name
- Email address
- Unique identifier

You may need to map these as attribute claims.

## Configuring PlaceOS
Parameters required from PlaceOS for Configuration:

### ACS URL
Assertion Consumer Service.
This is where google will send authentication responses with all the claim information.

Example: `https://staffapp.placeos/auth/adfs/callback?id=adfs-XXXXX`

### Entity ID
The Entity ID is the Audience Restriction.
It dictates the intended entity or audience for the SAML Assertion. 
This field is frequently referred to as the "Entity ID" or "Audience URI" by vendors. 
It can technically be any string of data up to 1024 characters long.
Most commonly it's in the form of a URL that contains the Service Provider's name, and is often the same URL as the ACS.

### Start URL
This the URL that will start the authentication flow.

Example: `https://staffapp.placeos/auth/adfs?id=adfs-XXXXX`

### Metadata URL
You can provide this URL to Google to help with the setup process.

Example: `https://staffapp.placeos/auth/adfs/metadata?id=adfs-XXXXX`

