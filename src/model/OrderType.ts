import { ShoppingProductDataType } from "./ShoppingProductDataType";

export type OrderType = {
    id: string;
    email: string;
    orderDate: string;
    deliveryDate: string;
    shopping: ShoppingProductDataType[];
}