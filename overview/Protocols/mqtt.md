---
title: MQTT
description: MQTT messaging protocol for IoT
sidebar_position: 2
---

## Overview

MQTT is an [OASIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=mqtt) standard messaging protocol for the <i>Internet of Things</i> (IoT). 
As a lightweight publish/subscribe messaging transport, it's ideal for connecting remote devices with a small code footprint and minimal network bandwidth. 

Its versatility makes it suitable for a wide variety of industries.
These include automotive, manufacturing, telecommunications, oil and gas, etc.

MQTT allows for messaging between device-to-cloud and cloud-to-device. 
This simplifies broadcasting messages to groups of receivers.
Further information is available from the [MQTT Website](https://mqtt.org/)

## MQTT in PlaceOS

PlaceOS supports publishing [module](../../overview/modules.md) state information via MQTT.
This provides environment information to external systems such as [Amazon MQTT Service](https://docs.aws.amazon.com/iot/latest/developerguide/view-mqtt-messages.html)

MQTT messages consist of a *header* and a *payload* and typically have low bandwidth usage. 
The header declares the topic of the message, and the payload carries data as key-value pairs.

PlaceOS uses two types of message sent over MQTT: State Changes and Metadata.
Further information on configuring MQTT Brokers for PlaceOS can be found in [MQTT Brokers](../../how-to/mqtt-brokers.md)
<!-- This page does not exist? -->

## Resources

- [MQTT Website](https://mqtt.org/)
- [PlaceOS State Source Service](https://github.com/PlaceOS/source)

 *[MQTT]: Message Queuing Telemetry Transport 
