<?php

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
    public function get_nonce() : String
    {
        // generation occurs only when $this->nonce is still null
        if (!$this->nonce) {
            $this->nonce = base64_encode(random_bytes(20));
        }

        return $this->nonce;
    }

}