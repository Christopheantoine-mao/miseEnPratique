import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Express.js 🎯OK');
});

export default router;