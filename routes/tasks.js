import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

// Route pour obtenir toutes les tâches
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour ajouter une nouvelle tâche
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Route pour mettre à jour une tâche par ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Task.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedTask = await Task.findByPk(id);
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route pour supprimer une tâche par ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;