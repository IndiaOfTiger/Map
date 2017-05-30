$(function(){
  
        var map;
        
        function initialize() {

          // Create an array of styles.
          var styles = 
          [
              {
                  "featureType": "water",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#d3d3d3"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "stylers": [
                      {
                          "color": "#808080"
                      },
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#b3b3b3"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ffffff"
                      },
                      {
                          "weight": 1.8
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#d7d7d7"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ebebeb"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#a7a7a7"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#efefef"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#696969"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#737373"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "labels",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#d6d6d6"
                      }
                  ]
              },
              {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {},
              {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#dadada"
                      }
                  ]
              }
          ];
          // Create a new StyledMapType object, passing it the array of styles,
          // as well as the name to be displayed on the map type control.
          var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});

          // Create a map object, and include the MapTypeId to add
          // to the map type control.
          var mapOptions = {
            zoom: 18,
            zoomControl: false,
            scaleControl: false,
            scrollwheel: false,
            center: new google.maps.LatLng(24.7899711, 120.9967021),
            mapTypeControlOptions: {
              mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
          };
          map = new google.maps.Map(document.getElementById('Location-map'),
            mapOptions);

          //Associate the styled map with the MapTypeId and set it to display.
          map.mapTypes.set('map_style', styledMap);
          map.setMapTypeId('map_style');
        }

        initialize();

        var receiveTime;
        var id;
        var lat;
        var lng;
        var description;
        var name;
        var LastLatLng = generate_latLng(24,121);;
        var ThisLastLng;
        
        function rad(x){
            return x*Math.PI/180;
        }
        
        function getDistance(p1, p2) {
            var Earth_R = 6378137; // Earth’s mean radius in meter
            var dLat = rad(p2.lat() - p1.lat());
            var dLong = rad(p2.lng() - p1.lng());
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
                    Math.sin(dLong / 2) * Math.sin(dLong / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = Earth_R * c;
            return d; // returns the distance in meter
        }

        function generate_latLng(lat,lng)
        {
            var temp = new google.maps.LatLng(lat, lng);
            return temp;
        }

        var timeFrom = 0;
        var timeTo = 0;
        var dogID = 0;
        var frequency = 0;
        var dogName = "";

        function AskForDogData_I(){
          var jsonArr = [];
          if(dogName == "Kaboo")
            dogID = 2;
          else if(dogName == "Milk")
            dogID = 0;
          jsonArr.push({From: timeFrom, To: timeTo, Frequency: frequency, DogID: dogID});
          return jsonArr;
        }
        function DogData_O(data){
           
           console.log(data[0]);
           id = data[0].TrackerID;
           lat = parseFloat(data[0].N);
           lng = parseFloat(data[0].E);
           
           ThisLastLng = generate_latLng(lat,lng);
           receiveTime = data[0].Time;
           var latandlng = "(" + lat + "," + lng + ")";
           if(id == "00" || id == "01")
               name = "DogAlpha"
            else
                name = "DogBeta"
           description = name + ': ' + receiveTime;
           if(id == "00" || id == "01" || id == "20" || id == "21" && getDistance(LastLatLng,ThisLastLng) > 1)
           {
               addMarker(lat, lng, id);
               LastLatLng = generate_latLng(lat,lng);
           }
        }
        

        var polyCoordinates = [];
        var polyLines = [[],[]];
        var lineColor;
        var linR, linG, linB;
        
        function addPolyLine(ID, counterID, markerArr, r, g, b){         

            var max = markerArr.length - 1;
            console.log("Max: ", max);
            console.log("CounterID: ", counterID);
            for(var i = 0; i < max; i++){ // Draw 9 lines Max
              console.log("CounterID: ", counterID);

              polyCoordinates = [];
              polyCoordinates.push(markerArr[counterID%10].position);
              counterID--;
              if(counterID == -1)
                counterID = 9;

              polyCoordinates.push(markerArr[counterID%10].position);              
              
              lineColor = "#" + rgbToHex(r,g,b).toString();
              var markersLine = new google.maps.Polyline({
                  path: polyCoordinates,
                  strokeColor: lineColor,
                  strokeOpacity: 1,
                  strokeWeight: 2
                });
              polyLines[ID].push(markersLine);
              
              if(polyLines[ID].length > 10)
              {
                  var temp = [];
                  for(var j=1;j<polyLines[ID].length;j++)
                  {
                      temp.push(polyLines[ID][j]);
                  }
                  polyLines[ID][0].setMap(null);
                  polyLines[ID] = temp;
                  polyLines[ID][polyLines[ID].length-1].setMap(map);
                  continue;
              }

              polyLines[ID][polyLines[ID].length-1].setMap(map);
              break;              
            }
        }

        

        function setMapOnAll(map, markerArr, notClearID) {
          for (var i = 0; i < markerArr.length; i++) {
            if(i == notClearID);
            else markerArr[i].setMap(map);
          }
        }

        function clearMarkers(markerArr, notClearID) {
          setMapOnAll(null, markerArr, notClearID);
        }

        var markersID1 = [];
        var markersID2 = [];
        var counterIDs = [0, 0]

        function addMarker(lat, lng, id)
        { 
            if(id == "00" || id == "01")
              changepinImage(89,193,84);
            else if (id == "20" || id == "21")
              changepinImage(39,99,157);

            var infowindow = new google.maps.InfoWindow({
              content: description
            });
            var marker = new google.maps.Marker({
                position:{ lat: lat, lng: lng },
                map: map, 
                fillOpacity: 0.4,
                icon: pinImage
                });
            
            marker.addListener('click', function() {
                               infowindow.open(map, marker);
                               });
            infowindow.open(map,marker);
            if(id == "00" || id == "01")
              markerMotion(id, markersID1, 0, marker, lat, lng, 89, 193, 84);
            else if (id == "20" || id == "21")
              markerMotion(id, markersID2, 1, marker, lat, lng, 39, 99, 157);
        }
        

        function markerMotion(id, markersID, counterID, marker, lat, lng, r, g, b)
        {
          clearMarkers(markersID, counterIDs[counterID]%10);
          counterIDs[counterID] = counterIDs[counterID] % 10;
          markersID[counterIDs[counterID]] = marker;
          if(id == "01" || id == "21")
            addPolyLine(counterID, counterIDs[counterID], markersID, r, g, b);
          counterIDs[counterID]++;
        }

        function rgbToHex(r, g, b) {
            return componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function changepinImage(r,g,b)
        {
            //console.log('hi');
            //pinR = Math.floor((Math.random() * 255) + 1);
            //pinG = Math.floor((Math.random() * 255) + 1);
            //pinB = Math.floor((Math.random() * 255) + 1);
            pinColor = rgbToHex(r,g,b).toString();
            //console.log(pinColor);
            pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
            new google.maps.Size(21, 34),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 34));
            //console.log(pinImage);
        }

        $('#submit').on('click', function(){
        $('#submit').toggle(500).toggle(500);
          timeFrom = $('#datetimepickerFrom').val();
          timeTo = $('#datetimepickerTo').val();
          frequency = $('#freq').val();
          dogName = $('input[name=selectdog]:checked', '#DogForm').val()
          console.log(dogName);
          console.log(timeFrom);
          console.log(timeTo);
          console.log(frequency);
          $('#datetimepickerFrom').val("");
          $('#datetimepickerTo').val("");
          $('#freq').val("");
        })

        $.datetimepicker.setLocale('en');
        $('#datetimepickerFrom').datetimepicker();
        $('#datetimepickerTo').datetimepicker();

                   
        function iot_app(){

            
        }
  
        var profile = {
            'dm_name': 'Map',
            'df_list': [DogData_O, AskForDogData_I],
        }

        var ida = {
            'iot_app': iot_app,
        }; // How iot device receive data (format)
        dai(profile,ida);
       
        
});




