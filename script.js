```javascript
/* =========================================================
   GAMEVERSE
   160 PLAYABLE GAME ENTRIES
   ========================================================= */

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const category = document.getElementById("category");

const home = document.getElementById("home");
const gameScreen = document.getElementById("gameScreen");
const backBtn = document.getElementById("backBtn");

const gameTitle = document.getElementById("gameTitle");
const gameCat = document.getElementById("gameCat");
const gameHelp = document.getElementById("gameHelp");

const scoreDisplay = document.getElementById("score");
const bestDisplay = document.getElementById("best");

const overlay = document.getElementById("overlay");
const overText = document.getElementById("overText");

const restartButton =
    document.getElementById("restart");

const homeButton =
    document.getElementById("homeBtn");


/* =========================================================
   CANVAS
   ========================================================= */

let W = 800;
let H = 500;

function resizeCanvas() {

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    W = Math.max(320, rect.width);
    H = Math.max(300, rect.height);

    canvas.width = W * dpr;
    canvas.height = H * dpr;

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
   CONTROLS
   ========================================================= */

const keys = {};

const pointer = {
    x: 0,
    y: 0,
    down: false
};


window.addEventListener(
    "keydown",
    e => {

        keys[e.key] = true;

        keys[e.key.toLowerCase()] = true;

    }
);


window.addEventListener(
    "keyup",
    e => {

        keys[e.key] = false;

        keys[e.key.toLowerCase()] = false;

    }
);


canvas.addEventListener(
    "pointermove",
    e => {

        const r =
            canvas.getBoundingClientRect();

        pointer.x =
            e.clientX - r.left;

        pointer.y =
            e.clientY - r.top;

    }
);


canvas.addEventListener(
    "pointerdown",
    e => {

        const r =
            canvas.getBoundingClientRect();

        pointer.x =
            e.clientX - r.left;

        pointer.y =
            e.clientY - r.top;

        pointer.down = true;

    }
);


canvas.addEventListener(
    "pointerup",
    () => {

        pointer.down = false;

    }
);


/* =========================================================
   HELPERS
   ========================================================= */

function rand(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


function randInt(min, max) {

    return Math.floor(
        rand(min, max + 1)
    );

}


function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function rect(
    x,
    y,
    w,
    h,
    color
) {

    ctx.fillStyle = color;

    ctx.fillRect(
        x,
        y,
        w,
        h
    );

}


function circle(
    x,
    y,
    r,
    color
) {

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        r,
        0,
        Math.PI * 2
    );

    ctx.fill();

}


function text(
    value,
    x,
    y,
    size,
    color = "#fff"
) {

    ctx.fillStyle = color;

    ctx.font =
        `900 ${size}px system-ui`;

    ctx.textAlign = "center";

    ctx.fillText(
        value,
        x,
        y
    );

}


function clear(color = "#070912") {

    rect(
        0,
        0,
        W,
        H,
        color
    );

}


function addScore(value) {

    score += value;

    scoreDisplay.textContent =
        Math.max(
            0,
            Math.floor(score)
        );

}


function saveBest() {

    best =
        Math.max(
            best,
            Math.floor(score)
        );

    localStorage.setItem(
        "gameverse_best_" +
        currentGame.id,
        best
    );

    bestDisplay.textContent =
        best;

}


/* =========================================================
   160 GAMES
   ========================================================= */

const gameNames = [

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


const emojis = [
"⚡","🌌","💎","🏰","🧪",
"🪐","🎯","🚄","🏎️","🧠",
"🔥","🤖","👾","🐍","🧱",
"🏓","🪽","🧩","🎵","🚀"
];


const categoryNames = [
"Runner",
"Action",
"Puzzle",
"Racing",
"Arcade",
"Strategy",
"Reflex",
"Rhythm"
];


const gameDescriptions = [
"Run and survive.",
"Destroy enemies.",
"Collect as many points as possible.",
"Beat the level.",
"Solve the challenge.",
"Don't get hit.",
"React as quickly as possible.",
"Master the track."
];


const games =
    gameNames.map(
        (name, index) => ({

            id: index,

            name: name,

            icon:
                emojis[
                    index %
                    emojis.length
                ],

            category:
                categoryNames[
                    index %
                    categoryNames.length
                ],

            description:
                gameDescriptions[
                    index %
                    gameDescriptions.length
                ],

            engine:
                index % 8

        })
    );


/* =========================================================
   GAME STATE
   ========================================================= */

let currentGame = null;

let gameRunning = false;

let gameOverState = false;

let score = 0;

let best = 0;

let lastTime = 0;

let animation;


const state = {};


/* =========================================================
   GAME LIST
   ========================================================= */

function createGameCards() {

    grid.innerHTML = "";

    const searchText =
        search.value
            .trim()
            .toLowerCase();

    const selectedCategory =
        category.value;


    games.forEach(game => {

        const matchesSearch =
            !searchText ||
            game.name
                .toLowerCase()
                .includes(searchText);


        const matchesCategory =
            selectedCategory === "all" ||
            game.category ===
            selectedCategory;


        if (
            !matchesSearch ||
            !matchesCategory
        ) {

            return;

        }


        const card =
            document.createElement("div");

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


        card.addEventListener(
            "click",
            () => openGame(game)
        );


        grid.appendChild(card);

    });

}


/* =========================================================
   CATEGORY OPTIONS
   ========================================================= */

category.innerHTML = `
    <option value="all">
        All categories
    </option>
`;


categoryNames.forEach(name => {

    const option =
        document.createElement("option");

    option.value = name;

    option.textContent = name;

    category.appendChild(option);

});


search.addEventListener(
    "input",
    createGameCards
);


category.addEventListener(
    "change",
    createGameCards
);


/* =========================================================
   OPEN GAME
   ========================================================= */

function openGame(game) {

    currentGame =
        game;

    home.classList.add(
        "hidden"
    );

    gameScreen.classList.remove(
        "hidden"
    );

    backBtn.classList.remove(
        "hidden"
    );


    gameTitle.textContent =
        game.icon +
        " " +
        game.name;


    gameCat.textContent =
        game.category.toUpperCase();


    score = 0;

    gameOverState =
        false;

    gameRunning =
        true;


    best =
        Number(
            localStorage.getItem(
                "gameverse_best_" +
                game.id
            ) || 0
        );


    scoreDisplay.textContent =
        "0";

    bestDisplay.textContent =
        best;


    overlay.classList.add(
        "hidden"
    );


    resizeCanvas();


    startEngine(
        game.engine
    );


    cancelAnimationFrame(
        animation
    );


    lastTime =
        performance.now();


    animation =
        requestAnimationFrame(
            loop
        );

}


/* =========================================================
   GAME LOOP
   ========================================================= */

function loop(time) {

    const dt =
        Math.min(
            0.035,
            (time - lastTime) /
            1000
        );


    lastTime =
        time;


    if (
        gameRunning &&
        !gameOverState
    ) {

        updateGame(dt);

        drawGame();

    }


    animation =
        requestAnimationFrame(
            loop
        );

}


/* =========================================================
   START ENGINE
   ========================================================= */

function startEngine(type) {

    state.objects = [];

    state.timer = 0;

    state.speed = 250;

    state.player = null;

    state.target = null;

    state.food = null;

    state.bricks = [];

    state.lane = 1;

    state.direction = {
        x: 1,
        y: 0
    };


    if (type === 0)
        runnerEngine();

    if (type === 1)
        dodgeEngine();

    if (type === 2)
        targetEngine();

    if (type === 3)
        snakeEngine();

    if (type === 4)
        brickEngine();

    if (type === 5)
        paddleEngine();

    if (type === 6)
        flappyEngine();

    if (type === 7)
        reflexEngine();

}


/* =========================================================
   RUNNER
   ========================================================= */

function runnerEngine() {

    state.player = {

        x: W * .2,

        y: H * .72,

        vy: 0,

        size: 38

    };


    state.ground =
        H * .72;


    state.objects = [];

    state.timer = 0;


    gameHelp.textContent =
        "SPACE / ↑ / TAP = JUMP";


    state.jump = false;

}


function runnerUpdate(dt) {

    const p =
        state.player;


    if (
        keys[" "] ||
        keys["ArrowUp"] ||
        keys["w"]
    ) {

        if (
            p.y >=
            state.ground - 2
        ) {

            p.vy = -650;

        }

    }


    p.vy +=
        1500 * dt;

    p.y +=
        p.vy * dt;


    if (
        p.y >
        state.ground
    ) {

        p.y =
            state.ground;

        p.vy = 0;

    }


    state.timer += dt;


    if (
        state.timer >
        .7
    ) {

        state.timer = 0;

        state.objects.push({

            type: "enemy",

            x: W + 40,

            y:
                state.ground + 30,

            w:
                rand(25, 50),

            h:
                rand(35, 75)

        });

    }


    state.objects.forEach(
        o => {

            o.x -=
                state.speed * dt;

        }
    );


    state.objects =
        state.objects.filter(
            o => o.x > -100
        );


    for (
        const o of state.objects
    ) {

        if (

            p.x <
            o.x + o.w &&

            p.x + p.size >
            o.x &&

            p.y + p.size >
            o.y - o.h

        ) {

            endGame(
                "You hit an obstacle!"
            );

            return;

        }

    }


    state.speed +=
        dt * 3;

    addScore(
        dt * 10
    );

}


function runnerDraw() {

    clear("#070912");


    rect(
        0,
        state.ground + 40,
        W,
        H,
        "#11182b"
    );


    for (
        const o of state.objects
    ) {

        rect(
            o.x,
            o.y - o.h,
            o.w,
            o.h,
            "#ff416c"
        );

    }


    const p =
        state.player;


    rect(
        p.x,
        p.y,
        p.size,
        p.size,
        "#7cff67"
    );

}


/* =========================================================
   DODGE
   ========================================================= */

function dodgeEngine() {

    state.player = {

        x: W / 2,

        y: H / 2,

        r: 18

    };


    state.objects = [];

    state.timer = 0;


    gameHelp.textContent =
        "ARROWS / WASD / DRAG = MOVE";

}


function dodgeUpdate(dt) {

    const p =
        state.player;


    let dx = 0;
    let dy = 0;


    if (keys.ArrowLeft || keys.a)
        dx--;

    if (keys.ArrowRight || keys.d)
        dx++;

    if (keys.ArrowUp || keys.w)
        dy--;

    if (keys.ArrowDown || keys.s)
        dy++;


    if (pointer.down) {

        p.x =
            pointer.x;

        p.y =
            pointer.y;

    } else {

        p.x +=
            dx * 350 * dt;

        p.y +=
            dy * 350 * dt;

    }


    p.x =
        clamp(
            p.x,
            20,
            W - 20
        );


    p.y =
        clamp(
            p.y,
            20,
            H - 20
        );


    state.timer += dt;


    if (
        state.timer >
        .35
    ) {

        state.timer = 0;

        state.objects.push({

            x:
                rand(
                    10,
                    W - 10
                ),

            y: -30,

            r:
                rand(10, 24),

            speed:
                rand(160, 340)

        });

    }


    state.objects.forEach(
        enemy => {

            enemy.y +=
                enemy.speed * dt;


            const distance =
                Math.hypot(
                    p.x - enemy.x,
                    p.y - enemy.y
                );


            if (
                distance <
                p.r + enemy.r
            ) {

                endGame(
                    "You were hit!"
                );

            }

        }
    );


    state.objects =
        state.objects.filter(
            e => e.y < H + 50
        );


    addScore(
        dt * 12
    );

}


function dodgeDraw() {

    clear("#060912");


    for (
        const enemy of state.objects
    ) {

        circle(
            enemy.x,
            enemy.y,
            enemy.r,
            "#ff416c"
        );

    }


    circle(
        state.player.x,
        state.player.y,
        state.player.r,
        "#4da6ff"
    );

}


/* =========================================================
   TARGET
   ========================================================= */

function targetEngine() {

    state.target = {

        x:
            rand(60, W - 60),

        y:
            rand(70, H - 70),

        r: 35

    };


    state.timeLeft = 30;


    gameHelp.textContent =
        "TAP targets as quickly as possible";


}


function targetUpdate(dt) {

    state.timeLeft -= dt;


    if (
        state.timeLeft <= 0
    ) {

        endGame(
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
                state.target.x,

                pointer.y -
                state.target.y
            );


        if (
            distance <
            state.target.r
        ) {

            addScore(100);


            state.target = {

                x:
                    rand(
                        40,
                        W - 40
                    ),

                y:
                    rand(
                        60,
                        H - 60
                    ),

                r:
                    rand(20, 40)

            };

        }


        pointer.down =
            false;

    }

}


function targetDraw() {

    clear();


    circle(
        state.target.x,
        state.target.y,
        state.target.r,
        "#7cff67"
    );


    circle(
        state.target.x,
        state.target.y,
        state.target.r / 2,
        "#101426"
    );


    text(
        "TAP",
        state.target.x,
        state.target.y + 6,
        15
    );


    text(
        Math.ceil(
            state.timeLeft
        ),
        W - 35,
        35,
        24,
        "#7cff67"
    );

}


/* =========================================================
   SNAKE
   ========================================================= */

function snakeEngine() {

    state.snake = [

        {
            x: 7,
            y: 7
        },

        {
            x: 6,
            y: 7
        },

        {
            x: 5,
            y: 7
        }

    ];


    state.direction = {
        x: 1,
        y: 0
    };


    state.nextDirection = {
        x: 1,
        y: 0
    };


    state.food = {

        x: 15,
        y: 8

    };


    state.timer = 0;


    gameHelp.textContent =
        "ARROW KEYS = MOVE";


}


function snakeUpdate(dt) {

    if (
        keys.ArrowUp &&
        state.direction.y === 0
    ) {

        state.nextDirection = {
            x: 0,
            y: -1
        };

    }


    if (
        keys.ArrowDown &&
        state.direction.y === 0
    ) {

        state.nextDirection = {
            x: 0,
            y: 1
        };

    }


    if (
        keys.ArrowLeft &&
        state.direction.x === 0
    ) {

        state.nextDirection = {
            x: -1,
            y: 0
        };

    }


    if (
        keys.ArrowRight &&
        state.direction.x === 0
    ) {

        state.nextDirection = {
            x: 1,
            y: 0
        };

    }


    state.timer += dt;


    if (
        state.timer <
        .11
    ) return;


    state.timer = 0;


    state.direction =
        state.nextDirection;


    const head = {

        x:
            state.snake[0].x +
            state.direction.x,

        y:
            state.snake[0].y +
            state.direction.y

    };


    const cols = 22;
    const rows = 16;


    if (

        head.x < 0 ||
        head.x >= cols ||
        head.y < 0 ||
        head.y >= rows

    ) {

        endGame(
            "You hit the wall!"
        );

        return;

    }


    for (
        const part of state.snake
    ) {

        if (
            part.x === head.x &&
            part.y === head.y
        ) {

            endGame(
                "You hit yourself!"
            );

            return;

        }

    }


    state.snake.unshift(
        head
    );


    if (

        head.x ===
        state.food.x &&

        head.y ===
        state.food.y

    ) {

        addScore(100);


        state.food = {

            x:
                randInt(
                    1,
                    cols - 2
                ),

            y:
                randInt(
                    1,
                    rows - 2
                )

        };

    } else {

        state.snake.pop();

    }

}


function snakeDraw() {

    clear();


    const cols = 22;
    const rows = 16;


    const cell =
        Math.min(
            W / cols,
            H / rows
        );


    state.snake.forEach(
        (part, index) => {

            rect(

                part.x * cell + 2,

                part.y * cell + 2,

                cell - 4,

                cell - 4,

                index === 0
                    ? "#7cff67"
                    : "#32c96b"

            );

        }
    );


    circle(

        state.food.x *
        cell +
        cell / 2,

        state.food.y *
        cell +
        cell / 2,

        cell * .3,

        "#ff416c"

    );

}


/* =========================================================
   BRICK BREAKER
   ========================================================= */

function brickEngine() {

    state.paddle = {

        x: W / 2,

        width: 110

    };


    state.ball = {

        x: W / 2,

        y: H * .72,

        vx: 260,

        vy: -320,

        r: 8

    };


    state.bricks = [];


    for (
        let y = 0;
        y < 5;
        y++
    ) {

        for (
            let x = 0;
            x < 8;
            x++
        ) {

            state.bricks.push({

                x:
                    20 +
                    x *
                    ((W - 40) / 8),

                y:
                    40 +
                    y * 28,

                w:
                    (W - 48) / 8,

                h: 20,

                alive: true

            });

        }

    }


    gameHelp.textContent =
        "← → or DRAG paddle = BREAK BLOCKS";

}


function brickUpdate(dt) {

    const paddle =
        state.paddle;

    const ball =
        state.ball;


    if (pointer.down) {

        paddle.x =
            pointer.x;

    }


    if (keys.ArrowLeft)
        paddle.x -=
            450 * dt;

    if (keys.ArrowRight)
        paddle.x +=
            450 * dt;


    paddle.x =
        clamp(
            paddle.x,
            55,
            W - 55
        );


    ball.x +=
        ball.vx * dt;

    ball.y +=
        ball.vy * dt;


    if (
        ball.x < ball.r ||
        ball.x >
        W - ball.r
    ) {

        ball.vx *= -1;

    }


    if (
        ball.y < ball.r
    ) {

        ball.vy *= -1;

    }


    if (
        ball.y >
        H + 20
    ) {

        endGame(
            "You missed!"
        );

        return;

    }


    if (

        ball.y >
        H - 60 &&

        ball.x >
        paddle.x - 60 &&

        ball.x <
        paddle.x + 60

    ) {

        ball.vy =
            -Math.abs(
                ball.vy
            );

    }


    for (
        const brick of
        state.bricks
    ) {

        if (!brick.alive)
            continue;


        if (

            ball.x >
            brick.x &&

            ball.x <
            brick.x +
            brick.w &&

            ball.y >
            brick.y &&

            ball.y <
            brick.y +
            brick.h

        ) {

            brick.alive =
                false;

            ball.vy *=
                -1;

            addScore(25);

        }

    }


    if (
        state.bricks.every(
            b => !b.alive
        )
    ) {

        endGame(
            "BOARD CLEARED!"
        );

    }

}


function brickDraw() {

    clear();


    state.bricks.forEach(
        brick => {

            if (
                brick.alive
            ) {

                rect(

                    brick.x,

                    brick.y,

                    brick.w - 4,

                    brick.h,

                    "#a06cff"

                );

            }

        }
    );


    rect(

        state.paddle.x - 55,

        H - 40,

        110,

        12,

        "#7cff67"

    );


    circle(

        state.ball.x,

        state.ball.y,

        state.ball.r,

        "#ffffff"

    );

}


/* =========================================================
   PADDLE
   ========================================================= */

function paddleEngine() {

    state.paddle = {

        x: W / 2,

        y: H - 45,

        width: 110

    };


    state.ball = {

        x: W / 2,

        y: H / 2,

        vx: 300,

        vy: 240,

        r: 10

    };


    gameHelp.textContent =
        "KEEP THE BALL ALIVE";


}


function paddleUpdate(dt) {

    const p =
        state.paddle;

    const b =
        state.ball;


    if (pointer.down)
        p.x =
            pointer.x;


    if (keys.ArrowLeft)
        p.x -=
            450 * dt;

    if (keys.ArrowRight)
        p.x +=
            450 * dt;


    p.x =
        clamp(
            p.x,
            55,
            W - 55
        );


    b.x +=
        b.vx * dt;

    b.y +=
        b.vy * dt;


    if (
        b.x < b.r ||
        b.x >
        W - b.r
    ) {

        b.vx *= -1;

    }


    if (
        b.y < b.r
    ) {

        b.vy *= -1;

    }


    if (

        b.y >
        p.y - 15 &&

        b.x >
        p.x - 60 &&

        b.x <
        p.x + 60

    ) {

        b.vy =
            -Math.abs(
                b.vy
            );

        addScore(10);

    }


    if (
        b.y > H + 30
    ) {

        endGame(
            "The ball dropped!"
        );

    }


    addScore(
        dt * 2
    );

}


function paddleDraw() {

    clear();


    rect(

        state.paddle.x - 55,

        state.paddle.y,

        110,

        12,

        "#7cff67"

    );


    circle(

        state.ball.x,

        state.ball.y,

        state.ball.r,

        "#ffffff"

    );

}


/* =========================================================
   FLAPPY
   ========================================================= */

function flappyEngine() {

    state.player = {

        x: W * .25,

        y: H / 2,

        vy: 0,

        r: 17

    };


    state.objects = [];

    state.timer = 0;


    gameHelp.textContent =
        "TAP / SPACE = FLAP";


}


function flappyUpdate(dt) {

    const p =
        state.player;


    if (
        pointer.down ||
        keys[" "] ||
        keys.ArrowUp
    ) {

        p.vy = -420;

    }


    p.vy +=
        1000 * dt;

    p.y +=
        p.vy * dt;


    state.timer += dt;


    if (
        state.timer >
        1.3
    ) {

        state.timer = 0;


        const gapY =
            rand(
                130,
                H - 130
            );


        state.objects.push({

            x: W + 30,

            gapY,

            gap: 150,

            passed: false

        });

    }


    state.objects.forEach(
        pipe => {

            pipe.x -=
                240 * dt;


            if (
                !pipe.passed &&
                pipe.x < p.x
            ) {

                pipe.passed = true;

                addScore(100);

            }


            if (

                p.x + p.r >
                pipe.x &&

                p.x - p.r <
                pipe.x + 60

            ) {

                if (

                    p.y - p.r <
                    pipe.gapY -
                    pipe.gap / 2 ||

                    p.y + p.r >
                    pipe.gapY +
                    pipe.gap / 2

                ) {

                    endGame(
                        "You hit a pipe!"
                    );

                }

            }

        }
    );


    state.objects =
        state.objects.filter(
            pipe =>
                pipe.x >
                -100
        );


    if (
        p.y < 0 ||
        p.y > H
    ) {

        endGame(
            "You flew out!"
        );

    }

}


function flappyDraw() {

    clear("#08111d");


    state.objects.forEach(
        pipe => {

            rect(

                pipe.x,

                0,

                60,

                pipe.gapY -
                pipe.gap / 2,

                "#38d67a"

            );


            rect(

                pipe.x,

                pipe.gapY +
                pipe.gap / 2,

                60,

                H,

                "#38d67a"

            );

        }
    );


    circle(

        state.player.x,

        state.player.y,

        state.player.r,

        "#ffd84d"

    );

}


/* =========================================================
   REFLEX
   ========================================================= */

function reflexEngine() {

    state.mode =
        "wait";

    state.timer = 0;

    state.delay =
        rand(
            1.5,
            4
        );


    gameHelp.textContent =
        "WAIT FOR GREEN — THEN TAP!";

}


function reflexUpdate(dt) {

    state.timer += dt;


    if (
        state.mode ===
        "wait" &&
        state.timer >
        state.delay
    ) {

        state.mode =
            "go";

        state.timer = 0;

    }


    if (
        state.mode ===
        "go" &&
        pointer.down
    ) {

        const points =
            Math.max(
                20,
                1000 -
                state.timer * 800
            );


        addScore(points);


        state.mode =
            "again";

        pointer.down =
            false;

    }


    if (
        state.mode ===
        "again" &&
        pointer.down
    ) {

        state.timer = 0;

        state.delay =
            rand(1.5, 4);

        state.mode =
            "wait";

        pointer.down =
            false;

    }

}


function reflexDraw() {

    const color =
        state.mode === "go"
            ? "#124d2a"
            : "#15182a";


    clear(color);


    if (
        state.mode ===
        "wait"
    ) {

        text(
            "WAIT...",
            W / 2,
            H / 2,
            48,
            "#ffd84d"
        );

    }


    if (
        state.mode ===
        "go"
    ) {

        text(
            "TAP!",
            W / 2,
            H / 2,
            70,
            "#7cff67"
        );

    }


    if (
        state.mode ===
        "again"
    ) {

        text(
            "TAP TO GO AGAIN",
            W / 2,
            H / 2,
            25
        );

    }

}


/* =========================================================
   UPDATE
   ========================================================= */

function updateGame(dt) {

    if (
        currentGame.engine === 0
    )
        runnerUpdate(dt);

    else if (
        currentGame.engine === 1
    )
        dodgeUpdate(dt);

    else if (
        currentGame.engine === 2
    )
        targetUpdate(dt);

    else if (
        currentGame.engine === 3
    )
        snakeUpdate(dt);

    else if (
        currentGame.engine === 4
    )
        brickUpdate(dt);

    else if (
        currentGame.engine === 5
    )
        paddleUpdate(dt);

    else if (
        currentGame.engine === 6
    )
        flappyUpdate(dt);

    else if (
        currentGame.engine === 7
    )
        reflexUpdate(dt);

}


/* =========================================================
   DRAW
   ========================================================= */

function drawGame() {

    if (
        currentGame.engine === 0
    )
        runnerDraw();

    else if (
        currentGame.engine === 1
    )
        dodgeDraw();

    else if (
        currentGame.engine === 2
    )
        targetDraw();

    else if (
        currentGame.engine === 3
    )
        snakeDraw();

    else if (
        currentGame.engine === 4
    )
        brickDraw();

    else if (
        currentGame.engine === 5
    )
        paddleDraw();

    else if (
        currentGame.engine === 6
    )
        flappyDraw();

    else if (
        currentGame.engine === 7
    )
        reflexDraw();

}


/* =========================================================
   GAME OVER
   ========================================================= */

function endGame(message) {

    if (
        gameOverState
    )
        return;


    gameOverState =
        true;


    gameRunning =
        false;


    saveBest();


    overText.textContent =
        `${message} Score: ${Math.floor(score)} • Best: ${best}`;


    overlay.classList.remove(
        "hidden"
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

backBtn.addEventListener(
    "click",
    showHome
);


homeButton.addEventListener(
    "click",
    showHome
);


restartButton.addEventListener(
    "click",
    () => {

        if (
            currentGame
        ) {

            openGame(
                currentGame
            );

        }

    }
);


function showHome() {

    gameRunning =
        false;

    gameOverState =
        true;


    cancelAnimationFrame(
        animation
    );


    gameScreen.classList.add(
        "hidden"
    );

    home.classList.remove(
        "hidden"
    );

    backBtn.classList.add(
        "hidden"
    );


    createGameCards();

}


/* =========================================================
   INITIALIZE
   ========================================================= */

resizeCanvas();

createGameCards();

console.log(
    "GAMEVERSE LOADED:",
    games.length,
    "games"
);
```
