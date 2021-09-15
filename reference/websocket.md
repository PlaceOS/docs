---
title: Real-time Websocket
description: Specifications for interaction with PlaceOS realtime websocket
---

:::tip
The real-time WebSocket works in conjunction with the [PlaceOS API](api.md).

The PlaceOS API can list systems and zones that are then used with the WebSocket.
:::


PlaceOS exposes the endpoint `wss://<app_domain>/api/engine/v2/systems/control` to allow for real-time communication.
The endpoint requires a valid API token.

API tokens are sent in the header of the request.

`X-API-Key: <token>`

If you need to ping the channel to keep it alive you can send `"ping"` to which the server will respond `"pong"`.

## Commands

5 commands available for the user to perform over the API.
These are:

### Bind

`bind` command allows the user to bind to status variable values on a given driver module.

Example of a `bind` command:

```yaml
{
  
  "id": 1, # Any number
  "cmd": "bind", # ID of the PlaceOS system
  "sys": "sys-1234", # Name of the PlaceOS module
  "mod": "Bookings",
  "index": 1, # Non-zeroed index of the module in the system. i.e. 1st index is 1
  "name": "bookings" # Name of the variable to bind to
}
```

After a successful bind you will receive a success response from the server.
The ID of the response will match the ID of the message.

```json
{
    "id": 1,
    "type": "success",
    "meta": {
        "sys": "sys-1234",
        "mod": "Bookings",
        "index": 1,
        "name": "bookings"
    }
}
```

After binding to a status variable the WebSocket will post the current 
value and any changes to the value until the `unbind` command is issued.

Example of the value change notification:

```yaml
{
    "id": 18,
    "type": "notify",
    "value": "[]", # Stringified JSON
    "meta": {
        "sys": "sys-1234",
        "mod": "Bookings",
        "index": 1,
        "name": "bookings"
    }
}
```

### Unbind

`unbind` command terminates an existing binding for the given driver module.

Example of a `unbind` command:

```yaml
{
  "id": 2, # Any number
  "cmd": "unbind",
  "sys": "sys-1234", # ID of the PlaceOS system
  "mod": "Bookings", # Name of the PlaceOS module
  "index": 1, # Non-zeroed index of the module in the system. i.e. 1st index is 1
  "name": "bookings" # Name of the variable to bind to
}
```

After a successful unbind you will receive a success response from the server.
The ID of the response will match the ID of the message.

```json
{
    "id": 2,
    "type": "success",
    "meta": {
        "sys": "sys-1234",
        "mod": "Bookings",
        "index": 1,
        "name": "bookings"
    }
}
```

### Execute

The `exec` command allows you to call available methods on the target driver.

```yaml
{
  "id": 3, # Any number
  "cmd": "exec",
  "sys": "sys-1234", # ID of the PlaceOS system
  "mod": "Bookings", # Name of the PlaceOS module
  "index": 1, # Non-zeroed index of the module in the system. i.e. 1st index is 1
  "name": "make_booking", # Name of the method to call
  "args": [1631058815] # List of arguments to pass into the function
}
```

After a successful execution you will receive a success response from the server.
The ID of the response will match the ID of the message.
The value return is the value returned by the called method.

```json
{
    "id": 3,
    "type": "success",
    "meta": {
        "sys": "sys-1234",
        "mod": "Bookings",
        "index": 1,
        "name": "bookings"
    },
    "value": {}
}
```
