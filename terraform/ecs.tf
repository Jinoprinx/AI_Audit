resource "aws_ecs_cluster" "main" {
  name = "ai-audit-cluster"

  tags = {
    Name = "ai-audit-cluster"
  }
}

# CloudWatch Log Group for container logs
resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/ai-audit"
  retention_in_days = 7

  tags = {
    Name = "ai-audit-log-group"
  }
}

# Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "ai-audit-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "512"
  memory                   = "1024"
  execution_role_arn       = aws_iam_role.ecs_execution.arn

  container_definitions = jsonencode([
    {
      name      = "ai-audit-app"
      image     = "682033488698.dkr.ecr.us-east-1.amazonaws.com/ai-audit:latest"
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "DATABASE_URL"
          value = "postgresql://dbadmin:${var.db_password}@${aws_db_instance.rds.address}:5432/postgres?sslmode=require"
        },
        {
          name  = "DIRECT_URL"
          value = "postgresql://dbadmin:${var.db_password}@${aws_db_instance.rds.address}:5432/postgres?sslmode=require"
        },
        {
          name  = "NEXTAUTH_SECRET"
          value = var.nextauth_secret
        },
        {
          name  = "OPENAI_API_KEY"
          value = var.openai_api_key
        },
        {
          name  = "BREVO_API_KEY"
          value = var.brevo_api_key
        },
        {
          name  = "BREVO_SMTP_LOGIN"
          value = var.brevo_smtp_login
        },
        {
          name  = "PORT"
          value = "3000"
        },
        {
          name  = "HOSTNAME"
          value = "0.0.0.0"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])

  tags = {
    Name = "ai-audit-task-def"
  }
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "ai-audit-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  # Prevent service recreation when task definition updates revisions
  lifecycle {
    ignore_changes = [task_definition]
  }

  tags = {
    Name = "ai-audit-service"
  }
}
