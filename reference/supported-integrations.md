---
title: Supported Integrations
description: Devices and services which are ready to integrate with PlaceOS
---

<!-- Do not remove deprecated integrations, move them to the last category. Jon's request. -->

PlaceOS has a range of pre-built drivers for integrating with third party services and devices. 
Drivers are written in [Crystal Lang](https://crystal-lang.org/) and based on our [Framework](https://github.com/PlaceOS/driver).
<!-- consider the explain page for Crystal Lang -->

If a driver for your device is not available, you can raise a request to have the driver written via our Service Desk.
Or, you can refer to the [How to Write A Driver](../tutorial/write-a-driver) guide to write your own.

## Authentication
* OAuth2 (JWT)
* SAML2
* Azure AD B2C for external 

## Directory Services
* Azure AD (via MS Graph API)
* Hybrid on-premise Active Directory (via MS Graph API)
* Google Workspace (GSuite)

## Messaging
* Email (MS Graph, Gmail, SMTP, AWS SES)
* SMS (MessageMedia)
* MQTT
* Webhooks
* Node-RED

## Resource Booking
* Microsoft 365
* Google Workspace (GSuite)
* Native PlaceOS resource booking

## Common Protocols/Standards
* HTTPS REST / JSON
* HTTPS Webhook (post and receive)
* TCP/IP
* MQTT
* SNMPv2
* KNX (via IP Gateway)
* BACnet (via IP Gateway)
* Modbus TCP

## Real Time Location
* Cisco Meraki RTLS
* Cisco CMX
* HP Aruba ALE

## Sensors
* MQTT ingest
* Azure IoT Hub
* Vergesense
* Floorsense
* Pressac
* PointGrab Cognipoint

## Network
* Cisco Meraki
* Cisco CMX
* Cisco ISE
* Cisco Switches

## Building Access
* Lenel
* Gallagher
* Honeywell
* Johnson Controls

## Conferencing / UC
* Cisco Collaboration Endpoints (via Webex API)
* Microsoft Teams (via MS Graph)
* Pexip Management API
* Polycom RealPresence Group Series

## Displays
* LG (Displays)
* NEC (Displays/Projectors)
* Panasonic (Displays/Projectors)
* Sony (Displays/Projectors)
* Samsung (Displays)
* Sharp (Displays)
* Screen Technics (Screens/Lifts)
* PJLink projectors

## Video
* Extron (Switchers)
* Atlona (Video over IP)
* Lightware Switchers
* SVSI
* Kramer (Switchers)
* Echo360 Capture Appliances
* MediaSite Capture Appliances/Server
* Axis Cameras
* Sony Cameras (CGI, VISCA)
* Barco ClickShare
* TriplePlay
* Microsoft Surface Hub
* Wolfvision Document Cameras
* Lumens Document Cameras

## Audio
* QSC Q-SYS
* Biamp
* Shure
* ClearOne
* Denon
* Clock Audio
* Bose ControlSpace
* PowerSoft
* Symmetrix
* ClearOne

## Lighting
* KNX
* C-Bus
* DynaLite
* Lutron
* DALI
* Helvar

## Other
* Global Cache
* Kentix Sensors
* Foxtel STB
* Gantner Relaxx Lockers

## Legacy or deprecated integrations
* IBM Domino 