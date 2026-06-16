# Student Management System - Java/Spring Boot Backend

A comprehensive REST API backend for a Student Management System built with Spring Boot 3.1.5, MySQL, and JWT authentication.

## Project Structure

```
sms-backend/
├── src/
│   ├── main/
│   │   ├── java/com/sms/
│   │   │   ├── config/              # Configuration classes
│   │   │   ├── controller/          # REST API controllers
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   ├── entity/              # JPA entities
│   │   │   ├── exception/           # Custom exceptions
│   │   │   ├── repository/          # Spring Data JPA repositories
│   │   │   ├── security/            # JWT and security utilities
│   │   │   ├── service/             # Business logic services
│   │   │   └── util/                # Utility classes
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── pom.xml                          # Maven configuration
├── Dockerfile                       # Docker image configuration
├── docker-compose.yml              # Docker compose for local development
└── README.md
```

## Prerequisites

- Java 17 or higher
- Maven 3.9+
- MySQL 8.0+
- Docker & Docker Compose (optional, for containerized setup)

## Installation & Setup

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   cd sms-backend
   ```

2. **Configure database**
   - Update `src/main/resources/application.properties`
   - Set your MySQL credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/sms_db
     spring.datasource.username=root
     spring.datasource.password=your_password
     ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

The API will be available at `http://localhost:8080/api`

### Option 2: Docker Compose (Recommended)

1. **Start services**
   ```bash
   docker-compose up -d
   ```

2. **Check logs**
   ```bash
   docker-compose logs -f backend
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

## API Documentation

Swagger UI is available at: `http://localhost:8080/api/swagger-ui.html`

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "STUDENT",
  "userId": 1
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "STUDENT",
  "rollNumber": "2024001",
  "className": "1st Year",
  "section": "A",
  "phoneNumber": "9876543210"
}
```

### Student Endpoints

#### Get All Students
```http
GET /api/students
Authorization: Bearer {token}
```

#### Get Student by ID
```http
GET /api/students/{id}
Authorization: Bearer {token}
```

#### Create Student
```http
POST /api/students
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "student@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "enrollmentNumber": "ENR2024001",
  "rollNumber": "001",
  "className": "1st Year",
  "section": "A",
  "dateOfBirth": "2005-01-15",
  "phoneNumber": "9876543210"
}
```

#### Update Student
```http
PUT /api/students/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "rollNumber": "002",
  "className": "2nd Year",
  "section": "B",
  "phoneNumber": "9876543211"
}
```

#### Delete Student
```http
DELETE /api/students/{id}
Authorization: Bearer {token}
```

### Teacher Endpoints

Similar to student endpoints but with `/api/teachers` base path.

### Course Endpoints

Similar to student endpoints but with `/api/courses` base path.

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- firstName
- lastName
- role (ADMIN, TEACHER, STUDENT)
- isActive
- isApproved
- createdAt
- updatedAt

### Students Table
- id (Primary Key)
- user_id (Foreign Key)
- enrollmentNumber (Unique)
- rollNumber
- className
- section
- dateOfBirth
- phoneNumber
- address
- parentName
- parentPhone
- enrollmentDate
- gpa
- isActive
- createdAt
- updatedAt

### Teachers Table
- id (Primary Key)
- user_id (Foreign Key)
- employeeId (Unique)
- specialization
- qualifications
- department
- joinDate
- phoneNumber
- address
- isActive
- createdAt
- updatedAt

### Courses Table
- id (Primary Key)
- courseCode (Unique)
- courseName
- credits
- semester
- description
- maxStudents
- isActive
- createdAt
- updatedAt

### Attendance Table
- id (Primary Key)
- student_id (Foreign Key)
- course_id (Foreign Key)
- attendanceDate
- status (PRESENT, ABSENT, LATE, EXCUSED)
- remarks
- createdAt
- updatedAt

### Marks Table
- id (Primary Key)
- student_id (Foreign Key)
- course_id (Foreign Key)
- marksObtained
- totalMarks
- percentage
- grade
- remarks
- createdAt
- updatedAt

## Security

- JWT (JSON Web Tokens) for authentication
- BCrypt password encryption
- Role-based access control (RBAC)
- CORS configuration for frontend integration
- Spring Security with method-level authorization

## Configuration

### JWT Configuration
Edit `application.properties`:
```properties
jwt.secret=your-secret-key-change-this-in-production
jwt.expiration=86400000  # 24 hours in milliseconds
```

### CORS Configuration
Update allowed origins in `SecurityConfig.java`:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "http://localhost:5173",
    "https://your-frontend-domain.com"
));
```

## Deployment

### AWS Deployment

1. **Build JAR**
   ```bash
   mvn clean package
   ```

2. **Upload to AWS Elastic Beanstalk**
   ```bash
   eb init
   eb create sms-env
   eb deploy
   ```

### Railway Deployment

1. **Connect GitHub repository**
2. **Set environment variables**
3. **Deploy automatically**

### Render Deployment

1. **Create new Web Service**
2. **Connect GitHub repository**
3. **Set build and start commands**

## Testing

Run tests with:
```bash
mvn test
```

## Troubleshooting

### Database Connection Error
- Ensure MySQL is running
- Verify credentials in `application.properties`
- Check database exists: `CREATE DATABASE sms_db;`

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080
# Kill process
kill -9 <PID>
```

### JWT Token Expired
- Token expires after 24 hours
- User needs to login again to get new token

## Future Enhancements

- [ ] Attendance tracking module
- [ ] Marks and grades management
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] File upload for documents
- [ ] Advanced search and filtering
- [ ] Batch operations
- [ ] Audit logging

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

## Contact

- Email: support@sms.com
- Website: https://sms.com
