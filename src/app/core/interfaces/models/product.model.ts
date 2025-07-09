import { CategoryModel } from "./category.model";

export interface ProductModel {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: number;
    imageName: string;
    category: CategoryModel;
    selected: boolean
}