import { Request, Response } from "express";
import { OrderModel } from "../model/orderModel";
import { Schema } from "mongoose";
import { ProductModel } from "../model/productModel";

interface OrderItems {
    product: Schema.Types.ObjectId;
    quantity: number;
    subTotalAmount?: number | undefined;
}

const order = {
    create: async (req: Request, res: Response) => {
        try {
            const customer = req.jwt_payload?._id;
            const { paymentMethod } = req.body;
            const orderItems = req.body.orderItems as OrderItems[];
            const shippingFee = 125;
            let totalAmount = 0;

            let orderItemsWithSubTotal: OrderItems[] = []; 
            await Promise.all(orderItems.map(async (item) => {
                const product = await ProductModel.findById(item.product);

                if(!product || !product.price) return;

                const subTotalAmount = (product.price) * item.quantity;
                item.subTotalAmount = subTotalAmount;
                orderItemsWithSubTotal.push(item);
            
                totalAmount += subTotalAmount;
            }));

            const placeOrderResult = await OrderModel.create({
                customer,
                orderItems: orderItemsWithSubTotal,
                paymentMethod,
                totalAmount: totalAmount + shippingFee,
                shippingFee,
            });

            return res.status(200).send({
                message: 'Order placed successfully',
                order: placeOrderResult,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    }
} 

export default order;
