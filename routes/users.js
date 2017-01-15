import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import { user as User } from '../models';

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return Promise.all([
    User
      .findAll({
        where: { email: data.email }
      })
      .then(user => {
      if (!isEmpty(user)) {
        errors.email = 'There is user with such email';
      }
    }),

    User
      .findAll({
        where: { username: data.username }
      })
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
  User
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
      const { username, email, password, timezone } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.create({
        username, timezone, email, password_digest
      })
      .then(user => res.json({ success: true }))
      .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
