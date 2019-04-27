<html>
  <head>
    <style>
      /* Set the size of the div element that contains the map */
      #map {
        height: 400px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
       }
    </style>
  </head>
  <body>
    <h3>My Google Maps Demo</h3>
    <!--The div element for the map -->
    <div id="map"></div>
    <script>
// Initialize and add the map
function initMap() {
  // The location of Starkville
  var starkville = {lat: 33.451, lng: -88.834};
  // The map, centered at Starkville
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: starkville});
  // The marker, positioned at Starkville
  var marker = new google.maps.Marker({position: starkville, map: map});
}
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBo06wLVaJdmOdXeeS_MoAYn3-GiqusDhM&callback=initMap">
    </script>
  </body>
</html>
