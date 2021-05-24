---
title: MQTT
description: MQTT messaging protocol for IoT
sidebar_position: 2
---

## Overview

MQTT is an OASIS standard messaging protocol for the Internet of Things (IoT). 

It is designed as an extremely lightweight publish/subscribe messaging transport that is ideal for connecting remote devices with a small code footprint and minimal network bandwidth. 

MQTT today is used in a wide variety of industries, such as automotive, manufacturing, telecommunications, oil and gas, etc.

MQTT allows for messaging between device to cloud and cloud to device. 

This makes for easy broadcasting messages to groups of things.

Further informaion is available from the [MQTT Website](https://mqtt.org/)

## MQTT in PlaceOS

PlaceOS supports publishing [module](../../overview/modules.md) state information via MQTT.

This provides environment information to external systems such as [Amazon MQTT Service](https://docs.aws.amazon.com/iot/latest/developerguide/view-mqtt-messages.html)

MQTT messages consist of a *header* and a *payload* and typically have low bandwidth usage. 

The header declares the topic of the message, and the payload carries data as key-value pairs.

PlaceOS uses two types of message sent over MQTT: State Changes and Metadata.

Further information on configuring MQTT Brokers for PlaceOS can be found in [MQTT Brokers](../../how-to/mqtt-brokers.md)

## Resources

- [MQTT Website](https://mqtt.org/)
- [PlaceOS State Source Service](https://github.com/PlaceOS/source)