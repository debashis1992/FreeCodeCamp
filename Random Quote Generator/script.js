/*https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=json&lang=en*/
//var btn = document.getElementById("btn");
var quote = $('.quote');
var author = $('.author');
var body = $('body');
var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

var max = 49, min = 0;
var Person = function(text,writer) {
    Person.text = text;
    Person.writer = writer;
    Person.getText = function() {
        return this.text;
    };
    Person.getWriter = function() {
        return this.writer;
    }
}
$("#btn").on("click",function() {
    var random = Math.floor(Math.random() * (max - min + 1)) + min;
    //console.log(random);
        $("body").animate({
                backgroundColor : colorArray[random]
        });
  var forismaticURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(forismaticURL,function(data) {
    //console.log(data.quoteText);
    //console.log(data.quoteAuthor);
      var text = "" , writer = "";
    quote.html(data.quoteText);
    text = data.quoteText;
    if(data.quoteAuthor.length==0) {
      author.html("- Anonymous");
        writer = "Anonymous";
    }
    else  {
        author.html("- "+data.quoteAuthor);
        writer = data.quoteAuthor;
    }
      var p = new Person(text,writer);
  });
});
String.prototype.replaceAll = function(search,replacement) {
    //console.log("replaceAll called");
    var target = this;
    return target.split(search).join(replacement);
}

$("#btn2").on("click",function() {
    var value = Person.getText();
    var author = Person.getWriter();
    value = value.replaceAll(" ","%20");
    author = author.replaceAll(" ","%20");
   var twitterURL = "https://twitter.com/intent/tweet?hastags=quotes&text="+value+" - "+author;
    var win = window.open(twitterURL,'_blank');
    if(win)
        win.focus();
    else alert("Please allow popups for this page");
    //console.log(value);
    
});




