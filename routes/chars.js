import express from 'express';

import { charText as CharText } from '../models';
import { text as Text } from '../models';

let router = express.Router();

// Find all occurences of char (:id) before Text with (:textorder)
router.get('/:id/status/:textorder', (req, res) => {
  CharText
    .findAll({
      where: { charId: req.params.id },
      include: [{
        model: Text,
        where: { order: { $lt: req.params.textorder } }
      }],
      order: [
        [Text, 'order', 'DESC']
      ]
    })
    .then(chartexts => {
      let status = '';
      if (chartexts[0]) {
        status = chartexts[0].text.title;
      } else {
        status = 'New';
      }
      return res.json({ status });
    });
});

export default router;
