<?php

require ("model/travel.php");

class travelHandler implements genericContentHandler {
    
    public function getPageContentFromJSON($json) {
        $result = "";
        $result = $result . '<div class="mainColFixed" id="travel" style="display: none">';
        $result = $result . '<div class="mainSubCol">';
        $result = $result . '<div id="travel_form">';
        $result = $result . '<form name="travel" id="travel" action="" disabled>';
        foreach ($json as $key => $value){
            $travel = $this->getTravelFromJsonArray($value);
            $result = $result . $this->getFormattedTravel($travel);
        }
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div></div>';
        return $result;
    }
    
    public function getJSONFromPostData($postData) {
        $json = "[\n{";
        $firstChild = true;
        foreach ($postData as $key => $value){
            if($key!=="?meta" && $key!=="tab" && strpos($key, "btn") !== true){
                if(!$firstChild){
                    $json = $json . ",\n";
                }
                $json = $json . "\"" . $key . "\": \"" . stringUtils::textToHtml($value) . "\"";
                $firstChild = false;
            }
        }
            
        $json = $json . "}\n]";
        return $json;
    }
    
    private function getTravelFromJsonArray($list) {
        $travel = new travel();
        foreach ($list as $key => $value){            
            if($key === "item0"){
                $travel->set_id($value);
            }else if($key === "item1"){
                $travel->set_header($value);
            }else if($key === "item2"){
                $travel->set_content($value);
            }else if($key === "item3"){
                $travel->set_mapHeader($value);
            }else if($key === "item4"){
                $travel->set_map($value);
            }
        }
        return $travel;
    }
    
    private function getFormattedTravel($travel){
        $result = $result . formElementUtils::getHiddenField('travel0', $travel->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "travel1", "stdField", $travel->get_header()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Reisebeskrivelse", "travel2", "stdHugeArea", stringUtils::htmlToText($travel->get_content())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Kart", "travel3", "stdMediumField", $travel->get_mapHeader());
        $result = $result . formElementUtils::getTextField("travel4", "stdSmallField", $travel->get_map()) . "&nbsp;<a name='travelmap' id='travelmap' target='_new' href='../../resources/images/maps/".$travel->get_map()."'>Vis bilde</a></td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
