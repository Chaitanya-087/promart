import { AddressForm } from "./AddressForm";
import { Category } from "./category";

export interface Order {
    id: number;
    bill: {
        id: number;
        paymentMethod: string;
        paymentStatus: string;
        paymentAmount: number;
        paymentDate: string;
    }
    address: AddressForm;
    orderStatus: string;
    orderDate: string;
    orderAmount: number;
    orderItems: {
        id: number;
        quantity: number;
        price: number;
        product: {
            id: number;
            name: string;
            category: Category;
            description: string;
            price: number;
            imageUrl: string;
        }
    }[]
}