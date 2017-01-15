import express from 'express';
import authenticate from '../middlewares/authenticate.js';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
  // In a real application, we would create an event first
  res.status(201).json({ success: true });
  // Current user us now available:
  //res.status(201).json({ user: req.currentUser });
});

export default router;
