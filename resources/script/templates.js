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
    //return '<input class="x-list-star" type="image" id="img{id}" src="resources/icons/star_gray_small.png" onClick="saveSessionDetail(\'{id}\');" onLoad="setImageSource({id});" />'+
    return '<input class="x-list-star" type="image" id="img{id}" src="resources/icons/star_gray_small.png" onClick="saveSessionDetail(\'{id}\');" />'+
                '<image id="img2{id}" src="resources/icons/star_gray_small.png" onLoad="setImageSource({id});" style="display:none;" />'+
                '<input type="button" onClick="saveSessionDetail(\'{id}\');" value="Add" />'+
                '<div class="x-list-content">'+
                '<div class="list-item-title">{name}</div>'+
                '<div class="list-item-description">{startTime} - {speaker}</div>'+
                '<div class="list-item-description">{ingress}</div>'+
                '</div>';
}

function getSponsorListTemplate() {
    return '<div class="x-list-content" onClick="{longUrl}"><a href="{longUrl}"><img src="resources/images/links/icon-{icon}.png"></a>' +
//                '<div class="x-list-content" style="border: 1px solid blue">'+
                '<div class="x-list-content">'+
                '<div class="textBlock"><a href="{longUrl}">{title}</a></div>' + 
//                '<table class="sponsorElement" style="width:100%"><tr>' + 
//                '<td width="1"><a href="{longUrl}"><img src="resources/images/links/icon-{icon}.png"></a></td>' + 
//                '<td><div class="list-item-title"><a href="{longUrl}">{title}</a></div>' + 
                '<div class="list-item-description">{description}</div>'+
//                '</td></tr></table>' +
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
