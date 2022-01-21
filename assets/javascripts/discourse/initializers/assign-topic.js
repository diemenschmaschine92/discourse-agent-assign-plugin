import { withPluginApi } from "discourse/lib/plugin-api";

function initWithApi(api) {
  // if (!Discourse.SiteSettings.custom_directory_enabled) return;

  // const usersModel = api.container.lookup("controller:users")?.get('model') || {};
  // console.log('USERS', usersModel);
  // console.log('USERS MODEL', usersModel?.model);

  const defaultSearchTerm = '';

  api.modifyClass("controller:topic", {
    searchTerm: defaultSearchTerm,
    users: Ember.inject.controller("users"),

    actions: {

      filterUsers(topic) {
        const matchingUsers = this.users?.filter((user) => {
            return user.username?.toLowerCase()?.includes(topic.custom_fields.search_term.toLowerCase());
        });
        const userSearchList = document.getElementById('user-search-list');

        userSearchList.innerHTML = matchingUsers.map((u) => {
          return `<div class='${u.username.toLowerCase()}'>${u.username}</div>`
        }).join('\n');

        for (u in matchingUsers) {
          const userEl = userSearchList.getElementsByClassName(u.username.toLowerCase())[0];

          userEl.addEventListener("click", function() {
            topic.set('custom_fields.assigned_user', u.username);
            topic.set('custom_fields.is_assigned', true);
            topic.set('custom_fields.search_term', '')
            const event = new Event('change');  
            document.getElementById('user-search').dispatchEvent(event);
          });
        }
      },
      
      unassignUser(topic) {
        topic.set('custom.fields.assigned_user', undefined);
        topic.set('custom_fields.is_assigned', false);
      },

    }
  });
}

export default {
  name: "assign-topic",

  initialize() {
    withPluginApi("0.8", initWithApi);
  }
};