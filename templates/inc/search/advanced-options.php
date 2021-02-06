<div class="aso">
    <div class="row">
        <div class="col-12">
            <h4 class="filter-title"><?= pm__( 'Filters' ) ?></h4>
            <?php load_from_templates( 'inc/taxonomy/categories_lists', [
                'show_count' => false,
                'style' => 'form',
                'input_type' => 'radio',
            ]); ?>
        </div>
    </div>
</div>