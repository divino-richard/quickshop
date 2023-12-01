import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const categoryValidator = {
    createCategory: [
        body('title')
            .notEmpty().withMessage('Title is required')
            .isString().withMessage('Invalid title'),
        body('description')
            .notEmpty().withMessage('Description is required')
            .isString().withMessage('Invalid description')
            .isLength({min: 50, max: 500})
            .withMessage('Description must be min of 50 and max of 500 characters'),
        
        function (req: Request, res: Response, next: NextFunction) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    error: {
                        message: errors.array()[0].msg
                    }
                });
            }
            next();
        }
    ]
}
