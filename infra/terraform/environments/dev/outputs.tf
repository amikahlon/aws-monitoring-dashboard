output "frontend_repository_url" {
  value = module.frontend_ecr.repository_url
}

output "backend_repository_url" {
  value = module.backend_ecr.repository_url
}

output "vpc_id" {
  value = module.network.vpc_id
}

output "public_subnet_id" {
  value = module.network.public_subnet_id
}

output "ecs_instance_public_ip" {
  value = module.ecs_ec2.public_ip
}

output "ecs_service_name" {
  value = module.ecs_service.service_name
}

output "task_definition_arn" {
  value = module.ecs_service.task_definition_arn
}