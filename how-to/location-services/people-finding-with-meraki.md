---
title: People Finding with Cisco Meraki on PlaceOS
description: How to locate people using Cisco Meraki
sidebar_position: 4
---
<!-- This still needs assets -->
<!-- Original at https://docs.google.com/document/d/1Ry2rZxSWgcRhJSNaFPbc7vetQtD1IsO_JD3KV_9wb5U/edit#heading=h.5oqh0ue31wwc -->

## Wireless

Cisco Meraki provides two interfaces for locating users:

1. [Dashboard API](https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API)
    *   PlaceOS uses version 1 of the API 

2. [Scanning API](https://developer.cisco.com/meraki/scanning-api/#!introduction/scanning-api)
    *   Version 3 of the API is preferred as it provides coordinates
    *   Version 2 requires the coordinate calculation which is much more error-prone. 
    Maps also need greater calibration which is time consuming


![Drawing](https://docs.google.com/drawings/d/12345/export/png)


### Data Collected

Ideally you collect the following:

1. Username to MAC address mappings
    *   Provided by the [Dashboard API](https://developer.cisco.com/meraki/api-v1/#!get-network-clients)
    *   Regularly polled via HTTP to learn who owns the devices on the network
2. MAC address to x, y map coordinates and SSID
    *   Provided by the Scanning API
    *   Cisco Meraki uses a webhook to post data to PlaceOS
    *   PlaceOS must be accessible on the public internet with valid TLS certificates


#### Device Certificates

::: note  
If devices authenticate against the network using certificates, the username is unknown to Cisco Meraki.
In this case, you need to determine usernames another way.


1. Username to IP address
    *   You may have an established method for this process, which you may use
    *   One of the most reliable methods is parsing [Domain Controller authentication logs](locating-users.md#windows-domain-controller)

2. IP address to MAC address mappings
    *   Provided by the [Dashboard API](https://developer.cisco.com/meraki/api-v1/#!get-network-clients)
    *   Regularly polled to learn who owns the devices on the network

3. MAC address to x, y map coordinates and SSID
    *   Provided by the Scanning API
    *   Cisco Meraki uses a webhook to post data to PlaceOS
    *   PlaceOS must be accessible on the public internet with valid TLS certificates

If you use device certificates, you will need to have Step 1 in near-real-time to match usernames to MAC addresses


### Integration Requirements

1. Cisco Meraki must be on **Firmware R26** or higher
2. Cisco Meraki must be able to connect to PlaceOS [rest-api](https://github.com/PlaceOS/rest-api) microservice
3. PlaceOS microservices must be able to connect to Cisco Meraki
4. Cisco Meraki [**Scanning API v3**](https://developer.cisco.com/meraki/scanning-api/#!enable-scanning-api/enable-location-api) or higher must be configured
    *   Provide PlaceOS integrator the validator code
    *   Provide PlaceOS integrator the secret code
5. Cisco Meraki [**Dashboard API v1**](https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API#Enable_API_access) or higher must be configured
    *   Provide PlaceOS integrator with API Key
6. PlaceOS integrator to provide a webhook for posting logs
    *   [Example script](capturing_user_devices.md)


## Wired

For locating users plugged into a wired network, possibly via a docking station. 

1. [Dashboard API](https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API)
    *   PlaceOS uses version 1 of the API
2. [SNMP configuration](https://documentation.meraki.com/zGeneral_Administration/Monitoring_and_Reporting/SNMP_Overview_and_Configuration)
    *   PlaceOS requires Link Up and Link Down traps
    *   PlaceOS requires SNMP access to switches directly

![Drawing](https://docs.google.com/drawings/d/12345/export/png)


### Data Collected

1. Username to IP address
    *   You may have an established method for this process, which you may use
    *   One of the most reliable methods is parsing [Domain Controller authentication logs](locating-users.md#windows-domain-controller)

2. IP address to MAC address mappings
    *   Provided by the [Dashboard API](https://developer.cisco.com/meraki/api-v1/#!get-network-clients)
    *   Regularly polled to learn who owns the devices on the network

3. MAC address to Switch Port mappings
    *   Provided by polling the Network Switches (SNMP queries)
    *   SNMP Traps allow you to detect changes in real time
    *   PlaceOS must be able to receive traps originating from the public internet


### Integration Requirements

1. Cisco Meraki must be able to connect to PlaceOS
2. PlaceOS must be able to connect to Cisco Meraki
3. Cisco Meraki [Dashboard API](https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API#Enable_API_access) must be configured
    *   Provide PlaceOS with API Key
4. Cisco Meraki [SNMP access](https://documentation.meraki.com/zGeneral_Administration/Monitoring_and_Reporting/SNMP_Overview_and_Configuration) must be configured
    *   SNMP Link Up and Link Down traps
    *   Direct switch SNMP polling configured
    *   Provide PlaceOS with community strings and credentials if using SNMPv3
5. Provide PlaceOS with list of Switch IP addresses
6. Provide PlaceOS with Switch Port to Desk ID mappings