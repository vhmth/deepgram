var http = require('http');

let DEEPGRAM_API_BASE_URI = 'http://api.deepgram.com';

function _isArray(obj) {
  return Object.prototype.toString.call(obj) !== '[object Array]';
}

export default class Deepgram {
  constructor(options) {
    options = options || {};

    this.userID = options.userID;

    this.api = new Frisbee({
      baseURI: '',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  _makeRequest(action, body, uri) {
    body        = body || {};
    body.userID = this.userID;
    body.action = action;

    return new Promise((resolve, reject) => {
      var req = http.request({
        hostname: uri || DEEPGRAM_API_BASE_URI,
        path:     '/',
        method:   'POST',
        headers:   {
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let resBody = '';
        res.setEncoding('utf8');
        res.on('data', (data) => {
          resBody += data;
        });
        res.on('end', () => {
          resBody = JSON.parse(resBody);
          if (resBody.error != null) {
            reject(resBody);
          } else {
            resolve(resBody);
          }
        });
      });

      req.on('error', reject);
      req.write(JSON.stringify(body));
      req.end();
    });
  }

  // pass in an array or a string
  index(dataURIs) {
    let action;
    if (_isArray(dataURIs)) {
      action = 'index_content_list';
    } else {
      action = 'index_content';
    }
    return _makeRequest(action, {
      data_url: dataURI
    });
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      return _makeRequest('get_balance').then(({ balance }) => {
        resolve(balance);
      }).catch(reject);
    });
  }

  getObjectStatus(contentID) {
    return _makeRequest('get_object_status', {
      contentID: contentID
    });
  }

  query(contentID, queryOptions) {
    queryOptions = queryOptions || {};
    queryOptions.contentID = contentID
    return _makeRequest('object_search', queryOptions);
  }

  groupSearch(queryOptions) {
    return _makeRequest('group_search',
      queryOptions,
      'http://groupsearch.api.deepgram.com'
    );
  }

  parallelSearch(queryOptions) {
    return _makeRequest('parallel_search',
      queryOptions,
      'http://groupsearch.api.deepgram.com'
    );
  }

  tag(contentID, tag) {
    return _makeRequest('tag_object', {
      contentID: contentID,
      tag:       tag
    });
  }

  getTags(contentID) {
    return _makeRequest('get_object_tags', {
      contentID: contentID
    });
  }
}
