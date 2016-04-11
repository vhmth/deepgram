# deepgram

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
  userId: '<user_id>'
});

deepgram.indexContent('http://website.com/audio.mp3').then(data => {
  // handle data.contentID
}).catch(err => {
  // handle error
});
```

## Development

The wrapper uses Babel. Check the scripts in `package.json`.

## API Documentation

http://api.lexika.io/doc

## License

MIT - check the license file.
