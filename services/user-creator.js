import UserValidator from './user-validator';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import models from '../models';

export default function UserCreator(data) {
  return UserValidator(data, commonValidations)
    .then(({ errors, isValid }) => {
      if (isValid) {
        const { username, email, password } = data;
        const active = false;
        const password_digest = bcrypt.hashSync(password, 10); // eslint-disable-line camelcase
        return models.user.create({
          username, email, password_digest, active
        });
      }
      throw errors;
    });
}
