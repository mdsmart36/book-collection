$(document).ready(function() {

/* when a checkbox is used for the list, this function will allow a "select all"
  $('#selectAll').on('click', function() {
    $('input:checkbox').prop("checked", this.checked);
  });
*/

  $('.remove-btn').on('click', function() {
    var item_id = $(this)[0].id;
    $('#todo_' + item_id).remove();

    $.ajax({
      url: '/todo',
      method: 'DELETE',
      data: {
        todo_id: item_id
      },
      success: function(response) {
        console.log("returned from ajax DELETE");
      }
    });

  });

/*
  $('#removeButton').on('click', function() {

    // select every table row in which checkbox is checked
    var checkbox_id = $('input:checked').attr('id');

    // remove those parent table rows from the DOM
    $('input:checked').parent().parent().remove(); 

    //console.log(checkbox_id);

    // remove item from the database by making AJAX call
    $.ajax({
      url: '/todo',
      method: 'DELETE',
      data: {
        todo_id: checkbox_id
      },
      success: function(response) {
        console.log("returned from ajax DELETE");
      }
    });

  });

*/

  $('.edit-btn').on('click', function() {
    var item_id = $(this)[0].id;
    window.location.href = '/todo/' + item_id;
  });

  // $('.sortByDueDate').on('click', function() {
  //   $.ajax({
  //     url: '/todo',
  //     method: 'POST',
  //     data: {
  //       sortBy: 'dueDate'
  //     },
  //     success: function(response) { }
  //   });
  // });
/*
  $('#editButton').on('click', function() {
    var checkbox_id = $('input:checked').attr('id');
    window.location.href = '/todo/' + checkbox_id;
  });

*/

  $('#addButton').on('click', function() {
    window.location.href = '/';
    });

  });


