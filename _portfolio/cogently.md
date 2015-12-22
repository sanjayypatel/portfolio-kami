---
layout: post
title: Cogently
thumbnail-path: "img/cogently.png"
short-description: An executive summary app.

---

{:.center}
![]({{ site.baseurl }}/img/cogently.png)

Cogently is a tool that puts teams in control of document control and synthesis, allowing users to quickly upload, notate and summarize incoming documents. 

---

## Capstone

Conceived as a capstone project for my [Bloc](http://bloc.io) Ruby on Rails training, [Cogently](http://cogently.herokuapp.com) was built from the ground up by myself with guidance from my mentor, Bobbilee Hartman. Cogently exemplifies the sum of my Ruby on Rails development skills - building lightweight prototypes, executing a development plan guided by user stories, and focusing user experience.

---

## Challenges

As a team's information intake grows, the challenge of keep all users on the same page rises in priority. But how do you get everyone up to speed without wasting time on redundant reading? Cogently needed to focus on capturing notes and analysis in a document summary as the first user uploaded and read through the document.

Further reading by teammates would be accelerated by other user's in-line notes and summaries.

With this core challenge in mind, Cogently was planned to satisfy a series of user stories:

> ### As a user I want to be able to
>
> * upload documents that are available only to my organization.
> * add tags to documents.
> * add notes to specific lines in a document.
> * add a summary to each document.
> * view and download the original document.

From a development perspective I had different set of goals:

> ### As a developer I want to
>
> * create a Ruby on Rails app with a minimal feature set focused on core user stories.
> * leverage Bootstrap's front end framework for a simple user interface.
> * isolate Bootstrap-specific classes from my own code.
> * convert views to [Haml](http://haml.info) for more readable code.

---

## Execution

### Charting development

Addressing the user needs started with sketching out views and the model. I knew ahead of time what kinds of information I wanted to store along with documents, but sketching helped solidify the structure of the app and allowed me to create a skeleton development plan.

{:.center}
![]({{ site.baseurl }}/img/wireframes/09 Document Show.png)

<p class="image-caption">Once uploaded users would need to be able to add notes to specific lines of the document and summary text.</p>

{:.center}
![]({{ site.baseurl }}/img/modelsketch.png)

<p class="image-caption">I went through several iterations of an initial model design. As the project progressed, the model was changed and expanded.</p>

Moving from sketches to code, I tracked each workable chunk of progress in it's own issue attached to the github repository. These issues were grouped in larger [milestones](https://github.com/sanjayypatel/Cogently/milestones) based on major user stories.

With a plan in place, it development was executed in small loops of choosing an open issue, executing a solution, testing and then reviewing my changes as a pull request with my mentor.

___

### Coding better than before

My development goals for Cogently focused on writing better code than in my previous projects, specifically employing Haml and isolating Bootstrap from my code. 

On the recommendation of my mentor, I employed a pair of gems ([haml/haml](https://github.com/haml/haml) and [indirect/haml-rails](https://github.com/indirect/haml-rails)) to convert my views from erb files to haml. 

While researching Bootstrap best practices I encountered several articles about Bootstrap maintainability and extending existing classes in Sass. Here's an abbreviated reading list:

* [Please stop ambedding Bootstrap classes in your HTML!](http://ruby.bvision.com/blog/please-stop-embedding-bootstrap-classes-in-your-html?utm_source=designernews)
* [Using Sass To Semantically @extend Bootstrap](http://www.sitepoint.com/sass-semantically-extend-bootstrap/)
* [The Extend Concept](https://css-tricks.com/the-extend-concept/)

The main goal was to create code that could easily replace Bootstrap with a ground-up CSS rewrite or different CSS library without requiring a messy rewrite of all views or risky find-all and replace.

---

## Lessons learned

In developing Cogently, I learned a few tough lessons. 

### Parsing limitations

{:.center}
![]({{ site.baseurl }}/img/cogentlyexampledoc.png)

<p class="image-caption">Example document uploaded to Cogently.</p>

PDF parsing is a bit beyond the skillset of a junior back end web developer, although some useful gems and libraries exist to make it easier. One big challenge was finding a way to extract and reference images in pdfs in a way that Rails could store and reprsent.  To make it tougher, images embedded within pdfs can come in a variety of formats, requiring specialized code to extract each file type.  

Since that was beyond the scope of my prototype's goals, I decided to focus on extracting only the text of pdfs, which is a relatively simpler process, though not without its own challenges.  Namely, pdf parsers can't tell the difference between a complete sentence and a fragment.  In fact, the parser was spitting out paragraph elements based on newlines encountered in the pdf.  While this still allowed user's to write notes referencing a spefic line of text in the document, it was hardly elegant.

But learning from these unexpected challenges has helped me chart further progress for Cogently. If I got the chance to tackle this app again, I'd work on a more general modelling of a document.  Specifically, I'd replace my Paragraph model with a Page model.  A Page model would allow me to more easily represent lots of file types, not just pdfs. It would allow user's to see the document in it's original formatting instead of the text-only view Cogently currently shows.

### More to come

Though I have a protoype deployed to Heroku that is fully functioning, development isn't finished for Cogently. Post-bootcamp, I plan on modifying and expanding Cogently's functions to represent a more complete product.

> Some ideas I'm hoping to execute in the near future:
> 
> * Allow user's to upload and notate more files types - office documents, images, archives, and media files.
> * Replacing the Paragraph model that represents a specific line in a pdf with a Page model since parsing a pdf is a complex process that provides a granularity not necessary for most users.  Instead of adding notes to a specific line in a pdf, I'd like to enable notation on a per-page basis. This would allow users to see the pdf in it's original formatting while still adding targeted notes.
> * Allow users to download a generated pdf summary of a document and a notated version of the document with user notes as footnotes.
> * Integrate file sharing services such as Google Drive, Box and Dropbox for better integration with user's existing team-shared files.