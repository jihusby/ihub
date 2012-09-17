
<?php

    require ("config/config.php");
    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/agendaHandler.php");
    require ("handlers/viewContentHandler.php");
    
    $meta = $_POST["?meta"];
    $file = config::RESOURCE_PATH.$meta.".json";
    
    $meta==="agenda"? $handler = new agendaHandler(): $handler = new viewContentHandler();

    $fileContent = $handler->getJSONFromPostData($_POST);
    storage::saveContent($file, $fileContent);

 ?>
