<?php

class formElementUtils {
    
    public function __construct() {

    }
    
    public static function getTextFieldSection($label, $name, $class, $value){
        if($label!==null){
            return self::getLabel($name, $label)."<input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
        }
        return "<label for='$name' id='".$name."_label'>".$label."</label><input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    public static function getTextField($name, $class, $value){
        return "<label for='$name' id='".$name."_label' /><input class='$class' type='text' name='$name' id='$name' value='$value' onBlur='javascript:saveForm();' /><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    
    public static function getTextAreaSection($label, $name, $class, $value){
        return self::getLabel($name, $label)."<textarea class='$class' name='$name' id='$name' onBlur='javascript:saveForm();'>$value</textarea><label class='error' for='$name' id='".$name."_error'>(*)</label>";
    }

    public static function getHiddenField($name, $value){
        return "<input type=hidden name='$name' id='$name' value='$value' />";
    }
    
    public static function getLabel($name, $label){
        return "<tr><td class='keyCell'><label for='$name' id='".$name."_label'>".$label."</label></td><td class='valueCell'>";
    }
}

?>
