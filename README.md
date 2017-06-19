Chunk text
===

> chunk/split a string by length without cutting/truncating words.


``` javascript
var out = chunk('hello world how are you?', 7);
/* ['hello', 'world', 'how are', 'you?'] */
```


## Installation

``` bash
$ npm install chunk-text
# yarn add chunk-text
```


## Usage

``` javascript
var chunk = require('chunk-text');
```

#### chunk(text, chunkSize);

Chunks the `text` string into an array of strings that each have a maximum length of `chunkSize`.

``` javascript
var out = chunk('hello world how are you?', 7);
/* ['hello', 'world', 'how are', 'you?'] */
```

If no space is detected before `chunkSize` is reached, then it will truncate the word to always
ensure the resulting text chunks have at maximum a length of `chunkSize`.

``` javascript
var out = chunk('hello world', 4);
/* ['hell', 'o', 'worl', 'd'] */
```

## Usage in Algolia context

This library was created by [Algolia](https://www.algolia.com/) to ease
the optimizing of record payload sizes resulting in faster search responses from the API.

In general, there is always a unique large "content attribute" per record,
and this packages will allow to chunk that content into small chunks of text.

The text chunks can then be [distributed over multiple records](https://www.algolia.com/doc/faq/basics/how-do-i-reduce-the-size-of-my-records/#faq-section).

Here is an example of how to split an existing record into several ones:

``` javascript

var chunk = require('chunk-text');
var record = {
  post_id: 100,
  content: 'A large chunk of text here'
};

var chunks = chunk(record.content, 600); // Limit the chunk size to a length of 600.
var records = [];
chunks.forEach(function(content) {
  records.push(Object.assign({}, record, {content: content}));
});

```
