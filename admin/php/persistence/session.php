<?php

class session {
    
    var $id;
    var $start;
    var $startTime;
    var $name;
    var $timestamp;
    var $ingress;
    var $description;
    var $place;
    var $dateCreated;
    
    function set_id($new_id){
        $this->id = $new_id;
    }
    function get_id(){
        return $this->id;
    }
    function set_start($new_start){
        $this->start = $new_start;
    }
    function get_start(){
        return $this->start;
    }
    function set_startTime($new_startTime){
        $this->startTime = $new_startTime;
    }
    function get_startTime(){
        return $this->startTime;
    }
    function set_name($new_name){
        $this->name = $new_name;
    }
    function get_name(){
        return $this->name;
    }
    function set_timestamp($new_timestamp){
        $this->timestamp = $new_timestamp;
    }
    function get_timestamp(){
        return $this->timestamp;
    }
    function set_ingress($new_ingress){
        $this->ingress = $new_ingress;
    }
    function get_ingress(){
        return $this->ingress;
    }
    function set_description($new_description){
        $this->description = $new_description;
    }
    function get_description(){
        return $this->description;
    }
    function set_place($new_place){
        $this->place = $new_place;
    }
    function get_place(){
        return $this->place;
    }
    function set_dateCreated($new_dateCreated){
        $this->dateCreated = $new_dateCreated;
    }
    function get_dateCreated(){
        return $this->dateCreated;
    }
}

?>
