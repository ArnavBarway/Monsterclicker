// Initial game data
let gold = 0;
let damagePerClick = 1;
let monsterHealth = 100;
let maxHealth = 100;
let upgradeCost = 10;
let goldBoostActive = false;

// HTML elements
const goldDisplay = document.getElementById("gold");
const dpcDisplay = document.getElementById("dpc");
const healthDisplay = document.getElementById("health");
const healthBar = document.getElementById("health-bar-inner");
const monster = document.getElementById("monster");
const upgradeCostDisplay = document.getElementById("upgrade-cost");
const buyUpgradeButton = document.getElementById("buy-upgrade");
const buyGoldBoostButton = document.getElementById("buy-gold-boost");

// Update the stats on the screen
function updateStats() {
    goldDisplay.textContent = gold;
    dpcDisplay.textContent = damagePerClick;
    healthDisplay.textContent = monsterHealth;
    healthBar.style.width = `${(monsterHealth / maxHealth) * 100}%`;
    upgradeCostDisplay.textContent = upgradeCost;
}

// Handle monster clicks
monster.addEventListener("click", () => {
    monsterHealth -= damagePerClick;
    if (monsterHealth <= 0) {
        gold += goldBoostActive ? 20 : 10; // Double gold if boost is active
        monsterHealth = maxHealth + 20; // Increase health for next monster
        maxHealth = monsterHealth; // Update max health
    }
    updateStats();
});

// Handle upgrading damage per click
buyUpgradeButton.addEventListener("click", () => {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        damagePerClick += 1;
        upgradeCost = Math.floor(upgradeCost * 1.5); // Increase cost
        updateStats();
    } else {
        alert("Not enough gold!");
    }
});

// Handle buying gold boost
buyGoldBoostButton.addEventListener("click", () => {
    if (gold >= 50 && !goldBoostActive) {
        gold -= 50;
        goldBoostActive = true;
        buyGoldBoostButton.textContent = "Active!";
        buyGoldBoostButton.disabled = true; // Prevent multiple purchases
        updateStats();
    } else if (goldBoostActive) {
        alert("Gold boost is already active!");
    } else {
        alert("Not enough gold!");
    }
});

// Initial update
updateStats();
