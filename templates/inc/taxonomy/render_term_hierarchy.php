<?php

use Maruf89\CommunityDirectory\Includes\instances\TermBlock;

/**
 * Recursively renders a TermBlocks of a taxonomy
 * 
 * @property    
 */
function render_term_block(
    TermBlock $term_block,
    int $depth = 0,
    ?TermBlock $parent_block = null,
    ?TermBlock $active_block = null
) {
    $has_children = $term_block->has_children();
    $classes = [ "depth-$depth" ];
    if ( isset( $parent_block ) && $term_block->equals( $parent_block ) )
        $classes[] = 'parent-active';
    if ( isset( $active_block) && $term_block->equals( $active_block ) )
        $classes[] = 'active';
        
    if ( $has_children ) $classes[] = 'has-children';

    ?>
        <div class="term-block <?= implode( ' ', $classes ) ?>">
            <label for="<?= "parent-$term_block->term_id" ?>">
                <?= $term_block->get_link() ?>
            </label>
            <?php if ( $has_children ): ?>
                <input type="checkbox" class="toggle carot" id="<?= "parent-$term_block->term_id" ?>" />
                <div class="parent">
                    <?php foreach ( $term_block->children() as $tb )
                        render_term_block( $tb, $depth + 1, $parent_block, $active_block ) ?>
                </div>
            <?php endif; ?>
        </div>
    <?php
}