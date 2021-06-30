# Configuring Staff API

## Staff API service

When using [partner-environment](https://github.com/place-labs/partner-environment), ensure that the `staff` container is running without errors. If is it constantly restarting, check it's logs with
`docker logs --tail 99 -f staff`

Staff API must be able to reach PlaceOS Rest API. In partner-environment, this is via nginx. So ensure that in docker-compose.yml, the staff container has an env var `PLACE_URI="https://nginx:8443`

### Add a Tenant

### Test Staff API

## Staff API driver

* On the Drivers page of backoffice click Add new driver (+ icon)
* Select the "Drivers" repository
* Search for "staff" and selec  the staff api DRIVER then click add
* Ensure that the list of staff-api commits fully loads first, before clicking "Save"

If using partner-environment
* Set the URL of staff-api to https://nginx:8443
* Edit Settings of the driver, under "Unencrypted", these can be either YAML or JSON format
* Add a Setting to the driver, `host_header: localhost`
* Set the username to "support@place.tech" or another PlaceOS support/admin user
* Set the password to the password for that username
* Copy the redirect URI from backoffice/domains. Default for partner-environment will be `https://localhost:8443/backoffice/oauth-resp.html`
* Copy the client ID from backoffice/domains, for the same app (backoffice)
* Click Save

Test the staff-api driver
* On any System, select the Modules section
* click "Add" new driver and select "PlaceOS Staff Api"
* click the black dot on the left of the staff api Module to start it
* In "Execute Command", select the staff api module
* Select the "zones" command and click Execute. This will make the staff api driver query the placeos rest api
* View the response by clicking on the green/red toast that appears at the bottom of the page.
* Select the "query_bookings" command and set the `type` to `"desk"`, then click Execute
* This will make the staff-api driver query the staff api service
