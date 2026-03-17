# Sole Squad – Fullstack Sneaker Marketplace

**Sole Squad** is a fullstack web application that simulates an online sneaker marketplace where users can **buy, sell, and review sneakers**, including both **new and second-hand listings**.

The platform replicates key features of modern e-commerce sites (similar to Nike-style stores) and includes **product browsing, detailed product pages, user listings, reviews, and a shopping cart with a simulated checkout flow**.

This project focuses on demonstrating **fullstack development using the MERN stack, REST API integration, authentication, and CRUD operations for marketplace listings.**

---

# Project Overview

Online marketplaces need systems that allow users to browse products, manage listings, and interact with other users.

Sole Squad provides a platform where users can:

* Browse sneakers and view detailed product information
* Select sizes and quantities
* Add products to a shopping cart
* Simulate a checkout process
* Leave comments and ratings on products
* Create and manage their own sneaker listings for resale

The project simulates the workflow of a **real sneaker marketplace combining e-commerce and user-generated listings.**

---

# Tech Stack

## Frontend

* React
* JavaScript
* HTML
* CSS

## Backend

* Node.js
* Express

## Database

* MongoDB
* Mongoose

## Authentication & Security

* JSON Web Tokens (JWT)
* Email account verification
* Protected routes with authentication middleware
* CORS configuration

---

# Key Features

## Sneaker Catalog

Users can browse a catalog of sneakers displayed in a product listing page.

Each sneaker includes:

* Product images
* Price
* Available sizes
* Product details

Users can open a product page to view additional information and interact with the listing.

---

## Product Detail Page

Each sneaker has its own detail page where users can:

* View product images and description
* Select sneaker size
* Select quantity
* Add the product to their cart
* Read and write reviews
* Leave ratings and comments

---

## Shopping Cart & Checkout Simulation

Users can add products to their cart and proceed to checkout.

The checkout process is simulated using **LocalStorage** to persist cart data, replicating the behavior of a real payment workflow.

---

## Second-Hand Sneaker Marketplace

In addition to the main sneaker catalog, the application includes a **second-hand sneaker marketplace** where users can buy and sell sneakers.

Users can:

* Browse second-hand listings created by other users
* View product details
* Select size and quantity
* Add items to the cart
* Leave reviews and ratings

---

## User Listings

Each authenticated user has their own section where they can manage sneaker listings.

Users can:

* Upload sneakers to sell
* Edit existing listings
* Delete listings
* View sneakers posted by other users

This functionality demonstrates full **CRUD operations for marketplace listings.**

---

## Reviews and Ratings

Each sneaker page allows users to:

* Write comments
* Leave ratings
* Read reviews from other users

This simulates the social feedback system common in modern marketplaces.

---

# API Integration

The frontend communicates with the backend using **Axios** to interact with the REST API.

Key API operations include:

* Fetching sneaker listings
* Creating new listings
* Updating sneaker information
* Deleting listings
* Managing user actions and product interactions

---

# What I Learned

Building this project helped me strengthen my skills in:

* Developing a **fullstack MERN application**
* Designing and implementing a **REST API**
* Creating reusable **React components**
* Managing dynamic product rendering
* Implementing **CRUD operations** for marketplace listings
* Integrating frontend and backend using **Axios**
* Modeling product data with **MongoDB and Mongoose**
* Implementing **authentication with JWT**
* Protecting application routes with middleware
* Designing e-commerce style user flows

---

# Running the Project Locally

## 1. Clone the repository

```bash id="kqv7r2"
git clone https://github.com/AlbertGPe/sole-squad.git
```

---

## 2. Install dependencies

Backend:

```bash id="u7te2x"
cd api
npm install
```

Frontend:

```bash id="4g8t9p"
cd web
npm install
```

---

## 3. Configure environment variables

Create a `.env` file in the backend root:

```id="v6m1p0"
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 4. Run the backend

```bash id="h3p9z8"
cd api
npm run dev
```

---

## 5. Run the frontend

```bash id="a9l3w1"
cd web
npm start
```

---

# Screenshots / Demo

Suggested screenshots to include:

* Homepage sneaker catalog
* Sneaker detail page
* Shopping cart
* Second-hand sneaker marketplace
* User listing management page
* Product review section

---

# Author

Albert Garcia Pedrosa
Fullstack Web Developer

GitHub:
https://github.com/AlbertGPe
