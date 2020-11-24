---
id: settings
title: Settings
description: Settings can be configured at any level
---
<!-- # Settings -->

_Settings_ are the configuration information that define how a deployment should behave.
Any level can have defined settings, which are ultimately consumed by [modules](modules.md). 
[Zones](zones.md), [systems](systems.md), [drivers](drivers.md) or [modules](modules.md) can have settings defined on them. 
Together, these create a system configuration that is easier to manage at scale.

Settings are expressed as [JSON data](https://en.wikipedia.org/wiki/JSON#JSON_sample), that is, key-value pairs:

<!-- {% code title="" %} -->
```javascript
{
  "key": "value",
  "foo": [1, 2, 3],
  "bar": true 
  "baz": { 
    "qux": 1.234
  }
}
```
<!-- {% endcode %} -->

<!-- info, note or tip -->
:::Info 
 JSON is a common data-interchange format designed to be readable for humans, and for machines to parse and generate.
If it's a new concept, you can [learn more here](https://learnxinyminutes.com/docs/json/).
:::

Within driver files are definitions for naming conventions and expected values for the settings. 
They will vary based on each deployment, but the general structure will always be similar.

Examples of some common uses for settings are: 
- Available video inputs/outputs
- Source names
- DSP block IDs
- Lighting control IDs
- Device auth information
- Desk / room auto-release timeouts

## Settings lookup

To simplify large deployments, standardise systems and reduce management overhead, different layers define settings which then combine to produce the final configuration.

Systems inherit all the settings from each zone that they are in. 
Zones pass down their settings to all systems within them.

Similarly, modules inherit all the settings from the driver that they instantiate.

<!-- ![Settings inheritance.](../.gitbook/assets/concepts-settings.svg) -->

## Specific beats general

When a system or module inherets settings from a zone or driver, they mesh with any settings defined directly on it.
If an inherited setting has the same key as one defined directly on that system or module, the latter will override the inherited attribute.
This allows a general config to be applied at the highest 'shared' point of a system, with more specific configuration applied on a system or individual module basis. 
Rewel asdghhj.

