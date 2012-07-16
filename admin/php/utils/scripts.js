
function showElement(elementIndex){
    var elements = new Array("hotel", "conference", "agenda");
    for(var i=elements.length-1; i>=0; i--) {
	var value = elements[i];
        document.getElementById(value).style.display = "none";
        document.getElementById("menu"+i).className = "menuCol";
    }    
    
    document.getElementById(elements[elementIndex]).style.display = "block";
    document.getElementById("menu"+elementIndex).className = "menuColSelected";
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
    
    var totalSessionCount = $("input#totalSessionCount").val();
    var dataString = "";
    //alert($("input#info").val());
    if($("input#info").val() === "true"){
        var id = $("input#id"+i).val();  
        var header = $("input#header").val();
        var ingress = $("textarea#ingress").val();
        var content1 = $("textarea#content1").val();
        var mapHeader = $("input#mapHeader").val();
        var map = $("input#map").val();
        
        dataString += 'info=true&id=' + id + '&header=' + header + '&ingress='+ ingress + '&content1='+ content1 + '&mapHeader='+ mapHeader + '&map=' + map;
        document.getElementById("maplink").href = "../../resources/images/"+map;
    }
    else if($("input#agenda").val() === "true"){
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
            var name = $("input#name"+i).val();  
            if (name == "") {  
                $("label#name"+i+"_error").show();  
                $("input#name"+i).className = "errorInput";  
                return false;  
            }  

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
            dataString += 'agenda=true&id'+i+'=' + id + '&start'+i+'='+ start + '&startTime'+i+'='+ startTime + '&name'+i+'='+ name + '&ingress'+i+'=' + ingress + '&description'+i+'=' + description + '&place'+i+'=' + place;
        }
    }
  
  //return false;
  $.ajax({
    type: "POST",
    url: "admin.php",
    data: dataString,
    success: function() {
        //alert(dataString);
      //$('#agenda_form').html("<div id='message'></div>");
      //$('#message').html("<h2>Agenda Form Submitted!</h2>")
      //.append("<p>We will be in touch soon.</p>")
      //.hide()
      //.fadeIn(1500, function() {
      //  $('#message').append("<img id='checkmark' src='images/check.png' />");
//      });
    }
  });
  return false;
  
      
  });  
});