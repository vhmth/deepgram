# Deprecated

Please use [@deepgram/sdk](https://www.npmjs.com/package/@deepgram/sdk) for the official and maintained Node SDK for Deepgram AI.

# deepgram

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![MIT License][license-image]][license-url]

NPM module that binds to the Deepgram audio search/transcription API.

https://www.deepgram.com

## Usage

Install:

```
npm install --save deepgram
```

Indexing a file:

```
import Deepgram from 'node-deepgram';

let deepgram = new Deepgram({
  userID: '<user_id>'
});

deepgram.index('http://website.com/audio.mp3').then(contentID => {
  // do what you will with contentID
}).catch(err => {
  // handle error
});
```

## Development

The wrapper uses Babel. Check the scripts in `package.json`.

## API Documentation

http://api.lexika.io/doc

## License

[MIT][license-url]

[npm-image]: http://img.shields.io/npm/v/node-deepgram.svg?style=flat
[npm-url]: https://npmjs.org/package/node-deepgram
[npm-downloads]: http://img.shields.io/npm/dm/node-deepgram.svg?style=flat
[license-url]: LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
