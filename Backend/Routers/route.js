const express = require('express');
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} = require('../Controllers/itemcontroller');
const {
  order,
  getAllOrders,
  updateOrderStatus,
  getDailyRevenue,
  getMonthlyRevenue
}=require('../Controllers/ordercontroller')
const router = express.Router();

// Routes
router.post('/api/items', addItem); // Add a new item
router.get('/api/items', getItems); // Get all items
router.get('/api/items/:id', getItemById); // Get a single item by ID
router.put('/api/items/:id', updateItem); // Update an item
router.delete('/api/items/:id', deleteItem); // Delete an item
router.post('/api/order', order); // Create an order
router.get('/api/order', getAllOrders); // Get all orders
router.put('/api/order/:id', updateOrderStatus); // Update order status
router.get('/api/daily-revenue', getDailyRevenue); // Get daily revenue
router.get('/api/monthly-revenue', getMonthlyRevenue); // Get monthly revenue

module.exports = router;
