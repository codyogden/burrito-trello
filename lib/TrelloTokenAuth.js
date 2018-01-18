const Interface = require('./Interface');

class TrelloTokenAuth extends Interface {
  getURL(config = false) {
    if (config) {
      config.key = this.trelloKey;
      config.callback_method = !config.callback_method ? 'fragment' : config.callback_method;
      if(!config.name)
        throw Error('TrelloAuthToken URL requires an application name.');
      if(!config.return_url)
        throw Error('TrelloAuthToken URL requires a return URL.');
      if(!config.expiration)
        throw Error('TrelloAuthToken URL requires an expiration.');
      if(config.scope === undefined || config.scope.length < 1)
        throw Error('TrelloAuthToken URL requires a scope setting.');
      return `https://trello.com/1/authorize${this.queryParams(config, false)}`;
    }
  }
}

module.exports = TrelloTokenAuth;