import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import nodejieba from 'nodejieba';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
  const { content } = req.body;
  var result = nodejieba.cut(content);
  res.send(result);
});


export default router;
