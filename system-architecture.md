---
id: system-architecture
title: System Architecture
description: 
---
<!-- source material gospel at https://docs.google.com/document/d/1kzQpnI_nTEUq_Qe5RApV6AkrRsqIUCyKsoPVirCt7bs/edit#heading=h.69jrquo1axlr -->

## System Functionality and Requirements
Below is a table of high level functions that PlaceOS is capable of and the technical requirements for each.

<!--
Function | Description | Requirement
---|---|---
Log in using existing enterprise credentials (single sign-on) | Users will not need to “sign up” and remember a new user account/password. | Integration with enterprise identity providers via SAML2 or OAuth2. Examples: <ul><li> Azure AD Enterprise Application </li><li> ADFS, </li><li> Google GSuite authentication </li></ul>
Book Rooms |  PlaceOS web apps will be able to search and book room/user Calendars from the enterprise directory (e.g. Office 365 / Exchange Online / Google GSuite) | Office 365 / Exchange Online or Google Calendar: <ul><li>Integration with Microsoft Graph API via an Azure “Registered App”</li><li> All required Calendars and Users must be accessible via MS Graph API</li><li> OR Google Calendar API, users on GSuite</li></ul> 
Show or use sensor data | PlaceOS web apps or analytics will be able to show or track live sensor data (e.g. desk occupancy, in-room people count, air quality, etc… | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Control devices | PlaceOS web apps or automations will be able to send messages to edge devices over the network in order to control them or receive their live status information. | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Locate Devices | PlaceOS web apps will be able to show where in the building a user’s device may currently be located (if their laptop/mobile is online). This may be used to infer where a person is located. | Integration with locations services such as: <ul><li> Cisco DNA Spaces </li><li> Meraki RTLS </li><li>HP Aruba</li></ul> 
Analytics for connected devices/integrations | Provide time-synced, retrospective data for all connected devices/integrations via an analytics dashboard, enabling insights. | PlaceAnalytics extension
-->

<!-- look at the abbr tag AND the header  -->
### Log in with SSO
using existing enterprise credentials (single sign-on)
Users will not need to “sign up” and remember a new user account/password.
Integration with enterprise identity providers via SAML2 or OAuth2. Examples:
- Azure AD Enterprise Application
- ADFS
- Google GSuite authentication

### Book Rooms
PlaceOS web apps will be able to search and book room & user Calendars from the enterprise directory. 
Enterprise directories include Office 365, Exchange Online, Google GSuite etc.

Office 365/Exchange Online or Google Calendar: 
- Integration with Microsoft Graph API via an Azure “Registered App”
- All required Calendars and Users must be accessible via MS Graph API
- OR Google Calendar API, users on GSuite

### Show or use sensor data
PlaceOS web apps or analytics will be able to show or track live sensor data, such as:
- Desk occupancy
- In-room people count
- Air quality

Compatible PlaceOS Driver for the devices/services

Network connectivity to the devices/services or their gateway.

### Control devices
PlaceOS web apps or automations will be able to send messages to edge devices over the network in order to control them or receive their live status information.
Compatible PlaceOS Driver for the devices/services
Network connectivity to the devices/services or their gateway.

### Locate Devices
If a user's device (such as phone or laptop) is online, PlaceOS will be able to locate it within the building.
This infers a person's location.

Integration with locations services such as:
- Cisco DNA Spaces
- Meraki RTLS
- HP Aruba

### Analytics for connected devices/integrations
Provide time-synched, retrospective data for all connected devices/integrations via an analytics dashboard, enabling insights.
PlaceAnalytics extension



*[SSO]: Single Sign On