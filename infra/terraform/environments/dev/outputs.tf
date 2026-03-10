output "frontend_repository_url" {
  value = module.frontend_ecr.repository_url
}

output "backend_repository_url" {
  value = module.backend_ecr.repository_url
}