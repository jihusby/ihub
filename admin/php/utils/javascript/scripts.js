
var ELEMENTS = (function() {
     var elements = [
         'hotel',
         'info',
         'travel',
         'agenda'
     ];

     return {
        get: function(index) { return elements[index] }
    };
})();

var VIEW_ELEMENTS = (function() {
     var viewElements = 3;

     return {
        get: function() { return viewElements; }
    };
})();


$(function() { 
  $('.error').hide();  
  $(".button").click(function() {  
    var dataString = "";
    for(var i=0; i<VIEW_ELEMENTS.get(); i++){
        if(document.forms[i].disabled!==true){
            dataString = getParameterString(document.forms[i], ELEMENTS.get(i));
        }
    }
    if(document.forms[3].disabled!==true){
        var totalSessionCount = $("input#totalSessionCount").val();
        dataString = '?meta=agenda';
        for(i=0; i<totalSessionCount; i++) {

            $('.error').hide();  
            id = $("input#id"+i).val();  
            var start = $("input#start"+i).val();  
            if (start == "") {  
                $("label#start"+i+"_error").show();  
                $("input#start"+i).focus();  
                return false;  
            }  
            var startTime = $("input#startTime"+i).val();  
            if (startTime == "") {  
                $("label#startTime"+i+"_error").show();  
                $("input#startTime"+i).focus();  
                return false;  
            }  
            var endTime = $("input#endTime"+i).val();  
            if (endTime == "") {  
                $("label#endTime"+i+"_error").show();  
                $("input#endTime"+i).focus();  
                return false;  
            }  
            var name = $("#agenda input#name"+i).val();  
            
            if (name == "") {  
                $("label#name"+i+"_error").show();  
                $("input#name"+i).className = "errorInput";  
                return false;  
            }  
            var speaker = $("input#speaker"+i).val();  
            var place = $("input#place"+i).val();  
            if (place == "") {  
                $("label#place"+i+"_error").show();  
                $("input#place"+i).focus();  
                return false;  
            }  

            ingress = $("textarea#ingress"+i).val();  
            if (ingress == "") {  
                $("label#ingress"+i+"_error").show();  
                $("input#ingress"+i).focus();  
                return false;  
            }

            var description = $("textarea#description"+i).val();  
            if (description == "") {  
                $("label#description"+i).show();  
                $("input#description"+i).focus();  
                return false;  
            }  
            dataString += '&id'+i+'=' + id + '&start'+i+'='+ start + '&startTime'+i+'='+ startTime + '&endTime'+i+'='+ endTime + '&name'+i+'='+ name + '&speaker'+i+'='+ speaker + '&ingress'+i+'=' + ingress + '&description'+i+'=' + description + '&place'+i+'=' + place;
            
        }
    }
  
  $.ajax({
    type: "POST",
    url: "post.php",
    data: dataString,
    success: function() {
//        document.write("Success: " + dataString);
    },
    error: function() {
        document.write("Error: " + dataString);
    }
  });
  return false;
      
  });  
});


function updateFrame(source){
    if (window.frames && window.frames.iFrame) {
        window.frames.iFrame.location.href = source;
    }    
}

function saveForm() {
    document.getElementById('submit_btn').click();
}

function getParameterString(form, meta) {
    var parameters = new Array();
    var parameterString = '?meta='+meta;
    for(var i=0; i<form.elements.length-1; i++) {
        parameters[i] = $("input#item" + meta + i).val() ? 
            $("input#item" + meta + i).val() : 
            $("textarea#item" + meta + i).val();
        parameterString += "&item"+i+"="+parameters[i];
    }
    return parameterString;
}
