const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel.js');
const User = require('../models/userModel.js');
const Product = require('../models/productModel.js');
const { isAuth, isAdmin } = require('../utils.js');

const orderRouter = express.Router();

//Admin can get all orders
orderRouter.get(
  '/getOrders',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'name');
      res.send(orders);
    } catch (error) {
      res.status(404).send({ message: 'Order Not Found' });
    }
   
  })
);
//to create order for a user
orderRouter.post(
  '/newOrder',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaidUser,
      paidAt,
      paidConfirmedByAdmin,
      paidConfirmed,
      isDelivered,
    } = req.body;

    const newOrder = new Order({
      orderItems: orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: req.user._id,
      isPaidUser,
      paidAt,
      paidConfirmedByAdmin,
      paidConfirmed,
      isDelivered,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);


orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);
//user can see all of its order
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);
//user and admin can see a particular order
orderRouter.get(
  '/getParticularOrder/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
//admin can update a particular order
// orderRouter.put(
//   '/getOrders/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.paidConfirmed = true;
//       order.paidConfirmedByAdmin = Date.now();
//       order.isDelivered = Date.now();
//       order.deliveredAt = Date.now();
//       await order.save();
//       res.send({ message: 'Order Updated' });
//     } else {
//       res.status(404).send({ message: 'Order Not Found' });
//     }
//   })
// );
orderRouter.put(
  '/updateOrders/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const { paidConfirmed, paidConfirmedByAdmin, isDelivered, deliveredAt } = req.body;

    try {
      const order = await Order.findById(orderId);

      if (order) {
        // Update only if the field is provided in the request body
        if (paidConfirmed !== undefined) {
          order.paidConfirmed = paidConfirmed;
          order.paidConfirmedByAdmin = paidConfirmedByAdmin || null;
        }

        if (isDelivered !== undefined) {
          order.isDelivered = isDelivered;
        }

        if (deliveredAt !== undefined) {
          order.deliveredAt = deliveredAt || null;
        }

        await order.save();
        res.send({ message: 'Order Updated' });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } catch (error) {
      res.status(500).send({ message: 'Error updating order', error: error.message });
    }
  })
);

//Admin can delete a particular product
orderRouter.delete(
  '/deleteOrder/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);

      if (order) {
        await order.deleteOne();
        res.send({ message: 'Order Deleted' });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    } catch (error) {
      res.status(500).send({
        message: 'Error deleting order',
        error: error.message, // Include the error message for more information
      });
    }
  })
);
module.exports=orderRouter;

