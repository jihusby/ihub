
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

$(function() { 
  $('.error').hide();  
  $(".button").click(function() {  
    var dataString = "";
    if(document.forms[0].disabled!==true){
        var id = $("input#hotelid").val();  
        var content1 = $("input#hotelcontent1").val();
        var content2 = $("textarea#hotelcontent2").val();
        var content3 = $("textarea#hotelcontent3").val();
        var content4 = $("input#hotelcontent4").val();
        dataString = '?meta=hotel&id=' + id + '&content1=' + content1 + '&content2='+ content2 + '&content3='+ content3 + '&content4='+ content4;
    }

    else if(document.forms[1].disabled!==true){
        id = $("input#infoid").val();  
        var header = $("input#infoheader").val();
        var ingress = $("textarea#infoingress").val();
        content1 = $("textarea#infocontent1").val();
        var mapHeader = $("input#infomapHeader").val();
        var map = $("input#infomap").val();
        
        dataString = '?meta=info&id=' + id + '&header=' + header + '&ingress='+ ingress + '&content1='+ content1 + '&mapHeader='+ mapHeader + '&map=' + map;
        document.getElementById("maplink").href = "../../resources/images/"+map;
    }

    else if(document.forms[2].disabled!==true){
        id = $("input#travelid").val();  
        var header = $("input#travelheader").val();
        var ingress = $("textarea#travelingress").val();
        content1 = $("textarea#travelcontent1").val();
        var mapHeader = $("input#travelmapHeader").val();
        var map = $("input#travelmap").val();
        
        dataString = '?meta=travel&id=' + id + '&header=' + header + '&ingress='+ ingress + '&content1='+ content1 + '&mapHeader='+ mapHeader + '&map=' + map;
        document.getElementById("maplink").href = "../../resources/images/"+map;
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
        //document.write("success: " + dataString);
    },
    error: function() {
        document.write("Error");
    }
  });
  return false;
  
      
  });  
});