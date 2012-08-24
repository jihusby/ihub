
<?php

    require ("config/config.php");
    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/hotelHandler.php");
    require ("handlers/infoHandler.php");
    require ("handlers/travelHandler.php");
    require ("handlers/agendaHandler.php");
    
    $meta = $_POST["?meta"];
    $file = config::RESOURCE_PATH.$meta.".json";
    
    $handlerType = $meta."Handler";
    $handler = new $handlerType;

    $fileContent = $handler->getJSONFromPostData($_POST);
    storage::saveContent($file, $fileContent);
?>
