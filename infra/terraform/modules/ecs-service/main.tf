resource "aws_ecs_task_definition" "app" {
  family                   = "${var.project_name}-${var.environment}-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = var.backend_image
      essential = true
      cpu       = 128
      memory    = 256

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = "4000"
        },
        {
          name  = "AWS_REGION"
          value = "eu-central-1"
        },
        {
          name  = "ECS_CLUSTER_NAME"
          value = "aws-monitoring-dashboard-dev-ecs-cluster"
        },
        {
          name  = "ECS_SERVICE_NAME"
          value = "aws-monitoring-dashboard-dev-service"
        }
      ]

      portMappings = [
        {
          containerPort = 4000
          hostPort      = 4000
          protocol      = "tcp"
        }
      ]
    },
    {
      name      = "frontend"
      image     = var.frontend_image
      essential = true
      cpu       = 128
      memory    = 256

      links = ["backend"]

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
    }
  ])

  tags = {
    Name        = "${var.project_name}-${var.environment}-task"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-${var.environment}-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "EC2"

  deployment_minimum_healthy_percent = 0
  deployment_maximum_percent         = 100

  tags = {
    Name        = "${var.project_name}-${var.environment}-service"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}