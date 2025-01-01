// Initialize game variables and load from localStorage if available
let gold = parseInt(localStorage.getItem("gold")) || 0;
let damagePerClick = parseInt(localStorage.getItem("dpc")) || 1;
let monsterHealth = parseInt(localStorage.getItem("health")) || 100;
let maxHealth = parseInt(localStorage.getItem("maxHealth")) || 100; // Save max health to localStorage
let upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;
let goldBoostActive = JSON.parse(localStorage.getItem("goldBoostActive")) || false;

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
const earnGoldAdButton = document.getElementById("earn-gold-ad");

// Function to update displayed stats
function updateStats() {
    goldDisplay.textContent = gold;
    dpcDisplay.textContent = damagePerClick;
    healthDisplay.textContent = monsterHealth;
    healthBar.style.width = `${(monsterHealth / maxHealth) * 100}%`;

    // Save the current state to localStorage
    localStorage.setItem("gold", gold);
    localStorage.setItem("dpc", damagePerClick);
    localStorage.setItem("health", monsterHealth);
    localStorage.setItem("maxHealth", maxHealth);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("goldBoostActive", goldBoostActive);
}

// Function to handle monster clicks
function onMonsterClick() {
    if (monsterHealth > 0) {
        monsterHealth -= damagePerClick;

        if (monsterHealth <= 0) {
            monsterHealth = 0;
            defeatMonster();
        }

        updateStats();
    }
}

// Function to handle monster defeat
function defeatMonster() {
    gold += goldBoostActive ? 20 : 10;
    maxHealth += 20;
    monsterHealth = maxHealth;

    updateStats();
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
        upgradeCost = Math.floor(upgradeCost * 1.5);

        updateStats();
        upgradeCostDisplay.textContent = upgradeCost;
    }
}

// Function to activate the gold boost
function activateGoldBoost() {
    if (gold >= 50 && !goldBoostActive) {
        gold -= 50;
        goldBoostActive = true;
        updateStats();

        setTimeout(() => {
            goldBoostActive = false;
            updateStats();
        }, 60000);
    }
}

// Function to simulate earning gold by watching an ad
function earnGoldByWatchingAd() {
    alert("Ad watched! You earned 50 gold.");
    gold += 50; // Add 50 gold for watching the ad
    updateStats(); // Update the stats
}

// Function to initialize UI elements
function initializeUI() {
    upgradeCostDisplay.textContent = upgradeCost;

    // Show monster health bar only when it's above 0
    healthBar.style.display = monsterHealth > 0 ? "block" : "none";
}

// Event listeners
monster.addEventListener("click", onMonsterClick);
shopButton.addEventListener("click", showShopModal);
closeShopButton.addEventListener("click", closeShop);
buyUpgradeButton.addEventListener("click", upgradeDamage);
buyGoldBoostButton.addEventListener("click", activateGoldBoost);
earnGoldAdButton.addEventListener("click", earnGoldByWatchingAd);

// Initialize the game
initializeUI();
updateStats();
