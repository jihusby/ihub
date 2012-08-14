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
    
    private function getFormattedInfo($info){
        $result = $result . formElementUtils::getHiddenField('infoid', $info->get_id());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "infoheader", "stdField", $info->get_header()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "infoingress", "stdBigArea", stringUtils::htmlToText($info->get_ingress())) . "</td></tr>";        
        $result = $result . formElementUtils::getTextAreaSection("Tekst 1", "infocontent1", "stdHugeArea", stringUtils::htmlToText($info->get_content1())) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Tekst 2", "infocontent2", "stdHugeArea", stringUtils::htmlToText($info->get_content2())) . "</td></tr>";
        $result = $result . formElementUtils::getTextFieldSection("Områdekart", "infomapHeader", "stdMediumField", $info->get_mapHeader());
        $result = $result . formElementUtils::getTextField("infomap", "stdSmallField", $info->get_map()) . "&nbsp;<a name='maplink' id='maplink' target='_new' href='../../resources/images/".$info->get_map()."'>Vis bilde</a></td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
