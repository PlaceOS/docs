---
id: mqtt-integration
title: MQTT Integration
description: Guide on integrating PlaceOS with MQTT messaging
---
<!-- # MQTT -->

<!-- images in old file, need rehosting https://docs.google.com/document/d/1gBZD296sF0cZXYyRKrRjn-wi5c408Yg1189S-DV9JgE/edit# -->

PlaceOS supports publishing module state information via MQTT. 
This provides environment information to external systems such as [Amazon MQTT Service](https://docs.aws.amazon.com/iot/latest/developerguide/view-mqtt-messages.html)

MQTT messages consist of a *header* and a *payload* and typically have low bandwidth usage. 
The header declares the topic of the message, and the payload carries data as key-value pairs.
PlaceOS uses two types of message sent over MQTT: State Changes and Metadata.

## State Change
Changes to module state information propagates in real time. 
All change messages share the following topic structure:

``` html
placeos/<org>/state/<bld>/<lvl>/<area>/<sys>/<drv>/<mod>/<idx>/<state>
```
In this structure, each section is a unique identifying tag to represent part of the system.
- `<org>`: Organization ID
- `<bld>`: Building ID
- `<lvl>`: Level ID
- `<area>`: [Area](../key-concepts/zones.md) ID
- `<sys>`: [System](../key-concepts/systems.md) ID
- `<drv>`: [Driver](../key-concepts/drivers.md) ID
- `<mod>`: [Module](../key-concepts/modules.md) ID
- `<idx>`: Module Index
- `<state>`: State Key

<!-- some kind of key expanding the above. Original had an image. html isn't *right* but the colouratin is nice-->

<!--What part of PlaceOS? messaging service? Does this microservice (?) have a title? -->
On a state change, PlaceOS  will publish a message with the payload containing the new state value as a JSON entity. 
The associated driver defines the structure and change frequency of this state.
If a state change is for a system which isn't assigned to a building, level or area, that topic level will be an underscore character 
 (`“_”`).

### State Change Payload
The *payload* is the value of the status variable paired with a timestamp
```html
{
  "time": unix_integer_milliseconds,
  "value": "payload is a serialized json string"
}
```
## Metadata
Metadata is available for `building`, `level`, `area`, `system` and `driver` tiers. 
The format is this persistent topic:

```html
placeos/<org>/metadata/<id>
```

### Metadata Payloads

Metadata payloads are JSON objects that contain model info for the publishing entity. 
This includes the human-readable "friendly name", e.g.

```html
{
  "name": "Cisco VC"
}
```
```
{
  "name": "Level 24"
}
```



## Wildcard Subscriptions
Wildcards can replace any topic level to catch state information across different services. 
Some commons examples are:

All events within a building: 
```html
placeos/<org>/state/<bld>/# 
```

Connected status of all devices:
```html
placeos/<org>/state/+/+/+/+/+/+/+/connected 
```
Power status for all displays:
```html
placeos/<org>/state/+/+/+/+/+/Display/+/power
```
Call status information for Cisco VC endpoints (`dep-123` is the driver ID for Cisco VC):
```html
placeos/<org>/state/+/+/+/+/dep-123/+/+/call_status
```

## Privacy
Some deployment requirements may include filtering of sensitive information.
The system parses state changes for content such as email addresses or user IDs before they propagate.
A match can lead to actions such as:
- Replacing the value with a hashed version of itself
- Masking the value 
- Dropping the associated event

## Cloud Brokers
<!-- Want to add clickable images of logos (img from original doc) -->

- [Cloud MQTT](https://www.cloudmqtt.com/)
- [Google Cloud](https://cloud.google.com/iot/docs/how-tos/mqtt-bridge)
- <i>[MyQTTHub](https://myqtthub.com/en)</i>
- <i>[Heroku CloudMQTT](https://elements.heroku.com/addons/cloudmqtt)</i>
- <i>[HiveMQ](https://www.hivemq.com/)</i>
- [Azure](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-mqtt-support)
- [AWS](https://docs.aws.amazon.com/iot/latest/developerguide/view-mqtt-messages.html)
