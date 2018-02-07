const Interface = require('./Interface');

class TrelloTokenAuth extends Interface {
  getURL(config = false) {
    if (config) {
      const settings = config;
      settings.key = this.trelloKey;
      settings.callback_method = !settings.callback_method ? 'fragment' : settings.callback_method;
      if(!settings.name)
        throw Error('TrelloAuthToken URL requires an application name.');
      if(!settings.return_url)
        throw Error('TrelloAuthToken URL requires a return URL.');
      if(!settings.expiration)
        throw Error('TrelloAuthToken URL requires an expiration.');
      if(settings.scope === undefined || settings.scope.length < 1)
        throw Error('TrelloAuthToken URL requires a scope setting.');
      return `https://trello.com/1/authorize${this.queryParams(settings, false)}`;
    }
    return config;
  }
}

module.exports = TrelloTokenAuth;