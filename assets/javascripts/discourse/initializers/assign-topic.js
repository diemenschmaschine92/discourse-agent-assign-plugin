import { withPluginApi } from "discourse/lib/plugin-api";
import { ajax } from "discourse/lib/ajax";
import { ID_CONSTRAINT } from "discourse/models/topic";

function initWithApi(api) {
  console.log('INIT');
  // if (!Discourse.SiteSettings.custom_directory_enabled) return;

  // const usersController = Discourse.__container__.lookup('controller:users');

  api.modifyClass("route:topic", {

    model(params, transition) {
      return ajax("/u?order=likes_received")
        .then((response) => {
          console.log('SUCCESSFUL LOAD');
          if (params.slug.match(ID_CONSTRAINT)) {
            transition.abort();
      
            DiscourseURL.routeTo(`/t/topic/${params.slug}/${params.id}`, {
              replaceURL: true,
            });
      
            return;
          }
      
          const queryParams = transition.to.queryParams;
      
          let topic = this.modelFor("topic");
          if (topic && topic.get("id") === parseInt(params.id, 10)) {
            this.setupParams(topic, queryParams);
            return topic;
          } else {
            let props = Object.assign({}, params);
            delete props.username_filters;
            delete props.filter;
            topic = this.store.createRecord("topic", props);
            return this.setupParams(topic, queryParams);
          }
        })
        .catch((err) => {
          if (params.slug.match(ID_CONSTRAINT)) {
            transition.abort();
      
            DiscourseURL.routeTo(`/t/topic/${params.slug}/${params.id}`, {
              replaceURL: true,
            });
      
            return;
          }
      
          const queryParams = transition.to.queryParams;
      
          let topic = this.modelFor("topic");
          if (topic && topic.get("id") === parseInt(params.id, 10)) {
            this.setupParams(topic, queryParams);
            return topic;
          } else {
            let props = Object.assign({}, params);
            delete props.username_filters;
            delete props.filter;
            topic = this.store.createRecord("topic", props);
            return this.setupParams(topic, queryParams);
          }
        })
    },
  });
}

export default {
  name: "assign-topic",

  initialize() {
    withPluginApi("0.8", initWithApi);
  }
};