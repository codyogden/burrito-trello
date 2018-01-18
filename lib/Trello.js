const Interface = require('./Interface');

class Trello extends Interface {
  tokens(idToken) {
    const methods = {
      info: () => this.get(`/tokens/${idToken}`),
      member: () => this.get(`/tokens/${idToken}/member`)
    };
    return methods;
  }

  boards(idBoard) {
    const methods = {
      actions: () => this.get(`/boards/${idBoard}/actions`),
      cards: (idCardOrFilter = false) =>
        this.get(`/boards/${idBoard}/cards${idCardOrFilter ? `/${idCardOrFilter}` : ''}`),
      info: (field = false) => this.get(`/boards/${idBoard}${field ? `/${field}` : ''}`),
      labels: () => this.get(`/boards/${idBoard}/labels`),
      lists: (filter = false) => this.get(`/boards/${idBoard}/lists${filter ? `/${filter}` : ''}`),
      members: () => this.get(`/boards/${idBoard}/members`),
      memberships: (params = {}) => this.get(`/boards/${idBoard}/memberships`, params)
    };
    return methods;
  }
  
  lists(idList) {
    const methods = {
      info: (field = false) => this.get(`/lists/${idList}${field ? `/${field}` : ''}`),
      actions: () => this.get(`/lists/${idList}/actions`),
      board: () => this.get(`/lists/${idList}/board`),
      cards: () => this.get(`/lists/${idList}/cards`)
    };
    return methods;
  }

  cards(idCard) {
    const methods = {
      actions: (params = {}) => this.get(`/cards/${idCard}/actions`, params),
      attachments: (idAttachment = false) =>
        this.get(`/cards/${idCard}/attachments${idAttachment ? `/${idAttachment}` : ''}`),
      board: () => this.get(`/cards/${idCard}/board`),
      info: (field = false) => this.get(`/cards/${idCard}${field ? `/${field}` : ''}`),
      list: () => this.get(`/cards/${idCard}/list`),
      members: () => this.get(`/cards/${idCard}/members`),
      comments: () => this.get(`/cards/${idCard}/actions`, { filter: 'commentCard' }),
      addComment: comment => this.post(`/cards/${idCard}/actions/comments`, { text: comment }),
      addMember: idMember => this.post(`/cards/${idCard}/idMembers`, { value: idMember }),
      removeMember: idMember => this.delete(`/cards/${idCard}/idMembers/${idMember}`)
    };
    return methods;
  }

  members(idMember) {
    const methods = {
      info: (params = {}) => this.get(`/members/${idMember}`, params),
      actions: () => this.get(`/members/${idMember}/actions`),
      boards: () => this.get(`/members/${idMember}/boards`),
      cards: () => this.get(`/members/${idMember}/cards`),
      notifications: () => this.get(`/members/${idMember}/notifications`),
      organizations: () => this.get(`/members/${idMember}/organizations`)
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
