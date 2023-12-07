<?php

namespace Maruf89\PrieMuses\Includes;

class NonceGenerator {

    /** @var string */
    private $nonce;

    private static ?NonceGenerator $instance = null;

    private function __construct() {
        // Private constructor to prevent instantiation outside the class.
    }

    /**
     * Get the singleton instance of the class.
     *
     * @return NonceGenerator
     */
    public static function get_instance(): NonceGenerator {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Generates a random nonce parameter.
     *
     * @return string
     */
    public function get_nonce(): string {
        // Generation occurs only when $this->nonce is still null
        if (!$this->nonce) {
            $this->nonce = base64_encode(random_bytes(20));
        }

        return $this->nonce;
    }

    /**
     * Add nonce to the script tag.
     *
     * @param string $tag
     * @param string $handle
     * @param string $source
     *
     * @return string
     */
    public function add_nonce_to_script(string $tag, string $handle, string $source): string {
        $nonce = $this->get_nonce();

        $tag = preg_replace_callback(
            '/(src=\'[^\']+\')/',
            function ($matches) use ($nonce) {
                return $matches[0] . ' nonce="' . esc_attr($nonce) . '"';
            },
            $tag
        );

        return $tag;
    }
}
