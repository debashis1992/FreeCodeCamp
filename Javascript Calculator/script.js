function calculatorApp() {
    
}
calculatorApp.result = "";

var textBox = document.getElementById("output-textbox");
var deleteBtn = document.getElementById("delete");

deleteBtn.addEventListener("click",function() {
    if(String(calculatorApp.result)=="Infinity") {
      calculatorApp.result = "";
      textBox.innerHTML = calculatorApp.result;
    }
    if(String(calculatorApp.result).length>0) {
        calculatorApp.result = String(calculatorApp.result).substr(0,String(calculatorApp.result).length-1);
        textBox.innerHTML = calculatorApp.result;
    }
});
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }
function calculateResult() {
    //calculate final result
    //append it to textbox
    //make result string = ""
    try {
        var output = precisionRound(eval(calculatorApp.result),2);
        textBox.innerHTML = output;
        calculatorApp.result = output;
    } catch(e) {
        alert("Invalid input");
        console.log(e);
    }
}
var cancelbtn = document.getElementById("cancel");
cancelbtn.addEventListener("click",function() {
    textBox.innerHTML = "";
    calculatorApp.result = "";
});

var calculate = document.getElementById("eq");
calculate.addEventListener("click",calculateResult);

/*   Add button operations   */

var btns = document.getElementsByClassName("operation");
for(var i=0;i<btns.length;i++) {
    btns[i].addEventListener("click",function(e) {
        //console.log(e.target.innerHTML);
          temp = calculatorApp.result;
          //alert(temp[temp.length-1]);
          if(!isOperator(temp[temp.length-1])) {
            calculatorApp.result+=e.target.innerHTML;
            textBox.innerHTML = calculatorApp.result;
          }
          else if(isDigit(e.target.innerHTML)) {
            calculatorApp.result+=e.target.innerHTML;
            textBox.innerHTML = calculatorApp.result;
          }
    });
}

function isOperator(element) {
  //alert(element);
  switch(element) {
    case "+":
    case "-":
    case "*":
    case "/":
    case ".":
      return true;
      break;
    default:
      return false;
  }
  
}
function isDigit(element) {
  return !isOperator(element);
}