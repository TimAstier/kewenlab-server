import authenticate from '../middlewares/authenticate.js';
import nodejieba from 'nodejieba';

function tokenize(request, result, next) {
  result.send(nodejieba.cut(request.body.content));
  next();
}

module.exports = app => {
  app.post('/api/tokenizer', authenticate, tokenize);
};
