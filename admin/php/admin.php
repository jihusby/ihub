
<?php

    require ("persistence/storage.php");
    require ("persistence/dataManager.php");
    
    $storage = new storage();
    $manager = new dataManager();
    
    
    if($_POST["parentId1"] === "1") {
        $fileContent = $manager->getJSONFromFormData($_POST);
        
        if($storage->saveContent($fileContent)){
            print_r (getAlertMsg("Skjemaet er lagret!"));
        }
    }

    
    $result = $storage->getContent();
    $formattedFormData = $manager->getFormDataFromJSON($result);
    
    
    require ("view-elements/header.php");
    print_r ($formattedFormData);
    require ("view-elements/footer.php");
    
    function getAlertMsg($msg){
        return ("<script type='text/javascript'>window.alert('$msg')</script>");
    }
    
?>
