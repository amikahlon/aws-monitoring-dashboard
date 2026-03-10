variable "aws_region" {
  type    = string
  default = "eu-north-1"
}

variable "project_name" {
  type    = string
  default = "aws-monitoring-dashboard"
}

variable "environment" {
  type    = string
  default = "dev"
}

variable "availability_zone" {
  type    = string
  default = "eu-central-1a"
}