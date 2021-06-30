# Configuring Staff API

## Staff API service

When using [partner-environment](https://github.com/place-labs/partner-environment), ensure that the `staff` container is running without errors. If is it constantly restarting, check it's logs with
`docker logs --tail 99 -f staff`

Staff API must be able to reach PlaceOS Rest API. In partner-environment, this is via nginx. So ensure that in docker-compose.yml, the staff container has an env var `PLACE_URI="https://nginx:8443`

### Add a Tenant

### Test Staff API

## Staff API driver

* Add the staff api DRIVER using backoffice.
* If using partner-environment, set it's URL to https://nginx:8443
* Add a Setting to the driver: `host_header: localhost`
