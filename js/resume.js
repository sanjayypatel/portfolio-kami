var ready = function() {
  var $jobToggles = $('.job-toggle');

  // run test on initial page load
  checkSkillSize();
  // run test on resize of the window
  $(window).resize(checkSkillSize);

  $jobToggles.mouseup(toggleJobDescription);
};

$(document).ready(ready);
$(document).on('page:load', ready);

function checkSkillSize(){
  var $skillsDivs = $('.skills-content');
  var maxHeight = 0;
  $skillsDivs.each(function() {
     if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
  });
  $skillsDivs.height(maxHeight);
}

var toggleJobDescription = function () {
  var jobToggle = $(this);
  var jobButton = jobToggle.children('.job-button');
  var description = jobToggle.siblings('.job-description');
  var duties = jobToggle.siblings('.job-duties');
  jobButton.toggleClass('rotate-ninety');
  description.slideToggle();
  duties.slideToggle();
};