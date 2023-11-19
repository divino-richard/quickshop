import express, { Request, Response } from 'express'; 
import { authorization } from '../middleware/authMiddleware';
import { productValidator } from '../middleware/validators/product.validator';
import product from '../controller/product.controller';
const router = express.Router();

router.get('/all/:_limits/:_offset', (req: Request, res: Response) => {
    product.getAll(req, res);
});
router.get('/all/:userId',
    authorization(['SELLER', 'ADMIN']),
    (req: Request, res: Response) => {

    product.getAllByUserId(req, res);
});
router.get('/:_id', (req: Request, res: Response) => {
    product.getById(req, res);
});
router.post('/',
    authorization(['SELLER', 'ADMIN']),
    productValidator,
    (req: Request, res: Response) => {

    product.create(req, res);
});
router.put('/:id',
    authorization(['SELLER', 'ADMIN']),
    productValidator,
    (req: Request, res: Response) => {

    product.update(req, res);
});
router.delete('/:id', 
    authorization(['SELLER', 'ADMIN']),
    (req: Request, res: Response) => {

    product.delete(req, res);
});

export default router;
