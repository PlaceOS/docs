---
title: SAML
description: SAML Standard
sidebar_position: 4
---

## Overview

Security Assertion Markup Language (SAML) is an open standard that allows identity providers (IdP) to pass authorization credentials to service providers (SP).

SAML (Security Assertion Mark-up Language) is an umbrella standard that covers federation, identity management and single sign-on (SSO).

The SAML specification defines three roles: 
- the principal (typically a human user) 
- the identity provider (IdP) 
- the service provider (SP) 

In the primary use case addressed by SAML, the principal requests a service from the service provider.

The service provider requests and obtains an authentication assertion from the identity provider.

## SAML in PlaceOS

By default, PlaceOS uses a local authentication method.

PlaceOS Supports Federated Authentication via SAML, this is the advised method of user authentication.

Under this configuration, in accordance with the SAML Standard, PlaceOS is the service provider (SP).

Authentication providers can be associated with [Domains](../../how-to/add-domain.md) in PlaceOS.

- [Configure SAML in PlaceOS](../../how-to/configure-saml.md)
- [Add Domains in PlaceOS](../../how-to/add-domain.md)

## Resources

- [Security Assertion Markup Language (SAML) V2.0 Technical Overview](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-tech-overview-2.0.html)

