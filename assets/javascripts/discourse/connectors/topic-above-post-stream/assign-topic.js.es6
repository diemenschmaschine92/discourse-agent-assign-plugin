import { withPluginApi } from 'discourse/lib/plugin-api';
import User from 'discourse/models/user';

function filterUsersWithApi(api, opts) {
  console.log('GOT IN FILTER ACTION');
  const { topic } = opts;
  // const users = api.container.lookup('controller:users')?.get('model') || {};
  const users = User.findAll();
  console.log('USERS', users);
  console.log('TOPIC', topic);
  const matchingUsers = users?.content?.filter((c) => {
      return c.user?.username?.toLowerCase()?.includes(topic.search_term?.toLowerCase())
        || c.user?.name?.toLowerCase()?.includes(topic.search_term?.toLowerCase());
  });
  const userSearchList = document.getElementById('user-search-list');

  userSearchList.innerHTML = matchingUsers.map((u) => {
    return `<div class='${u.user?.username?.toLowerCase()}'>${u.user?.username}</div>`
  }).join('\n');

  for (const u in matchingUsers) {
    const userEl = userSearchList.getElementsByClassName(u.user?.username?.toLowerCase())[0];

    userEl.addEventListener("click", function() {
      topic.set('assigned_user', u.user?.username);
      topic.set('is_assigned', true);
      topic.set('search_term', '')
      const event = new Event('change');  
      document.getElementById('user-search').dispatchEvent(event);
    });
  }
}

export default {
    // users: Ember.inject.controller("users"),

    actions: {

      filterUsers(topic) {
        withPluginApi("0.8", filterUsersWithApi, { topic });
      },
      
      unassignUser(topic) {
        topic.set('assigned_user', undefined);
        topic.set('is_assigned', false);
      },

    }
};