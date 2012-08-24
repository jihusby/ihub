<?php

require ("model/info.php");

class infoHandler implements genericContentHandler {
    
    public function getPageContentFromJSON($json) {
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
    
    private function getInfoFromJsonArray($list) {
        $info = new info();
        foreach ($list as $key => $value){            
            if($key === "item0"){
                $info->set_id($value);
            }else if($key === "item1"){
                $info->set_header($value);
            }else if($key === "item2"){
                $info->set_ingress($value);
            }else if($key === "item3"){
                $info->set_content($value);
            }else if($key === "item4"){
                $info->set_mapHeader($value);
            }else if($key === "item5"){
                $info->set_map($value);
            }
        }
        return $info;
    }
    
    private function getFormattedInfo($info){
        $result = $result . formElementUtils::getHiddenField('info0', $info->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "info1", "stdField", $info->get_header()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "info2", "stdBigArea", stringUtils::htmlToText($info->get_ingress())) . "</td></tr>";        
        $result = $result . formElementUtils::getTextAreaSection("Hovedtekst", "info3", "stdHugeArea", stringUtils::htmlToText($info->get_content())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Områdekart", "info4", "stdMediumField", $info->get_mapHeader());
        $result = $result . formElementUtils::getTextField("info5", "stdSmallField", $info->get_map()) . "&nbsp;<a name='infomap' id='infomap' target='_new' href='../../resources/images/maps/".$info->get_map()."'>Vis bilde</a></td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
