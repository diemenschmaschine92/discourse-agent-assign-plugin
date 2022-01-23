import { withPluginApi } from 'discourse/lib/plugin-api';
import User from 'discourse/models/user';

function filterUsersWithApi(api, opts) {
  console.log('GOT IN FILTER ACTION');
  const { topic } = opts;

  // const users = api.container.lookup('controller:users')?.get('model') || {};
  // const userModel = api.container.lookup('models:users')

  // const { usernames } = topic;

  fetch('http://localhost/usernames.json')
    .then((response) => {
      return response.json();
    })
    .then((usernames) => {
      console.log('USERNAMES FROM JSON', usernames);
      console.log('TOPIC', topic);
      const matchingUsernames = usernames.filter((u) => {
          return u.toLowerCase()?.includes(topic.search_term?.toLowerCase());
      });
      const userSearchList = document.getElementById('user-search-list');
    
      userSearchList.innerHTML = matchingUsernames
        .map((u) => {
          return `<div class='${u.toLowerCase()}'>${u}</div>`
        })
        .join('\n');

      console.log('MATCHING USERS', matchingUsernames);
      console.log('USER SEARCH LIST HTML', userSearchList);
    
      for (const u in matchingUsernames) {
        const userEl = userSearchList.getElementsByClassName(u.toLowerCase())[0];

        console.log('USER EL', userEl);
      
        userEl.addEventListener("click", function() {
          topic.set('assigned_user', u);
          topic.set('is_assigned', true);
          topic.set('search_term', '')
          const event = new Event('change');  
          document.getElementById('user-search').dispatchEvent(event);
        });
      }
    })
    .catch(err => console.error('Error loading usernames', err));
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