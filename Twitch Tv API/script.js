/*
List of some Twitch TV users

["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]


*/

$(document).ready(function() {
    var channelNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    
    var twitchURL = "https://wind-bow.gomix.me/twitch-api/channels/";
    var text = "";
    channelNames.forEach(function(k) {
        var newURL = twitchURL+k;
        $.ajax({
           url: newURL,
            dataType: 'jsonp',
            
            success: function(data) {
                //console.log(response);
                try {
                     
                }
                catch(err) {
                    alert("Could not load the details");
                }
                $("#response").html(text);
                
                
            },
            error: function() {
                alert("There was an error finding the details.");
            }
        });  
    });
});