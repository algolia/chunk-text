import chunk from '../index';

it('should throw an error if no text is provided or invalid type.', () => {
  expect(() => {
    chunk();
  }).toThrow(
    new TypeError('Text should be provided as first argument and be a string.')
  );
});

it('should throw an error if no size is provided or invalid type.', () => {
  expect(() => {
    chunk('hello world');
  }).toThrow(
    new TypeError(
      'Size should be provided as 2nd argument and be a number greater than zero.'
    )
  );
  expect(() => {
    chunk('hello world', 0);
  }).toThrow(
    new TypeError(
      'Size should be provided as 2nd argument and be a number greater than zero.'
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

it('should count double width characters as single characters', () => {
  // each of these characters is two bytes
  const chineseText = '𤻪𬜬𬜯';
  const camembert = '🧀🧀🧀🧀 🧀🧀🧀🧀';

  expect(chunk(chineseText, 2)).toEqual(['𤻪𬜬', '𬜯']);
  expect(chunk(chineseText, 1)).toEqual(['𤻪', '𬜬', '𬜯']);
  expect(chunk(camembert, 4)).toEqual(['🧀🧀🧀🧀', '🧀🧀🧀🧀']);
});

// this test does not pass yet
it('should not cut combined characters', () => {
  // one woman runner emoji with a colour is seven bytes, or five characters
  // RUNNER(2) + COLOUR(2) + ZJW + GENDER + VS15
  const runners = '🏃🏽‍♀️🏃🏽‍♀️🏃🏽‍♀️';
  // FLAG + RAINBOW
  const flags = '🏳️‍🌈🏳️‍🌈';

  expect(chunk(runners, 3)).toEqual(['🏃🏽‍♀️🏃🏽‍♀️🏃🏽‍♀️']);
  expect(chunk(runners, 1)).toEqual(['🏃🏽‍♀️', '🏃🏽‍♀️', '🏃🏽‍♀️']);
  expect(chunk(flags, 1)).toEqual(['🏳️‍🌈', '🏳️‍🌈']);
});
