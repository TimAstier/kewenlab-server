import models from '../models';

export default function UserGetter(userId) {
  return models.user
    .findOne({ where: { id: userId } });
}
