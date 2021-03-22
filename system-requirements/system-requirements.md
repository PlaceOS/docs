# Recommended Minimum System Requirements

See https://github.com/place-labs/k8s-terraform/
and https://github.com/place-labs/k8s-helm/

## Production Environment

### Kubernetes Deployment

- Supported Kubernetes platforms:
  - AWS EKS
  - AWS EKS on Fargate
  - GCP GKE
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
  - 8GB RAM
- Persistent Volumes utilised:
  - 8x 10GB
  - 1x 100MB

### Linux VM based Deployment
- docker-compose
- Minimum node size:
  - 4 cores
  - 8GB RAM
  - 50GB storage



## Non-Production Environment

### Kubernetes Deployment

- Minimum node size:
  - 2 cores
  - 8GB RAM
- Persistent Volumes utilised:
  - 8x 10GB
  - 1x 100MB
  
### Linux VM based Deployment
- docker-compose
- Minimum node size:
  - 4 cores
  - 8GB RAM
  - 50GB storage