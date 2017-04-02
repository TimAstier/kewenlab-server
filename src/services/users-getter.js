import models from '../models';

export default function UsersGetter(identifier) {
  this.perform = () => {
    return models.user
    .findAll({
      attributes: ['username', 'email'],
      where: {
        $or: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });
  };
}
