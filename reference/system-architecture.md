---
id: system-architecture
title: System Architecture
description: 
---
<!-- source material gospel at https://docs.google.com/document/d/1kzQpnI_nTEUq_Qe5RApV6AkrRsqIUCyKsoPVirCt7bs/edit#heading=h.69jrquo1axlr -->

<!-- Consider whether this is multiple pages, specidfically with the diagrams from ^ doc as well - OR, Mermaid.js? -->

## System Functionality and Requirements
Below is a table of high level functions that PlaceOS is capable of and the technical requirements for each.


Function | Description | Requirement
---|---|---
Log in using existing enterprise credentials (single sign-on) | Users will not need to “sign up” and remember a new user account/password. | Integration with enterprise identity providers via SAML2 or OAuth2. Examples: <ul><li> Azure AD Enterprise Application </li><li> ADFS, </li><li> Google GSuite authentication </li></ul>
Book Rooms |  PlaceOS web apps will be able to search and book room/user Calendars from the enterprise directory (e.g. Office 365 / Exchange Online / Google GSuite) | Office 365 / Exchange Online or Google Calendar: <ul><li>Integration with Microsoft Graph API via an Azure “Registered App”</li><li> All required Calendars and Users must be accessible via MS Graph API</li><li> OR Google Calendar API, users on GSuite</li></ul> 
Show or use sensor data | PlaceOS web apps or analytics will be able to show or track live sensor data (e.g. desk occupancy, in-room people count, air quality, etc… | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Control devices | PlaceOS web apps or automations will be able to send messages to edge devices over the network in order to control them or receive their live status information. | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Locate Devices | PlaceOS web apps will be able to show where in the building a user’s device may currently be located (if their laptop/mobile is online). This may be used to infer where a person is located. | Integration with locations services such as: <ul><li> Cisco DNA Spaces </li><li> Meraki RTLS </li><li>HP Aruba</li></ul> 
Analytics for connected devices/integrations | Provide time-synced, retrospective data for all connected devices/integrations via an analytics dashboard, enabling insights. | PlaceAnalytics extension


<!-- there are also links in the original comment -->

<!-- look at the abbr tag AND the header  -->
### Log in with SSO
Users can log on using existing enterprise credentials. 
They do not need to “sign up” nor remember a new user account/password.  

**Requirement**   
Integration with enterprise identity providers via SAML2 or OAuth2. 
Examples:
- Azure AD Enterprise Application
- ADFS
- Google GSuite authentication

### Book Rooms
PlaceOS web apps are able to search and book room & user Calendars from the enterprise directory. 
Enterprise directories include Office 365, Exchange Online, Google GSuite etc.  

**Requirement**  
Office 365/Exchange Online or Google Calendar: 
- Integration with Microsoft Graph API via an Azure “Registered App”
- All required Calendars and Users must be accessible via MS Graph API *or* Google Calendar API if users are on GSuitexs

### Show or use sensor data
PlaceOS web apps or analytics are able to show or track live sensor data, such as:
- Desk occupancy
- In-room people count
- Air quality 

**Requirement**   
- Compatible PlaceOS Driver for the integration (device/service)
- Network connectivity to the Cisco DNA Spaces integration or its gateway

### Control devices 
PlaceOS web apps or automations are able to send messages to edge devices over the network.
These can control integrations or receive live status information.

**Requirement**  
- Compatible PlaceOS Driver for the integration (device/service)
- Network connectivity to the integration or its gateway

### Locate Devices
If a user's device (such as phone or laptop) is online, PlaceOS will be able to locate it within the building.
This infers a user's location and the distribution/density of people.

**Requirement**  
Locations services such as:
- Cisco DNA Spaces
- Meraki RTLS
- HP Aruba

### Analytics for connected integrations 
PlaceOS provides live and retrospective data for all connected integrations. 
An analytics dashboard enables insights.

**Requirement**  
Place Analytics API
<!-- double check what PlaceAnalytics is referring to, pretty sure its API -->


## Microservices running in PlaceOS Kubernetes Cluster {#microservices}
PlaceOS service integrators and support partners manage these microservices.
They work in different combinations to best suit the needs of each site.

<!-- do not have the links in full, use link text "Docker Image", "GitHub source". But I kinda like the almost dotpoint structure. Maybe have the docker and GitHub as clickable images? Nah -->
<!-- See the [Docker Image]() and [Source on GitHub](). -->

### ingress
 Serves web requests (static files and upstream reverse proxying to REST-API).  
 See the [Docker Image](https://hub.docker.com/r/yobasystems/alpine-nginx) and [Source on GitHub](https://GitHub.com/nginx/nginx).

### etcd
 Distributed key-value store used for PlaceOS service discovery and leader election.  
 See the [Docker Image](https://hub.docker.com/r/bitnami/etcd) and [Source on GitHub](https://GitHub.com/etcd-io/etcd).

### RethinkDB
 Database for permanent storage of PlaceOS configuration. 
 Configuration: Three node cluster in 3 different availability zones within same region for HA.  
 See the [Docker Image](https://hub.docker.com/_/rethinkdb) and [Source on GitHub](https://GitHub.com/rethinkdb/rethinkdb).

### PlaceOS core
 Application in a Docker container that interfaces with external devices/services.  
 See the [Docker Image](https://hub.docker.com/r/placeos/core) and [Source on GitHub](https://GitHub.com/PlaceOS/core).

### PlaceOS auth
 Application in a Docker container that provides authentication.  
 See the [Docker Image](https://hub.docker.com/r/placeos/auth) and [Source on GitHub](https://GitHub.com/PlaceOS/auth).

### PlaceOS REST-API
 Application in a Docker container that provides REST API for web applications.  
 See the [Docker Image](https://hub.docker.com/r/placeos/rest-api) and [Source on GitHub](https://GitHub.com/PlaceOS/rest-api).

### PlaceOS triggers
 Perform user defined actions, without code, under certain conditions.  
 See the [Docker Image](https://hub.docker.com/r/placeos/triggers) and [Source on GitHub](https://GitHub.com/PlaceOS/triggers).

### PlaceOS dispatch
 Reverse proxy incoming communications from devices/services to PlaceOS core. 
 This is required to handle protocols like SNMP Traps - often not required.  
 See the [Docker Image](https://hub.docker.com/r/placeos/dispatch) and [Source on GitHub](https://GitHub.com/PlaceOS/dispatch).

### PlaceOS rubber-soul
 Stream RethinkDB changes to Elasticsearch, which will index the documents for fast text searching.  
 See the [Docker Image](https://hub.docker.com/r/placeos/rubber-soul) and [Source on GitHub](https://GitHub.com/PlaceOS/rubber-soul).

<!-- nothing below here has been substantially rewritten -->

## High Availability and Distributed Control
High availability works by distributing services through Availability Zones. 
For platforms like AWS Fargate, containers are initially automatically distributed.
If a zone becomes unavailable, containers are re-launched in an alternative Availability Zone.

<!-- possibly just link, here, maybe even push this stuff over to #key-concepts -->
[Driver stuff](key-concepts/drivers.md#Integration-Drivers)
### Definitions
**Driver:** Code that defines how PlaceOS interacts with an integration, and what data it provides.
- Drivers exist as files inside the PlaceOS core containers
- Drivers are managed by the PlaceOS Backoffice web application which interfaces via PlaceOS REST-API
- PlaceOS Core creates a separate process for Driver in use, which will serve all the Modules (instances) of this Driver
  - Modules are distributed among the instances of core

**Module:** An instance of a Driver, that represents a single real-world device/service. 
Essentially a “digital twin” of that external device, or a client to that external service.
- Modules exist in memory in the PlaceOS core containers
- Modules are managed by the PlaceOS Backoffice web application which interfaces via PlaceOS REST-API
The REST-API service updates module config via RethinkDB
- Modules reflect their runtime state in Redis, making it widely available for other components of the system

### Service Discovery 
Instances of PlaceOS Core advertise (with a short TTL expiry) their existence to an etcd cluster as they come online. 
They also query etcd to discover other active instances. 
Each service continues to advertise it’s existence with the short TTL while they are online. 
If a service is offline, it’s entry in etcd will automatically be removed after the TTL expires. 
Interested services are made aware of any changes to the cluster so it can rebalance.

### Distribution of Modules across multiple Cores
Module distribution across multiple instances of active PlaceOS Cores is determined by rendezvous hashing. 
All Cores will push runtime Module state to Redis where other components of the system can access it and the state can persist the availability of the Core. 
When a Core goes online/offline, rendezvous hashing determines the new distribution.



*[SSO]: Single Sign On
