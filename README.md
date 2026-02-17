# EquipePay - Worker Attendance and Payroll Management System

An excellent, modern web application for managing worker attendance, payroll, and employee data with robust authentication and real-time dashboard analytics.

## 🌟 Features

### 🔐 Authentication & Security
- **JWT Authentication**: Secure login/register with access and refresh tokens
- **Token Management**: 15-minute access tokens with 1-day refresh tokens
- **Auto-Logout**: Automatic token cleanup and session management
- **Protected Routes**: All API endpoints secured with Spring Security

### 👥 Worker Management
- **CRUD Operations**: Create, read, update, delete workers
- **Advanced Search**: Search workers by name, position, or filter by criteria
- **Data Validation**: Comprehensive form validation with error handling
- **Profile Management**: Worker photos, contact info, and salary details

### 📊 Attendance Tracking
- **Daily Attendance**: Mark present/absent for any date
- **Bulk Operations**: Mark attendance for multiple workers
- **Attendance History**: Complete attendance records with filtering
- **Automated Calculations**: Present days count and attendance statistics

### 💰 Payroll Management
- **Salary Management**: Monthly and daily salary calculations
- **Automated Payroll**: Generate salary records based on attendance
- **Payment Tracking**: Complete payment history and status
- **Financial Reports**: Comprehensive payroll analytics

### 📈 Dashboard Analytics
- **Real-time Statistics**: Live worker count and attendance data
- **Visual Analytics**: Charts and graphs for data visualization
- **Quick Actions**: One-click access to common tasks
- **Performance Metrics**: Key business indicators at a glance

## 🛠️ Technical Stack

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.0 with Java 23
- **Database**: PostgreSQL with optimized JPA/Hibernate
- **Security**: Spring Security with JWT authentication
- **API**: RESTful API with comprehensive error handling
- **Performance**: HikariCP connection pooling, database indexing

### Frontend (Angular)
- **Framework**: Angular 17 with standalone components
- **UI Library**: Angular Material with modern design
- **State Management**: Reactive forms and RxJS observables
- **Authentication**: JWT token management with auto-refresh
- **Routing**: Protected routes with authentication guards

### Database Design
- **Optimized Schema**: Indexed tables for performance
- **Relationships**: Proper foreign key constraints
- **Data Integrity**: Comprehensive validation and constraints
- **Scalability**: Designed for enterprise-level data

## 🚀 Getting Started

### Prerequisites
- **Java 23+**: Backend runtime environment
- **Node.js 18+**: Frontend build environment
- **PostgreSQL 15+**: Database server
- **Maven 3.8+**: Backend build tool

### Installation

1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd equipepay-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   ./mvnw.cmd spring-boot:run
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb -U postgres equipepay
   
   # Update application.properties with your credentials
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ng serve
   ```

## 📱 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token

### Worker Management
- `GET /api/workers` - Get all workers
- `POST /api/workers` - Create new worker
- `PUT /api/workers/{id}` - Update worker
- `DELETE /api/workers/{id}` - Delete worker
- `GET /api/workers/search?name={name}` - Search workers

### Attendance Management
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/date/{date}` - Get attendance by date
- `GET /api/attendance/worker/{id}` - Get worker attendance history

## 🔧 Configuration

### Database Configuration
```properties
# PostgreSQL Database
spring.datasource.url=jdbc:postgresql://localhost:5432/equipepay
spring.datasource.username=postgres
spring.datasource.password=your-password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

### JWT Configuration
```properties
# JWT Settings
jwt.secret=mySecretKey123456789012345678901234567890abcdef
jwt.expiration=900000
jwt.refresh-expiration=86400000
```

### Performance Tuning
```properties
# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.idle-timeout=30000

# JPA Performance
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

## 🎯 Key Features

### Security Features
- **JWT Authentication**: Industry-standard token-based authentication
- **Refresh Tokens**: Automatic token renewal without user interruption
- **Password Security**: Encrypted password storage with validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Session Management**: Secure session handling with auto-cleanup

### Performance Optimizations
- **Database Indexing**: Optimized queries with strategic indexes
- **Connection Pooling**: Efficient database connection management
- **Batch Processing**: Optimized bulk database operations
- **Lazy Loading**: Efficient data loading strategies
- **Caching Strategy**: Smart caching for frequently accessed data

### User Experience
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Clear feedback during data operations
- **Error Handling**: Comprehensive error messages and recovery
- **Form Validation**: Real-time validation with helpful feedback
- **Accessibility**: WCAG compliant interface design

## 🧪 Testing

### Running Tests
```bash
# Backend Tests
cd backend
./mvnw.cmd test

# Frontend Tests
cd frontend
ng test
```

### Test Coverage
- **Unit Tests**: Service layer and component testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: End-to-end user journey testing
- **Security Tests**: Authentication and authorization testing

## � Monitoring & Logging

### Application Monitoring
- **Health Checks**: Spring Boot actuator endpoints
- **Performance Metrics**: Database query performance tracking
- **Error Logging**: Comprehensive error tracking and alerting
- **Security Logging**: Authentication attempt monitoring

### Database Monitoring
- **Connection Pool**: HikariCP metrics dashboard
- **Query Performance**: Slow query identification and optimization
- **Data Integrity**: Constraint violation monitoring
- **Backup Strategy**: Automated backup procedures

## �🚀 Deployment

### Production Deployment
```bash
# Backend Build
./mvnw.cmd clean package
java -jar target/equipepay-backend-0.0.1-SNAPSHOT.jar

# Frontend Build
ng build --prod
# Deploy dist/ folder to web server
```

### Environment Variables
```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://localhost:5432/equipepay
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=86400000
```

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow established coding conventions
2. **Testing**: Ensure all new features have tests
3. **Documentation**: Update documentation for new features
4. **Security**: Follow security best practices
5. **Performance**: Consider performance implications

### Git Workflow
```bash
# Feature Branch
git checkout -b feature/new-feature
git commit -m "feat: Add new feature"
git push origin feature/new-feature

# Create Pull Request
# Use descriptive title and detailed description
# Ensure all tests pass before merging
```

## 📞 Support

### Common Issues
- **Database Connection**: Ensure PostgreSQL is running
- **Token Expiration**: Check system time synchronization
- **CORS Errors**: Verify frontend URL configuration
- **Performance**: Monitor database query performance

### Troubleshooting Steps
1. Check application logs for error details
2. Verify database connectivity and credentials
3. Clear browser cache and localStorage
4. Restart backend and frontend services
5. Check network connectivity and firewall settings

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for modern workforce management**

### Backend
- **Spring Boot 3** with Java 17
- **Spring Security** with JWT Authentication
- **Spring Data JPA** with PostgreSQL
- **Maven** for dependency management

### Frontend
- **Angular 17+** with standalone components
- **Angular Material** for UI components
- **Tailwind CSS** for styling
- **RxJS** for reactive programming

## 📋 Features

- **Authentication**: Secure login/register for admin users
- **Worker Management**: Add, edit, delete workers with personal and salary information
- **Attendance Tracking**: Daily attendance marking with Present/Absent status
- **Payroll Calculation**: Automatic daily and monthly salary calculations
- **Reports**: Generate attendance and payroll reports with CSV export
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 13+
- Maven 3.6+

## 📁 Project Structure

```
equipepay-app/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/equipepay/
│   │   │   │   ├── entity/       # JPA entities
│   │   │   │   ├── repository/   # Spring Data repositories
│   │   │   │   ├── service/      # Business logic
│   │   │   │   ├── controller/   # REST controllers
│   │   │   │   ├── dto/          # Data transfer objects
│   │   │   │   ├── security/     # JWT configuration
│   │   │   │   └── config/       # Application configuration
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
├── frontend/                # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/         # Authentication components
│   │   │   ├── dashboard/    # Dashboard component
│   │   │   ├── workers/      # Worker management
│   │   │   ├── attendance/   # Attendance tracking
│   │   │   ├── reports/      # Reports and analytics
│   │   │   ├── services/     # HTTP services
│   │   │   ├── models/       # TypeScript interfaces
│   │   │   ├── guards/       # Route guards
│   │   │   └── interceptors/ # HTTP interceptors
│   │   └── ...
│   ├── package.json
│   └── angular.json
├── .env.example
├── .gitignore
└── README.md
```

## 🚀 Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE equipepay;
CREATE USER equipepay_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE equipepay TO equipepay_user;
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Copy environment variables:
```bash
cp ../.env.example .env
```

3. Update `.env` with your database configuration:
```env
DB_URL=jdbc:postgresql://localhost:5432/equipepay
DB_USERNAME=equipepay_user
DB_PASSWORD=your_password
JWT_SECRET=yourSecretKey123456789012345678901234567890
JWT_EXPIRATION=86400000
```

4. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:4200`

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Workers
- `GET /api/workers` - Get all workers
- `POST /api/workers` - Create new worker
- `GET /api/workers/{id}` - Get worker by ID
- `PUT /api/workers/{id}` - Update worker
- `DELETE /api/workers/{id}` - Delete worker
- `GET /api/workers/search?name={name}` - Search workers by name
- `GET /api/workers/by-position?position={position}` - Get workers by position

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/date/{date}` - Get attendance by date
- `GET /api/attendance/worker/{workerId}` - Get worker attendance by date range
- `GET /api/attendance/range` - Get attendance by date range
- `GET /api/attendance/worker/{workerId}/present-days` - Get present days count

## 🎯 Usage

1. **Register/Login**: Create an admin account or login with existing credentials
2. **Dashboard**: View overview of workers and today's attendance
3. **Manage Workers**: Add, edit, or delete workers with their information
4. **Mark Attendance**: Record daily attendance for workers
5. **Generate Reports**: Create attendance and payroll reports with export functionality

## 🔧 Configuration

### Backend Configuration

The backend uses the following environment variables:

- `DB_URL`: PostgreSQL connection URL
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time in milliseconds

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8080`. To change this, update the API URLs in the service files.

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📝 Development Notes

- The backend uses Spring Boot 3 with Java 17 features
- Frontend uses Angular 17+ with standalone components for better performance
- JWT tokens are stored in localStorage for simplicity (consider more secure options for production)
- Daily salary is calculated as `monthlySalary / 30`
- All API endpoints are protected except authentication endpoints

## 🚀 Deployment

### Backend Deployment

1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR file:
```bash
java -jar target/equipepay-backend-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist/frontend` directory to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and credentials are correct
2. **CORS Issues**: Check that the frontend URL is allowed in backend CORS configuration
3. **JWT Token Issues**: Clear browser localStorage if experiencing authentication problems
4. **Port Conflicts**: Ensure ports 8080 (backend) and 4200 (frontend) are available

### Getting Help

- Check the console logs for detailed error messages
- Ensure all environment variables are properly set
- Verify database connection and permissions
- Make sure all dependencies are installed correctly
