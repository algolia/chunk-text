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

it('should return an array strings.', () => {
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
