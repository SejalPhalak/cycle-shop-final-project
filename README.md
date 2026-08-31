# Cycleshop Web - E-Commerce Platform

A full-stack e-commerce web application for buying and selling bicycles/cycles. Built with modern web technologies, featuring user authentication, shopping cart, order management, and an admin dashboard.


## ✅ Hosted link
https://cycle-shop-final-project.vercel.app/

## 🎯 Features

### User Features
- **User Authentication**: Register, login, and secure password management
- **Product Catalog**: Browse and search cycles with detailed information
- **Shopping Cart**: Add/remove items and manage quantities
- **Favorites/Wishlist**: Save favorite cycles for later
- **Checkout & Orders**: Complete purchase flow with order tracking
- **Order Management**: View order history and order details
- **Profile Management**: User account settings

### Admin Features
- **Cycle Management**: Add, edit, and delete cycles
- **Product Images**: Upload and manage cycle images
- **Inventory Control**: Manage cycle availability and details
- **Admin Dashboard**: View all cycles and manage inventory

### General Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Role-Based Access Control**: Different interfaces for users and admins
- **Secure API**: JWT-based authentication and authorization
- **Error Handling**: Comprehensive error management and validation

## 🛠️ Tech Stack

### Frontend
- **React 19**: UI library
- **Vite**: Fast build tool and dev server
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Joi**: Schema validation
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
Cycleshop-Web/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service modules
│   │   ├── context/            # React Context (Auth)
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/                 # Static assets
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── src/
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/             # API routes
│   │   ├── models/             # Database models
│   │   ├── middleware/         # Custom middleware
│   │   ├── validators/         # Input validation
│   │   ├── config/             # Configuration
│   │   ├── utils/              # Utility functions
│   │   └── uploads/            # Uploaded files
│   ├── app.js                  # Express app setup
│   └── package.json
│
└── README.md                    # Documentation

```


