import { wordText as WordText } from '../models';

export default {
  destroyWordsToDelete: (wordsToDelete) => {
    return WordText
      .destroy({
        where: {
          id: { in: wordsToDelete.map(x => x.wordText.id) }
        }
      });
  }
};
