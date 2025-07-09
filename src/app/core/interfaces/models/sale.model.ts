import { ProductModel } from "./product.model";
import { UserModel } from "./user.model";

export interface SaleModel {
    id: number;
    receiptId: number;
    user: UserModel;
    product: ProductModel;
    products: number;
    date: Date;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
}