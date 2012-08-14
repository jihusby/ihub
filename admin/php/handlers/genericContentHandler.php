<?php

require ("utils/formElementUtils.php");
require ("utils/stringUtils.php");
    
interface genericContentHandler {
    
    public function getPageContentFromJSON($json);
    public function getJSONFromPostData($postData);
}

?>
