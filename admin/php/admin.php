
<?php

    require ("config/config.php");
    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/hotelHandler.php");
    require ("handlers/infoHandler.php");
    require ("handlers/travelHandler.php");
    require ("handlers/agendaHandler.php");
    require ("handlers/favoritesHandler.php");
    
    
    $storage = new storage();

    $hotelHandler = new hotelHandler();
    $infoHandler = new infoHandler();
    $travelHandler = new travelHandler();
    $agendaHandler = new agendaHandler();
    $favoritesHandler = new favoritesHandler();

    require ("view-elements/header.php");
    print_r ($hotelHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."hotel.json")));  
    print_r ($infoHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."info.json")));  
    print_r ($travelHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."travel.json")));  
    print_r ($agendaHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."agenda.json")));  
    print_r ($favoritesHandler->getPageContentFromJSON(""));  
    require ("view-elements/footer.php");
    
?>
