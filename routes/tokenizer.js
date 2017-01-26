import express from 'express';
import nodejieba from 'nodejieba';

let router = express.Router();

router.post('/', (req, res) => {
  const { content } = req.body;
  var result = nodejieba.cut(content);
  res.send(result);
});


export default router;
