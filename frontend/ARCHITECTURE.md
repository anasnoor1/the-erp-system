# Technical Architecture - Mock Data System

## 🏗️ System Overview

The frontend now operates in two modes:

```
┌─────────────────────────────────────────┐
│         Frontend Application             │
│  (React + Vite + React Router)          │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ↓                     ↓
   ┌─────────┐          ┌──────────┐
   │ Mock    │  OR      │  Real    │
   │ API     │          │  API     │
   │ Mode    │          │  (axios) │
   └─────────┘          └──────────┘
   (Vercel)             (Dev)
```

## 🔄 Request Flow

### When Using Mock Data (Production on Vercel)

```
1. Component makes request
   └─> api.get('/customers')
   
2. API wrapper detects mock mode
   └─> Calls mockAPI method
   
3. Mock API processes request
   └─> Simulates 300ms delay
   
4. Returns mock data response
   └─> { data: [...], total: 5 }
   
5. Component receives data
   └─> Renders UI normally
```

### When Using Real API (Development)

```
1. Component makes request
   └─> api.get('/customers')
   
2. API wrapper uses axios
   └─> Sends HTTP request
   
3. Backend processes request
   └─> Returns JSON response
   
4. Component receives data
   └─> Renders UI normally
```

## 📁 File Structure

### New Files Created

```
frontend/src/services/
├── api.js (MODIFIED)
│   ├── Detects environment
│   ├── Routes to mock or real API
│   └── Handles all requests
├── mockData.js (NEW)
│   ├── User credentials
│   ├── Sample records (customers, products, etc.)
│   └── Helper functions
└── mockAPI.js (NEW)
    ├── Simulates endpoints
    ├── CRUD operations
    └── Business logic

frontend/
├── .env.production (NEW)
├── .env.development (NEW)
├── .env.example (NEW)
├── vercel.json (NEW)
├── vite.config.js (MODIFIED)
├── DEPLOYMENT.md (NEW)
└── SETUP.md (NEW)
```

## 🔐 Authentication Flow

### Login Process (Both Modes)

```
User enters credentials → api.post('/auth/login')
                          ↓
                    Route to mock/real
                          ↓
Mock Mode:                Real Mode:
├─ Check credentials    ├─ Send HTTP POST
├─ Generate tokens      ├─ Verify on server
└─ Return user          └─ Get tokens
                          ↓
                    setUser() & localStorage
```

### Protected Routes

All routes check authentication status:
```javascript
<ProtectedRoute>
  └─> useAuth() checks isAuthenticated
      ├─ true  → render component
      └─ false → redirect to login
```

## 🎯 How Mock API Works

### Example: Fetching Customers

```javascript
// 1. Component calls
useCrud('/customers')

// 2. Hook makes request
api.get('/customers', { params: { page: 1, limit: 20 } })

// 3. API wrapper intercepts
if (USE_MOCK_DATA) {
  └─> handleMockRequest('GET', '/customers', config)
}

// 4. Mock API processes
mockAPI.getCustomers(1, 20)

// 5. Mock API returns
{
  data: [
    { _id: '1', name: 'Acme Corp', ... },
    { _id: '2', name: 'TechStart', ... }
  ],
  total: 5,
  page: 1,
  limit: 20
}

// 6. Component receives & renders
```

### CRUD Operations Implementation

#### CREATE
```javascript
// Frontend
api.post('/customers', newCustomerData)

// Mock API
├─ Generate new ID
├─ Add timestamp
├─ Push to mockData.customers
└─ Return created record
```

#### READ
```javascript
// Frontend
api.get('/customers/1')

// Mock API
├─ Find customer with _id = '1'
└─ Return customer object
```

#### UPDATE
```javascript
// Frontend
api.put('/customers/1', updatedData)

// Mock API
├─ Find customer by ID
├─ Merge new data
├─ Update in mockData.customers
└─ Return updated record
```

#### DELETE
```javascript
// Frontend
api.delete('/customers/1')

// Mock API
├─ Remove from mockData.customers
└─ Return success
```

## 🌍 Environment Detection

### How Mock Mode is Activated

```javascript
// In api.js
const USE_MOCK_DATA = 
  import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
  !import.meta.env.VITE_API_URL

// Evaluates to true when:
// 1. VITE_USE_MOCK_DATA explicitly set to 'true'
// 2. VITE_API_URL is empty/undefined
```

### Environment Variables

**Production (Vercel):**
```
VITE_USE_MOCK_DATA=true
VITE_API_URL=
```
Result: Mock API active ✓

**Development:**
```
VITE_USE_MOCK_DATA=false
VITE_API_URL=http://localhost:5000/api
```
Result: Real API active ✓

## 🔄 Switching Between Modes

### At Build Time (Recommended)
```bash
# Production build with mock data
npm run build  # Uses .env.production

# Development with real API
npm run dev    # Uses .env.development
```

### At Runtime (for Vercel)
```
Vercel Project Settings
└─> Environment Variables
    ├─> VITE_USE_MOCK_DATA = true/false
    ├─> VITE_API_URL = [your-backend-url]
    └─> Redeploy (Vercel rebuilds)
```

## 📊 Data Persistence

### Mock Data Behavior

| Operation | Result | Persistence |
|-----------|--------|-------------|
| Create record | ✓ Added | Current session |
| Update record | ✓ Modified | Current session |
| Delete record | ✓ Removed | Current session |
| Page refresh | ❌ Lost | Resets to original |

Perfect for:
- ✅ Demos & presentations
- ✅ UI/UX testing
- ✅ Development
- ✅ Prototyping

Not suitable for:
- ❌ Long-term data storage
- ❌ Multi-user scenarios
- ❌ Production data

## 🚀 Performance Considerations

### Build Optimization
```javascript
// vite.config.js
build: {
  sourcemap: false,    // Smaller bundle
  minify: 'terser',    // Maximum compression
}
```

### Network Simulation
```javascript
// mockAPI.js
const delay = (ms = 300) => new Promise(...)
// Simulates realistic 300ms API response time
```

### Bundle Size Impact
- mockData.js: ~3 KB (gzipped)
- mockAPI.js: ~4 KB (gzipped)
- Total added: ~7 KB

## 🔧 Error Handling

### Mock Request Errors

```javascript
try {
  await mockAPI.getCustomer(invalidId)
} catch (error) {
  // "Customer not found"
}
```

### Invalid Endpoints

```javascript
// Attempting unknown endpoint
api.get('/invalid-endpoint')
└─> throw Error('Mock endpoint not found')
```

### API Interceptors Preserved

Mock wrapper maintains same interface as axios:
```javascript
api.interceptors.request  // Configured but no-op
api.interceptors.response // Configured but no-op
```

## 🔐 Security Considerations

### Mock Data Only Approach
- ✅ Safe for public Vercel deployment
- ✅ No real credentials exposed
- ✅ No database connections
- ✅ No backend vulnerabilities
- ⚠️ Demo credentials hardcoded (intentional for demo)

### Production Safety
- All sensitive data is mock only
- No real API keys or tokens
- Credentials for demo: `admin@erp.com` / `Admin@123`

## 📈 Extensibility

### Adding More Mock Data

1. Edit `src/services/mockData.js`
2. Add to `mockData.{entity}` array
3. Optional: Create new endpoint handler in `mockAPI.js`

### Adding New Endpoints

1. Create mock method in `mockAPI.js`
2. Add handler in `handleMockRequest()` function
3. Use with `api.get/post/put/delete()`

### Example: Adding Dashboard Analytics

```javascript
// mockAPI.js
async getAnalytics(period = 'month') {
  await delay();
  return {
    revenue: 45000,
    orders: 150,
    // ...
  };
}

// handleMockRequest()
if (cleanUrl === '/analytics') {
  return await mockAPI.getAnalytics(config?.params?.period);
}
```

## 🎓 Learning Path

1. **Start**: Understanding the flow
   - Read this architecture doc
   - Check mock data samples

2. **Explore**: See it in action
   - Run `npm run dev`
   - Login with test credentials
   - Create/edit/delete records

3. **Extend**: Customize for your needs
   - Add more mock data
   - Create new pages
   - Test new features

4. **Deploy**: Launch on Vercel
   - Push to GitHub
   - Connect to Vercel
   - Automatic deployment!

---

**This architecture makes it easy to develop without backend, deploy to Vercel, and switch to real API anytime!**
