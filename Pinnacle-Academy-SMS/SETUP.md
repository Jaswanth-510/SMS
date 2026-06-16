# Setup Instructions - Pinnacle Academy SMS

Complete step-by-step guide to set up and run the Pinnacle Academy Student Management System.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Node.js 18+** - Download from https://nodejs.org/
- **Java 17+** - Download from https://www.oracle.com/java/technologies/downloads/
- **Maven 3.9+** - Download from https://maven.apache.org/download.cgi
- **MySQL 8.0+** - Download from https://www.mysql.com/downloads/
- **Git** - Download from https://git-scm.com/

### Verify Installation
```bash
# Check Node.js
node --version
npm --version

# Check Java
java -version

# Check Maven
mvn --version

# Check MySQL
mysql --version
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
# or if you prefer yarn
yarn install
# or if you prefer pnpm
pnpm install
```

### Step 3: Create Environment File
Create a `.env` file in the frontend directory:
```bash
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Pinnacle Academy
```

### Step 4: Start Development Server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```

The production build will be in the `dist` folder.

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Configure Database Connection
Edit `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/sms_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=your-secret-key-change-this-in-production-12345678901234567890
jwt.expiration=86400000

# Logging
logging.level.root=INFO
logging.level.com.sms=DEBUG

# CORS Configuration
cors.allowed-origins=http://localhost:3000,http://localhost:5173,http://localhost:8080

# Swagger/OpenAPI
springdoc.api-docs.path=/v3/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

### Step 3: Build the Project
```bash
mvn clean install
```

This will download all dependencies and build the project.

### Step 4: Run the Application
```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

Swagger UI will be available at `http://localhost:8080/api/swagger-ui.html`

## Database Setup

### Step 1: Start MySQL Server
```bash
# On Windows
net start MySQL80

# On macOS
brew services start mysql

# On Linux
sudo systemctl start mysql
```

### Step 2: Connect to MySQL
```bash
mysql -u root -p
# Enter your password when prompted
```

### Step 3: Create Database
```sql
CREATE DATABASE sms_db;
USE sms_db;
```

### Step 4: Create Admin User (Optional)
```sql
INSERT INTO users (email, password, firstName, lastName, role, isActive, isApproved, createdAt, updatedAt)
VALUES ('admin@pinnacleacademy.com', 'hashed_password_here', 'Admin', 'User', 'ADMIN', true, true, NOW(), NOW());
```

### Step 5: Verify Tables
```sql
SHOW TABLES;
DESCRIBE users;
```

## Running the Application

### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

Then open `http://localhost:5173` in your browser.

### Option 2: Run with Docker Compose

From the backend directory:
```bash
docker-compose up -d
```

This will start:
- MySQL database on port 3306
- Spring Boot backend on port 8080

Check logs:
```bash
docker-compose logs -f backend
```

Stop services:
```bash
docker-compose down
```

## Testing the Application

### 1. Access the Frontend
```
http://localhost:5173
```

### 2. Register/Login
- Click "Register / Login"
- Choose to register as Student or Teacher
- Fill in the required details
- Submit the form

### 3. Access Admin Dashboard
- Login with admin credentials
- Navigate to different sections (Students, Teachers, Courses)
- Test CRUD operations

### 4. Test API Endpoints
Use Postman or curl:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get all students
curl -X GET http://localhost:8080/api/students \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Frontend Issues

**Issue: Port 5173 already in use**
```bash
# Find process using port
lsof -i :5173
# Kill process
kill -9 <PID>
```

**Issue: Dependencies not installing**
```bash
# Clear npm cache
npm cache clean --force
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue: API calls failing**
- Check if backend is running on port 8080
- Verify VITE_API_URL in .env file
- Check browser console for errors

### Backend Issues

**Issue: Port 8080 already in use**
```bash
# Find process using port
lsof -i :8080
# Kill process
kill -9 <PID>
```

**Issue: Database connection error**
- Verify MySQL is running
- Check database credentials in application.properties
- Ensure database exists: `CREATE DATABASE sms_db;`

**Issue: Maven build fails**
```bash
# Clear Maven cache
rm -rf ~/.m2/repository
# Rebuild
mvn clean install
```

### Database Issues

**Issue: Cannot connect to MySQL**
```bash
# Check MySQL status
mysql -u root -p
# If password forgotten, reset it
mysql -u root
```

**Issue: Database not found**
```sql
CREATE DATABASE sms_db;
SHOW DATABASES;
```

**Issue: Tables not created**
- Ensure `spring.jpa.hibernate.ddl-auto=update` in application.properties
- Restart the backend application
- Check logs for SQL errors

## Next Steps

1. **Customize Configuration**
   - Update JWT secret in application.properties
   - Configure CORS allowed origins
   - Set up email notifications

2. **Add Sample Data**
   - Create admin users
   - Add sample students and teachers
   - Create courses

3. **Deploy to Production**
   - Build frontend: `npm run build`
   - Build backend: `mvn clean package`
   - Deploy to your hosting provider

4. **Security Hardening**
   - Change default passwords
   - Enable HTTPS
   - Set up firewall rules
   - Configure database backups

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the README.md file
3. Check application logs
4. Create an issue on GitHub

## Resources

- [React Documentation](https://react.dev)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Authentication](https://jwt.io)
- [Maven Documentation](https://maven.apache.org/guides/)

---

**Last Updated**: June 2026  
**Version**: 1.0.0
