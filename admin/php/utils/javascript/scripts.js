
function showElement(elementIndex){
    //var elements = new Array("hotel", "info", "travel", "agenda", "favorites");
    var elements = new Array("hotel", "info", "travel", "agenda");
    for(var i=elements.length-1; i>=0; i--) {
	var value = elements[i];
        document.getElementById(value).style.display = "none";
        document.getElementById(value).enabled = "false";
        document.forms[i].disabled=true;
    }    
    document.forms[elementIndex].disabled=false;
    document.getElementById(elements[elementIndex]).style.display = "block";
}

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
        parameters[i] = $("input#" + meta + i+"").val() ? 
            $("input#" + meta + i+"").val() : 
            $("textarea#" + meta + i+"").val();
        parameterString += "&item"+i+"="+parameters[i];
    }
    return parameterString;
}

$(function() { 
  $('.error').hide();  
  $(".button").click(function() {  
    var dataString = "";
    if(document.forms[0].disabled!==true){
        dataString = getParameterString(document.forms[1], "hotel");
    }

    else if(document.forms[1].disabled!==true){
        dataString = getParameterString(document.forms[1], "info");
        document.getElementById("infomap").href = "../../resources/images/maps/"+$("input#infomap").val();
    }

    else if(document.forms[2].disabled!==true){
        dataString = getParameterString(document.forms[2], "travel");
        document.getElementById("travelmap").href = "../../resources/images/maps/"+$("input#travelmap").val();
    }

    else if(document.forms[3].disabled!==true){
        var totalSessionCount = $("input#totalSessionCount").val();
        dataString = '?meta=agenda';
        for(var i=0; i<totalSessionCount; i++) {

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