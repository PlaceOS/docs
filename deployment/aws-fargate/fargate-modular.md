---
id: fargate-modular
title: AWS Fargate on Modular CloudFormation Stacks
description: Deployment guide for PlaceOS on Modular AWS CloudFormation templates.
---

<!-- # PlaceOS AWS Fargate Deploy -->

## Overview

This page assists with deploying PlaceOS on AWS using CloudFormation templates.
From VPC configuration to a functioning application, it's all modular by design.

A CloudFormation template specifies all the components.
Each component is designed to deploy as its own CloudFormation stack.

The configurable components and the templates used, in order of recommended steps, are:

- **VPC** `vpc.yml`
- **Security Groups** `sec_groups.yml`
- **Elasticsearch** `elasticsearch.yml`
- **ElastiCache** `elasticache-redis-cluster.yml`
- **Application Load Balancer** `load-balancer-https.yaml`
- **Elastic File System** `EFS.yml`
- **Fargate Cluster** `ecs-cluster.yml`
- **RethinkDB** `rethinkdb-primary.yml`
- **etcd** `etcd-service.yml`
- **dispatch** `dispatch-service.yml`
- **NGINX** `nginx-service.yml`
- **Frontends** `frontends-service.yml`
- **Auth** `auth-service.yml`
- **Core** `core-service.yml`
- **triggers** `triggers-service.yml`
- **Rubber Soul** `rubber-soul-service.yml`
- **REST API** `rest-api-service.yml`
- **init** `init-service.yml`

## AWS `EnvironmentName` parameter and Stack naming {#Environment-Name}
The `EnvironmentName` parameter's uses include: 

- Tagging 
- Service discovery 
- Linking outputs of templates with inputs of later templates

For example, the RethinkDB service uses EFS shares for it's `/data` directory. 
To pick up the correct EFS share, the templates for EFS and RethinkDB must have the same `EnvironmentName`.

Use the same `EnvironmentName` variable throughout the deployment process.
*PlaceOS* is the default but each deployment in the same VPC should configure its own `EnvironmentName`.
The Stack name you choose for each component should be descriptive but has no effect on the function of the deployment. 

## VPC Architecture: `vpc.yml` {#VPC}
The **VPC** template deploys two private and two public subnets. 
For each of these, you can configure:

- CIDR ranges 
- An internet gateway 
- Two NAT gateways 
- Routes and route tables

The application load balancer is the only component that should deploy in public subnets.

These values have presets, but you can specify any `EnvironmentName` and CIDR ranges you want.

:::info  
**The `EnvironmentName` parameter chosen here should be the same for all other consequent templates.**
:::


## Security Groups: `sec_groups.yml` {#Security-Groups}
Once the VPC is available, use this template to configure all the AWS Security Groups for the remaining stacks. 
The stacks and services are on a serverless and managed architecture. 
Use security groups to prevent unnecessary communications between the application components.

Use the same `EnvironmentName` parameter as the VPC and select the VPC created in the previous step.

## Elasticsearch (AWS Managed Service): `elasticsearch.yml` {#Elasticsearch}
After configuring the security groups, you can begin configuring the components that use them. 
By default, this template deploys an Elasticsearch cluster version with 2 instances of `t2.small.Elasticsearch`.

AWS tags which identify the associated components are:
#### **Security Group** 
> (Elasticsearch | {`EnvironmentName`} | security group).  

#### **Private Subnets**
> (Private Subnet 1 | {`EnvironmentName`})  
> (Private Subnet 2 | {`EnvironmentName`})

:::info  
You might see a message relating to an IAM Service Linked Role for Elasticsearch. 
It prevents this stack from deploying if you haven't already set up AWS Elasticsearch with your account. 
You can address this by:  

1) Un-commenting the section beginning with **`ESSLRole:`** in the `sec_groups.yml` file  

2) Redeploy the Security Groups stack using amended `sec_groups.yml`   

3) Redeploy this (Elasticsearch) stack  
:::

## ElastiCache (AWS Managed Service): `elasticache-redis-cluster.yml` {#ElastiCache}
By default, this template deploys an ElastiCache Redis cluster with Multi-AZ support.
It comprises of one Node.js Group and two `cache.t2.micro` replicas as default. 
The Redis port, snapshot and maintenance window parameters have default values but are configurable.

Here you should use the security group with AWS tags 
#### **Security Group:** 
> (ElastiCache | {`EnvironmentName`} | security group)

#### **Subnets:** 
> (Private Subnet 1 | {`EnvironmentName`})  
> (Private Subnet 2 | {`EnvironmentName`}) 

## Application Load Balancer: `load-balancer-https.yaml` {#ALB}
This template deploys an external, public facing load balancer.
It forwards public traffic to internal services.

The application load balancer is the only component that should deploy in public subnets.
It requires you use your own preconfigured certificate from AWS Certificate Manager. 
It's configured with a certificate **Identifier** from ACM.
<!-- what is this about -->

A Secure Listener serves HTTPS traffic. 
All inbound HTTP traffic redirects to its matching HTTPS.

#### **Subnets:** 
> (Public Subnet 1 | {`EnvironmentName`})  
> (Public Subnet 2 | {`EnvironmentName`})

#### **VPC:** 
> ({`EnvironmentName`} | VPC)

## Elastic File System: `EFS.yml` {#EFS}
As the application deployment consists of ephemeral containers, EFS is the persistent storage layer. 
RethinkDB, NGINX and Frontends services use the Elastic File System created by this template. 
EFS is the RethinkDB data directory. 
NGINX and Frontends us it for file storage of the Backoffice user interface.
<!-- Use of NGINX seems inconsistent - sentence case is common in these files including in variable names -->
#### **Security Groups:**
- SecurityGroupEFSNginxFrontends: 
> (NGINX and Frontends -> EFS | {`EnvironmentName`} | security group)
- SecurityGroupEFSRethinkDB:  
> (RethinkDB -> EFS | {`EnvironmentName`} | security group)

#### **Subnets:** 
> (Private Subnet 1 | {`EnvironmentName`})  
> (Private Subnet 2 | {`EnvironmentName`})

#### **VPC:** 
> ({`EnvironmentName`} | VPC)

<!-- Acronym solution would get extensive application in this document -->

## Fargate Cluster: `ecs-cluster.yml` {#Cluster}
This template deploys the Elastic Container Service (ECS) cluster for all PlaceOS container services.
The ECS Cluster configuration requires the same `EnvironmentName` parameter as prior steps.

<!-- which services does "below" refer to? All following? -->
### Notes on deploying the Fargate services.
The Fargate components of the deployment still need configuration. 
They share a lot of common parameters.
Each template configures and deploys an ECS Task Definition, Service and Task.
You can configure the ECS parameters as required but the default values specified are okay for this example.

The `ServiceName` parameter configured will result in creation of a Service Discovery record as 
> {`ServiceName`}.{`EnvironmentName`}
  
For example, `rethinkdb-primary.placeos` would be the record for the RethinkDB template. 
All future services that need configuration with the database can use this value as an input parameter.

The security groups to use for each template will appear in the appropriate sections below.
Tags for VPC and Private subnets are: 
#### **Subnets:** 
> (Private Subnet 1 | {`EnvironmentName`})  
> (Private Subnet 2 | {`EnvironmentName`})

#### **VPC:** 
> ({`EnvironmentName`} | VPC)

Configure the `EnvironmentName` parameter as in all previous steps.
<!-- Add links to these resources maybe like for etcd and nginx -->
## RethinkDB `rethinkdb-primary.yml` {#RethinkDB}
<!-- this is kind of passive bs - allowable? -->
[RethinkDB](https://github.com/rethinkdb/rethinkdb) serves as the database for PlaceOS.
RethinkDB can operate as a cluster but for the purposes of this example you will deploy a single primary member.

The RethinkDB `/data` directory uses an EFS share as created earlier by the Elastic File System stack. 
Data stored by the database will persist if the container task gets restarted or destroyed.

#### **Service Discovery created:**
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `rethinkdb-primary.placeos`

#### **Security Group:** 
> (RethinkDB | {`EnvironmentName`} | security group)

<!-- etcd is always all-lowercase even in titles and sentence starts - <i> or `` or leave it or? -->
## <i>etcd</i>: `etcd-service.yml` {#etcd}
[etcd](https://github.com/etcd-io/etcd) is the service discovery layer for PlaceOS.

#### **Service Discovery created:**
>{`ServiceName`}.{`EnvironmentName`}  

E.g. `etcd.placeos`

#### **Security Group:** 
> (etcd | {`EnvironmentName`} | security group)

## Dispatch: `dispatch-service.yml` {#Dispatch}
[Dispatch](https://github.com/PlaceOS/dispatch) allows drivers to register new servers to enable devices to connect to PlaceOS.

#### **Service Discovery created:**: 
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `dispatch.placeos`

#### **Security Group:** 
> (Dispatch | {`EnvironmentName`} | security group)

## NGINX: `nginx-service.yml` {#NGINX}
[NGINX](https://github.com/nginxinc/) is the web server for PlaceOS. 
See more on our implementation [here](https://github.com/PlaceOS/nginx)

#### **Service Discovery created:**
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `nginx.placeos`

#### **Security Group:**
> (NGINX | {`EnvironmentName`} | security group)


## Frontends: `frontends-service.yml` {#Frontends}
[Frontends](https://github.com/PlaceOS/frontends) is a sidecar to the web server.
It listens for published frontend repositories and clones them to the NGINX static folder on EFS.

#### **Required Services:** 
- RethinkDB
#### **Service Discovery created:** 
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `frontends.placeos`

#### **Security Group:**  
> (Frontends | {`EnvironmentName`} | security group)

:::caution  
This is the first service to reference a preconfigured service parameter.
`RethinkDBHost` references the RethinkDB service and defaults to `rethinkdb-primary.placeos`. 
You may need to change this if you have used a different `EnvironmentName` or `ServiceName` value.
The same logic applies to the `RethinkDBPort` and `RethinkDBDB` parameters.  
:::

## Auth: `auth-service.yml` {#Auth}
[Auth](https://github.com/PlaceOS/auth) provides the authentication service and API gatekeeper.

This service references the ElastiCache cluster configured earlier. 
Configure the **Primary Endpoint** from Redis here. 
The `RedisURL` parameter will have the form `redis://{Primary Endpoint}:{port}`

#### **Required Services:** 
- Redis
- RethinkDB
#### **Service Discovery created:**: 
> {`ServiceName`}.{`EnvironmentName`}   

E.g. `auth.placeos`

#### **Security Group:** 
> (`Auth` | {`EnvironmentName`} | security group)

## Core: `core-service.yml` {#Core}
[Core](https://github.com/PlaceOS/core) is the coordination service for running drivers on PlaceOS.

#### **Required Services:** 
- Redis
- RethinkDB
- <i>etcd</i>
#### **Service Discovery created:** 
> {`ServiceName`}.{`EnvironmentName`}   

E.g. `core.placeos`

#### **Security Group:** 
> (Core | {`EnvironmentName`} | security group)

## Triggers: `triggers-service.yml` {#Triggers}
[Triggers](https://github.com/PlaceOS/triggers) is the PlaceOS service for handling events and conditional triggers.

#### **Required Services:** 
- Redis
- RethinkDB
- <i>etcd</i>
#### **Service Discovery created:**
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `triggers.placeos`

#### **Security Group:** 
> (Triggers | {`EnvironmentName`} | security group)

## Rubber Soul: `rubber-soul-service.yml` {#Rubber-Soul}
[Rubber Soul](https://github.com/PlaceOS/rubber-soul) is a service that connects to [`rethinkdb-orm`](https://github.com/spider-gazelle/rethinkdb-orm) models and generates Elasticsearch indices.

This service references the Elasticsearch cluster configured earlier. 
Configure the ESURI with the Elasticsearch **VPC Endpoint** which will have the form `https://xxxxxx...es.amazonaws.com.`
<!-- Not sure I understand this example URL -->

#### **Required Services:** 
- Elasticsearch 
- RethinkDB
#### **Service Discovery created:**: 
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `rubber-soul.placeos`

#### **Security Group:** 
> (Rubber Soul | {`EnvironmentName`} | security group)

## REST API: `rest-api-service.yml` {REST-API}
This template configures and deploys the REST API ECS Task Definition, Service and Task.
 REST API is an API service for interacting with PlaceOS.

#### **Required Services:** 
- Elasticsearch
- RethinkDB
- Redis
- <i>etcd</i>
- Frontends
- Rubber Soul
- Triggers
#### **Service Discovery created:**: 
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `rest-api.placeos`

#### **Security Group:** 
> (`Rest-api` | {`EnvironmentName`} | security group)

## <i>init</i>: `init-service.yml` {#init}
[init](https://github.com/PlaceOS/init) initializes the PlaceOS instance and is the final step in the deployment. 
This service requires the **DNS Name** of the ALB as it's the URL for accessing the application. 
The email and password configured here will also create a login you can use once you deploy the application.

#### **Required Services:** 
- RethinkDB
- Auth
- Application Load Balancer {DNS Name}
#### **Service Discovery created:**: 
> {`ServiceName`}.{`EnvironmentName`}  

E.g. `init.placeos`

#### **Security Group:** 
> (`init` | {`EnvironmentName`} | security group)
 
:::info  
This service will never actually finish as the task will exit after it has run. 
You can update the ECS Service to have zero **Number of tasks** once it has been successful.
:::

## Accessing the deployed PlaceOS Backoffice application {#Accessing-backoffice}
Once you have completed the above steps, the Backoffice application will be available at:

<i>`https://[Application_Load_Balancer_DNS_NAME]/login?continue=/backoffice`</i>

The credentials are the email and password set by the `init` service.

*[ECS]: Elastic Container Service  
*[ALB]: Application Load Balancer  
*[ACM]: AWS Certificate Manager  
*[IAM]: Identity Access Management