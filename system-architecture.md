---
id: system-architecture
title: System Architecture
description: 
---
<!-- source material gospel at https://docs.google.com/document/d/1kzQpnI_nTEUq_Qe5RApV6AkrRsqIUCyKsoPVirCt7bs/edit#heading=h.69jrquo1axlr -->

## System Functionality and Requirements
Below is a table of high level functions that PlaceOS is capable of and the technical requirements for each.

<!--
Function | Description | Requirement
---|---|---
Log in using existing enterprise credentials (single sign-on) | Users will not need to “sign up” and remember a new user account/password. | Integration with enterprise identity providers via SAML2 or OAuth2. Examples: <ul><li> Azure AD Enterprise Application </li><li> ADFS, </li><li> Google GSuite authentication </li></ul>
Book Rooms |  PlaceOS web apps will be able to search and book room/user Calendars from the enterprise directory (e.g. Office 365 / Exchange Online / Google GSuite) | Office 365 / Exchange Online or Google Calendar: <ul><li>Integration with Microsoft Graph API via an Azure “Registered App”</li><li> All required Calendars and Users must be accessible via MS Graph API</li><li> OR Google Calendar API, users on GSuite</li></ul> 
Show or use sensor data | PlaceOS web apps or analytics will be able to show or track live sensor data (e.g. desk occupancy, in-room people count, air quality, etc… | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Control devices | PlaceOS web apps or automations will be able to send messages to edge devices over the network in order to control them or receive their live status information. | Compatible PlaceOS Driver for the devices/services <br/> Network connectivity to the devices/services or their gateway.
Locate Devices | PlaceOS web apps will be able to show where in the building a user’s device may currently be located (if their laptop/mobile is online). This may be used to infer where a person is located. | Integration with locations services such as: <ul><li> Cisco DNA Spaces </li><li> Meraki RTLS </li><li>HP Aruba</li></ul> 
Analytics for connected devices/integrations | Provide time-synced, retrospective data for all connected devices/integrations via an analytics dashboard, enabling insights. | PlaceAnalytics extension
-->

<!-- look at the abbr tag AND the header  -->
### Log in with SSO
Using existing enterprise credentials (single sign-on)
Users will not need to “sign up” and remember a new user account/password.  

**Requirement**   
Integration with enterprise identity providers via SAML2 or OAuth2. 
Examples:
- Azure AD Enterprise Application
- ADFS
- Google GSuite authentication

### Book Rooms
PlaceOS web apps will be able to search and book room & user Calendars from the enterprise directory. 
Enterprise directories include Office 365, Exchange Online, Google GSuite etc.  

**Requirement**  
Office 365/Exchange Online or Google Calendar: 
- Integration with Microsoft Graph API via an Azure “Registered App”
- All required Calendars and Users must be accessible via MS Graph API
- OR Google Calendar API, users on GSuite

### Show or use sensor data
PlaceOS web apps or analytics will be able to show or track live sensor data, such as:
- Desk occupancy
- In-room people count
- Air quality 

**Requirement**   
Compatible PlaceOS Driver for the devices/services

Network connectivity to the devices/services or their gateway.

### Control devices 
PlaceOS web apps or automations will be able to send messages to edge devices over the network, to control them or receive their live status information.

**Requirement**  
Compatible PlaceOS Driver for the devices/services. 
Network connectivity to the devices/services or their gateway.

### Locate Devices
If a user's device (such as phone or laptop) is online, PlaceOS will be able to locate it within the building.
This infers a person's location.

**Requirement**  
Integration with locations services such as:
- Cisco DNA Spaces
- Meraki RTLS
- HP Aruba

### Analytics for connected devices/integrations 
Provide time-synced, retrospective data for all connected devices/integrations via an analytics dashboard, enabling insights.

**Requirement** 
PlaceAnalytics extension


## Microservices running in PlaceOS Kubernetes Cluster
These microservices will be managed by the PlaceOS service integrator / support partner.

### ingress
Purpose: Serve web requests (static files and upstream reverse proxying to rest-api).  
**Image:** https://hub.docker.com/r/yobasystems/alpine-nginx  
**Source:** https://github.com/nginx/nginx

### etcd
Purpose: Distributed key value store used for PlaceOS service discovery and leader election
**Image:** https://hub.docker.com/r/bitnami/etcd
**Source:** https://github.com/etcd-io/etcd

### RethinkDB
Purpose:     Database for permanent storage of PlaceOS configuration
Configuration:
Three node cluster in 3 different availability zones within same region for HA
**Image:** https://hub.docker.com/_/rethinkdb
**Source:** https://github.com/rethinkdb/rethinkdb

### PlaceOS core
Purpose:     Application in a Docker container that interfaces with external devices/services
**Image:** https://hub.docker.com/r/placeos/core
**Source:** https://github.com/PlaceOS/core

### PlaceOS auth
Purpose:     Application in a Docker container that provides authentication
**Image:** https://hub.docker.com/r/placeos/auth
**Source:** https://github.com/PlaceOS/auth

### PlaceOS rest-api
Purpose:     Application in a Docker container that provides REST API for web applications
**Image:** https://hub.docker.com/r/placeos/rest-api
**Source:** https://github.com/PlaceOS/rest-api

### PlaceOS triggers
Purpose:     Perform user defined actions, without code, when conditions are met
**Image:** https://hub.docker.com/r/placeos/triggers
**Source:** https://github.com/PlaceOS/triggers

### PlaceOS dispatch
Purpose:     Reverse proxy incoming communications from devices/services to PlaceOS core. 
This is required to handle protocols like SNMP traps - often not required.
**Image:** https://hub.docker.com/r/placeos/dispatch
**Source:** https://github.com/PlaceOS/dispatch

### PlaceOS rubber-soul
Purpose:     Stream RethinkDB changes to elasticsearch, which will index the documents for fast text searching
**Image:** https://hub.docker.com/r/placeos/rubber-soul
**Source:** https://github.com/PlaceOS/rubber-soul


## High Availability and Distributed Control
High availability is achieved by distributing services through Availability Zones. 
When using container platforms such as AWS Fargate, the containers are automatically distributed and automatically re-launched in alternative Availability Zones if a zone becomes unavailable.

### Definitions
Driver: Code that defines how a device/service can be interfaced with, and what data is made available to other components of PlaceOS.
Drivers exist as files inside the PlaceOS core containers.
Drivers are managed by the PlaceOS backoffice web application which interfaces via PlaceOS rest-api.
PlaceOS Core creates a separate process for Driver in use, which will serve all the Modules (instances) of this Driver.
Modules are distributed amongst the instances of core
Module: An instance of a Driver, that represents a single real-world device/service. 
It is essentially a “digital twin” of that external device, or a client to that external service.
Modules exist in memory in the PlaceOS core containers
Modules are managed by the PlaceOS backoffice web application which interfaces via PlaceOS rest-api. 
The rest-api service updates module config via rethinkdb.
Modules reflect their runtime state in Redis, making it widely available for other components of the system.

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
