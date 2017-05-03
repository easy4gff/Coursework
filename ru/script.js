function getCountArgs(calcMethod) {
  switch (calcMethod) {
    case 'sum':
    case 'diff':
    case 'division':
      return 2;
      break;
    case 'mult':
      return 3
      break;
    case 'square':
      return 1;
      break;
    default:
      return null;
  }
}

function getArguments(calcMethod, div_id) {
  var count_arguments = getCountArgs(calcMethod);

  var result = [];
  for (var i = 1; i <= count_arguments; ++i) {
    var selector = $('input[name ="' + div_id + '_arg_' + i + '"]');
    result.push(selector.val());
  }

  return result;
}

$(document).ready(function() {
  $("#exec_opt_chosen").click(function() {
    $("#execute_options_ul").removeClass("active_div");
    var checked_option = '#' + $("input:checked").val();
    $(checked_option).css("display", "block");
    // ReactDOM.render(
    //   <h1>Fuck</h1>,
    //   document.getElementById('test')
    // );
  });
});


$(document).ready(function() {
  $('.button_div_calc_req').click(function() {
    var parent_div_id = $(this).parent().parent().attr('id');
    var calculationMethod = $(this).attr('id');

    var xmlRequest = $.ajax({
      method: 'POST',
      url: 'calculator.php',
      data: {
        calcMethod: calculationMethod,
        args: getArguments(calculationMethod, parent_div_id)
      }
    });

    xmlRequest.done(function(msg) {
      $('#result_div').html('<h1>Result is: ' + msg);
      $('#result_div').addClass('active_div');
    });

    xmlRequest.fail(function( jqXHR, textStatus ) {
      console.log( "Request failed: " + textStatus );
    });
  })
});
