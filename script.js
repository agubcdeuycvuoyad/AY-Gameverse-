```javascript
document.addEventListener("DOMContentLoaded", function () {

    const grid = document.getElementById("grid");
    const gameCount = document.getElementById("gameCount");

    if (!grid) {
        document.body.innerHTML =
            "<h1 style='color:red;padding:30px'>ERROR: grid not found</h1>";
        return;
    }

    const games = [
        "Neon Dash",
        "Void Runner",
        "Neon Heist",
        "Tiny Kingdom",
        "Mutation Lab",
        "Gravity Rush",
        "Reflex Rush",
        "Neon Rail Rush",
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
        "Astro Dodge"
    ];

    grid.innerHTML = "";

    games.forEach(function (name, index) {

        const card = document.createElement("div");

        card.className = "card";

        card.style.display = "block";
        card.style.visibility = "visible";
        card.style.opacity = "1";
        card.style.cursor = "pointer";

        card.innerHTML = `
            <div class="scanline"></div>

            <div class="icon">
                🎮
            </div>

            <div class="cat-tag">
                GAME ${index + 1}
            </div>

            <h2>
                ${name}
            </h2>

            <p>
                Play ${name} and beat the high score.
            </p>
        `;

        grid.appendChild(card);

    });

    if (gameCount) {
        gameCount.textContent = games.length;
    }

    console.log(
        "GAMEVERSE TEST SUCCESS:",
        grid.children.length,
        "games displayed"
    );

});
```
