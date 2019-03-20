	$( document ).ready(function() {

	var parent_tour_container = '';

	$('.tour_reg_butt').click(function(){
		$('#tour_date').text( $(this).data('tour_signup'));
		$('#email_date').val( $(this).data('email_date') );
		$('#tour_id').val( $(this).data('tour_id') );
		parent_tour_container = $(this).closest('.feature-box');
	})


	$("#signupForm" ).submit(function( event ) {
	  event.preventDefault();
	  $('#ajax_loader').show();
	  var formData =  $(this).serialize();
	  $.ajax({
		  type: "POST",
		  url: '/forms/tourSignup',
		  data: formData,
		  success: function(data){
		  	$('#tourSignup').modal('hide');
			$(parent_tour_container).addClass('borderIt');
			$(parent_tour_container).find('.registered_success').show();	
			$(parent_tour_container).find('.tour_reg_butt').text("You've Been Registered").prop("disabled",true).removeClass('btn-primary').addClass('btn-default');
			$(parent_tour_container).find('.note').hide();
			$('#ajax_loader').hide();
		  },
		  error: function(e){
		  	console.log("error", e);
		  },
		  dataType: 'json'
		});
	});


});

