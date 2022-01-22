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

        users = User.first(4)
        usernames = []

        puts "RUBY USERS"
        puts users

        users.each do |user|
            usernames.push(user.username)
        end

        puts usernames

        Topic.register_custom_field_type('assigned_user', :text)
        Topic.register_custom_field_type('is_assigned', :boolean)
        Topic.register_custom_field_type('search_term', :text)
        Topic.register_custom_field_type('usernames', [:text])

        # add to class and serializer to allow for default value for the setting
        add_to_class(:topic, :assigned_user) do
          if !custom_fields['assigned_user'].nil
            custom_fields['assigned_user']
          else
            nil
          end
        end

        add_to_class(:topic, :is_assigned) do
          if !custom_fields['is_assigned'].nil
            custom_fields['is_assigned']
          else
            false
          end
        end

        add_to_class(:topic, :search_term) do
          if !custom_fields['search_term'].nil
            custom_fields['search_term']
          else
            ''
          end
        end

        add_to_class(:topic, :usernames) do
            if !custom_fields['usernames'].nil
                custom_fields['usernames']
            else
                usernames
            end
        end

        add_to_class(:topic, "usernames=") do |value|
            # if !value.nil
            #     custom_fields['usernames'] = value
            # else 
            #     custom_fields['usernames'] = usernames
            # end
            custom_fields['usernames'] = usernames
        end
    
        add_to_serializer(:topic_view, :assigned_user) do
          object.topic.custom_fields['assigned_user'] if object.topic.custom_fields
        end

        add_to_serializer(:topic_view, :is_assigned) do
            object.topic.custom_fields['is_assigned'] if object.topic.custom_fields
        end

        add_to_serializer(:topic_view, :search_term) do
            object.topic.custom_fields['search_term'] if object.topic.custom_fields
        end

        add_to_serializer(:topic_view, :usernames) do
            object.topic.custom_fields['usernames'] if object.topic.custom_fields
        end
    end

end
