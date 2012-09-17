
<?php

    require ("config/config.php");
    require ("persistence/storage.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/agendaHandler.php");
    require ("handlers/favoritesHandler.php");
    require ("handlers/viewContentHandler.php");
    
    
    $storage = new storage();

    $hotelHandler = new viewContentHandler();
    $infoHandler = new viewContentHandler();
    $travelHandler = new viewContentHandler();
    $agendaHandler = new agendaHandler();
    $favoritesHandler = new favoritesHandler();

    require ("view-elements/header.php");
    
    print_r ($hotelHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."hotel.json"), "hotel", "block"));  

    print_r ($infoHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."info.json"), "info", "none"));  
    
    print_r ($travelHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."travel.json"), "travel", "none"));  
    
    print_r ($agendaHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."agenda.json")));  
    
    print_r ($favoritesHandler->getPageContentFromJSON(""));  
    
    require ("view-elements/footer.php");
    
?>
