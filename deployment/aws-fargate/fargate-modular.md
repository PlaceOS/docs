# PlaceOS AWS Fargate Deploy
## Overview
The following assists with deploying PlaceOS on AWS using Cloudformation templates.

The templates configure a PlaceOS Fargate deployment from initial VPC configuration through to a functioning application and is modular by design.

Each component of the deployment is specified by a cloudformation template and designed to be deployed as it's own Cloudformation stack.

The configurable components of the deploy and the templates utilised are listed below and are in order of recommended steps, beginning with VPC configuration...

- **VPC** [vpc.yml]
- **Security Groups** [sec_groups.yml]
- **Elasticsearch** [elasticsearch.yml]
- **ElastiCache** [elasticache-redis-cluster.yml]
- **Application Load Balancer** [load-balancer-https.yaml]
- **Elastic File System** [EFS.yml]
- **Fargate Cluster** [ecs-cluster.yml]
- **RethinkDB** [rethinkdb-primary.yml]
- **etcd** [etcd-service.yml]
- **dispatch** [dispatch-service.yml]
- **NGINX** [nginx-service.yml]
- **frontends** [frontends-service.yml]
- **auth** [auth-service.yml]
- **core** [core-service.yml]
- **triggers** [triggers-service.yml]
- **rubber-soul** [rubber-soul-service.yml]
- **rest-api** [rest-api-service.yml]
- **init** [init-service.yml]

## AWS Environment Name parameter and Stack naming
The EnvironmentName parameter is common throughout the templates. It is used for various functions including tagging, service discovery and linking outputs of deployed templates with input parameters of subsequent templates. e.g. the RethinkDB service uses EFS shares for it's */data* directory. For the RethinkDB template to pick up the correct EFS share, both the EFS template and the RethinkDB template must be configured with the same EnvironmentName variable.

Use the same EnvironmentName variable throughout the deployment process. The templates are preconfigured to use *placeos* by default but this can be specified by the user and separate deployments within the same VPC should use a distinct EnvironmentName.

The Stack name you choose for each component should describe the component being deployed but is not important to the function or configuration of the deployment.

## VPC Architecture [vpc.yml]
The VPC template deploys two private and two public subnets with user configurable CIDR ranges, an internet gateway, two NAT gateways, routes and route tables. Everything apart from the application load balancer should be deployed in the VPC's private subnets.

**The EnvironmentName parameter chosen here should be used for all other consequent templates.**

Although the important values have been prepopulated, you can specify an environment name you will use throughout the PlaceOS deployment and whatever CIDR ranges you require.

## Security Groups [sec_groups.yml]
Once the VPC from the previous step is available, you can use the this template to configure all the AWS Securty Groups that will be used throughout the configuration of remaining stacks. As the stacks and services are deployed on a serverless and managed architecture, security groups are used to allow only communications that are necessary between the various components of the application.

Use the same EnvironmentName parameter as the VPC and select the VPC created in the previous step.

## Elasticsearch (AWS Managed Service) [elasticsearch.yml]
After configuring the security groups to be used throughout the deplopyment, we can begin configuring the components that require them. This template is preconfigured to deploy an Elasticsearch cluster version  comprising 2 instances of t2.small.elasticsearch instance type as default.

The security group to use here will be tagged as (Elasticsearch | {EnvironmentName} | security group) and it is best to choose the Private subnets created by the VPC stack and tagged as (Private Subnet 1 | {EnvironmentName}) and (Private Subnet 2 | {EnvironmentName}).

**N.B.** You might see a message relating to an IAM Service Linked Role for Elasticsearch, preventing this stack from deploying if you haven't previously configured AWS elasticsearch with your account. There is a commented section beginning with **ESSLRole:** in the sec_groups.yml file. You can uncomment this section and redeploy the Security Groups stack using amended sec_groups.yml file and redeploy this stack.

## Elasticache (AWS Managed Service) [elasticache-redis-cluster.yml]
This template is preconfigured to deploy an Elasticache Redis cluster with Multi-AZ support, comprising of 1 Node Group and two cache.t2.micro replicas as default. The standard redis port is prepopulated in addition to configurable snapshot and maintenence window parameters.

 - **Security Group:** (Elasticache | {EnvironmentName} | security group)
 - **Subnets:** (Private Subnet 1 | {EnvironmentName}) and (Private Subnet 2 | {EnvironmentName}) .

## Application Load Balancer [load-balancer-https.yaml]
This template deploys an external, public facing load balancer for forwarding public traffic to internal services.

The ALB is the only component to be deployed via public subnets and it requires you use your own preconfigured certificate from AWS Certificate Manager. It is configured with a certificate **Identifier** from ACM.

A Secure Listener is used to serve https traffic. All inbound http traffic is redirected to it's https equivalent.

- **Subnets:** (Public Subnet 1 | {EnvironmentName}), (Public Subnet 2 | {EnvironmentName})
- **VPC:** ({EnvironmentName} | VPC)

## Elastic File System [EFS.yml]
As the application deployment comprises of containers which are ephemeral, EFS is used as the persistent storage layer. The RethinkDB, NGINX and frontends services utilise the EFS file system created by this template. EFS is used for the rethinkdb data directory and by NGINX and frontends for file storage of the backoffice user interface.

- **Security Groups:**
  - SecurityGroupEFSNginxFrontends: (Nginx and Frontends -> EFS | {EnvironmentName} | security group).
  - SecurityGroupEFSRethinkDB:  (Rethinkdb -> EFS | {EnvironmentName} | security group).
- **Subnets:** (Private Subnet 1 | {EnvironmentName}), (Private Subnet 2 | {EnvironmentName})
- **VPC:** ({EnvironmentName} | VPC)

## Fargate Cluster [ecs-cluster.yml]
This template deploys the Elastic Container Service [ECS] cluster that will be used for all PlaceOS container services. The ECS Cluster will be configured with the EnvironmentName parameter. Use the same EnvironmentName parameter as prior steps.

## Notes on deploying the Fargate services.
What remains to be configured are the Fargate components of the deployment and they share a lot of common parameters and configuration.

Each template configures and deploys an ECS Task Definition, Service and Task.

The user can configure the various ECS parameters as required but the default values specified are sufficient for this example.

The *ServiceName* parameter configured will result in a Service Discovery record being created as {ServiceName}.{EnvironmentName} e.g. rethinkdb-primary.placeos for the RethinkDB template. All future services that require configuration with the database can use this value as an input parameter.

The security groups to use for each template will be listed in the appropriate sections below and the VPC and Private subnets created by the VPC stack and tagged as (Private Subnet 1 | {EnvironmentName}) and (Private Subnet 2 | {EnvironmentName}) should be chosen.

Configure the EnvironmentName parameter as in all previous steps.

## RethinkDB [rethinkdb-primary.yml]
 RethinkDB is used as the database for PlaceOS. RethinkDB can operate as a cluster but for the purposes of this example we will deploy a single primary member.

 The RethinkDB */data* directory is configured to use an EFS share that was created earlier by the Elastic File System stack. Data stored by the database will persist if the container task is restarted/destroyed.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. rethinkdb-primary.placeos
- **Security Group:** (RethinkDB | {EnvironmentName} | security group)

## etcd [etcd-service.yml]
etcd is used as the service discovery layer for PlaceOS.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. etcd.placeos
- **Security Group:** (Etcd | {EnvironmentName} | security group)

## dispatch [dispatch-service.yml]
dispatch allows engine drivers to register new servers for devices that might connect to engine vs engine connecting to devices.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. dispatch.placeos
- **Security Group:** (Dispatch | {EnvironmentName} | security group)

## NGINX [nginx-service.yml]
NGINX is used as the web server for PlaceOS

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. nginx.placeos
- **Security Group:** (Nginx | {EnvironmentName} | security group)


## frontends [frontends-service.yml]
Frontends is intended to be a sidecar to the webserver that listens for published front-end repositories and clones them to the NGINX static folder on EFS.

**N.B.** This is the first service with a configuration to reference a pre-configured service parameter i.e. the *RethinkDBHost* parameter referencing the RethinkDB service. You can see here that it is pre-configured with ``rethinkdb-primary.placeos``. If the user has used another EnvironmentName parameter than placeos or a different ServiceName parameter for the RethinkDB service, the user will need to adjust the *RethinkDBHost* parameter accordingly. The same logic applies to the RethinkDB Port and RethinkDBDB parameters.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. frontends.placeos
- **Required Services:** RethinkDB
- **Security Group:** (Frontends | {EnvironmentName} | security group)

## auth [auth-service.yml]
Auth provides the authentication service and API gatekeeper.

This service references the Elasticache cluster configured earlier. Configure the **Primary Endpoint** from Redis here. The *RedisURL* parameter will have the form ``redis://{Primary Endpoint}:{port}``

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. auth.placeos
- **Required Services:** Redis, RethinkDB
- **Security Group:** (Auth | {EnvironmentName} | security group)

## core [core-service.yml]
Core is the coordination service for running drivers on PlaceOS.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. core.placeos
- **Required Services:** Redis, RethinkDB, etcd
- **Security Group:** (Core | {EnvironmentName} | security group)

## triggers [triggers-service.yml]
Triggers is the PlaceOS service for handling events and conditional triggers.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. triggers.placeos
- **Required Services:** Redis, RethinkDB, etcd
- **Security Group:** (Triggers | {EnvironmentName} | security group)

## rubber-soul [rubber-soul-service.yml]
Rubber-soul is a service that hooks into rethinkdb-orm models and generates elasticsearch indicies.

This service references the Elasticsearch cluster configured earlier. Configure the ESURI with the Elasticsearch **VPC Endpoint** which will have the form ``https://xxxxxx...es.amazonaws.com.``

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. rubber-soul.placeos
- **Required Services:** Elasticsearch, RethinkDB
- **Security Group:** (Rubber Soul | {EnvironmentName} | security group)

## rest-api [rest-api-service.yml]
This template configures and deploys the rest-api ECS Task Definition, Service and Task. Rest-api is an API service for interacting with PlaceOS.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. rest-api.placeos
- **Required Services:** Elasticsearch, RethinkDB, Redis, etcd, frontends, rubber-soul, triggers
- **Security Group:** (Rest-api | {EnvironmentName} | security group)

## init [init-service.yml]
Init is a bootstrapper for the PlaceOS instance.

This service requires the **DNS Name** of the application load balancer as this is used as the url for accessing the application. The email and password configured here will also create a login you can use once the application is deployed.

- **Service Discovery created:**: {ServiceName}.{EnvironmentName} e.g. init.placeos
- **Required Services:** RethinkDB, auth, Application Load Balancer {DNS Name}
- **Security Group:** (Init | {EnvironmentName} | security group)

N.B. This service will never completely finish deploying as the task is designed to exit after it has run. You can either update the ECS Service to have zero **Number of tasks** or cancel the stack deployment once it has run successfully.

## Accessing the deployed PlaceOS backoffice application
If you have configured all of the above steps correctly - the backoffice application will be available via
``https://{Application Load Balancer DNS NAME}/login?continue=/backoffice`` using the email and password configured by the init service.
