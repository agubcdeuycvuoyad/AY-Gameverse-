```javascript
document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("grid");
    const count = document.getElementById("gameCount");

    const games = [
        ["⚡", "Neon Dash", "Runner"],
        ["🌌", "Void Runner", "Action"],
        ["💎", "Neon Heist", "Action"],
        ["🏰", "Tiny Kingdom", "Strategy"],
        ["🧪", "Mutation Lab", "Puzzle"],
        ["🪐", "Gravity Rush", "Arcade"],
        ["🎯", "Reflex Rush", "Reflex"],
        ["🚄", "Neon Rail Rush", "Racing"],
        ["🏎️", "Street Surge", "Racing"],
        ["🧠", "Brain Blitz", "Puzzle"],
        ["🔥", "Laser Lane", "Action"],
        ["🤖", "Bot Brawl", "Action"],
        ["👾", "Alien Swarm", "Action"],
        ["🐍", "Snake Shift", "Arcade"],
        ["🧱", "Brick Breaker", "Arcade"],
        ["🏓", "Paddle Clash", "Sports"],
        ["🪽", "Sky Flap", "Arcade"],
        ["🧩", "Color Grid", "Puzzle"],
        ["🎵", "Beat Drop", "Rhythm"],
        ["🚀", "Rocket Run", "Runner"]
    ];

    grid.innerHTML = "";

    games.forEach((game, index) => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <div>
                <div class="icon">${game[0]}</div>

                <span class="pill">
                    ${game[2]}
                </span>

                <h3>
                    ${game[1]}
                </h3>

                <p>
                    Click to play ${game[1]}.
                </p>
            </div>

            <small>
                PLAY →
            </small>
        `;

        grid.appendChild(card);

    });

    count.textContent = games.length;

    console.log(
        "SUCCESS:",
        grid.children.length,
        "games created"
    );

});
```
