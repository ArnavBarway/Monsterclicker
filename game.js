// Initial game data
let gold = localStorage.getItem('gold') ? parseInt(localStorage.getItem('gold')) : 0;
let damagePerClick = localStorage.getItem('dpc') ? parseInt(localStorage.getItem('dpc')) : 1;
let monsterHealth = localStorage.getItem('health') ? parseInt(localStorage.getItem('health')) : 100;
let maxHealth = 100;
let upgradeCost = 10;

// HTML elements
const goldDisplay = document.getElementById("gold");
const dpcDisplay = document.getElementById("dpc");
const healthDisplay = document.getElementById("health");
const healthBar = document.getElementById("health-bar-inner");
const monster = document.getElementById("monster");
const shopButton = document.getElementById("shop-button");
const shopModal = document.getElementById("shop-modal");
const closeShopButton = document.getElementById("close-shop");

// Update the stats on the screen
function updateStats() {
    goldDisplay.textContent = gold;
    dpcDisplay.textContent = damagePerClick;
    healthDisplay.textContent = monsterHealth;
    healthBar.style.width = `${(monsterHealth / maxHealth) * 100}%`;

    // Save progress to localStorage
    localStorage.setItem('gold', gold);
    localStorage.setItem('dpc', damagePerClick);
    localStorage.setItem('health', monsterHealth);
}

// Handle monster clicks
monster.addEventListener("click", () => {
    monsterHealth -= damagePerClick;
    if (monsterHealth <= 0) {
        gold += 10; // Gold reward
        monsterHealth = maxHealth + 20; // Increase health for next monster
        maxHealth = monsterHealth; // Update max health
    }
    updateStats();
});

// Handle shop button
shopButton.addEventListener("click", () => {
    shopModal.style.display = "block";
});

// Handle close shop button
closeShopButton.addEventListener("click", () => {
    shopModal.style.display = "none";
});

// Initial update
updateStats();
