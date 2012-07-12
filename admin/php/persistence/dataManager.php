<?php

require ("persistence/session.php");
require ("persistence/conferenceDay.php");
require ("persistence/conference.php");
require ("persistence/info.php");

class dataManager {
    
    var $conferenceDay;
    var $conference;
       
    function __construct() {
        $this->conferenceDay = new conferenceDay();
        $this->conference = new conference();
    }
    
    function getHotelInfo($json){
        $result = "";
        $result = $result . '<div class="mainCol" id="hotel" style="display: block">';
        $result = $result . '<div class="mainSubCol">This is the hotel info</div>';
        foreach ($json as $key => $value){
            
        }
        $result = $result . '</div>';
        return $result;
    }
    function getConferenceInfo($json){
        $result = "";
        $result = $result . '<div class="mainCol" id="conference" style="display: none">';
        $result = $result . '<div class="mainSubCol">';
        foreach ($json as $key => $value){
            $info = $this->getInfoFromJsonArray($value);
            $result = $result . $this->getFormattedInfo($info);
        }
        $result = $result . '</div></div>';
        return $result;
    }

    private function getFormattedInfo($info){
        $result = $result . "<table>";
        $result = $result . $this->getTextFieldSection("Overskrift", "header", "stdField", $this->htmlToText($info->get_header())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("Ingress", "ingress", "stdBigArea", $this->htmlToText($info->get_ingress())) . "</td></tr>";        
        $result = $result . $this->getTextAreaSection("Tekst 1", "content1", "stdHugeArea", $this->htmlToText($info->get_content1())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("Tekst 2", "content2", "stdHugeArea", $this->htmlToText($info->get_content2())) . "</td></tr>";
        $result = $result . "</table>";
        return $result;
    }

    private function getInfoFromJsonArray($list) {
        $info = new info();
        foreach ($list as $key => $value){            
            if($key === "id"){
                $info->set_id($value);
            }else if($key === "header"){
                $info->set_header($value);
            }else if($key === "ingress"){
                $info->set_ingress($value);
            }else if($key === "content1"){
                $info->set_content1($value);
            }else if($key === "content2"){
                $info->set_content2($value);
            }else if($key === "footer"){
                $info->set_footer($value);
            }
        }
        return $info;
    }
    
    
    function getConferenceForm($json){
        $result = "";
        $result = $result . '<div class="mainCol" id="agenda" style="display: none">';
        $result = $result . '<input type="hidden" name="post" value="true">';
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
        $result = $result . '</div>';

        return $result;
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
                }else if($key === "timestamp"){
                    $session->set_timestamp($value);
                }else if($key === "name"){
                    $session->set_name($value);
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
        $result = $result . $this->getHiddenField('id'.$sessionCounter, $session->get_id());
        $result = $result . "<table>";
        $result = $result . $this->getLabel("Tidspunkt") . $this->getTextField("start".$sessionCounter, "stdSmallField", $session->get_start()) . "<a href='javascript:viewcalendar(\"start".$sessionCounter."\")'><img src='../resources/images/calendar.png' style='width:22px; height:22px; vertical-align:text-bottom;'></a>&nbsp;";
        $result = $result . $this->getTextField("startTime".$sessionCounter, "stdSmallField", $session->get_startTime()) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("Navn", "name".$sessionCounter, "stdField", $this->htmlToText($session->get_name())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("Ingress", "ingress".$sessionCounter, "stdSmallArea", $this->htmlToText($session->get_ingress())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("Beskrivelse", "description".$sessionCounter, "stdBigArea", $this->htmlToText($session->get_description())) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("Sted", "place".$sessionCounter, "stdField", $session->get_place()) . "</td></tr>";
        $result = $result . "</table><br>";
        
        return $result;
    }
    
    private function getTextFieldSection($label, $name, $class, $value){
        if($label!==null){
            return $this->getLabel($label)."<input class='$class' type='text' name='$name' id='$name' value='$value' />";
        }
        return "<input class='$class' type='text' name='$name' id='$name' value='$value' />";
    }

    private function getTextField($name, $class, $value){
        return "<input class='$class' type='text' name='$name' id='$name' value='$value' />";
    }

    
    private function getTextAreaSection($label, $name, $class, $value){
        return $this->getLabel($label)."<textarea class='$class' name='$name' id='$name'>$value</textarea>";
    }

    private function getHiddenField($name, $value){
        return "<input type=hidden name='$name' id='$name' value='$value'></input>";
    }
    
    private function getLabel($label){
        return "<tr><td class='keyCell'>".$label."</td><td class='valueCell'>";
    }
    

    function getJSONFromFormData($formData) {
        $json = "{\n\"items\": [\n";
        $num = -1;
        $firstChild = true;
        $fullTime = "";
        foreach ($formData as $key => $value){
            if($key!=="post" && $key!=="tab"){
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
                    $json = $json . "\"" . $key . "\": \"" . $this->textToHtml($value) . "\"";
                }
                $firstChild = false;
            }
        }
            
        $json = $json . "}\n]\n}";
        
        return $json;
    }
    
    
    private function hourMinuteToSeconds($value) {
        $hours = substr($value, 0, 2);
        $minutes = substr($value, 4, 2);
        return ($hours*3600) + ($minutes*60);
    }
    
    private function htmlToText($value) {
        return str_replace("<br>", "\n", trim($value));
    }

    private function textToHtml($value) {
        return preg_replace('/\r\n/', '<p><p>', trim($value));
    }
    
}

?>
