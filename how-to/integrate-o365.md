---
title: Microsoft Office365 Integration
description: How to integrate PlaceOS with Office365 
---

PlaceOS integrates with Microsoft Office 365 via [Graph API](https://docs.microsoft.com/en-us/graph/overview). 
An Azure Active Directory admin must use Azure Portal to create an "App Registration" for PlaceOS.
After that, you can configure details of this app registration in PlaceOS.
<!-- avoid this repetition, "registration in backoffice" if thats right? -->

## Create an App Registration in Azure Portal

Refer to the below Microsoft article and video for extra context:

* Article: [Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app)
* Video: [Getting Started with Microsoft Graph and Application Registration](https://www.youtube.com/watch?v=93j0MmRruFo)

An Azure user with admin permissions for Azure Active Directory will need to perform these actions:

### Register the App

1. Login to the Azure Portal and view the ["App Registrations" page of the "Azure Active Directory" blade](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)  
2. If an existing App has been registered for PlaceOS for use with [Azure SSO (SAML2)](saml2-azure.md), then we can re-use this app - select it. 
If not, then click "New registration"  
3. Type a descriptive name for the application, set the Supported account Type to _"Accounts in this organizational directory only"_ and leave the Redirect URI blank. 
Click "Register"

### Configure App permissions

While still in Azure Portal on the page for the above registered App:

1. In the menu on the left, select “API permissions” and click “Add a permission”. 
Then select “Microsoft Graph” as the API and select **Application Permissions** as the permission
2. Typically, allow the below permissions (the list may vary depending on the desired functionality/restrictions on the web applications that will be using this Graph API integration):
   * `User.Read.All`
   * `Group.Read.All`
   * `Calendars.ReadWrite`
   * `Contacts.Read.All`
   * `Place.Read.All`
3. After adding the required Application permissions, click "Grant admin consent for ACA Projects" on the "API Permissions" page of the registered App, then click Yes
4. On the "Overview" page of the App, copy the below two values, which will be used in the next section to configure Engine to connect to this Registered App:
   * `Application (client) ID`
   * `Directory (tenant) ID`
5. On the "Certificates & secrets" page of the App, click "New client secret":
   * Add a meaningful description
   * Set Expiry to "Never", or as appropriate (ACA will no longer be allowed to use this credential after expiry)
   * Copy the Value of the secret, as it will be used in the next section to configure Engine

Now you should have collected 3 text values that will be used in the next section:

* `Application (client) ID`
* `Directory (tenant) ID`
* `Client secret`

### Optional: Restrict App access to specified AD Groups only

To restrict the Graph App's access to only the objects that exist in specified AD groups, [**Application Access Policies**](https://docs.microsoft.com/en-us/powershell/module/exchange/organization/new-applicationaccesspolicy?view=exchange-ps) can be used.

1. Ensure those resources (users, rooms) exist in those AD groups 
2. Use PowerShell to add the new policy, e.g:

`# Restrict to a group of Rooms    
New-ApplicationAccessPolicy -AppId <Graph App ID> -PolicyScopeGroupId <AD group that all bookable rooms exist in> -AccessRight RestrictAccess -Description "Restrict this app to Engine bookable rooms"`

`# Restrict to a group of Users    
New-ApplicationAccessPolicy -AppId <Graph App ID> -PolicyScopeGroupId <AD group that all staff app users exist in> -AccessRight RestrictAccess -Description "Restrict this app to Engine app users"`

## Configure Engine to connect to Graph API

1. Login to [https://&lt;your-engine-url&gt;/backoffice/#/drivers/](https://<your-engine-url>/backoffice/#/drivers/) and select an existing or create a new “Office365 Room Booking Panel Logic” driver and click edit (pen icon at top right). 
Note down the driver ID, which you will see in the browser URL bar and looks like `dep-xxxxxxxx` (you will need this later)
2. Enter the o365 values (client, secret, tenant) into the placeholders which you should see. 
These values are on the portal.azure.com page where you created the Azure App Registration (above), then click Save
   * `“office_client_id”`
   * `“office_tenant”`
   * `“office_secret”`
   * Tip: Sensitive values (like `office_secret`) can be encrypted by inserting `$` in front of the setting name (e.g. `“$office_secret”: "xxxx"`)
3. Test the configuration by navigating to a System which has a Device (module) instance of the above Driver (or create a Device instance)
   * Edit the System: Set the System’s Email to a real email address that exists on the o365 tenant
   * On the About page of the system, Select `Bookings 1` from "Execute command", then select the function `fetch_bookings` and click “Send”. 
   * An array of booking details (blue) should be returned (it might be empty `[]` if there are no bookings), or an error (red), if there is an issue grabbing the events from o365
   * If blue, then the settings are correct and is currently being used for all Room Booking Panels. 
   In the next step we'll configure Engine Staff API to use the same credentials
   * If red, capture the error from JavaScript console (e.g. Chrome debug tools, Console tab) which will help yourself, an integration partner or ACA to pinpoint the cause
4. Navigate to Domains (menu bar on left). 
Select the Domain that you’d like integrated with this Office 365 tenant and click it, then click edit (pen icon at top right)
5. In the `Config` box, ensure that the “o365_driver” value exactly matches the driver ID of the “Office365 Room Booking Panel Logic” driver which you gathered in step 1 (e.g. `dep-xxxxxxxx`). 
Click Save. 
If there is none, then create one like this:
   * `"o365_driver": "dep-xxxxxxxx"`
6. Test the Staff API integration by logging into an app that uses Staff API (e.g. Engine template Staff App) with a user who’s Calendar exists in the configured o365 tenant’s Exchange directory. 
You should be able to view/create events as this user
   * If there are issues, note down the error information from requests like `/api/staff/bookings` which will be shown in Chrome/Firefox Debug tools, on then Network tab
   * Full backend error logs are available when connected to the VM via SSH: `docker logs --tail 99 -f engine`






# Integrate Office365 

## Create ORG Zone 
Name of organization  
Tags: `org`  
Settings: 
```
{ 
    "discovery_info": { 
        "buildings": [ 
            { 
                "name": "Building Name", 
                "zone_id": get from building zone url, 
                "orientations": { 
                    "landscape": 0 
                } 
            } 
        ] 
    } 
} 
```

## Create Building Zone 
Name of building  
Tags: `building`  
Settings: 
```
{ 
    "discovery_info": { 
        "levels":[ 
            { 
                "level_id": get from level zone URL, 
                "level_name": "Level 27", 
                "map_url": "assets/maps/level_27.svg" 
            } 
        ] 
    } 
} 
```

## Create Level Zone 
Name of level  
Tags: `level` 

## Create System for each room 
- Room name 
- Add system email for bookings (if exists)
- `bookable` true/false 
- `capacity` integer 
- Add `"map_id": "string"` setting (check) (architectural room number, needs to be same as SVG map) 
- Add av features to `extra_features` as space separated string of `extra-id`s 
  - Available extra features should be defined in building zone: 

```
"discovery_info":{ 
    "extras": [ 
        { 
            "extra_id": "video_conference", 
            "extra_name": "Video Conference" 
        }, 
        { 
            "extra_id": "presentation_screen", 
            "extra_name": "Presentation Screen" 
        } 
    ] 
} 
```

- Apply Zones to System in order: 
  - Level -> Building -> Org 

## O365 Driver Add 
In backoffice: 
- Drivers -> New -> Office365 Room Bookings 
  - Copy settings from previous client: 

```
{ 
    "touch_enabled": true, "timeout": 1800, 
    "booking_max_duration": 120, 
    "update_every": "1m", 
    "office_client_id": "office client id here", 
    "office_secret": "office secret here", 
    "office_scope": "https://graph.microsoft.com/.default", 
    "office_options": { 
        "site": "https://login.microsoftonline.com", 
        "token_url": "token url here" 
    }, 
    "office_site": "https://login.microsoftonline.com", 
    "office_token_url": "token url here" 
} 
```

- Get values from wiki/client 
- App ID == `office_client_id` 
- Tenant ID == `office_token_url` & `token_url` 

## Add o365 Driver to Systems 
- Each bookable system needs the Office365 Room Bookings module in Devices 

## Add o365 details to docker-compose engine environment vars
```
- OFFICE_CLIENT_ID=office_client_id_here 
- OFFICE_CLIENT_SECRET=office_secret_here  
- OFFICE_TOKEN_URL=office_token_url_here 
- INTERNAL_DOMAIN=internal_domain_here (eg. name.onmicrosoft.com) 
```

## Replace ruby-engine-app with o365-engine 
```
rm -rf ruby-engine-app 
git clone https://bitbucket.org/aca/o365-engine.git 
```

In `docker-compose.yaml` 
- Map o365-engine into engine container as ruby-engine-app 
```
engine: 
volumes: 
- ./0365-engine/:/home/aca-apps/ruby-engine-app
```

*[SSO]: Single Sign On