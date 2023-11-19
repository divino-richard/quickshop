import express, { Request, Response } from 'express';
import { authorization } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authorization(['CUSTOMER']), (req: Request, res: Response) => {
    res.status(200).send(req.jwt_payload);
});

export default router;

