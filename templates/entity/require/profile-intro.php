<h1 class="field-recipient"
    data-field-type="text"
    data-key="<?= $cdAcf::$entity_location_name_key ?>"
>
    <?= $entity->post_title ?>
</h1>
<div class="divider"></div>
<p class="field-recipient"
   data-field-type="html"
   data-key="<?= $cdAcf::$entity_about_key ?>">
    <?= $entity->get_acf_about() ?>
</p>