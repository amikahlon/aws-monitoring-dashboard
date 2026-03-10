resource "aws_ecr_repository" "this" {
  name                 = var.repository_name
  image_tag_mutability = var.image_tag_mutability

  # מאפשר למחוק את ה-repository גם אם יש בו images
  force_delete = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project     = "aws-monitoring-dashboard"
    ManagedBy   = "Terraform"
    Environment = "dev"
  }
}