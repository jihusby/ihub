<?php

class dataManager {
    
    var $fullTime;
    
    function __construct() {
        $this->fullTime = "";
    }
    
    
    function getJSONFromFormData($formData) {
        $json = "{\n\"items\": [\n";

        $num = 0;
        $children = 0;
        $parents = 0;
        $max = count($formData);
        
        $parentId = 0;
        $childId = 0;

        $firstChild = true;
        foreach ($formData as $key => $value){
            $num++;
            if($this->isItemNextParent($key)) {
                $parents++;
                $parentId = $value;
                $firstChild = true;
                $json = $json . "{\"id\": \"$value\",\n";
            } else if($this->isItemNextChild($key)) {
                $children++;
                $childId = $value;
                if($firstChild === true) {
                    $firstChild = false;
                } else {
                    $json = $json . ",";
                }
                $json = $json . "{\n\"id\": \"$value\",\n";
            } else {
                if(strpos($key, "items") !== false) {
                    // Start of parent
                    $json = $json . "\"items\": [\n";
                    
                }else {
                    if(strpos($key, "id") === false && strpos($key, "end") === false) {
                        $json = $json . $this->getFormattedKeyValuePair($key, $value, $parentId, $childId, $children, $parents);
                    }
                    if (strpos($key, "end") !== false) {
                        if($num!==$max){
                            $json = $json . "]},\n";
                        }else {
                            $json = $json . "]\n";
                        }
                    }
                }
            }
        }

        $json = $json . "}\n]\n}";
        return $json;
    }
    
    function getFormDataFromJSON($json){
        $form = "";
        foreach ($json as $key => $value){
            $form = $form . $this->getFormattedCompleteList($value, 1);
        }
        return $form;
    }
    
    private function getFormattedCompleteList($parent, $day){
        $result = "";
        $parentCounter = 0;
        $childCounter = 0;
        $result = $result . ("<div class='w3c'>");
        foreach ($parent as $key => $value){

            // Looping through each day
            
            $result = $result . ("<div id='parent" . $value["id"] . "' style='left:10px;'>");
            $result = $result . ("<a href='#parent".$value["id"]."'>".$value["name"]."</a>");
            $result = $result . ("<div class='parentItem' style='left:10px;'>");
            
            foreach ($value as $key2 => $value2){

                // Looping through each parent field
                if($key2 === "id"){
                    $parentCounter ++;
                    $result = $result . $this->getHiddenField('parentId'.$parentCounter, $value2);
                }else if($key2 === "name") {
                    $result = $result . $start . $this->getTextField('parent'.$key2.$parentCounter, "stdField", $value2) . $end;    
                }else if($key2 === "ingress") {
                    $result = $result . $start . $this->getTextArea('parent'.$key2.$parentCounter, "stdSmallArea", $value2) . $end;    
                }else {
                    $result = $result . $this->getHiddenField('parent'.$key2.$parentCounter, $value2);
                }
                foreach ($value2 as $key3 => $value3){
                    list($children, $childResult) = $this->getFormattedChild($value3, $childCounter);
                    $result = $result . $childResult;
                    $childCounter = $children;
                }

            }
            $result = $result . $this->getHiddenField('end'.$childCounter, 'true');
            $result = $result . "</div></div><p>";
            $i ++;
            $day ++;
        }
        $result = $result . "</div><p>";
        return $result;
    }
    
    private function getFormattedChild($child, $counter){
        $result = "";
        // Looping through each child
        $result = $result . "<div class='sectionItem'>";
        foreach ($child as $key => $value){
            
            if($key === "id"){
                $counter ++;
                $result = $result . $this->getHiddenField('childId'.$counter, $value);
            }else {
                $start = ("<div style='width:100px; left:50px;'>$key</div><div style='width:400px; left:120px;'>");
                $end = ("</div>");
                if($key === "name"){
                    $result = $result . $start . $this->getTextField($key.$counter, "stdField", $value) . $end;
                }
                else if($key === "start"){
                    //$value = date("d.m.Y", ($value/1000));
                    $result = $result . $start . $this->getTextField($key.$counter, "stdSmallField", $value) . "<a href='javascript:viewcalendar(\"$key$counter\")'><img src='../resources/images/calendar.png' style='width:22px; height:22px; vertical-align:text-bottom;'></a>&nbsp;";
                }
                else if($key === "startTime"){
                    $result = $result . $this->getTextField($key.$counter, "stdSmallField", $value) . $end;
                }

                else if($key === "ingress"){
                    $result = $result . $start . $this->getTextArea($key.$counter, "stdSmallArea", $value) . $end;
                }
                else if($key === "description"){
                    $result = $result . $start . $this->getTextArea($key.$counter, "stdBigArea", $this->htmlToText($value)) . $end;
                    $result = $result . "</div><br>";
                }
                else {
                    $result = $result . $this->getHiddenField($key.$counter, $value);
                }
            }
        }
        
        return array ($counter, $result);
    }
    
    private function getTextField($name, $class, $value){
        return "<input class='$class' type=text name='$name' id='$name' value='$value'></input><p>";
    }

    private function getTextArea($name, $class, $value){
        return "<textarea class='$class' name='$name' id='$name'>$value</textarea>";
    }

    private function getHiddenField($name, $value){
        return "<input type=hidden name='$name' id='$name' value='$value'></input>";
    }
    
    private function getFormattedKeyValuePair($key, $value, $parentId, $childId, $children, $parents){
        $result = "";
        $key = str_replace($childId, "", $key);
        $key = str_replace($parentId, "", $key);
        $key = str_replace("parent", "", $key);
        $key = str_replace("child", "", $key);
        $key = str_replace(strval($children), "", $key);
        $key = str_replace(strval($parents), "", $key);
        if($key === "start"){
            $result = $result . "\"" . "start" . "\": \"$value\",\n";
            $this->fullTime = strtotime($value)*1000; 
        }else if($key=="startTime"){
            $this->fullTime += ($this->hourMinuteToSeconds($value)); 
            $result = $result . "\"" . "timestamp" . "\": \"$this->fullTime\",\n";
            $result = $result . "\"" . "startTime" . "\": \"$value\",\n";
        }else if($key=="timestamp"){
            
        }else {
            
            $result = $result . "\"" . $key . "\": \"" . $this->textToHtml($value) . "\"";
            if(strpos($key, "leaf") !== false) {@
                $result = $result . "\n}";
            }else {
                $result = $result . ",\n";
            }
        }

        return $result;
        
    }
    
    private function isItemNextParent($key){
        return strpos($key, "parentId") !== false;
    }
    
    private function isItemNextChild($key){
        return strpos($key, "childId") !== false;
    }
    
    private function hourMinuteToSeconds($value) {
        $result = 0;
        $hours = substr($value, 0, 2);
        $minutes = substr($value, 4, 2);
        return ($hours*3600) + ($minutes*60);
    }
    
    private function htmlToText($value) {
        return str_replace("<br>", "\n", trim($value));
    }

    private function textToHtml($value) {
        return preg_replace('/\r\n/', '<br>', trim($value));
    }
    
}

?>
