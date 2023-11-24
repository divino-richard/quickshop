import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    orderItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        subTotalAmount: {
            type: Number,
            required: true,
        },
    }],
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'paypal', 'gcash', 'visa'],
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

export const OrderModel = mongoose.model('Orders', orderSchema);
