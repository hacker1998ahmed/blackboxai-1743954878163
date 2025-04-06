require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', (filePath, options, callback) => {
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) return callback(err);
    const rendered = ejs.render(content, options);
    return callback(null, rendered);
  });
});
app.set('view engine', 'html');

// API Routes
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const checkoutRoutes = require('./routes/checkout');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');
const customerRoutes = require('./routes/customer');

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/customers', customerRoutes);

// Frontend Routes
app.get('/', (req, res) => {
  res.render('frontend/home', {
    title: 'المتميز للأثاث',
    lang: 'ar',
    dir: 'rtl'
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).render('frontend/404');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('frontend/500');
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`👉 Visit: http://localhost:${PORT}\n`);
  
  // Create required directories if they don't exist
  const dirs = [
    'public/images/products',
    'public/js',
    'views/frontend/layouts',
    'views/admin'
  ];
  
  dirs.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
});
