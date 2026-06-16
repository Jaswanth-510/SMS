# Pinnacle Academy - Student Management System

A comprehensive, production-ready Student Management System with React frontend and Java/Spring Boot backend.

## Project Structure

```
Pinnacle-Academy-SMS/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   ├── lib/                # Utilities and libraries
│   │   ├── contexts/           # React contexts
│   │   ├── hooks/              # Custom hooks
│   │   ├── index.css           # Global styles
│   │   ├── main.tsx            # Entry point
│   │   └── App.tsx             # Main app component
│   ├── public/                 # Static assets
│   ├── index.html              # HTML template
│   ├── package.json            # Dependencies
│   ├── vite.config.ts          # Vite configuration
│   └── tsconfig.json           # TypeScript configuration
│
├── backend/                     # Java/Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/sms/
│   │   │   │   ├── config/     # Configuration classes
│   │   │   │   ├── controller/ # REST API controllers
│   │   │   │   ├── dto/        # Data Transfer Objects
│   │   │   │   ├── entity/     # JPA entities
│   │   │   │   ├── repository/ # Spring Data repositories
│   │   │   │   ├── security/   # JWT and security
│   │   │   │   ├── service/    # Business logic
│   │   │   │   └── util/       # Utilities
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/               # Unit tests
│   ├── pom.xml                 # Maven configuration
│   ├── Dockerfile              # Docker image
│   ├── docker-compose.yml      # Docker compose
│   └── README.md               # Backend documentation
│
└── README.md                    # This file
```

## Features

### Admin Portal
- Dashboard with key metrics (Total Students, Teachers, Courses, Active Users)
- Student management (Add, Edit, Delete, Search)
- Teacher management (Add, Edit, Delete, Search)
- Course management (Add, Edit, Delete, Search)
- User approval workflow
- Role-based access control

### Student Portal
- Personalized dashboard with key metrics
- View enrolled courses
- Track attendance records
- View grades and GPA
- View and edit profile
- Download reports

### Teacher Portal
- Personalized dashboard with teaching statistics
- View assigned courses
- Manage student list
- Mark attendance
- Record marks and grades
- View class reports

### Authentication
- Unified login/registration system
- Role selection (Admin, Teacher, Student)
- JWT token-based authentication
- Secure password hashing
- Email verification (optional)

## Technology Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client (for Spring Boot API calls)

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.1.5** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **MySQL 8.0** - Database
- **JWT** - Token-based authentication
- **Swagger/OpenAPI** - API documentation
- **Maven** - Build tool
- **Docker** - Containerization

## Installation & Setup

### Prerequisites
- Node.js 18+ (for frontend)
- Java 17+ (for backend)
- Maven 3.9+ (for backend)
- MySQL 8.0+ (for database)
- Docker & Docker Compose (optional)

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Create .env file** (if needed)
   ```bash
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

   Frontend will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure database** (Edit `src/main/resources/application.properties`)
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/sms_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Build the project**
   ```bash
   mvn clean install
   ```

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

   Backend API will be available at `http://localhost:8080/api`

5. **Swagger UI** (API documentation)
   ```
   http://localhost:8080/api/swagger-ui.html
   ```

### Docker Setup (Recommended)

1. **From backend directory, start services**
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

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/{id}` - Get teacher by ID
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/{id}` - Update teacher
- `DELETE /api/teachers/{id}` - Delete teacher

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

## Database Schema

### Users Table
- id, email, password, firstName, lastName, role, isActive, isApproved, createdAt, updatedAt

### Students Table
- id, user_id, enrollmentNumber, rollNumber, className, section, dateOfBirth, phoneNumber, address, parentName, parentPhone, enrollmentDate, gpa, isActive, createdAt, updatedAt

### Teachers Table
- id, user_id, employeeId, specialization, qualifications, department, joinDate, phoneNumber, address, isActive, createdAt, updatedAt

### Courses Table
- id, courseCode, courseName, credits, semester, description, maxStudents, isActive, createdAt, updatedAt

### Attendance Table
- id, student_id, course_id, attendanceDate, status, remarks, createdAt, updatedAt

### Marks Table
- id, student_id, course_id, marksObtained, totalMarks, percentage, grade, remarks, createdAt, updatedAt

## Configuration

### Frontend Environment Variables
```
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Pinnacle Academy
```

### Backend Environment Variables
```
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/sms_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=86400000
```

## Deployment

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Update API URL to point to your backend

### Backend Deployment (Railway, Render, AWS, etc.)
1. Build JAR: `mvn clean package`
2. Deploy to your hosting provider
3. Configure environment variables
4. Set up MySQL database

## Development

### Running Tests
```bash
# Frontend
npm run test

# Backend
mvn test
```

### Code Quality
```bash
# Frontend
npm run lint

# Backend
mvn checkstyle:check
```

## Troubleshooting

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check API URL in environment variables

### Backend Issues
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify Java version: `java -version`
- Check Maven: `mvn -version`

### Database Issues
- Create database: `CREATE DATABASE sms_db;`
- Reset database: `DROP DATABASE sms_db; CREATE DATABASE sms_db;`
- Check MySQL is running: `mysql -u root -p`

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit pull request

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Email: support@pinnacleacademy.com
- Website: https://pinnacleacademy.com

## Future Enhancements

- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] File upload for documents
- [ ] Video conferencing integration
- [ ] Automated attendance tracking
- [ ] Parent portal
- [ ] Batch operations
- [ ] Audit logging

## Acknowledgments

- Built with React, Spring Boot, and MySQL
- UI Design inspired by EduPulse SMS
- Icons from Lucide React
- Components from shadcn/ui

---

**Version**: 1.0.0  
**Last Updated**: June 2026  
**Status**: Production Ready
