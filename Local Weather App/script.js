
$(document).ready(function() {
        var Loc = function(lat,lon) {
                Loc.latitude = lat;
                Loc.longitude = lon;
                Loc.getLatitude = function() {return this.latitude;};
                Loc.getLongitude = function() {return this.longitude;};
          
        };
        var location_object = new Loc(0,0);
        function getLocation() {
            if(navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(showPosition);
            }
            else alert("Location sharing was forbidden");
        }
        function showPosition(position) {
            location_object.latitude = position.coords.latitude;
            location_object.longitude = position.coords.longitude;
            doAll(location_object);
        }
        getLocation();
        function doAll(location_object) {
            var text = "";
            var fccLocationURL = "https://fcc-weather-api.glitch.me/api/current?lat="+location_object.latitude+
              "&lon="+location_object.longitude;
              //console.log(fccLocationURL);
              $.getJSON(fccLocationURL,function(data) {
                var weather = data.weather[0];
                var icon = weather.icon;             
                var main = data.main;
                var place = data.name;
                var country = data.sys.country;
                text+= "<strong>" +weather.main + ", "+weather.description+"</strong><br><br>";
                text+= "<strong id=\"t\">Temperature : "+main.temp+"</strong>";
                text+= "  <button id=\"tempScale\" class=\"btn btn-info\"><sup>o</sup>C</button><br><br>";

                text+= "<strong> Humidity : "+main.humidity+"%</strong><br>";
                text+= "<strong>"+place+" "+country+"</strong><br>";
                  text+= "<img id=\"weather-image\" src=\""+icon+"\" /><br>";
                $('#response').html(text);

                    var btn = document.getElementById("tempScale");
                    btn.onclick = function() {
                        //alert("clicked");
                        var temperature = document.getElementById("t").innerHTML.split(": ")[1];
                        switch(btn.innerHTML.charAt(btn.innerHTML.length - 1)) {
                            case 'C':
                                //console.log("got in first");
                                document.getElementById("t").innerText = "Temperature : "+Math.round(celsiusToFahrenheit(temperature),1);
                                btn.innerHTML = "<sup>o</sup>F";
                                break;
                            case 'F':
                                //console.log("got in second")
                                document.getElementById("t").innerText = "Temperature : "+Math.round(fahrenheitToCelsuis(temperature),1);
                                btn.innerHTML = "<sup>o</sup>C";
                                break;
                            default:
                                break;
                      }
                    }
                    
                    //Get weather image
                    setInterval(function() {
                      $("#weather-image").toggle("drop",1000);  
                    },1500);
                    
              });
         
          
        }
        
        
  
        function celsiusToFahrenheit(temp) {
          return ((9*temp)/5) + 32;
        }
        function fahrenheitToCelsuis(temp) {
          return (5*(temp-32))/9;
        }
        
        
});


 

