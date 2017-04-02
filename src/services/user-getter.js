import models from '../models';

export default function UserGetter(userId) {
  this.perform = () => {
    return models.user
      .findOne({ where: { id: userId } });
  };
}
