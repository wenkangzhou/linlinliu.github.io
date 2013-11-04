$(document).on('Compass', function (e) {

    /*****************************
     * 
     * ALL YOUR SCRIPTS GO HERE
     * 
     *****************************/


    $(".portfolio-item").swipebox();

     /**
      * Contact Form
      */
    $('.form[name="contact"]').submit(function () {
        var error = 0;

        // check for required
        $(this).find('.required').each(function () {
            if (!$.trim($(this).val())) {
                error += 1;

                // add error class to field
                $(this).addClass('error');
            } else {
                // remove error class from field
                $(this).removeClass('error');
            }
        });

        // if error
        if (error) {
            // add error class to button
            $(this).find('.error_message').show().css('visibility', 'visible');

            return false;
        } else {
            // remove error class from button
            $(this).find('.error_message').hide().css('visibility', 'hidden');
        }

        // gather data
        var data = {
            full_name: $(this).find('input[name="full_name"]').val(),
            email: $(this).find('input[name="email"]').val(),
            message: $(this).find('textarea[name="message"]').val()
        };

        // submit it to contact PHP
        // $.post('assets/pages/contact.php', data, function (response) {
        //     // hide button and show confirm message
        //     $('.form[name="contact"]').find('.btn').fadeOut(function () {
        //         $('.form[name="contact"]').find('.confirm').fadeIn();                
        //     });
        // });

        return false;
    });
});