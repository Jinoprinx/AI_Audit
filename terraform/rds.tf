resource "aws_db_subnet_group" "rds" {
  name        = "ai-audit-db-subnet-group"
  description = "Subnet group for RDS DB in custom private subnets"
  subnet_ids  = [aws_subnet.private_1.id, aws_subnet.private_2.id]

  tags = {
    Name = "ai-audit-db-subnet-group"
  }
}

resource "aws_db_instance" "rds" {
  identifier             = "ai-audit-db"
  allocated_storage      = 20
  max_allocated_storage  = 0
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "16"
  instance_class         = "db.t3.micro"
  username               = "dbadmin"
  password               = var.db_password
  db_subnet_group_name   = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false
  skip_final_snapshot    = true

  tags = {
    Name = "ai-audit-db"
  }
}
