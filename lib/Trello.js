const Interface = require('./Interface');

/**
 * @class Trello
 */
class Trello extends Interface {
  /**
   * Tokens Handler
   * @param {string} idToken Required. Trello API Token
   * @return {tokens}
   */
  tokens(idToken) {
    /** @namespace tokens */
    const methods = {
      /**
       * @memberof tokens
       * @method info
       * -- Retrieves information about the token.
       * @return {Promise}
       */
      info: () => this.get(`/tokens/${idToken}`),

      /**
       * @memberof tokens
       * @method member
       * -- Retrieves member model of token's owner.
       * @return {Promise}
       */
      member: () => this.get(`/tokens/${idToken}/member`)
    };

    return methods;
  }

  /**
   * Boards Routes
   * @param {string} idBoard Board ID.
   * @return {boards}
   */
  boards(idBoard) {
    /** @namespace boards */
    const methods = {
      /**
       * @memberof boards
       * @method actions
       * @name actions
       * -- Retrieves a board's actions.
       * @return {Promise}
       */
      actions: () => this.get(`/boards/${idBoard}/actions`),

      /**
       * @memberof boards
       * @method cards
       * -- Retrieves all cards on the board.
       * @param {string} [idCardOrFilter = false]
       * -- Card ID or filter: all, closed, none, open, visible.
       * @return {Promise}
       */
      cards: (idCardOrFilter = false) =>
        this.get(`/boards/${idBoard}/cards${idCardOrFilter ? `/${idCardOrFilter}` : ''}`),

      /**
       * @memberof boards
       * @method info
       * -- Retrieves the board information.
       * @param {string} [field = false]
       * -- Choose a specific field.
       * @return {Promise}
       */
      info: (field = false) => this.get(`/boards/${idBoard}${field ? `/${field}` : ''}`),

      /**
       * @memberof boards
       * @method labels
       * -- Retrieves board's labels.
       * @return {Promise}
       */
      labels: () => this.get(`/boards/${idBoard}/labels`),

      /**
       * @memberof boards
       * @method lists
       * -- Retrieves board's lists.
       * @param {string} [filter = false]
       * -- One of `all`, `closed`, `none`, `open`.
       * @return {Promise}
       */
      lists: (filter = false) => this.get(`/boards/${idBoard}/lists${filter ? `/${filter}` : ''}`),

      /**
       * @memberof boards
       * @method members
       * -- Retrieves board's members.
       * @return {Promise}
       */
      members: () => this.get(`/boards/${idBoard}/members`),

      /**
       * @memberof boards
       * @method memberships
       * -- Retrieve's a board's membership information.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      memberships: (params = {}) => this.get(`/boards/${idBoard}/memberships`, params)
    };
    return methods;
  }

  /**
   * Lists
   * @param {string} idList Required. List ID.
   * @return {lists}
   */
  lists(idList) {
    /** @namespace lists */
    const methods = {
      /**
       * @memberof lists
       * @method info
       * @name List Information
       * -- Retrieves a list's information
       * @param {string} [field = false]
       * -- Retrieve a single field.
       * @return {Promise}
       */
      info: (field = false) => this.get(`/lists/${idList}${field ? `/${field}` : ''}`),

      /**
       * @memberof lists
       * @method actions
       * @name Actions
       * -- Retrieve list's actions.
       * @return {Promise}
       */
      actions: () => this.get(`/lists/${idList}/actions`),

      /**
       * @memberof lists
       * @method boards
       * @name Board Information
       * -- Retrieve list's board information.
       * @return {Promise}
       */
      board: () => this.get(`/lists/${idList}/board`),

      /**
       * @memberof lists
       * @method cards
       * @name Cards
       * -- Retrieve all cards in the list.
       * @return {Promise}
       */
      cards: () => this.get(`/lists/${idList}/cards`)
    };

    return methods;
  }

  /**
   * Cards
   * @param {string} idCard
   * @return {cards}
   */
  cards(idCard) {
    /** @namespace cards */
    const methods = {
      /**
       * @memberof cards
       * @method actions
       * @name Actions
       * -- Retrieves card's actions.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * -- URL query parameters as string.
       * @return {Promise}
       */
      actions: (params = {}) => this.get(`/cards/${idCard}/actions`, params),

      /**
       * @memberof cards
       * @method attachments
       * @name Attachments
       * -- Retrieves attachment information.
       * @param {string} [idAttachment = false]
       * -- Attachment ID
       * @return {Promise}
       */
      attachments: (idAttachment = false) =>
        this.get(`/cards/${idCard}/attachments${idAttachment ? `/${idAttachment}` : ''}`),

      /**
       * @memberof cards
       * @method board
       * @name Board Information
       * -- Retrieves the card's board information.
       * @return {Promise}
       */
      board: () => this.get(`/cards/${idCard}/board`),

      /**
       * @memberof cards
       * @method info
       * @name Card Information
       * -- Retrieves card information.
       * @param {string} [field = false]
       * -- Retrieve a single field value.
       * @return {Promise}
       */
      info: (field = false) => this.get(`/cards/${idCard}${field ? `/${field}` : ''}`),

      /**
       * @memberof cards
       * @method info
       * @name List Information
       * -- Retrieves card's list information.
       * @return {Promise}
       */
      list: () => this.get(`/cards/${idCard}/list`),
      /**
       * @memberof cards
       * @method members
       * @name Member Information
       * -- Retrieves mebmers assigned to the card.
       * @return {Promise}
       */
      members: () => this.get(`/cards/${idCard}/members`),

      /**
       * @memberof cards
       * @method comments
       * @name Comments
       * -- Retrieve card's comments.
       * @return {Promise}
       */
      comments: () => this.get(`/cards/${idCard}/actions`, { filter: 'commentCard' }),
      /**
       * @memberof cards
       * @method addComment
       * @name Add Comment
       * -- Add a comment to a card.
       * @param {string} comment
       * -- The comment string.
       * @return {Promise}
       */
      addComment: comment => this.post(`/cards/${idCard}/actions/comments`, { text: comment }),
      /**
       * @memberof cards
       * @method addMember
       * @name Add Member
       * -- Add a member to a card.
       * @param {string} idMember
       * -- A member's ID
       * @return {Promise}
       */
      addMember: idMember => this.post(`/cards/${idCard}/idMembers`, { value: idMember }),
      /**
       * @memberof cards
       * @method removeMember
       * @name Remove Member
       * -- Remvoe a member from the card.
       * @param {string} idMember
       * -- A member's ID
       * @return {Promise}
       */
      removeMember: idMember => this.delete(`/cards/${idCard}/idMembers/${idMember}`)
    };
    return methods;
  }

  /**
   * Members
   * @param {string} idMember Member ID
   * @return {members}
   */
  members(idMember) {
    /** @namespace members */
    return {
      /**
       * @memberof members
       * @method info
       * @name Member Information
       * -- Retrieve a member's information.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      info: (params = {}) => this.get(`/members/${idMember}`, params),

      /**
       * @memberof members
       * @method actions
       * @name Member Actions
       * -- Retrieve member's actions.
       * @return {Promise}
       */
      actions: () => this.get(`/members/${idMember}/actions`),

      /**
       * @memberof members
       * @method boards
       * @name Member Boards
       * -- Retrieve member's boards.
       * @return {Promise}
       */
      boards: () => this.get(`/members/${idMember}/boards`),

      /**
       * @memberof members
       * @method cards
       * @name Member Cards
       * -- Retrieve member's cards.
       * @return {Promise}
       */
      cards: () => this.get(`/members/${idMember}/cards`),

      /**
       * @memberof members
       * @method notifications
       * @name Member Notifications
       * -- Retrieve member's notifications.
       * @return {Promise}
       */
      notifications: () => this.get(`/members/${idMember}/notifications`),

      /**
       * @memberof members
       * @method organizations
       * @name Member Organizations
       * -- Retrieve member's organizations.
       * @return {Promise}
       */
      organizations: () => this.get(`/members/${idMember}/organizations`)
    };
  }

  /**
   * Notifications
   * @param {string} [idNotification = ''] Notification ID.
   * @return {notifications}
   */
  notifications(idNotification = '') {
    /** @namespace notifications */
    const methods = {
      /**
       * @memberof notifications
       * @method info
       * @name Notification Information
       * -- Retrieve notification's actions.
       * @param {string} [field = false]
       * Retrieve only a certain field.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      info: (field = false, params = {}) =>
        this.get(`/notifications/${idNotification}${field ? `/${field}` : ''}`, params),

      /**
       * @memberof notifications
       * @method board
       * @name Board Information
       * -- Retrieve notification's board.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      board: (params = {}) => this.get(`/notifications/${idNotification}/board`, params),

      /**
       * @memberof notifications
       * @method list
       * @name List Information
       * -- Retrieve notification's list.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      list: (params = {}) => this.get(`/notifications/${idNotification}/list`, params),

      /**
       * @memberof notifications
       * @method member
       * @name Member Information
       * -- Retrieve notification's member.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      member: (params = {}) => this.get(`/notifications/${idNotification}/member`, params),

      /**
       * @memberof notifications
       * @method memberCreator
       * @name MemberCreator Information
       * -- Retrieve notification's memberCreator.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      memberCreator: (params = {}) => this.get(`/notifications/${idNotification}/memberCreator`, params),

      /**
       * @memberof notifications
       * @method organization
       * @name Organization Information
       * -- Retrieve notification's organization.
       * @param {any} [params = {}] Object to be included as URL query parameters.
       * @return {Promise}
       */
      organization: (params = {}) => this.get(`/notifications/${idNotification}/organization`, params),

      /**
       * @memberof notifications
       * @method markAllAsRead
       * @name Mark All Notifications Read
       * -- Mark all Trello notifications as read.
       * @return {Promise}
       */
      markAllAsRead: () => this.post(`/notifications/all/read`),

      /**
       * @memberof notifications
       * @method markAsRead
       * @name Mark Notification as Read
       * -- Mark single Trello notifications as read.
       * @return {Promise}
       */
      markAsRead: () => this.put(`/notifications/${idNotification}`, { unread: false }),

      /**
       * @memberof notifications
       * @method markAsUnread
       * @name Mark a notification as not read.
       * -- Mark all Trello notifications as unread.
       * @return {Promise}
       */
      markAsUnread: () => this.put(`/notifications/${idNotification}`, { unread: true })
    };
    return methods;
  }

  /**
   * Trello Search
   * @param {*} query Globally searched string or Object with query parameters defined in Trello docs.
   * @return {Promise}
   */
  search(queryInput) {
    let query = queryInput;
    if (typeof query === 'string') {
      query = {
        query
      };
    }
    return this.get(`/search`, query);
  }

  /**
   * Search Members
   * @param {*} query
   * @return {Promise}
   */
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
