---
id: systems
title: Systems
description: Systems are collections of modules
sidebar_order: 3
---
<!-- # Systems -->

A *system* is the main logical building blocks within PlaceOS. 
They contain three components:
- A collection of [modules](modules.md)
- [Settings](settings.md) which will apply to the system and modules in it
- Basic metadata (name, description etc)

<!-- images pending asset folder or mermaid.js -->
<!-- ![Systems have settings and a collection of modules.](../.gitbook/assets/concepts-system.svg) -->

## Purpose

Systems often represent physical spaces, such as meeting rooms.
They can also represent connected items which run across physical spaces, such as a range of digital signage. 
Otherwise, they can represent a non-physical system with data inputs and outputs, such as a payment portal.

## Systems and Zones

[Zones](zones.md) are groups of systems which can reflect their physical or conceptual groupings.
Systems can belong to zero or more zones.
<!-- not sure about zero -->