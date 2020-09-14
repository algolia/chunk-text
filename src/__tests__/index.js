import chunk from '../index';
import { TextEncoder } from 'fastestsmallesttextencoderdecoder-encodeinto';
it("should throw if 'text' is missing or its type or value are invalid.", () => {
  expect(() => {
    chunk();
  }).toThrow(
    new TypeError('Text should be provided as first argument and be a string.')
  );
});

it("should throw if 'size' is missing or its type or value are invalid.", () => {
  expect(() => {
    chunk('hello world');
  }).toThrow(
    new TypeError(
      'Size should be provided as 2nd argument and parseInt to a value greater than zero.'
    )
  );
  expect(() => {
    chunk('hello world', 0);
  }).toThrow(
    new TypeError(
      'Size should be provided as 2nd argument and parseInt to a value greater than zero.'
    )
  );
});

it("should throw if 'type' argument's type or value is invalid.", () => {
  expect(() => {
    chunk('hello world', 1, { charLengthMask: 'one' });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: -2.001 });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: -2 });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: 3 });
  }).not.toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: '3' });
  }).not.toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
});

it("should not throw if 'type' type and value are missing or valid.", () => {
  expect(() => {
    chunk('hello world', 1, { charLengthMask: '' });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: null });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: undefined });
  }).toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, {});
  }).not.toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthType: 'length' });
  }).not.toThrow(
    new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.'
    )
  );
  expect(() => {
    chunk('hello world', 1);
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: -1.999 });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: -0.001 });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: 0.0 });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: 1.0 });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: new Number.BigInt(2.0) });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: 2.999 });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: '2.99999 years' });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
  expect(() => {
    chunk('hello world', 1, { charLengthMask: '2' });
  }).not.toThrow(
    new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'TextEncoder']"
    )
  );
});

it('should return an array of strings.', () => {
  const pieces = chunk('hello world', 5);
  expect(pieces).toEqual(['hello', 'world']);
});

it('should not cut in the middle of words', () => {
  const pieces = chunk('hello world how are you?', 7);
  expect(pieces).toEqual(['hello', 'world', 'how are', 'you?']);
});

it('should truncate a word if longer than size', () => {
  const pieces = chunk('hello you', 4);
  expect(pieces).toEqual(['hell', 'o', 'you']);
});

it('should count multi-byte characters as single characters by default', () => {
  // each of these characters is two bytes
  const chineseTextA = '𤻪';
  const chineseTextB = '𬜬';
  const chineseTextC = '𬜯';
  const chineseText = chineseTextA + chineseTextB + chineseTextC;
  expect(chunk(chineseText, 2)).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 1)).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);

  // each of these characters is two bytes
  const fourCheese = '🧀🧀🧀🧀';
  const camembert = `${fourCheese} ${fourCheese}`;
  expect(chunk(camembert, 4)).toEqual([fourCheese, fourCheese]);

  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  expect(
    chunk(runner + runner + runner + runner + runner + runner + runner, 3)
  ).toEqual([runner + runner + runner, runner + runner + runner, runner]);
});

it('should count all characters as single characters using charLengthMask -1 or 1 values', () => {
  // each of these characters is two bytes
  const chineseTextA = '𤻪';
  const chineseTextB = '𬜬';
  const chineseTextC = '𬜯';
  const chineseText = chineseTextA + chineseTextB + chineseTextC;
  expect(chunk(chineseText, 2, { charLengthMask: -1 })).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 1, { charLengthMask: -1 })).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 2, { charLengthMask: 1 })).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 1, { charLengthMask: 1 })).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);

  // each of these characters is two bytes
  const fourCheese = '🧀🧀🧀🧀';
  const camembert = `${fourCheese} ${fourCheese}`;
  expect(chunk(camembert, 4, { charLengthMask: -1 })).toEqual([
    fourCheese,
    fourCheese,
  ]);
  expect(chunk(camembert, 4, { charLengthMask: 1 })).toEqual([
    fourCheese,
    fourCheese,
  ]);

  // The Woman Running emoji is a ZWJ sequence combining 🏃 Person Running, ‍ Zero Width Joiner and ♀ Female Sign.
  // each of these characters is five bytes
  const womanRunningZWJ = '🏃‍♀️';
  const womenRunningZWJ = `${
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ
  } ${womanRunningZWJ + womanRunningZWJ}`;
  expect(chunk(womenRunningZWJ, 2, { charLengthMask: -1 })).toEqual([
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
  expect(chunk(womenRunningZWJ, 2, { charLengthMask: 1 })).toEqual([
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
});

it('should count characters as bytes using charLengthMask value 0', () => {
  // each of these characters is two bytes
  const chineseTextA = '𤻪';
  const chineseTextB = '𬜬';
  const chineseTextC = '𬜯';
  const chineseText = chineseTextA + chineseTextB + chineseTextC;
  expect(chunk(chineseText, 2, { charLengthMask: 0 })).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 1, { charLengthMask: 0 })).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 4, { charLengthMask: 0 })).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 6, { charLengthMask: 0 })).toEqual([
    chineseTextA + chineseTextB + chineseTextC,
  ]);

  // each of these characters is two bytes
  const twoCheese = '🧀🧀';
  const camembert = `${twoCheese + twoCheese} ${twoCheese + twoCheese}`;
  expect(chunk(camembert, 4, { charLengthMask: 0 })).toEqual([
    twoCheese,
    twoCheese,
    twoCheese,
    twoCheese,
  ]);

  // The Woman Running emoji is a ZWJ sequence combining 🏃 Person Running, ‍ Zero Width Joiner and ♀ Female Sign.
  // each of these characters is five bytes
  const womanRunningZWJ = '🏃‍♀️';
  const womenRunningZWJ = `${
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ
  } ${womanRunningZWJ + womanRunningZWJ}`;
  expect(chunk(womenRunningZWJ, 10, { charLengthMask: 0 })).toEqual([
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
  expect(
    chunk(
      `12123123 1231231 312312312 123 12 ${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}`,
      44,
      { charLengthMask: 0 }
    )
  ).toEqual([
    `12123123 1231231 312312312 123 12 ${womanRunningZWJ}`,
    `${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}`,
    `${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}`,
  ]);

  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  expect(chunk(runner + runner + runner, 17, { charLengthMask: 0 })).toEqual([
    runner + runner,
    runner,
  ]);
  expect(
    chunk(
      `12123123 1231231 312312312 123 12 ${runner}${runner}${runner} ${runner}${runner}${runner} ${runner}${runner}${runner}${runner} ${runner} ${runner}${runner} ${runner}`,
      28,
      { charLengthMask: 0 }
    )
  ).toEqual([
    `12123123 1231231 312312312`,
    `123 12 ${runner}${runner}${runner}`,
    `${runner}${runner}${runner}`,
    `${runner}${runner}${runner}${runner}`,
    `${runner} ${runner}${runner}`,
    `${runner}`,
  ]);
});

it('should count single width characters the same with all charLengthMask values', () => {
  for (let i = 0; i < 100; i++) {
    expect(chunk('hello you', 4, { charLengthMask: i })).toEqual([
      'hell',
      'o',
      'you',
    ]);
  }
});

it('should count characters as bytes up to maximum N charLengthMask value > 0', () => {
  // each of these characters is two bytes
  const chineseTextA = '𤻪';
  const chineseTextB = '𬜬';
  const chineseTextC = '𬜯';
  const chineseText = chineseTextA + chineseTextB + chineseTextC;
  expect(chunk(chineseText, 2, { charLengthMask: 2 })).toEqual([
    chineseTextA,
    chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 4, { charLengthMask: 2 })).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);
  expect(chunk(chineseText, 2, { charLengthMask: 1 })).toEqual([
    chineseTextA + chineseTextB,
    chineseTextC,
  ]);

  // each of these characters is two bytes
  const cheese = '🧀';
  const twoCheese = cheese + cheese;
  const camembert = `${twoCheese + twoCheese} ${twoCheese + twoCheese}`;
  expect(chunk(camembert, 4, { charLengthMask: 2 })).toEqual([
    twoCheese,
    twoCheese,
    twoCheese,
    twoCheese,
  ]);
  expect(chunk(camembert, 2, { charLengthMask: 4 })).toEqual([
    cheese,
    cheese,
    cheese,
    cheese,
    cheese,
    cheese,
    cheese,
    cheese,
  ]);

  // The Woman Running emoji is a ZWJ sequence combining 🏃 Person Running, ‍ Zero Width Joiner and ♀ Female Sign.
  // each of these characters is five bytes
  const womanRunningZWJ = '🏃‍♀️';
  const womenRunningZWJ = `${
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ
  } ${womanRunningZWJ + womanRunningZWJ}`;
  expect(chunk(womenRunningZWJ, 2, { charLengthMask: 0 })).toEqual([
    womanRunningZWJ,
    womanRunningZWJ,
    womanRunningZWJ,
    womanRunningZWJ,
    womanRunningZWJ,
    womanRunningZWJ,
  ]);
  for (let i = 2; i < 100; i++) {
    expect(chunk(womenRunningZWJ, 2, { charLengthMask: i })).toEqual([
      womanRunningZWJ,
      womanRunningZWJ,
      womanRunningZWJ,
      womanRunningZWJ,
      womanRunningZWJ,
      womanRunningZWJ,
    ]);
  }
  expect(chunk(womenRunningZWJ, 4, { charLengthMask: 1 })).toEqual([
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
  expect(chunk(womenRunningZWJ, 4, { charLengthMask: 2 })).toEqual([
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
  expect(chunk(womenRunningZWJ, 8, { charLengthMask: 4 })).toEqual([
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
    womanRunningZWJ + womanRunningZWJ,
  ]);
  for (let i = 9; i < 100; i++) {
    expect(chunk(womenRunningZWJ, 11, { charLengthMask: i })).toEqual([
      womanRunningZWJ + womanRunningZWJ,
      womanRunningZWJ + womanRunningZWJ,
      womanRunningZWJ + womanRunningZWJ,
    ]);
  }
  expect(
    chunk(
      `12123123 1231231 312312312 123 12 ${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ} ${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}`,
      12,
      { charLengthMask: 2 }
    )
  ).toEqual([
    '12123123',
    '1231231',
    '312312312',
    '123 12',
    `${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}`,
    `${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}`,
    `${womanRunningZWJ}${womanRunningZWJ} ${womanRunningZWJ}`,
  ]);

  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  expect(chunk(runner + runner + runner, 4, { charLengthMask: 2 })).toEqual([
    runner + runner,
    runner,
  ]);
  expect(
    chunk(
      `12123123 1231231 312312312 123 12 ${runner}${runner}${runner}${runner}${runner}${runner} ${runner}${runner}${runner}${runner} ${runner} ${runner}${runner} ${runner}`,
      12,
      { charLengthMask: 2 }
    )
  ).toEqual([
    '12123123',
    '1231231',
    '312312312',
    '123 12',
    `${runner}${runner}${runner}${runner}${runner}${runner}`,
    `${runner}${runner}${runner}${runner} ${runner}`,
    `${runner}${runner} ${runner}`,
  ]);
});

it('should count N-byte characters with charLengthMask value 0 the same as charLengthMask value N', () => {
  // each of these characters is two bytes
  const camembert = '🧀🧀🧀🧀 🧀🧀🧀🧀';
  expect(chunk(camembert, 8, { charLengthMask: 2 })).toEqual(
    chunk(camembert, 8, { charLengthMask: 0 })
  );

  // The Woman Running emoji is a ZWJ sequence combining 🏃 Person Running, ‍ Zero Width Joiner and ♀ Female Sign.
  // each of these characters is five bytes
  const womanRunningZWJ = '🏃‍♀️';
  const womenRunningZWJ = `${
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ
  } ${womanRunningZWJ + womanRunningZWJ}`;
  expect(chunk(womenRunningZWJ, 2, { charLengthMask: 0 })).toEqual(
    chunk(womenRunningZWJ, 2, { charLengthMask: 5 })
  );

  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  const runners = runner + runner + runner;
  expect(chunk(runners, 2, { charLengthMask: 0 })).toEqual(
    chunk(runners, 2, { charLengthMask: 7 })
  );
});

it('should count default charLengthMask the same as charLengthMask value -1', () => {
  // each of these characters is two bytes
  const chineseText = '𤻪𬜬𬜯';
  expect(chunk(chineseText, 2)).toEqual(
    chunk(chineseText, 2, { charLengthMask: -1 })
  );
  expect(chunk(chineseText, 1)).toEqual(
    chunk(chineseText, 1, { charLengthMask: -1 })
  );

  // each of these characters is two bytes
  const camembert = '🧀🧀🧀🧀 🧀🧀🧀🧀';
  expect(chunk(camembert, 4)).toEqual(
    chunk(camembert, 4, { charLengthMask: -1 })
  );

  // The Woman Running emoji is a ZWJ sequence combining 🏃 Person Running, ‍ Zero Width Joiner and ♀ Female Sign.
  // each of these characters is five bytes
  const womanRunningZWJ = '🏃‍♀️';
  const womenRunningZWJ = `${
    womanRunningZWJ + womanRunningZWJ + womanRunningZWJ + womanRunningZWJ
  } ${womanRunningZWJ + womanRunningZWJ}`;
  expect(chunk(womenRunningZWJ, 2)).toEqual(
    chunk(womenRunningZWJ, 2, { charLengthMask: -1 })
  );

  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  const runners = runner + runner + runner;
  expect(chunk(runners, 2)).toEqual(chunk(runners, 2, { charLengthMask: -1 }));
});

it('should not cut combined characters', () => {
  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runner = '🏃🏽‍♀️';
  const runners = runner + runner + runner;
  expect(chunk(runners, 3)).toEqual([runners]);
  expect(chunk(runners, 1)).toEqual([runner, runner, runner]);

  // FLAG + RAINBOW
  const flag = '🏳️‍🌈';
  const flags = flag + flag;
  expect(chunk(flags, 1)).toEqual([flag, flag]);
});

it('allows alternate TextEncoder', () => {
  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  // 7 each as length, 17 each as TextEncoder
  // 21 as length, 51 as TextEncoder
  const runners = '🏃🏽‍♀️🏃🏽‍♀️🏃🏽‍♀️';

  expect(() => {
    chunk(runners, 14, { charLengthMask: 0, charLengthType: 'TextEncoder' });
  }).toThrow(
    new ReferenceError(
      "TextEncoder is not natively defined, new TextEncoder must be passed in with the 'chunkOptions.textEncoder' property."
    )
  );

  expect(
    chunk(runners, 51, {
      charLengthMask: 0,
      charLengthType: 'TextEncoder',
      textEncoder: new TextEncoder(),
    })
  ).toEqual(chunk(runners, 21, { charLengthMask: 0 }));

  // FLAG + RAINBOW
  // 2 each as length, 4 each as TextEncoder
  // 4 as length, 8 as TextEncoder
  // Node v14.5.0 does not provide TextEncoder natively.
  const flags = '🏳️‍🌈🏳️‍🌈';

  expect(
    chunk(flags, 4, {
      charLengthMask: 0,
      charLengthType: 'TextEncoder',
      textEncoder: new TextEncoder(),
    })
  ).toEqual(chunk(flags, 2, { charLengthMask: 0 }));

  expect(
    chunk(flags, 999, {
      charLengthMask: 0,
      charLengthType: 'TextEncoder',
      textEncoder: {
        encode: () => ({ length: 999 }),
      },
    })
  ).toEqual(chunk(flags, 2, { charLengthMask: 0 }));
});
