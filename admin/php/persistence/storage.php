<?php

class storage {
    
    public function __construct() {
    }
    
    public static function getContent($file){
        $string = file_get_contents($file);
        return json_decode($string, true);
    }

    public static function saveContent($file, $content){
        $fh = fopen($file, 'w') or die;
        fwrite($fh, $content);
        fclose($fh);
        return true;
    }
    
}

?>
