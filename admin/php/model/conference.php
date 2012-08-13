<?php

class conference {
    var $conferenceDays = array();
    
    function add_conferenceDay($new_conferenceDay){
        $this->conferenceDays[sizeof($this->conferenceDays)] = $new_conferenceDay;
    }
    
    function get_conferenceDays(){
        return $this->conferenceDays;
    }

    function get_conferenceDayAt($index){
        return $this->conferenceDays[$index];
    }
    
}

?>
