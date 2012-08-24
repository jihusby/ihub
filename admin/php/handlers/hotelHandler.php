<?php

require ("model/hotel.php");

class hotelHandler implements genericContentHandler {
    
    public function getPageContentFromJSON($json) {
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
    
    private function getHotelFromJsonArray($list) {
        $hotel = new hotel();
        foreach ($list as $key => $value){ 
            if($key === "item0"){
                $hotel->set_id($value);
            }else if($key === "item1"){
                $hotel->set_header($value);
            }else if($key === "item2"){
                $hotel->set_ingress($value);
            }else if($key === "item3"){
                $hotel->set_content($value);
            }else if($key === "item4"){
                $hotel->set_footer($value);
            }
        }
        return $hotel;
    }
    
    private function getFormattedHotel($hotel){
        $result = $result . formElementUtils::getHiddenField('hotelid', $hotel->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "hotel1", "stdField", $hotel->get_header()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "hotel2", "stdBigArea", stringUtils::htmlToText($hotel->get_ingress())) . "</td></tr>";        
        $result = $result . formElementUtils::getTextAreaSection("Hovedtekst", "hotel3", "stdHugeArea", stringUtils::htmlToText($hotel->get_content())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Undertekst", "hotel4", "stdField", $hotel->get_footer()) . "</td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
