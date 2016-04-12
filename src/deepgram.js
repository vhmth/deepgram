var http = require('http');

let DEEPGRAM_API_BASE_URI = 'api.deepgram.com';

function _isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

module.exports = class Deepgram {
  constructor(options) {
    options = options || {};
    this.userID = options.userID;
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

  // pass in an array or a string for dataURIs
  // pass in an optional array of tags
  index(dataURIs, tags) {
    let requestBody = {
      data_url: dataURIs
    };

    if (_isArray(dataURIs)) {
      requestBody.action = 'index_content_list';
    } else {
      requestBody.action = 'index_content';
    }

    tags = tags || [];
    if (tags.length > 0) {
      requestBody.tags = tags;
    }

    return new Promise((resolve, reject) => {
      this._makeRequest(action, requestBody).then(resp => {
        resolve(resp.contentID);
      }).catch(reject);
    });
  }

  getBalance() {
    return new Promise((resolve, reject) => {
      return this._makeRequest('get_balance').then(({ balance }) => {
        resolve(balance);
      }).catch(reject);
    });
  }

  getObjectStatus(contentID) {
    return new Promise((resolve, reject) => {
      this._makeRequest('get_object_status', {
        contentID: contentID
      }).then(resp => {
        resolve(resp.status);
      }).catch(reject);
    });
  }

  query(contentID, queryOptions) {
    queryOptions = queryOptions || {};
    queryOptions.contentID = contentID
    return this._makeRequest('object_search', queryOptions);
  }

  groupSearch(queryOptions) {
    return this._makeRequest('group_search',
      queryOptions,
      'groupsearch.api.deepgram.com'
    );
  }

  parallelSearch(queryOptions) {
    return this._makeRequest('parallel_search',
      queryOptions,
      'groupsearch.api.deepgram.com'
    );
  }

  tag(contentID, tag) {
    return this._makeRequest('tag_object', {
      contentID: contentID,
      tag:       tag
    });
  }

  getTags(contentID) {
    return new Promise((resolve, reject) => {
      this._makeRequest('get_object_tags', {
        contentID: contentID
      }).then(resp => {
        resolve(resp.tags);
      }).catch(reject);
    });
  }
};
