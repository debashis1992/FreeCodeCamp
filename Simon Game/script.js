var start_btn = document.getElementById("start-button");
var gameIsStarted = false;
var end_btn = document.getElementById("end-button");
end_btn.addEventListener("click", function () {
    gameIsStarted = false;
});
var strict_btn = document.getElementById("strict-button");
start_btn.addEventListener("click", function () {
    //alert("Game was started!!!");
    gameIsStarted = true;
    start_game();
});
var strict_mode_on = false;
var strict_mode = document.getElementById("enable_strict_mode");
strict_mode.addEventListener("click", function () {
    strict_mode_on = true;
    alert("strict mode is turned on!!!");
});

/* Buttons */
// var top_btn = document.getElementById("top");
// var right = document.getElementById("right");
// var left = document.getElementById("left");
// var bottom = document.getElementById("bottom");

var arr = [0, 1, 2, 3];
var game = {
    computer_turn: true,
    user_turn: false,
    score: 0,
    level: 1,
    newArr: [],
    numberOfTurns: 0,
    userInputGiven: false
};

function start_game() {
    if (game.computer_turn) {
        var myArr = generateRandomNumberBasedOnLevel();
        for (var i = 0; i < myArr.length; i++) {
            changeColorSlowly(myArr[i]);
        }
    }
    game.newArr = [];
    game.userInputGiven = false;
    $("button").on("click", function () {
        //console.log("Button pressed!!!"+ event.target.id);
        switch (event.target.id) {
            case "top":
                game.newArr.push(0);
                userSelection(myArr);
                break;
            case "left":
                game.newArr.push(1);
                userSelection(myArr);
                break;
            case "right":
                game.newArr.push(2);
                userSelection(myArr);
                break;
            case "bottom":
                game.newArr.push(3);
                userSelection(myArr);
                break;
            default:
                break;
        }
    });

    
    
}

function userSelection(myArr) {
    var count = myArr.length;
    for (var i = 0; i < game.newArr.length; i++) {
        if (game.newArr[i] !== myArr[i])
            return false;
    }
    console.log("equal");
    return true;
}

function changeColorSlowly(i) {
    var myArr = ["#b22222", "#228b22", "#191970", "#daa520", "#f0ffff"];
    switch (i) {
        case 0:
            $("#top").animate({ backgroundColor: myArr[i] }, 300)
                .animate({ backgroundColor: myArr[myArr.length - 1] }, 300);
            break;
        case 1:
            $("#left").animate({ backgroundColor: myArr[i] }, 300)
                .animate({ backgroundColor: myArr[myArr.length - 1] }, 300);
            break;
        case 2:
            $("#right").animate({ backgroundColor: myArr[i] }, 300)
                .animate({ backgroundColor: myArr[myArr.length - 1] }, 300);
            break;
        case 3:
            $("#bottom").animate({ backgroundColor: myArr[i] }, 300)
                .animate({ backgroundColor: myArr[myArr.length - 1] }, 300);
            break;
        default:
            break;
    }

}
function generateRandomNumberBasedOnLevel() {
    var myArr = [];
    for (var i = 1; i <= game.level; i++) {
        myArr.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    console.log(myArr);
    return myArr;
}


