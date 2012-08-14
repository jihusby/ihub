<?php

class stringUtils {

    public function __construct() {

    }
    
    public static function htmlToText($value) {
        return $value;
        //return str_replace("<br>", "\n", $value);
    }

    public static function textToHtml($value) {
        return $value;
        //$value2 = $this->parse($value);
        //return preg_replace('\r\n', '<br>', $value);
    }
    
    
}

?>
