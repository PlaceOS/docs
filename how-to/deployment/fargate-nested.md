---
id: fargate-nested
title: Deploy AWS Fargate on Nested CloudFormation Stacks
description: Deployment guide for PlaceOS on Nested AWS CloudFormation templates.
sidebar_position: 1
---
<!-- This is the one that the majority of people will use, will only use other for custom impementation. Show this first -->

## Overview

This page assists with deploying PlaceOS on AWS using CloudFormation templates.
The templates configure a PlaceOS Fargate deployment including an optional VPC configuration. 
The basic premise is: 

1) Upload the nested templates to an S3 bucket  
1) Orchestrate the deployment using a root stack template 

You can use the `upload-s3.sh` script in the AWS command-line tool to upload the required files to a configurable S3 bucket.

A CloudFormation template specifies all the components.
Each component is designed to deploy as its own CloudFormation stack.

The root stack requires the following files and directory structure:

- **Security Groups:** `infra/sec_groups.yml`
- **Application Load Balancer:** `infra/load-balancer-https.yml`
- **Elastic File System:** `infra/EFS.yml`
- **Elasticsearch:** `managed/elasticsearch.yml`
- **ElastiCache:** `managed/elasticache-redis-cluster.yml`
- **Fargate Cluster:** `fargate/ecs-cluster.yml`
- **RethinkDB:** `fargate/rethinkdb/single/rethinkdb-primary.yml`
- **etcd:** `fargate/etcd-service.yml`
- **dispatch:** `fargate/dispatch-service.yml`
- **NGINX:** `fargate/nginx-service.yml`
- **Frontends:** `fargate/frontends-service.yml`
- **`auth`:** `fargate/auth-service.yml`
- **`core`:** `fargate/core-service.yml`
- **triggers:** `fargate/triggers-service.yml`
- **`rubber-soul`:** `fargate/rubber-soul-service.yml`
- **REST API:** `fargate/rest-api-service.yml`
- **`init`:** `fargate/init-service.yml`

## VPC Architecture `infra/vpc.yml` {#architecture}
The **VPC** root stack template `infra/vpc.yml` deploys two private and two public subnets. 
For each of these the user can configure:

- CIDR ranges 
- An internet gateway 
- Two NAT gateways 
- Routes and route tables 

The application load balancer is the only component that should deploy in public subnets.

## Configuring the root stack template {#Stack-configuration}
Once you have uploaded the files to S3, use `root-stack-templates/placeos/deploy.yml` to deploy PlaceOS.
The required parameters are:

- **`BucketName`** S3 Bucket name where nested templates live
- **`CertificateId`**  Certificate Identifier from AWS ACM - required for TLS/SSL
- **`EnvironmentName`** An environment name that is a suffix for resource names
- **`PLACEEMAIL`** Email address to login initially to the application
- **`PLACEPASSWORD`** Password to login initially to Backoffice
- **`PLACEUSERNAME`** Users Name
- **`PrivateSubnet1`** Select a private subnet
- **`PrivateSubnet2`** Select another private subnet
- **`PublicSubnet1`** Select a public subnet
- **`PublicSubnet2`** Select another public subnet
- **`VPC`** Select the VPC containing the public and private subnets
- **`VpcCIDR`** IP range (CIDR notation) for the VPC

## AWS `EnvironmentName` parameter and Stack naming {#Environment-Name}
The `EnvironmentName` parameter's uses include: 
- Tagging 
- Service discovery 
- Linking outputs of templates with inputs of later templates

*PlaceOS* is the default but each deployment in the same VPC should configure its own `EnvironmentName`.
The Stack name you choose for each component has no effect on the function of the deployment. 

## <i>init</i>: `fargate/init-service.yml` {#init}
[init](https://github.com/PlaceOS/init) initializes the PlaceOS instance and is the final step in the deployment. 
 
:::info  
This service will never actually finish as the task will exit after it has run.
You can update the ECS Service to have zero **Number of tasks** once it has been successful.
:::

## Accessing the deployed PlaceOS Backoffice application {#Accessing-backoffice}
You can expect the deployment to take 20-30 minutes, most of which is Elasticsearch.
The Backoffice application will be available at:  

`https://{Application_Load_Balancer_DNS_NAME}/login?continue=/backoffice`

The credentials are the email and password set by the `init` service.
You can also find the application URL listed as an output for the `init` nested stack.


*[ACM]: AWS Certificate Manager
*[CIDR]: Classless Inter-Domain Routing
*[ECS]: Elastic Container Service
*[EFS]: Elastic File System
*[VPC]: Virtual Private Cloud
