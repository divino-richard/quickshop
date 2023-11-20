import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const orderValidator = [
    body('orderItems')
        .isArray({ min: 1 })
        .withMessage('Order items must be an array with at least one item'),
    body('orderItems.*.product')
        .notEmpty().withMessage('Product is requred')
        .isMongoId().withMessage('Product ID must be a valid MongoDB ID'),
    body('orderItems.*.quantity')
        .notEmpty().withMessage('Product quantity is requred')
        .isInt({ min: 1 }).withMessage('Quantity should be greater than zero'),
    body('paymentMethod')
        .notEmpty().withMessage('Please provide a payment method')
        .isString().withMessage('Payment method should be string'),

    function (req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {message: errors.array()[0].msg}
            });
        }
        next();
    }
]