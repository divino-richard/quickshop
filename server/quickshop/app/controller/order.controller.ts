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
    },
    getAll: async(req: Request, res: Response) => {
        try {
            const userId = req.jwt_payload?._id;
            const userRole = req.jwt_payload?.role;
            const {_limit, _offset} = req.params;
            let orders: any[] = [];

            const limit = Number(_limit);
            const offset = Number(_offset);

            if(userRole === 'ADMIN' || 'SELLER') {
                orders = await OrderModel.find({
                    'orderItems': {
                        $elemMatch: {
                            'product.seller': userId
                        }
                    }
                })
                .populate('orderItems.product')
                .limit(limit).skip(offset);

            } else if(userRole === 'SELLER') {
                orders = await OrderModel.find({
                    'customer': userId
                })
                .populate('orderItems.product')
                .limit(limit).skip(offset);
            }
           
            res.status(200).send(orders);

        } catch (error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },
    getCustomerOrdersByStatus: async(req: Request, res: Response, status: string) => {
        try {
            const userId = req.jwt_payload?._id;
            const {_limit, _offset} = req.params;

            const limit = Number(_limit);
            const offset = Number(_offset);

            const orders = await OrderModel.find()
                            .where({orderStatus: status})
                            .populate('orderItems.product')
                            .limit(limit).skip(offset);
            res.status(200).send(orders);

        } catch (error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },

} 

export default order;
