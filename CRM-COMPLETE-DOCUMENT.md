# CRM Project - Complete Frontend Documentation

**Project Name:** CRM (Customer Relationship Management System)  
**Version:** 0.1.0  
**Status:** Active Development  
**Build Repo:** https://github.com/boldsoftmations/crm-frontend
**Homepage:** https://boldsoftmations.github.io/crm-frontend/  
**Node Version:** 16.16.0  
**NPM Version:** 8.16.0

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Core Architecture](#core-architecture)
6. [Redux State Management](#redux-state-management)
7. [API Architecture](#api-architecture)
8. [Services Documentation](#services-documentation)
9. [Components Documentation](#components-documentation)
10. [Routes & Navigation](#routes--navigation)
11. [Modules Overview](#modules-overview)
12. [Custom Hooks](#custom-hooks)
13. [Utilities](#utilities)
14. [Authentication & Authorization](#authentication--authorization)
15. [Development Guide](#development-guide)
16. [Best Practices](#best-practices)
17. [Common Issues & Solutions](#common-issues--solutions)
18. [Performance Optimization](#performance-optimization)
19. [Deployment](#deployment)
20. [Code Examples](#code-examples)

---

## 📌 Project Overview

CRM is a comprehensive Customer Relationship Management system built with React. It manages:

- Customer relationships and interactions
- Sales leads and pipelines
- Invoices and financial operations
- Inventory and production
- Complaints and corrective actions (CCF/CAPA)
- Human resources management
- Field sales tracking
- WhatsApp group management
- Analytics and reporting
- And 30+ more business modules

**Key Features:**

- Role-based access control (15+ roles)
- Real-time data synchronization
- PDF export and reporting
- Multi-user collaborative workspace
- Advanced filtering and search
- Complaint management workflow
- Inventory tracking
- Financial reporting

---

## 🛠️ Technology Stack

### Core Framework

```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "6.3.0",
  "react-scripts": "2.1.3"
}
```

### State Management

```json
{
  "redux": "4.2.0",
  "react-redux": "8.0.2",
  "redux-thunk": "2.4.1",
  "redux-persist": "6.0.0",
  "redux-logger": "3.0.6",
  "redux-devtools-extension": "2.13.9"
}
```

### UI Framework & Styling

```json
{
  "@mui/material": "5.10.0",
  "@mui/icons-material": "5.8.4",
  "@emotion/react": "11.10.0",
  "@emotion/styled": "11.10.0",
  "styled-components": "5.3.6",
  "bootstrap": "5.2.3"
}
```

### HTTP & API

```json
{
  "axios": "0.27.2"
}
```

### Form Handling

```json
{
  "formik": "2.2.9",
  "yup": "0.32.11"
}
```

### PDF & Document Generation

```json
{
  "@react-pdf/renderer": "3.1.9",
  "jspdf": "2.5.2",
  "jspdf-autotable": "5.0.2",
  "html2pdf.js": "0.9.0",
  "html2canvas": "1.4.1",
  "file-saver": "2.0.5",
  "react-to-print": "2.14.10"
}
```

### Data & Visualization

```json
{
  "react-google-charts": "4.0.0",
  "react-csv": "2.2.2",
  "moment": "2.29.4"
}
```

### Additional Libraries

```json
{
  "react-phone-input-2": "2.15.1",
  "pigeon-maps": "0.22.1",
  "react-helmet": "6.1.0",
  "prop-types": "15.8.1"
}
```

---

## 📂 Project Structure

```
crm/
│
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── 404.html
│   └── favicon.ico
│
├── src/
│   │
│   ├── index.js                      # Entry point with Redux Provider
│   ├── index.css                     # Global styles
│   ├── App.js                        # Root component
│   ├── App.test.js
│   │
│   ├── Redux/                        # State management
│   │   ├── Store/
│   │   │   └── Store.js              # Redux store config with persistence
│   │   ├── Reducer/
│   │   │   ├── RootReducer.js        # Root reducer with persist config
│   │   │   └── UserReducer.js        # Auth reducer
│   │   └── Action/
│   │       ├── Action.js             # Action creators (50+ actions)
│   │       └── actiontypes.js        # Action type constants
│   │
│   ├── services/                     # API integration layer
│   │   ├── api.js                    # Axios instance configuration
│   │   ├── SetupInterceptor.js       # Request/response interceptors
│   │   ├── TokenService.js           # Token & auth management
│   │   ├── CustomerService.js        # Customer & CCF/CAPA (100+ methods)
│   │   ├── LeadService.js            # Lead management
│   │   ├── InvoiceService.js         # Invoice operations
│   │   ├── InventoryService.js       # Inventory management
│   │   ├── ProductService.js         # Product data
│   │   ├── ProductForecastService.js # Forecasting
│   │   ├── DashboardService.js       # Dashboard analytics
│   │   ├── MasterService.js          # Master data
│   │   ├── Hr.js                     # HR operations
│   │   ├── TaskService.js            # Tasks
│   │   ├── UserProfileService.js     # User profiles
│   │   └── Whatsapp.js               # WhatsApp integration
│   │
│   ├── Components/                   # Reusable React components
│   │   ├── CustomAutocomplete.jsx    # Multi-select, tags, freeSolo
│   │   ├── CustomButton.jsx          # Styled button
│   │   ├── CustomChart.jsx           # Chart wrapper
│   │   ├── CustomDate.jsx            # Date picker
│   │   ├── CustomDateFilterPopup.jsx # Date range filter
│   │   ├── CustomDownloadLoader.jsx  # Download progress
│   │   ├── CustomLoader.jsx          # Loading spinner
│   │   ├── CustomPagination.jsx      # Pagination controls
│   │   ├── CustomSelect.jsx          # Dropdown select
│   │   ├── CustomTable.jsx           # Data table
│   │   ├── CustomTabs.jsx            # Tab navigation
│   │   ├── CustomTextField.jsx       # Text input
│   │   ├── CustomerSnackbar.jsx      # Alert snackbar
│   │   ├── MessageAlert.jsx          # Alert display
│   │   ├── Popup.jsx                 # Modal dialog
│   │   ├── SearchComponent.jsx       # Search with reset
│   │   ├── useDynamicFormFields.jsx  # Dynamic form fields hook
│   │   ├── useNotificationHandling.jsx # Alert handling hook
│   │   └── Header/
│   │       └── Header.jsx            # Navigation header
│   │
│   ├── Pages/                        # Page components by module
│   │   ├── CommonStyle.css           # Shared page styles
│   │   ├── DispatchData.jsx          # Dispatch page component
│   │   │
│   │   ├── Analytics/                # Analytics dashboard
│   │   │   └── AnalyticsAllTabView.jsx
│   │   │
│   │   ├── Auth/                     # Authentication
│   │   │   ├── Auths.jsx             # Login page
│   │   │   ├── ChangePassword.jsx
│   │   │   └── ForgotPassword.jsx
│   │   │
│   │   ├── CCF/                      # Customer Complaint Form
│   │   │   ├── AllCCFtab.jsx         # Tab container
│   │   │   ├── CCF/
│   │   │   │   ├── CCFView.jsx       # List view with filters
│   │   │   │   ├── CreateCCF.jsx     # Create form
│   │   │   │   ├── UpdateCCF.jsx     # Edit form
│   │   │   │   └── CapaStatusView.jsx # Status tracking
│   │   │   ├── CAPA/                 # Corrective Action
│   │   │   │   ├── CapaView.jsx      # CAPA list
│   │   │   │   ├── CreateCapa.jsx    # Create CAPA
│   │   │   │   ├── ComplaintPdf.jsx  # PDF export
│   │   │   │   └── ImageView.jsx     # Document preview
│   │   │   └── CCF_CAPA_Master/
│   │   │       └── AllComplaintListView.jsx
│   │   │
│   │   ├── Currency/                 # Currency management
│   │   │   └── CurrencyView.jsx
│   │   │
│   │   ├── Cutomers/                 # Customer management [sic]
│   │   │   ├── CompanyDetails/
│   │   │   │   ├── AllCustomerTabView.jsx
│   │   │   │   └── ... (customer detail pages)
│   │   │   └── SRF/                  # Service Request Form
│   │   │       └── AllSRFTab.jsx
│   │   │
│   │   ├── DailySaleReview/          # Daily sales reporting
│   │   │   └── DailySaleReviewView.jsx
│   │   │
│   │   ├── DebitCredit/              # Financial notes
│   │   │   └── DebitCreditAllTabView.jsx
│   │   │
│   │   ├── Dispatch/                 # Order dispatch
│   │   │   ├── AllDispatchTabView.jsx
│   │   │   └── ... (dispatch related pages)
│   │   │
│   │   ├── Faq/                      # FAQ management
│   │   │   └── FaqAllTab/
│   │   │       └── FaqAllTab.jsx
│   │   │
│   │   ├── FieldSales/               # Field sales tracking
│   │   │   ├── FieldSalesAllTab.jsx
│   │   │   ├── BeatMaster/
│   │   │   │   └── ViewMasterBeat.jsx
│   │   │   └── ... (field sales pages)
│   │   │
│   │   ├── FollowUp/                 # Customer follow-ups
│   │   │   └── Followup.jsx
│   │   │
│   │   ├── HrModel/                  # Human resources
│   │   │   ├── HrModelTabs.jsx       # HR operations
│   │   │   ├── HrMasterTabView.jsx   # HR master data
│   │   │   └── ... (HR pages)
│   │   │
│   │   ├── Inventory/                # Inventory management
│   │   │   ├── InventoryAllTabView.jsx
│   │   │   └── ... (inventory pages)
│   │   │
│   │   ├── InventoryReport/          # Stock reports
│   │   │   └── AllInventoryReportTabs.jsx
│   │   │
│   │   ├── Invoice/                  # Invoice system
│   │   │   ├── ProformaInvoice/      # Quotations
│   │   │   │   ├── AllPerformaInvoiceTabView.jsx
│   │   │   │   ├── ActivePI.jsx
│   │   │   │   ├── ApprovePi.jsx
│   │   │   │   └── PriceApprovalPI.jsx
│   │   │   ├── SalesInvoice/         # Sales invoices
│   │   │   │   └── SalesInvoiceAllTab.jsx
│   │   │   └── Seller Account/       # Business units
│   │   │       └── SellerAccount.jsx
│   │   │
│   │   ├── Leads/                    # Lead management
│   │   │   ├── AllLeadsTabView.jsx   # Lead tabs
│   │   │   ├── NewLeads.jsx
│   │   │   ├── OpenLead.jsx
│   │   │   ├── HotLeads.jsx
│   │   │   ├── ClosedLead.jsx
│   │   │   ├── DuplicateLead.jsx
│   │   │   ├── UnassignedLead.jsx
│   │   │   ├── LeadsTracking.jsx
│   │   │   ├── LeadScoring.jsx
│   │   │   └── ... (lead pages)
│   │   │
│   │   ├── Maintanace/               # Maintenance [sic]
│   │   │   └── Maintaince.jsx
│   │   │
│   │   ├── MarketAnalysis/           # Market & competitor
│   │   │   └── CompetitorView.jsx
│   │   │
│   │   ├── Master* /                 # Master data
│   │   │   ├── MasterActivityList/
│   │   │   ├── MasterFactory/
│   │   │   ├── MasterLeadSummary/
│   │   │   ├── MasterPackaging/
│   │   │   └── MasterZone/
│   │   │
│   │   ├── OrderBooks/               # Order management
│   │   │   └── AllOrderBookTabView.jsx
│   │   │
│   │   ├── Physcical Inventory/      # Stock audit [sic]
│   │   │   └── PhysicalInventoryView.jsx
│   │   │
│   │   ├── PriceList/                # Product pricing
│   │   │   └── AllPriceListTabView.jsx
│   │   │
│   │   ├── ProductForecast/          # Demand forecasting
│   │   │   └── ProductForecastViewAll.jsx
│   │   │
│   │   ├── Production/               # Manufacturing
│   │   │   └── ProductionAllTabView.jsx
│   │   │
│   │   ├── Products/                 # Product catalog
│   │   │   └── AllProductsTabView.jsx
│   │   │
│   │   ├── Profile/                  # User profile
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── Purchase/                 # Procurement
│   │   │   └── PurchaseAllTabView.jsx
│   │   │
│   │   ├── Report/                   # Reports
│   │   │   └── Report.jsx
│   │   │
│   │   ├── ReturnOrders/             # Returns management
│   │   │   ├── PurchaseReturn/
│   │   │   │   └── PurchaseReturnAllTabView.jsx
│   │   │   └── SalesReturn/
│   │   │       └── SalesReturnAllTabView.jsx
│   │   │
│   │   ├── SKU Codes/                # Product SKUs
│   │   │
│   │   ├── StateAndCity/             # Location master
│   │   │   └── AllTAbView.jsx
│   │   │
│   │   ├── Task/                     # Task management
│   │   │   └── TaskView.jsx
│   │   │
│   │   ├── Users/                    # User management
│   │   │   └── AllProfileTabView.jsx
│   │   │
│   │   ├── Vendor/                   # Vendor management
│   │   │   └── VendorInventoryDetail/
│   │   │       └── VendorView.jsx
│   │   │
│   │   └── WhatsappGroup/            # WhatsApp groups
│   │       ├── AllWhatsappTabs.jsx
│   │       └── ... (WhatsApp pages)
│   │
│   ├── Routes/
│   │   └── RouteScreen.js            # React Router configuration
│   │
│   ├── utility/                      # Utility functions
│   │   ├── dateUtils.js              # Date formatting helpers
│   │   └── DecimalValidation.jsx     # Decimal input validation
│   │
│   ├── Options/
│   │   └── Options.js
│   │
│   └── Images/                       # Image assets
│
├── build/                            # Production build output
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── media/
│   ├── service-worker.js
│   ├── precache-manifest.*.js
│   └── ...
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🚀 Setup & Installation

### Prerequisites

- Node.js 16.16.0
- npm 8.16.0
- Git

### Installation Steps

```bash
# 1. Clone repository
git clone https://github.com/boldsoftmations/crm-frontend.git
cd crm

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Set environment variables
REACT_APP_TESTING_BACKEND_URL=https://your-backend-api.com

# 5. Start development server
npm start
```

### Available Scripts

```bash
npm start          # Development mode (http://localhost:3000)
npm run build      # Production build
npm test           # Run tests
npm run eject      # Eject from CRA (one-way operation)
npm run deploy     # Deploy to GitHub Pages
```

---

## 🏗️ Core Architecture

### Application Flow

```
Entry Point (index.js)
    ↓
Redux Store + PersistGate
    ↓
SetupInterceptor (Auth interceptors)
    ↓
App.js (BrowserRouter basename="/crm-frontend")
    ↓
Header Component
    ↓
Routes (RouteScreen.js)
    ↓
Pages/Modules
    ↓
Components + Services
```

### Component Hierarchy

```
App.js
├── Header (Navigation)
├── Routes
│   ├── Private Routes (Protected by token)
│   │   ├── Pages
│   │   │   ├── Custom Components
│   │   │   ├── Custom Hooks
│   │   │   └── Services (API calls)
│   │   └── Modals/Popups
│   └── Public Routes
│       ├── Auths (Login)
│       ├── ForgotPassword
│       └── Maintenance
└── MessageAlert (Global)
```

---

## 🔴 Redux State Management

### Store Configuration

**File:** `src/Redux/Store/Store.js`

```javascript
// Middleware stack
const middleware = [thunk, logger];

// Store creation with devtools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

// Persistence configuration
const persistor = persistStore(store);
```

### Persistence Configuration

**File:** `src/Redux/Reducer/RootReducer.js`

```javascript
const persistConfig = {
  key: "root",
  storage, // localStorage
  whitelist: ["auth"], // Only auth persisted
};
```

### Redux State Shape

```javascript
state = {
  auth: {
    // Authentication
    user: null, // Login token/credentials
    loading: true,

    // User Information
    profile: {
      id: number,
      name: string,
      email: string,
      groups: [string], // Roles/permissions
      // ... other profile data
    },
    allProfile: [],

    // Business Entity Data
    sellerAccount: [], // Business units
    companyName: [], // Companies

    // Product Attributes
    brandAllData: [],
    colourAllData: [],
    unitAllData: [],
    basicunitAllData: [],
    packingunitAllData: [],
    productCodeAllData: [],

    // Business Data
    customerOrderBookData: [],
    vendorName: [],

    // Product Categories
    finishgoodsProduct: [],
    rawMaterialProduct: [],
    consumableProduct: [],
    packingList: [],
  },
};
```

### Redux Actions (50+ total)

**File:** `src/Redux/Action/Action.js`

```javascript
// Authentication
loginstart(); // Start login process
loginsucces(token); // Login successful
logoutUser(); // User logout
refreshToken(accessToken); // Refresh auth token

// User Profile
getProfileUser(data); // Set current user profile
getAllProfileUser(data); // Set all available profiles

// Business Data
getSellerAccountData(data); // Set seller accounts
getCompanyName(data); // Set company selection
getCustomerOrderBookData(data); // Customer orders

// Product Attributes
getBrandData(data); // Product brands
getColourData(data); // Colors
getUnitData(data); // Units of measurement
getBasicUnitData(data); // Basic units
getPackingUnitData(data); // Packing units
getProductCodeData(data); // Product codes

// Product Categories
getFinishGoodProduct(data); // Finished goods
getRawMaterialProduct(data); // Raw materials
getConsumableProduct(data); // Consumables

// Other
getVendorName(data); // Vendor list
```

### UserReducer

**File:** `src/Redux/Reducer/UserReducer.js`

- Handles all auth-related state changes
- Processes 20+ action types
- Initializes with { user: null, loading: true }
- Logout resets to initial state

---

## 🌐 API Architecture

### Axios Configuration

**File:** `src/services/api.js`

```javascript
const CustomAxios = axios.create({
  baseURL: process.env.REACT_APP_TESTING_BACKEND_URL,
});
```

### Interceptor Setup

**File:** `src/services/SetupInterceptor.js`

**Request Interceptor:**

```javascript
- Adds `Authorization: Bearer {token}` header
- Gets token from localStorage via TokenService
- Attaches to all requests
```

**Response Interceptor:**

```javascript
- Handles 401 Unauthorized responses
- Checks for invalid token error
- Auto-dispatches logoutUser() action
- Removes user from localStorage
- Other errors pass through
```

### API Response Format

```javascript
{
  data: {
    results: [],        // Array of items
    count: number,      // Total count for pagination
    // ... other fields
  }
}
```

### Query Parameter Pattern

All services use consistent URLSearchParams pattern:

```javascript
const params = new URLSearchParams();

if (page) params.append("page", page);
if (search) params.append("search", search);
if (filter) params.append(filterKey, filterValue);

return CustomAxios.get(`/api/endpoint/?${params.toString()}`);
```

### Boolean Parameter Format

**IMPORTANT:** Backend expects Python-style capitalized booleans

```javascript
// CORRECT
is_active = True; // Correct
is_active = False; // Correct

// INCORRECT
is_active = true; // Wrong! Will cause error
is_active = false; // Wrong! Will cause error
```

---

## 🔧 Services Documentation

### 1. CustomerService.js (100+ methods)

**Location:** `src/services/CustomerService.js`

**Customer Operations:**

- `getAllCustomerData()` - List customers
- `createCompanyData()` - Create customer
- `updateCompanyData()` - Edit customer
- `getCompanyDataById()` - Get single customer

**CCF Operations (Customer Complaint Form):**

- `getAllCCFData(page, search, isActive)` - List CCF with active/inactive filter
- `createCCF()` - Create complaint
- `CCFUpdate(id, data)` - Update CCF status/data
- `getAllClosedCCF()` - Closed complaints

**CAPA Operations (Corrective & Preventive Action):**

- `CreateCapa()` - Create corrective action
- `UpdateCapa()` - Update CAPA
- `getAllCapaData()` - List CAPA

**WhatsApp Integration:**

- `getAllWhatsappGroupData()` - WhatsApp groups
- `createWhatsappData()` - Create group
- `getWhatsappImageData()` - Group media

**Other:**

- `getAllContactData()` - Contact list
- `createBankData()` - Bank details
- `createWareHouseData()` - Warehouse locations

### 2. LeadService.js (20+ methods)

**Location:** `src/services/LeadService.js`

- `getAllLeads(page, funnel, filter, filterValue, search)` - List leads
- `createLeads()` - New lead
- `updateLeads()` - Edit lead
- `getAllDuplicateLeads()` - Duplicate detection
- `getAllUnassignedData()` - Unassigned leads
- `getAllAssignedUser()` - Sales users

**Lead Sources:**

- `getAllRefernces()` - Lead sources

### 3. InvoiceService.js (30+ methods)

**Location:** `src/services/InvoiceService.js`

**Seller Accounts:**

- `getAllSellerAccountData()` - Business units
- `createSellerAccountData()` - Create seller
- `updateSellerAccountData()` - Edit seller

**Proforma Invoices:**

- `getAllPIData()` - List quotations
- `getAllPIWithDateRange()` - Date-filtered quotes
- `createPI()` - Create quote
- `updatePI()` - Edit quote

**Sales Invoices:**

- `getAllSalesInvoice()` - List invoices
- `createSalesInvoice()` - Create invoice

**Order Books:**

- `getAllOrderBook()` - Orders

### 4. InventoryService.js (25+ methods)

**Location:** `src/services/InventoryService.js`

**Purchase:**

- `getAllPurchaseOrder()` - PO list
- `createPurchaseOrder()` - Create PO

**Production:**

- `getAllProduction()` - Production orders
- `createProduction()` - Create production

**Stock Management:**

- `getAllInventory()` - Stock levels
- `getAllPhysicalInventory()` - Physical counts

**Returns:**

- `getAllPurchaseReturn()` - Purchase returns
- `getAllSalesReturn()` - Sales returns

### 5. ProductService.js (25+ methods)

**Location:** `src/services/ProductService.js`

**Master Data:**

- `getAllColour()` - Color list
- `getAllBrand()` - Brands
- `getAllUnit()` - Units
- `getAllBasicUnit()` - Basic units
- `getAllPackingUnit()` - Packing units

**Product Data:**

- `getAllFinishGoods()` - Finished goods
- `getAllRawMaterials()` - Raw materials
- `getAllConsumable()` - Consumable items
- `getAllProductCode()` - Product codes

**Pricing:**

- `getAllPriceList()` - Price lists
- `getPriceComparision()` - Price comparison

### 6. Other Services

**DashboardService.js** - Dashboard analytics and KPIs

**MasterService.js** - Master data (zones, beats, etc.)

**ProductForecastService.js** - Demand forecasting

**Hr.js** - HR & payroll operations

**TaskService.js** - Task management

**UserProfileService.js** - User management

**Whatsapp.js** - WhatsApp automation

**TokenService.js** - Token storage & management

---

## 🎨 Components Documentation

### Form Components

#### CustomTextField

```javascript
<CustomTextField
  label="Name"
  value={value}
  onChange={handleChange}
  type="text"
  error={Boolean(error)}
  helperText={error}
  fullWidth
/>
```

- MUI TextField wrapper
- Validation display
- Type support: text, email, password, number, etc.

#### CustomAutocomplete

```javascript
<CustomAutocomplete
  label="Select Option"
  value={selected}
  onChange={(event, newValue) => setSelected(newValue)}
  options={options}
  getOptionLabel={(option) => option.name}
  multiple={true}
  fullWidth
/>
```

- Features: Multi-select, tags, chips, freeSolo
- Customizable tag rendering
- Option grouping support
- Disabled state

#### CustomSelect

```javascript
<CustomSelect
  label="Choose"
  value={value}
  onChange={handleChange}
  options={[
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
  ]}
/>
```

- Dropdown select
- Material-UI Select wrapper

#### CustomDate

```javascript
<CustomDate label="Date" value={date} onChange={handleDateChange} />
```

- Date picker wrapper
- Locale support via moment

### Data Display Components

#### CustomTable

```javascript
<CustomTable
  columns={[
    { key: "id", label: "ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
  ]}
  rows={data}
  stickyHeader
  pagination
/>
```

- Sortable columns
- Sticky header
- Scrollable container
- Pagination support
- Custom cell rendering

#### CustomPagination

```javascript
<CustomPagination
  totalPages={totalPages}
  currentPage={currentPage}
  handlePageChange={handlePageChange}
/>
```

- Next/Previous buttons
- Page number display
- Integrated with CustomTable

#### CustomTabs

```javascript
<CustomTabs
  tabs={[
    { label: "Tab 1", component: <Component1 /> },
    { label: "Tab 2", component: <Component2 /> },
  ]}
/>
```

- Material-UI Tabs wrapper
- Icon support
- Lazy loading support

### Utility Components

#### Popup

```javascript
<Popup
  title="Modal Title"
  openPopup={isOpen}
  setOpenPopup={setIsOpen}
  fullScreen={false}
>
  <ModalContent />
</Popup>
```

- Modal dialog wrapper
- Full-screen option
- Customizable styling

#### MessageAlert

```javascript
<MessageAlert
  open={alertInfo.open}
  onClose={handleClose}
  severity="success" // 'success', 'error', 'warning', 'info'
  message="Operation successful!"
/>
```

- Snackbar/Alert display
- Auto-dismiss option
- Severity levels

#### SearchComponent

```javascript
<SearchComponent
  onSearch={(query) => handleSearch(query)}
  onReset={() => handleReset()}
/>
```

- Search input + reset button
- Integrated reset functionality

#### CustomLoader

```javascript
<CustomLoader open={isLoading} />
```

- Loading spinner overlay
- Fullscreen optional

### Composite Components

#### CustomDateFilterPopup

- Date range picker
- Apply/Cancel buttons
- Two-date selection

#### CustomDownloadLoader

- Download progress indicator
- File type support

### Custom Hooks

#### useNotificationHandling

```javascript
const { handleError, handleCloseSnackbar, alertInfo } =
  useNotificationHandling();

// Usage
try {
  await apiCall();
  handleSuccess("Success message");
} catch (error) {
  handleError(error);
}
```

**Returns:**

- `handleError(error)` - Display error notification
- `handleSuccess(message)` - Display success
- `handleCloseSnackbar()` - Close alert
- `alertInfo` - Current alert state { open, severity, message }

#### useDynamicFormFields

- Dynamic form field generation
- Validation support
- Field state management

---

## 📍 Routes & Navigation

### Route Configuration

**File:** `src/Routes/RouteScreen.js`

**Base URL:** `/crm-frontend` (from BrowserRouter basename)

### Route Protection

```javascript
const PrivateRoute = ({ children, redirectTo = "/" }) => {
  const token = useSelector((state) => state.auth.user);
  return token ? children : <Navigate to={redirectTo} replace />;
};
```

### Authentication Routes

```javascript
GET  /              # Login page (Auths)
GET  /forgot-password     # Password recovery
GET  /maintainance        # Maintenance page
POST /change-password     # Password change (protected)
```

### Main Routes (40+ total)

#### User Management

```javascript
/user/analytics          # Dashboard
/user/report             # Reports
/user/profile            # User profile
/user/profile-tab        # Profile management
/user/faq                # FAQ
/user/sale-review        # Daily sales review
```

#### Customer Module

```javascript
/customers/all-customer           # Customer list
/customers/whatsapp-tabs          # WhatsApp groups
/customer/complaints/ccp-capa     # CCF/CAPA
/customer/complaints/ccp-capa/master
/customer/srf                     # Service Request Form
```

#### Lead Management

```javascript
/leads/all-lead               # Lead list with tabs
/lead/list-references         # Lead sources
```

#### Product Management

```javascript
/products/all-product          # Product catalog
/products/view-price-list      # Pricing
```

#### Invoice Module

```javascript
/invoice/seller-account        # Business units
/invoice/performa-invoice-tab  # Quotations
/invoice/active-pi             # Active quotes
/invoice/approve-pi            # PI approval
/invoice/price-approval-pi     # Price approval
/invoice/sales-invoice         # Sales invoices
/invoice/orderbook-tab         # Orders
/invoice/credit-debit-note     # C/D notes
```

#### Inventory Module

```javascript
/inventory/view-purchase           # Purchase orders
/inventory/view-production         # Production orders
/inventory/view-inventory          # Stock levels
/inventory/view-vendor             # Vendor inventory
/inventory/view-currency           # Currency
/inventory/physical                # Physical inventory
/inventory/stock-alert             # Stock reports
/inventory/sales-return            # Sales returns
/inventory/purchase-return         # Purchase returns
```

#### Dispatch & Logistics

```javascript
/dispatch/tab-view                 # Dispatch tracking
```

#### Master Data

```javascript
/county-state-city/master-tab      # Locations
/master/activity-list              # Activities
/master/factory                    # Factories
/master/beat                       # Sales beats
/master/customer-visit             # Visit tracking
/master/package-master             # Packaging
```

#### Field Sales

```javascript
/forecast/view-product-forecast    # Forecasting
/task/view-task                    # Task management
/market-analysis/competitor        # Competitor analysis
/hr-model                          # HR operations
/hr-model/hr-master                # HR master data
```

---

## 📊 Modules Overview

### 1. Customer Relationship Management

**Files:** `src/Pages/Cutomers/`

**Features:**

- Customer master data
- Contact management
- Bank details
- Warehouse locations
- Customer classification
- Beat assignment

**API Endpoints:**

- `GET /api/customer/list-company/`
- `POST /api/customer/list-company/`
- `PATCH /api/customer/list-company/{id}`

### 2. Lead Management

**Files:** `src/Pages/Leads/`

**Features:**

- Lead classification (New, Open, Hot, Closed)
- Lead scoring
- Lead assignment to sales team
- Duplicate detection
- Lead tracking
- Funnel analysis

**Key Views:**

- NewLeads - Recently created
- OpenLead - In progress
- HotLeads - High priority
- ClosedLead - Won/lost
- DuplicateLead - Merge candidates
- UnassignedLead - Waiting assignment
- LeadsTracking - Progress tracking
- LeadScoring - Score calculation

### 3. Invoice Management

**Files:** `src/Pages/Invoice/`

**Components:**

- **Proforma Invoices:** Quotations/estimates
- **Sales Invoices:** Final invoices
- **Seller Accounts:** Business units/warehouse locations
- **Order Books:** Customer orders

**Features:**

- Quote creation and approval
- Invoice generation from quotes
- Price approval workflow
- Multi-unit support
- Date range filtering

### 4. Inventory Management

**Files:** `src/Pages/Inventory/`

**Components:**

- **Purchase Orders:** Vendor sourcing
- **Production:** Manufacturing
- **Inventory:** Stock tracking
- **Vendor:** Vendor inventory detail
- **Currency:** Unit conversions
- **Physical Inventory:** Stock audit
- **Returns:** Purchase & sales returns

**Features:**

- Stock level management
- Multi-warehouse support
- Physical inventory counts
- Return processing
- Inventory alerts

### 5. Product Management

**Files:** `src/Pages/Products/`

**Features:**

- Product catalog
- Product attributes (brand, color, unit)
- Product categorization
- Pricing setup
- SKU management
- Product codes

**Attributes:**

- Brand (brands)
- Color (colors)
- Unit (measurement units)
- Basic Unit
- Packing Unit
- Product Code
- Description

### 6. Complaint Management (CCF/CAPA)

**Files:** `src/Pages/CCF/`

**CCF (Customer Complaint Form):**

- Log complaints from customers
- Categorize by type
- Assign to departments
- Track status
- Attach documents
- Search & filter

**CAPA (Corrective & Preventive Action):**

- Corrective action plans
- Root cause analysis
- Action tracking
- Status updates
- Training documentation

**Features:**

- Active/Inactive filtering
- Document upload/preview
- PDF export
- Status workflow
- Rejection with confirmation

### 7. Field Sales

**Files:** `src/Pages/FieldSales/`

**Features:**

- Sales beat management
- Customer visit tracking
- Activity logging
- Sales performance

### 8. HR Module

**Files:** `src/Pages/HrModel/`

**Features:**

- Employee management
- Payroll
- Attendance
- Leave management
- HR master data

### 9. Reporting & Analytics

**Files:** `src/Pages/Report/`, `src/Pages/Analytics/`

**Features:**

- Sales reports
- Inventory reports
- Performance analytics
- Dashboard KPIs
- Google Charts integration

### 10. Other Modules

- **Task Management:** Task creation and tracking
- **Follow-up:** Customer follow-ups
- **WhatsApp Integration:** Group management, message automation
- **Currency Management:** Exchange rates
- **Daily Sale Review:** Sales performance review
- **Debit/Credit Notes:** Financial adjustments
- **FAQ Management:** Knowledge base
- **Master Data:** Zones, beats, factories, activities

---

## 🎯 Custom Hooks

### useNotificationHandling

**Location:** `src/Components/useNotificationHandling.jsx`

**Purpose:** Centralized alert/snackbar management

**Usage:**

```javascript
const { handleError, handleSuccess, handleCloseSnackbar, alertInfo } =
  useNotificationHandling();

// Display error
handleError(error);

// Display success
handleSuccess("Operation completed!");

// Close alert
handleCloseSnackbar();

// Render alert
<MessageAlert
  open={alertInfo.open}
  severity={alertInfo.severity}
  message={alertInfo.message}
  onClose={handleCloseSnackbar}
/>;
```

### useDynamicFormFields

**Location:** `src/Components/useDynamicFormFields.jsx`

**Purpose:** Generate and manage dynamic form fields

**Usage:**

```javascript
const { fields, addField, removeField, updateField } =
  useDynamicFormFields(initialFields);
```

---

## 🛠️ Utilities

### dateUtils.js

**Location:** `src/utility/dateUtils.js`

**Functions:**

- Date formatting
- Date parsing
- Date range calculations
- Locale support (via moment)

### DecimalValidation.jsx

**Location:** `src/utility/DecimalValidation.jsx`

**Purpose:** Decimal input validation component

**Features:**

- Min/max decimal places
- Positive/negative support
- Auto-formatting

---

## 🔐 Authentication & Authorization

### Authentication Flow

```
1. User enters credentials → Login page (Auths.jsx)
   ↓
2. API call to backend → /api/auth/login (or similar)
   ↓
3. Backend returns token
   ↓
4. Redux: dispatch loginsucces(token)
   ↓
5. Redux-Persist saves token to localStorage
   ↓
6. RouteScreen checks state.auth.user
   ↓
7. If token exists → Access private routes
   If no token → Redirect to "/"
```

### Token Management

**File:** `src/services/TokenService.js`

**Functions:**

- `getLocalAccessToken()` - Retrieve token from storage
- `saveUser(token)` - Save token to localStorage
- `removeUser()` - Clear token from storage

### Request Interceptor

```javascript
// Every request adds Authorization header
config.headers.Authorization = `Bearer ${token}`;
```

### Response Interceptor

```javascript
// 401 response triggers:
1. Check if token_not_valid error
2. Call dispatch(logoutUser())
3. Call removeUser()
4. Redirect to "/"
```

### Role-Based Access Control

**Groups in system:**

- Director
- Operations & Supply Chain Manager
- Sales Executive
- Sales Manager
- Sales Manager(Retailer)
- Sales Deputy Manager
- Business Development Manager
- Business Development Executive
- Accounts Executive
- Digital Marketing
- Customer Service
- Sales Assistant Deputy Manager
- QA
- And more...

**Permission Check:**

```javascript
const userData = useSelector((state) => state.auth.profile);

if (userData.groups.includes("Director")) {
  // Show admin features
}
```

---

## 👨‍💻 Development Guide

### Creating a New Module

#### Step 1: Create Page Component

```javascript
// src/Pages/YourModule/YourModuleView.jsx
import React, { useState, useEffect } from "react";
import { useNotificationHandling } from "../../Components/useNotificationHandling";
import YourModuleService from "../../services/YourModuleService";

export const YourModuleView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { handleError } = useNotificationHandling();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await YourModuleService.getAll();
      setData(response.data.results);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return <div>{/* Your JSX */}</div>;
};
```

#### Step 2: Create Service

```javascript
// src/services/YourModuleService.js
import CustomAxios from "./api";

const getAll = (page, search) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (search) params.append("search", search);
  return CustomAxios.get(`/api/your-endpoint/?${params.toString()}`);
};

const create = (data) => {
  return CustomAxios.post("/api/your-endpoint/", data);
};

const update = (id, data) => {
  return CustomAxios.patch(`/api/your-endpoint/${id}/`, data);
};

const YourModuleService = { getAll, create, update };
export default YourModuleService;
```

#### Step 3: Add Route

```javascript
// src/Routes/RouteScreen.js
import { YourModuleView } from "../Pages/YourModule/YourModuleView";

// Add to routes
<Route
  path="/your-module/view"
  element={
    <PrivateRoute>
      <YourModuleView />
    </PrivateRoute>
  }
/>;
```

#### Step 4: Add Navigation Link

```javascript
// src/Components/Header/Header.jsx
{
  label: "Your Module",
  url: "/your-module/view",
  roles: ["Director"]  // Optional: restrict by role
}
```

### Creating a New Component

```javascript
// src/Components/CustomYourComponent.jsx
import React from "react";
import { Box, Button } from "@mui/material";

const CustomYourComponent = ({
  value,
  onChange,
  disabled = false,
  ...props
}) => {
  return (
    <Box>
      <Button onClick={() => onChange(newValue)} disabled={disabled} {...props}>
        Click me
      </Button>
    </Box>
  );
};

export default CustomYourComponent;
```

### Creating a New Custom Hook

```javascript
// src/Components/useYourHook.jsx
import { useState, useCallback } from "react";

export const useYourHook = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const update = useCallback((newValue) => {
    setState(newValue);
  }, []);

  return { state, update };
};
```

---

## ✅ Best Practices

### 1. API Calls

```javascript
// ✅ GOOD: Centralized in service
const fetchData = async () => {
  const response = await CustomerService.getAll(page, search);
};

// ❌ BAD: API call in component
const fetchData = async () => {
  const response = await CustomAxios.get(`/api/...`);
};
```

### 2. Error Handling

```javascript
// ✅ GOOD: Use hook
const { handleError } = useNotificationHandling();

try {
  await apiCall();
} catch (error) {
  handleError(error);
}

// ❌ BAD: Manual console error
try {
  await apiCall();
} catch (error) {
  console.log(error);
}
```

### 3. State Management

```javascript
// ✅ GOOD: Redux for global state
const userData = useSelector((state) => state.auth.profile);

// ✅ GOOD: Local state for component data
const [localState, setLocalState] = useState([]);

// ❌ BAD: Prop drilling through many levels
```

### 4. Boolean Parameters

```javascript
// ✅ GOOD: Python-style capitalization
`is_active=${isActive ? "True" : "False"}`
// ❌ BAD: JavaScript-style
`is_active=${isActive}`; // Results in true/false error
```

### 5. Component Keys

```javascript
// ✅ GOOD: Use unique ID
{
  data.map((item) => <Component key={item.id} {...item} />);
}

// ❌ BAD: Use array index
{
  data.map((item, index) => <Component key={index} {...item} />);
}
```

### 6. Query Parameters

```javascript
// ✅ GOOD: Use URLSearchParams
const params = new URLSearchParams();
if (page) params.append("page", page);
if (search) params.append("search", search);
CustomAxios.get(`/api/endpoint/?${params.toString()}`);

// ❌ BAD: String concatenation
CustomAxios.get(`/api/endpoint/?page=${page}&search=${search}`);
```

### 7. Loading States

```javascript
// ✅ GOOD: Use loading state
{
  loading ? <CustomLoader /> : <Content />;
}

// ❌ BAD: No loading feedback
<Content />;
```

### 8. Null Checks

```javascript
// ✅ GOOD: Safe navigation
{data?.map((item) => ...)}

// ❌ BAD: Assume data exists
{data.map((item) => ...)} // Potential error if data is null
```

---

## 🐛 Common Issues & Solutions

### Issue 1: Boolean Parameter Error

**Error:** `"false" value must be either True or False`

**Solution:**

```javascript
// Convert to Python format
const activeParam = isActive ? "True" : "False";
```

### Issue 2: Token Expiration

**Problem:** User logged out unexpectedly

**Solution:**

- Interceptor auto-handles 401 responses
- Redux action dispatched
- localStorage cleared
- Redirect to login

### Issue 3: CORS Error

**Problem:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**

- Check backend CORS configuration
- Ensure `REACT_APP_TESTING_BACKEND_URL` is correct
- Verify API endpoint is accessible

### Issue 4: 404 Route Error

**Problem:** Route not found

**Solution:**

```javascript
// Check RouteScreen.js for typos in path
// Ensure component is imported
// Add trailing route catch-all:
<Route path="*" element={<Redirect to="/" />} />
```

### Issue 5: Pagination Reset

**Problem:** Pagination doesn't reset on filter change

**Solution:**

```javascript
const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  setCurrentPage(1); // Reset pagination!
};
```

### Issue 6: Form Validation Not Working

**Problem:** Yup validation not triggering

**Solution:**

```javascript
// Ensure Formik has onBlur handlers
<input {...field} onBlur={form.handleBlur} />

// Check validation schema exists
const validationSchema = yup.object().shape({...});
```

### Issue 7: Redux State Not Persisting

**Problem:** State cleared on page refresh

**Solution:**

- Check Redux-Persist config
- Ensure `whitelist: ["auth"]` includes needed slice
- Clear localStorage manually if needed

---

## ⚡ Performance Optimization

### 1. Code Splitting

```javascript
// Use React.lazy for routes
const YourComponent = React.lazy(() => import("./YourComponent"));

<Suspense fallback={<Loader />}>
  <YourComponent />
</Suspense>;
```

### 2. Memoization

```javascript
// Memoize table rows
const TableRow = React.memo(({ data }) => {
  return <tr>{/* content */}</tr>;
});

// Memoize expensive components
export default React.memo(YourComponent);
```

### 3. useMemo Hook

```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

### 4. useCallback Hook

```javascript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 5. Redux Selectors

```javascript
// Create reusable selectors
const selectUserProfile = (state) => state.auth.profile;
const userData = useSelector(selectUserProfile);
```

### 6. Pagination

```javascript
// Always paginate large datasets
const response = await service.get(page, search);
// Don't load all 10,000 records at once!
```

### 7. Image Optimization

```javascript
// Use optimized images
<img src={optimized_image} alt="description" />

// Lazy load images
<img loading="lazy" src={image} />
```

---

## 🚢 Deployment

### Production Build

```bash
npm run build
```

**Output:** `/build` folder with:

- Minified JavaScript
- Optimized CSS
- Hash-based filenames
- Service worker

### GitHub Pages Deployment

```bash
npm run deploy
```

**Process:**

1. Builds project (`npm run build`)
2. Deploys `/build` to gh-pages branch
3. Available at homepage URL

### Environment Configuration

**Production:**

```bash
REACT_APP_TESTING_BACKEND_URL=https://api.production.com
```

**Staging:**

```bash
REACT_APP_TESTING_BACKEND_URL=https://api.staging.com
```

### Build Configuration

- **Minification:** Enabled
- **Source Maps:** Disabled in production
- **Service Worker:** Auto-registered
- **Precache Manifest:** Auto-generated

---

## 📚 Code Examples

### Example 1: Complete Page Component

```javascript
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Paper,
  Grid,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CustomPagination from "../../Components/CustomPagination";
import SearchComponent from "../../Components/SearchComponent";
import MessageAlert from "../../Components/MessageAlert";
import CustomLoader from "../../Components/CustomLoader";
import { useNotificationHandling } from "../../Components/useNotificationHandling";
import CustomerService from "../../services/CustomerService";

export const ExampleModuleView = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.auth.profile);
  const { handleError, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const fetchData = useCallback(async () => {
    try {
      setOpen(true);
      const response = await CustomerService.getAllCustomerData(
        currentPage,
        searchQuery,
      );
      setData(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 25));
    } catch (error) {
      handleError(error);
    } finally {
      setOpen(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <MessageAlert
        open={alertInfo.open}
        onClose={handleCloseSnackbar}
        severity={alertInfo.severity}
        message={alertInfo.message}
      />
      <CustomLoader open={open} />

      <Grid item xs={12}>
        <Paper sx={{ p: 2, m: 4, display: "flex", flexDirection: "column" }}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={8}>
                <SearchComponent
                  onSearch={handleSearch}
                  onReset={handleReset}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    /* Create action */
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>

          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </Paper>
      </Grid>
    </>
  );
};
```

### Example 2: Custom Hook Usage

```javascript
import React from "react";
import { useNotificationHandling } from "../../Components/useNotificationHandling";
import CustomService from "../../services/CustomService";

export const ExampleComponentWithHook = () => {
  const { handleError, handleSuccess, handleCloseSnackbar, alertInfo } =
    useNotificationHandling();

  const handleCreate = async (formData) => {
    try {
      await CustomService.create(formData);
      handleSuccess("Item created successfully!");
      // Refresh data, close modal, etc.
    } catch (error) {
      handleError(error);
    }
  };

  return <div>{/* Component JSX */}</div>;
};
```

### Example 3: Service Implementation

```javascript
// src/services/CustomService.js
import CustomAxios from "./api";

const getAll = (page, search, isActive) => {
  const params = new URLSearchParams();

  if (page) params.append("page", page);
  if (search) params.append("search", search);

  // Convert boolean to Python format
  if (isActive !== undefined) {
    const activeParam = isActive ? "True" : "False";
    params.append("is_active", activeParam);
  }

  return CustomAxios.get(`/api/custom/?${params.toString()}`);
};

const create = (data) => {
  return CustomAxios.post("/api/custom/", data);
};

const update = (id, data) => {
  return CustomAxios.patch(`/api/custom/${id}/`, data);
};

const delete_ = (id) => {
  return CustomAxios.delete(`/api/custom/${id}/`);
};

const CustomService = {
  getAll,
  create,
  update,
  delete: delete_, // 'delete' is reserved
};

export default CustomService;
```

---

## 🔍 Module-Specific Notes

### CCF Module (Current Focus)

**Key Components:**

- Active/Inactive filter using CustomAutocomplete
- Reject button with confirmation
- Status tracking workflow
- Document upload/preview
- PDF export
- CAPA integration

**State Variables:**

```javascript
- CCFData: []
- currentPage: number
- totalPages: number
- searchQuery: string
- activeFilter: "active" | "inactive"
- openCCF: boolean
- updateCCF: boolean
- imageShow: boolean
- openPdf: boolean
- openCapa: boolean
- openStatusPopup: boolean
- openRejectConfirm: boolean
```

**Key Functions:**

```javascript
getAllCCFData(page, search, isActive);
createCCF(data);
CCFUpdate(id, { is_active: boolean });
DeleteCCFImage(data);
CreateCapa(data);
```

---

## 📞 Support & Resources

**Documentation:** [CRM Docs]
**Repository:** https://github.com/boldsoftmations/crm-frontend
**Issues:** GitHub Issues
**Email:** contact@boldsoftmations.com

---

## 📝 Recent Updates (May 6, 2026)

✅ Active/Inactive filter for CCF  
✅ Reject button with confirmation  
✅ Boolean parameter conversion (True/False)  
✅ Pagination reset on filter change  
✅ Dynamic is_active parameter

---

**Last Updated:** May 6, 2026  
**Status:** Production Ready  
**Version:** 0.1.0

---

This documentation is comprehensive and covers the entire CRM project. Use it as a reference for development, onboarding, and maintenance.
