# 🎨 Visual Architecture & Data Flow

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   VERCEL DEPLOYMENT                 │
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │          React Frontend (Vite Build)         │  │
│  │                                              │  │
│  │  Pages: Dashboard, Customers, Products...   │  │
│  │  Components: Forms, Tables, Charts          │  │
│  └────────────────┬─────────────────────────────┘  │
│                   │                                 │
│                   ↓                                 │
│  ┌──────────────────────────────────────────────┐  │
│  │        API Service Layer (api.js)            │  │
│  │                                              │  │
│  │  Detects: VITE_USE_MOCK_DATA env variable   │  │
│  └────────────────┬──────────────────────────┬──┘  │
│                   │                          │      │
│         ┌─────────┴─────────┐           Production │
│         │                   │                │      │
│         ↓                   ↓                ↓      │
│    ┌─────────┐         (Other env)    .env.production
│    │ Mock    │                        VITE_USE_MOCK_DATA=true
│    │ API     │                        VITE_API_URL=
│    │ Mode    │
│    └────┬────┘
│         │
│         ↓
│    ┌──────────────────────┐
│    │   mockAPI.js         │  ← Simulates all API endpoints
│    │  (300ms delay)       │
│    │                      │
│    │  Auth endpoints      │
│    │  Customers CRUD      │
│    │  Products CRUD       │
│    │  Orders CRUD         │
│    │  etc...              │
│    └────┬─────────────────┘
│         │
│         ↓
│    ┌──────────────────────┐
│    │   mockData.js        │  ← 50+ Sample Records
│    │                      │
│    │  5 Customers         │
│    │  8 Products          │
│    │  5 Employees         │
│    │  4 Suppliers         │
│    │  5 Sales Orders      │
│    │  4 Purchase Orders   │
│    │  Dashboard Stats     │
│    └──────────────────────┘
│
│  ┌─────────────────────────────────────────────────┐
│  │        Local Development Configuration          │
│  │        (.env.development)                       │
│  │                                                 │
│  │        VITE_USE_MOCK_DATA=false                 │
│  │        VITE_API_URL=http://localhost:5000/api   │
│  │                                                 │
│  │        Routes to real backend instead           │
│  └─────────────────────────────────────────────────┘
│
└─────────────────────────────────────────────────────┘
```

## Request Flow Diagram

### Mock Data Flow (Production - Vercel)

```
User Action
   │ (e.g., Load Customers)
   ↓
Component
   └─> useCrud('/customers')
       ↓
       State: loading = true
       ↓
       api.get('/customers', { params: { page: 1, limit: 20 } })
       ↓
       [api.js Detects Mock Mode]
       │ VITE_USE_MOCK_DATA = true
       ↓
       createMockApiWrapper()
       ↓
       handleMockRequest('GET', '/customers', config)
       ↓
       mockAPI.getCustomers(1, 20)
       ↓
       [300ms simulated delay]
       ↓
       mockData.customers.slice(0, 20)
       ↓
       Return: {
         data: [customer1, customer2, ...],
         total: 5,
         page: 1,
         limit: 20
       }
       ↓
       Component receives data
       ↓
       State: data = [...], loading = false
       ↓
       UI Renders with Mock Data
       ↓
       Users sees: Customer table with 5 rows
```

### CRUD Operations Flow

#### CREATE New Record
```
Form Submit
   ↓
api.post('/customers', newCustomerData)
   ↓
mockAPI.createCustomer(data)
   ↓
├─ Generate new ID
├─ Add timestamp
├─ Push to mockData.customers
└─ Return created record
   ↓
useCrud hook calls fetchData()
   ↓
Component updates with new data
   ↓
User sees new record in table
```

#### UPDATE Existing Record
```
Edit Form Submit
   ↓
api.put('/customers/1', updatedData)
   ↓
mockAPI.updateCustomer('1', data)
   ↓
├─ Find customer by ID
├─ Merge new data
├─ Update in mockData.customers
└─ Return updated record
   ↓
useCrud hook calls fetchData()
   ↓
Component updates
   ↓
User sees updated data
```

#### DELETE Record
```
Delete Button Click
   ↓
api.delete('/customers/1')
   ↓
mockAPI.deleteCustomer('1')
   ↓
├─ Remove from mockData.customers
└─ Return success
   ↓
useCrud hook calls fetchData()
   ↓
Component updates
   ↓
Record removed from table
```

## Authentication Flow

```
User enters credentials
   ↓
LoginPage submits form
   ↓
api.post('/auth/login', { email, password })
   ↓
[Mock Mode]
mockAPI.login(email, password)
   ↓
├─ Verify credentials
│  (admin@erp.com / Admin@123)
│
├─ Generate mock tokens
├─ Return user object
└─ Return: {
     accessToken: '...',
     refreshToken: '...',
     user: { id, email, name, role }
   }
   ↓
localStorage.setItem('accessToken', token)
localStorage.setItem('refreshToken', token)
setUser(user)
   ↓
AuthContext updated
   ↓
Navigate to Dashboard
   ↓
Protected routes check useAuth()
   ↓
isAuthenticated = true → Show dashboard
```

## Component Hierarchy

```
App (Main Router)
├── Routes
│   ├── /login
│   │   └── LoginPage
│   │       └── AuthContext.useAuth()
│   │           ├── login(email, password)
│   │           └── api.post('/auth/login')
│   │
│   └── / (Protected)
│       └── AppLayout
│           ├── Navigation
│           └── Routes
│               ├── /
│               │   └── DashboardPage
│               │       └── api.get('/dashboard/stats')
│               │
│               ├── /customers
│               │   └── CrudPage (Customers)
│               │       └── useCrud('/customers')
│               │           ├── api.get('/customers')
│               │           ├── api.post('/customers')
│               │           ├── api.put('/customers/:id')
│               │           └── api.delete('/customers/:id')
│               │
│               ├── /products
│               ├── /employees
│               ├── /suppliers
│               ├── /sales-orders
│               ├── /purchase-orders
```

## Data Flow Through Component Lifecycle

```
Component Mount
   │
   ├─→ useEffect runs
   │   └─→ useCrud fetches initial data
   │       └─→ setLoading(true)
   │       └─→ api.get(endpoint)
   │
   ├─→ Render loading spinner
   │
   └─→ Wait for response
   
[Response Received]
   │
   ├─→ setData(response.data)
   ├─→ setLoading(false)
   ├─→ Pagination state updated
   │
   └─→ Component re-renders with data

[User Action - Create/Edit/Delete]
   │
   ├─→ Form submitted
   ├─→ useCrud.create/update/remove called
   ├─→ api.post/put/delete executed
   ├─→ fetchData() called to refresh
   │
   └─→ Component re-renders with updated data
```

## File Dependencies

```
Components (Pages)
  │
  ├─→ useCrud hook
  │     └─→ api service
  │           └─→ IF mock mode:
  │               ├─→ mockAPI
  │               │     └─→ mockData
  │               │
  │               ELSE:
  │               └─→ axios (real API)
  │
  └─→ AuthContext
        ├─→ api.post('/auth/login')
        │     └─→ Same routing as above
        │
        └─→ localStorage for tokens
```

## Environment Detection Logic

```
Build Process
   │
   └─→ Reads .env.production (Vercel)
       or .env.development (Local)
   │
   ├─→ Sets VITE_USE_MOCK_DATA
   └─→ Sets VITE_API_URL
   │
   ↓
Runtime (Browser)
   │
   └─→ import.meta.env.VITE_USE_MOCK_DATA
       import.meta.env.VITE_API_URL
   │
   ├─→ api.js evaluates:
   │   if (VITE_USE_MOCK_DATA === 'true' || !VITE_API_URL)
   │     └─→ USE_MOCK_DATA = true
   │
   ├─→ Routes requests to mockAPI
   └─→ OR routes to axios (real API)
```

## Deployment Scenario

### Vercel Deployment

```
GitHub Repository
   │
   ├─→ Push to main branch
   │
   ↓
Vercel Webhook triggered
   │
   ├─→ Clone repository
   ├─→ Install dependencies
   ├─→ Read .env.production
   │   (VITE_USE_MOCK_DATA=true)
   ├─→ Run: npm run build
   ├─→ Output to /dist folder
   ├─→ Deploy to CDN
   │
   ↓
Live on Vercel URL
   │
   ├─→ User visits URL
   ├─→ React app loads
   ├─→ Mock API active
   ├─→ Can login & use app
   └─→ All data comes from mockData.js
```

## Switching to Real Backend

```
Original State (Mock)
└─→ Vercel env:
    VITE_USE_MOCK_DATA=true
    VITE_API_URL=

[User: Updates Environment Variables]
   ↓

New State (Real API)
└─→ Vercel env:
    VITE_USE_MOCK_DATA=false
    VITE_API_URL=https://backend.com/api

Vercel Auto-Rebuilds
   ├─→ New env variables read
   ├─→ api.js uses real API routing
   ├─→ axios makes HTTP requests
   ├─→ Backend processes requests
   └─→ Returns real data

[Result]
└─→ App works with backend
    └─→ NO CODE CHANGES NEEDED!
```

---

These diagrams show how all the pieces fit together. The key insight: once deployed to Vercel with mock data, switching to a real backend only requires environment variable changes!
