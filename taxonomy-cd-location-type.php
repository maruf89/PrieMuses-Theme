<?php
    use Maruf89\CommunityDirectory\Includes\TaxonomyLocation;

    load_from_templates(
        'taxonomy/categories',
        [ 'term' => $term, 'source' => TaxonomyLocation::class ],
        true
    );
?>