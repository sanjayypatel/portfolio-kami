---
layout: post
title:  "MVC Confusion"
date:   2015-06-30 12:15:00
tags: mvc rails fat-model skinny-controller
center: true
---
The Model-View-Controller (MVC) software architecture is the guiding principle of Ruby on Rails development, but I found it one of the biggest stopping points in my education.  Though Rails goes a long way towards simplifying and codifying how these three pieces of your application interact, some of the "magic" Rails does for you obfuscates their real interactions.  

Take, for example, the communication between your routes, your controllers and your views.  As long as you follow [Rails naming conventions](http://itsignals.cascadia.com.au/?p=7), everything will just... work. But how is the application accomplishing these connections?

##For starters, here's some of my recommended reading on the topic:

* [Rails Model View Controller and Helper: what goes where? on StackOverflow](http://stackoverflow.com/questions/60658/rails-model-view-controller-and-helper-what-goes-where/60806#60806) - The answers provided are a great starting point of deciding which part of application should house what code.

* [Skiny Controller, Fat Model by Jamis Buck](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model) - An illuminating step-by-step process of refactoring code, that demonstrates how models, controllers and views interact along the way.

* [Ruby on Rails Framework on Tutorialspoint](http://www.tutorialspoint.com/ruby-on-rails/rails-framework.htm) - Though the explanations are a bit dry, the explanation of MVC as it applies specifically to Rails apps is thorough and really helped me put the other pieces of the puzzle into place.  Specifically, where do ActiveRecord and the Database fit in?

There are so many more great articles, StackOverflow posts, and tutorials out there about MVC, but what really helped me cement my understanding was trying at various times to write an explanation of MVC. And not just a static description of the different parts, but a narrative of an example user flow.

---

##So, here goes:

_I should note this represents my understanding, so far, of MVC in Rails. I could be wrong or have some blind spots._

When the user navigates to the articles index path, example.com/articles/, the application knows that this references the action ArticlesController#index by referring to the routes.rb file.  Seeing the line `resources :articles` allows the request url to be connected to the appropriate controller, controller action, and view.

The controller executes the index action - defining an instance variable @articles which is available to the corresponding view (app/views/articles/index.html.erb). The line `@articles = Article.all` will query the database for all records in the Articles table, and return them as a collection of ActiveRecord objects.

The application then renders the view, index.html.erb, iterating over the @articles instance var and displaying article titles and text.  

In this example, we can see how the model view and controller divide up duties. 

The controller makes use of the model's knowledge of an article without actually having to know much about the articles themselves.  The controller doesn't need to know that an article has a title or that it has text.  

Likewise the view doesn't need to "think" about the database specific records.  The HTML file needs to know that article.title will return that article's title, but it does not need to know which articles to show - the controller decides that for it.  

Finally, the model know's nothing about the decisions the controller is making, nor the format and style of the view.  It provides an ActiveRecord interface to the database - creating helper Ruby methods for model attributes and providing the controller simplified syntax for things like creating a new Article, etc.  

I'm sure that as I continue to code and learn the ins and outs of development, my understanding of MVC will grow and change.  But I suppose that's half the fun.