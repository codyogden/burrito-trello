const axios = require('axios');

const request = axios.create({
  baseURL: 'https://api.trello.com/1'
});

class Interface {
  constructor(settings) {
    this.trelloKey = settingsObj.trelloKey || null;
    this.trelloToken = settingsObj.trelloToken || null;
    this.error = err => ({
      error: {
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data
      }
    });
  }

  queryParams(params) {
    const data = params !== undefined ? params : {};
    data.key = !data.key ? this.trelloKey : data.key;
    data.token = !data.token ? this.trelloToken : data.token;
    if (!data.key) throw Error('Developer key must be set on each request (via parameters) or set upon construction.');
    if (!data.token)
      throw Error('Authorization token must be set on each request (via parameters) or set upon construction.');
    return `?${Object.keys(data)
      .map(key => [key, data[key]].map(encodeURIComponent).join('='))
      .join('&')}`;
  }

  url(endpoint, params) {
    return `${endpoint}${this.queryParams(params)}`;
  }

  batch(endpoints) {
    return this.get('/batch', { urls: endpoints.join(',') });
  }

  get(endpoint, params) {
    return new Promise((resolve, reject) => {
      request
        .get(this.url(endpoint, params))
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(this.error(error)));
    });
  }

  post(endpoint, params, dataObj = {}) {
    return new Promise((resolve, reject) => {
      request
        .post(this.url(endpoint, params), dataObj)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(this.error(error)));
    });
  }

  put(endpoint, params, dataObj = {}) {
    return new Promise((resolve, reject) => {
      request
        .put(this.url(endpoint, params), dataObj)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(this.error(error)));
    });
  }

  delete(endpoint, params) {
    return new Promise((resolve, reject) => {
      request
        .delete(this.url(endpoint, params))
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(this.error(error)));
    });
  }
}

module.exports = Interface;
