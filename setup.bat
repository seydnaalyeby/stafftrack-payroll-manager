@echo off
echo 🚀 Setting up EquipePay - Worker Attendance and Payroll Management System

REM Check if PostgreSQL is accessible
echo ✅ Checking PostgreSQL connection...
pg_isready -q >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ PostgreSQL is not running. Please start PostgreSQL and try again.
    pause
    exit /b 1
)

echo ✅ PostgreSQL is running

REM Backend Setup
echo 📦 Setting up backend...
cd backend

REM Copy environment file
if not exist .env (
    copy ..\.env.example .env
    echo 📝 Created .env file. Please update it with your database credentials.
)

REM Build and run backend
echo 🔨 Building backend...
mvn clean install -DskipTests

if %errorlevel% neq 0 (
    echo ❌ Backend build failed
    pause
    exit /b 1
)

echo ✅ Backend build successful

REM Frontend Setup
echo 📦 Setting up frontend...
cd ..\frontend

REM Install dependencies
echo 📥 Installing frontend dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Frontend dependency installation failed
    pause
    exit /b 1
)

echo ✅ Frontend dependencies installed successfully

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Update backend\.env with your database credentials
echo 2. Start the backend: cd backend && mvn spring-boot:run
echo 3. Start the frontend: cd frontend && npm start
echo.
echo 🌐 Backend will be available at: http://localhost:8080
echo 🌐 Frontend will be available at: http://localhost:4200
echo.
echo 📚 For more information, check the README.md file
pause
