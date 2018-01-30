//wroted by amirhosein nazari 
// 2018 


// config the environment   
const max_environment = 26;
const min_environment = 0;
const enviroment_size = max_environment + 1;

//global 
var last_move; // this is last move direction
var goal_x;
var goal_y;
var goal_counter;

// we  have 4 direction that shows the breaks in snake body 
// right : r  , left : l , u : up , b: bottom nd: notdecieded yet!!


function goal_maker() {

    while (true) {
        // random place for goal
        x = Math.floor(Math.random() * max_environment);
        y = Math.floor(Math.random() * max_environment);


        // you should check there is no section of snake there 
        flag = map_validator(x, y);
        console.log("x : " + x + "   y : " + y);
        if (flag) {
            // return [x, y]
            goal_x = x;
            goal_y = y;
            $("#x" + x + "y" + y).css({ "background-color": "red", "border-radius": "0px" });
            return;
        }
    }
};


var snake = {
    // how many section does snake
    s_lenght: 0,
    level: 0,
    // in order x cordinate and y cordinate and direction 
    section: [[10, 10, 'l'], [11, 10, 'l'], [12, 10, 'l'], [13, 10, 'l'], [13, 11, 'u'], [13, 12, 'u']],


    //  our limitation form enviroment
    max_x_level: max_environment,
    max_y_level: max_environment,
    min_x_level: min_environment,
    min_y_level: min_environment,
    //................................

    up: function () {
        var cordinate_x = this.section[0][0];
        var cordinate_y = this.section[0][1];
        var head_direction = this.section[0][2];
        if (head_direction == 'b' || cordinate_x <= min_environment) {
            //because when you are going down you can't change direction to bottom
            console.log("this request could not proecss!");
            return 0;
        }

        cordinate_x--;
        //  this.lose();
        next_move(cordinate_x, cordinate_y, 'u');

    },
    bottom: function () {
        var cordinate_x = this.section[0][0];
        var cordinate_y = this.section[0][1];
        var head_direction = this.section[0][2];
        if (head_direction == 'u' || cordinate_x >= max_environment) {
            console.log("this request could not proecss!");
            return 0;
        }
        cordinate_x++;
        //  this.lose();
        next_move(cordinate_x, cordinate_y, 'b');
    },
    left: function () {
        var cordinate_x = this.section[0][0];
        var cordinate_y = this.section[0][1];
        var head_direction = this.section[0][2];
        if (head_direction == 'r' || cordinate_y <= min_environment) {
            console.log("this request could not proecss!");
            return 0;
        }
        cordinate_y--;
        // this.lose();
        next_move(cordinate_x, cordinate_y, 'l');
    },
    right: function () {
        var cordinate_x = this.section[0][0];
        var cordinate_y = this.section[0][1];
        var head_direction = this.section[0][2];
        if (head_direction == 'l' || cordinate_y >= max_environment) {
            console.log("this request could not proecss!");
            return 0;
        }
        cordinate_y++;
        // this.lose();
        next_move(cordinate_x, cordinate_y, 'r');
    },
    lose: function () {
        if (cordinate_x > max_environment || cordinate_y > max_environment || cordinate_x < min_environment || cordinate_y < min_environment) {
            return true;
        }
    },
    goal_eated: function (x, y, charachter) {
        this.s_lenght++;
        this.section.push([x, y, charachter]);
        console.log("The lenght of section is : " + this.section.lenght);

    },
    wining: function () {
        if (this.lenght = max_environment * max_environment) {
            console.log("You won the game");
        }
    }

}

// console.log(snake.lenght);
// snake.goal_eated();
// snake.goal_eated();
// snake.wining();

console.log(snake.section[0]);
console.log("size : " + snake.section.length);


// we want to make game map here 
// class game_map {
//     //given start point of snake 
//     // these are should came from random function
//     constructor(initial_x, initial_y) {
//         this.x = initial_x;
//         this.y = initial_y;
//     }
// }

// when a goal eated 
//snake.section.push([0, 0, 'u']);



// console.log("before running ...")
// snake.section.forEach(element => {
//     console.log(element); 
//     //element[0]; 
// });

function next_move(x, y, char) {
    //direction harkati ke mikhad hazf she ro migire
    last_move = snake.section[snake.section.length - 1][2];
    for (var size = snake.section.length - 1; size > 0; size--) {
        snake.section[size] = snake.section[size - 1];
    };

    if (x == goal_x && y == goal_y) {
        snake.section.push([[snake.section.length - 1][0], [snake.section.length - 1][1], [snake.section.length - 1][2]])
        goal_maker();
    }

    snake.section[0] = [x, y, char];
}

// console.log("after changing the array")
// // for printing all member in arraye i javascript 
// snake.section.forEach(element => {
//     console.log(element); 

//     //element[0]; 
// });

//console.log(snake.section[0][2]);
//console.log(snake.section.lenght);

//console.log(snake.lenght);

// i am getting whole windows to keep tracking of keyCodes
$(window).keydown(function (event) {
    var x = event.which || event.keyCode; // event.keyCode is used for IE8 and earlier
    console.log(x);
    switch (x) {
        case 37:
            console.log("pressed left key");
            var tail = give_tail();
            snake.left();
            show();
            visual_snake(tail);
            break;
        case 38:
            console.log("pressed up key");
            var tail = give_tail();
            snake.up();
            show();
            visual_snake(tail);
            break;
        case 39:
            console.log("pressed right key");
            //give me my tail 
            var tail = give_tail();
            snake.right();
            show();
            visual_snake(tail);
            break;
        case 40:
            console.log("pressed down key");
            var tail = give_tail();
            snake.bottom();
            show();
            visual_snake(tail);
            break;
        default:
            break;
    }
});

function show() {
    snake.section.forEach(element => {
        console.log(element);
    });
}

//this is for making grids in page
function createGrid(x) {
    console.log("this works properly");
    for (var rows = 0; rows < x; rows++) {
        for (var columns = 0; columns < x; columns++) {
            $(".container").append("<div class='grid' id='x" + rows + "y" + columns + "'></div>");
        };
    };
    $(".grid").width(460 / x);
    $(".grid").height(460 / x);
};

function visual_snake(tail) {
    //remove last position of tail 

    $("#x" + tail[0] + "y" + tail[1]).css("background-color", "rgb(124, 161, 69)");

    for (var size = snake.section.length - 1; size > 0; size--) {
        var x_value = snake.section[size][0];
        var y_value = snake.section[size][1]
        $("#x" + x_value + "y" + y_value).css("background-color", "rgb(105, 80, 60)");
    };
    //head should be in different color
    var size = 0;
    var x_value = snake.section[size][0];
    var y_value = snake.section[size][1]
    $("#x" + x_value + "y" + y_value).css("background-color", "rgb(59, 41, 26");

}

function give_tail() {
    var size = snake.section.length - 1;
    var x_value = snake.section[size][0];
    var y_value = snake.section[size][1];
    return [x_value, y_value];
}

function map_validator(x, y) {
    for (var size = snake.section.length - 1; size >= 0; size--) {
        var x_value = snake.section[size][0];
        var y_value = snake.section[size][1]
        if (x == x_value && y == y_value) {
            return false;
        } else if (x > max_environment || x < min_environment || y > max_environment || y < min_environment) {
            return false;

        } else {
            return true;
        }
    };
}

$(document).ready(function () {
    createGrid(enviroment_size);
    visual_snake([0, 0]);
    goal_maker();

    // i have defined a global variable 
    //if an event change that so it's ok i will use that but if it dident i will use mine 
    setInterval(function () {
        var tail = give_tail();
         switch(snake.section[2]){
             case 'u': 
             snake.up();
             break;
             case 'b': 
             snake.bottom();
             break;
             case 'r': 
             snake.right();
             break;
             case 'l': 
             snake.left();
             break;
         }
        show();
        visual_snake(tail);
    }, 1000);

});

