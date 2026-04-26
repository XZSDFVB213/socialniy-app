import { Product } from "./product.interface"

export interface Order {
  id:String
  userId:string
  status:string
  items:OrderItem[]
  createdAt:Date
  total:number
}

export interface OrderItem {
  id:string
  orderId:string
  productId:string
  quantity:number
  price:number
  order:Order
  product:Product
}