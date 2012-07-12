
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