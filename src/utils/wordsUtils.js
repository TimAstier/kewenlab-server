export function filterFullyMatchingWords(words) {
  // Keep only words built only with previously used chars
  // Compare chars in word (as a string) with linked chars objects
  return words.filter(w => {
    let keep = true;
    const wordChars = w.chinese.split('');
    const usedCharsInWord = w.chars.map(c => c.chinese);
    wordChars.forEach(c => {
      if (usedCharsInWord.indexOf(c) === -1) {
        keep = false;
      }
      return;
    });
    return keep;
  });
}

export function filterNonUsedWords(words, textOrder) {
  // Filter out words having a text with order $lte text.order
  return words.filter(w => {
    let keep = true;
    w.texts.forEach(t => {
      if (t.order <= textOrder) {
        keep = false;
      }
    });
    return keep;
  });
}

export function orderByFrequency(words) {
  return words.sort((a, b) => {
    return a.frequency - b.frequency;
  });
}
