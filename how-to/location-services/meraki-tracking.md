---
title: Meraki Wireless Tracking
description: Configure Meraki Wireless Tracking on PlaceOS
sidebar_position: 3
---

# Meraki wireless tracking

Configuring PlaceOS to interact with Cisco Meraki wireless systems


## Prerequisites

For more detail information on requirements please read the following:
https://docs.google.com/document/d/1Ry2rZxSWgcRhJSNaFPbc7vetQtD1IsO_JD3KV_9wb5U/edit

* Enable the scanning API (provides x, y coordinates of MAC addresses)
  * https://developer.cisco.com/meraki/scanning-api/#!introduction/scanning-api
  * Use Version 3 of the API
  * PlaceOS requires the secret and validator codes
* Enable the dashboard API (provides IP address and usernames, mapping to MAC addresses)
  * https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
  * Use Version 1 of the API
  * PlaceOS requires the API key


## Backoffice configuration

1. Add the following driver from our [standard repository](https://github.com/PlaceOS/drivers)

* Cisco Meraki Dashboard

2. Configure the following settings on the driver:

```yaml

meraki_validator: configure if scanning API is enabled
meraki_secret: configure if scanning API is enabled
meraki_api_key: configure for the dashboard API

```

3. Add an instance of the driver to your tracking system
   * Start the module

4. Create a trigger called `Meraki Scanner`
   * Tick the enable webhook checkbox
   * Add GET and POST to the supported methods

5. Add the trigger to your tracking system
   * Ensure it is enabled
   * Ensure `execute` is also enabled

6. Click the link icon to copy the webhook link to your clipboard
   * The webhook will look like: https://placeos.company.com/api/engine/v2/webhook/trig-FNo91rRWO1x/notify?secret=59ad63f98
   * Add the following to the end of the webhook: `&exec=true&mod=Dashboard&method=scanning_api`
   * The final webhook will look like: https://placeos.company.com/api/engine/v2/webhook/trig-FNo91rRWO1x/notify?secret=59ad63f98&exec=true&mod=Dashboard&method=scanning_api
   * If you goto this URL it should return the validator code

7. Provide the webhook URL to the Cisco Meraki administrator
   * Request they send you the secret and the validator they configure
   * Update these on the dashboard driver in backoffice
   * Ask the administrator to validate the URL once again


### Configuring location tracking

To enable device learning provide a `default_network_id` setting, this ID should look like: `L_68xxx50007xxx0`
This will query for devices on the network and map MAC addresses to usernames.

This enables the location functionality via the `locate_user(email, username)` function.
See the location services document for more information on how this works.


#### Meraki Maps to PlaceOS Zones

To configure a map id to zone mapping

1. In Backoffice execute `Dashboard.sync_floorplan_sizes`
2. View and then copy the result, this shows the IDs and floor names
3. Configure the following settings in the driver:

```yaml

floorplan_mappings:
  g_72728977375679:
    level_name: Sydney - ground floor
    building: zone-EmWLJNm0i~6
    level: zone-FBkrOX0ZGoy
  g_72789428956672:
    level_name: Sydney - level 1
    building: zone-EmWLJNm0i~6
    level: zone-EmWVhHG3Bhz

```

`level_name` is there as a hint, building and level IDs are the only requirement