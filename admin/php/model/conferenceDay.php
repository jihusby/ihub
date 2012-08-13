<?php

class conferenceDay {
    var $day = "";
    var $sessions = array();
    
    
    function set_day($new_day){
        $this->day = $new_day;
    }
    
    function get_day(){
        return $this->day;
    }
    
    function add_session($new_session){
        $this->sessions[sizeof($this->sessions)] = $new_session;
    }
    
    function get_sessions(){
        return $this->sessions;
    }

    function get_sessionAt($index){
        return $this->sessions[$index];
    }
    
}
?>
