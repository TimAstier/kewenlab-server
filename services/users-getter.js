import models from '../models';

export default function UsersGetter(identifier) {
  return models.user
  .findAll({
    where: {
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    }
  });
}
