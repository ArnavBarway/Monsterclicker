// Initial game data
let gold = 0;
let damagePerClick = 1;
let monsterHealth = 100;
let maxHealth = 100;

// HTML elements
const goldDisplay = document.getElementById("gold");
const dpcDisplay = document.getElementById("dpc");
const healthDisplay = document.getElementById("health");
const healthBar = document.getElementById("health-bar-inner");
const monster = document.getElementById("monster");
const upgradeDpcButton = document.getElementById("upgrade-dpc");

// Update the stats on the screen
function updateStats() {
    goldDisplay.textContent = gold;
    dpcDisplay.textContent = damagePerClick;
    healthDisplay.textContent = monsterHealth;
    healthBar.style.width = `${(monsterHealth / maxHealth) * 100}%`;
}

// Handle monster clicks
monster.addEventListener("click", () => {
    monsterHealth -= damagePerClick;
    if (monsterHealth <= 0) {
        gold += 10; // Reward for defeating monster
        monsterHealth = maxHealth + 20; // Increase health for next monster
        maxHealth = monsterHealth; // Update max health
    }
    updateStats();
});

// Handle upgrading damage per click
upgradeDpcButton.addEventListener("click", () => {
    const upgradeCost = 10;
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        damagePerClick += 1;
        updateStats();
    } else {
        alert("Not enough gold!");
    }
});

// Initial update
updateStats();
