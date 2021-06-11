---
title: Add a Application to PlaceOS
description: Steps required for adding a application to PlaceOS
sidebar_position: 1
---

## Overview

This guide will step through the process of creating an application on PlaceOS.

You must create a [domain](./add-domain.md) before you can add an application.

## Steps to Add Application

1. Select the Applications tab
2. Select the New Application button.
This brings up the New Application form
3. Add the following fields:
   - `Name`: Can be anything to identify the applications
      - Usually the folder path where the application resides but capitalized i.e. `Backoffice`
   - `Scopes`: Leave this blank
   - `Skip Authorizaiton`: Check the box to set this to `true`
   - `Login URL`: The location that users are redirected to after completing authentication.
      - This will generally be something like `https://<domain>/<application path>/oauth-resp.html`

![Add Application](./assets/add_application.png)

