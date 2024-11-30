const mongoose = require('mongoose');

// Schema for cart items to define the structure of each item
const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  imageLink: { type: String, required: true },
});

// Schema for order details, can be extended as needed
const orderDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  tableNo: { type: String, required: true },
  orderType: { type: String, enum: ['dine-in', 'takeaway'], required: true },
});

const orderSchema = new mongoose.Schema({
  orderDetails: orderDetailsSchema, // Refined to use a nested schema
  cartItems: [cartItemSchema],      // Array of cart item objects
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed'], required: true, default: 'pending' },
});

// Create and export the Order model
const Order = mongoose.model('Order', orderSchema);

// Function to calculate daily revenue
Order.dailyRevenue = async function() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const dailyOrders = await Order.find({ createdAt: { $gte: startOfDay, $lt: endOfDay } });
  return dailyOrders.reduce((total, order) => total + order.totalPrice, 0);
};

// Function to calculate monthly revenue
Order.monthlyRevenue = async function() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);
  const monthlyOrders = await Order.find({ createdAt: { $gte: startOfMonth, $lt: endOfMonth } });
  return monthlyOrders.reduce((total, order) => total + order.totalPrice, 0);
};

module.exports = Order;
