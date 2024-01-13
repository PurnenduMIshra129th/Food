// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema(
//   {
//     orderItems: [
//       {
//         name: { type: String, required: true},
//         image: { type: String, required: true },
//         category: { type: String, required: true },
//         description: { type: String, required: true },
//         price: { type: Number, required: true },
//         quantity: { type: Number, required: true },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//       },
//     ],
//     shippingAddress: {
//       fullName: { type: String, required: true },
//       address: { type: String, required: true },
//       phone: { type: String, required: true },
//     },
//     paymentMethod: { type: String, required: true },
//     itemsPrice: { type: Number, required: true },
//     shippingPrice: { type: Number, required: true },
//     taxPrice: { type: Number, required: true },
//     totalPrice: { type: Number, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     isPaidUser: { type: Boolean, default: false },
//     paidAt: { type: Date },
//     paidConfirmed:{ type: Boolean, default: false },
//     paidConfirmedByAdmin: { type: Date },
//     isDelivered: { type: Boolean, default: false },
//     deliveredAt: { type: Date },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Order = mongoose.model('Order', orderSchema);
// module.exports=Order;
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String },
        image: { type: String },
        category: { type: String },
        description: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String },
      address: { type: String },
      phone: { type: String },
    },
    paymentMethod: { type: String },
    itemsPrice: { type: Number },
    shippingPrice: { type: Number },
    taxPrice: { type: Number },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPaidUser: { type: Boolean, default: false },
    paidAt: { type: Date },
    paidConfirmed: { type: Boolean, default: false },
    paidConfirmedByAdmin: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
