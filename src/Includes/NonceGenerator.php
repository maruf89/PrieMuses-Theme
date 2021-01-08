<?php

namespace Maruf89\PrieMuses\Includes;

class NonceGenerator {

    /** @var String|null */
    private $nonce;
    private static NonceGenerator $instance;

    public static function get_instance():NonceGenerator {
        if ( isset( static::$instance ) ) return static::$instance;

        return static::$instance = new NonceGenerator();
    }

    /**
     * Generates a random nonce parameter.
     *
     * @return string
     */
    public function get_nonce():string {
        // generation occurs only when $this->nonce is still null
        if (!$this->nonce) {
            $this->nonce = base64_encode(random_bytes(20));
        }

        return $this->nonce;
    }

    public function add_nonce_to_script( $tag, $handle, $source ):string {
        $nonce_generator = NonceGenerator::get_instance();
        
        $search = '/(src=\'[^\']+\')/';
        $replace = '$1 nonce="' . $nonce_generator->get_nonce() . '"';
        $subject = $tag;

        $output = preg_replace( $search, $replace, $subject);
        return $output;
    }

}