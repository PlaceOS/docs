# Configuring DNA Spaces

Configuring PlaceOS to interact with DNA Spaces.
If you have multiple buildings you'll need to configure location services for each, however they can share the DNA Spaces module


## Prerequisites

Add the following driver from our [standard repository](https://github.com/PlaceOS/drivers)

* Cisco DNA Spaces
  * https://github.com/PlaceOS/drivers/blob/master/drivers/cisco/dna_spaces.cr
  * Install the PlaceOS app on your DNA spaces: https://dnaspaces.io/partner/app/details/app-A575390EA4DD4915B863D6CA4F283F38
  * Configure the `dna_spaces_activation_key: 'your-key-here'` setting on the driver
  * Start the driver and it will complete the DNA Spaces configuration


## Configuring location services

1. Add `PlaceOS Staff API` driver
   * configure a service account for this to query the API with
2. Add `PlaceOS Location Services`
   * https://github.com/PlaceOS/docs/blob/location-services/faq/location-services.md
3. Add `PlaceOS Area Management`
   * https://github.com/PlaceOS/docs/blob/area-management/faq/area-management.md


### Mapping DNA Spaces Maps to PlaceOS Zones

To configure a map id to a zone

1. in backoffice execute `DNA_Spaces.seen_locations`

this will return a list of space ids against space names that DNA spaces has sent so far

```json
{
    "location-7864e7": "IXCDubai",
    "location-b9a0bf": "Cisco MEA Centers ",
    "location-9e6c2a": "MEA IXC",
    "location-cd46cf": "Cisco IXC",
    "location-3e0256": "Riyadh CBC",
    "location-be78b7": "Cisco System - Riyadh"
}
```

2. configure the following settings in the DNA Spaces driver:

```yaml

floorplan_mappings:
  location-b9a0bf:

    # Level name here is just for your documentation
    # the driver will use the zone name config
    level_name: Cisco MEA Centers
    building: zone-GAsXV0nc4eS
    level: zone-GAsmleHgRaO

    # ideally the maps uploaded by the client have no padding, if they do
    # then this information may need to be manually defined - ideally the maps
    # in DNA Spaces and PlaceOS are the same maps
    offset_x: 70
    offset_y: 25
    map_width: 230
    map_height: 130


  location-be78b7:
    level_name: Cisco System - Riyadh
    building: zone-GAsXV0nc4eS
    level: zone-GAsdb~1fk5m

```
