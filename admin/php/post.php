
<?php

    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/hotelHandler.php");
    require ("handlers/infoHandler.php");
    require ("handlers/agendaHandler.php");
    
    $meta = $_POST["?meta"];
    $file = "../../resources/data/".$meta.".json";
    
    $handlerType = $meta."Handler";
    $handler = new $handlerType;

    $fileContent = $handler->getJSONFromPostData($_POST);
    storage::saveContent($file, $fileContent);
?>
