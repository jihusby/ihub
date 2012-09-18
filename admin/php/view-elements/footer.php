

    <div class="previewCol">
        <div style="padding: 10px;text-align: center">

<script language="javascript">
    
    function getActiveMenu(){
        var menu = 
            '<h3>Forhåndsvisning</h3>' + 
            '<IFRAME id="iFrame" name="iFrame" SRC="../../index-debug.html" WIDTH=320 HEIGHT=480 style="border-radius: 5px;">' +
                'If you can see this, your browser does not understand IFRAME.  However, we will still <A HREF="../../index-debug.html">link</A> you to the file.' +
            '</IFRAME> ' +
            '<p><p><input type="button" class="btn" value="Oppdater" onClick="javascript:updateFrame(\'../../index-debug.html\');" style="float:">';
        return menu;
    }
    
    function getPassiveMenu(){
        var menu = 
            '<div>' +
                '<div id="div0" class="div0_active" onClick="javascript:setMainWindow(0);">Om hotellet</div>' +
                '<div id="div1" class="div1" onClick="javascript:setMainWindow(1);">Info</div>' +
                '<div id="div2" class="div2" onClick="javascript:setMainWindow(2);">Reiseinfo</div>' +
                '<div id="div3" class="div3" onClick="javascript:setMainWindow(3);">Agenda</div>' +
            '</div>';
        return menu;
    }
    
    var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
    var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
    var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
    var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

    function testCSS(prop) {
        return prop in document.documentElement.style;
    }    
    
    if(isSafari || isChrome){
        document.write(getActiveMenu());
    }
    else{
        document.write(getPassiveMenu());
    }
        
    
</script>
            
        </div>
    </div>

<script language="javascript">
    
    function setMainWindow(elementIndex){
        if(document.getElementById("hotel")!==null) {
            
            
            var elements = new Array("hotel", "info", "travel", "agenda");
            for(var i=elements.length-1; i>=0; i--) {
                var value = elements[i];
                document.getElementById(value).style.display = "none";
                document.getElementById(value).enabled = "false";
                document.forms[i].disabled=true;
                document.getElementById("div"+i).className = "div"+i;
            }    
            if(elementIndex >= 0) {
                if(document.forms[elementIndex]){
                    document.forms[elementIndex].disabled=false;
                    document.getElementById("div"+elementIndex).className = "div" + elementIndex + "_active";
                    document.getElementById(elements[elementIndex]).style.display = "block";
                }
            }
        }
    }

    function setConferenceDay(elementIndex, numOfElements){
        for(var i=numOfElements-1; i>=0; i--) {
            var tabId= "tab"+i;
            var mainId = "main"+i;
            document.getElementById(tabId).className = "passiveDay";
            document.getElementById(mainId).style.display = "none";
        }    
        if(elementIndex >= 0) {
            var tabId= "tab"+elementIndex;
            var mainId = "main"+elementIndex;
            document.getElementById(tabId).className = "activeDay";
            document.getElementById(mainId).style.display = "block";
            document.getElementById(mainId).enabled = "true";
        }
    }

    
</script>

</body>
</html>