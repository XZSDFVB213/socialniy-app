import { OrderItem } from "./order.interface"

export interface Product {
  id:string
  title:string
  price:number
  image:string
  description:string
  stock:number
  orderItems:OrderItem[]
}