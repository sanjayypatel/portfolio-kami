---
layout: post
title:  "Using Concise.css"
date:   2015-06-29 14:42:00
tags: css frameworks concise.css
---
As a new developer-in-training, a lot of my Ruby on Rails projects up until now have relied on Bootstrap to get boilerplate styling out of the way quickly.  This is great for getting a layout and up on the screen quickly, without having to split focus between the back and front ends of an application.  

However, Bootstrap's got it's own opinions about how things ought to look, feel and interact, and I've found that the better I get at working with HTML, CSS and JavaScript, the more work I have to put into wrangling Bootstrap into fitting my needs.  Thus began the search for more flexible, 'light-weight' CSS frameworks that would leave a little more wiggle room for me.  

{}

I really wanted a specific set of tools out of a framework:

* An easily implemented and responsive grid system.
* Generic button, nav and heading styling that was easily customized.
* Modularized add-ons and mixins extend the framework as needed.
* Not a lot of scripting or nested styling (divs within divs within divs of classes).

>*This was especially important to me because I didn't want to have a lot of baked-in fuctions to fight when I started diverging from the frameworks.*
* Ideally, the framework would be bundleable with RoR as a gem.

My searching led me to this [handy listicle](http://www.hongkiat.com/blog/bootstrap-alternatives/) of light-weight frameworks. Represented are some cool, up-to-date frameworks that vary in their depth and complexity.  

I ended up choosing the [Concise](http://concisecss.com/) CSS framework to learn next because it seemed to meet all of my desired requirements.  

* The grid system is sensical, customizable, and nestable. 
* The generic stylings for most elements are straightforward and unadorned.  
* Adding more complex features is easily done via [Add-ons](http://concisecss.com/add-ons/) as needed per project.
* Concise doesn't encumber you with many scripts - making it customization less clash-prone.  

>*In fact you, when using the below-mentioned gem, you can pick and choose which scripts to include, easily disabling any script you'd rather overwrite.*
* Concise is also easily added to a Rails project via the [ConciseCSS gem](https://github.com/ConciseCSS/concise.css-gem)

It only took me a few hours to get an existing Rail project switched from Bootstrap to Concise, which you can see running over on Heroku - [Markoff.](http://markoff.herokuapp.com/)  I've still got a lot of playing around to do with Concise before I'm settled on using it for my prototyping, but I appreciate how easy it is to get a neutral-feeling style applied to a Rails app, and simple it is to override what's provided.  