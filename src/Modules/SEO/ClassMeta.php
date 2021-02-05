<?php

namespace Maruf89\PrieMuses\Modules\SEO;

class ClassMeta {
    private bool $cd_loaded;
    private array $post_types;
    
    public function __construct( bool $cd_loaded ) {
        $this->cd_loaded = $cd_loaded;
        $this->post_types = apply_filters( 'community_directory_get_post_types', [] );
        $this->taxonomy_types = apply_filters( 'community_directory_get_taxonomy_types', [] );
        foreach ( $this->_get_post_types_to_save_metadata() as $pt )
            add_action( "save_post_$pt", [ $this, 'save_metadata_metaboxes' ] );
    }
    
    public function load_header_meta() {
        global $post;
        $queried_obj = get_queried_object();
        
        if ( is_home() )
            $this->_meta_description( pm_x( 'Prie Musė is a directory for everyone in the Musė River region. It\'s a place for neighbors to barter, trade, to find and offer help, to build and maintain relationships with one another to improve our standard of living.', 'meta_description') );
        else if ( is_tax() )
            $this->do_taxonomy( $queried_obj->taxonomy, $queried_obj );
        else if ( $queried_obj === $post && in_array( $post->post_type, $this->post_types ) )
            $this->do_post_type( $post->post_type, $post );
        else if ( is_singular() )
            $this->_meta_description( $post->post_content, true, true );
        else if ( is_category() )
            $this->_meta_description( category_description(), true );
    }

    public function do_post_type( string $post_type, object $post ) {
        if ( !$this->cd_loaded ) return;

        $acf = '\Maruf89\CommunityDirectory\Includes\ClassACF';

        switch ( $post_type ) {
            case \Maruf89\CommunityDirectory\Includes\ClassOffersNeeds::$post_type:
                $meta = get_post_meta( $post->ID ) ?? [];
                $desc = $meta[ $acf::$offers_needs_description ] ?? [];
                if ( count( $desc ) ) $desc = $meta[ $acf::$offers_needs_description ][ 0 ];
                break;
            case \Maruf89\CommunityDirectory\Includes\ClassLocation::$post_type:
                $desc = $meta[ 'offer_need_description' ] ?? [];
                if ( count( $desc ) ) $desc = $meta[ 'offer_need_description' ][ 0 ];
                else $desc = sprintf( _x( 'Entities, offers, and needs in %s', 'meta_description', 'community-directory' ), $post->post_title );
                break;
            case \Maruf89\CommunityDirectory\Includes\ClassEntity::$post_type:
                $meta = get_post_meta( $post->ID ) ?? [];
                $desc = $meta[ $acf::$entity_about ] ?? [];
                if ( count( $desc ) ) $desc = $meta[ $acf::$entity_about ][ 0 ];
                break;

        }
        $this->_meta_description( $desc, true );
    }

    public function do_taxonomy( string $tax, \WP_Term $term ) {
        if ( !$this->cd_loaded || !in_array( $tax, $this->taxonomy_types ) ) return;

        $desc = '';

        switch ( $tax ) {
            case \Maruf89\CommunityDirectory\Includes\TaxonomyLocation::$taxonomy:
                $desc = sprintf( _x( 'Search entities, offers, and needs in %s', 'meta_description', 'community-directory' ), $term->name );
                break;
            case \Maruf89\CommunityDirectory\Includes\TaxonomyProductService::$taxonomy:
                $desc = sprintf( _x( 'Search Offers and Needs of Product Service Type - %s', 'meta_description', 'community-directory' ), $term->name );
                break;
        }

        $this->_meta_description( $desc );
    }

    private function _process_copy( string $copy, bool $is_html = false ):string {
        if ( $is_html ) $copy = strip_shortcodes( strip_tags( $copy ) );
        $copy = str_replace( array("\n", "\r", "\t"), ' ', $copy );
        return mb_substr( trim( $copy ), 0, 300, 'utf8' );
    }

    private function _meta_description( string $copy, bool $process = false, bool $is_html = false ) {
        if ( empty( $copy ) ) return;
        if ( $process ) $copy = $this->_process_copy( $copy, $is_html );
        echo '<meta name="description" content="' . $copy . '" />' . "\n";
    }

    /**
     * Adds meta_description meta boxes to post types
     */
    public function add_metadata_metaboxes() {
        $post_types = $this->_get_post_types_to_save_metadata();

        foreach ( $post_types as $pt ) {
            add_meta_box(
                'meta_description',
                pm__( 'Meta Description' ),
                [ $this, 'add_metadata_metaboxes_callback'],
                $screen
            );
        }
    }

    public function save_metadata_metaboxes( int $post_id, object $post, bool $update ) {
        // Check if our nonce is set.
        if ( ! isset( $_POST['meta_description_nonce'] ) )
            return;

        // Verify that the nonce is valid.
        if ( ! wp_verify_nonce( $_POST['meta_description_nonce'], 'meta_description_nonce' ) )
            return;

        // If this is an autosave, our form has not been submitted, so we don't want to do anything.
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
            return;

        // Check the user's permissions.
        if ( isset( $_POST['post_type'] ) && 'page' == $_POST['post_type'] )
            if ( ! current_user_can( 'edit_page', $post_id ) )
                return;
        else if ( ! current_user_can( 'edit_post', $post_id ) )
            return;

        /* OK, it's safe for us to save the data now. */

        // Make sure that it is set.
        if ( ! isset( $_POST['meta_description'] ) )
            return;

        // Sanitize user input.
        $my_data = sanitize_text_field( $_POST['meta_description'] );

        // Update the meta field in the database.
        update_post_meta( $post_id, '_meta_description', $my_data );
    }

    public function add_metadata_metaboxes_callback( $post ) {
        // Add a nonce field so we can check for it later.
        wp_nonce_field( 'meta_description_nonce', 'meta_description_nonce' );

        $value = get_post_meta( $post->ID, '_meta_description', true );

        echo '<textarea style="width:100%" id="meta_description" name="meta_description">' . esc_attr( $value ) . '</textarea>';
    }

    private function _get_post_types_to_save_metadata():array {
        $post_types = $this->post_types;
        if ( $this->cd_loaded &&
             ( $index = array_search( \Maruf89\CommunityDirectory\Includes\ClassOffersNeeds::$post_type, $post_types ) !== false)
        ) unset( $post_types[ $index ] );

        // Add metabox to pages as well
        array_push( $post_types, 'page' );
        return $post_types;
    }
}