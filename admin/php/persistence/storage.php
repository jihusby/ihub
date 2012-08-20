<?php

class storage {
    
    public function __construct() {
    }
    
    public static function getContent($file){
        try {
            $string = file_get_contents($file);
            return json_decode($string, true);
        } catch (Exception $e) {
            return false;
        }
    }

    public static function saveContent($file, $content){
        try {
            $fh = fopen($file, 'w') or die;
            fwrite($fh, $content);
            fclose($fh);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
    
}

?>
