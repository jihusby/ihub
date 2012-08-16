<?php

class favoritesHandler implements genericContentHandler {
    
    public function getPageContentFromJSON($json) {
        $result = "";
        $result = $result . '<div class="mainColFixed" id="favorites" style="display: none">';
        $result = $result . '<div class="mainSubCol">';
        $result = $result . '<div id="favorites_form">';
        $result = $result . '<form name="favorites" id="favorites" action="" disabled>';
        $result = $result . '<input type="submit" name="submit" class="button" id="submit_btn" value="Send" style="display:none;" />';
        $result = $result . '</form></div></div></div>';
        return $result;
    }
    
    public function getJSONFromPostData($postData) {
        return null;
    }
    
}

?>
