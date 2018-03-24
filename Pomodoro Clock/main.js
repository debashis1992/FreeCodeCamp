var break_length_minus = document.getElementById("break-length-minus");
var break_length_plus = document.getElementById("break-length-plus");
var break_length = document.getElementById("break-length");
var session_length = document.getElementById("session-length");
var session_length_minus = document.getElementById("session-length-minus");
var session_length_plus = document.getElementById("session-length-plus");
var clock_timer = document.getElementById("clock-timer");
var clock_timer_pressed = false;
var session_timer = false;
var break_timer = false;
var object = {};
object.session_interval = 0;
object.break_interval = 0;
object.date = new Date();
var temp = "";
break_length_minus.addEventListener("click",function() {
    if(break_length.textContent[1]!=1 && !clock_timer_pressed) {
        break_length.childNodes[1].textContent = break_length.childNodes[1].textContent - 1;
    }
});

break_length_plus.addEventListener("click",function() {
    if(!clock_timer_pressed)
      break_length.childNodes[1].textContent = Number(break_length.childNodes[1].textContent) + 1;
});

session_length_minus.addEventListener("click",function() {
    if(session_length.childNodes[1].textContent!=1 && !clock_timer_pressed) {
        session_length.childNodes[1].textContent = session_length.childNodes[1].textContent - 1;
        clock_timer.childNodes[1].textContent = session_length.childNodes[1].textContent;
        changeDate();
    }
});

session_length_plus.addEventListener("click",function() {
  if(!clock_timer_pressed) {
      session_length.childNodes[1].textContent = Number(session_length.childNodes[1].textContent) + 1;
      clock_timer.childNodes[1].textContent = Number(session_length.childNodes[1].textContent);
      changeDate();
  }
});
changeDate();
clock_timer.addEventListener("click",function() {
    clock_timer_pressed = !clock_timer_pressed;
    if(clock_timer_pressed) {
        if(object.session_interval==0 && !break_timer) {
            object.session_interval = setInterval(start_timer,1000);
            session_timer = true;
        }
        else if(object.break_interval==0 && !session_timer) {
            object.break_interval = setInterval(start_break_timer,1000);
            break_timer = true;
        }
    } else {
        if(object.session_interval!=0) {
            clearInterval(object.session_interval);
            object.session_interval = 0;
        }
        else if(object.break_interval!=0) {
            clearInterval(object.break_interval);
            object.break_interval = 0;
        }
    }
});
function changeDate() {
    if(clock_timer.childNodes[1].textContent.indexOf(":")===-1) {
        object.date.setMinutes(Number(clock_timer.childNodes[1].textContent)-1);
    }
    else {
        object.date.setMinutes(Number(session_length.childNodes[1].textContent)-1);
    }
    object.date.setSeconds(60);
}
function changeDateFromBreak() {
    if(break_length.childNodes[1].textContent.indexOf(":")===-1) {
        object.date.setMinutes(break_length.childNodes[1].textContent);
        object.date.setSeconds(0);
    } else {
        object.date.setMinutes(Number(break_length.childNodes[1].textContent.split(":")[0]));
        object.date.setSeconds(Number(break_length.childNodes[1].textContent.split(":")[1]));
    }
}

function start_timer() {
    //var date = new Date();
    if(object.date.getMinutes()==0 && object.date.getSeconds()==0) {
        clearInterval(object.session_interval);
        object.session_interval = 0;
        session_timer = false;
        break_timer = true;
        changeDateFromBreak();
        object.break_interval = setInterval(start_break_timer,1000);
    }
    else {
        if(object.date.getSeconds()==0) {
            object.date.setSeconds(60);
            object.date.setMinutes(Number(object.date.getMinutes())-1);
        }
        object.date.setSeconds(Number(object.date.getSeconds())-1);
        //console.log(object.date.getMinutes()+":"+object.date.getSeconds());
        if(object.date.getSeconds().toString().length==1) 
            temp = "0"+object.date.getSeconds().toString();
        else temp = object.date.getSeconds();
        clock_timer.childNodes[1].textContent = "Session "+object.date.getMinutes()+":"+temp;
    }
}
function start_break_timer() {
    if(object.date.getMinutes()==0 && object.date.getSeconds()==0) {
        clearInterval(object.break_interval);
        object.break_interval = 0;
        break_timer = false;
        session_timer = true;
        changeDate();
        object.session_interval = setInterval(start_timer,1000);
    }
    else {
        object.date.setSeconds(Number(object.date.getSeconds())-1);
        if(object.date.getSeconds()==0) {
            object.date.setSeconds(60);
            object.date.setMinutes(Number(object.date.getMinutes())-1);
        }
        //console.log(object.date.getMinutes()+":"+object.date.getSeconds());
        if(object.date.getSeconds().toString().length==1) 
            temp = "0"+object.date.getSeconds().toString();
        else temp = object.date.getSeconds();
        clock_timer.childNodes[1].textContent = "Break "+object.date.getMinutes()+":"+temp;
    }
}
