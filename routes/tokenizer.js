import authenticate from '../middlewares/authenticate.js';
import nodejieba from 'nodejieba';

function tokenize(request, result, next) {
  try {
    result.send(nodejieba.cut(request.body.content));
  } catch (err) {
    throw { status: 500, message: 'Could not tokenize text' };
  }
  next();
}

module.exports = app => {
  app.post('/api/tokenizer', authenticate, tokenize);
};
