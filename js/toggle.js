var toggles = $('.resume-toggle');
$('.resume-toggle').on('click', function() {
  console.log('clicked');
  if($(this).next().hasClass('hidden')) {
    isHidden = false;
    $(this).next().removeClass('hidden');
    $(this).html('Less');
  } else {
    isHidden = true;
    $(this).next().addClass('hidden');
    $(this).html('More');
  }
});