---
layout: post
title: actransit_rails
thumbnail-path: "img/actransitrails.png"
short-description: A gem for accessing the AC Transit API in Rails.
---

{:.center}
![Screenshot of ACTransit_Rails gem on RubyGems.]({{ site.baseurl }}/img/actransitrails.png)


## Background

ACTransit_Rails started as an attempt to solve a problem on an entirely different project.  Sketching and brainstorming an app to simplify commuting across the San Francisco Bay by bus, led me to the [AC Transit Bus API](http://api.actransit.org/transit/) to access routes, stop locations and schedules with simple HTTP requests.

The opportunity to contribute something new to the open source community, simplify access to public tansit data, and further challenge myself as a developer motivated me to write [this little gem.](https://github.com/sanjayypatel/actransit_rails)

## Context

Commuting in the Bay Area is a complex challenge that combines trains, subways, buses and ferries, not to mention thousands of cars, corporate shuttles and ridesharing services.  The ACTransit_Rails gem was developed to make one aspect of this chaotic system a lot simpler. By wrapping the AC Transit Bus API in Ruby, the gem does the heavy lifting of properly formatting requests for route, trip and schedule information.

> I set a couple of goals for myself in development.
>
> 1. I wanted to build a gem from the ground up using test-driven practices.
> 
> 2. Also, the gem needed to completely isolate the API from the application.  I did this by giving developers Ruby functions to make requests of the API, and returning API responses as Ruby arrays and hashes.
>
> 3. Last, the gem needed to handle errors from the API in a graceful way that a Rails app could understand.

##Development

Though familar with building Rails apps, the structure of a gem's library and files was a mystery to me. To get off the ground I started with a little background: [Ruby Gems Guides](http://guides.rubygems.org/make-your-own-gem/).

###Starting with tests
Taking a test-driven approach to development meant looking at the app from the perspective of future users (other developers). I envisioned a set of helper functions that could be called from controller actions, that returned with data ready to be saved to the database or formatted for views.

I wrote RSpec specs that defined what kind of output I wanted to receive from these functions- the proper classes and the keys that succesful responses should respond to. 

###Crafting the requests

Each helper function I wrote mapped functionality to a specific request that could be made to the AC Transit API.

I wrote a short [blog post]({{ site.baseurl }}/2015/07/14/First-Gem-ACTransit-Rails.html) that goes into greater detail about the structure of these requests, but in short, the helper functions formatted a proper API request as a URI object.

Using the Net::HTTP library, the request to the API could be made with the URI and the JSON response captured. Before passing the response back to the original function call, the JSON is parsed into a Ruby array of hashes or simply a Ruby hash depending on the request.

### Wrapping the API

By keeping the API-specific code entirely within the gem, Ruby developers looking to acces the API only have to make use of Ruby functions to make requests and get parsed output as a Ruby class.  In other words, the ACTransit_Rails gem hides the messier, "non-Ruby" parts of the API, making it much easier for other developers to code and test their apps.

## BayCrosser - The gem in action.

{:.center}
![Screenshot of BayCrosser web app.]({{ site.baseurl }}/img/baycrossercolor.png)

In order to demo the gem, I wrote a small transit web app, [BayCrosser](http://baycrosser.herokuapp.com), that pulls updated Transbay bus schedules.  (Transbay buses cross the Bay Bridge, allowing commuters from the East Bay to get into Downtown SF).

The app is designed to fit one simple role: telling you available trips for a selected Transbay bus route. I kept the app simple to focus on using the gem, and on making an app that worked quickly on mobile devices. 

## Further development

Working on a demo application revealed that the gem could do more to simplify API access. Beyond mapping more of the possible API requests to helper functions, the gem could do more to the JSON response data to make it easier to work with.

One idea I had was to create Ruby classes to model the various responses from the API.  For example, the `get_trips` function currently returns an array of hashes, each hash representing a discrete trip.  The hashes use the API's keys to retrieve values from the hash, which don't follow a very 'ruby-esque' naming convention. To make dealing with this output easier, an ACTransitRails::Trip object could be created with the data from each hash. An array of Trip objects would be easier to developers to work with than arrays and hashes. 

I've started working on this feature in [this branch](https://github.com/sanjayypatel/actransit_rails/tree/feature/response-classes) and will post updates when it's ready to deploy!