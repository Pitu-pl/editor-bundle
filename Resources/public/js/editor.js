$(function() {
    $('.wysihtml5-image-file').change(function(){
        console.log('validation');
        var file = this.files[0];
        name = file.name;
        size = file.size;
        type = file.type;
        //Your validation
    });
    $('.wysihtml5-image-upload-button').click(function(){
        console.log('upload image clicked');
        window['uploadEditorId'] = $(this).closest('.wysihtml5-toolbar').attr('data-id');
        var fileElement = $(this).closest('[data-wysihtml5-dialog]').find('input[type=file]')[0];
        var formData = new FormData();
        formData.append('image[file]', fileElement.files[0], 'file');

        $.ajax({
            url: Routing.generate('_image_upload_request'),  //Server script to process data
            type: 'post',
            xhr: function() {  // Custom XMLHttpRequest
                var myXhr = $.ajaxSettings.xhr();
                if(myXhr.upload){ // Check if upload property exists
                    myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
                }
                return myXhr;
            },
            //Ajax events
            beforeSend: beforeSendHandler,
            success: completeHandler,
            error: errorHandler,
            // Form data
            data: formData,
            //Options to tell jQuery not to process data or worry about content-type.
            cache: false,
            contentType: false,
            processData: false
        });
    });

});

function beforeSendHandler(e) {
    console.log('before', e);
}

function completeHandler(e) {
    console.log('complete', e);
    var toolbarId = window['uploadEditorId'] + '-wysihtml5-toolbar';
    var toolbar = $('#' + toolbarId);
    var editorId = 'editor-' + window['uploadEditorId'];
    var composer = window[editorId].composer;
    var imageUrl = location.protocol + '//' + location.host + e.image.url;
    composer.focus();
    wysihtml5.commands.insertImage.exec(composer, 'insertImage', imageUrl);
    var dialogElement = $('div[data-wysihtml5-dialog="insertTheCodeineImage"]', toolbar)[0];
    console.log(dialogElement);
    var link = $('[data-wysihtml5-command="insertTheCodeineImage"]', toolbar)[0];
    console.log(link);
    $('div[data-wysihtml5-dialog="insertTheCodeineImage"]').find('input[type="file"]').each(function(){$(this).val('')});
    $('[data-wysihtml5-dialog="insertTheCodeineImage"] [data-wysihtml5-dialog-action=cancel]', toolbar).trigger('click');
//    window[editorId].fire("cancel:dialog", { command: 'insertTheCodeineImage', dialogContainer: dialogElement, commandLink: link });
}

function errorHandler(e) {
    console.log('error', e);
    alert('Wystąpił błąd podczas wysyłania pliku na serwer');
}
function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}