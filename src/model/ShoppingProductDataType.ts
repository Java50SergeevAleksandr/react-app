import { ProductType } from "./ProductType";

export type ShoppingProductDataType = ProductType & {
    count: number,
    totalCost: number
} 