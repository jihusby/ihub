
<?php


    require ("config/config.php");
    require ("handlers/genericContentHandler.php");
    require ("handlers/hotelHandler.php");
    require ("handlers/infoHandler.php");
    require ("handlers/agendaHandler.php");
    
    
    $storage = new storage();

    $hotelHandler = new hotelHandler();
    $infoHandler = new infoHandler();
    $agendaHandler = new agendaHandler();

    require ("view-elements/header.php");
    print_r ($hotelHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."hotel.json")));  
    print_r ($infoHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."info.json")));  
    print_r ($agendaHandler->getPageContentFromJSON(
            $storage->getContent(config::RESOURCE_PATH."agenda.json")));  
    require ("view-elements/footer.php");
    
?>
