---
id: configure-saml2
title: Configuring PlaceOS for SAML2
description: Steps required for enabling SAML2 sign on for users logging in to PlaceOS web apps
---

By default, Engine uses local authentication. 
An admin account is generated upon initial deployment and the administrator can manually create additional user accounts in the Backoffice \(on the Users tab\).

Switching to federated authentication is recommended. 
There are 3 steps required:

1. In Backoffice, create a new SAML2 Identity provider entry
2. In your organisation's SAML2 Identity provider dashboard \(e.g. Azure AD, ADFS, Auth0\), create the SAML2 Service provider for entry for Engine
3. Back in Backoffice, update the SAML2 Identity provider entry with the new details retrieved from step 2

## Prerequisites

1. The domain where users will visit to login must exist as a valid **DNS** entry 
2. Browsers should consider the domain secure: Valid **SSL certificates** should be in place and served by either your load balancer or the web server in front of Engine

## Step 1: Add a new SAML2 authentication source

1. Login as an admin to Backoffice \([https://&lt;engine-url&gt;/backoffice/\](https://`<engine-url>`/backoffice/%29\)
2. On the **Domains** tab, select the Domain that represents the URL you wish to enable SAML2 for
3. In the Authentication section click "Add new", select "**SAML2 / ADFS**"
4. In the "New Authentication Source" Window, 
   1. Enter a descriptive **Name** that represents your SAML2 Identity provider, e.g. "My Company ADFS" 
   2. Enter some temporary text (any text) into the "**IDP Target URL**" field. 
   It will be edited later with the correct details
   3. Enter some temporary text (any text) into the "**Assertion URL**" field. 
   It will be edited later with the correct details
   4. Paste the below default text into **Request Attributes**:
    ```json
        [
            {
                "name": "http://schemas.microsoft.com/ws/2008/06/identity/claimsclaims/objectidentifier",
                "name_format": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
                "friendly_name": "Unique ID"
            },
            {
                "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
                "name_format": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
                "friendly_name": "E-Mail Address"
            },
            {
                "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
                "name_format": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
                "friendly_name": "Given Name"
            },
            {
                "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
                "name_format": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
                "friendly_name": "Surname"
            }
        ]
    ```
   5. Paste the below default text into **Attribute Statements**:
    ```json
    {
        "email": [
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
        "first_name": [
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
        ],
        "last_name": [
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
        ],
        "login_name": [
            "http://schemas.microsoft.com/identity/claims/objectidentifier"
        ]
    }
    ```

5. Click **Save.** 
The authentication source will be saved with some default values
6. The new Authentication source will now appear in the list. 
**Copy the URL** to your clipboard
7. Click edit on the Authentication source which was created
   1. In the Assertion URL field, paste the URL which was copied in the previous step, but edit it to include "/callback"
   2. Example: If you copied _"_[https://engine.example-organisation.com/auth/adfs?id=adfs-XXXXXXXX](https://engine.example-organisation.com/auth/adfs?id=adfs-XXXXXXXX)_"_ then set the Assertion URL to "[https://engine.example-organisation.com/auth/adfs/callback?id=\*\*adfs-XXXXXXXX\*\*](https://engine.example-organisation.com/auth/adfs/callback?id=**adfs-XXXXXXXX**)_"_
   3. Click Save

## Step 2: Register a new service/app in your authentication provider

### Prerequisites

You will need to enter these details from Step 1 into your SAML2 Identity provider dashboard:

1. The **Assertion URL** \(also known as the **Callback URL**\)
2. The **Issuer** \(also known as the **Identifier**\)
3. The **Login URL** which is the homepage of the app \(e.g. [https://engine.example-organisation.com/app-name/](https://engine.example-organisation.com/app-name/)\)
4. Optionally, the **SAML2 Metadata URL**. 
This can XML file contains the above information and can be fed into to some configuration dashboard \(like ADFS\). 
For the engine auth source you created above in step 1.7, the metadata URL will be "[https://engine.example-organisation.com/auth/adfs/metadata?id=\*\*adfs-XXXXXXXX\*\*](https://engine.example-organisation.com/auth/adfs/metadata?id=**adfs-XXXXXXXX**)_"_

Follow the instructions for your Identity Provider:

* [Azure AD](saml2-with-azure-ad.md)
* [ADFS](saml2-with-adfs.md)
* [Auth0](saml2-with-auth0.md)

## Step 3: Update the SAML2 authentication source settings

You will enter these details from Step 2 into Backoffice:

### Prerequisites

1. **Issuer** \(also known as **Identifier**\): If your ID provider defines an Identifier instead of letting you define one, Update the auth settings to use the required Identifier

   For example, Azure AD defines fixed identifiers in the form `spn:00000000-0000-0000-0000-000000000000` where the 0 digits are the _Application \(client\) ID_, found on the Overview page of the Azure AD Application

2. **IDP Target URL** \(also known as **Assertion URL**\): This is the URL that Engine redirects users to in order to login with your SAML2 ID provider
   * Azure AD URLs are often in the format: [https://login.microsoftonline.com/\*\*&lt;tenant-ID&gt;\*\*/saml2](https://login.microsoftonline.com/**<tenant-ID>**/saml2)
   * ADFS URLs are often in the format: [https://adfs.myorganistaion.com/adfs/ls](https://adfs.myorganistaion.com/adfs/ls)
   * Auth0 URLs are often in the format: [https://myorganisation.auth0.com/samlp/](https://myorganisation.auth0.com/samlp/)

### Update Engine's new authentication settings

Start by clicking edit \(pen icon\) on the Authentication that was created in Step 1 _"Add a new SAML2 authentication source"_ \(top of this page\)

1. Replace the **Issuer** field with the Issuer from your SAML2 ID provider \(unless your SAML2 ID provider already matches\)
2. Replace the **IDP Target URL** field with the SAML2 Identity provider login URL that was generated in Step 2 _"Register a new service/app on your authentication provider"_
3. Click Save

### Test new settings

Now test logging in by copying the URL for the Authentication \(e.g. [https://engine.example-organisation.com/auth/adfs?id=adfs-XXXXXXXX](https://engine.example-organisation.com/auth/adfs?id=adfs-XXXXXXXX) \) and opening a new private browser window \(e.g. Chrome incognito, Edge InPrivate session\) and pasting in that URL. 
You should be redirected to your SAML2 ID provider's login page, and if successfully logged in, redirected again back to a the engine domain [https://engine.example-organisation.com/](https://engine.example-organisation.com/)

If there are errors, the configuration on either the ID provider of Engine side may need to be tweaked to match. 
A [SAML2 troubleshooting guide](https://auth0.com/docs/protocols/saml/saml-configuration/troubleshoot) should be followed or an [Engine Service Desk](https://support.acaprojects.com/) ticket can be raised for assistance. 
Once there are no login issues, this SAML2 authentication can be set as the default for the whole domain.

### Make the new SAML2 authentication option the default login

Still on the Domains tab, edit the DOMAIN by clicking the pen icon at the top right \(above the "Users" sub-tab\)

1. Replace the **Login URL** with `/auth/login?provider=adfs&id=[adfs-XXXXXXXXX]&continue=` where `[adfs-XXXXXXXXX]` is the ID from the PlaceOS SAML2 login URL
2. Replace the **Logout URL** with <i> `/auth/logout?continue=[SAML2_LOGOUT_URL]` </i> where `[SAML2_LOGOUT_URL]` is the logout URL provided by your SAML2 identity provider 
<!-- it doesn't like the question mark even in a code block? I feel like I had an issue raised about this -->
   1. Azure AD logout URLs are often in the format:  
`https://login.microsoftonline.com/saml2`
   2. ADFS logout URLs are often in the format:
`https://example-organisation.com/adfs/ls/?wa=wsignout1.0` 
   3. Auth0 logout URLs are often in the format:  
`https://example-organisation.com.auth0.com/samlp/logout`


*[ADFS]: Active Directory Federation Services