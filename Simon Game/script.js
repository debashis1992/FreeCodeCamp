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

$("#top").on("click", function () {
    game.newArr.push(0);
});
$("#left").on("click", function () {
    game.newArr.push(1);
});
$("#right").on("click", function () {
    game.newArr.push(2);
});
$("#bottom").on("click", function () {
    game.newArr.push(3);
});

var arr = [0, 1, 2, 3];
var game = {
    computer_turn: true,
    user_turn: false,
    score: 0,
    level: 1,
    newArr: [],
    numberOfTurns: 0,
    userInputGiven: false,
    interval: 0,
    computer_arr: [],
};

function start_game() {
    game.computer_arr = [];
    game.computer_arr = generateRandomNumberBasedOnLevel();
    game.newArr = [];
    game.userInputGiven = false;
    function resolveAfter5Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 4000);
        });
    }
    for (var i = 0; i < game.computer_arr.length; i++) {
        changeColorSlowly(game.computer_arr[i]);
    }

    async function f1() {
        var x = await resolveAfter5Seconds(5);
        if (checkInput()) {
            //move to next level
            game.level++;
            game.score++;
            start_game();
        } else {
            console.log("Invalid input. Game ended!!");
        }
    }
    f1();


}

function checkInput() {
    var result = null;
    if (game.newArr.length > 0)
        result = game.newArr.length;
    else result = 0;
    clearInterval(game.interval);
    game.interval = 0;
    //console.log("check input result : "+result);
    if (result > 0 && userSelection(game.computer_arr))
        return true;
    else return false;

}

function userSelection(myArr) {
    var count = myArr.length;
    for (var i = 0; i < game.newArr.length; i++) {
        if (game.newArr[i] !== myArr[i]) {
            console.log("not equal");
            return false;
        }
    }

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


