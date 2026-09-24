```javascript
const canvas =
    document.getElementById("game");

const ctx =
    canvas.getContext("2d");

let W = 800;
let H = 500;

let dpr = 1;

let animationFrame;

let lastTime = 0;

let currentGame = null;

let score = 0;

let best = 0;

let ended = false;

let keys = {};

let pointer = {
    x: 0,
    y: 0,
    down: false
};


/* =========================================================
   GAME DATA
========================================================= */

const icons = [
    "⚡","🌌","💎","🏰","🧪",
    "🪐","🎯","🚄","🏎️","🧠",
    "🔥","🤖","👾","🐍","🧱",
    "🏓","🪽","🧩","🎵","🚀"
];


const names = [

"Neon Dash",
"Void Runner",
"Neon Heist",
"Tiny Kingdom",
"Mutation Lab",
"Gravity Rush",
"Reflex Rush",
"Neon Rail Rush",
"Street Surge",
"Brain Blitz",

"Laser Lane",
"Bot Brawl",
"Alien Swarm",
"Snake Shift",
"Brick Breaker",
"Paddle Clash",
"Sky Flap",
"Color Grid",
"Beat Drop",
"Rocket Run",

"Cyber Jump",
"Astro Dodge",
"Coin Sprint",
"Castle Guard",
"Merge Lab",
"Moon Hop",
"Target Tap",
"Rail Switch",
"Turbo Drift",
"Quick Math",

"Shadow Run",
"Mech Arena",
"Meteor Storm",
"Snake Arena",
"Block Smash",
"Air Hockey",
"Bird Rush",
"Memory Flip",
"Rhythm Pulse",
"Star Pilot",

"Wall Runner",
"Orbital Escape",
"Gold Grab",
"Tower Hold",
"Element Mixer",
"Gravity Flip",
"Hit Marker",
"Track Switch",
"Drift King",
"Number Rush",

"Dash Circuit",
"Drone Dodge",
"Bug Blaster",
"Serpent Pro",
"Brick Storm",
"Table Tennis",
"Cloud Jumper",
"Match Mania",
"Beat Tunnel",
"Space Miner",

"Rooftop Run",
"Asteroid Belt",
"Gem Rush",
"Kingdom Siege",
"Alchemy 101",
"Planet Bounce",
"Reaction Box",
"Rail Raiders",
"Nitro Racer",
"Logic Lock",

"Cyber Sprint",
"Laser Orbit",
"Robot Raid",
"Snake Duel",
"Block Drop",
"Puck Attack",
"Wing Dash",
"Pair Finder",
"Pulse Beat",
"Galaxy Pilot",

"Skyline Sprint",
"Comet Dodger",
"Treasure Run",
"Fortress Defense",
"Fusion Factory",
"Gravity Well",
"Quick Draw",
"Rail Runner",
"Street Drifter",
"Brain Burst",

"Neon Sprint",
"Starfield Dodge",
"Coin Hunter",
"Castle Builder",
"Lab Reactor",
"Moon Gravity",
"Target Storm",
"Metro Switch",
"Racing Rivals",
"Math Mayhem",

"Volt Runner",
"Space Weave",
"Monster Attack",
"Snake Maze",
"Brick Frenzy",
"Paddle Wars",
"Feather Flight",
"Tile Memory",
"Beat Reactor",
"Cosmic Rocket",

"Skyline Dash",
"Meteor Weave",
"Vault Breaker",
"Cannon Guard",
"DNA Mixer",
"Gravity Tunnel",
"Aim Master",
"Rail Frenzy",
"Turbo Street",
"Puzzle Panic",

"Cyber Escape",
"Orbital Rush",
"Coin Cannon",
"Kingdom Clash",
"Element Rush",
"Flip Gravity",
"Reflex Arena",
"Rail Escape",
"Drift Assault",
"Number Ninja",

"Night Runner",
"Astro Rush",
"Gem Raider",
"Tower Tactics",
"Mutation Rush",
"Planet Flip",
"Tap Fury",
"Rail Chaos",
"Speed Racer",
"Brain Storm",

"Hyper Dash",
"Void Storm",
"Loot Run",
"Castle Siege",
"Fusion Frenzy",
"Gravity Racer",
"Reaction Hero",
"Rail Storm",
"Street Fury",
"Final Quiz"

];


const categories = [
    "Runner",
    "Action",
    "Puzzle",
    "Racing",
    "Arcade",
    "Strategy",
    "Reflex",
    "Rhythm"
];


const descriptions = [

    "Run, dodge and survive.",
    "Move fast. Don't get hit.",
    "Collect loot and escape.",
    "Build and protect.",
    "Combine and discover.",
    "Flip gravity to survive.",
    "Hit targets before time runs out.",
    "Switch lanes at the right moment.",
    "Race, drift and boost.",
    "Solve before time runs out."

];


const games =
    names.map((name, index) => {

        return {

            id: index,

            name,

            icon:
                icons[index % icons.length],

            category:
                categories[index % categories.length],

            description:
                descriptions[
                    index % descriptions.length
                ],

            type:
                index % 9

        };

    });


/* =========================================================
   CANVAS
========================================================= */

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    W =
        Math.max(
            320,
            rect.width
        );

    H =
        Math.max(
            300,
            rect.height
        );

    canvas.width =
        W * dpr;

    canvas.height =
        H * dpr;

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   HELPERS
========================================================= */

function random(min, max) {

    return (
        min +
        Math.random() *
        (max - min)
    );
}


function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );
}


function circle(
    x,
    y,
    radius,
    color
) {

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


function rectangle(
    x,
    y,
    width,
    height,
    color
) {

    ctx.fillStyle = color;

    ctx.fillRect(
        x,
        y,
        width,
        height
    );
}


function drawText(
    text,
    x,
    y,
    size,
    color = "#ffffff",
    align = "center"
) {

    ctx.fillStyle = color;

    ctx.font =
        `900 ${size}px system-ui`;

    ctx.textAlign = align;

    ctx.fillText(
        text,
        x,
        y
    );
}


function background() {

    rectangle(
        0,
        0,
        W,
        H,
        "#070912"
    );

    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const x =
            (i * 97 + score * .5)
            % W;

        const y =
            (i * 53)
            % H;

        circle(
            x,
            y,
            1.3,
            "#27304c"
        );
    }
}


function addScore(amount) {

    score += amount;

    document.getElementById(
        "score"
    ).textContent =
        Math.max(
            0,
            Math.floor(score)
        );
}


/* =========================================================
   GAME OVER
========================================================= */

function gameOver(
    message = "Game Over"
) {

    if (ended) return;

    ended = true;

    best =
        Math.max(
            best,
            Math.floor(score)
        );

    localStorage.setItem(
        "gv_best_" + currentGame.id,
        best
    );

    document.getElementById(
        "best"
    ).textContent = best;

    document.getElementById(
        "overText"
    ).textContent =
        `${message}  Score: ${Math.floor(score)} • Best: ${best}`;

    document.getElementById(
        "overlay"
    ).classList.remove("hidden");
}


/* =========================================================
   RUNNER
========================================================= */

function createRunner() {

    const player = {

        x: W * .22,

        y: H * .72,

        width: 35,

        height: 42,

        velocityY: 0,

        ground: H * .72

    };


    const obstacles = [];

    const coins = [];

    let spawnTimer = 0;

    let coinTimer = 0;

    let speed = 300;


    currentGame.update =
        function(dt) {

            const jump =
                keys["ArrowUp"] ||
                keys[" "] ||
                keys["w"];


            if (
                jump &&
                player.y >=
                player.ground - 2
            ) {

                player.velocityY =
                    -650;

            }


            player.velocityY +=
                1500 * dt;

            player.y +=
                player.velocityY * dt;


            if (
                player.y >
                player.ground
            ) {

                player.y =
                    player.ground;

            }


            spawnTimer += dt;


            if (
                spawnTimer > .65
            ) {

                spawnTimer = 0;

                obstacles.push({

                    x: W + 50,

                    y:
                        player.ground + 10,

                    width:
                        random(25, 50),

                    height:
                        random(35, 80)

                });

            }


            coinTimer += dt;


            if (
                coinTimer > .4
            ) {

                coinTimer = 0;

                coins.push({

                    x: W + 20,

                    y:
                        random(
                            H * .25,
                            player.ground - 40
                        ),

                    radius: 10

                });

            }


            obstacles.forEach(
                obstacle => {

                    obstacle.x -=
                        speed * dt;

                }
            );


            coins.forEach(
                coin => {

                    coin.x -=
                        speed * dt;

                }
            );


            obstacles.forEach(
                obstacle => {

                    const hit =
                        player.x <
                        obstacle.x +
                        obstacle.width &&

                        player.x +
                        player.width >
                        obstacle.x &&

                        player.y <
                        obstacle.y &&

                        player.y +
                        player.height >
                        obstacle.y -
                        obstacle.height;


                    if (hit) {

                        gameOver(
                            "You hit an obstacle!"
                        );

                    }

                }
            );


            coins.forEach(
                coin => {

                    const distance =
                        Math.hypot(
                            player.x -
                            coin.x,

                            player.y -
                            coin.y
                        );


                    if (
                        distance < 35
                    ) {

                        addScore(25);

                        coin.x = -100;

                    }

                }
            );


            speed +=
                dt * 4;

            addScore(
                dt * 5
            );


            while (
                obstacles.length &&
                obstacles[0].x < -100
            ) {

                obstacles.shift();

            }


            while (
                coins.length &&
                coins[0].x < -100
            ) {

                coins.shift();

            }

        };


    currentGame.draw =
        function() {

            background();


            rectangle(
                0,
                player.ground + 45,
                W,
                H,
                "#10152a"
            );


            obstacles.forEach(
                obstacle => {

                    rectangle(
                        obstacle.x,

                        obstacle.y -
                        obstacle.height,

                        obstacle.width,

                        obstacle.height,

                        "#ff416c"
                    );

                }
            );


            coins.forEach(
                coin => {

                    circle(
                        coin.x,
                        coin.y,
                        coin.radius,
                        "#ffd84d"
                    );

                }
            );


            rectangle(
                player.x,
                player.y,
                player.width,
                player.height,
                "#7cff67"
            );


            drawText(
                "◆",
                player.x +
                player.width / 2,

                player.y + 28,

                20,

                "#061006"
            );

        };


    currentGame.help =
        "SPACE / ↑ / W / TAP — JUMP • Collect coins • Avoid obstacles";

}


/* =========================================================
   DODGE
========================================================= */

function createDodge() {

    const player = {

        x: W / 2,

        y: H * .78,

        radius: 18

    };


    const enemies = [];

    let timer = 0;


    currentGame.update =
        function(dt) {

            let dx = 0;
            let dy = 0;


            if (keys.ArrowLeft)
                dx--;

            if (keys.ArrowRight)
                dx++;

            if (keys.ArrowUp)
                dy--;

            if (keys.ArrowDown)
                dy++;


            if (keys.a)
                dx--;

            if (keys.d)
                dx++;


            if (keys.w)
                dy--;

            if (keys.s)
                dy++;


            if (pointer.down) {

                player.x =
                    pointer.x;

                player.y =
                    pointer.y;

            } else {

                player.x +=
                    dx * 350 * dt;

                player.y +=
                    dy * 350 * dt;

            }


            player.x =
                clamp(
                    player.x,
                    20,
                    W - 20
                );


            player.y =
                clamp(
                    player.y,
                    20,
                    H - 20
                );


            timer += dt;


            if (
                timer > .3
            ) {

                timer = 0;

                enemies.push({

                    x:
                        random(
                            10,
                            W - 10
                        ),

                    y: -30,

                    radius:
                        random(10, 22),

                    speed:
                        random(170, 340)

                });

            }


            enemies.forEach(
                enemy => {

                    enemy.y +=
                        enemy.speed * dt;


                    const distance =
                        Math.hypot(
                            player.x -
                            enemy.x,

                            player.y -
                            enemy.y
                        );


                    if (
                        distance <
                        player.radius +
                        enemy.radius
                    ) {

                        gameOver(
                            "You were hit!"
                        );

                    }

                }
            );


            while (
                enemies.length &&
                enemies[0].y >
                H + 50
            ) {

                enemies.shift();

            }


            addScore(
                dt * 10
            );

        };


    currentGame.draw =
        function() {

            background();


            enemies.forEach(
                enemy => {

                    circle(
                        enemy.x,
                        enemy.y,
                        enemy.radius,
                        "#ff416c"
                    );

                }
            );


            circle(
                player.x,
                player.y,
                player.radius,
                "#59a7ff"
            );


            drawText(
                "SURVIVE",
                W / 2,
                H - 20,
                12,
                "#8891aa"
            );

        };


    currentGame.help =
        "ARROWS / WASD / TOUCH • Survive as long as possible";

}


/* =========================================================
   TARGET ATTACK
========================================================= */

function createTargetGame() {

    let target = {

        x: random(60, W - 60),

        y: random(80, H - 80),

        radius: 32

    };


    let timeLeft = 20;


    currentGame.update =
        function(dt) {

            timeLeft -= dt;


            if (
                timeLeft <= 0
            ) {

                gameOver(
                    "Time is up!"
                );

                return;

            }


            if (
                pointer.down
            ) {

                const distance =
                    Math.hypot(
                        pointer.x -
                        target.x,

                        pointer.y -
                        target.y
                    );


                if (
                    distance <
                    target.radius + 15
                ) {

                    addScore(100);


                    target = {

                        x:
                            random(
                                50,
                                W - 50
                            ),

                        y:
                            random(
                                70,
                                H - 70
                            ),

                        radius:
                            random(
                                20,
                                42
                            )

                    };

                } else {

                    addScore(-5);

                }


                pointer.down =
                    false;

            }

        };


    currentGame.draw =
        function() {

            background();


            circle(
                target.x,
                target.y,
                target.radius,
                "#7cff67"
            );


            circle(
                target.x,
                target.y,
                target.radius * .5,
                "#101426"
            );


            drawText(
                "TAP",
                target.x,
                target.y + 6,
                14
            );


            drawText(
                Math.ceil(timeLeft),
                W - 20,
                32,
                24,
                "#ffffff",
                "right"
            );

        };


    currentGame.help =
        "TAP the green target • Bigger targets are worth the same — go fast!";

}


/* =========================================================
   SNAKE
========================================================= */

function createSnake() {

    const columns = 22;

    const rows = 16;

    const cell =
        Math.min(
            W / columns,
            H / rows
        );


    let snake = [

        {
            x: 8,
            y: 8
        }

    ];


    let direction = {
        x: 1,
        y: 0
    };


    let nextDirection = {
        x: 1,
        y: 0
    };


    let food = {

        x: 15,
        y: 8

    };


    let timer = 0;


    currentGame.update =
        function(dt) {

            if (
                keys.ArrowUp &&
                direction.y === 0
            ) {

                nextDirection = {
                    x: 0,
                    y: -1
                };

            }


            if (
                keys.ArrowDown &&
                direction.y === 0
            ) {

                nextDirection = {
                    x: 0,
                    y: 1
                };

            }


            if (
                keys.ArrowLeft &&
                direction.x === 0
            ) {

                nextDirection = {
                    x: -1,
                    y: 0
                };

            }


            if (
                keys.ArrowRight &&
                direction.x === 0
            ) {

                nextDirection = {
                    x: 1,
                    y: 0
                };

            }


            timer += dt;


            if (
                timer > .11
            ) {

                timer = 0;

                direction =
                    nextDirection;


                const head = {

                    x:
                        snake[0].x +
                        direction.x,

                    y:
                        snake[0].y +
                        direction.y

                };


                const hitWall =
                    head.x < 0 ||
                    head.x >= columns ||
                    head.y < 0 ||
                    head.y >= rows;


                const hitBody =
                    snake.some(
                        part =>
                            part.x === head.x &&
                            part.y === head.y
                    );


                if (
                    hitWall ||
                    hitBody
                ) {

                    gameOver(
                        "Snake crashed!"
                    );

                    return;

                }


                snake.unshift(
                    head
                );


                if (
                    head.x === food.x &&
                    head.y === food.y
                ) {

                    addScore(100);


                    food = {

                        x:
                            Math.floor(
                                random(
                                    1,
                                    columns - 1
                                )
                            ),

                        y:
                            Math.floor(
                                random(
                                    1,
                                    rows - 1
                                )
                            )

                    };

                } else {

                    snake.pop();

                }

            }

        };


    currentGame.draw =
        function() {

            background();


            for (
                let y = 0;
                y < rows;
                y++
            ) {

                for (
                    let x = 0;
                    x < columns;
                    x++
                ) {

                    ctx.strokeStyle =
                        "#11172a";

                    ctx.strokeRect(
                        x * cell,
                        y * cell,
                        cell,
                        cell
                    );

                }

            }


            snake.forEach(
                (part, index) => {

                    rectangle(

                        part.x * cell + 2,

                        part.y * cell + 2,

                        cell - 4,

                        cell - 4,

                        index === 0
                            ? "#7cff67"
                            : "#38d67a"

                    );

                }
            );


            circle(

                food.x * cell +
                cell / 2,

                food.y * cell +
                cell / 2,

                cell * .3,

                "#ff416c"

            );

        };


    currentGame.help =
        "ARROW KEYS • Eat red food • Don't hit the wall or yourself";

}


/* =========================================================
   BRICK BREAKER
========================================================= */

function createBrickBreaker() {

    const paddle = {

        x: W / 2,

        width: 110

    };


    const ball = {

        x: W / 2,

        y: H * .7,

        vx: 240,

        vy: -300,

        radius: 8

    };


    const bricks = [];


    for (
        let row = 0;
        row < 5;
        row++
    ) {

        for (
            let col = 0;
            col < 8;
            col++
        ) {

            bricks.push({

                x:
                    20 +
                    col *
                    ((W - 40) / 8),

                y:
                    45 +
                    row * 28,

                width:
                    (W - 48) / 8,

                height: 20,

                destroyed: false

            });

        }

    }


    currentGame.update =
        function(dt) {

            if (
                pointer.down
            ) {

                paddle.x =
                    pointer.x;

            } else {

                if (
                    keys.ArrowLeft
                ) {

                    paddle.x -=
                        450 * dt;

                }


                if (
                    keys.ArrowRight
                ) {

                    paddle.x +=
                        450 * dt;

                }

            }


            paddle.x =
                clamp(
                    paddle.x,
                    paddle.width / 2,
                    W -
                    paddle.width / 2
                );


            ball.x +=
                ball.vx * dt;

            ball.y +=
                ball.vy * dt;


            if (
                ball.x < 8 ||
                ball.x > W - 8
            ) {

                ball.vx *= -1;

            }


            if (
                ball.y < 8
            ) {

                ball.vy *= -1;

            }


            if (
                ball.y >
                H + 30
            ) {

                gameOver(
                    "You missed the ball!"
                );

                return;

            }


            if (
                ball.y >
                H - 65 &&
                ball.y <
                H - 30 &&
                Math.abs(
                    ball.x -
                    paddle.x
                ) <
                paddle.width / 2
            ) {

                ball.vy =
                    -Math.abs(
                        ball.vy
                    );

            }


            bricks.forEach(
                brick => {

                    if (
                        brick.destroyed
                    ) return;


                    if (

                        ball.x >
                        brick.x &&

                        ball.x <
                        brick.x +
                        brick.width &&

                        ball.y >
                        brick.y &&

                        ball.y <
                        brick.y +
                        brick.height

                    ) {

                        brick.destroyed =
                            true;

                        ball.vy *=
                            -1;

                        addScore(25);

                    }

                }
            );


            if (
                bricks.every(
                    b => b.destroyed
                )
            ) {

                gameOver(
                    "YOU CLEARED THE BOARD!"
                );

            }

        };


    currentGame.draw =
        function() {

            background();


            bricks.forEach(
                brick => {

                    if (
                        !brick.destroyed
                    ) {

                        rectangle(

                            brick.x,

                            brick.y,

                            brick.width - 4,

                            brick.height,

                            "#a06cff"

                        );

                    }

                }
            );


            rectangle(

                paddle.x -
                paddle.width / 2,

                H - 38,

                paddle.width,

                12,

                "#7cff67"

            );


            circle(

                ball.x,

                ball.y,

                ball.radius,

                "#ffffff"

            );

        };


    currentGame.help =
        "← → / DRAG • Destroy every block";

}


/* =========================================================
   RACING
========================================================= */

function createRacing() {

    let lane = 1;

    const player = {

        x: 0,

        y: H * .80

    };


    const traffic = [];

    let timer = 0;

    let speed = 280;


    currentGame.update =
        function(dt) {

            if (
                keys.ArrowLeft ||
                keys.a
            ) {

                lane =
                    Math.max(
                        0,
                        lane - 1
                    );

                keys.ArrowLeft =
                    false;

                keys.a = false;

            }


            if (
                keys.ArrowRight ||
                keys.d
            ) {

                lane =
                    Math.min(
                        2,
                        lane + 1
                    );

                keys.ArrowRight =
                    false;

                keys.d = false;

            }


            if (
                pointer.down
            ) {

                if (
                    pointer.x <
                    W / 3
                ) {

                    lane = 0;

                } else if (
                    pointer.x >
                    W * 2 / 3
                ) {

                    lane = 2;

                } else {

                    lane = 1;

                }


                pointer.down =
                    false;

            }


            player.x =
                W *
                (
                    .25 +
                    lane * .25
                );


            timer += dt;


            if (
                timer > .65
            ) {

                timer = 0;


                traffic.push({

                    lane:
                        Math.floor(
                            Math.random() * 3
                        ),

                    y: -100

                });

            }


            traffic.forEach(
                car => {

                    car.y +=
                        speed * dt;


                    if (
                        car.lane === lane &&
                        Math.abs(
                            car.y -
                            player.y
                        ) < 70
                    ) {

                        gameOver(
                            "CRASH!"
                        );

                    }

                }
            );


            while (
                traffic.length &&
                traffic[0].y >
                H + 100
            ) {

                traffic.shift();

            }


            speed +=
                dt * 5;


            addScore(
                dt * 12
            );

        };


    currentGame.draw =
        function() {

            background();


            rectangle(
                W * .1,
                0,
                W * .8,
                H,
                "#151923"
            );


            for (
                let laneLine = 1;
                laneLine < 3;
                laneLine++
            ) {

                for (
                    let y = -50;
                    y < H;
                    y += 80
                ) {

                    rectangle(

                        W *
                        (
                            .1 +
                            laneLine *
                            .266
                        ),

                        y +
                        (
                            score %
                            80
                        ),

                        6,

                        40,

                        "#62697d"

                    );

                }

            }


            traffic.forEach(
                car => {

                    rectangle(

                        W *
                        (
                            .17 +
                            car.lane *
                            .266
                        ),

                        car.y,

                        60,

                        95,

                        "#ff416c"

                    );

                }
            );


            rectangle(

                player.x - 30,

                player.y,

                60,

                95,

                "#7cff67"

            );

        };


    currentGame.help =
        "← → / A D / TAP LANES • Avoid traffic";

}


/* =========================================================
   REFLEX
========================================================= */

function createReflex() {

    let state = "wait";

    let timer = 0;

    let delay =
        random(1, 3);


    currentGame.update =
        function(dt) {

            timer += dt;


            if (
                state === "wait" &&
                timer > delay
            ) {

                state = "go";

                timer = 0;

            }


            if (
                state === "go" &&
                pointer.down
            ) {

                const reaction =
                    timer;


                const points =
                    Math.max(
                        10,
                        1000 -
                        reaction * 900
                    );


                addScore(points);


                state = "done";

                pointer.down =
                    false;

            }


            if (
                state === "done" &&
                pointer.down
            ) {

                timer = 0;

                delay =
                    random(1, 3);

                state = "wait";

                pointer.down =
                    false;

            }

        };


    currentGame.draw =
        function() {

            rectangle(

                0,
                0,
                W,
                H,

                state === "go"
                    ? "#174d2d"
                    : "#15182a"

            );


            if (
                state === "wait"
            ) {

                drawText(
                    "WAIT...",
                    W / 2,
                    H / 2,
                    50,
                    "#ffd84d"
                );

            }


            if (
                state === "go"
            ) {

                drawText(
                    "TAP!",
                    W / 2,
                    H / 2,
                    65,
                    "#7cff67"
                );

                drawText(
                    timer.toFixed(3) +
                    "s",
                    W / 2,
                    H / 2 + 50,
                    20
                );

            }


            if (
                state === "done"
            ) {

                drawText(
                    "TAP TO PLAY AGAIN",
                    W / 2,
                    H / 2,
                    28
                );

            }

        };


    currentGame.help =
        "Wait for the green screen — then tap immediately!";

}


/* =========================================================
   PUZZLE / MATH
========================================================= */

function createMathGame() {

    let a =
        Math.floor(
            random(2, 30)
        );

    let b =
        Math.floor(
            random(2, 20)
        );

    let answer =
        a + b;

    let time =
        20;


    currentGame.update =
        function(dt) {

            time -= dt;


            if (
                time <= 0
            ) {

                gameOver(
                    "Too slow!"
                );

                return;

            }


            if (
                pointer.down
            ) {

                pointer.down =
                    false;


                const result =
                    prompt(
                        `Solve:\n\n${a} + ${b}`
                    );


                if (
                    Number(result) ===
                    answer
                ) {

                    addScore(100);


                    a =
                        Math.floor(
                            random(2, 40)
                        );

                    b =
                        Math.floor(
                            random(2, 30)
                        );

                    answer =
                        a + b;

                    time = 20;

                } else {

                    addScore(-25);

                }

            }

        };


    currentGame.draw =
        function() {

            background();


            drawText(
                `${a} + ${b} = ?`,
                W / 2,
                H / 2,
                50
            );


            drawText(
                `TIME ${Math.ceil(time)}`,
                W / 2,
                H / 2 + 50,
                20,
                "#7cff67"
            );


            drawText(
                "TAP TO ANSWER",
                W / 2,
                H - 30,
                14,
                "#8891aa"
            );

        };


    currentGame.help =
        "Tap the screen and solve the equation.";

}


/* =========================================================
   GAME START
========================================================= */

function startGame(game) {

    currentGame =
        game;

    resizeCanvas();

    score = 0;

    ended = false;

    best =
        Number(
            localStorage.getItem(
                "gv_best_" +
                game.id
            ) || 0
        );


    document.getElementById(
        "score"
    ).textContent = "0";


    document.getElementById(
        "best"
    ).textContent = best;


    document.getElementById(
        "overlay"
    ).classList.add(
        "hidden"
    );


    /*
       Each game ID selects a different
       gameplay configuration.

       More engines can be added here.
    */

    const engines = [

        createRunner,

        createDodge,

        createTargetGame,

        createSnake,

        createBrickBreaker,

        createMatchGame,

        createRacing,

        createReflex,

        createMathGame

    ];


    const engine =
        engines[
            game.type %
            engines.length
        ];


    engine();


    document.getElementById(
        "gameHelp"
    ).textContent =
        currentGame.help;


    cancelAnimationFrame(
        animationFrame
    );


    lastTime =
        performance.now();


    gameLoop(
        lastTime
    );

}


/* =========================================================
   MAIN LOOP
========================================================= */

function gameLoop(now) {

    const dt =
        Math.min(
            .035,
            (now - lastTime) /
            1000
        );


    lastTime =
        now;


    if (
        !ended &&
        currentGame
    ) {

        currentGame.update(dt);

        currentGame.draw();

    }


    animationFrame =
        requestAnimationFrame(
            gameLoop
        );

}


/* =========================================================
   GAME LIST
========================================================= */

function renderGames() {

    const grid =
        document.getElementById(
            "grid"
        );


    const search =
        document
            .getElementById(
                "search"
            )
            .value
            .toLowerCase();


    const category =
        document
            .getElementById(
                "category"
            )
            .value;


    grid.innerHTML = "";


    games
        .filter(game => {

            const matchesSearch =
                game.name
                    .toLowerCase()
                    .includes(search);


            const matchesCategory =
                category === "all" ||
                game.category ===
                category;


            return (
                matchesSearch &&
                matchesCategory
            );

        })
        .forEach(game => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            card.innerHTML = `

                <div>

                    <span class="icon">
                        ${game.icon}
                    </span>

                    <span class="pill">
                        ${game.category}
                    </span>

                    <h3>
                        ${game.name}
                    </h3>

                    <p>
                        ${game.description}
                    </p>

                </div>

                <small>
                    PLAY →
                </small>

            `;


            card.onclick =
                () => openGame(game);


            grid.appendChild(card);

        });

}


/* =========================================================
   OPEN GAME
========================================================= */

function openGame(game) {

    document
        .getElementById("home")
        .classList.add(
            "hidden"
        );


    document
        .getElementById("gameScreen")
        .classList.remove(
            "hidden"
        );


    document
        .getElementById("backBtn")
        .classList.remove(
            "hidden"
        );


    document
        .getElementById("gameCat")
        .textContent =
        game.category.toUpperCase();


    document
        .getElementById("gameTitle")
        .textContent =
        game.icon +
        " " +
        game.name;


    startGame(game);

}


/* =========================================================
   HOME
========================================================= */

function showHome() {

    cancelAnimationFrame(
        animationFrame
    );


    document
        .getElementById("gameScreen")
        .classList.add(
            "hidden"
        );


    document
        .getElementById("home")
        .classList.remove(
            "hidden"
        );


    document
        .getElementById("backBtn")
        .classList.add(
            "hidden"
        );


    renderGames();

}


/* =========================================================
   CATEGORY MENU
========================================================= */

const categorySelect =
    document.getElementById(
        "category"
    );


[...new Set(
    games.map(
        game =>
            game.category
    )
)].forEach(category => {

    const option =
        document.createElement(
            "option"
        );


    option.value =
        category;


    option.textContent =
        category;


    categorySelect.appendChild(
        option
    );

});


/* =========================================================
   CONTROLS
========================================================= */

window.addEventListener(
    "keydown",
    event => {

        keys[event.key] =
            true;

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[event.key] =
            false;

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


function updatePointer(event) {

    const rect =
        canvas.getBoundingClientRect();


    pointer.x =
        event.clientX -
        rect.left;


    pointer.y =
        event.clientY -
        rect.top;

}


canvas.addEventListener(
    "pointermove",
    updatePointer
);


canvas.addEventListener(
    "pointerdown",
    event => {

        updatePointer(event);

        pointer.down =
            true;

    }
);


canvas.addEventListener(
    "pointerup",
    () => {

        pointer.down =
            false;

    }
);


/* =========================================================
   BUTTONS
========================================================= */

document
    .getElementById("backBtn")
    .onclick =
    showHome;


document
    .getElementById("homeBtn")
    .onclick =
    showHome;


document
    .getElementById("restart")
    .onclick =
    () => {

        if (
            currentGame
        ) {

            startGame(
                currentGame
            );

        }

    };


document
    .getElementById("search")
    .addEventListener(
        "input",
        renderGames
    );


categorySelect.addEventListener(
    "change",
    renderGames
);


/* =========================================================
   START
========================================================= */

renderGames();
```

