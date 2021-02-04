---
id: saml2-azure
title: SAML2 with Azure AD
description: Steps required for enabling SAML2 sign on for PlaceOS on Azure AD
---
# SAML2 with Azure AD

If using Azure Active Directory for SSO a new or exisiting "App Registration" will need to be configured to provide be the SAML2 identity provider for Engine.

## Step 1 - New or Existing App Registration

* Login to portal.azure.com and browse to [Azure AD &gt; App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)
* Locate the existing app that was created for [o365 Graph API access](https://github.com/acaprojects/docs/tree/be220954cefb53b2ac2ca82f775a56993117e99d/deployment/single-sign-on/integrations/directory-services/microsoft-office365.md). If none has been created yet, then create a new app registration now, as this app can be used for both SSO and o365 Graph API access
  * If creating a NEW app registration:
    * Name it and select the appropriate "Support Account types" \(which is usually "Single tenant"\)
    * Paste the Engine **Assertion URL** \(generated in Step 1 of [Configuring Engine for SAML2](https://github.com/acaengine/docs/tree/290606a3bdbee7adcb62f37e2da8c19d25352b53/deployment/single-sign-on/configuring-Engine-for-saml2.md)\) into the **Reply URL** field. Leave the type as "Web". Click Register to finish
  * If configuring an existing app registration:
    * Navigate to Overview -&gt; Redirect URIs
    * Paste the Engine **Assertion URL** \(generated in Step 1 of [Configuring Engine for SAML2](https://github.com/acaengine/docs/tree/290606a3bdbee7adcb62f37e2da8c19d25352b53/deployment/single-sign-on/configuring-Engine-for-saml2.md)\) into the **Redirect URI** field. Leave the type as "Web". Click Save to finish
* Confirm that you have access to the [SAML2 Federation Metadata URL](https://docs.microsoft.com/en-us/azure/active-directory/azuread-dev/azure-ad-federation-metadata) for your Azure Tenant. This is generally in the below format. Data in this XML file may be used later in Step 3, OR can be used to configure advanced custom claims
  * [https://login.microsoftonline.com/&lt;Tenant](https://login.microsoftonline.com/<Tenant) ID or Domain Name&gt;/FederationMetadata/2007-06/FederationMetadata.xml 

## Step 2 - Edit the App Manifest

Now two fields of the app Manifest need to be edited \(`groupMembershipClaims` and `optionalClaims`\) which will be described in the below steps.

* Select the new/existing app from Step 1 from the list of [App Registrations](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps) and then select Manfiest \(near the bottom\) from the menu on the left
* In the editor, set [groupMembershipClaims](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-optional-claims#configuring-group-optional-claims) to either `“All”` or `“SecurityGroup”`. [This page](https://blogs.msdn.microsoft.com/waws/2017/03/13/azure-app-service-authentication-aad-groups/) may help you decide which is most suitable for your organisation. If unsure, select `All`:
  * `“SecurityGroup”` - groups claim will contain the identifiers of all security groups of which the user is a member
  * `“All”` - groups claim will contain the identifiers of all security groups and all distribution lists of which the user is a member
* Set the value of the `optionalClaims`to include these 4 claims: `firstname`, `lastname`, `upn`, `email` in the saml2Token. An example is below:

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

* Click Save

## Step 3 - Collect data required by Backoffice

The App Registration is now configured for Engine. Two pieces of info are required to be entered back into Backoffice \(Step 3 of [Configuring Engine for SAML2](https://github.com/acaengine/docs/tree/290606a3bdbee7adcb62f37e2da8c19d25352b53/deployment/single-sign-on/configuring-Engine-for-saml2.md)\):

### **Issuer**

For Azure AD the "Issuer" will be the "Application \(client\) ID" found on the Overview page of your App Registrating, but with "spn:" added to the front. 
E.g. _"spn:00000000-0000-0000-0000-000000000000"_ where the 0 digits are the Application \(client\) ID from Azure AD. Paste this value into the Issuer field of the SAML2 auth object that was created in Engine.

### **IDP Target URL**

Also known as **SAML2 sign-on endpoint.** This is the url that Engine redirects users to in order to login with your SAML2 ID provider. 
For Azure AD it is : [**https://login.microsoftonline.com/**](https://login.microsoftonline.com/)**&lt;TENANT-ID&gt;/**_**saml2**_ _\*\*_ where the Directoy \(tenant\) ID can be seen on the Overview tab of your Azure App Registration. 
Paste this into the IDP Target URL field of the SAML2 auth object that was created in Engine


*[SSO]: Single Sign On