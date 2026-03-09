# AWS Monitoring Hub

A DevOps project demonstrating end-to-end deployment on AWS —
containerized services, automated CI/CD, and live infrastructure monitoring.

## Stack

- Docker + AWS ECS & ALB
- CloudWatch for metrics
- Terraform for infrastructure
- GitHub Actions for CI/CD
- React + Node.js (application layer)

## Overview

Containerized a React and Node.js app, deployed it on ECS Fargate 
behind an Application Load Balancer, and built a GitHub Actions pipeline 
that goes from code push to production automatically.
Integrated CloudWatch to surface live CPU, Memory, and Request metrics.
Infrastructure provisioned with Terraform.