# Area Management

This driver provides the bindings for overlaying location data on a map.
It exposes the following data:

1. Overview of building use and recommended levels based on capacity
2. A list of Areas on each level and the counts of people in those areas
3. Location data for the levels, wireless and desks
4. List of known desks on the level, so they can be highlighted by the frontend

There should be one of these modules configured per-building


## Configuration

By default the view is updated once a minute, this batching rate can be increased based on requirements. Every 20 seconds would be a good maximum fast rate, systems like meraki only provide updated location information every minute so there is diminishing returns for higher rates.

```yaml
# The building this driver is monitoring
building: zone-12345

# The driver queries the API for zone metadata
placeos_domain: 'https://myplaceos.org.com'
username: service_account@local.com
password: <MASKED>

# Create or grab an application for accessing the API
client_id: 808ef0948864cd464dfbd64cba9c85ad
client_secret: yADfsu7X5_3K22qgv6ExJBO7hW4C_AEN25CK-NXtEyu2i1hh33em9A

# Poll rate in seconds
poll_rate: 60

# 1.0 == no duplicate devices
# 0.8 == 20% of devices are probably duplicates (phone + laptop)
duplication_factor: 0.8

# Driver to query for location information
location_service: LocationServices
```


## Bindings

What the frontend can expect that is binding to data

### Overview

an overview of the building is provided

```yaml

# overview is the binding name
"overview": {
  # The levels are represented by the zone ids
  "zone-Epaq-dE1DaH": {
    # Desk count based on `desks` metadata in the zone
    # if falls back to the zone.count field otherwise
    "desk_count": 268,
    "desk_usage": 0,
    # This is the capacity of the space, set in zone.capacity field
    "device_capacity": 100,
    # This is the raw device count
    "device_count": 70,
    # This is the adjusted count based on the duplication factor
    "estimated_people": 56,
    "percentage_use": 56,
    # The higher the recommendation number the better for recommending
    "recommendation": 102
  },

  "zone-Epa~Jlq--l0": {
    "desk_count": 0,
    "desk_usage": 0,
    "device_capacity": 0,
    "device_count": 75,
    "estimated_people": 60,
    "percentage_use": 100,
    "recommendation": -6060
  }
}

```

### Desk IDs

The list of desk IDs in a system is provided as a binding, allowing the frontend to highlight available desks.

* available desks = all desks - (in-use or booked)

```yaml
# Bind to `level_id:desk_ids`
"zone-EmWVhHG3Bhz:desk_ids": [
  "table-01.002",
  "table-01.003",
  "table-01.004",
  "table-01.005",
  "table-01.006",
  "table-01.007",
  "table-01.008"
]
```

### Location Data

This binding has all the location data for a level (desks and wireless)
Allowing for desk highlighting and a point cloud.

The data returned doesn't include username, just MAC addresses where available and those MAC addresses can be resolved to a user via the `LocationServices` module.

```yaml
# The level id is the binding
"zone-EmWVhHG3Bhz": {
  # The locations of devices on the level (wireless and desks)
  "value": [
    {
      "location": "wireless",
      "coordinates_from": "bottom-left",
      "x": 22.389704894550505,
      "y": 7.934026150363014,
      "lon": 55.27476066828535,
      "lat": 25.20106100633537,
      "s2_cell_id": "3e5f4281459c",
      "mac": "3868a4a31a50",
      "variance": 9.62534032222287,
      "last_seen": 1603168962,
      "map_width": 79.3282194366595,
      "map_height": 48.568208517912
    },
    {
      "location": "desk",
      "at_location": true,
      "map_id": "desk-4-1006",
      "mac": "66e0fd1279ce",
      "level": "zone_1234",
      "building": "zone_1234"
    }
  ],

  # You can ignore this, these are hints for how to store the data in InfluxDB
  "ts_hint": "complex",
  "ts_map": {
    "x": "xloc",
    "y": "yloc"
  },
  "ts_tag_keys": [
    "s2_cell_id"
  ],
  "ts_fields": {
    "pos_level": "zone-FBkhCVwD3Af"
  },
  "ts_tags": {
    "pos_building": "zone-EmWLJNm0i~6"
  }
}

```

Use `LocationServices.check_ownership_of(mac_address)` to determine who is at any of the locations


### Areas

Its possible to have the system count how many devices are in an area on the map. These areas, like desk ids, are defined in metadata using a backoffice plugin.

```yaml

# the binding is `level_id:areas`
"zone-FBkhCVwD3Af:areas": {
  # Array of area counts, the polygon coordinates are in the metadata
  "value": [{
     "area_id": "area-1234",
     "name": "Level 1 Lobby",
     "count": 15
  }],

  # Ignore the InfluxDB hints
  "ts_hint": "complex",
  "ts_fields": {
    "pos_level": "zone-FBkhCVwD3Af"
  },
  "ts_tags": {
    "pos_building": "zone-EmWLJNm0i~6"
  }
}

```


## Desk ID Metadata

The desk ID metadata is stored in level zone metadata

* with the key `desks`
* the `id` of the desks are extracted from this data

```yaml

[
  {
    "bookable": false,
    "group": null,
    "id": "table-01.002",
    "name": "Desk 002"
  },
  {
    "bookable": true,
    "group": null,
    "id": "table-01.003",
    "name": "Desk 003"
  }
]

```
