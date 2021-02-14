
<div class="field-recipient <?= $entity->share_location() ? '' : 'empty' ?>"
     data-field-type="boolean"
     data-behavior="visibility"
     data-key="<?= $cdAcf::$entity_share_loc_key ?>"
>
    <div class="hide-parent-if-empty <?= empty( $entity->get_acf_visit_info() ) ? 'empty-field' : '' ?>">
        <h3><?= pm__( 'Visiting Information' ) ?></h3>
        <p class="visit-info mb-3 field-recipient"
           data-field-type="text"
           data-key="<?= $cdAcf::$entity_visit_info_key ?>">
            <?= $entity->get_acf_visit_info(); ?>
        </p>
    </div>
        
    <div class="row mb-5 map-row">
        <div class="col-12">
            <?php do_shortcode( "[community_directory_list_entities type='map' entity_id='$post->ID' ]" ); ?>
        </div>
    </div>
</div>