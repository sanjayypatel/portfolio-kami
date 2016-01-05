---
layout: post
title: Wiki Pocket
thumbnail-path: "img/wikipocket.png"
short-description: A markdown wiki SaaS.
---

{:.center}
![Screenshot of Wiki Pocket.]({{ site.baseurl }}/img/wikipocket.png)

## Background

Wiki Pocket was developed as part of the [Bloc](https://bloc.io) Ruby on Rails training. It provides users the ability to create Markdown wikis and to share wikis with collaborators. 

---

## Challenge

Developing Wiki Pocket presented me with a new challenge in web application development - integrating third party APIs.

[Pocket](http://getpocket.com) is a platform for saving links for later consumption while browsing on a desktop or mobile device. It even integrates with many common apps such as Twitter and Facebook.

Since Wiki Pocket's primary function was to facilitate wiki creation, I designed a user experience that leverages the dynamic bookmarking of Pocket to easily create new Wikis in three easy steps

1. A user finds an interesting link and saves it to Pocket.
2. The user searches for the link in Wiki Pocket, which is connected to their Pocket account.
3. The user creates a new wiki based on the saved link with a single button click.

---

## Solution

The first step in integrating [Pocket's API](https://getpocket.com/developer/) was looking at Pocket's available response types and deciding how to integrate that with my existing model. Being able to retrieve the website titles and URLs from Pocket matched nicely with my Link Model, so I added the calls to the Pocket API from my `LinksController#index` action. 

~~~Ruby
class LinksController < ApplicationController
  def index
    # If searching Pocket Links
    if params[:pocket_search] 
      @links = []
      @retrieved_links = PocketApi.retrieve({
        :search => params[:pocket_search],
        :sort => 'title'
      })
      @retrieved_links.each do |link_hash, retrieved_link|
        new_link = Link.new(
          user: current_user,
          title: retrieved_link["given_title"],
          url: retrieved_link["given_url"]
        )
        @links << new_link
      end
    # If searching the Links Table
    elsif params[:search]
      @links = Link.search(params[:search])
    # If browsing Links Table
    else 
      @links = Link.all
    end
  end
~~~

Now, the `Links#index` view can show either links retrieved from the Pocket API or links from the Links Table, depending on the presence of a `:pocket_search` value in params. Links retrieved from the API are stored in Link objects, but not saved to the database.

In the `Links#index` view, we can show the retrieved links and create a form to save a link from Pocket.

{:.center}
![Screenshot of Wiki Pocket.]({{ site.baseurl }}/img/createwikifromlink.png)

If the user clicks the "Create a New Wiki with this Link." button, a new Wiki record and Link record are created - the new link belongs to the wiki as a reference. The user is then redirected to the `Wikis#edit` view for the newly created wiki.

{:.center}
![Screenshot of Wiki Pocket.]({{ site.baseurl }}/img/newlycreatedwiki.png)

Being able to create a Wiki referencing a bookmark with just a few steps simplifies the user's flow from content discovery to content creation. 

## Further development

Creating adding third party services to an app opens up a lot of potential improvements to Wiki Pocket in the future.  In the future, it would be ideal for a user to be able to create an account on Wiki Pocket using their third-party user account.  Since Pocket uses the [OmniAuth](http://intridea.github.io/omniauth/) library for API authentication, this could be done fairly simply.  

Also, vital to an app for gathering information, is the abiity to easily share that info.  Integrating social sharing functions to Wiki Pocket would be a great next step.