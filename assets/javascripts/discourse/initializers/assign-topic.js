import { withPluginApi } from "discourse/lib/plugin-api";
// import { ajax } from "discourse/lib/ajax";
// import User from 'discourse/models/user';


function initWithApi(api) {

  api.serializeOnCreate('usernames');
  api.serializeToDraft('usernames');
  api.serializeToTopic('usernames', 'topic.usernames');
  // if (!Discourse.SiteSettings.custom_directory_enabled) return;

  // const usersController = Discourse.__container__.lookup('controller:users');
  // User.reopen({
  //   findAll: function() {
  //     return ajax("/directory.json")
  //       .then((users) => {
  //         return users.map((u) => {
  //           console.log('USER FROM FIND ALL', User.create(u));
  //           return User.create(u);
  //       });
  //     });
  //   }
  // });

}

export default {
  name: "assign-topic",

  initialize() {
    console.log('INIT');

    // User.reopen({
    //   findAll: function() {
    //     return ajax("/directory.json")
    //       .then((users) => {
    //         return users.map((u) => {
    //           console.log('USER FROM FIND ALL', User.create(u));
    //           return User.create(u);
    //       });
    //     });
    //   }
    // });

    withPluginApi("0.8", initWithApi);
  }
};