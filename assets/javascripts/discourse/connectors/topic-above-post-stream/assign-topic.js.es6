import { withPluginApi } from 'discourse/lib/plugin-api';
import User from 'discourse/models/user';

function filterUsersWithApi(api, opts) {
  
}

export default {

  setupComponent(args, component) {
    fetch('http://localhost/usernames.json')
        .then((response) => {
          return response.json();
        })
        .then((usernames) => {
          component.set('usernames', usernames);
        })
        .catch(err => console.error('Error loading usernames', err));
  },

  actions: {
    filterUsers(topic, usernames, event) {
      // console.log('USERNAMES IN HANDLER', usernames);
      // console.log('TOPIC', topic);
      // console.log('EVENT', event);    
      const matchingUsers = usernames.filter((u) => {
          return u.username?.toLowerCase()?.includes(event.target.value?.toLowerCase());
      });
    
      const userSearchList = document.getElementById('user-search-list');
      userSearchList.innerHTML = '';

      matchingUsers.forEach((u, i) => {
        const userEl = document.createElement('div');
        userEl.setAttribute('id', `username-${i}`);
        userEl.className = 'user-result';
        userEl.innerText = u.username;
        userEl.onclick = function() {
          topic.set('assigned_user', u.username);
          topic.set('is_assigned', true);
          topic.set('search_term', '');
          const event = new Event('change');
          document.getElementById('user-search').dispatchEvent(event);
        };
        userSearchList.appendChild(userEl);
      });

      // console.log('USER SEARCH LIST HTML', newUserSearchList);
    },
    
    unassignUser(topic) {
      topic.set('assigned_user', undefined);
      topic.set('is_assigned', false);
    },
  }
};