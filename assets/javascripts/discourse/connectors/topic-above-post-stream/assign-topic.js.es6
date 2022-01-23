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
      const matchingUsers = usernames.filter((u) => {
          return u.username?.toLowerCase()?.includes(topic.search_term?.toLowerCase());
      });
      const userSearchList = document.getElementById('user-search-list');
    
      // userSearchList.innerHTML = matchingUsers
      //   .map((u) => {
      //     return `<div class='${u.username?.toLowerCase()}'>${u.username}</div>`
      //   })
      //   .join('\n');

      // const userSearchResults = matchingUsers
      //   .map((u) => {
      //     return `<div class="${u.username?.toLowerCase()}">${u.username}</div>`;
      //   })
      //   .join('');

      matchingUsers.forEach((u, i) => {
        const userEl = document.createElement('div');
        userEl.setAttribute('id', `username-${i}`);
        userEl.onclick = function() {
          topic.set('assigned_user', u.username);
          topic.set('is_assigned', true);
          topic.set('search_term', '');
          const event = new Event('change');
          document.getElementById('user-search').dispatchEvent(event);
        }
        userSearchList.appendChild(userEl);
      });

      // console.log('MATCHING USERS', matchingUsers);
      console.log('USER SEARCH LIST HTML', userSearchList);
    
      // for (const u in matchingUsers) {
      //   // const userEl = userSearchList.getElementsByClassName(u.username?.toLowerCase())[0];
      //   userEl
      //   console.log('USER EL', userEl);
      
      //   userEl.addEventListener("click", function() {
      //     topic.set('assigned_user', u.username);
      //     topic.set('is_assigned', true);
      //     topic.set('search_term', '')
      //     const event = new Event('change');  
      //     document.getElementById('user-search').dispatchEvent(event);
      //   });
      // }
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