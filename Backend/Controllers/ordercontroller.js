const OrderData = require('../Modal/OrderData')
const order=async (req, res) => {
    try {
      const { orderDetails, cartItems, totalPrice } = req.body;
  
      const newOrder = new OrderData({
        orderDetails,
        cartItems,
        totalPrice,
      });
  
      // Assuming the newOrder object has a save method
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Error placing order' });
    }
  }

  const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderData.find();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Error fetching orders' });
    }
  }

  const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedOrder = await OrderData.findByIdAndUpdate(id, { status }, { new: true });
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Error updating order status' });
    }
  }

  const getDailyRevenue = async (req, res) => {
    try {
      const dailyRevenue = await OrderData.aggregate([
        { $match: { createdAt: { $gte: new Date(new Date().setHours(00, 00, 00)), $lt: new Date(new Date().setHours(23, 59, 59)) } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]);
      res.status(200).json(dailyRevenue);
    } catch (error) {
      console.error('Error fetching daily revenue:', error);
      res.status(500).json({ error: 'Error fetching daily revenue' });
    }
  }

  const getMonthlyRevenue = async (req, res) => {
    try {
      const monthlyRevenue = await OrderData.aggregate([
        { $match: { createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0) } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]);
      res.status(200).json(monthlyRevenue);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      res.status(500).json({ error: 'Error fetching monthly revenue' });
    }
  }

  module.exports={
    order,
    getAllOrders,
    updateOrderStatus,
    getDailyRevenue,
    getMonthlyRevenue
  }