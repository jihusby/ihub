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
            if($key === "id"){
                $travel->set_id($value);
            }else if($key === "header"){
                $travel->set_header($value);
            }else if($key === "ingress"){
                $travel->set_ingress($value);
            }else if($key === "content1"){
                $travel->set_content1($value);
            }else if($key === "content2"){
                $travel->set_content2($value);
            }else if($key === "mapHeader"){
                $travel->set_mapHeader($value);
            }else if($key === "map"){
                $travel->set_map($value);
            }
        }
        return $travel;
    }
    
    private function getFormattedTravel($travel){
        $result = $result . formElementUtils::getHiddenField('travelid', $travel->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "travelheader", "stdField", $travel->get_header()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "travelingress", "stdBigArea", stringUtils::htmlToText($travel->get_ingress())) . "</td></tr>";        
        $result = $result . formElementUtils::getTextAreaSection("Tekst 1", "travelcontent1", "stdHugeArea", stringUtils::htmlToText($travel->get_content1())) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Tekst 2", "travelcontent2", "stdHugeArea", stringUtils::htmlToText($travel->get_content2())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Områdekart", "travelmapHeader", "stdMediumField", $travel->get_mapHeader());
        $result = $result . formElementUtils::getTextField("travelmap", "stdSmallField", $travel->get_map()) . "&nbsp;<a name='maplink' id='maplink' target='_new' href='../../resources/images/maps/".$travel->get_map()."'>Vis bilde</a></td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
