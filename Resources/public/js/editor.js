window.tuna = window.tuna || {};
window.tuna.view = window.tuna.view || {};

/**
 * Wysiwyg editor
 *
 * @type {*|void}
 */
tuna.view.EditorView = Backbone.View.extend({

    summernoteOptions: {
        dialogsInBody: true,
        styleTags: ['h2', 'h3', 'h4', 'p'],
        toolbar: [
            ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']]
        ]
    },
    summernote: null,

    initialize: function(options) {
        this.options = options;
        this.summernote = $(this.options.selector).eq(0).summernote(this.summernoteOptions);

        var oThis = this;
        $('.tabbable [data-toggle="tab"]').click(function(e) {
            if (!$(e.target).parent().hasClass('active')) {
                oThis.summernote.destroy();
                _.defer(function () {
                    oThis.summernote = $(oThis.options.selector).eq(0).summernote(oThis.summernoteOptions);
                });
            }
        });
    }
});