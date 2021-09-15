---
title: System Requirements
description: Recommended Minimum System Requirements
---

## Production Environment

### Kubernetes Deployment

See [PlaceOS Kubernetes Terraform](https://github.com/place-labs/k8s-terraform/)
and [PlaceOS Kubernetes Helm Charts](https://github.com/place-labs/k8s-helm/) for reference.

- Supported Kubernetes platforms:
  - AWS EKS
  - AWS EKS on Fargate
  - Google Cloud GKE
  - Azure AKS
  - Bare metal: Kubernetes, k3D

- Required Kubernetes features
  - Persistent storage

- Clusters: 1
- Regions: 1
- Availability Zones: 3 or more
- Nodes: 3 or more
- Minimum node size:
  - 4 cores
  - 8 GB RAM
- Persistent Volumes utilized:
  - 8 x 10 GB
  - 1 x 100 MB

### Linux VM based Deployment
- `docker-compose`
- Minimum node size:
  - 4 cores
  - 8 GB RAM
  - 50 GB storage

## Non-Production Environment

### Kubernetes Deployment

- Clusters: 1
- Regions: 1
- Availability Zones: 1 or more
- Nodes: 2 or more
- Minimum node size:
  - 2 cores
  - 8 GB RAM
- Persistent Volumes utilized:
  - 8 x 10 GB
  - 1 x 100 MB
  
### Linux VM based Deployment

- `docker-compose`
- Minimum node size:
  - 4 cores
  - 8 GB RAM
  - 50 GB storage

*[EKS]: Elastic Kubernetes Service
*[GKE]: Google Kubernetes Engine
*[VM]: Virtual Machine
*[AKS]: Azure Kubernetes Service
*[k3D]: Ranchers Little Lab Lightweight Kubernetes Wrapper