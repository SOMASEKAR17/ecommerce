// Storage implementation with database support
import {
  users,
  adminProducts,
  type User,
  type UpsertUser,
  type AdminProduct,
  type InsertAdminProduct,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations (Required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin product operations
  getAdminProducts(): Promise<AdminProduct[]>;
  getAdminProductsByUser(userId: string): Promise<AdminProduct[]>;
  createAdminProduct(product: InsertAdminProduct): Promise<AdminProduct>;
}

export class DatabaseStorage implements IStorage {
  // User operations (Required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Admin product operations
  async getAdminProducts(): Promise<AdminProduct[]> {
    return await db.select().from(adminProducts);
  }

  async getAdminProductsByUser(userId: string): Promise<AdminProduct[]> {
    return await db
      .select()
      .from(adminProducts)
      .where(eq(adminProducts.createdBy, userId));
  }

  async createAdminProduct(product: InsertAdminProduct): Promise<AdminProduct> {
    const [newProduct] = await db
      .insert(adminProducts)
      .values(product)
      .returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
