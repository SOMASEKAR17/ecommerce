# 🛒 FakeStore E-Commerce Website

A **fully responsive front-end-only e-commerce website** built using modern frontend technologies.  
This project consumes data from the **[FakeStore API](https://fakestoreapi.com/)** to display products, implement search and filter features, and simulate a complete shopping experience — all with smooth animations and a clean UI.

---

## 🚀 Features

### 🏠 Homepage
- Hero/banner section introducing the store.
- Showcases featured products or categories.
- Responsive grid layout with product previews.

### 🛍️ Product Listing Page
- Fetches and displays all products from the FakeStore API.
- **Filtering:** By category and price range.
- **Search:** Find products by name or keyword.
- **Pagination:** Easily browse through product pages.
- Subtle **Framer Motion / GSAP** animations for product cards and transitions.
- Custom **Loader** while fetching data.

### 📦 Product Detail Page
- Displays product image, title, price, category, description, and rating.
- "Add to Cart" functionality for selected items.

### 🛒 Cart Page
- Add and remove products from the cart.
- Shows product quantity and total price.
- Persists cart data using local storage (optional).

### 🌓 Bonus Features
- **Dark Mode Toggle** for better accessibility and user preference.
- **Admin Panel (/admin):**
  - Login via OAuth (Google or GitHub).
  - Add new products to the catalog (local frontend simulation).
- Responsive design that adapts seamlessly across devices.

---

## 🧩 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React / Next.js / Vite** | Frontend Framework |
| **Tailwind CSS** | Styling & Responsive Design |
| **Framer Motion / GSAP** | Animations |
| **FakeStore API** | Product Data Source |
| **React Router / Next.js Routing** | Page Navigation |
| **OAuth (Google/GitHub)** | Admin Authentication |
| **Local Storage / Context API** | Cart State Management |

---


## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SOMASEKAR17/ecommerce.git


2. **Install dependencies**
    ```bash
    npm install


3. **Run the development server**
    ```bash
    npm run dev


Open your browser at http://localhost:5173/
 (or as shown in the terminal).

## 🌐 API Reference

All product data is fetched from the **[FakeStore API](https://fakestoreapi.com/)**.

### Example Endpoints:
- **GET** `/products` → Get all products  
- **GET** `/products/category/:category` → Get products by category  
- **GET** `/products/:id` → Get a single product  

---

## 💡 Future Improvements

- ✅ Add backend for persistent cart and admin product uploads.  
- ✅ Improve product search with fuzzy matching.  
- ✅ Add user authentication and checkout flow.  
- ✅ Optimize for SEO (if using Next.js).  

---

## 🎨 Design & Animation

- **Framer Motion** used for fade-in, hover, and route transition animations.  
- **GSAP** for scroll-based and hero-section animations.  
- Minimal, modern design using **Tailwind CSS** with a dark/light mode toggle.  


