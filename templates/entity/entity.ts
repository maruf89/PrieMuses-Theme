let $:JQueryStatic;

export default function (_$:JQueryStatic) {
    $ = _$;
    let $el = $('#entityPage');
    if ($el.length) new EntityPage($el);
}

class EntityPage {
    public classes = {
        'body-edit': 'editable'
    };
    
    private els = {
        $parent: null,
        $trigger: null
    };
    
    constructor($parent) {
        this.els.$parent = $parent;
        this.els.$trigger = $('#triggerEdit');

        this.bindElements();
    }

    private bindElements() {
        this.els.$parent.on('click', `#${this.els.$trigger[0].id}`, this.triggerEdit.bind(this));
    }

    public triggerEdit(e:Event) {
        e.preventDefault();
        const enable = true;
        this.els.$parent.toggleClass(this.classes['body-edit'], enable);
        this.els.$parent.find('.field').attr('contenteditable', String(enable));
    }
}