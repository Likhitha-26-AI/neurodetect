require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('express-flash');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const paperRoutes = require('./routes/papers');
const datasetRoutes = require('./routes/datasets');
const modelRoutes = require('./routes/models');
const profileRoutes = require('./routes/profile');

const app = express();
connectDB();

/* ========================
   MIDDLEWARE
======================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

/* ========================
   ROUTES
======================== */
app.get('/', (req, res) => res.redirect('/auth/login'));

app.use('/auth', authRoutes);
app.use('/papers', paperRoutes);
app.use('/datasets', datasetRoutes);
app.use('/models', modelRoutes);
app.use('/profile', profileRoutes);

// Dashboard route
const { ensureAuthenticated } = require('./middleware/authMiddleware');
const Paper = require('./models/Paper');
const Dataset = require('./models/Dataset');
const AIModel = require('./models/Model');
const User = require('./models/User');

app.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const totalPapers = await Paper.countDocuments();
  const totalDatasets = await Dataset.countDocuments();
  const totalModels = await AIModel.countDocuments();
  const totalResearchers = await User.countDocuments();
  const models = await AIModel.find();
  const datasets = await Dataset.find();
  res.render('dashboard/index', {
    session: req.session,
    totalPapers, totalDatasets, totalModels, totalResearchers,
    models, datasets,
    messages: req.flash()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));