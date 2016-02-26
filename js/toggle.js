var jobButtons = document.getElementsByClassName('job-button');

var toggleJobDescription = function () {
  var description = this.nextElementSibling;
  var duties = description.nextElementSibling;
  if( description.style.display === 'block') {
    this.innerHTML = 'More';
    description.style.display = 'none';
    duties.style.display = 'none';
  } else {
    this.innerHTML = 'Less';
    description.style.display = 'block';
    duties.style.display = 'block';
  }
};

for(t in jobButtons) {
  jobButtons[t].addEventListener('click', toggleJobDescription);
}