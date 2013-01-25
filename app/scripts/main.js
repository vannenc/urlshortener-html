jQuery(function(){

    $('form#form-create').on('submit', function(e){

        var url = $('input#url-text');
        var errorsContainer = $('div#errors');
        var successContainer = $('div#success');
        var overlay = $('#overlay');

        if(url.val().length == 0){
            errorsContainer.append('<p>Please enter a url.<p>');
            errorsContainer.fadeIn(500);

            e.preventDefault();
            return false;
        }

        errorsContainer.fadeOut(100);
        overlay.fadeIn(300);

        $.ajax({
            'url' : 'http://localhost:8000/create',
            'type' : 'get',
            'dataType' : 'jsonp',
            'data' : {'url' : url.val(), 'format' : 'js'},

            'error': function(xhr, textstatus, error){
                errorsContainer.html('');
                overlay.fadeOut(100);
                errorsContainer.append('<p>An error has occured. Please try again.<p>');
                errorsContainer.fadeIn(500);
            },

            'success': function(data,textStatus,jqXHR){


                overlay.fadeOut(100);

                if(data.error != ''){
                    successContainer.hide();
                    
                    errorsContainer.html('');
                    overlay.fadeOut(100);
                    errorsContainer.append('<p>' + data.error +'<p>');
                    errorsContainer.fadeIn(500);

                }else{
                    successContainer.find('input').val(data.tiny);
                    successContainer.fadeIn(300);
                }

            }


        });

        e.preventDefault();
        return false;
    });
});