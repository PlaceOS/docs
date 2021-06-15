---
title: Area Management
description: IoT data model for display and analytics
sidebar_position: 8
---


# Area Management

This driver provides the bindings for overlaying location data on a map.
It exposes the following data:

1. Overview of building use and recommended levels based on capacity
2. A list of Areas on each level and the counts of people in those areas
3. Location data for the levels, wireless and desks
4. List of known desks on the level, for simplified processing of real-time visualizations

Each building needs one of these modules, and they rely on [Location Services](location-services.md) for collecting data.


## Configuration

By default the view updates once a minute, you can increase this batching rate based on requirements. 
Intervals lower than about 15 seconds are not worth using, as it's still limited by systems which update once per minute.
Locations Services can also inform Area Management of updates. 
This increases the batching rate to at most every 3 seconds.

```yaml
# The building this driver is monitoring
building: zone-12345

# Poll rate in seconds
poll_rate: 15

# 1.0 == no duplicate devices
# 0.8 == 20% of devices are probably duplicates (phone + laptop)
# NOTE:: that phones turn off their wifi regularly so are often not represented in the data
duplication_factor: 0.8

# Driver to query for location information
location_service: LocationServices
```

You'll also need to configure the `PlaceOS Staff API` driver for getting zone data via the public API

```yaml
    # Create a service account for API access
    username:     "service_account@placeos.com"
    password:     "put this in an encrypted tab"

    # Create or grab an application for accessing the API
    client_id:    ""
    redirect_uri: ""
```


## Data Model

This is the state data that is exposed.
It's used for display on a real-time interface and for analytics.
Frontends can binding to the data points described below.

### Overview

This provides an overview of the building.

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

This provides the list of desk IDs in a system as a binding, allowing the frontend to highlight available desks.

* Available desks = all desks - (in-use or booked)

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

This binding has all the location data for a level (desks and wireless). 
It allows for desk highlighting and a point cloud.

The data returned doesn't include usernames.
It returns MAC addresses (if available) which can resolve to a user via the `LocationServices` module.

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
      "capacity": 1,
      "at_location": 1,
      "map_id": "desk-4-1006",
      "mac": "66e0fd1279ce",
      "level": "zone_1234",
      "building": "zone_1234"
    }
  ],

  # These are Time Series hints on how to store these data points
  "ts_hint": "complex",

  # convert x to xloc when storing in InfluxDB
  "ts_map": {
    "x": "xloc",
    "y": "yloc"
  },

  # tag this data so it's indexed (improving searching)
  "ts_tag_keys": [
    "s2_cell_id"
  ],
  "ts_tags": {
    "pos_building": "zone-FzNP2idoAOj",
    "pos_level": "zone-FzNYawvBxWD"
  }
}

```

Use `LocationServices.check_ownership_of(mac_address)` to determine who is at any of the locations


### Areas

It's possible to have the system count the number of devices in an area on the map. 
These areas, like desk ids, are defined in metadata using a Backoffice plugin.

```yaml

# the binding is `level_id:areas`
"zone-FBkhCVwD3Af:areas": {
  # Array of area counts, the polygon coordinates are in the metadata
  "value": [
    {
       "area_id": "area-1234",
       "name": "Level 1 Desks",
       "count": 15
    },
    {
      "area_id": "zone-09.C",
      "name": "Level 1 Lounge",
      "count": 4
    }
  ],

  # Time Series storage hints
  "ts_hint": "complex",

  # add this field to the records above
  "ts_fields": {
    "pos_level": "zone-FzNYawvBxWD"
  },

  # add this tag
  "ts_tags": {
    "pos_building": "zone-FzNP2idoAOj"
  }
}

```


## Desk ID Metadata

The desk ID metadata is stored in level zone metadata

* With the key `desks`
* The `id` of the desks are extracted from this data

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

## Area Metadata

Area metadata is stored in level zone metadata

* With the key `map_regions`
* The `area_id` is extracted from this data

```yaml

{
  # Map information
  "url": "https://s3-ap-southeast-2.amazonaws.com/os.place.tech/mck-placeos-poc.aca.im/16049826805781672737.svg",
  "width": 100,
  "height": 55.975,

  # Area definitions
  "areas": [
    {
      "id": "zone-10.C",
      "type": "Feature",
      "feature_type": "section",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
              0.738,
              0.5
          ],
          [
              0.337,
              0.5
          ],
          [
              0.337,
              0.881
          ],
          [
              0.738,
              0.881
          ]
        ]
      }
    }
  ]
}

```

### Defining Area Metadata

Areas are defined using a Backoffice plugin. 
To enable the plugin:

1. From the domains tab, select the domain you wish to enable
2. Select the `config` settings tab for that domain
3. Enter the following configuration

```json

{
  "backoffice": {
    "extend": {
      "zones": {
        "Map": {
          "conditions": [
            [
              "map_id",
              "truthy",
              ""
            ]
          ],
          "url": "https://map-region.editor.place.tech?src={{map_id}}"
        }
      }
    }
  }
}

```

Once configured, there is an extra tab added to zones where you can graphically define areas on the map
