---
title: Configure SAML2 with AD FS
description: Steps required for enabling SAML2 sign on for PlaceOS on ADFS
sidebar_order: 6
---

Use this page in tandem with [Configuring PlaceOS for SAML2](configure-saml.md) if you are using AD FS.
You can follow [Microsoft's instructions](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/create-a-relying-party-trust) for most cases. 
PlaceOS will use these four SAML2 claims:

* First name
* Last name
* Email Address
* User ID (such as a login name, e.g. UPN or Windows Account Name)

*[AD FS]: Active Directory Federation Services