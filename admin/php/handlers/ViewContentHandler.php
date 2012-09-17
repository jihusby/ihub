<?php

require ("model/viewContent.php");

class viewContentHandler {
    
    public function getPageContentFromJSON($json, $view, $display) {
        $result = "";
        $result = $result . '<div class="mainColFixed" id="'.$view.'" style="display: '.$display.'">';
        $result = $result . '<div class="mainSubCol">';
        $result = $result . '<div id="'.$view.'_form">';
        $result = $result . '<form name="'.$view.'" id="'.$view.'" action="">';
        foreach ($json as $keys => $items){
            foreach ($items as $key => $value){
                $content = $this->getViewContentFromJsonArray($value);
                $result = $result . $this->getFormattedContent($content, $view);
            }
        }
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div></div>';
        return $result;
    }
    
    public function getJSONFromPostData($postData) {
        $json = "{\"items\": [\n{\n\"id\": \"1\",\n";
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
            
        $json = $json . "}\n]}";
        
        return $json;
    }
    
    private function getViewContentFromJsonArray($list) {
        $content = new viewContent();
        foreach ($list as $key => $value){ 
            if($key === "item0"){
                $content->set_item0($value);
            }else if($key === "item1"){
                $content->set_item1($value);
            }else if($key === "item2"){
                $content->set_item2($value);
            }else if($key === "item3"){
                $content->set_item3($value);
            }
        }
        return $content;
    }
    
    private function getFormattedContent($content ,$meta){
        $result = $result . formElementUtils::getHiddenField('item'.$meta.'0', $content->get_item0());
        $result = $result . "<table>";
        $result = $result . formElementUtils::getTextFieldSection("Overskrift", "item".$meta."1", "stdField", $content->get_item1()) . "</td></tr>";
        $result = $result . formElementUtils::getTextAreaSection("Ingress", "item".$meta."2", "stdBigArea", stringUtils::htmlToText($content->get_item2())) . "</td></tr>";        
        $result = $result . formElementUtils::getTextAreaSection("Hovedtekst", "item".$meta."3", "stdHugeArea", stringUtils::htmlToText($content->get_item3())) . "</td></tr>";
        $result = $result . "</table>";
        return $result;
    }

}

?>
