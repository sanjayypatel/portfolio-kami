---
layout: post
title: Cogently
thumbnail-path: "img/cogently.png"
short-description: An executive summary app.

---

{:.center}
![Screenshot of Cogently front page.]({{ site.baseurl }}/img/cogently.png)

Cogently allows users to quickly upload and summarize documents. For example, prior to an important meeting, Team managers can get up to speed in a snap with staff notes and document summaries collected in one place.

---

## Capstone

Conceived as a capstone project for my time in [Bloc's](http://bloc.io) Ruby on Rails training, [Cogently](http://cogently.herokuapp.com) was built from the ground up by myself with guidance from my mentor, Bobbilee Hartman. Cogently exemplifies my Ruby on Rails development skills - building lightweight prototypes, executing a development plan guided by user stories, and focusing on user experience.

---

## Challenges

As a team's information intake grows, it becomes more complex to keep all users on the same page. How do you get everyone up to speed and share developing insight within your team without wasting time on redundant reading?

To meet this challenge Cogently focuses on capturing notes and analyses in a document summary. The first user who uploads and reads through a document creates quicker access for others. Subsequent readers are aided by collective in-line notes and summaries.

With this core challenge in mind, Cogently was planned to satisfy a series of user stories.  Here's an abbreviated list:

> ### As a user I want to be able to
>
> * upload documents that are available only to my organization.
> * add tags to documents to make document discovery easier.
> * add notes to specific lines in a document and respond to the notes of others.
> * write or edit a summary for each document.
> * view and download the original document.

From a development perspective I had a different set of goals. Cogently served as a opportunity to grow further as a Rails developer.

> ### As a developer I want to
>
> * create a Ruby on Rails app with feature set focused on core user stories.
> * leverage Bootstrap's front end framework for a simple user interface.
> * isolate Bootstrap-specific classes from my own code.
> * convert views to [Haml](http://haml.info) for more readable code.
> * expand upon standard Devise-based accounts with email invitations to join the app.

---

## Execution

### Charting development

Addressing the user needs started with sketching out views and the model. I knew ahead of time what kinds of information I wanted to store along with documents, but sketching helped solidify the structure of the app and allowed me to create a skeleton development plan.

{:.center}
![Wireframe of proposed document view.]({{ site.baseurl }}/img/wireframes/09 Document Show.png)

<p class="image-caption">Once uploaded users would need to be able to add notes to specific lines of the document and summary text.</p>

{:.center}
![Sketch of app model.]({{ site.baseurl }}/img/modelsketch.png)

<p class="image-caption">I went through several iterations of an initial model design. As the project progressed, the database design was changed and expanded.</p>

Moving from sketches to code, I tracked each workable chunk of progress in it's own issue attached to the GitHub repository. These issues were grouped in larger [milestones](https://github.com/sanjayypatel/Cogently/milestones) based on major user stories.

___

## Lessons learned

In developing Cogently, I learned some tough lessons and tried new approaches to development.

### Writing better code

My development goals for Cogently focused on writing better code than in my previous projects, specifically employing Haml and isolating Bootstrap from my code. 

On the recommendation of my mentor, I employed a pair of gems ([haml/haml](https://github.com/haml/haml) and [indirect/haml-rails](https://github.com/indirect/haml-rails)) to convert my views from embedded ruby (erb) files to haml. With strict whitespace and indentation rules, Haml makes code in views much easier to read while discouraging lazy code formatting. 

While researching Bootstrap best practices I encountered several articles about Bootstrap maintainability and extending existing classes in Sass. Here's an abbreviated reading list:

* [Please stop embedding Bootstrap classes in your HTML!](http://ruby.bvision.com/blog/please-stop-embedding-bootstrap-classes-in-your-html?utm_source=designernews)
* [Using Sass To Semantically @extend Bootstrap](http://www.sitepoint.com/sass-semantically-extend-bootstrap/)
* [The Extend Concept](https://css-tricks.com/the-extend-concept/)

The objective was to create code that could easily replace Bootstrap with a ground-up CSS rewrite or different CSS library without requiring a messy rewrite of all views or risky find-all and replace operation. I accomplished this by writing views that used extensions of Boostrap classes instead of writing those classes directly into my code.

### Parsing limitations

{:.center}
![Screenshot of example document uploaded to Cogently.]({{ site.baseurl }}/img/cogentlyexampledoc.png)

<p class="image-caption">Example document uploaded to Cogently.</p>

Granular PDF parsing is a bit beyond the skillset of a junior web developer, although some useful gems and libraries exist to make it easier. One big challenge was finding a way to extract images embedded in PDFs in a way that Rails could store them. Since that was beyond the scope of my prototype's goals, I decided to focus on extracting only the PDF text, which is a comparatively simpler process.

One way to improve this aspect of Cogently in the furture would be to replace the Paragraph model that represents a specific line in a PDF with a Page model. This would:

* Allow user's to see the document in it's original formatting instead of the text-only view Cogently currently shows.
* Still allow user notes to be attached to specific sections of the document.
* Improve users' experience with reading and annotating their documents.

### More to come

Though I have a [protoype](http://cogently.herokuapp.com) deployed to Heroku that is fully functioning, development isn't finished for Cogently. Learning from the challenges I faced has helped me chart further progress for Cogently. 

> Some ideas I'm hoping to execute in the near future:
> 
> * Allow user's to upload and annotate more files types - office documents, images, archives, and media files.
> * Replacing the Paragraph model with a Page model as explained above.
> * Allow users to download a generated PDF summary of a document and a annotated version of the document with user notes as footnotes.
> * Integrate file sharing services such as Google Drive, Box and Dropbox for better integration with user's existing team-shared files.