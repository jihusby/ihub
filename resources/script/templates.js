function getEventListTemplate() {
    return '<input class="x-list-star" type="image" src="resources/icons/star_color_small.png" onClick="removeEvent({externalId});" value="Fjern" />'+
                '<div class="x-list-content">'+
                '<div class="list-item-title">{name}</div>'+
                '<div class="list-item-description">{startTime} - {speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '</div>';
}

function getEventDetailTemplate() {
    return '<div class="textBlock">' + 
                '<div class="contentInfo"><input type="button" onClick="showPopupMap(\'{place}.jpg\', \'{place}\').show();" value="{place}"></a></div>' + 
                '<input class="x-detail-star" type="image" src="resources/icons/star_color.png" onClick="removeEvent({externalId});" value="Fjern" />'+
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>';
}

function getSessionListTemplate() {
    return '<input class="x-list-star" id="img{id}" type="image" src="resources/icons/star_gray_small.png" onClick="saveSessionDetail(\'{id}\');" onLoad="setImageSource({id});" />'+
                '<image id="img2{id}" src="resources/icons/star_gray_small.png" onLoad="setImageSource({id});" style="display:none;" />'+
                '<div class="x-list-content">'+
                '<div class="list-item-title">{name}</div>'+
                '<div class="list-item-description">{startTime} - {speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '</div>';
}

function getSessionDetailTemplate(btnText) {
    return '<input value="'+btnText+'" id="btn" class="buttonWide" type="button" onClick="saveSessionDetail({id});" />' + 
                '<input class="buttonWide" type="button" onClick="showPopupMap(\'{place}.jpg\', \'{place}\').show();" value="{place}" />'+
                '<div class="textBlock">' + 
                '<div class="contentInfo">{place} kl. {startTime}</div>' + 
                '<div class="contentTitle">{name}</div>' + 
                '<div class="contentIngress">{ingress}</div>' + 
                '<div class="contentText">{description}</div>' + 
                '</div>';
}
