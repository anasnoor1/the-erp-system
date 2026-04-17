# Frontend Frontend Deployment Guide

## Vercel Deployment with Mock Data

This frontend is configured to run on Vercel with mock data, allowing it to work independently without requiring a backend server.

### Features

- **Mock Data**: Complete sample data for testing all features
- **No Backend Required**: Works standalone on Vercel
- **Easy to Switch**: Can easily switch to real backend by changing `.env` variables
- **All CRUD Operations**: Full create, read, update, delete functionality with mock data

### Credentials

**Default Login:**
- Email: `admin@erp.com`
- Password: `Admin@123`

### Mock Data Includes

- **5 Sample Customers**: Complete customer information
- **8 Sample Products**: Electronics, Office supplies with pricing and stock
- **5 Sample Employees**: With departments and salaries
- **4 Sample Suppliers**: Vendor information
- **5 Sample Sales Orders**: Various statuses (delivered, processing, shipped, etc.)
- **4 Sample Purchase Orders**: With different statuses
- **Dashboard Stats**: Revenue, charts, and KPIs

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Select the `frontend` folder as the root directory
   - Environment variables are pre-configured in `vercel.json`

3. **Vercel will automatically:**
   - Install dependencies
   - Build with `npm run build`
   - Deploy to Vercel's CDN
   - Use mock data by default

### Environment Variables

Production (Vercel) - uses mock data:
```
VITE_USE_MOCK_DATA=true
VITE_API_URL=
```

Development - uses local backend:
```
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:5000/api
```

### Switching to Real Backend

To connect to your real backend after deployment:

1. Go to your Vercel project settings
2. Update environment variables:
   - `VITE_USE_MOCK_DATA=false`
   - `VITE_API_URL=https://your-backend-url.com/api`
3. Redeploy

### Local Development

1. **With mock data:**
   ```bash
   npm install
   npm run dev
   ```
   The app will automatically use mock data.

2. **With local backend:**
   ```bash
   # Update .env.development first:
   # VITE_USE_MOCK_DATA=false
   # VITE_API_URL=http://localhost:5000/api
   npm run dev
   ```

### Features Working with Mock Data

✅ Login/Logout
✅ Dashboard with charts and stats
✅ View all customers, products, employees, suppliers
✅ Create new records
✅ Edit existing records
✅ Delete records
✅ Pagination
✅ All CRUD operations persist in current session

### Notes

- Mock data resets on page refresh (this is intentional for demo purposes)
- All operations are instant (no network delay except simulated 300ms)
- Data is stored in memory, not persisted to database
- Perfect for demos, presentations, and testing UI/UX

### Support

For issues or questions about deployment, check:
- `vercel.json` - Vercel configuration
- `.env.production` - Production environment variables
- `src/services/mockAPI.js` - Mock API implementation
- `src/services/mockData.js` - Sample data
