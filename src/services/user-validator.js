import Promise from 'bluebird';
import models from '../models';
import isEmpty from 'lodash/isEmpty';

export default function UserValidator(data, otherValidations) {
  this.perform = () => {
    const { errors } = otherValidations(data);
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
  };
}
