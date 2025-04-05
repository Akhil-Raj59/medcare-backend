import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: 'Booking', // Reference to the booking being paid for
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: false,
  },
  razorpaySignature: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  platformFee: {
    type: Number,
    required: true,
    default: 10, // Default 0, can be calculated based on business rules
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['Razorpay', 'Other'],
    default: 'Razorpay',
  },
}, {
  timestamps: true,
});

const Payment = model('Payment', paymentSchema);

export default Payment;
