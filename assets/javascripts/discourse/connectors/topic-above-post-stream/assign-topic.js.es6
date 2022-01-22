import { withPluginApi } from 'discourse/lib/plugin-api';
import User from 'discourse/models/user';

function filterUsersWithApi(api, opts) {
  console.log('GOT IN FILTER ACTION');
  const { topic } = opts;
  // const users = api.container.lookup('controller:users')?.get('model') || {};
  // const userModel = api.container.lookup('models:users')

  // const fs = require('fs');
  // const usernames = JSON.parse(
  //   fs.readFileSync('../../../../usernames.json')
  // );

  var loc = window.location.pathname;
  var pwd = loc.substring(0, loc.lastIndexOf('/'));
  console.log('PWD', pwd);

  fetch("../../../../usernames.json")
    .then(response => {
       return response.json();
    })
    .then((usernames) => {
      console.log('USERNAMES IN FILTER', usernames);
      const matchingUsers = usernames?.filter((u) => {
        return u.toLowerCase()?.includes(topic.search_term?.toLowerCase());
      });
      const userSearchList = document.getElementById('user-search-list');
    
      userSearchList.innerHTML = matchingUsers.map((u) => {
        return `<div class='${u.toLowerCase()}'>${u}</div>`
      }).join('\n');
    
      for (const u in matchingUsers) {
        const userEl = userSearchList.getElementsByClassName(u.toLowerCase())[0];
      
        userEl.addEventListener("click", function() {
          topic.set('assigned_user', u);
          topic.set('is_assigned', true);
          topic.set('search_term', '')
          const event = new Event('change');  
          document.getElementById('user-search').dispatchEvent(event);
        });
      }
    });
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

      // setupComponent(attrs, component) {
      //   const model = attrs.model;
        
      //   let props = {
      //     fieldName: 'usernames',
      //     fieldValue: model.get('usernames')
      //   }
      //   component.setProperties(Object.assign(props, fieldInputTypes(fieldType)));
      // },

    }
};