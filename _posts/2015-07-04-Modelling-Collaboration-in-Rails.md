---
layout: post
title:  "Modeling Collaboration in Rails"
date:   2015-07-04 02:47:00
tags: mvc rails join-table collaboration
---

In my current project in the Bloc.io Ruby on Rails course, I'm tackling a particularly confusing topic (confusing to me, at least) - Collaboration.  

I've had some experience with Join tables, but the situation is a little convoluted since a User has many wikis, a wiki belongs to a user, AND a user has many shared wikis through collaborations.

***

#Models

Here's how I setup the models:

User.rb

```ruby
  has_many :collaborations
  has_many :wikis
  has_many :shared_wikis, through: :collaborations, source: :wiki
```

On the third line, `source: :wiki` allows me to call `user.shared_wikis` to access any wikis that have been shared with the user by other authors and avoids colliding with `user.wikis`.

Wiki.rb

```ruby
  belongs_to :user
  has_many :collaborations
  has_many :users, through: :collaborations
```

Next I needed generate the Collaboration model:

`$ rails g model Collaboration user:references wiki:references`

Collaboration.rb

```ruby
  belongs_to :user
  belongs_to :wiki
```

Basically, User has_many Wikis in two relationships, one directly between the Users and Wikis tables, and one through the Collaboration join table.

***

#User Flow

Now that I knew how to structure accessing users from wikis, wikis from users, and shared_wikis from users, I needed to think through how to present a collaboration to a user of the application.

Here's the flow I came up with:

1. From the Wikis#show and Wikis#edit views, a user should be able to search for a user by username and add them to the wiki as collaborator.

2. The application should lookup a user by the searched username and create a new collaboration record linking the current wiki shown and the user searched for.  If the user isn't found, the collaboration record will not be created.

3. The Wikis policy, created with Pundit, should allow user's who are collaborators to edit wikis.  Even standard users should be able to edit private wikis if they are collaborators. 

4. The wiki's author should be able to remove collaborators from a wiki.

Before diving into views and controllers, here's how I added collaborations to routes:

routes.rb

```ruby
resources :wikis do 
    resources :collaborations, only: [:create, :destroy]
end
```

Since collaborations aren't accessed without a related wiki, I nested them and added routes for create and destroy actions. The nesting had the added benefit of passing a :wiki_id to the Collaborations#create controller action.

***

#Views

Here's how I wired up the views:

collaborations/_form.html.erb

```html
<%= form_tag [wiki, collaboration] do %>
  <%= text_field_tag :search, params[:search] %>
  <%= submit_tag "Add User" %>
<% end %>
```

I created a form rendered on the Wikis#show and Wikis#edit pages. Instead of a field to directly populate the user or wiki attributes of the collaboration, I setup a search field that passed the input text to the CollaborationsController in the form of params[:search].

***

#Create

The controller receives the searched-for username using params[:search] and uses it to find a relevant user.

Here's how I setup the Collaboration controller:

Collaborations_Controller.rb

```ruby
def create
  @wiki = Wiki.find(params[:wiki_id])
  @user = User.where('username LIKE ?', "%#{params[:search]}%")
            .all_except(current_user)
            .exclude_collaborators(@wiki)
            .first
  if @user
    @collaboration = Collaboration.new(wiki: @wiki, user: @user)
    if @collaboration.save
      flash[:notice] = "User successfully added to wiki."
    else
      flash[:error] = "There was a problem adding user. Please try again."
    end
  else
    flash[:error] = "Sorry that wasn't a valid username. Please try again."
  end
  redirect_to @wiki
end
```

The create action references the appropriate wiki using params[:wiki_id] and the user is referenced by searching the table for the input username.  I added scopes to the user model that exclude the current_user and excludes the users who are already collaborators for the wiki.

Next, if the user is found, a new collaboration is created linking the wiki and user, otherwise an error is rendered letting the user know that the typed username wasn't found.

***

#Destroy

Removing a collaborator is even easier, just added a button to a view that uses the DELETE method.  I added a data confirm popup to prevent stray clicks.

```html
<%= link_to "Remove", [wiki, collab], method: :delete, data: { confirm: 'Are you sure you want to remove this user?'} %>
```

That's more or less how I got it all hooked together.  I'd guess that depending on the needs of the application, you'll have some variations from my strategy like policies allowing view elements to be shown.  