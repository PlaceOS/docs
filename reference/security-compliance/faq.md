---
title: FAQ
description: Frequently asked questions regarding Security & Compliance
---

Detailed below are the answers to some frequently asked questions about PlaceOS, data storage and security.

## Data

**Q: How does PlaceOS manage data, protecting customer data and governs customer data?**

A: Most data is not stored internally within the system. 

Sources of truth such as Office365 hold the data.  

Manipulated data is stored ephemerally in memory and access to any data requires authentication, authorisation to access is determined by the defined processes.

**Q: Can you please outline each type of datastore / database / data repository included in your system?**

A: The PlaceOS Solution uses RethinkDB as the primary database and datastore. 

The PlaceOS Application does not store any data, all data is stored in RethinkDB. 

Access to the RethinkDB database can be arranged depending on client security for data modelling and/or extraction.

**Q: What type of data might you store?**

A: All devices, device states, configuration and integrations are stored in the database. 

Secure items such as passwords are all encrypted on entry and are not human readable. 

**Q: What happens to data stored when customers terminate their usage of PlaceOS?**

A: The server is most typically hosted and managed by the customer, when the service is terminated the customer can decide to destroy the machine and all data, extract backups and destroy the data or retain the data as is.

**Q: What cryptographic protocols are used to secure client data at rest?**

A: 256 bit AES using GCM ciphers are used to prevent tampering & environment variables on client servers data at rest. 

## Security

More detailed security information including information around ciphers and encryption can be found on the [Security page](./security.md).

**Q: Can you please describe how PlaceOS adheres to common security principles?**

A: The system is secure by design. 

All requests are authenticated and authorised, applications and domains also need to be registered within PlaceOS to function with the API. 

Cookies are secure, HTTPS and only transmitted on the relevant paths upon request. 

A valid authentication token will be checked against the domain, application and user upon any request. 

All input is whitelisted and models validated before being saved to the database.

**Q: Do you undertake ongoing periodic information security testing activities such as; vulnerability testing, penetration testing, and source code reviews against industry best practice guides?**

A: Yes, the platform is regularly tested for vulnerabilities both in and out of production. 

Customers are free to conduct necessary penetration testing on the software once in production as a part of their internal security standards and auditing processes. 

These reports are often provided to PlaceOS for review, to date no vulnerabilities or risks have been reported.

**Q: How does PlaceOS provide least privileged role based access control?**

A: The platform, by default has three user levels, these are System Administrators, Tech Support and Staff Member (can authenticate against SSO). 

System administrators have full access and control over the system configuration (via Web UI only) while Tech Support can see the status of systems and devices. 

Once connected with an IAM Provider, users can be assigned the necessary level of access. 

If no access level is assigned users are unable to log into the back office, with exception to the Staff App where business rules dictate staff can access the app without authentication.

Infrastructure access is dictated by the customer.

**Q: Can you please outline how PlaceOS encrypts data at rest / in-motion, the key / certificate management technologies used?**

A: Standard SSL/TLS is used for data in-motion. 

[Further information is available in the Security section](./security.md).

**Q: What security measures are enforced internally upon staff with regards to customer information?**

A: We use a range of standard tools for development including, but not limited too; GitHub, BitBucket, Jira and Confluence. 

All internal services are secured by SSO with 2-Factor Authentication enforced. 

No client or customer information, credentials or otherwise are stored locally on staff hardware. A

ll internal access to code and client information is least privileged role/group based. 

## Infrastructure

**Q: Is media (i.e. HDD, SSD, USB, Tape, etc.) destroyed securely when it is no longer needed for business or legal reasons?**

A: This is managed by the client under standard IT Practices, we do not store any client data outside the Production/UAT/DEV Environments.

## Third Parties

**Q: What information, if any, does PlaceOS share with third parties?**

A: PlaceOS the platform and business do not share any customer information with third parties. 

**Q: What are the available interfaces in which PlaceOS can interact and/or connect with third party services?**

A: PlaceOS can interact with other systems using API, SOAP, REST, Web Sockets, HTTPS and SSH. 

**Q: How does PlaceOS allow third party data visualisation tools to interact with your datastore?**

A: PlaceOS can pass data logs to data visualisation tools such as Splunk or a web standard data visualisation tool such as Power Bi or Google Analytics via API. 

We also provide time-series data via InfluxDB.

Data streams are available via [MQTT](../../overview/Protocols/mqtt.md).