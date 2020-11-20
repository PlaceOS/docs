---
id: drivers
title: Drivers
description: Overview of the 2 types of drivers
---
<!-- # Drivers -->

_Drivers_ are executable programs which help different parts of the digital ecosystem interact with each other.
They provide the ability to either:

## Device and Service Drivers
**Communicate** respectively with hardware or software in external systems, incorporating them into the PlaceOS framework. These control any functionality of the external systems and handle any incoming data. 

## Logic Drivers
**Coordinate** actions across modules and build complex behaviours. 
These don't represent physical objects in the network, 
but rather represent abstract or conceptual functions which may require the interaction of several different devices or software platforms.

<!-- images pending  -->
<!-- ![Drivers either communicate or coordinate.](../.gitbook/assets/concepts-drivers.svg) -->

All drivers, regardless of type, must be instantiated as [modules](modules.md) before they can be used.



