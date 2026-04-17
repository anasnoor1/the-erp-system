# 🎯 Quick Reference Card - Frontend Mock Setup

## 🚀 Quick Start

### Test Locally (5 min)
```bash
cd frontend && npm install && npm run dev
# Login: admin@erp.com / Admin@123
```

### Deploy to Vercel (10 min)
```bash
git push origin main
# Then: vercel.com → Add Project → Select frontend → Deploy
```

---

## 📍 Environment Variables

| Variable | Production | Development |
|----------|-----------|-------------|
| `VITE_USE_MOCK_DATA` | `true` | `false` |
| `VITE_API_URL` | (empty) | `http://localhost:5000/api` |

---

## 🔐 Test Credentials

```
Email: admin@erp.com
Password: Admin@123
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/services/api.js` | Routes to mock or real API |
| `src/services/mockAPI.js` | Simulated API |
| `src/services/mockData.js` | Sample data |
| `.env.production` | Vercel config |
| `.env.development` | Local config |
| `vercel.json` | Build config |

---

## 📊 Mock Data Included

- 5 Customers
- 8 Products
- 5 Employees
- 4 Suppliers
- 5 Sales Orders
- 4 Purchase Orders
- Dashboard stats with charts

---

## ✅ Features

✅ Login/Logout
✅ Dashboard with charts
✅ CRUD operations (Create, Read, Update, Delete)
✅ Pagination
✅ All 7 business modules
✅ Responsive design

---

## 🔄 Switching to Real Backend

1. Go to Vercel Dashboard
2. Project → Settings → Environment Variables
3. Update:
   - `VITE_USE_MOCK_DATA = false`
   - `VITE_API_URL = https://your-backend.com/api`
4. Save → Auto-redeploy

---

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| App won't start | `npm install` and check Node v16+ |
| Login fails | Check credentials: admin@erp.com / Admin@123 |
| Data missing | Normal - mock resets on refresh |
| Build error | Check syntax in new files |
| Deploy fails | Ensure frontend folder is root directory |

---

## 📚 Documentation

- **START HERE:** `README_MOCK_SETUP.md`
- **Quick Ref:** `SETUP.md`
- **Deploy:** `CHECKLIST.md`
- **Full Guide:** `DEPLOYMENT.md`
- **Technical:** `ARCHITECTURE.md`

---

## 📞 Quick Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Deploy script (requires Vercel CLI)
npm install -g vercel && vercel --prod
```

---

## 🎯 Deployment Checklist

- [ ] `npm run dev` works locally
- [ ] Login works (admin@erp.com / Admin@123)
- [ ] Dashboard shows data
- [ ] CRUD operations work
- [ ] `npm run build` succeeds
- [ ] `git push origin main`
- [ ] Vercel deploy started
- [ ] App loads at Vercel URL
- [ ] All features working

---

## 🏁 Status

✅ READY FOR VERCEL DEPLOYMENT

Your frontend is production-ready with mock data!

---

**Print this card or bookmark for quick reference!** 📌
