# ----------------------------------------------------
# GitHub Actions OIDC Provider
# ----------------------------------------------------
resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1", # GitHub's primary certificate thumbprint
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"  # Alternate thumbprint
  ]
}

# ----------------------------------------------------
# IAM Role for GitHub Actions
# ----------------------------------------------------
resource "aws_iam_role" "github_actions" {
  name = "ai-audit-github-actions-role"

  # Trust policy: Only allow assumptions from token.actions.githubusercontent.com
  # and strictly limit it to the user's specific repository and aud.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:Jinoprinx/AI_Audit:*"
          }
        }
      }
    ]
  })

  tags = {
    Name = "ai-audit-github-actions-role"
  }
}

# ----------------------------------------------------
# Custom Inline Policy for Deployment Permissions
# ----------------------------------------------------
resource "aws_iam_role_policy" "github_actions" {
  name = "ai-audit-github-actions-policy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # 1. ECR Permissions: Log in, tag, push Docker images
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:PutImage"
        ]
        Resource = "arn:aws:ecr:us-east-1:682033488698:repository/ai-audit"
      },
      # 2. ECS Permissions: Describe service, describe/register task definition, update service
      {
        Effect = "Allow"
        Action = [
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition",
          "ecs:UpdateService"
        ]
        Resource = "*"
      },
      # 3. PassRole: Allow passing our ECS Execution role to Fargate tasks
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = aws_iam_role.ecs_execution.arn
      }
    ]
  })
}

# Output the IAM Role ARN for use in GitHub Actions workflow
output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "Copy this ARN to paste into your GitHub Actions deploy workflow!"
}
