<?php

class storage {
    
    private $conferenceDataFile;

    function __construct($data) {
        $this->conferenceDataFile = $data;
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
    
    function getConferenceDataFile(){
        return $this->conferenceDataFile;
    }

}

?>
