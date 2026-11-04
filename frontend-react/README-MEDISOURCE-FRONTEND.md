# MediSource frontend
React + TypeScript + Vite frontend for the MediSource B2B healthcare marketplace.

## Run
1. Copy the supplied `src` folder into `frontend-react`, replacing the starter `src` files.
2. From `frontend-react`, run `npm.cmd install` if dependencies are not installed.
3. Run `npm.cmd run dev` and open the local URL shown by Vite.

## Routes
- `/` Home
- `/products` Product catalogue and category filters
- `/products/:id` Product detail and tiered price display
- `/cart` Cart
- `/checkout` Checkout demo
- `/login`, `/register` Authentication UI demo
- `/orders` Customer order history placeholder
- `/admin` Admin overview demo

## Important
Product data is sample data and cart state is local to the browser session. Login, checkout submission, admin actions, inventory and orders are not connected to a backend yet. Integrate them with the Spring Boot REST API after agreeing request/response contracts. Do not commit `.env` files or secrets. The original `frontend/` folder is not modified.
