import runes from 'runes';

const assertIsValidText = (text) => {
  if (typeof text !== 'string') {
    throw new TypeError(
      'Text should be provided as first argument and be a string.'
    );
  }
};

const assertIsValidChunkSize = (chunkSize) => {
  if (Number.isNaN(chunkSize) || Number.parseInt(chunkSize, 10) <= 0) {
    throw new TypeError(
      'Size should be provided as 2nd argument and parseInt to a value greater than zero.'
    );
  }
};

const assertIsValidChunkOptions = (chunkOptions) => {
  if (
    typeof chunkOptions !== 'object' &&
    typeof chunkOptions !== 'undefined' &&
    chunkOptions !== null &&
    chunkOptions !== ''
  ) {
    throw new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'textEncoder']"
    );
  }
};

const assertIsValidCharLengthMask = (
  charLengthMask,
  charLengthMaskIntParseIntNaN,
  charLengthMaskInt
) => {
  if (charLengthMaskIntParseIntNaN || charLengthMaskInt < -1) {
    throw new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    );
  }
};

const assertIsValidTextEncoder = (textEncoder) => {
  if (
    typeof textEncoder === 'string' ||
    Array.isArray(textEncoder) ||
    typeof textEncoder === 'undefined' ||
    textEncoder === null
  ) {
    throw new TypeError(
      'textEncoder should be provided as a chunkOptions property and be an object containing the .encode(text).length property.'
    );
  }
};

const assertIsValidCharLengthType = (charLengthType) => {
  if (
    typeof charLengthType !== 'string' ||
    !(charLengthType === 'length' || charLengthType === 'TextEncoder')
  ) {
    throw new TypeError(
      "charLengthType should be provided as a chunkOptions property and be a value in ['length', 'TextEncoder']"
    );
  }
};

const chunkLength = (
  characters,
  charLengthMask,
  charLengthType,
  textEncoder
) => {
  let length;
  if (
    typeof characters === 'undefined' ||
    characters === null ||
    characters === ''
  ) {
    length = -1;
  } else {
    let charactersArray;
    if (typeof characters === 'string') {
      charactersArray = [characters];
    } else if (Array.isArray(characters) && characters.length) {
      charactersArray = characters;
    }

    if (
      !Array.isArray(charactersArray) ||
      !charactersArray.length ||
      charactersArray === null
    ) {
      length = -1;
    } else if (charLengthMask === 0) {
      length = charactersArray
        .map(
          (character) =>
            (charLengthType === 'TextEncoder'
              ? textEncoder.encode(character)
              : character
            ).length
        )
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    } else if (charLengthMask > 0) {
      const arrayLength = charactersArray
        .map(
          (character) =>
            (charLengthType === 'TextEncoder'
              ? textEncoder.encode(character)
              : character
            ).length
        )
        .reduce(
          (accumulator, currentValue) =>
            accumulator +
            (currentValue > charLengthMask ? charLengthMask : currentValue)
        );
      const maxLength = charactersArray.length * charLengthMask;
      length = maxLength > arrayLength ? arrayLength : maxLength;
    } else {
      length = charactersArray.length;
    }
  }
  return length;
};

const lastSpaceOrLength = (text, upTo) => {
  let lastIndex = text.lastIndexOf(' ', upTo);
  if (lastIndex === -1) {
    lastIndex = upTo;
  }
  if (lastIndex > text.length || upTo >= text.length) {
    lastIndex = text.length;
  }
  return lastIndex;
};

const chunkIndexOf = (
  characters,
  chunkSize,
  charLengthMask,
  charLengthType,
  textEncoder
) => {
  let splitAt = lastSpaceOrLength(characters, chunkSize);

  while (
    splitAt > 0 &&
    chunkSize <
      chunkLength(
        characters.slice(0, splitAt),
        charLengthMask,
        charLengthType,
        textEncoder
      )
  ) {
    splitAt = splitAt - 1;
  }
  splitAt = lastSpaceOrLength(characters, splitAt);
  if ((splitAt > -2 && splitAt < 1) || characters[splitAt] === ' ') {
    splitAt = splitAt + 1;
  }
  if (
    splitAt > characters.length ||
    splitAt < 0 ||
    (splitAt === 0 && characters.length === 1)
  ) {
    splitAt = characters.length;
  }
  return splitAt;
};

export default (text, chunkSize, chunkOptions) => {
  assertIsValidText(text);
  const chunkSizeInt = Number.parseInt(chunkSize, 10);
  assertIsValidChunkSize(chunkSizeInt);
  assertIsValidChunkOptions(chunkOptions);

  let charLengthMaskInt = -1;
  let charLengthMaskIntParseInt = -1;
  let charLengthMaskIntParseIntNaN = true;
  let textEncoderObject;
  if (typeof chunkOptions === 'object') {
    if (Object.prototype.hasOwnProperty.call(chunkOptions, 'charLengthMask')) {
      charLengthMaskInt = chunkOptions.charLengthMask;
      charLengthMaskIntParseInt = Number.parseInt(charLengthMaskInt, 10);
      charLengthMaskIntParseIntNaN = Number.isNaN(charLengthMaskIntParseInt);
      assertIsValidCharLengthMask(
        charLengthMaskInt,
        charLengthMaskIntParseIntNaN,
        charLengthMaskIntParseInt
      );
    }
    if (Object.prototype.hasOwnProperty.call(chunkOptions, 'charLengthType')) {
      assertIsValidCharLengthType(chunkOptions.charLengthType);
      if (chunkOptions.charLengthType === 'TextEncoder') {
        if (Object.prototype.hasOwnProperty.call(chunkOptions, 'textEncoder')) {
          assertIsValidTextEncoder(chunkOptions.textEncoder);
          textEncoderObject = chunkOptions.textEncoder;
        }
      }
    }
  }
  const charLengthMask = charLengthMaskIntParseIntNaN
    ? -1
    : charLengthMaskIntParseInt;
  const charLengthType =
    typeof chunkOptions === 'object' && chunkOptions.charLengthType
      ? chunkOptions.charLengthType
      : 'length';
  try {
    if (
      charLengthType === 'TextEncoder' &&
      (typeof textEncoderObject === 'undefined' ||
        textEncoderObject === null ||
        textEncoderObject === '')
    ) {
      textEncoderObject = new TextEncoder();
    }
  } catch (ex) {
    throw new ReferenceError(
      "TextEncoder is not natively defined, new TextEncoder must be passed in with the 'chunkOptions.textEncoder' property."
    );
  }
  const textEncoder = textEncoderObject;
  const chunks = [];
  let characters = runes(text);
  while (
    chunkLength(characters, charLengthMask, charLengthType, textEncoder) > 0
  ) {
    const splitAt = chunkIndexOf(
      characters,
      chunkSizeInt,
      charLengthMask,
      charLengthType,
      textEncoder
    );
    const chunk = characters.slice(0, splitAt).join('').trim();
    if (chunk !== '' && chunk !== null) {
      chunks.push(chunk);
    }
    characters = characters.slice(splitAt);
  }
  return chunks;
};
