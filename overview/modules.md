---
title: Modules
description: Modules are instances of drivers
sidebar_order: 3
---

<!-- # Modules -->

*Modules* are instances of [drivers](drivers.md).
Each module represents either:
- A specific physical device controlled by PlaceOS,
- A specific digital platform, or
- Logic that controls how a specific set of hardware and software should interact

<!-- images pending asset folder or mermaid.js -->
<!-- ![Modules are instances of drivers.](../.gitbook/assets/concepts-modules.svg) -->

## Purpose

All modules have two broad functions on the system they control:

1. **State**: status information about the integration or higher level logic they control. 
Some examples of this kind of data could be:
   - Power status
   - Upcoming booking info
   - Current user
1. **Behavior**: actions which the device, service, or logic can do.
Some examples of these actions could be:
   - Power on/off
   - Create/edit booking
   - Post a chat message

## Starting and Stopping Modules

Each module can be individually started or stopped at any time.
When started, the driver connects to the physical or digital integration and keeps track of its status.
When stopped, the driver disconnects from its integration and will not send or receive any data or commands.
For logic modules, this enables/disables its functionality.

## Modules and Systems

Modules must be a part of *at least* one [system](systems.md), but can be part of more than one system. 
Each system can use the same module instance everywhere it's required.
Examples of modules used this way could be:
- A lighting gateway
- Centrally installed audio-visual equipment
- A common service such as a chatbot integration
 
