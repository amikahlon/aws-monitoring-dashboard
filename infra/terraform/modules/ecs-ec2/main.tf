data "aws_ssm_parameter" "ecs_optimized_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2023/recommended/image_id"
}

resource "aws_iam_role" "ecs_instance_role" {
  name = "${var.project_name}-${var.environment}-ecs-instance-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_role_policy" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "${var.project_name}-${var.environment}-ecs-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

resource "aws_security_group" "ecs_instance_sg" {
  name        = "${var.project_name}-${var.environment}-ecs-instance-sg"
  description = "Security group for ECS EC2 instance"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 4000
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "${var.project_name}-${var.environment}-ecs-instance-sg"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

resource "aws_instance" "ecs_instance" {
  ami                    = data.aws_ssm_parameter.ecs_optimized_ami.value
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [aws_security_group.ecs_instance_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.ecs_instance_profile.name

  user_data = <<-EOF
              #!/bin/bash
              echo ECS_CLUSTER=${var.cluster_name} >> /etc/ecs/ecs.config
              EOF

  tags = {
    Name        = "${var.project_name}-${var.environment}-ecs-instance"
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}