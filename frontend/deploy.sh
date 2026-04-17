#!/bin/bash

# Frontend Build & Deployment Script

echo "🚀 Frontend Deployment Script"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build for production
echo ""
echo "🔨 Building for production..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📤 Ready to deploy to Vercel:"
    echo "   1. Push to GitHub: git push origin main"
    echo "   2. Connect to https://vercel.com"
    echo "   3. Select the 'frontend' folder as root directory"
    echo "   4. Vercel will automatically configure and deploy"
    echo ""
    echo "🎉 Frontend is ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
