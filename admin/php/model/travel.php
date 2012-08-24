<?php

class travel {
    
    var $id;
    var $header;
    var $ingress;
    var $content1;
    var $content2;
    var $mapHeader;
    var $map;
    
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
    function set_content1($new_content1){
        $this->content1 = $new_content1;
    }
    function get_content1(){
        return $this->content1;
    }
    function set_content2($new_content2){
        $this->content2 = $new_content2;
    }
    function get_content2(){
        return $this->content2;
    }
    function set_mapHeader($new_mapHeader){
        $this->mapHeader = $new_mapHeader;
    }
    function get_mapHeader(){
        return $this->mapHeader;
    }
    function set_map($new_map){
        $this->map = $new_map;
    }
    function get_map(){
        return $this->map;
    }
}

?>
