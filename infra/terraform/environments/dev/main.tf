terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "frontend_ecr" {
  source = "../../modules/ecr"

  repository_name = "${var.project_name}-frontend"
}

module "backend_ecr" {
  source = "../../modules/ecr"

  repository_name = "${var.project_name}-backend"
}

module "ecs_cluster" {
  source = "../../modules/ecs"

  cluster_name = "${var.project_name}-${var.environment}-ecs-cluster"
}

module "network" {
  source = "../../modules/network"

  project_name      = var.project_name
  environment       = var.environment
  availability_zone = var.availability_zone
}

module "ecs_ec2" {
  source = "../../modules/ecs-ec2"

  project_name  = var.project_name
  environment   = var.environment
  cluster_name  = module.ecs_cluster.cluster_name
  aws_region    = var.aws_region
  instance_type = "t3.micro"

  vpc_id    = module.network.vpc_id
  subnet_id = module.network.public_subnet_id
}