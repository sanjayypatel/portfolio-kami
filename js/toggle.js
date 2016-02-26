$(function () {
  var $jobButtons = $('.job-button');

  var toggleJobDescription = function () {
    var jobButton = $(this);
    var description = jobButton.siblings('.job-description');
    var duties = jobButton.siblings('.job-duties');
    jobButton.toggleClass('rotate-ninety');
    description.slideToggle();
    duties.slideToggle();
  };

  $jobButtons.mouseup(toggleJobDescription);  
});