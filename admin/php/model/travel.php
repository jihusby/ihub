<?php

class travel {
    
    var $id;
    var $header;
    var $content;
    
    function set_id($new_id){
        $this->id = $new_id;
    }
    function get_id(){
        return $this->id;
    }
    function set_header($new_header){
        $this->header = $new_header;
    }
    function get_header(){
        return $this->header;
    }
    function set_content($new_content){
        $this->content = $new_content;
    }
    function get_content(){
        return $this->content;
    }
}

?>
