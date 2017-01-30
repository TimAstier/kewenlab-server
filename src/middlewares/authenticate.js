import jwt from 'jsonwebtoken';
import { user as User } from '../models';

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Failed to authenticate" });
      } else {
        User.findOne({
          where: { id: decoded.id },
          attributes: ['email', 'username', 'id', 'active']
        }).then(user => {
          if (!user) {
            res.status(404).json({ error: "No such user" });
          } else if (user.active === false) {
            res.status(403).json({ error: "Account not activated" });
          } else {
            req.currentUser = user;
            next();
          }
        });
      }
    });
  } else {
    res.status(403).json({ error: 'No token provided' });
  }

}
