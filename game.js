// Initial game data
let gold = 0;
let damagePerClick = 1;
let monsterHealth = 100;
let maxHealth = 100;
let upgradeCost = 10;
let goldBoostActive = false;
let boostTimer = null;

// HTML elements
const goldDisplay = document.getElementById("gold");
const dpcDisplay = document.getElementById("dpc");
const healthDisplay = document.getElementById("health");
const healthBar = document.getElementById("health-bar-inner");
const monster = document.getElementById("monster");
const upgradeCostDisplay = document.getElementById("upgrade-cost");
const buyUpgradeButton = document.getElementById("buy-upgrade");
const buyGoldBoostButton = document.getElementById("buy-gold-boost");
const buyGoldButton = document.getElementById("buy-gold");
const watchAdButton = document.getElementById("watch-ad");
const boostTimerDisplay = document.getElementById("boost-timer");

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
        let timeLeft = 60; // 1-minute boost
        boostTimer = setInterval(() => {
            timeLeft--;
            boostTimerDisplay.textContent = `Gold Boost Active: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(boostTimer);
                goldBoostActive = false;
                boostTimerDisplay.textContent = "";
            }
        }, 1000);
        updateStats();
    } else if (goldBoostActive) {
        alert("Gold boost is already active!");
    } else {
        alert("Not enough gold!");
    }
});

// Handle buying gold (simulated in-app purchase)
buyGoldButton.addEventListener("click", () => {
    gold += 100;
    updateStats();
});

// Handle watching an ad
watchAdButton.addEventListener("click", () => {
    alert("You watched an ad!");
    gold += 20;
    updateStats();
});

// Initial update
updateStats();
