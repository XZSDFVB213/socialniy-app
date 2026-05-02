import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  user: User;
  product: Product;
}