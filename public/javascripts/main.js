$(document).ready(function() {

  // handler for the PLUS or MINUS icon on each table row
  // for expanding or contracting content
  $('.glyphicon-plus-sign').on('click', function() {
    var item_id = $(this)[0].id;
    $('.showOrHide_' + item_id).toggle();
    if ($(this).hasClass("glyphicon-plus-sign")) {
      $(this).removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
    } 
    else {
      $(this).removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");      
    }
  });

  // handler for clicking the Remove button
  $('.remove-btn').on('click', function() {
    var item_id = $(this)[0].id;
    $('#book_' + item_id).remove();

    $.ajax({
      url: '/book',
      method: 'DELETE',
      data: {
        book_id: item_id
      },
      success: function(response) {
        console.log("returned from ajax DELETE");
      }
    });

  });

  // handler for clicking the Edit button
  $('.edit-btn').on('click', function() {
    var item_id = $(this)[0].id;
    window.location.href = '/book/' + item_id;
  });

  

  });


