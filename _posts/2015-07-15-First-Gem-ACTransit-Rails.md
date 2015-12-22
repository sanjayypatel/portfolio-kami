---
layout: post
title:  "First Gem - ACTransitRails"
date:   2015-07-15 03:06:00
categories: gem ruby actransit rspec
tags: gem ruby actransit rspec learning
---

Here's my first stab at a gem and the open-source dev community - ACTransitRails - [RubyGems](https://rubygems.org/gems/actransit_rails)

It's a little Ruby wrapper for the [ACTransit API](http://api.actransit.org/transit/) that allows you to access the route and bus stop info for the Bay Area ACTransit system. 

Their API is pretty straightforward set of requests, including an access token, that respond with JSON formated information, so this seemed like a good topic to dip my feet into gem creation, which is brand new for me.  

Here's a little rundown of what I did.

* I built a module, `ACTransitRails`, that defined all of the helper methods I wanted to create.  Each helper method defines a `URI` instance that takes a string formatted like "http://api.actransit.org/transit/...options.../?token='api_access_token'"
Then the uri is passed to the private get_response method which makes the actual request to the api.

~~~
module ACTransitRails
  
  # base_url, search_string, and my_token are all private methods that return static parts of the url

  def self.get_all_routes
    # define the url
    uri = URI.parse(
      base_url + 
      "routes/" +  # this part of the uri will be different for each helper method
      search_string + 
      my_token
    )
    # make the request of the api using the url
    return get_response(uri)
  end

  def self.get_route(route)
    # ...
  end
  # ...
end
~~~

* This request is formated as an `Net::HTTP` request in a private method `get_response(uri)`.

~~~
  def self.get_response(uri)
    http = Net::HTTP.new(uri.host, uri.port)
    response = http.request(Net::HTTP::Get.new(uri.request_uri))
    return JSON.parse response.body
  end
~~~

* The `uri` passed to `get_response` is created in each of the helper method, as each method needs a specifically formatted url. Last, the response from the api is returned as JSON, which can be parsed into arrays and hashes using JSON.parse.

So that's basically it.  To use the gem, you call `ACTransitRails.configure(access_token)` where access_token is your access token as a string. Then following calls to helper methods will use your token to make requests of the api.

~~~
ACTransitRails.get_route('E')
# => {"RouteId":"E","Name":"E","Description":"San Francisco - Claremont -Parkwood"}
~~~

The return values for each method varies, either arrays or hashes, which is how the api responds to different requests.  I think the next thing I'll look into doing is formatting all of the responses in a standardized way, although that will take some thinking.  For now, the gem successfully simplifies a dev's access to the api in their rails apps, while still returning response in the api-expected formats, and that's good for now.  

Check out the code over on [Github.](https://github.com/sanjayypatel/actransit_rails/)  Collaborators and contributors welcome!

* A little disclaimer: As I said, I'm really new to Ruby dev, so don't take my code or strategies for "expert advice."  Rather, I'm documenting my progress learning various aspects of participating the cool world of software development.  That also means that if you've got some ideas or feedback on how I could improve/change my code or projects then please, shoot me an email, make a pull-request, or tweet at me!