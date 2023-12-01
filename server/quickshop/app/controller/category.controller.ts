import { Request, Response } from "express";
import { CategoryModel } from "../model/category.model";

const category = {
    create: async (req: Request, res: Response) => {
        try{
            const {title, description} = req.body;
        
            const createdCategory = await CategoryModel.create({
                title,
                description
            });

            return res.status(201).send({
                message: 'Cart created successfully',
                createdCategory,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Failed to add category"}
            })
        }
    },
    getMany: async (req: Request, res: Response) => {
        try {
            const categories = await CategoryModel.find();
            res.status(200).send({categories});
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Failed to add category"}
            })
        }
    },
}

export default category;
