<?php

require ("model/session.php");
require ("model/conferenceDay.php");
require ("model/conference.php");


class agendaHandler implements genericContentHandler {
    
    var $totalSessionCount;
       
    function __construct() {
        $this->totalSessionCount = 0;
    }
    
    public function getPageContentFromJSON($json) {
        $result = "";
        $result = $result . '<div class="mainCol" id="agenda" style="display: none">';
        $result = $result . '<div id="agenda_form">';
        $result = $result . '<form name="agenda" id="agenda" action="" disabled>';
        foreach ($json as $key => $value){
            $conference = $this->getConferenceObject($value);
            
            $result = $result . '<section class="tab-area tabs-checked">';
            $result = $result . '<input checked class="radio" type="radio" name="tab" id="tab-A" />';
            $result = $result . '<input class="radio" type="radio" name="tab" id="tab-B" />';
            $result = $result . '<input class="radio" type="radio" name="tab" id="tab-C" />';

            $result = $result . '<label class="tab-link" for="tab-A">Dag 1</label>';
            $result = $result . '<label class="tab-link" for="tab-B">Dag 2</label>';
            $result = $result . '<label class="tab-link" for="tab-C">Dag 3</label>';

            $result = $result . $this->getFormattedConference($conference);
            
            $result = $result . '</section>';
        }
        $result = $result . '<input type="hidden" name="totalSessionCount" id="totalSessionCount" value="'.$this->totalSessionCount.'" />';
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div>';

        return $result;
    }
    
    public function getJSONFromPostData($postData) {
        $json = "{\n\"items\": [\n";
        $num = -1;
        $firstChild = true;
        $fullTime = "";
        foreach ($postData as $key => $value){
            if($key!=="?meta" && $key!=="tab" && strpos($key, "btn") === false){
                print_r($value);
                if(strpos($key, "id") !== false ){ // New session
                    $num++;
                    if(!$firstChild){
                        $json = $json . "\n},\n";
                    }
                    $json = $json . "\n{\n";
                }else{
                    $json = $json . ",\n";
                }
                
                $key = str_replace($num, "", $key);
                
                if($key==="start"){
                    $json = $json . "\"" . "start" . "\": \"$value\"";
                    $fullTime = strtotime($value)*1000; 
                }else if($key==="startTime"){
                    $fullTime += ($this->hourMinuteToSeconds($value)); 
                    $json = $json . "\"" . "startTime" . "\": \"$value\",\n";
                    $json = $json . "\"" . "timestamp" . "\": \"$fullTime\"";
                }
                
                else {                
                    $json = $json . "\"" . $key . "\": \"" . stringUtils::textToHtml($value) . "\"";
                }
                $firstChild = false;
            }
        }
            
        $json = $json . "}\n]\n}";
        
        return $json;
    }
    
    private function getFormattedConference($conference){
        $counter = 0;
        for($i=0; $i<sizeof($conference->get_conferenceDays()); $i++){
            $numOfSessions = sizeof($conference->get_conferenceDayAt($i)->get_sessions());
            $conferenceDay = $conference->get_conferenceDayAt($i); 

            $result = $result . '<article class="tab" style="height: '.($numOfSessions*275).'px">';
            
            for($u=0; $u<sizeof($conferenceDay->get_sessions()); $u++){
                $session = $conferenceDay->get_SessionAt($u);
                $result = $result . $this->getFormattedSession($session, $counter);
                $counter++;
            }
            
            
            $result = $result . '</article>';
        }
        $this->totalSessionCount += $counter;
        return $result;
    }

    
    private function getConferenceObject($list){
        $conferenceDay = new conferenceDay();
        $conference = new conference();
        foreach ($list as $key1 => $value1){
            $session = $this->getSessionFromJsonArray($value1);
            if(($session->get_start() !== $conferenceDay->get_day()) && ($conferenceDay->get_day() !== "")){
                $conference->add_conferenceDay($conferenceDay);
                $conferenceDay = new conferenceDay();
            }
            $conferenceDay->set_day($session->get_start());
            $conferenceDay->add_session($session);
        }
        $conference->add_conferenceDay($conferenceDay);
        return $conference;
    }
    
    private function getSessionFromJsonArray($list) {
        $session = new session();
        foreach ($list as $key => $value){            
                if($key === "id"){
                    $session->set_id($value);
                }else if($key === "start"){
                    $session->set_start($value);
                }else if($key === "startTime"){
                    $session->set_startTime($value);
                }else if($key === "endTime"){
                    $session->set_endTime($value);
                }else if($key === "timestamp"){
                    $session->set_timestamp($value);
                }else if($key === "name"){
                    $session->set_name($value);
                }else if($key === "speaker"){
                    $session->set_speaker($value);
                }else if($key === "ingress"){
                    $session->set_ingress($value);
                }else if($key === "description"){
                    $session->set_description($value);
                }else if($key === "place"){
                    $session->set_place($value);
                }else if($key === "dateCreated"){
                    $session->set_dateCreated($value, false);
                }
            }
        return $session;
    }
    
    private function getFormattedSession($session, $sessionCounter){
        $result = $result . formElementUtils::getHiddenField('id'.$sessionCounter, $session->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getLabel("start".$sessionCounter, "Tidspunkt") . formElementUtils::getTextField("start".$sessionCounter, "stdSmallField", $session->get_start()) . "<a href='javascript:viewcalendar(\"start".$sessionCounter."\")'><img src='../resources/images/calendar.png' style='width:22px; height:22px; vertical-align:text-bottom;'></a>&nbsp;";
        $result = $result . formElementUtils::getTextField("startTime".$sessionCounter, "stdSmallField", $session->get_startTime()) . "";
        $result = $result . formElementUtils::getTextField("endTime".$sessionCounter, "stdSmallField", $session->get_endTime()) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Navn", "name".$sessionCounter, "stdField", $session->get_name()) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Speaker", "speaker".$sessionCounter, "stdField", $session->get_speaker()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "ingress".$sessionCounter, "stdSmallArea", stringUtils::htmlToText($session->get_ingress())) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Beskrivelse", "description".$sessionCounter, "stdBigArea", stringUtils::htmlToText($session->get_description())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Sted", "place".$sessionCounter, "stdField", $session->get_place()) . "</td></tr>";
        $result = $result . "</table><br>";
        
        return $result;
    }
    
    private function hourMinuteToSeconds($value) {
        $hours = substr($value, 0, 2);
        $minutes = substr($value, 4, 2);
        return ($hours*3600) + ($minutes*60);
    }
    

}

?>
