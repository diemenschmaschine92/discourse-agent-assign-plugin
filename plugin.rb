# frozen_string_literal: true

# name: agent-assign
# about: assign topics to agents
# version: 0.0.1
# authors: Discourse
# url: TODO
# required_version: 2.7.0
# transpile_js: true

enabled_site_setting :agent_assign_enabled

after_initialize do
    if SiteSetting.agent_assign_enabled then

        Topic.register_custom_field_type('assigned_user', :text)
        Topic.register_custom_field_type('is_assigned', :boolean)
        Topic.register_custom_field_type('search_term', :text)

        # add to class and serializer to allow for default value for the setting
        add_to_class(:topic, :assigned_user) do
          if custom_fields['assigned_user'] != nil
            custom_fields['assigned_user']
          else
            SiteSetting.signatures_visible_by_default
          end
        end

        add_to_class(:topic, :is_assigned) do
          if custom_fields['is_assigned'] != nil
            custom_fields['is_assigned']
          else
            SiteSetting.signatures_visible_by_default
          end
        end

        add_to_class(:topic, :search_term) do
          if custom_fields['search_term'] != nil
            custom_fields['search_term']
          else
            SiteSetting.signatures_visible_by_default
          end
        end
    
        add_to_serializer(:topic, :assigned_user) do
          object.topic.custom_fields[assigned_user]
        end

        add_to_serializer(:topic, :is_assigned) do
            object.topic.custom_fields[is_assigned]
        end

        add_to_serializer(:topic, :search_term) do
            object.topic.custom_fields[search_term]
        end
    
    end

end
