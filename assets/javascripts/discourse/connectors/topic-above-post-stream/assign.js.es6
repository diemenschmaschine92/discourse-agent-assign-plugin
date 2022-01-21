import { popupAjaxError } from 'discourse/lib/ajax-error';
import Topic from 'discourse/models/topic';
import { withPluginApi } from 'discourse/lib/plugin-api';
import { ajax } from 'discourse/lib/ajax';

export default {
    // filterUsersWithApi(api, opts) {
    //     const { searchTerm = '' } = opts || {};
    //     const usersModel = api.container.lookup("controller:users-controller").get('model');
    //     console.log('USERS MODEL', usersModel);
    //     const matchingUsers = usersModel?.filter((user) => {
    //         return user.username.includes(searchTerm)
    //     });
    //     document.getElementById
    // },
    
    actions: {
        // filterUsers(searchTerm) {
        //     withPluginApi('0.1', filterUsersWithApi, { searchTerm });
        // }

        // clickSoldButton(topic) {
        //     return bootbox.confirm(I18n.t('topic_trading.mark_as_sold_confirm'), I18n.t('no_value'), I18n.t('yes_value'), result => {
        //         if (result) {
        //             ajax("/topic/sold", {
        //                 type: "PUT",
        //                 data: {
        //                   topic_id: topic.id
        //                 }
        //             }).then((result) => {
        //               topic.set('custom_fields.sold_at', result.topic.sold_at);
        //               topic.set('title', result.topic.title);
        //               topic.set('fancy_title', result.topic.fancy_title);
        //               topic.set('archived', result.topic.archived);
        //             }).catch(() => {
        //               bootbox.alert(I18n.t('topic_trading.error_while_marked_as_sold'));
        //             });
        //         }
        //   });
        // }
  }
};