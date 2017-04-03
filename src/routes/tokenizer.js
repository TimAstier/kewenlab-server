import authenticate from '../middlewares/authenticate.js';
import nodejieba from 'nodejieba';

function tokenize(request, result, next) {
  result.send(nodejieba.cut(request.body.content));
  next();
}

module.exports = function(app) { // eslint-disable-line func-names
  app.post('/api/tokenizer', authenticate, tokenize);
};
