let $:JQueryStatic;

export default function (_$:JQueryStatic) {
    $ = _$;
    let $el = $('#entityPage');
    if ($el.length) new EntityPage($el);
}

class EntityPage {
    public classes = {
        'body-edit': 'editable',
        'loading': 'loading',
    };

    public static editHash = '#edit';

    private editEnabled:boolean = false;
    // first time toggling edit
    private firstTime:boolean = true;
    
    private els = {
        $parent: null,
        $profilePhoto: null,
        $form: null,
    };
    
    constructor($parent:JQuery<HTMLElement>) {
        if (!acf) { console.error('Missing ACF js library'); return }
        
        this.els.$parent = $parent;
        this.els.$profilePhoto = $('#profilePhoto');
        this.els.$form = $('#acf-form');

        if (this.els.$form.length) this.bindElements();
    }

    private bindElements() {
        this.els.$parent
            .on('click', '.toggle-edit', this.toggleEdit.bind(this))
            .on('click', '.save-acf-form', this.validateForm.bind(this));
        this.els.$form.off('submit').on('submit', (e) => { e.preventDefault(); });

        if (window.location.hash === EntityPage.editHash)
            this.els.$parent.find('.toggle-edit').first().trigger('click');
    }

    public toggleEdit(e:Event) {
        e.preventDefault();
        this.editEnabled = !this.editEnabled;
        this.els.$parent.toggleClass(this.classes['body-edit'], this.editEnabled);
        window.location.hash = this.editEnabled ? EntityPage.editHash : '';

        this.onFirstTime();
    }

    private dirtifyForm() {
        let acfForm;
        if (acfForm = this.els.$form.data('acf')) acfForm.set('status', null)
    }

    public toggleLoading(isLoading:boolean) {
        this.els.$parent.toggleClass(this.classes.loading, isLoading);
    }

    public validateForm(e:Event) {
        e.preventDefault();
        this.toggleLoading(true);
        this.dirtifyForm();
        let validated = false;
        const onSuccess = this.submitAjax.bind(this);
        return acf.validateForm({
            form: this.els.$form,
            success() {
                validated = true;
                onSuccess();
            },
            complete: function () {
                if (!validated) this.toggleLoading(false);
            }.bind(this)
        });
    }

    private submitAjax() {
        const $form = this.els.$form;
        acf.lockForm($form);
        const formData = acf.prepareForAjax(acf.serialize($form));
        formData.action = 'acf/save_post';
        
        $.ajax({
            url: acf.get('ajaxurl'),
            data: formData,
            type: 'post',
            dataType: 'json',
            context: this,
            success: this.afterSubmit.bind(this),
            error(err) {
                acf.unlockForm($form);
                this.toggleLoading(false);
                alert(err);
            },
        });
    }

    private afterSubmit({ success, slug }) {
        this.toggleLoading(false);
        
        if (!success)
            return alert(pm.translate.form_submission_error);

        const curSlug = this.getCurEntitySlug();
        return window.location.href = window.location.href.replace(curSlug, slug);
    }

    private getCurEntitySlug():string {
        let parts:string[] = window.location.href.split('/').reverse();
        parts.length = 2;
        if (!parts[0]) parts.shift();
        return parts[0];
    }

    private onFirstTime() {
        if (!this.firstTime) return;

        // Change image size of profile picture
        const $profilePicField = getAcfFieldByKey('entity', 'picture_key');
        const $pic = $profilePicField.find('img');
        $pic[0].src = getUnscaledSrc($pic[0].src) || this.els.$profilePhoto.data().defaultPhoto;
        
        this.firstTime = false;
    }
}

export function getAcfFieldByKey(type:string, key:string) {
    const field = cdData.acf[type][key].replace(/_/g, '-');
    const className = `.acf-${field}`;
    console.log('field name', className);
    return jQuery(className);
}

/**
 * Searches through an image src with 'scaled' at its end and removes the scaling after it
 * @param src   string      image src
 * @returns     string      unscaled src
 */
export function getUnscaledSrc(src:string):string {
    const key = 'scaled'
    const scaledKey = key.split('').reverse().join('');
    const srcReversed = src.split('').reverse().join('');
    const reversedIndex = srcReversed.indexOf(scaledKey);
    if (reversedIndex === -1) return '';

    const index = src.length - (reversedIndex + scaledKey.length);
    const pattern = new RegExp(`${key}-[^.]+`);
    const sizeMatch = src.substr(index).match(pattern);
    if (!Array.isArray(sizeMatch)) return '';

    return src.replace(sizeMatch[0], key);

}