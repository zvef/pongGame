var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var score1 = 0;
var score2 = 0;
var keys = [];

window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
    e.preventDefault();
});

window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
});

function Box(options) {
    this.x = options.x || 10;
    this.y = options.y || 10;
    this.width = options.width || 40;
    this.height = options.height || 50;
    this.color = options.color || '#000000';
    this.speed = options.speed || 5;
    this.gravity = options.gravity || 2;
}

var player = new Box({
    x: 10,
    y: 10,
    width: 20,
    height: 100,
    color: '#64EA0E',
    // speed: 7,
    gravity: 5
});

var player2 = new Box({
    x: canvas.width - 50,
    y: canvas.height - 150,
    width: 20,
    height: 100,
    color: '#EA0E0E',
    // speed: 7,
    gravity: 5
});

var midline = new Box({
    x: (canvas.width/2),
    y: -1,
    width: 5,
    height: canvas.height+1,
    color: "#ffffff"
})

var ball = new Box({
    x: (canvas.width/2),
    y: (canvas.height/2),
    width: 15,
    height: 12,
    color: '#ffffff',
    speed: 2,
    gravity: 2
});

function input() {
    if (87 in keys) {
    if (player.y - player.gravity > 0) {
        player.y -= player.gravity;
    }
    } else if (83 in keys) {
        if (player.y + player.height + player.gravity < canvas.height) {
            player.y += player.gravity;
        }
    }
    if (38 in keys) {
        if (player2.y - player2.gravity > 0) {
            player2.y -= player2.gravity;
        }
    } else if (40 in keys) {
        if (player2.y + player2.height + player2.gravity < canvas.height) {
            player2.y += player2.gravity;
        }
    }
}

function displayScore1() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(0, 255, 0)";
    var str1 = score1;
    ctx.fillText(str1, (canvas.width / 2) + 50, 30);
}

function displayScore2() {
    ctx.font = "20px Arial";
    ctx.fillStyle = "rgb(255, 0, 0)";
    var str2 = score2;
    ctx.fillText(str2, (canvas.width /2) - 60, 30);
}

function ballBounce(){
    if (((ball.y + ball.gravity) <= 0) || 
        ((ball.y + ball.gravity + ball.height) >= canvas.height)){
            ball.gravity = ball.gravity * -1;
            ball.y += ball.gravity;
            ball.x += ball.speed;
    } else {
        ball.x += ball.speed;
        ball.y += ball.gravity;
    }
    ballCollision();
}

function ballCollision() {
    if (((ball.x + ball.speed <= player.x + player.width) && 
        (ball.y + ball.gravity > player.y) && 
        (ball.y + ball.gravity <= player.y + player.height)) || 
        ((ball.x + ball.width + ball.speed >= player2.x) && 
        (ball.y + ball.gravity > player2.y) && 
        (ball.y + ball.gravity <= player2.y + player2.height))) {
            ball.speed = ball.speed * -1;
    } else if (ball.x + ball.speed < player.x) {
        score2 += 1;
        ball.speed = ball.speed * -1;
        ball.x = 100 + ball.speed;
        ball.y += ball.gravity;
    } else if (ball.x + ball.speed > player2.x + player2.width) {
        score1 += 1;
        ball.speed = ball.speed * -1;
        ball.x = 500 + ball.speed;
        ball.y += ball.gravity;
    } else {
        ball.x += ball.speed;
        ball.y += ball.gravity;
    }
    draw();
}

function drawBox(box) {
    ctx.fillStyle = box.color;
    ctx.fillRect(box.x, box.y, box.width, box.height);
}

function update() {
    input();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBox(player);
    drawBox(player2);
    drawBox(midline);
    displayScore1();
    displayScore2();
    drawBox(ball);
}

function loop() {
    update();
    ballBounce();
    window.requestAnimationFrame(loop);
}

loop();






