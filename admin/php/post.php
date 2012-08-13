
<?php

    require ("persistence/storage.php");
    require ("persistence/dataManager.php");
    require ("handlers/hotelHandler.php");
    
    
    $manager = new dataManager();
    $storage = "";
    $file = '';
    $fileContent = "";
    if($_POST["?hotel"] === "true"){
        $hotelHandler = new hotelHandler();
        $fileContent = $hotelHandler->getJSONFromPostData($_POST);
        $file = "../../resources/data/homepage.json";
    }else if($_POST["?info"] === "true"){
        $fileContent = $manager->getJSONFromFormData($_POST);
        $file = "../../resources/data/info.json";
    }else if($_POST["?agenda"] === "true") {
        $fileContent = $manager->getAgendaJSONFromFormData($_POST);
        $file = "../../resources/data/data.json";
    }
    $storage = new storage($file);
    $storage->saveContent($fileContent);
?>
