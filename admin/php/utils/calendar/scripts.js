function viewcalendar(fieldName) {
  kalendarik = window.open("utils/calendar/calendar.php?fieldName=" + fieldName, "kalendarik" , "location=0, menubar=0, scrollbars=0, status=0, titlebar=0, toolbar=0, directories=0, resizable=1, width=200, height=240, top=50, left=250");
  kalendarik.resizeTo(200, 240);
  kalendarik.moveTo(250, 50);
}
function insertdate(d, fieldName) {
  window.close();
  window.opener.document.getElementById(fieldName).value = d;
}
