import express, { Request, Response } from "express";
import { authorization } from "../middleware/authMiddleware";
import { orderValidator } from "../middleware/validators/orderValidator";
import order from "../controller/order.controller";

const router = express.Router();

router.post('/',
    authorization(['CUSTOMER']),
    orderValidator,
    (req: Request, res: Response) => {
        
    order.create(req, res);
});

router.get('/', 
    authorization(['ADMIN', 'SELLER', 'CUSTOMER']),
    (req: Request, res: Response) => {
    order.getAll(req, res);
})

export default router;
