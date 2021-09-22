---
title: UI Configurable Items
description: Configure features on the PlaceOS Workplace and Concierge Apps
---

PlaceOS User Interfaces allow configuration via metadata saved to [Zones](././tutorials/add-zone-structure.md) in Backoffice.

## Workplace App

The Workplace App has a number of configuration items. 

These items are stored as JSON metadata attached to a zone. 

The metadata field must be named `workplace_app`. 

This configuration is typically associated with the `org` zone.

A full list of configuration items are detailed in the [Workplace App Repository](https://github.com/PlaceOS/user-interfaces/blob/master/apps/workplace/src/environments/settings.ts).

### Enable Navigation Items

Navigation items control the menu features that appear in the Workplace App. 

These items are nested under `general` as `menu_items`.

For example:
```json
{
"general":
    "menu_items": [
        {
            "name": "Home",
            "route": "/dashboard",
            "icon": {
                "class": "material-icons",
                "content": "home"
            }
        },
    ]
}
```

Where the following is observed:

* `name`: The name that will be displayed on the navigation bar.
* `route`: The route to the feature in the application.
* `icon`: An array that specifies the icon set and icon name.

### Desk Booking

Configuration can be applied to the desk booking feature via the `desks` parameters.

```json
"desks": {
        "available_period": 7,
        "ignore_questions": true
    },
```

Where the following is observed:

* `ignore_questions`: Enable or disable the COVID Booking Questions.
* `available_period`: How far in advance desks can be booked, the Default is 99.

### Room Booking

Configuration can be applied to hide features of the room booking workflow.

This configuration is applied via the `booking` parameters.

```json
"booking": {
        "allowed_daily_desk_count": 99,
        "hide_user_actions": true
    }
```

### App Logo

Custom logos may be configured to replace the default PlaceOS Logo.

The application supports a light and dark logo using `logo_light` and `logo_dark`.

The configuration requires the following parameters:

* `type`: Specify the file type e.g. `img` for image.
* `src`: URL to the source image.

### Full Workplace Example

A full Workplace App configuration where the following features are enabled:

Menu Items
- Room Booking
- Desk Booking
- Explore Spaces
- My Day

Desk Booking:
- Questions are turned off.
- Desks can only be booked 7 days in advance.

Logo:
- Custom Light and Dark Logo is configured.

Delivery:
- The delivery display for mail room feature is turned off.

```json
{
    "can_deliver": false,
    "booking": {
        "allowed_daily_desk_count": 99,
        "hide_user_actions": true
    },
    "desks": {
        "available_period": 7,
        "ignore_questions": true
    },
    "general": {
        "menu": {
            "position": "left"
        },
        "menu_items": [
            {
                "name": "Home",
                "route": "/dashboard",
                "icon": {
                    "class": "material-icons",
                    "content": "home"
                }
            },
            {
                "name": "Book",
                "route": "/book/spaces",
                "icon": {
                    "class": "material-icons",
                    "content": "book_online"
                }
            },
            {
                "name": "Desk",
                "route": "/book/desks",
                "icon": {
                    "class": "material-icons",
                    "content": "dashboard_customize"
                }
            },
            {
                "name": "Explore",
                "route": "/explore",
                "icon": {
                    "class": "material-icons",
                    "content": "place"
                }
            },
            {
                "name": "My Day",
                "route": "/schedule",
                "icon": {
                    "class": "material-icons",
                    "content": "date_range"
                }
            }
        ]
    },
    "logo_light": {
        "type": "img",
        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4DUiZWj1fUvuLC_JXnbN9BxhIprvEFPJgDA&usqp=CAU"
    },
    "logo_dark": {
        "type": "img",
        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4DUiZWj1fUvuLC_JXnbN9BxhIprvEFPJgDA&usqp=CAU"
    }
}
```


## Concierge App

The Concierge App has a number of configuration items. 

These items are stored as JSON metadata attached to a zone. 

The metadata field must be named `concierge_app`. 

This configuration is typically associated with the `org` zone.