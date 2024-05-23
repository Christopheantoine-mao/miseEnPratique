import express from 'express';
import products from './my-express-app/data/product.js'; // Importez le tableau de produits depuis le fichier approprié

const app = express();

// Middleware pour enregistrer chaque requête
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route pour obtenir un produit spécifique en fonction de l'ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id); // Récupérez l'ID du produit depuis les paramètres de l'URL
  console.log('Requested product ID:', productId); // Message de débogage pour vérifier l'ID demandé

  // Recherchez le produit dans le tableau en fonction de l'ID
  const product = products.find(prod => prod.id === productId);

  if (product) {
    console.log('Product found:', product); // Message de débogage pour vérifier le produit trouvé
    res.json(product); // Retournez le produit en format JSON s'il est trouvé
  } else {
    console.log('Product not found for ID:', productId); // Message de débogage pour indiquer que le produit n'a pas été trouvé
    res.status(404).send('Product not found'); // Retournez un code 404 si le produit n'est pas trouvé
  }
});

// Routes statiques
app.get('/', (req, res) => {
  res.send('Hello, Express.js');
});

app.get('/about', (req, res) => {
  res.send('Page About');
});

app.get('/contact', (req, res) => {
  res.send('Page Contact');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at <http://localhost:${port}/>`);
});
