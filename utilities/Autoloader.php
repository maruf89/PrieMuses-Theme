<?php

class Autoloader {
    static public function loader($path) {
        $filename = get_template_directory().'/src/'.str_replace("\\", '/', $path).".php";

        if (file_exists($filename)) {
            include($filename);
            $aClass = explode('\\', $path);
            $className = array_pop($aClass);           
            if (class_exists($className)) {
                return TRUE;
            }
        }
        return FALSE;
    }
}

spl_autoload_register('Autoloader::loader');