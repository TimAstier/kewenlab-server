import authenticate from '../middlewares/authenticate.js';
import nodejieba from 'nodejieba';

function tokenize(request, result) {
  result.send(nodejieba.cut(request.body.content));
}

module.exports = function(app) {
  app.post('/api/tokenizer', authenticate, tokenize);
};
