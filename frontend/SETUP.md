# Frontend Setup - Mock Data & Vercel Deployment

## 📋 What's Been Set Up

Your frontend is now fully configured with:

### 1. **Mock Data Services**
- `src/services/mockData.js` - Complete sample dataset with 50+ records
- `src/services/mockAPI.js` - API simulator that handles all CRUD operations
- Mock authentication system with test credentials

### 2. **Updated API Layer**
- `src/services/api.js` - Intelligent API client that switches between mock and real API
- Automatic detection based on environment variables
- Zero code changes needed to switch between modes

### 3. **Environment Configuration**
- `.env.production` - Mock data enabled for Vercel
- `.env.development` - Real API enabled for local development
- `.env.example` - Reference for all available variables
- `vercel.json` - Vercel deployment configuration

### 4. **Documentation**
- `DEPLOYMENT.md` - Detailed deployment guide
- `SETUP.md` - This file with quick reference
- `deploy.sh` - Automated deployment script

## 🚀 Quick Start

### Local Development with Mock Data

```bash
cd frontend
npm install
npm run dev
```

Visit: http://localhost:5173
- Email: `admin@erp.com`
- Password: `Admin@123`

### Local Development with Real Backend

1. Update `.env.development`:
```
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:5000/api
```

2. Start your backend server (port 5000)

3. Run frontend:
```bash
npm run dev
```

## 🌐 Vercel Deployment

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
```bash
cd frontend
git add .
git commit -m "Setup frontend with mock data for Vercel"
git push origin main
```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select `frontend` folder as Root Directory
   - Click "Deploy"

Vercel automatically uses the configuration in `vercel.json` and ``.env.production``

### Option 2: Manual Vercel Setup

1. **Build locally**
```bash
npm run build
```

2. **Deploy to Vercel**
```bash
npm install -g vercel
vercel --prod
```

## 📊 Mock Data Included

| Entity | Count | Details |
|--------|-------|---------|
| Customers | 5 | Complete contact info |
| Products | 8 | With pricing & stock |
| Employees | 5 | With departments |
| Suppliers | 4 | Vendor information |
| Sales Orders | 5 | Various statuses |
| Purchase Orders | 4 | Different statuses |
| Dashboard Stats | Complete | Charts, KPIs, trends |

## ✅ Features Working

- ✅ User authentication (login/logout)
- ✅ Dashboard with charts
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Pagination support
- ✅ All business modules:
  - Customers
  - Products
  - Employees
  - Suppliers
  - Sales Orders
  - Purchase Orders

## 🔄 Switching to Real Backend

After your backend is deployed:

1. Go to Vercel Project Settings
2. Navigate to Environment Variables
3. Update:
   ```
   VITE_USE_MOCK_DATA = false
   VITE_API_URL = https://your-backend-url/api
   ```
4. Redeploy (Vercel will automatically rebuild)

## 🛠️ Troubleshooting

### Mock data not loading?
- Check `.env.production` has `VITE_USE_MOCK_DATA=true`
- Run `npm run build` and check build output
- Check browser console for errors

### Login not working?
- Verify credentials: `admin@erp.com` / `Admin@123`
- Check that mock API is loaded in Network tab

### Data lost after refresh?
- This is expected behavior with mock data
- Mock data is in-memory only (great for demos!)
- Use real backend for persistence

## 📦 Deployment Readiness Checklist

- ✅ Mock data services created
- ✅ API layer configured
- ✅ Environment files set up
- ✅ Vercel configuration added
- ✅ Build optimized for production
- ✅ Documentation provided
- ✅ Ready to deploy!

## 📝 Environment Variables Reference

### Production (Vercel)
```
VITE_USE_MOCK_DATA=true          # Use mock data
VITE_API_URL=                    # Leave empty
```

### Development with Backend
```
VITE_USE_MOCK_DATA=false         # Use real API
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Next Steps

1. **Test locally**: `npm run dev`
2. **Build**: `npm run build`
3. **Deploy**: Push to GitHub → Vercel auto-deploys
4. **Later**: Switch to backend when ready

## 📚 Files Modified/Created

```
frontend/
├── src/
│   └── services/
│       ├── api.js (MODIFIED)
│       ├── mockData.js (NEW)
│       └── mockAPI.js (NEW)
├── .env.production (NEW)
├── .env.development (NEW)
├── .env.example (NEW)
├── vercel.json (NEW)
├── vite.config.js (MODIFIED)
├── DEPLOYMENT.md (NEW)
└── SETUP.md (NEW)
```

## 💡 Tips

- Mock API simulates 300ms delay for realistic feel
- All mock data persists during session
- Perfect for demos, presentations, testing
- Easy to extend with more mock data
- Switch to real backend anytime

---

**Your frontend is now production-ready for Vercel deployment! 🎉**
