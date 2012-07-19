<?php

class pageContent {

    private $contentArray;
    
    function __construct(){
        $this->contentArray = array();
    }
    
    function addContent($new_key, $new_content) {
        $this->contentArray[$new_key] = $new_content;
    }

    function updateContentAt($key, $new_content) {
        $this->contentArray[$key] = $new_content;        
    }

    function getContentAt($key) {
        return $this->contentArray[$key];        
    }
    
}

?>
