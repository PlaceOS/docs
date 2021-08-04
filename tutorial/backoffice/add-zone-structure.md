---
title: Add Zone Structure
description: This document outlines creating zone structure in Backoffice
sidebar_position: 1
---

An important step in setting up PlaceOS is to create your organizations physical structure as [Zones](../../overview/zones.md).

In the following steps, we will walkthrough configuring your Zone structure. 

## Prerequisites

* PlaceOS Backoffice Administrator Access
* [SVG Floor Plans](../../how-to/user-interfaces/svg-map-creation.md) (optional)

## Org Zone

An `org zone` is the parent zone for all other zones.

The `org zone` is typically named after the organization for easy reference.

### Steps to create the org zone

1. Login to PlaceOS Backoffice
2. Navigate to Zones
3. Click the `+` button to create a new zone
4. In the New Zone Modal, you will need to enter the following information:
- **Parent Zone**: Your new org zone will be the parent, leave this blank
- **Name**: The name of your org zone (typically your organization name)
- **Display Name**: How you want the zone to appear to end users (optional)
- **Tags**: Enter a single tag of `org`
- **Description**: Optional zone description

The remaining fields are not required for org zones:
- Location, Code, Type, Count, Capacity, Map

5. Click Save

You have now created your `org` zone, this will be the parent for your `building` zones.

## Building Zones

Building Zones represent your physical buildings.

The frontend will use Building Zones to allow end users to select buildings in your organization.

### Create Building Zones

## Level Zones

Level Zones represent your buildings levels (floors).

The frontend will use Level Zones (nested in building zones) to allow end users to select levels in your buildings.

### Create Level Zones

## System Zones

System Zones can be used to group similar system types e.g. meeting rooms, video conference rooms etc.

These systems are optional.

System Zones will allow specific configuration to be applied to a group of similar systems.
