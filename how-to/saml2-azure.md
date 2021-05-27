---
id: saml2-azure
title: Configure SAML2 with Azure AD
description: Steps required for enabling SAML2 sign on for PlaceOS on Azure AD
sidebar_position: 5
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
    `https://login.microsoftonline.com/<Tenant_ID_or_Domain_Name>/FederationMetadata/2007-06/FederationMetadata.xml`

## Step 2 - Edit the App Manifest

In the app Manifest, you need to edit `groupMembershipClaims` and `optionalClaims`. 

1. Select the app from Step 1 from the list of [App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps).
Then select Manifest (near the bottom) from the menu on the left
2. In the editor, set [`groupMembershipClaims`](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#configuring-group-optional-claims) to either `“All”` or `“SecurityGroup”`.
[This page](https://blogs.msdn.microsoft.com/waws/2017/03/13/azure-app-service-authentication-aad-groups/) may help you decide which is most suitable for your organization. 
If unsure, select `All`.
For each option the groups claim will contain:
   - `“SecurityGroup”` - identifiers of all security groups of which the user is a member
   - `“All”` - identifiers of all security groups **and** all distribution lists of which the user is a member
3. Set the value of the `optionalClaims` to include *first name, last name, UPN,* and *email* in the `saml2Token`. 
An example is below:

  ```yaml
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

4. Click Save

## Step 3 - Collect data required by Backoffice

The App Registration is now configured for PlaceOS. 
You now need to enter two pieces of information into Backoffice (Step 3 of [Configuring PlaceOS for SAML2](configure-saml.md)):
<!-- Step 3?? tba -->

### **Issuer**

You will need the "Application (client) ID" found on the Overview page of your App Registration. 
Adding `spn:` to the front will give the "Issuer", e.g. _`spn:00000000-0000-0000-0000-000000000000`_.
The `0` digits are the "Application (client) ID" from Azure AD. Paste this value into the Issuer field of the SAML2 authentication object you created in PlaceOS.

### **IDP Target URL**

Also known as **SAML2 sign-on endpoint.** 
This is the URL that PlaceOS redirects users to, so they can login with your SAML2 ID provider. 
For Azure AD, the URL is: `https://login.microsoftonline.com/<TENANT-ID>/saml2`.
The "Directory (tenant) ID" can is in the Overview tab of your Azure App Registration. 
Paste this into the IDP Target URL field of the SAML2 authentication object you created in PlaceOS


*[SSO]: Single Sign On
