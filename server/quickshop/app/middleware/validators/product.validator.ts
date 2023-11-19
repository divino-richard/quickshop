import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const productValidator = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Invalid title format')
        .isLength({max: 50}).withMessage('Title must be at most 50 characters long'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Invalid description format')
        .isLength({min: 50, max: 500}).withMessage('Description must be minimum of 15 and maximum 50 characters long'),
    body('price')
        .notEmpty().withMessage('Price is required')
        .isNumeric().withMessage('Price must be a numeric'),
    body('quantityInStock')
        .notEmpty().withMessage('Please provide quantity from the stock')
        .isNumeric().withMessage('Stock quantity must be numeric'),
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
