export interface Product {
    _id: string | null;
    title: string;
    description: string;
    price: number;
    quantityInStock: number;
    images: string[]
    user: string;
}
