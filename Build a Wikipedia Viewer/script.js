function doAll() {
   var term = document.getElementById("input1").value;
      term = term.replace(/ /g,"%20");
      //console.log(term);
      var wikiURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+term;
      //console.log(wikiURL);
      $.ajax({
        url : wikiURL,
        dataType : 'jsonp',
        success: function(response) {
          try {
            var keys = Object.keys(response["query"]["pages"]);
            //console.log(keys);
            var text = "";
            text+= "<button id=\"clearbtn\" class=\"btn btn-primary\" >Clear Results</button><br><br>";
            keys.forEach(function(k) {
                //console.log(response["query"]["pages"][k].pageid+" "+response["query"]["pages"][k].title+" "+response["query"]["pages"][k].extract);
                text+= "<a class=\"atag\" style=\"text-decoration: none\" target=\"_blank\" href=https://en.wikipedia.org/?curid="+response["query"]["pages"][k].pageid+"><div class=\"link\">";
                text+= "<div class=\"alert alert-success links\" role=\"alert\">";
                text+= "<h4 class=\"alert-heading\">"+response["query"]["pages"][k].title+"</h4>";
                text+= "<p>"+response["query"]["pages"][k].extract+"</div></a>"; 
            });
            
            $("#response").html(text);
            $("#clearbtn").on("click",function() {
              $("#input1").val("");
              $("#response").html("");
            });
            //console.log("Done");
          }
          catch(err) {
            //alert("No results were found.");
            var text = "";
            text+= "<div class=\"link\" style=\"color:white\">No results were found</div>";
            $("#response").html(text);
          }
        },
        error : function() {
          alert("Error recieving results.");
        }
       });
}
function handle(e) {
  if(e.keyCode==13)
    doAll();
}

$("#searchbtn").on("click",function(e) {
      //console.log("Enter pressed");
     doAll();
      
      
});
