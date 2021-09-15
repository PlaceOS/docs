---
id: configure-saml
title: Configure PlaceOS for SAML
description: Steps required for enabling SAML sign on for users logging in to PlaceOS web apps
sidebar_position: 1
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

This will open up the SAML form.
Here is a description of each field:

- `Name`: generic field for identifying the SSO
- `Issuer (Identifier / Entity ID)`: this is what the SSO will use to identify this SSO integration
    -  Can be anything, typically use the DNS entry i.e. `staffapp.company.com`
    -  Azure will be in the format: `spn:**client-id**`
      - "Application (client) ID" can be found on the Overview page of your App Registration
    -  OKTA will need the Issuer to be configured in the OKTA Application to match the value set here
- `IDP target URL`: This is the URL where SSO will occur - the login page
    -  You can often guess it, but you can set it to any valid URL and change it later
    -  Request this URL when sending the metadata URL
    -  Azure AD URLs are often in the format: `https://login.microsoftonline.com/**tenant-ID**/saml2`
    -  OKTA URLs are often in the format: `https://**okta.domain.com**/app/**app-name**/**app-id-number**/sso/saml`
    -  ADFS URLs are often in the format: `https://adfs.myorganistaion.com/adfs/ls`
    -  Auth0 URLs are often in the format: `https://myorganisation.auth0.com/samlp/`
- `Name Identifier Format`: the format of the response data
    -  Set to `urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified`
- `Request Attributes`: these are the Active Directory fields requested to be sent to us
    -  Typically leave this blank on first save, and it will fill in the default value
    -  Clients sometimes request you change these to match their system
    -  Example:

  | Name | Name_format | Friendly_name |
  | --- | --- | --- |
  | email | urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified | Email Address |
  | first_name | urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified | Given Name |
  | last_name | urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified | Surname |

- `Assertion URL (Reply URL / Callback URL)`: the PlaceOS URL that SSO sends data back to - to log someone in
    -  First set this to the base domain of the application.
    After saving this configuration for the first time, it will generate an ID (`adfs_strat-XXXXXX`)
    -  See the image below and use the generated unique ID to build the Assertion URL
- `Certificate Fingerprint / Full Certificate`: used for verifying a signed login request
    -   Not required until after SSO configuration on the client-side
- `UUID Attribute`: allows you to override the default unique ID returned by SSO to one of the requested attributes
- `Attribute Statements`: This maps requested attributes to database fields
    -  Typically leave this blank on first save, and it will fill in the default value
    -  Example:

  | Name | Mappings |
  | --- | --- |
  | email | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` |
  | first_name | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname` |
  | last_name | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname` |
  | login_name | `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress` |

Once you click save, it will generate an authentication ID.
You can find it in the `/saml_auths` response on the Authentication tab.

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
From the above steps you will need:
- The **Issuer** (also known as the **Identifier**)
- The **Assertion URL** (also known as the **Callback URL**)
- The **Login URL** which is the homepage of the app
- The **Metadata URL** (optional)  

This XML file contains the above information and can be fed into to some configuration dashboards (like ADFS).

This process will vary by provider, see the below guides for common options:

- [Azure AD](saml2-azure.md)
- [AD FS](saml2-adfs.md)
- [Auth0](saml2-auth0.md)
- [Google Workspace](saml2-google)

## Configure default redirects for the PlaceOS Domain
<!-- All images from here down need new screenshots -->
Once you have tested the Login URL above you can update the default login page for the domain.

- Click the edit icon for the Domain (above the authentication tab)
- Set the login URL to `/auth/login?provider=adfs&id=[ADFS-ID-HERE]&continue={{url}}`, replacing the `[ADFS-ID-HERE]` and leaving the `{{url}}` as is
- Set the logout URL to `/auth/logout?continue=https://sso.org.com/logout` if they haven’t provided you a logout


<!-- ![Image alt-text](images/image2.png "image_tooltip") -->
<!-- May require more of the words from old Engine configiure-saml.md depending on Backoffice screenshot detail & content -->

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
4. Go through the login flow

The request coming back to the assertion URL is the one you want to inspect.

Assertion URL: `/auth/adfs/callback?id=[ADFS-ID-HERE]`


<!-- ![Image alt-text](images/image3.png "image_tooltip") -->


Copy and paste the SAML response into the SAML decoder.


### Docker logs

Look for the text **"Callback phase initiated"** and the SAML response data is nearby.


<!-- ## Example -->

<!-- ![Image alt-text](images/image4.png "image_tooltip") -->

<!-- ![Image alt-text](images/image5.png "image_tooltip") -->


*[AD FS]: Active Directory Federation Services
