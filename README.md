# MediSource — Medical Equipment Marketplace

A full-stack medical equipment marketplace application for browsing, purchasing, and managing medical products.

MediSource includes a product catalog, shopping cart, checkout system, customer accounts, order management, and an admin console.

## Stack

- **Backend:** Node.js + Express
- **Authentication:** JWT + bcryptjs
- **Database:** Snowflake Cloud Database
- **Database Driver:** Snowflake SDK for Node.js
- **Frontend:** HTML, CSS, JavaScript
- **API:** REST API

## Architecture

```text
Frontend
    |
    v
Express REST API
    |
    v
Snowflake SDK
    |
    v
Snowflake Cloud Database
    |
    +---- USERS
    +---- PRODUCTS
    +---- CATEGORIES
    +---- CART
    +---- ORDERS
    +---- ORDER_ITEMS
Features
Product catalog
Product search and categories
Shopping cart
User registration and login
JWT authentication
Checkout and order management
Customer order history
Admin dashboard
Product CRUD operations
Snowflake persistent data storage
Database
MediSource uses Snowflake Cloud Database for persistent application data.
Main Tables
Table	Purpose
USERS	Customer and admin accounts
PRODUCTS	Medical equipment products
CATEGORIES	Product categories
CART	User shopping carts
ORDERS	Customer orders
ORDER_ITEMS	Products included in orders


Local Setup
Requirements
Node.js 18+
Snowflake account
Snowflake database
Snowflake warehouse
Git
Install
cd backend
npm install
Environment Variables
Create a .env file inside the backend directory:
SNOWFLAKE_ACCOUNT=your_account
SNOWFLAKE_USERNAME=your_username
SNOWFLAKE_PASSWORD=your_password
SNOWFLAKE_WAREHOUSE=your_warehouse
SNOWFLAKE_DATABASE=your_database
SNOWFLAKE_SCHEMA=your_schema
SNOWFLAKE_ROLE=your_role
Important: Never upload your .env file or Snowflake credentials to GitHub.
Add the following to .gitignore:
.env
node_modules/
Run
npm start
The application will be available at:
http://localhost:4000
API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Products
GET /api/products
GET /api/products/:id
GET /api/categories
Cart
GET    /api/cart
POST   /api/cart/items
PUT    /api/cart/items/:productId
DELETE /api/cart/items/:productId
Orders
POST /api/orders/checkout
GET  /api/orders
GET  /api/orders/:id
Health Check
GET /api/health
Deployment
The application can be deployed as a Node.js/Express application on cloud hosting platforms such as Render, Railway, or other Node.js-compatible platforms.
Required Environment Variables
SNOWFLAKE_ACCOUNT
SNOWFLAKE_USERNAME
SNOWFLAKE_PASSWORD
SNOWFLAKE_WAREHOUSE
SNOWFLAKE_DATABASE
SNOWFLAKE_SCHEMA
SNOWFLAKE_ROLE
Start Command
npm start
The application uses the hosting platform's PORT environment variable.
const PORT = process.env.PORT || 4000;
Security
Passwords are hashed using bcrypt.
Authentication uses JWT.
Admin routes are protected using role-based authorization.
Snowflake credentials are stored using environment variables.
.env and sensitive credentials must not be committed to GitHub.
Future Improvements
Razorpay or Stripe payment integration
Real product image hosting
Vendor accounts and vendor management
Advanced Snowflake analytics
Inventory analytics
AI-based product recommendations
Demand forecasting
Business intelligence dashboards
Project Purpose
MediSource is an educational full-stack project demonstrating how a medical equipment marketplace can be built using Node.js, Express, JavaScript, JWT authentication, and Snowflake Cloud Database.