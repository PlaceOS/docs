---
id: recommended-hardware
title: Recommended Hardware
description: Tried and tested hardware options for PlaceOS
---

# Recommended Hardware
<!-- Worth renaming as it extends beyond hardware to OS & platforms -->

The PlaceOS Platform is vendor agnostic, meaning that it can be used with any other hardware or software with no direct requirements for specific equipment. 

However, here you will find a list of hardware that has been fully tested by PlaceOS and is known to deliver reliable and consistent results on the platform.

## User Interface Devices (by OS)

### Chrome

|Manufacturer |Model | Use Case | Additional notes
|---| ---|---|---|
AOpen|[WT-10M-FRG Chromebase Mini 10"](http://www.goodson.com.au/product/aopen-10-google-chromebase-mini-touch-system-wt10chrome-5587) | Room Booking, <br>Room Control|Can be remotely managed via Google CDM.|
AOpen|[ChromeBox Commercial](https://aopensolutions.com/product/chromebox-commercial/)|Visitor Kiosks, <br>Information Kiosks|	Can be used with HID Touch Compliant Screens for Larger Kiosks. <br> Can be remotely managed via Google CDM.
InTouch|[INDT Range](https://intouchscreens.com.au/touch-screens/)|Room Booking, <br>Room Control <br> Visitor Kiosks, <br>Information Kiosks|Range of Chrome OS Based Display Solutions ranging from 10" - 55" including models with cameras, scanners and printers.

### Android

|Manufacturer |Model | Use Case | Additional notes
|---| ---|---|---|
QBic|[TD-1060P](https://www.qbictechnology.com/td-1060slim)|Room Booking, <br>Room Control|Native Android Devices featuring full API that allows device to be configured as part of a System in PlaceOS Backoffice. 
Samsung|[Tab (all)](https://www.samsung.com/au/tablets/)|Room Booking, <br>Room Control,<br>Visitor Kiosks|It is advised to use the Chrome Kiosk App and lock out the device Home Button to prevent unauthorised access/changes to the device configuration.<br>Can be remotely managed via Moki.
Mimo|[MCT-10HPQ-POE-2LB](https://www.mimomonitors.com/collections/10-1-tablets/products/mimo-adapt-iqv-10-1-digital-signage-tablet-with-leds-rk3288-processor-with-light-bars-mct-10hpq-poe-2lb)|Room Booking, <br>Room Control|Mimo 10" Panel includes side LED Light Bars that can be controlled from PlaceOS to indicate room availability.<br>Can be remotely managed via Moki.

<!-- original doc had inline images in table, try adding these in when asset directories are more managed -->

### Apple

|Manufacturer |Model | Use Case | Additional notes
|---| ---|---|---|
Apple|[iPad (all)](https://www.apple.com/au/ipad/)|Room Booking, <br>Room Control<br>Visitor Kiosks|It is advised to use the Chrome Kiosk App and lock out the device Home Button to prevent unauthorised access/changes to the device configuration. <br> Can be remotely managed via Moki.<br> Suggested mounting Solution: [Optica Pro LED™ Enclosure for iPad mini 2/3/4/5](https://www.armoractive.com/products/optica-pro-LED-iPad-mini3.aspx)

<!-- no point messing with column width or vertical spacing until we see how docusaur handles it -->

[//]: # (may need to use this type of comment in stead depending on handling)

## Mobile Device Management Platforms (MDM)

|Platform|Target OS|Cloud/On-Prem|
|---|---|---|
[Moki](	https://moki.com/)|Android and iOS|Cloud SaaS
[Google CDM](https://cloud.google.com/chrome-enterprise/os/)|ChromeOS|Cloud SaaS
[MobileIron](https://www.mobileiron.com/en/unified-endpoint-management/solutions/mobile-device-management)|iOS|

## Label Printers 
<!-- consider having this as a general peripherals table? -->
|Manufacturer|Model|Connection type|
|---|---|---|
[Zebra](https://www.zebra.com/ap/en/products/printers/desktop/compact-desktop-printers.html)|ZD410|Ethernet

<!-- these last two possibly don't have to be tables, consider lists or something snazzier but not jarring compared to the tables above -->
## Servers & Hosting

|Provider|Additional notes|
|---|---|
[Amazon AWS](	https://aws.amazon.com/ec2/	)|Traditional Virtual Machine/Server Based Hosting
[Amazon AWS ECS]( 	https://aws.amazon.com/ecs/)	|Elastic Container Services with Fargate and Cloud Formations
[Google Cloud Kubernetes](	https://cloud.google.com/kubernetes-engine	)|
[Google Cloud Compute](	https://cloud.google.com/compute	)|
[Microsoft Azure Kubernetes (AKS)](	https://azure.microsoft.com/en-au/services/kubernetes-service/	)|
[Microsoft Azure Compute](	https://azure.microsoft.com/en-au/product-categories/compute/	)|

## Operating Systems
|OS | version|
|---|---|
[CentOS](https://www.centos.org/)|7+
[Ubuntu server](https://ubuntu.com/server)|18.04 LTS
[Red Hat Enterprise Linux ](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux)|7+




