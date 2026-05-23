resource "aws_security_group" "ecs" {
  name        = "ai-audit-ecs-sg"
  description = "SG for ECS Fargate Tasks"
  vpc_id      = aws_vpc.main.id

  # Inbound HTTP traffic on port 3000
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound access to ECR, CloudWatch, and APIs
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ai-audit-ecs-sg"
  }
}

resource "aws_security_group" "bastion" {
  name        = "ai-audit-bastion-sg"
  description = "SG for EC2 Bastion Host"
  vpc_id      = aws_vpc.main.id

  # Inbound SSH from our admin IP address
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.admin_ssh_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ai-audit-bastion-sg"
  }
}

resource "aws_security_group" "rds" {
  name        = "ai-audit-rds-sg"
  description = "SG for RDS PostgreSQL in Custom VPC"
  vpc_id      = aws_vpc.main.id

  # Inbound database connections ONLY from ECS containers and Bastion Host
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [
      aws_security_group.ecs.id,
      aws_security_group.bastion.id
    ]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "ai-audit-rds-sg"
  }
}
