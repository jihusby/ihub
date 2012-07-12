 <!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
 <html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>
     <head>
	<meta charset="utf-8" />
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
	<meta name="viewport" content="width=device-width">
	
        <link rel="stylesheet" type="text/css" href="../resources/css/reset.css" />
	<link rel="stylesheet" type="text/css" href="../resources/css/styling.css" />
	<link rel="stylesheet" type="text/css" href="../resources/css/functionality.css" />            
        <link rel="stylesheet" type="text/css" href="../resources/css/admin.css">
             
         <script src="utils/calendar/scripts.js" type="text/javascript"></script>
         <script src="utils/scripts.js" type="text/javascript"></script>
         

     </head>

<body>
    <form action="admin.php" method='POST'>
        <div class='menuColSelected' id="menu0" onClick="javascript:showElement(0);" style="margin-top: 10px;">
            <h1>Informasjon om hotellet</h1><p>
            [Her i venstre kolonne er det plass til beskrivelse av prosedyren]<p>
        </div>
        <div class='menuCol' id="menu1" onClick="javascript:showElement(1);" style="margin-top: 220px;">
            <h1>Informasjon om konferansen</h1><p><p>
            Lagre alle endringer i timeplanen. Endringer er synlige i mobil-appen ved oppdatering / restart.<p>
            [Her i venstre kolonne er det plass til beskrivelse av prosedyren]<p>
        </div>
        <div class='menuCol' id="menu2" onClick="javascript:showElement(2);" style="margin-top: 430px;">
            <h1>Timeplan</h1><p><p>
            Lagre alle endringer i timeplanen. Endringer er synlige i mobil-appen ved oppdatering / restart.<p>
            [Her i venstre kolonne er det plass til beskrivelse av prosedyren]<p>
            <input class="btn" type="submit" name="submitter" value="Oppdater timeplan" /><p>
        </div>

