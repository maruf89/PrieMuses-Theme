<?php
    use  Maruf89\PrieMuses\Includes\CommunityDirectoryHelper as CD;

    CD::plugin_required_page( true );

    load_from_templates(
        'inc/taxonomy/categories',
            [ 'term' => $term, 'source' => CD::get('TaxonomyProductService') ],
        true
    );
?>