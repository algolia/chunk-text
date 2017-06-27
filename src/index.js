/* eslint-disable import/no-commonjs */
const runes = require('runes');

const assertIsValidText = function(text) {
  if (typeof text !== 'string') {
    throw new TypeError(
      'Text should be provided as first argument and be a string.'
    );
  }
};

const assertIsValidChunkSize = function(chunkSize) {
  if (typeof chunkSize !== 'number' || chunkSize <= 0) {
    throw new TypeError(
      'Size should be provided as 2nd argument and be a number greater than zero.'
    );
  }
};

export default function(text, chunkSize) {
  assertIsValidText(text);
  assertIsValidChunkSize(chunkSize);

  const chunks = [];
  let characters = runes(text);

  while (characters.length > chunkSize) {
    const splitAt = characters.lastIndexOf(' ', chunkSize);

    if (splitAt === -1) {
      // No whitespace found, we need to truncate the word in that case.
      const chunk = characters.slice(0, chunkSize).join('');
      chunks.push(chunk);
      characters = characters.slice(chunkSize); // eslint-disable-line no-param-reassign
    } else {
      const chunk = characters.slice(0, splitAt).join('');
      chunks.push(chunk);
      characters = characters.slice(splitAt + 1); // eslint-disable-line no-param-reassign
    }
  }

  chunks.push(characters.join(''));

  return chunks;
}
