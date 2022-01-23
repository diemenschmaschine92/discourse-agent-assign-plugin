# frozen_string_literal: true

# name: agent-assign
# about: assign topics to agents
# version: 0.0.1
# authors: Discourse
# url: TODO
# required_version: 2.7.0
# transpile_js: true

require 'json'

enabled_site_setting :agent_assign_enabled

register_asset 'stylesheets/common/assign.scss'

after_initialize do
    if SiteSetting.agent_assign_enabled then

        users = User.first(4)
        usernames = []

        puts 'RUBY USERS'
        puts users

        users.each do |user|
          usernames << {:username=>user.username}
        end

        File.open("public/usernames.json", "w") do |f|
          f.write(JSON.pretty_generate(usernames))
        end

        file = File.read('public/usernames.json')
        data_hash = JSON.parse(file)
        puts "RUBY READ RESULT"
        puts data_hash

        Topic.register_custom_field_type('assigned_user', :text)
        Topic.register_custom_field_type('is_assigned', :boolean)
        Topic.register_custom_field_type('search_term', :text)
        Topic.register_custom_field_type('usernames', [:text])

        # add to class and serializer to allow for default value for the setting
        add_to_class(:topic, :assigned_user) do
          if custom_fields['assigned_user'] != nil
            custom_fields['assigned_user']
          else
            true
          end
        end

        add_to_class(:topic, :is_assigned) do
          if custom_fields['is_assigned'] != nil
            custom_fields['is_assigned']
          else
            true
          end
        end

        add_to_class(:topic, :search_term) do
          if custom_fields['search_term'] != nil
            custom_fields['search_term']
          else
            true
          end
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