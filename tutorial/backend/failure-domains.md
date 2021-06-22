---
title: Troubleshooting Backend Failures
description: This document outlines possible areas of failure and how they impact users
sidebar_position: 3
---


## Points of failure

### etcd Failure

etcd is used by API and Core to determine the addresses of running Core services.  
As well as to determine where a module is executing in a cluster.

  * Some drivers may not function as the API won't be able to reach them
  * Core instances won't be able to join the cluster and won't launch drivers
  * Most API requests will continue to work, execute and WebSocket requests will fail
  * Triggers will fail


### RethinkDB Failure

RethinkDB holds cluster configuration, primarily used by core during cluster init

* Most API requests will stop functioning, including authentication  
* Existing WebSocket requests will continue to function


### Redis Failure

Redis holds the runtime state of the cluster, such as module metadata and module status

* Status changes and signals will stop functioning
* Errors raised in modules may prevent some execute requests from functioning properly
* Execute APIs and cross driver communication will be effected as module metadata will be unavailable


### Elasticsearch failure

* API index / listing / searching requests will fail - this will be mostly apparent when using Backoffice
* All other aspects of the system will continue functioning


### Driver compilation issue / crash

* Executes directed at a module running on the driver will fail


## Troubleshooting

In the event of a failure, being able to isolate which aspect of the system is not functioning is key to a quick recovery.

* Can you log-in?
  If not it's probably a *RethinkDB Failure* or loadbalancer issue (check if requests are hitting the services)
* Does Backoffice list the systems?
  If not it's probably an *Elasticsearch failure*

If you can login and see systems:
* Select a system you can safely use for testing
  * Does the list of modules and module functions load?
    If not it's probably a *Redis Failure*
  * Does executing a function work from Backoffice?
    View the response to see the error:
    * If the error says `no core instances` then *core* might be down or unable to connect to *etcd*
    * If the error says `unable to connect to etcd` then *etcd* might be down or the *API* can't connect to etcd

This should help you identify the cause of most issues.
