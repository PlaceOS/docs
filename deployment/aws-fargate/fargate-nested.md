# PlaceOS AWS Fargate Deploy using Nested Cloudformation Stacks
## Overview

<!-- This is the one that the majority of people will use, will only useother for custom impementation. Show this first
 -->
The templates configure a PlaceOS Fargate deployment including an optional VPC configuration. 
The basic premise is to upload the nested templates to an s3 bucket and orchestrate the deployment using a root stack template.

You can use the upload-s3.sh script to upload the required files to a configurable s3 bucket using the AWS CLI tool.

Each component of the deployment is specified by a cloudformation template and designed to be deployed as it's own Cloudformation stack.

The root stack requires the following files and directory structure:

<i>
- **Security Groups** [infra/sec_groups.yml]
- **Application Load Balancer** [infra/load-balancer-https.yml]
- **Elastic File System** [infra/EFS.yml]
- **Elasticsearch** [managed/elasticsearch.yml]
- **ElastiCache** [managed/elasticache-redis-cluster.yml]
- **Fargate Cluster** [fargate/ecs-cluster.yml]
- **RethinkDB** [fargate/rethinkdb/single/rethinkdb-primary.yml]
- **etcd** [fargate/etcd-service.yml]
- **dispatch** [fargate/dispatch-service.yml]
- **NGINX** [fargate/nginx-service.yml]
- **frontends** [fargate/frontends-service.yml]
- **auth** [fargate/auth-service.yml]
- **core** [fargate/core-service.yml]
- **triggers** [fargate/triggers-service.yml]
- **rubber-soul** [fargate/rubber-soul-service.yml]
- **rest-api** [fargate/rest-api-service.yml]
- **init** [fargate/init-service.yml]
</i>

## VPC Architecture [infra/vpc.yml]
The **VPC** root stack template `[infra/vpc.yml]` deploys two private and two public subnets with user configurable CIDR ranges, an internet gateway, two NAT gateways, routes and route tables. 
The application load balancer is the only component required to be deployed in the public subnet.

## Configuring the root stack template
Once the files have been uploaded to s3, use `root-stack-templates/placeos/deploy.yml` to deploy PlaceOS.
The parameters that are required are listed below....

<i>
- **BucketName**
S3 Bucket name where nested templates live
- **CertificateId** -
Certificate Identifier from AWS ACM - required for TLS/SSL
- **EnvironmentName**
An environment name that is a suffix for resource names
- **PLACEEMAIL**
Email address to login initially to the application
- **PLACEPASSWORD**
Password to login initially to Backoffice
- **PLACEUSERNAME**
Users Name
- **PrivateSubnet1**
Select a private subnet
- **PrivateSubnet2**
Select another private subnet
- **PublicSubnet1**
Select a public subnet
- **PublicSubnet2**
Select another public subnet
- **VPC**
Select the VPC containing the public and private subnets
- **VpcCIDR**
IP range (CIDR notation) for the VPC
</i>

## AWS <i>EnvironmentName</i> parameter and Stack naming
The EnvironmentName parameter has multiple uses including tagging, service discovery and linking outputs of preceding templates with input parameters of subsequent templates.

*PlaceOS* is set as default but separate deployments within the same VPC should configure a distinct <i>EnvironmentName</i>.

The Stack name you choose for each component has no effect on the function of the deployment. 

## `init [fargate/init-service.yml]`
Init is a bootstrapper for the PlaceOS instance and is the final step in the deployment. 
This service will never completely finish as the task is designed to exit after it has run. 
You can update the ECS Service to have zero **Number of tasks** once it has run successfully.

## Accessing the deployed PlaceOS Backoffice application
The deploymemt usually takes 20 - 30m mins (ElasticSearch takes the majority of this time) to deploy completely. 
The Backoffice application will be available via ``https://{Application Load Balancer DNS NAME}/login?continue=/backoffice`` using the email and password configured by the init service. 
You can also find the application URL listed as an output for the init nested stack.
