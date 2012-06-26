 <!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
 <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
     <head>
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/> 
         <style type='text/css'> 
            .stdField{width: 400px;} 
            .stdSmallField{width: 80px;} 
            .stdSmallArea{min-height: 50px; max-height: 50px; min-width: 400px;} 
            .stdBigArea{min-height: 100px; max-height: 100px; min-width: 400px;}
            .sectionItem{background-color: #FF9955;border: 1px solid #ADADAD; width:500px; padding: 5px;}

        * { margin: 0; padding: 0; }
        #page-wrap { width: 960px; margin: 100px auto; }
        h1 { font: 36px Georgia, Serif; margin: 20px 0; }
        .group:after { visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
        p { margin: 0 0 10px 0; }
        
        .tabs { list-style: none; }
        .tabs li { display: inline; }
        .tabs li a { color: black; float: left; display: block; padding: 4px 10px; margin-left: -1px; position: relative; left: 1px; background: white; text-decoration: none; }
        .tabs li a:hover { background: #ccc; }
        
        
        /* Generic styles & example one */
        
        .tabbed-area { margin: 0 0 120px 0; }
        .box-wrap { position: relative; min-height: 250px; }
        .tabbed-area div div { background: white; padding: 20px; min-height: 250px; position: absolute; top: -1px; left: 0; width: 100%; }
        .tabbed-area div div, .tabs li a { border: 1px solid #ccc; }
        #box-one:target, #box-two:target, #box-three:target { z-index: 1; }
        
        .w3c { min-height: 250px; position: relative; width: 100%; }
        .w3c > div { display: inline; }
        .w3c > div > a { margin-left: -1px; position: relative; left: 1px; text-decoration: none; color: black; background: white; display: block; float: left; padding: 5px 10px; border: 1px solid #ccc; border-bottom: 1px solid white; }
        .w3c > div:not(:target) > a { border-bottom: 0; background: #dddddd; }
        .w3c > div:target > a { background: white; }	
        .w3c > div > div        { z-index: -2; left: 0; top: 30px; bottom: 0; right: 0; padding: 20px; border: 1px solid #ccc; }
        .w3c > div > div  { z-index: -2; left: 0; top: 30px; bottom: 0; right: 0; padding: 20px; border: 1px solid #ccc; }
        .w3c > div:not(:target) > div { visibility: hidden }
        .w3c > div:not(:target) > div { position: absolute }
        .w3c > div:target > div { position: absolute; z-index: -1; }
        
        .parentItem {
            background-color: #efefef;
            /*overflow-y: auto;
            height: auto;*/
        }
        
        .submitBtn {
            position: inherit;
            width: 400px;
        }
        
        .submitBlock {
            top: inherit;
            background-color: #ff0000;
            width: 400px;
            
        }
        
         </style>
         <script src="utils/calendar/scripts.js" type="text/javascript"></script>
     </head>

<body style='font-family:verdana; font-size: 12px; color:#333388;'>
    <h1>Timeplan for konferanse</h1>
    <form action='admin.php' method='POST'>


