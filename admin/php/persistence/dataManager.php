<?php

require ("persistence/session.php");
require ("persistence/conferenceDay.php");
require ("persistence/conference.php");
require ("persistence/info.php");
require ("persistence/hotel.php");

class dataManager {
    
    var $conferenceDay;
    var $conference;
    var $totalSessionCount;
       
    function __construct() {
        $this->conferenceDay = new conferenceDay();
        $this->conference = new conference();
        $this->totalSessionCount = 0;
    }
    
    function getHotelInfo($json){
        $result = "";
        $result = $result . '<div class="mainColFixed" id="hotel" style="display: block">';
        $result = $result . '<div class="mainSubCol">';
        $result = $result . '<div id="hotel_form">';
        $result = $result . '<form name="hotel" id="hotel" action="">';
        foreach ($json as $key => $value){
            $hotel = $this->getHotelFromJsonArray($value);
            $result = $result . $this->getFormattedHotel($hotel);
        }
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div></div>';
        return $result;
    }
    
    private function getFormattedHotel($hotel){
        $result = $result . $this->getHiddenField('hotel', 'hotelid', $hotel->get_id());
        $result = $result . "<table>";
        $result = $result . $this->getTextFieldSection("hotel", "Overskrift", "hotelcontent1", "stdField", $hotel->get_header()) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("hotel", "Ingress", "hotelcontent2", "stdBigArea", $this->htmlToText($hotel->get_ingress())) . "</td></tr>";        
        $result = $result . $this->getTextAreaSection("hotel", "Hovedtekst", "hotelcontent3", "stdHugeArea", $this->htmlToText($hotel->get_content())) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("hotel", "Undertekst", "hotelcontent4", "stdField", $hotel->get_footer()) . "</td></tr>";
        $result = $result . "</table>";
        return $result;
    }
    
    private function getHotelFromJsonArray($list) {
        $hotel = new hotel();
        foreach ($list as $key => $value){ 
            if($key === "id"){
                $hotel->set_id($value);
            }else if($key === "content1"){
                $hotel->set_header($value);
            }else if($key === "content2"){
                $hotel->set_ingress($value);
            }else if($key === "content3"){
                $hotel->set_content($value);
            }else if($key === "content4"){
                $hotel->set_footer($value);
            }
        }
        return $hotel;
    }
    
    
    function getConferenceInfo($json){
        $result = "";
        $result = $result . '<div class="mainColFixed" id="info" style="display: none">';
        $result = $result . '<div class="mainSubCol">';
        $result = $result . '<div id="info_form">';
        $result = $result . '<form name="info" id="info" action="" disabled>';
        foreach ($json as $key => $value){
            $info = $this->getInfoFromJsonArray($value);
            $result = $result . $this->getFormattedInfo($info);
        }
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div></div>';
        return $result;
    }

    private function getFormattedInfo($info){
        $result = $result . $this->getHiddenField('info', 'infoid', $info->get_id());
        $result = $result . "<table>";
        $result = $result . $this->getTextFieldSection("info", "Overskrift", "infoheader", "stdField", $info->get_header()) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("info", "Ingress", "infoingress", "stdBigArea", $this->htmlToText($info->get_ingress())) . "</td></tr>";        
        $result = $result . $this->getTextAreaSection("info", "Tekst 1", "infocontent1", "stdHugeArea", $this->htmlToText($info->get_content1())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("info", "Tekst 2", "infocontent2", "stdHugeArea", $this->htmlToText($info->get_content2())) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("info", "Områdekart", "infomapHeader", "stdMediumField", $info->get_mapHeader());
        $result = $result . $this->getTextField("info", "infomap", "stdSmallField", $info->get_map()) . "&nbsp;<a name='maplink' id='maplink' target='_new' href='../../resources/images/".$info->get_map()."'>Vis bilde</a></td></tr>";
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
            }else if($key === "mapHeader"){
                $info->set_mapHeader($value);
            }else if($key === "map"){
                $info->set_map($value);
            }else if($key === "footer"){
                $info->set_footer($value);
            }
        }
        return $info;
    }
    
    
    function getConferenceForm($json){
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
        $result = $result . $this->getHiddenField('agenda', 'id'.$sessionCounter, $session->get_id());
        $result = $result . "<table>";
        $result = $result . $this->getLabel("agenda", "start".$sessionCounter, "Tidspunkt") . $this->getTextField("agenda", "start".$sessionCounter, "stdSmallField", $session->get_start()) . "<a href='javascript:viewcalendar(\"start".$sessionCounter."\")'><img src='../resources/images/calendar.png' style='width:22px; height:22px; vertical-align:text-bottom;'></a>&nbsp;";
        $result = $result . $this->getTextField("agenda", "startTime".$sessionCounter, "stdSmallField", $session->get_startTime()) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("agenda", "Navn", "name".$sessionCounter, "stdField", $this->htmlToText($session->get_name())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("agenda", "Ingress", "ingress".$sessionCounter, "stdSmallArea", $this->htmlToText($session->get_ingress())) . "</td></tr>";
        $result = $result . $this->getTextAreaSection("agenda", "Beskrivelse", "description".$sessionCounter, "stdBigArea", $this->htmlToText($session->get_description())) . "</td></tr>";
        $result = $result . $this->getTextFieldSection("agenda", "Sted", "place".$sessionCounter, "stdField", $session->get_place()) . "</td></tr>";
        $result = $result . "</table><br>";
        
        return $result;
    }
    
    private function getTextFieldSection($type, $label, $name, $class, $value){
        if($label!==null){
            return $this->getLabel($name, $label)."<input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
        }
        return "<label for='$name' id='".$name."_label'>".$label."</label><input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    private function getTextField($type, $name, $class, $value){
        return "<label for='$name' id='".$name."_label'>".$label."</label><input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    
    private function getTextAreaSection($type, $label, $name, $class, $value){
        return $this->getLabel($name, $label)."<textarea class='$class' name='$name' id='$name' onBlur='javascript:saveForm();'>$value</textarea><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    private function getHiddenField($type, $name, $value){
        return "<input type=hidden name='$name' id='$name' value='$value' onBlur='javascript:saveForm();'></input><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }
    
    private function getLabel($name, $label){
        return "<tr><td class='keyCell'><label for='$name' id='".$name."_label'>".$label."</label></td><td class='valueCell'>";
    }
    
    function getJSONFromFormData($formData) {
        $json = "[\n{";
        $firstChild = true;
        foreach ($formData as $key => $value){
            if($key!=="agenda" && $key!=="info" && $key!=="hotel" && $key!=="tab" && strpos($key, "btn") === false){
                if(!$firstChild){
                    $json = $json . ",\n";
                }
                //$json = $json . "\"" . $key . "\": \"" . $this->textToHtml($value) . "\"";
                $json = $json . "\"" . $key . "\": \"" . $this->textToHtml($value) . "\"";
                $firstChild = false;
            }
        }
            
        $json = $json . "}\n]";
        
        return $json;
    }

    function getAgendaJSONFromFormData($formData) {
        $json = "{\n\"items\": [\n";
        $num = -1;
        $firstChild = true;
        $fullTime = "";
        foreach ($formData as $key => $value){
            if($key!=="?agenda" && $key!=="?info" && $key!=="?hotel" && $key!=="tab" && strpos($key, "btn") === false){
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
        return $value;
        //return str_replace("<br>", "\n", trim($value));
    }

    private function textToHtml($value) {
        return $value;
        //$value2 = $this->parse($value);
        //return $this->preg_replace('\n', '<br>', trim($value));
    }
    
    private function parse($text) {
        // Damn pesky carriage returns...
        $text = str_replace("\r\n", "\n", $text);
        $text = str_replace("\r", "\n", $text);

        // JSON requires new line characters be escaped
        $text = str_replace("\n", "\\n", $text);
        return $text;
    }    
    
}

?>
