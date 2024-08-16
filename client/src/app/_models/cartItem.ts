export interface CartItem {
    id: number;
    productId: number;
    productName: string;
    imageUrl: string;
    categoryName: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
}
