const { Store, Product, Order, User } = require('../models');

exports.getDashboard = async (req, res) => {
  try {
    const stats = {
      products: await Product.count(),
      orders: await Order.count(),
      users: await User.count(),
      revenue: await Order.sum('total')
    };
    res.render('admin/dashboard', { stats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};

// Store Settings
exports.getSettings = async (req, res) => {
  const settings = await Store.findOne();
  res.json(settings);
};

exports.updateSettings = async (req, res) => {
  const { name, logo, coverImage } = req.body;
  await Store.update({ name, logo, coverImage }, { where: { id: 1 } });
  res.json({ message: 'Settings updated successfully' });
};

// Product Management
exports.getProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  await Product.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'Product updated successfully' });
};

// Order Management
exports.getOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [User, { model: Product, through: { attributes: ['quantity'] } }]
  });
  res.json(orders);
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  await Order.update({ status }, { where: { id: req.params.id } });
  res.json({ message: 'Order status updated' });
};

// User Management
exports.getUsers = async (req, res) => {
  const users = await User.findAll({ where: { role: 'customer' } });
  res.json(users);
};

exports.updateUser = async (req, res) => {
  await User.update(req.body, { where: { id: req.params.id } });
  res.json({ message: 'User updated successfully' });
};