# Frontend Memory (CRM)

## Project Overview

React 18.2 CRM system managing customers, leads, invoices, inventory, CCF/CAPA, HR, field sales, WhatsApp groups, analytics across 30+ modules. Role-based access (15+ roles), PDF export, real-time sync. Base URL: `/crm`. Node 16.16, npm 8.16.

---

## Tech Stack

- React 18.2 | React Router 6.3 | Redux 4.2 + Persist 6.0
- MUI 5.10 | Emotion 11.10 | Bootstrap 5.2
- Axios 0.27 | Formik 2.2 + Yup 0.32
- jsPDF, html2canvas, react-to-print, react-google-charts
- Moment.js, react-phone-input-2, pigeon-maps

---

## Folder Architecture

```
src/
├── Redux/
│   ├── Store/Store.js (persistence config)
│   ├── Reducer/ (RootReducer, UserReducer)
│   └── Action/ (50+ action creators)
├── services/ (12 service files - CustomerService 100+ methods)
├── Components/ (20+ reusable)
├── Pages/ (40+ page modules organized by feature)
├── Routes/RouteScreen.js
├── utility/ (dateUtils, DecimalValidation)
└── Images/
```

---

## Core Development Rules

- NEVER make API calls in components → use services only
- ALWAYS use URLSearchParams for query params → never string concat
- ALWAYS use `useNotificationHandling()` for alerts
- ALWAYS reset pagination to 1 when filters change
- ALWAYS use safe navigation `data?.map()` to prevent null errors
- Component keys MUST be unique IDs, NEVER array index
- Local state for component data → Redux for global/shared state
- Wrap boolean params in Python format: `isActive ? "True" : "False"`

---

## API Rules

- BaseURL: `process.env.REACT_APP_TESTING_BACKEND_URL`
- Response format: `{ data: { results: [], count: number } }`
- URLSearchParams for pagination, search, filters
- Request interceptor: adds `Authorization: Bearer {token}`
- Response 401: auto-logout via Redux + localStorage clear
- Backend expects capitalized booleans: `is_active=True` NOT `is_active=true`

### Service Pattern Template

```javascript
const getAll = (page, search, isActive) => {
  const params = new URLSearchParams();
  if (page) params.append("page", page);
  if (search) params.append("search", search);
  if (isActive !== undefined)
    params.append("is_active", isActive ? "True" : "False");
  return CustomAxios.get(`/api/endpoint/?${params.toString()}`);
};

const create = (data) => CustomAxios.post("/api/endpoint/", data);
const update = (id, data) => CustomAxios.patch(`/api/endpoint/${id}/`, data);
const delete_ = (id) => CustomAxios.delete(`/api/endpoint/${id}/`);
```

---

## Redux Rules

- Persist config: `whitelist: ["auth"]` only (localStorage)
- State shape: `{ auth: { user, loading, profile, allProfile, sellerAccount, brandAllData, ... } }`
- Actions: 50+ total in `src/Redux/Action/Action.js`
- UserReducer: handles auth-related state, 20+ action types
- Selectors pattern: `const userData = useSelector(state => state.auth.profile)`

### State Access

```javascript
// Global user data
const userData = useSelector(state => state.auth.profile);
const token = useSelector(state => state.auth.user);

// Check role
if (userData?.groups?.includes("Director")) { ... }
```

---

## Routing Rules

- BrowserRouter basename: `/crm`
- Route file: `src/Routes/RouteScreen.js`
- PrivateRoute: checks `state.auth.user` token
- 40+ routes total across modules
- Public: `/`, `/forgot-password`, `/maintainance`
- All protected routes need `<PrivateRoute>` wrapper

---

## Common Component Patterns

### Pattern: List View with Search & Pagination

```javascript
const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [searchQuery, setSearchQuery] = useState("");
const [loading, setLoading] = useState(false);

const { handleError, handleCloseSnackbar, alertInfo } =
  useNotificationHandling();

const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    const response = await Service.getAll(currentPage, searchQuery);
    setData(response.data.results);
    setTotalPages(Math.ceil(response.data.count / 25));
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
}, [currentPage, searchQuery]);

useEffect(() => {
  fetchData();
}, [currentPage, searchQuery]);

const handleSearch = (query) => {
  setSearchQuery(query);
  setCurrentPage(1); // ALWAYS reset
};

const handleReset = () => {
  setSearchQuery("");
  setCurrentPage(1);
};
```

### Pattern: Filter with Active/Inactive

```javascript
const [activeFilter, setActiveFilter] = useState(null); // null, "Active", "Inactive"

const handleFilterChange = (newFilter) => {
  setActiveFilter(newFilter);
  setCurrentPage(1); // ALWAYS reset pagination
};

// In fetch call
const isActive =
  activeFilter === "Active"
    ? true
    : activeFilter === "Inactive"
      ? false
      : undefined;
await Service.getAll(page, search, isActive);
```

---

## Common Table Pattern

```javascript
<CustomTable
  columns={[
    { key: "id", label: "ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "actions", label: "Actions", type: "custom", render: (row) => <Button>Edit</Button> }
  ]}
  rows={data}
  stickyHeader
  pagination
/>

<CustomPagination
  totalPages={totalPages}
  currentPage={currentPage}
  handlePageChange={(e, value) => setCurrentPage(value)}
/>
```

---

## Common Popup Pattern

```javascript
const [openPopup, setOpenPopup] = useState(false);

<Popup
  title="Add Item"
  openPopup={openPopup}
  setOpenPopup={setOpenPopup}
  fullScreen={false}
>
  <Form
    onSubmit={(data) => {
      create(data);
      setOpenPopup(false);
    }}
  />
</Popup>;
```

---

## Common Form Pattern

```javascript
const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
  useFormik({
    initialValues: { name: "", email: "" },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name required"),
      email: yup.string().email().required("Email required"),
    }),
    onSubmit: async (data) => {
      try {
        await Service.create(data);
        handleSuccess("Created!");
      } catch (error) {
        handleError(error);
      }
    },
  });

<CustomTextField
  label="Name"
  value={values.name}
  onChange={handleChange}
  onBlur={handleBlur}
  error={Boolean(touched.name && errors.name)}
  helperText={touched.name && errors.name}
  fullWidth
/>;
```

---

## Error Handling Pattern

```javascript
const { handleError, handleSuccess, handleCloseSnackbar, alertInfo } =
  useNotificationHandling();

try {
  await apiCall();
  handleSuccess("Operation completed!");
} catch (error) {
  handleError(error);
}

// In JSX
<MessageAlert
  open={alertInfo.open}
  onClose={handleCloseSnackbar}
  severity={alertInfo.severity}
  message={alertInfo.message}
/>;
```

---

## Loading Pattern

```javascript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  try {
    setLoading(true);
    await service.doSomething();
  } finally {
    setLoading(false);
  }
};

<CustomLoader open={loading} />;
```

---

## Search & Filter Pattern

```javascript
<SearchComponent
  onSearch={(query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }}
  onReset={() => {
    setSearchQuery("");
    setCurrentPage(1);
  }}
/>

// With dropdown filter
<CustomSelect
  label="Status"
  value={statusFilter}
  onChange={(e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  }}
  options={[
    { label: "All", value: "" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
  ]}
/>
```

---

## Pagination Pattern

```javascript
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);

// Always reset when search/filter changes
const handleSearch = (query) => {
  setSearchQuery(query);
  setCurrentPage(1); // ← CRITICAL
};

// useEffect depends on currentPage
useEffect(() => {
  fetchData();
}, [currentPage, searchQuery]); // dependencies trigger refetch

// Handle page change
const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

<CustomPagination
  totalPages={totalPages}
  currentPage={currentPage}
  handlePageChange={handlePageChange}
/>;
```

---

## Performance Rules

- Use React.lazy() for route-based code splitting
- Memoize expensive components: `React.memo(Component)`
- Use useMemo for heavy calculations
- Use useCallback for event handlers passed as props
- Never load ALL records at once → always paginate
- Redux selectors: `const selectProfile = state => state.auth.profile`
- Lazy load images: `<img loading="lazy" src={...} />`

---

## Authentication Rules

- Token stored in localStorage via Redux-Persist
- Request interceptor adds: `Authorization: Bearer {token}`
- 401 response triggers auto-logout
- Login flow: credentials → API → token → Redux dispatch → localStorage save → redirect
- TokenService: `getLocalAccessToken()`, `saveUser(token)`, `removeUser()`

### Login Flow

```
1. User inputs credentials
2. Call auth API → get token
3. dispatch(loginsucces(token))
4. Redux-Persist saves to localStorage
5. PrivateRoute checks state.auth.user
6. If exists → allow access
7. If 401 → auto-logout + redirect to /
```

---

## Role Handling Rules

- Roles stored in `state.auth.profile.groups` as array
- Check role: `userData?.groups?.includes("Director")`
- Available roles: Director, Sales Manager, Accounts Executive, QA, etc. (15+)
- Add role check in route: optional, in Header: for nav visibility

```javascript
if (userData?.groups?.includes("Director")) {
  // Show admin features
}
```

---

## Current Active Module

**CCF (Customer Complaint Form) / CAPA**

- Path: `src/Pages/CCF/`
- Key files: CCFView.jsx, CreateCCF.jsx, UpdateCCF.jsx, CapaView.jsx
- Key service: `CustomerService.getAllCCFData(page, search, isActive)`
- Main states: CCFData, currentPage, searchQuery, activeFilter, openPopup
- Features: Active/Inactive filter, Reject with confirmation, PDF export, CAPA integration

---

## Current Tasks

- [ ] Implement CCF list view with active/inactive filter
- [ ] Add reject confirmation popup
- [ ] Implement PDF export functionality
- [ ] Integrate CAPA creation flow
- [ ] Add document preview
- [ ] Implement search & pagination

---

## Current Bugs

- None logged yet

---

## Fix History

- ✅ Boolean parameter conversion (True/False format)
- ✅ Pagination reset on filter change
- ✅ Active/Inactive filter logic
- ✅ Token auto-logout on 401

---

## Edge Cases

- User login → token expires during session → 401 on next action → auto-logout
- Filter changes but pagination not reset → shows empty page
- Safe navigation required: data?.map() prevents null errors
- Formik onBlur handler MUST be present for validation to work
- URLSearchParams with undefined values → need null checks
- Redux state not persisting → check whitelist config
- CORS errors → verify backend URL and API endpoint

---

## Common Mistakes

- ❌ Making API calls in components instead of services
- ❌ Using string concatenation for URL params instead of URLSearchParams
- ❌ Forgetting to reset pagination on filter change
- ❌ Using JavaScript-style booleans (true/false) instead of Python (True/False)
- ❌ Using array index as React key instead of unique ID
- ❌ Not handling null data before mapping
- ❌ Prop drilling instead of using Redux
- ❌ Manual error handling instead of useNotificationHandling hook
- ❌ Not using loading states
- ❌ Assuming form validation works without onBlur handler

---

## Reusable Logic Learned

- **Service call + state pattern**: Always wrap with try/catch + loading state
- **Pagination + filter pattern**: ALWAYS reset page to 1 on filter change
- **Boolean conversion**: Wrap in ternary for Python format before API call
- **Safe data access**: Use optional chaining `data?.map()` and nullish coalescing
- **Modal lifecycle**: setOpenPopup(false) AFTER successful action
- **Form validation**: Requires Formik onBlur + validation schema
- **Date handling**: Use moment.js for formatting, backend expects ISO format
- **Search optimization**: Debounce not implemented yet (consider for future)

---

## Important Business Rules

- Only `auth` state persisted to localStorage via Redux-Persist
- API response always: `{ data: { results: [], count: number } }`
- Active/Inactive filtering: backend returns separate "closed" endpoints for some modules
- PDF export uses jsPDF + html2canvas + react-to-print
- WhatsApp integration via CustomerService (separate module)
- 15+ business roles → permission checks in components
- Multi-warehouse support in inventory
- CCF → CAPA workflow integration (mandatory)
- Seller accounts are business units/warehouse locations
- Lead funnels: New → Open → Hot → Closed

---

## Next Planned Improvements

- Debounce search input for performance
- Implement inline editing for tables
- Add bulk action support (select multiple, delete/update)
- Implement advanced filtering with date ranges
- Add export to Excel functionality
- Optimize Redux selectors with reselect library
- Add optimistic updates for better UX
- Implement undo/redo for operations
- Add real-time notifications for multi-user updates
- Create custom hook for common list patterns
- Add dark mode support

---

## Notes For Future Development

- Consider migrating to Context API for smaller state slices
- Implement request debouncing/throttling for heavy filters
- Create centralized pagination component (reduce boilerplate)
- Add API versioning strategy
- Consider implementing caching layer for master data
- Add error boundary components at route level
- Implement lazy loading for large tables
- Consider moving to Tanstack Query (React Query) for server state
- Add comprehensive error logging/monitoring
- Create Storybook for component documentation
- Implement E2E testing (Cypress)
- Add accessibility (a11y) checks
- Consider micro-frontends for scale

---

**Last Updated:** May 7, 2026 | Version: 0.1.0
