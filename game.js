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
const removeAdsButton = document.getElementById("remove-ads");
const shopButton = document.getElementById("shop-button");

// Load saved progress
function loadProgress() {
    const savedData = JSON.parse(localStorage.getItem("monsterHunterProgress"));
    if (savedData) {
        gold = savedData.gold || gold;
        damagePerClick = savedData.damagePerClick || damagePerClick;
        monsterHealth = savedData.monsterHealth || monsterHealth;
        maxHealth = savedData.maxHealth || maxHealth;
    }
    updateStats();
}

// Save progress
function saveProgress() {
    const data = { gold, damagePerClick, monsterHealth, maxHealth };
    localStorage.setItem("monsterHunterProgress", JSON.stringify(data));
}

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
        gold += goldBoostActive ? 20 : 10;
        monsterHealth = maxHealth + 20;
        maxHealth = monsterHealth;
    }
    updateStats();
    saveProgress();
});

// Handle shop button click
shopButton.addEventListener("click", () => {
    alert("Shop functionality coming soon!");
});

// Handle remove ads subscription
removeAdsButton.addEventListener("click", () => {
    alert("Thank you for supporting us! Ads will be removed.");
    document.querySelector("meta[name='google-adsense-account']").remove();
});

// Load progress on page load
loadProgress();
