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
        monsterHealth = maxHealth; // Reset the monster's health
    }

    updateStats(); // Update the stats
}

// Function to show the shop modal
function showShopModal() {
    shopModal.style.display = "block";
}

// Function to close the shop modal
function closeShop() {
    shopModal.style.display = "none";
}

// Function to upgrade damage per click
function upgradeDamage() {
    if (gold >= upgradeCost) {
        gold -= upgradeCost;
        damagePerClick++;
        upgradeCost = Math.floor(upgradeCost * 1.5); // Increase cost for next upgrade
        updateStats();
        upgradeCostDisplay.textContent = upgradeCost; // Update upgrade cost display
    }
}

// Function to activate the gold boost
function activateGoldBoost() {
    if (gold >= 50 && !goldBoostActive) {
        gold -= 50;
        goldBoostActive = true;
        updateStats();
        setTimeout(() => {
            goldBoostActive = false; // Deactivate gold boost after 1 minute
        }, 60000);
    }
}

// Event listeners
monster.addEventListener("click", onMonsterClick);
shopButton.addEventListener("click", showShopModal);
closeShopButton.addEventListener("click", closeShop);
buyUpgradeButton.addEventListener("click", upgradeDamage);
buyGoldBoostButton.addEventListener("click", activateGoldBoost);

// Initial stats update
updateStats();
