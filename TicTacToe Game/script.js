//$(document).ready(function () {
    var turns = 0;
    var click = {
        user : "",
        computer: ""
    }; 
    var generationArr = [];
    for(var i=0;i<9;i++)
        generationArr.push(i);
    var chance = true;
    var start_game = false;
    var arr = [
        null , null , null,
        null , null , null,
        null , null , null,
    ];
    var dialog = document.getElementById('id_confrmdiv');
    dialog.style.display = "block";
    $("#id_truebtn").on("click", function () {
        click.user = "X";
        click.computer = "O";
        start_game = true;
        dialog.style.visibility = "hidden";
    });
    $("#id_falsebtn").on("click", function () {
        click.user = "O";
        click.computer = "X";
        start_game = true;
        dialog.style.visibility = "hidden";
    });
    $(".columns").on("click", function (event) {
        //console.log(event.target.childNodes[1]);
        var id = event.target.childNodes[1].id;
        if (start_game) {
            //if (chance) {
                event.target.childNodes[1].textContent = click.user;
                arr[id] = click.user;
                //Removing id from generationArray
                for(var i=generationArr.length;i>=0;i--) {
                    if(generationArr[i]==id)
                        generationArr.splice(i,1);
                }
                //Here user2 is computer
                var user2 = generateRandomNumber(generationArr);
                for(var i=generationArr.length;i>=0;i--) {
                    if(generationArr[i]==user2)
                        generationArr.splice(i,1);
                }
                var element = "#"+user2;
                if(click.user=="X")
                    $(element).text("O");
                else $(element).text("X");

            //}
            // else {
            //     event.target.childNodes[1].textContent = click.computer;
            //     arr[id] = click.computer;
            // }
            //chance = !chance;

            var winner = validateEndOfGame();
            if(winner==click.user) {
                alert("Winner : User");
                resetGame();
            }
            else if(winner==click.computer) {
                alert("Winner : Computer");
                resetGame();
            }
            turns++;
            if (turns == 9) {
                winner = validateEndOfGame();
                if(winner!=click.user && winner!=click.computer)
                    alert("There was a draw");
                else if(winner==click.user)
                    alert("Winner : User");
                else if(winner=click.computer)
                    alert("Winner : Computer");
                resetGame();
            }
        }
    });
    function validateEndOfGame() {
        var k=0;
        var newArr = makeArray(3,3);
        for(var i=0;i<3;i++) {
            for(var j=0;j<3;j++) {
                newArr[i][j] = arr[k];
                k++;
            }
        }

        //console.log(newArr);
        if((newArr[0][0]!=null && newArr[0][0]==newArr[0][1] && newArr[0][1]==newArr[0][2]))
            return newArr[0][0];
        if((newArr[1][0]!=null && newArr[1][0]==newArr[1][1] && newArr[1][1]==newArr[1][2]))
            return newArr[1][0]; 
        if((newArr[2][0]!=null && newArr[2][0]==newArr[2][1] && newArr[2][1]==newArr[2][2]))
            return newArr[2][0];
        if((newArr[0][0]!=null && newArr[0][0]==newArr[1][0] && newArr[1][0]==newArr[2][0]))
            return newArr[0][0];
        if((newArr[0][1]!=null && newArr[0][1]==newArr[1][1] && newArr[1][1]==newArr[2][1]))
            return newArr[1][0];
        if((newArr[0][2]!=null && newArr[0][2]==newArr[1][2] && newArr[1][2]==newArr[2][2]))
            return newArr[2][0];

        if(newArr[0][0]!=null && newArr[0][0]==newArr[1][1] && newArr[1][1]==newArr[2][2])
            return newArr[0][0];
        if(newArr[0][2]!=null && newArr[0][2]==newArr[1][1] && newArr[1][1]==newArr[2][0])
            return newArr[0][2];

    }
    function makeArray(d1, d2) {
        var arr = [];
        for(i = 0; i < d2; i++) {
            arr.push(new Array(d1));
        }
        return arr;
    } 
    function resetGame() {
        turns = 0;
        click.user = "", click.computer = "";
        dialog.style.display = "block";
        dialog.style.visibility = "";
        $(".cells").html('');
        arr = new Array(9);
        chance = true;
        for(var i=0;i<9;i++)
            generationArr.push(i);
        console.log("reset game!!");
    }
    function generateRandomNumber(generationArr) {
        var rand = generationArr[Math.floor(Math.random() * generationArr.length)];
        console.log("Random value : "+rand);
        if(rand===undefined) {
            alert("Draw game!!");
            resetGame();
        }
        return rand;
    }
//});