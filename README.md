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
var chunk = require( 'chunk-text' );
```

#### chunk( text, chunkSize );

Chunks the `text` string into an array of strings that have a each a maximum length of `chunkSize`.


``` javascript
var out = chunk('hello world how are you?', 7);
/* ['hello', 'world', 'how are', 'you?'] */
```
