import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import models from '../models';

const router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return Promise.all([
    models.user
      .findAll({ where: { email: data.email } })
      .then(user => {
      if (!isEmpty(user)) {
        errors.email = 'There is user with such email';
      }
    }),

    models.user
      .findAll({ where: { username: data.username } })
      .then(user => {
      if (!isEmpty(user)) {
        errors.username = 'There is user with such username';
      }
    })
  ]).then(() => {
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });

}

router.get('/:identifier', (req, res) => {
  models.user
    .findAll({
      attributes: ['username', 'email'],
      where: {
        $or: [
          { email: req.params.identifier },
          { username: req.params.identifier }
        ]
      }
    })
    .then(user => {
      res.json({ user });
  });
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, email, password } = req.body;
      const active = false;
      const password_digest = bcrypt.hashSync(password, 10);

      model.user.create({
        username, email, password_digest, active
      })
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });
});

router.put('/:id/hideword/:wordId', (req, res) => {
  const { id, wordId } = req.params;
  User
    .findOne({ where: { id: id } })
    .then((user) => {
      if (user.hidden_words.indexOf(wordId) === -1) {
        user.hidden_words.push(parseInt(wordId, 10));
        return user.update({
          hidden_words: user.hidden_words
        }).then((user) => {
          return res.status(204).send(user);
        });
      }
      return res.status(200).send(user);
    });
});

export default router;
