import express from 'express';
import sequelize from './config/database.js';
import taskRoutes from './routes/tasks.js';
import productRoutes from './routes/products.js';
import indexRoutes from './routes/index.js';

const port = 3000;
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes pour les produits
app.use('/products', productRoutes);

// Routes pour les tâches
app.use('/tasks', taskRoutes);

// Routes pour l'index
app.use('/', indexRoutes);

// Synchroniser le modèle avec la base de données
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
