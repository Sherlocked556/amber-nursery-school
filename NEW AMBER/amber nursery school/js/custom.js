/* Add here all your JS customizations */

//callback handler for form submit

$(".form_collect .alert").hide(); //hide alerts at first

$('.alert .close_me').click(function(){
    $(this).parent('.alert').fadeOut();

});

$(".form_collect").submit(function(e)
{
    e.preventDefault(); //STOP default action
    //e.unbind(); //unbind. to stop multiple form submit.
    $('#ajax_loader').show();

    var postData = $(this).serializeArray();
    $.each(postData, function(ind, val){
    	postData[ind]['field_type'] = $('input[name="'+val.name+'"]').attr("type");
    });
    var form_name = $(this).attr("name");
   // console.log( "NAME : ", $(this).attr("name") );

    
    $.ajax(
    {
        url : "/forms",
        type: "POST",
        data : {fields : postData, form_name : $(this).attr("name") } ,
        success:function(data) 
        {
            $('#ajax_loader').hide();

            //data: return data from server
            if(data.success_message){
                $('form[name="'+form_name+'"] .alert_text').html(data.success_message);
            	$('form[name="'+form_name+'"] .alert').addClass('alert-success');
            	$('form[name="'+form_name+'"] .alert').show();
            }else if(data.error_message){
            	$('form[name="'+form_name+'"] .alert').addClass('alert-danger');
                $('form[name="'+form_name+'"] .alert_text').html(data.success_message);
            	$('form[name="'+form_name+'"] .alert').show();

            }
        	
        	$('form[name="'+form_name+'"]')[0].reset();


        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
            console.log('error', textStatus, errorThrown);
            $('form[name="'+form_name+'"] .alert').addClass('alert-danger').html("Oops! There was a problem.");
            $('form[name="'+form_name+'"] .alert').show();

        }

    });

});
 
$("#ajaxform").submit(); //Submit  the FORM