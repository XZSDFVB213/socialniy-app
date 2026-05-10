import { OrderItem } from "./order.interface"

export interface Product {
  id:string
  title:string
  price:number
  image:string
  description:string
  category:string
  subcategory:string
  stock:number
  orderItems:OrderItem[]
}