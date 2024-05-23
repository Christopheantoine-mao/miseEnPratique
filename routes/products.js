// routes/products.js
import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Route pour obtenir tous les produits
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour ajouter un nouveau produit
router.post('/', async (req, res) => {
  try {
    const { name, price, description, inStock } = req.body;
    const newProduct = await Product.create({ name, price, description, inStock });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour obtenir un produit par ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour mettre à jour un produit par ID
router.put('/:id', async (req, res) => {
  try {
    const { name, price, description, inStock } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.inStock = inStock;
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour supprimer un produit par ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await Product.destroy({ where: { id: req.params.id } });
    if (result) {
      res.json({ message: 'Produit supprimé' });
    } else {
      res.status(404).json({ error: 'Produit non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
