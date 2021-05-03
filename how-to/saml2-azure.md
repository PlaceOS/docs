---
id: saml2-azure
title: SAML2 with Azure AD
description: Steps required for enabling SAML2 sign on for PlaceOS on Azure AD
sidebar_order: 4
---

This page will help you if you are using Azure Active Directory for SSO.
You will need to configure a new or existing "App Registration" to be the SAML2 identity provider for PlaceOS.

## Step 1 - New or Existing App Registration

1. Login to portal.azure.com and browse to [Azure AD > App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)
<!-- link internally to microsoft 365 setup page -->
2. Locate the existing app created for o365 Graph API access. 
If there isn't one yet, create a new app registration now.
You can use this app for both SSO and o365 Graph API access
   - To create a **new** app registration:
     - Name it and select the appropriate "Support Account types" (typically "Single tenant")
     - Paste the PlaceOS `Assertion URL` (generated in Step 1 of [Configuring PlaceOS for SAML2](configure-saml.md)) into the **Reply URL** field. 
    Leave the type as "Web". 
    Click **Register** to finish
   - To configure an **existing** app registration:
     - Navigate to Overview -> Redirect URIs
     - Paste the PlaceOS `Assertion URL` (generated in Step 1 of [Configuring PlaceOS for SAML2](configure-saml.md)) into the **Redirect URI** field.
     Leave the type as "Web". 
     Click **Save** to finish
3. Confirm that you have access to the [SAML2 Federation Metadata URL](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/azure-ad-federation-metadata) for your Azure Tenant. 
You will need data from this XML file later in Step 3, OR if you configure advanced custom claims. 
The file URL is generally in the format:
    `https://login.microsoftonline.com/<Tenant ID or Domain Name>/FederationMetadata/2007-06/FederationMetadata.xml`

## Step 2 - Edit the App Manifest

In the app Manifest, you need to edit `groupMembershipClaims` and `optionalClaims`. 

- Select the app from Step 1 from the list of [App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
Then select Manifest (near the bottom) from the menu on the left
- In the editor, set [`groupMembershipClaims`](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#configuring-group-optional-claims) to either `“All”` or `“SecurityGroup”`.
[This page](https://blogs.msdn.microsoft.com/waws/2017/03/13/azure-app-service-authentication-aad-groups/) may help you decide which is most suitable for your organization. 
If unsure, select `All`:
  - `“SecurityGroup”` - groups claim will contain the identifiers of all security groups of which the user is a member
  - `“All”` - groups claim will contain the identifiers of all security groups and all distribution lists of which the user is a member
- Set the value of the `optionalClaims`to include these 4 claims: `firstname`, `lastname`, `upn`, `email` in the saml2Token. 
An example is below:

  ```text
    "optionalClaims": {
        "idToken": [],
        "accessToken": [],
        "saml2Token": [
            {
                "name": "email",
                "essential": true
            },
            {
                "name": "upn",
                "essential": true
            },
            {
                "name": "family_name",
                "essential": true
            },
            {
                "name": "given_name",
                "essential": true
            }
        ]
    },
  ```

- Click Save

## Step 3 - Collect data required by Backoffice

The App Registration is now configured for PlaceOS. 
Two pieces of info are required to be entered back into Backoffice (Step 3 of [Configuring PlaceOS for SAML2](https://github.com/acaengine/docs/tree/290606a3bdbee7adcb62f37e2da8c19d25352b53/deployment/single-sign-on/configuring-Engine-for-saml2.md)):

### **Issuer**

For Azure AD the "Issuer" will be the "Application (client) ID" found on the Overview page of your App Registration, but with `spn:` added to the front. 
E.g. _`spn:00000000-0000-0000-0000-000000000000`_ where the 0 digits are the Application (client) ID from Azure AD. Paste this value into the Issuer field of the SAML2 auth object that was created in PlaceOS.

### **IDP Target URL**

Also known as **SAML2 sign-on endpoint.** This is the URL that PlaceOS redirects users to in order to login with your SAML2 ID provider. 
For Azure AD it is : [**https://login.microsoftonline.com/**](https://login.microsoftonline.com/)`**<TENANT-ID>/**_**saml2**_ _\*\*_` where the Directoy (tenant) ID can be seen on the Overview tab of your Azure App Registration. 
Paste this into the IDP Target URL field of the SAML2 auth object that was created in PlaceOS


*[SSO]: Single Sign On