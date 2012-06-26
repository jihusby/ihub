<?php

class storage {
    
    private $conferenceDataFile;

    function __construct() {
        $this->conferenceDataFile = "../../resources/data/data.json";
    }
    
    function getContent(){
        $string = file_get_contents($this->getConferenceDataFile());
        return json_decode($string, true);
    }

    function saveContent($content){
        $fh = fopen($this->getConferenceDataFile(), 'w') or die;
        fwrite($fh, $content);
        fclose($fh);
        return true;
    }
    
    private function getConferenceDataFile(){
        return $this->conferenceDataFile;
    }

}

?>
