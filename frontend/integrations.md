# Frontend Integrations

To work on frontends most of the time a backend environment is needed to work on new and exisiting features.
For working on frontends there are three main types of working backend environments.

+ Deployed Environment - Application environment is on the same domain as the frontend.
+ Remote Environment - Application environment is on a different domain as the frontend.
+ Mock Environment - Fake environment attached to the frontend

As working on a deployed environment is fairly time consuming, most development should be using either a remote or mock environment.

## Deploy Environment Integration

This environment is the simplest to setup as once the UI is deployed the integrations should just work.

## Remote Environment Integration

For remote environments the frontend will need to setup a reverse proxy for the core endpoints as PlaceOS endpoints have CORS disabled and do not allow requests from different origins.  
Most frontend development environments support proxying requests.
Details for Angular can be found [here](https://angular.io/guide/build#proxying-to-a-backend-server)

The main endpoints to be proxied are:
+ `/api` - Parent route for PlaceOS APIs
+ `/login` - Parent route for local login page
+ `/auth` - Parent route for PlaceOS authentication APIs

Other than HTTP requests Websocket request to `/api` should also be proxied.  
An example of proxy settings used in PlaceOS frontends can be found [here](https://github.com/PlaceOS/backoffice/blob/master/config/proxy.conf.js)

Finally for remote environments you will need to setup a domain application for the local environment so that authentication works.

## Mock Enviroment Integration

For when there is no remote environment available you will have to resort to using a mock environment for the backend. [`ts-client`](https://github.com/PlaceOS/ts-client) methods for setting up a mock environments for PlaceOS services.

To enable to mock environment in `ts-client` you need to pass in `mock: true` when initialising the library with the call of `setup`

```typescript
import { setup } from '@placeos/ts-client';

await setup({
    ...
    mock: true
});
```
Before initialising it is recommended to initialise the handlers for endpoints and create mock versions of systems that may be bound to.
Note that endpoints without a handler will make a real request, which if not proxied to a remote environment will fail.

### HTTP Mocks

For example a handler for bookings endpoint may look like this:

```typescript
import { registerMockEndpoint } from '@placeos/ts-client';

const BOOKINGS = [
    new Booking({ 
        zones: ['zone-1'] 
    });
];

registerMockEndpoint({
    path: `/api/staff/v1/bookings`,
    method: 'GET',
    callback: (request) => {
        if (request.query_params.zone_ids?.length) {
            const zones = request.query_params.zone_ids.split(',');
            return BOOKINGS.filter(
                booking => booking.zones.find(
                    zone => zones.includes(zone)
                )
            );
        }
        return BOOKINGS
    }
});
```

Handlers may also throw errors

```typescript
registerMockEndpoint({
    path: `/api/staff/v1/bookings/:id`,
    method: 'GET',
    callback: (request) => {
        if (request.route_params.id) {
            ...
        }
        throw { status: 404, message: 'Invalid booking ID' }; 
    }
});
```

### Driver Mocks

An example of a mock system may look like this:

```typescript
registerSystem('sys-1234', {
    "Lighting": [
        {
            lights: false,
            $lights_on: function () { this.lights = true; },
            $lights_off: function () { this.lights = false; }
        }
    ]
    "Display": [
        {
            power: true,
        }
    ]
});
```