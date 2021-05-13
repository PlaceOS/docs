---
id: panel-login
title: Configure Panel Auto Login
description: Allow automatic or unatteded authentication for PlaceOS Front End Applications
sidebar_position: 8
---

By default, PlaceOS requires users to authentication against front end applications (Workplace, Kiosks, Concierge etc.)
Panel Auto Login allows you to configure panels to authenticate against PlaceOS Automatically, without requiring the user to enter credentials each time.
This feature is most commonly used with unattended user interfaces, such as map and visitor kiosks.  


## Prerequisites
1. Confirm the final UAT and PROD URLs of the web apps
2. Ensure that the **DNS** entries for these URLs are active and forwarding to the server(s)
3. Ensure that the SSL certificates for the above domains are signed and recognized as secure


## Step 1: Create a local user account

1. Login as an admin to Backoffice
2. On the **Users** click **Add new**
3. Enter the required information, we recommend setting the username as Touchpanel User
4. Enter an email address (this does not need to be an active address)
5. Enter a strong password

## Step 2: Encode Username and Password

You will need to Base64 Encode your users email address and password. 

## Step 3: Construct URL for Applications

Setup URL for Applications




