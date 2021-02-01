<?php
    use Maruf89\CommunityDirectory\Includes\TaxonomyProductService;

    load_from_templates(
        'taxonomy/categories',
            [ 'term' => $term, 'source' => TaxonomyProductService::class ],
        true
    );
?>