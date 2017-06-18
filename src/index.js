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
  while (true) { // eslint-disable-line
    if (text.length <= chunkSize) {
      chunks.push(text);
      break;
    }
    const splitAt = text.lastIndexOf(' ', chunkSize);
    if (splitAt === -1) {
      // No whitespace found, we need to truncate the word in that case.
      chunks.push(text.substr(0, chunkSize));
      text = text.substr(chunkSize); // eslint-disable-line no-param-reassign
    } else {
      chunks.push(text.substr(0, splitAt));
      text = text.substr(splitAt + 1); // eslint-disable-line no-param-reassign
    }
  }

  return chunks;
}
