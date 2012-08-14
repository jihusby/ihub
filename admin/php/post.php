
<?php

    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/hotelHandler.php");
    require ("handlers/infoHandler.php");
    require ("handlers/agendaHandler.php");
    
    $storage = "";
    $file = '';
    $fileContent = "";
    if($_POST["?hotel"] === "true"){
        $hotelHandler = new hotelHandler();
        $fileContent = $hotelHandler->getJSONFromPostData($_POST);
        $file = "../../resources/data/homepage.json";
    }else if($_POST["?info"] === "true"){
        $infoHandler = new infoHandler();
        $fileContent = $infoHandler->getJSONFromPostData($_POST);
        $file = "../../resources/data/info.json";
    }else if($_POST["?agenda"] === "true") {
        $agendaHandler = new agendaHandler();
        $fileContent = $agendaHandler->getJSONFromPostData($_POST);
        $file = "../../resources/data/data.json";
    }
    $storage = new storage($file);
    $storage->saveContent($fileContent);
?>
