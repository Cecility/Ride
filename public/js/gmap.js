 // This example adds a search box to a map, using the Google Place Autocomplete
          // feature. People can enter geographical searches. The search box will return a
          // pick list containing a mix of places and predicted search terms.

          // This example requires the Places library. Include the libraries=places
          // parameter when you first load the API. For example:
          // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
            
          /** Variables to store the longitude and latitude of user selected addresses
            * puLong - Pick Up Longitudinal
            * puLat - Pick up latitudinal
            * doLong - Drop off long
            * doLat - Dro off Lat
            * puaddr - Formatted pick up full address
            * doaddr - Formatted drop off full address
            * time - pick up time in format ~HH:MM AM/PM~
          **/    
          var puLong, puLat, doLong, doLat, puaddr, doaddr, time;
            
          // Use: to store user selected dates for ride group
          var dateSelected = new Array();
            
          function initAutocomplete() {
            var map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: 32.880376, lng: -117.235065},
              zoom: 13,
              mapTypeId: 'roadmap',
              mapTypeControl: false,
            });

            // Create the search box and link it to the UI element.
            var backBtn = document.getElementById('backBtn');
            var input = document.getElementById('pac-input');
            var input2 = document.getElementById('pac-input2');
            var inputContainer = document.getElementById('pac-input-container');
            var dateSelect = document.getElementById('date-selector');
            var submitBtn = document.getElementById('submit-btn');
            var btmContainer = document.getElementById('btm-container');
              
            // Initializing time selecter UI  
            $('.timepicker').timepicker({
                timeFormat: 'h:mm p',
                interval: 60,
                minTime: '10',
                maxTime: '6:00pm',
                defaultTime: '0',
                startTime: '10:00',
                dynamic: false,
                dropdown: false,
                scrollbar: true
            });
              
              
            // Handle user clicking create group button  
            $('#submit-btn').on('click', function(event){
                
                $("input[type=checkbox]").each(function(index){
                    if($(this).is(':checked'))
                        dateSelected[index]=1;
                    else
                        dateSelected[index]=0;
                    
                    console.log(dateSelected); 
                });
                
                if($('#pac-input').val() == ''){
                    $('#pac-input').css("border-color", "red");
                    console.log("Pick up location not selected");
                    }
                
                if($('#pac-input2').val() == ''){
                    $('#pac-input2').css("border-color", "red");
                    console.log("Drop off location not selected");
                    }
                if($('.timepicker').val() == ''){
                    $('.timepicker').css("border-color", "red");
                    console.log("Pick up time not set");
                }
                
                else if($('#pac-input2').val() != '' && $('#pac-input').val() != ''){
                    $('#pac-input').css("border-color", "transparent");
                    $('#pac-input2').css("border-color", "transparent");
                    $('.timepicker').css("border-color", "transparent");
                    time = $('.timepicker').val();
                    console.log("group created");
                    console.log("pickup time is: "+time);
                    window.location.href("/createGroup");
                }
            })
            
            // Applying Google Search Box property to Input
            var searchBox = new google.maps.places.SearchBox(input);
            var searchBox2 = new google.maps.places.SearchBox(input2);
              
            // Putting control elements into map
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(backBtn);
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputContainer);
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(btmContainer);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
              searchBox2.setBounds(map.getBounds());
            });
              

            var markers = [];
            var markers2 = [];
              
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.

            // FOR PICKUP
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: "http://maps.google.com/mapfiles/ms/icons/green.png",
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
                  
                //Storing pick up location
                  puLong = place.geometry.location.lng();
                  puLat = place.geometry.location.lat();
                  puaddr = place.formatted_address;
                  console.log("Pick up long: " + puLong + "Pickup Lat: " +puLat + '\n');
                  console.log("pickup address is " + puaddr);

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });


            // FOR DROP OFF
            searchBox2.addListener('places_changed', function() {
              var places = searchBox2.getPlaces();

              if (places.length == 0 || places.length != 1) {
                console.log("Please select a specific address ")
                return;
              }
                

                
              // Clear out the old markers.
              markers2.forEach(function(marker) {
                marker.setMap(null);
              });
              markers2 = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon2 = {
                  url: "http://maps.google.com/mapfiles/ms/icons/red.png",
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers2.push(new google.maps.Marker({
                  map: map,
                  icon: icon2,
                  title: place.name,
                  position: place.geometry.location
                }));
                  
                //Storing Drop Off Location
                  doLong = place.geometry.location.lng();
                  doLat = place.geometry.location.lat();
                  doaddr = place.formatted_address;
                
                  console.log("Drop Off long: " + doLong + "Dropoff Lat " +doLat + '\n');
                  console.log("pickup address is " + puaddr);
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });
          }