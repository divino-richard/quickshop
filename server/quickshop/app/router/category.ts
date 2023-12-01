import express, { Request, Response } from 'express';
import { authorization } from '../middleware/authMiddleware';
import { categoryValidator } from '../middleware/validators/category.validator';
import category from '../controller/category.controller';

const router = express.Router();

router.post('/',
    authorization(['ADMIN']),    
    categoryValidator.createCategory,
    (req: Request, res: Response) => {
    category.create(req, res);  
});

router.get('/',
    (req: Request, res: Response) => {
    category.getMany(req, res);  
});

export default router;
