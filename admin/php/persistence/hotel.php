<?php

class hotel {
    
    var $id;
    var $header;
    var $ingress;
    var $content;
    var $footer;
    
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
    function set_ingress($new_ingress){
        $this->ingress = $new_ingress;
    }
    function get_ingress(){
        return $this->ingress;
    }
    function set_content($new_content){
        $this->content = $new_content;
    }
    function get_content(){
        return $this->content;
    }
    function set_footer($new_footer){
        $this->footer = $new_footer;
    }
    function get_footer(){
        return $this->footer;
    }

}

?>
