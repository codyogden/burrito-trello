const axios = require('axios');

const request = axios.create({
  baseURL: 'https://api.trello.com/1'
});

/**
 * @typedef {Promise} APIResponse
 * @property {APISuccess} then Promise has resolved.
 * @property {APICatch} catch Catch any thrown errors.
 */

/**
 * @typedef {Function} APISuccess
 * If the response is okay, the ResponseData will be resolved through the Promise.
 * @param {(ResponseData)} results
 * Data from the Trello API.
 */

/**
 * @typedef {(string|object|array)} ResponseData
 * Data from the Trello API.
 */

/**
 * @typedef {Function} APICatch
 * @param {(RequestError)} error Trello reported an error, or there was a problem.
 */

/**
 * @class Interface
 * @name Interface
 * @classdesc HTTP Request interface with some Trello-specific helper methods.
 */
class Interface {
  constructor(settings) {
    this.trelloKey = settingsObj.trelloKey || null;
    this.trelloToken = settingsObj.trelloToken || null;
    /**
     * Interface Error Handler
     * @param {any} err Response with error.
     * @return {RequestError}
     */
    /**
     * @typedef {Object} RequestError
     * @property {number} status HTTP Status Code.
     * @property {(string|null)} statusText Text HTTP Status Text.
     * @property {(any|string|null)} data Trello API response.
     */
    this.error = err => ({
      error: {
        status: err.response.status,
        statusText: err.response.statusText,
        data: err.response.data
      }
    });
  }

  /**
   * Query Parameters Constructor
   * @param {any} params Object to be included as URL query parameters.
   * @return {string} URL query parameters as string.
   */
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

  /**
   * URL Constructor
   * @param {string} endpoint Trello API endpoing as string.
   * @param {any} params Object to be included as URL query parameters.
   */
  url(endpoint, params) {
    return `${endpoint}${this.queryParams(params)}`;
  }

  /**
   * Batch GET Request
   * @param {array} endpoints Array of valid Trello API endpoints.
   * @return {APIResponse}
   */
  batch(endpoints) {
    return this.get('/batch', { urls: endpoints.join(',') });
  }

  /**
   * GET Request Handler
   * @param {string} endpoint Trello API endpoing as string.
   * @param {any} params Object to be included as URL query parameters.
   * @return {APIResponse}
   */
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

  /**
   * POST Request Handler
   * @param {string} endpoint Trello API endpoing as string.
   * @param {any} params Object to be included as URL query parameters.
   * @param {any} dataObj Request body.
   * @return {APIResponse}
   */
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

  /**
   * PUT Request Handler
   * @param {string} endpoint Trello API endpoing as string.
   * @param {any} params Object to be included as URL query parameters.
   * @param {any} dataObj Request body.
   * @return {APIResponse}
   */
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

  /**
   * DELETE Request Handler
   * @param {string} endpoint Trello API endpoing as string.
   * @param {any} params Object to be included as URL query parameters.
   * @return {APIResponse}
   */
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
