variable "aws_region" {
  type        = string
  description = "The AWS region to deploy resources in"
  default     = "us-east-1"
}

variable "db_password" {
  type        = string
  description = "The password for the RDS PostgreSQL database admin user"
  sensitive   = true
}

variable "openai_api_key" {
  type        = string
  description = "OpenAI API Key for audit calculations"
  sensitive   = true
}

variable "brevo_api_key" {
  type        = string
  description = "Brevo SMTP API Key for email sending"
  sensitive   = true
}

variable "brevo_smtp_login" {
  type        = string
  description = "Brevo SMTP login sender email address"
  default     = "jino4rex@gmail.com"
}

variable "nextauth_secret" {
  type        = string
  description = "NextAuth cryptographic secret key"
  sensitive   = true
}

variable "admin_ssh_cidr" {
  type        = string
  description = "The CIDR block allowed to SSH into the Bastion host (e.g. x.x.x.x/32)"
}
