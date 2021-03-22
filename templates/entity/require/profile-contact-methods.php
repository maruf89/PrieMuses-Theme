<?php
    /** Iterates through the link types and generates them */
    $fields = array(
        'email' => [
            '__' => 'Contact Email',
            'link_prepend' => 'mailto:',
        ],
        'tel' => [
            '__' => 'Contact Telephone',
            'link_prepend' => 'tel:',
        ],
        'website' => [
            '__' => 'Website',
            'attrs' => [ 'target="_blank"' ]
        ],
        'facebook' => [
            '__' => 'Facebook',
            'attrs' => [ 'target="_blank"' ]
        ],
        'youtube' => [
            '__' => 'YouTube',
            'attrs' => [ 'target="_blank"' ]
        ]
    );
?>

<section class="p-contact-methods">
    <div class="section-row">
        <h2><?= __( 'Preferred Method of Contact', 'community-directory' ) ?></h2>
        <p class="field-recipent"
           data-field-type="text"
           data-key="<?= $cdAcf::$entity_contact_method_key ?>"
        >
            <?= $entity->get_acf_contact_method() ?>
        </p>
    </div>

    <?php foreach ( $fields as $key => $val ): ?>
        <?php
            $get = "get_acf_${key}";
            $acf_key = "entity_${key}_key";
            $value = $entity->$get();
            $row_class = empty( $value ) ? 'empty-field' : '';

            $link_prepend = $attrs = '';
            if ( is_array( $val ) ) {
                $translation_key = $val[ '__' ];
                $link_prepend = $val[ 'link_prepend' ] ?? '';
                if ( is_array( $val[ 'attrs' ] ) ) $attrs = implode( ' ', $val[ 'attrs' ] );
            } else $translation_key = $val;
            
        ?>
        <div class="section-row <?= $row_class ?> hide-parent-if-empty">
            <b><?= __( $translation_key, 'community-directory' ) ?>:</b> 
            <a href="<?= $link_prepend . $entity->$get(); ?>"
               <?= $attrs ?>
               data-link-prepend="<?= $link_prepend ?>"
               data-field-type="link"
               data-key="<?= $cdAcf::${$acf_key} ?>"
               class="field-recipient">
                <?= $entity->$get(); ?>
            </a>
        </div>
    <?php endforeach; ?>
</section>