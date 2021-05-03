---
id: configure-saml
title: Configure PlaceOS for SAML
description: Steps required for enabling SAML sign on for users logging in to PlaceOS web apps
sidebar_order: 3
---

By default, PlaceOS uses local authentication. 
An admin account is generated upon initial deployment. 
The administrator can manually create user accounts in Backoffice (on the Users tab).
We recommend switching to federated authentication. 

## Prerequisites
1. Confirm the final UAT and PROD URLs of the web apps
2. Ensure that the **DNS** entries for these URLs are active and forwarding to the server(s)
3. Ensure that the SSL certificates for the above domains are signed and recognized as secure


## Step 1: Adding Authentication

1. Login as an admin to Backoffice
2. On the **Domains** tab, select the Domain that represents the URL where you wish to enable SAML
3. In the **Authentication** section click **Add new** 
<!--  , select "**SAML2 / ADFS**"  -->

This will open up the SAML form. 
Here is a description of each field:

- `Name`: generic field for identifying the SSO
- `Issuer (Identifier / Entity ID)`: this is what the SSO will use to identify this SSO integration
    -  Can be anything, typically use the DNS entry i.e. `staffapp.company.com`
- `IDP target URL`: This is the URL where SSO will occur - the login page
    -  You can often guess it, but you can set it to any valid URL and change it later
    -  Request this URL when sending the metadata URL
- `Name Identifier Format`: the format of the response data
    -  Typically leave this blank unless requested, and it will fill in the default value
- `Request Attributes`: these are the Active Directory fields requested to be sent to us
    -  Typically leave this blank on first save, and it will fill in the default value
    -  Clients sometimes request you change these to match their system
- `Assertion URL (Reply URL / Callback URL)`: the PlaceOS URL that SSO sends data back to - to log someone in
    -  First set this to the base domain of the application. 
    After saving this configuration for the first time, it will generate an ID (`adfs-XXXXXX`)
    -  See the image below and use the generated unique ID to build the Assertion URL
- `Certificate Fingerprint / Full Certificate`: user for verifying a signed login request
    -   Not required until after SSO configuration on the client-side
- `UUID Attribute`: allows you to override the default unique ID returned by SSO to one of the requested attributes
- `Attribute Statements`: This maps requested attributes to database fields
    -  Typically leave this blank on first save, and it will fill in the default value

Once you click save, it will generate an authentication ID.
You can find it in the `/saml_auths` response on the Authentication tab:

<!-- ![Image alt-text](image1.png "image_tooltip") -->


### URL configuration

1. Set the following fields to the corresponding URLs, replacing `adfs-XXXXX` with the generated ID:

    - Assertion URL (Reply URL / Callback URL): <i>`https://staffapp.placeos/auth/adfs/callback?id=adfs-XXXXX`</i>
    - Metadata URL: <i>`https://staffapp.placeos/auth/adfs/metadata?id=adfs-XXXXX`</i>
    - Login URL: <i>`https://staffapp.placeos/auth/adfs?id=adfs-XXXXX`</i>

2. Edit the authentication and update the Assertion URL with the one you have created above  
3. Email the client with:  
    - The Metadata URL so they can configure their systems
    - A request for their IDP target URL
    - A request for their logout URL if they have one (otherwise can redirect to company home page etc)
    - PlaceOS supports signed SSO but **not** encrypted.
    SSL transport means the SSO response payload is already encrypted

Once the client has configured their side, they’ll often ask you to change some information.
This could be the Issuer, or some request attributes.


## Step 2: Register a new service in your authentication provider

You will need to configure your SAML Identity provider dashboard.
This process will vary by provider, see the below guides for common options:

- [Azure AD](saml2-azure.md)
<!-- - [ADFS](saml2-with-adfs.md) -->
<!-- - [Auth0](saml2-with-auth0.md) -->

## Configure default redirects for the PlaceOS Domain
<!-- All images from here down need new screenshots -->
Once you have tested the Login URL above you can update the default login page for the domain.

- Click the edit icon for the Domain (above the authentication tab)
- Set the login URL to `/auth/login?provider=adfs&id=[ADFS-ID-HERE]&continue={{url}}`, replacing the `[ADFS-ID-HERE]` and leaving the `{{url}}` as is
- Set the logout URL to `/auth/logout?continue=https://sso.org.com/logout` if they haven’t provided you a logout 


<!-- ![Image alt-text](images/image2.png "image_tooltip") -->


## Debugging

The first step in this process should be to get the raw request.
Often you can see if a request attribute is not lining up to an attribute statement by inspecting the XML.

You can paste the resulting data into this [SAML Decoder](https://www.samltool.com/decode.php)

Then paste the XML into [Pretty Print](https://www.samltool.com/prettyprint.php) (so it’s readable)

There are two methods of getting SSO data, described below:

1. If you have an account you can use to test  
2. If the client is logging in and you have access to logs


### Self Check

1. Open the Chrome or Firefox inspection tool
2. Go to the network tab
3. Select: **preserve log**
4. Go through the login flow. 
The request coming back to the assertion URL is the one you want to inspect. 
Assertion URL: `/auth/adfs/callback?id=[ADFS-ID-HERE]`


<!-- ![Image alt-text](images/image3.png "image_tooltip") -->


Copy and paste the SAML response into the SAML decoder.


### Docker logs

Look for the text **"Callback phase initiated"** and the SAML response data is nearby


## Example


<!-- ![Image alt-text](images/image4.png "image_tooltip")


![Image alt-text](images/image5.png "image_tooltip") -->

*[ADFS]: Active Directory Federation Services