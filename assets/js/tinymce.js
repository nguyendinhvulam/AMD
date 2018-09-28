tinymce.init({
    mode : "specific_textareas",
    theme: "modern",
    mobile: {
    theme: 'mobile',
        plugins: [ 'autosave', 'lists', 'autolink' ]
    },
    editor_selector : "mceEditor",
    entity_encoding : "raw",
    relative_urls: false,
    convert_urls : false,
    remove_script_host: false,
    plugin_preview_width: 696,
    height: 300,
    image_advtab: true,
    image_caption: true,
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media save table contextmenu moxiecut",
        "directionality emoticons paste textcolor"
    ],
    // content_css: site_url + "assets/css/tiny_content.css",
    content_css: "../../assets/css/tiny_content.css",
    toolbar: "undo redo | styleselect | fontselect fontsizeselect | forecolor backcolor emoticons | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media insertfile | print preview fullscreen | code"
});