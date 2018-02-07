const Interface = require('./Interface');

class Trello extends Interface {

  tokens(idToken) {
    const methods = {
      info: (params = {}) => this.get(`/tokens/${idToken}`, params),
      member: (params = {}) => this.get(`/tokens/${idToken}/member`, params)
    };
    return methods;
  }

  boards(idBoard) {
    const methods = {
      actions: () => this.get(`/boards/${idBoard}/actions`),
      cards: (idCardOrFilter = false) =>
        this.get(`/boards/${idBoard}/cards${idCardOrFilter ? `/${idCardOrFilter}` : ''}`),
      info: (field = false, params = {}) => this.get(`/boards/${idBoard}${field ? `/${field}` : ''}`, params),
      labels: (params = {}) => this.get(`/boards/${idBoard}/labels`, params),
      lists: (filter = false, params = {}) => this.get(`/boards/${idBoard}/lists${filter ? `/${filter}` : ''}`, params),
      members: (params = {}) => this.get(`/boards/${idBoard}/members`, params),
      memberships: (params = {}) => this.get(`/boards/${idBoard}/memberships`, params)
    };
    return methods;
  }
  
  lists(idList) {
    const methods = {
      info: (field = false, params = {}) => this.get(`/lists/${idList}${field ? `/${field}` : ''}`, params),
      actions: () => this.get(`/lists/${idList}/actions`),
      board: (params = {}) => this.get(`/lists/${idList}/board`, params),
      cards: () => this.get(`/lists/${idList}/cards`)
    };
    return methods;
  }

  cards(idCard) {
    const methods = {
      actions: (params = {}) => this.get(`/cards/${idCard}/actions`, params),
      attachments: (idAttachment = false, params = {}) =>
        this.get(`/cards/${idCard}/attachments${idAttachment ? `/${idAttachment}` : ''}`, params),
      board: (params) => this.get(`/cards/${idCard}/board`, params),
      info: (field = false, params = {}) => this.get(`/cards/${idCard}${field ? `/${field}` : ''}`, params),
      list: (params = {}) => this.get(`/cards/${idCard}/list`, params),
      members: (params = {}) => this.get(`/cards/${idCard}/members`, params),
      comments: () => this.get(`/cards/${idCard}/actions`, { filter: 'commentCard' }),
      addComment: comment => this.post(`/cards/${idCard}/actions/comments`, { text: comment }),
      removeComment: idAction => this.delete(`/cards/${idCard}/actions/${idAction}/comments`),
      addMember: idMember => this.post(`/cards/${idCard}/idMembers`, { value: idMember }),
      removeMember: idMember => this.delete(`/cards/${idCard}/idMembers/${idMember}`)
    };
    return methods;
  }

  members(idMember) {
    const methods = {
      info: (params = {}) => this.get(`/members/${idMember}`, params),
      actions: () => this.get(`/members/${idMember}/actions`),
      boards: (params = {}) => this.get(`/members/${idMember}/boards`, params),
      cards: (params = {}) => this.get(`/members/${idMember}/cards`, params),
      notifications: (params = {}) => this.get(`/members/${idMember}/notifications`, params),
      organizations: (params = {}) => this.get(`/members/${idMember}/organizations`, params)
    };
    return methods;
  }

  notifications(idNotification = '') {
    const methods = {
      info: (field = false, params = {}) =>
        this.get(`/notifications/${idNotification}${field ? `/${field}` : ''}`, params),
      board: (params = {}) => this.get(`/notifications/${idNotification}/board`, params),
      list: (params = {}) => this.get(`/notifications/${idNotification}/list`, params),
      member: (params = {}) => this.get(`/notifications/${idNotification}/member`, params),
      memberCreator: (params = {}) => this.get(`/notifications/${idNotification}/memberCreator`, params),
      organization: (params = {}) => this.get(`/notifications/${idNotification}/organization`, params),
      markAllAsRead: () => this.post(`/notifications/all/read`),
      markAsRead: () => this.put(`/notifications/${idNotification}`, { unread: false }),
      markAsUnread: () => this.put(`/notifications/${idNotification}`, { unread: true })
    };
    return methods;
  }

  search(queryInput) {
    let query = queryInput;
    if (typeof query === 'string') {
      query = {
        query
      };
    }
    return this.get(`/search`, query);
  }

  searchMembers(queryInput) {
    let query = queryInput;
    if (typeof query === 'string') {
      query = {
        query
      };
    }
    return this.get(`/search/members`, query);
  }
}

module.exports = Trello;
