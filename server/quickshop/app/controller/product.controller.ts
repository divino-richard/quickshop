import { Request, Response } from "express";
import { ProductModel } from "../model/productModel";

const product = {
    create: async (req: Request, res: Response) => {
        try {
            const product = req.body;
            const userId = req.jwt_payload?._id;
            const createdProduct = await ProductModel.create({...product, userId});
            return res.status(201).send({
                message: 'Product created successfully',
                data: createdProduct,
            });
        } catch(error) {
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getAll: async (req: Request, res: Response) => {
        const {_limits, _offset} = req.params;
        const limits = Number(_limits);
        const offset = Number(_offset);
        try {
            const products = await ProductModel.find().limit(limits).skip(offset);
            const totalProducts = await ProductModel.countDocuments();

            return res.status(200).send({
                products,
                total: totalProducts,
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getAllByUserId: async (req: Request, res: Response) => {
        const {userId} = req.params;
        try {
            const filter = {userId};
            const products = await ProductModel.find(filter);
            const totalProducts = await ProductModel.countDocuments();

            return res.status(200).send({
                products,
                total: totalProducts,
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        const {_id} = req.params;
        try {
            const product = await ProductModel.findById(_id);
            if (!product) {
                return res.status(204).end();
            }
            return res.status(200).send({product});
        } catch(error) {
            console.error("Error fetching product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            });
        }
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params;
        try {
            const updated = await ProductModel.findByIdAndUpdate(id, req.body);
            if (!updated) {
                return res.status(204).end();
            }
            return res.status(200).send({product: {updated}});
        } catch(error) {
            console.error("Error updating product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later",}
            });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const deleted = await ProductModel.findOneAndDelete({_id: id});
            if (!deleted) {
                return res.status(204).end();
            }
            return res.status(200).send({product: {deleted}});
        } catch(error) {
            console.error("Error deleting product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later",}
            });
        }
    },
}

export default product;
