document.addEventListener('DOMContentLoaded', () => {
    const playerWarriorDiv = document.getElementById('player-warrior');
    const opponentWarriorDiv = document.getElementById('opponent-warrior');
    const attackBtn = document.getElementById('attack-btn');
    const returnBtn = document.getElementById('return-btn');
    const battleLog = document.getElementById('log-content');

    // Retrieve the gameData from script.js (it's globally available if loaded first)
    // Or, pass it from script.js to battle.js in a more robust way if script.js was not global.
    // For simplicity, we'll assume gameData is available through script.js being loaded first.
    // If you encounter 'gameData is not defined', we'll need to adjust how it's passed.

    let playerWarrior = null;
    let opponentWarrior = null;

    // --- Utility Function to get URL Parameters ---
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // --- Initialize Battle ---
    function initializeBattle() {
        const selectedCharacterId = getUrlParameter('characterId');
        if (!selectedCharacterId) {
            console.error('No character ID found in URL. Returning to selection.');
            window.location.href = 'index.html'; // Go back if no character is selected
            return;
        }

        // Find the selected player warrior from gameData
        playerWarrior = JSON.parse(JSON.stringify(gameData.warriors.find(w => w.id === selectedCharacterId)));
        if (!playerWarrior) {
            console.error('Selected warrior not found. Returning to selection.');
            window.location.href = 'index.html';
            return;
        }

        // Add default battle stats if they don't exist
        if (!playerWarrior.currentHealth) playerWarrior.currentHealth = 100;
        if (!playerWarrior.maxHealth) playerWarrior.maxHealth = 100;
        if (!playerWarrior.attack) playerWarrior.attack = 20; // Default attack
        if (!playerWarrior.defense) playerWarrior.defense = 10; // Default defense

        // Randomly select an opponent (ensure it's not the same as the player)
        const availableOpponents = gameData.warriors.filter(w => w.id !== selectedCharacterId);
        if (availableOpponents.length === 0) {
            console.warn('No other warriors available to be an opponent!');
            // Handle this gracefully, e.g., display a message or go back
            opponentWarrior = JSON.parse(JSON.stringify(playerWarrior)); // Or set a placeholder
            opponentWarrior.name = "Training Dummy";
        } else {
            const randomIndex = Math.floor(Math.random() * availableOpponents.length);
            opponentWarrior = JSON.parse(JSON.stringify(availableOpponents[randomIndex]));
        }

        // Add default battle stats for opponent
        if (!opponentWarrior.currentHealth) opponentWarrior.currentHealth = 100;
        if (!opponentWarrior.maxHealth) opponentWarrior.maxHealth = 100;
        if (!opponentWarrior.attack) opponentWarrior.attack = 18; // Default opponent attack
        if (!opponentWarrior.defense) opponentWarrior.defense = 12; // Default opponent defense


        displayWarrior(playerWarrior, playerWarriorDiv, 'player');
        displayWarrior(opponentWarrior, opponentWarriorDiv, 'opponent');
        logMessage(`A new battle begins! ${playerWarrior.name} vs ${opponentWarrior.name}!`);
    }

    // --- Display Warrior Details on Battle Page ---
    function displayWarrior(warrior, elementDiv, type) {
        elementDiv.querySelector('.warrior-img').src = warrior.img;
        elementDiv.querySelector('h3').textContent = warrior.name;
        updateHealthDisplay(warrior, elementDiv, type);
    }

    // --- Update Health Bar and Text ---
    function updateHealthDisplay(warrior, elementDiv, type) {
        const healthPercentage = (warrior.currentHealth / warrior.maxHealth) * 100;
        elementDiv.querySelector(`.health-bar`).style.width = `${healthPercentage}%`;
        elementDiv.querySelector('.health-text').textContent = `${warrior.currentHealth}/${warrior.maxHealth} HP`;

        // Change health bar color based on health percentage
        const healthBar = elementDiv.querySelector(`.health-bar`);
        if (healthPercentage > 60) {
            healthBar.style.backgroundColor = '#28a745'; /* Green */
        } else if (healthPercentage > 25) {
            healthBar.style.backgroundColor = '#ffc107'; /* Yellow */
        } else {
            healthBar.style.backgroundColor = '#dc3545'; /* Red */
        }
    }

    // --- Battle Log Function ---
    function logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        battleLog.prepend(p); // Add new messages at the top
        if (battleLog.children.length > 10) { // Keep log concise
            battleLog.removeChild(battleLog.lastChild);
        }
    }

    // --- Attack Logic (Placeholder) ---
    attackBtn.addEventListener('click', () => {
        if (playerWarrior.currentHealth <= 0 || opponentWarrior.currentHealth <= 0) {
            logMessage("The battle is already over!");
            return;
        }

        // Player attacks opponent
        let damageToOpponent = Math.max(0, playerWarrior.attack - opponentWarrior.defense / 2); // Simple damage calculation
        opponentWarrior.currentHealth -= damageToOpponent;
        logMessage(`${playerWarrior.name} attacks ${opponentWarrior.name} for ${damageToOpponent.toFixed(0)} damage!`);
        updateHealthDisplay(opponentWarrior, opponentWarriorDiv, 'opponent');

        if (opponentWarrior.currentHealth <= 0) {
            opponentWarrior.currentHealth = 0; // Ensure health doesn't go negative for display
            updateHealthDisplay(opponentWarrior, opponentWarriorDiv, 'opponent');
            logMessage(`${opponentWarrior.name} has been defeated! ${playerWarrior.name} wins!`);
            attackBtn.disabled = true; // Disable attack button
            return;
        }

        // Opponent attacks player (after a slight delay for readability)
        setTimeout(() => {
            let damageToPlayer = Math.max(0, opponentWarrior.attack - playerWarrior.defense / 2);
            playerWarrior.currentHealth -= damageToPlayer;
            logMessage(`${opponentWarrior.name} attacks ${playerWarrior.name} for ${damageToPlayer.toFixed(0)} damage!`);
            updateHealthDisplay(playerWarrior, playerWarriorDiv, 'player');

            if (playerWarrior.currentHealth <= 0) {
                playerWarrior.currentHealth = 0;
                updateHealthDisplay(playerWarrior, playerWarriorDiv, 'player');
                logMessage(`${playerWarrior.name} has been defeated! ${opponentWarrior.name} wins!`);
                attackBtn.disabled = true; // Disable attack button
            }
        }, 1000); // 1 second delay
    });

    // --- Return to Selection Button ---
    returnBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // --- Run on page load ---
    initializeBattle();
});