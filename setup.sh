#!/bin/bash

echo "🚀 Setting up EquipePay - Worker Attendance and Payroll Management System"

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL and try again."
    exit 1
fi

echo "✅ PostgreSQL is running"

# Backend Setup
echo "📦 Setting up backend..."
cd backend

# Copy environment file
if [ ! -f .env ]; then
    cp ../.env.example .env
    echo "📝 Created .env file. Please update it with your database credentials."
fi

# Build and run backend
echo "🔨 Building backend..."
mvn clean install -DskipTests

if [ $? -eq 0 ]; then
    echo "✅ Backend build successful"
else
    echo "❌ Backend build failed"
    exit 1
fi

# Frontend Setup
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "📥 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Frontend dependency installation failed"
    exit 1
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Start the backend: cd backend && mvn spring-boot:run"
echo "3. Start the frontend: cd frontend && npm start"
echo ""
echo "🌐 Backend will be available at: http://localhost:8080"
echo "🌐 Frontend will be available at: http://localhost:4200"
echo ""
echo "📚 For more information, check the README.md file"
