# Location services

Location services are any driver that implement the [Locatable Interface](https://github.com/PlaceOS/driver/blob/master/src/placeos-driver/interface/locatable.cr)

[The Location Service](https://github.com/PlaceOS/drivers/blob/master/drivers/place/location_services.cr) driver collects the responses of locatable modules in the same system and returns this as the result of a location search.


## Response types

The frontend is responsible for translating the search responses into a pin on a map.
These are the supported formats:


### X,Y Location

Such as a location calculated by a wireless network

```javascript

{
  "location": "wireless",
  "coordinates_from": "bottom-left",
  "x": 27.113065326953013,
  "y": 36.85052447328469,
  "lon": 55.27498749637098,
  "lat": 25.20090608906493,
  "mac": "66e0fd1279ce",
  "variance": 4.5194575835650745,
  "last_seen": 1601555879,
  "building": "zone-EmWLJNm0i~6",
  "level": "zone-Epaq-dE1DaH",
  "map_width": 1234.2,
  "map_height": 123.8,

  // driver can include additional data to help with debugging
  "meraki_floor_id": "g_727894289736675",
  "meraki_floor_name": "BUILDING Name - L2"
}

```


### Map Feature

Such as a desk

```javascript

{
  "location": "desk",
  // the count of people at the location, desks will typically be 0 or 1
  // however other location types could have more
  "at_location": 1,
  "map_id": "desk-4-1006",
  "level": "zone_1234",
  "building": "zone_1234",
  
  // if provided can be used to look up user details
  "mac": "66e0fd1279ce",
  
  // provided if known
  "capacity": 1
}

```


### Booking

Such as an event in a meeting room

```javascript

{
  "location": "meeting",
  "resource_calendars": ["meeting2.city1@org.com", "meeting8.city4@org.com"],
  "event_id": "meet-1234567",
  "ends_at": 1234567
}

// Or for a desk or car-space booking etc
// where the asset ID is the map id

{
  "location": "booking",
  "asset_id": "desk-4-1006"
  "event_id": "booking-4567",
  "ends_at": 1234567,

  "building": "zone_1234",
  "level": "zone_1234",
  
  "staff_email": "bob@tmart",
  "staff_name": "Bob Jane"
}

```


## Configuring Meraki

See the configuring meraki wireless tracking guide
