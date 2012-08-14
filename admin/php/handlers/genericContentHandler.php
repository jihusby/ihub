<?php

require ("utils/formElementUtils.php");
    
interface genericContentHandler {
    
    public function getPageContentFromJSON($json);
    public function getJSONFromPostData($postData);
}

?>
