export interface Product {
    _id?: string;
    title: string;
    description: string;
    price: number;
    quantityInStock: number;
    images: string[] | null;
}
