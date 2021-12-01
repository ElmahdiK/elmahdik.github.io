/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */
// tuto mdn: https://developer.mozilla.org/fr/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var canvas, ctx;
var x, y, dx, dy;
var colorTheme = "#0095DD";

var ballRadius = 10;
var ballSpeed = 2;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX;
var rightPressed, leftPressed;
rightPressed = leftPressed = false;
var interval;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10; // espacement entre les briques
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];

var score = 0;
var lives = 3;
var nbTouch = 0;
var gameStart = false;

window.onload = _ => {
    canvas = $(`#myCanvas`);
    ctx = canvas.getContext(`2d`);

    x = canvas.width / 2;
    y = canvas.height - 20;
    // direction = dx + dy
    dx = ballSpeed;
    dy = -ballSpeed;


    paddleX = (canvas.width - paddleWidth) / 2;

    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) bricks[c][r] = { x: 0, y: 0, status: 1 };
    }

    /*
    ctx.beginPath();
    ctx.rect(20,40,50,50);
    ctx.fillStyle = `#FF0000`;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(240,160,20,0,Math.PI*2,false);
    ctx.fillStyle=`green`;
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(160,10,100,40);
    ctx.strokeStyle="rgba(0,0,255,0.5)";
    ctx.stroke();
    ctx.closePath();
    */

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    // interval = setInterval(draw, 10); // speed = 10ms
    draw();
}

const keyDownHandler = e => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = true;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = true;
}

const keyUpHandler = e => {
    if (e.key == "Right" || e.key == "ArrowRight") rightPressed = false;
    else if (e.key == "Left" || e.key == "ArrowLeft") leftPressed = false;

    if (e.code == "Space" || e.key == "Enter") gameStart = true;
}

const mouseMoveHandler = e => {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
        if (!gameStart) x = relativeX;
    }
}

const collisionDetection = _ => {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            // calculs
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("C'est gagné, Bravo !");
                        document.location.reload();
                        // clearInterval(interval);
                    }
                }
            }
        }
    }
}

const drawScore = _ => {
    ctx.font = "16px Arial";
    ctx.fillStyle = colorTheme;
    ctx.fillText("Score : " + score, 8, 20);
}

const drawLives = _ => {
    ctx.font = "16px Arial";
    ctx.fillStyle = colorTheme;
    ctx.fillText("Lives : " + lives, canvas.width - 65, 20);
}

const drawNbTouch = _ => {
    ctx.font = "16px Arial";
    ctx.fillStyle = colorTheme;
    ctx.fillText("Nb coups : " + nbTouch, (canvas.width - 65) / 2, 20);
}

const drawBall = _ => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // Shadow
    ctx.shadowColor = '#bbb';
    ctx.shadowBlur = 10;

    ctx.fillStyle = colorTheme;
    ctx.fill();
    ctx.closePath();
}

const drawBricks = _ => {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;

                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = colorTheme;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

const drawPaddle = _ => {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = colorTheme;
    ctx.fill();
    ctx.closePath();
}


const draw = _ => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    drawNbTouch();
    drawBricks();
    collisionDetection();

    // collision
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        // colorTheme = "#de2e87";
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        // colorTheme = "#15c784";
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy; //-1 // for speed;

            nbTouch++;
        } else {
            lives--;
            if (!lives) {
                alert(`GAME OVER`);
                document.location.reload();
                // clearInterval(interval); // Needed for Chrome to end game
            } else {
                x = canvas.width / 2;
                y = canvas.height - 20;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
                gameStart = false;
            }
        }
    }

    // déplacement de la raquette (paddle)
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        if (!gameStart) x += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
        if (!gameStart) x -= 7;
    }

    if (gameStart) {
        x += dx;
        y += dy;
    }

    requestAnimationFrame(draw);
}





/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'assets/particles.json', function () {
//     console.log('callback - particles.js config loaded');
// });