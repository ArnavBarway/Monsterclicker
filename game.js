// Initialize game variables and load from localStorage if available
let gold = localStorage.getItem("gold") ? parseInt(localStorage.getItem("gold")) : 0;
let damagePerClick = localStorage.getItem("dpc") ? parseInt(localStorage.getItem("dpc")) : 1;
let monsterHealth = localStorage.getItem("health") ? parseInt(localStorage.getItem("health")) : 100;
let maxHealth = 100; // Base maximum health for monsters
let upgradeCost = 10; // Base cost for upgrading damage per click
let goldBoostActive = false; // Tracks if gold boost is currently active

// DOM elements
const goldDisplay = document.getElementById("gold");
const dpcDisplay = document.getElementById("dpc");
const healthDisplay = document.getElementById("health");
const healthBar = document.getElementById("health-bar-inner");
const monster = document.getElementById("monster");
const shopButton = document.getElementById("shop-button");
const shopModal = document.getElementById("shop-modal");
const closeShopButton = document.getElementById("close-shop");
const buyUpgradeButton = document.getElementById("buy-upgrade");
const buyGoldBoostButton = document.getElementById("buy-gold-boost");
const upgradeCostDisplay = document.getElementById("upgrade-cost");

// Function to update displayed stats
function updateStats() {
    goldDisplay.textContent = gold; // Update gold display
    dpcDisplay.textContent = damagePerClick; // Update damage per click display
    healthDisplay.textContent = monsterHealth; // Update current monster health
    healthBar.style.width = `${(monsterHealth / maxHealth) * 100}%`; // Update health bar width

    // Save the current state to localStorage
    localStorage.setItem("gold", gold);
    localStorage.setItem("dpc", damagePerClick);
    localStorage.setItem("health", monsterHealth);
}

// Function to handle monster clicks
function onMonsterClick() {
    // Reduce monster's health by the current damage per click
    monsterHealth -= damagePerClick;

    // Check if the monster is defeated
    if (monsterHealth <= 0) {
        // Reward gold for defeating the monster
        gold += goldBoostActive ? 20 : 10; // Double reward if gold boost is active

        // Increase the monster's max health for the next spawn
        maxHealth += 20;
        monsterHealth = maxHealth; // Reset the monster's health to the new max
    }

    // Update displayed stats
    updateStats();
}

// Function to handle buying damage upgrades
function onBuyUpgrade() {
    // Check if the player has enough gold to buy the upgrade
    if (gold >= upgradeCost) {
        gold -= upgradeCost; // Deduct gold
        damagePerClick += 1; // Increase damage per click
        upgradeCost += 5; // Increment upgrade cost for next level

        // Update the displayed upgrade cost
        upgradeCostDisplay.textContent = upgradeCost;

        // Update displayed stats
        updateStats();
    } else {
        alert("Not enough gold to buy this upgrade!");
    }
}

// Function to activate a gold boost for 60 seconds
function onBuyGoldBoost() {
    // Check if the player has enough gold for the gold boost
    if (gold >= 50) {
        gold -= 50; // Deduct gold
        goldBoostActive = true; // Activate gold boost

        // Update displayed stats
        updateStats();

        // Notify the player about the boost duration
        const boostTimer = document.getElementById("boost-timer");
        boostTimer.textContent = "Gold Boost Active: 60s";

        // Deactivate gold boost after 60 seconds
        setTimeout(() => {
            goldBoostActive = false;
            boostTimer.textContent = ""; // Clear boost timer display
        }, 60000);
    } else {
        alert("Not enough gold for a gold boost!");
    }
}

// Event Listeners
monster.addEventListener("click", onMonsterClick); // Handle monster clicks
buyUpgradeButton.addEventListener("click", onBuyUpgrade); // Handle buying upgrades
buyGoldBoostButton.addEventListener("click", onBuyGoldBoost); // Handle buying gold boosts
shopButton.addEventListener("click", () => {
    shopModal.style.display = "block"; // Show shop modal
});
closeShopButton.addEventListener("click", () => {
    shopModal.style.display = "none"; // Hide shop modal
});

// Initial stats update
updateStats();
