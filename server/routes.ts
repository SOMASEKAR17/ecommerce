import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertAdminProductSchema } from "@shared/schema";
import type { Product } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Product routes - Fetch from FakeStore API + merge admin products
  app.get("/api/products", async (req, res) => {
    try {
      // Fetch from FakeStore API
      const fakeStoreRes = await fetch("https://fakestoreapi.com/products");
      const fakeStoreProducts: Product[] = await fakeStoreRes.json();
      
      // Add source tag
      const taggedFakeStore = fakeStoreProducts.map((p) => ({ ...p, source: 'fakestore' as const }));

      // Fetch admin products
      const adminProds = await storage.getAdminProducts();
      
      // Convert admin products to Product format
      const formattedAdminProducts: Product[] = adminProds.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        description: p.description,
        category: p.category,
        image: p.image,
        rating: { rate: 0, count: 0 },
        source: 'admin' as const,
      }));

      // Merge products
      const allProducts = [...formattedAdminProducts, ...taggedFakeStore];
      res.json(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      const fakeStoreRes = await fetch("https://fakestoreapi.com/products?limit=8");
      const products = await fakeStoreRes.json();
      res.json(products.map((p: Product) => ({ ...p, source: 'fakestore' })));
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ message: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Try to fetch from admin products first
      const adminProds = await storage.getAdminProducts();
      const adminProduct = adminProds.find((p) => p.id === id);
      
      if (adminProduct) {
        const product: Product = {
          id: adminProduct.id,
          title: adminProduct.title,
          price: adminProduct.price,
          description: adminProduct.description,
          category: adminProduct.category,
          image: adminProduct.image,
          rating: { rate: 0, count: 0 },
          source: 'admin',
        };
        return res.json(product);
      }

      // Fetch from FakeStore API
      const fakeStoreRes = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!fakeStoreRes.ok) {
        return res.status(404).json({ message: "Product not found" });
      }
      const product = await fakeStoreRes.json();
      res.json({ ...product, source: 'fakestore' });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/categories", async (req, res) => {
    try {
      const fakeStoreRes = await fetch("https://fakestoreapi.com/products/categories");
      const categories = await fakeStoreRes.json();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Admin routes
  app.get("/api/admin/products", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const products = await storage.getAdminProductsByUser(userId);
      res.json(products);
    } catch (error) {
      console.error("Error fetching admin products:", error);
      res.status(500).json({ message: "Failed to fetch admin products" });
    }
  });

  app.post("/api/admin/products", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      // Validate request body
      const validatedData = insertAdminProductSchema.parse(req.body);
      
      const product = await storage.createAdminProduct({
        ...validatedData,
        createdBy: userId,
      });
      
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating admin product:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
