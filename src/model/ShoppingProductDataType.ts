import { ProductType } from "./ProductType";

export type ShoppingProductDataType = ProductType & {
    count: number,
    price: number
} 