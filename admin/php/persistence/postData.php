<?php

    require ("storage.php");

    //$conferenceData = new storage("../../../resources/data/data.json");

    print_r ("javascript:alert(In postData, this is the form result: '.$_POST.');");
    //$fileContent = getJSONFromFormData($_POST);
    
/*
    if($conferenceData->saveContent($fileContent)===true){
        print_r (" Skjemaet er lagret! ");
    }
*/
    function getJSONFromFormData($_POST) {
        $json = "{\n\"items\": [\n";
        $num = -1;
        $firstChild = true;
        $fullTime = "";
        print_r ("displaying ".$_POST."<br>");
        foreach ($_POST as $key => $value){
            print_r("<br>key is " + $key);
            if($key!=="tab" && $key!=="submitter"){
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
    
    
    function hourMinuteToSeconds($value) {
        $hours = substr($value, 0, 2);
        $minutes = substr($value, 4, 2);
        return ($hours*3600) + ($minutes*60);
    }
    
    function htmlToText($value) {
        return str_replace("<br>", "\n", trim($value));
    }

    function textToHtml($value) {
        return preg_replace('/\r\n/', '<p><p>', trim($value));
    }
  
?>
