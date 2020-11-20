---
id: drivers
title: Drivers
description: Overview of the 2 types of drivers
---
<!-- # Drivers -->

_Drivers_ are executable programs. 
They help different parts of the digital ecosystem interact with each other.
PlaceOS has drivers that fall into one of two categories:

## Device and Service Drivers
- **Communicate** with external systems and lets them talk to PlaceOS
- Represent hardware or software respectively
- Control any functionality of the external systems and handle any incoming data

## Logic Drivers
- **Coordinate** actions across modules and build complex behaviours. 
- Don't map to specific physical objects
- Represent abstract or conceptual functions 
- May use a variety of devices or software platforms

<!-- images pending asset folder or mermaid.js -->
<!-- ![Drivers either communicate or coordinate.](../.gitbook/assets/concepts-drivers.svg) -->

## Drivers and Modules
[Modules](modules.md) are instances of drivers, letting the rest of PlaceOS access their specific funtions.



