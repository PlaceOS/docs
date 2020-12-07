---
id: fargate-nested
title:  PlaceOS AWS Fargate Deploy using Nested CloudFormation Stacks
description: Deployment guide for PlaceOS on AWS CloudFormation templates.
---
<!-- # PlaceOS AWS Fargate Deploy using Nested CloudFormation Stacks -->

## Overview

<!-- This is the one that the majority of people will use, will only use other for custom impementation. Show this first
 -->
This page assists with deploying PlaceOS on AWS using CloudFormation templates.
The templates configure a PlaceOS Fargate deployment including an optional VPC configuration. 
The basic premise is: 

1) Upload the nested templates to an s3 bucket  
1) Orchestrate the deployment using a root stack template 

You can use the `upload-s3.sh` script to upload the required files to a configurable s3 bucket using the AWS CLI tool.

A CloudFormation template specifies all the components.
Each component is designed to deploy as its own CloudFormation stack.

The root stack requires the following files and directory structure:

<!-- standardise some format of filenames - `` only -->
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

## VPC Architecture `infra/vpc.yml`
The **VPC** root stack template `infra/vpc.yml` deploys two private and two public subnets. 
For each of these the user can configure:

- CIDR ranges 
- An internet gateway 
- Two NAT gateways 
- Routes and route tables 

The application load balancer is the only component that should deploy in public subnets.

## Configuring the root stack template
Once you have uploaded the files to s3, use `root-stack-templates/placeos/deploy.yml` to deploy PlaceOS.
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

## AWS `EnvironmentName` parameter and Stack naming
The `EnvironmentName` parameter's uses include: 
- Tagging 
- Service discovery 
- Linking outputs of templates with inputs of later templates

*PlaceOS* is the default but each deployment in the same VPC should configure its own `EnvironmentName`.
The Stack name you choose for each component has no effect on the function of the deployment. 

## `init` `fargate/init-service.yml`
`init` is a bootstrapper for the PlaceOS instance and is the final step in the deployment. 
This service will never actually finish as the task will exit after it has run. 
You can update the ECS Service to have zero **Number of tasks** once it has been successful.

## Accessing the deployed PlaceOS Backoffice application
You can expect the deployment to take 20-30 minutes, most of which is Elasticsearch.
The Backoffice application will be available at:  

<i>`https://{Application Load Balancer DNS NAME}/login?continue=/backoffice`</i>

The credentials are the email and password set by the `init` service.
You can also find the application URL listed as an output for the `init` nested stack.