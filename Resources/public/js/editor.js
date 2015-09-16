window.tuna = window.tuna || {};
_.extend(tuna, {
    locale: 'pl',
    website: {},
    backbone: {},
    templates: {},
    view: {
        helpers: {}
    },
    model: {},
    collection: {},
    router: {},
    features: {}
});

/**
 * Wysiwyg editor
 *
 * @type {*|void}
 */
tuna.view.EditorView = Backbone.View.extend({

    initialize: function() {
        var root = this;

        this.divEditorId    = this.$el.attr('id') + '-editor';
        this.$divEditor      = $( '#' + this.divEditorId );
        this.$editorToolbar  = $('div[data-target="#' + this.divEditorId + '"]');

        this.$divEditor
            .html(this.$el.val())
            .show()
            .wysiwyg();

        this.$el.hide();
        this.$editorToolbar.find('input[data-target="#pictureBtn"]').hide();

        this.$divEditor.on('blur', _.bind(this.onEditorChange, this));
        this.$editorToolbar.find('.dropdown-menu input').on('click', function(e){
            e.stopPropagation();
        });
        this.$editorToolbar.find('#pictureBtn').click(function(e) {
            e.preventDefault();
            root.$editorToolbar.find('input[data-target="#pictureBtn"]').trigger('click');
        });

        $('div[data-role="editor-toolbar"] .insertHTML-insertBtn').click(function(e){
            e.preventDefault();
            root._insertHtmlAtCursor($(this).parent().parent().find('.insertHTML-value').val());
            root.onEditorChange();
        });
        $('.insertHTML-value').click(function(e){
            e.preventDefault();
            e.stopPropagation();
        })

        $('input[data-edit="createLink"]').on('keydown', function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                $(this).parent().find('button').click();
                return false;
            }
        })

        //remove bad html when pasting to editor
        $(document).on('paste', '.admin-wysiwyg-editor', function(e) {
            var html = (e.originalEvent || e).clipboardData.getData('text/html') || (e.originalEvent || e).clipboardData.getData('text/plain');

            document.execCommand('insertHTML', false, $.htmlClean(html, {
                format: false,
                replace: [['h1','h3'],'h2'],
                removeAttrs: ['class', 'style', "font"],
                allowedAttributes: ["width", "height","src", "frameborder","allowfullscreen"],
                allowedTags: ['p','i','b','u','strong', 'iframe', "ul", "li"],
                removeTags: ["basefont", "center", "dir", "font", "frame", "frameset", "isindex", "menu", "noframes", "s", "strike","br", "canvas", "hr", "img"],
                allowEmpty: ['iframe'],
                tagAllowEmpty: ['iframe'],
                allowComments: false,
            }));

            root.onEditorChange();
            e.preventDefault();
        })
    },

    onEditorChange: function() {
        this.$el.html( this.$divEditor.html() );
    },

    _insertHtmlAtCursor: function(html) {
        var sel, range;
        var htmlContainer = document.createElement("span");
        htmlContainer.innerHTML = html;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                range.insertNode( htmlContainer );
            } else {
                $('.admin-wysiwyg-editor:eq(0)').append(html);
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().innerHTML = htmlContainer.innerHtml;
        }
    }
});

tuna.website = {
    init: function () {
        $('.thecodeine_admin_editor').each(function(){
            new tuna.view.EditorView({el:  $(this)[0] });
        });
    }
};