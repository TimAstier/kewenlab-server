import models from '../models';

export default function UserGetter(userId) {
  return models.user
    .findOne({ where: { id: userId } })
    .then(user => {
      if (!user) {
        throw { status: 404, message: 'not_found' };
      }
      return user;
    });
}
