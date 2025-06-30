This is a secure and RESTful backend service for managing personal finances. It allows authenticated users to record transactions (income/expenses), view summaries, and analyze their spending habits using category-wise aggregation.

---

## 🚀 Features

- 🔐 **Authentication**

  - User **register** and **login** with JWT token generation.
  - Passwords hashed securely.
  - Auth middleware (`authMiddleware`) to validate and extract user from JWT.

- 🔄 **Transaction Management**

  - Full **CRUD operations** on income/expense transactions.
  - Filter transactions by date, category, and description.
  - Recent transactions and balance calculation via summary endpoint.

- 📊 **Analytics**

  - `GET /api/analytics/category-summary` for category-wise totals.
  - Uses MongoDB aggregation pipeline for high performance.

- 🔎 **Input Validation & Sanitization**

  - Uses `express-validator` to validate all inputs.
  - Escapes input to prevent XSS and NoSQL injection.

- 🛡️ **Security**

  - `helmet` for secure headers.
  - `cors` middleware configured.
  - `express-rate-limit` to control excessive requests.

- ⚙️ **Setup**

  - Organized project structure with `app.js` and `server.js`.
  - Modular routing, controllers, and models using Mongoose.

- 🧪 **Tested with Postman**
  - All routes tested and documented using Postman.

---

## 🧪 API Endpoints (Summary)

### Auth Routes

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Login and receive JWT

### Transaction Routes

- `POST /api/transactions` – Add a new transaction
- `GET /api/transactions` – Get all/filter transactions
- `PUT /api/transactions/:id` – Update a transaction
- `DELETE /api/transactions/:id` – Delete a transaction

### Summary

- `GET /api/summary?month=6&year=2025` – View income, expense, and balance summary

### Analytics

- `GET /api/analytics/category-summary?month=6&year=2025` – Category-wise totals (pie/bar chart ready)

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

# Install dependencies

npm install

# Start the server

npm start
