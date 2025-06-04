document.addEventListener('DOMContentLoaded', () => {
    const playerWarriorDiv = document.getElementById('player-warrior');
    const opponentWarriorDiv = document.getElementById('opponent-warrior');
    const attackBtn = document.getElementById('attack-btn');
    const abilityButtonsDiv = document.getElementById('ability-buttons');
    const endTurnBtn = document.getElementById('end-turn-btn');
    const returnBtn = document.getElementById('return-btn');
    const battleLog = document.getElementById('log-content');
    const turnDisplay = document.getElementById('turn-display');

    let playerWarrior = null;
    let opponentWarrior = null;
    let currentTurn = 'player'; // Track whose turn it is

    // --- Battle Constants ---
    const CRITICAL_HIT_CHANCE = 0.15; // 15% chance for a critical hit
    const CRITICAL_HIT_MULTIPLIER = 1.75; // Critical hits deal 175% damage
    const MISS_CHANCE = 0.10; // 10% chance for an attack to miss

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
            window.location.href = 'index.html';
            return;
        }

        playerWarrior = JSON.parse(JSON.stringify(gameData.warriors.find(w => w.id === selectedCharacterId)));
        if (!playerWarrior) {
            console.error('Selected warrior not found. Returning to selection.');
            window.location.href = 'index.html';
            return;
        }

        // Add default battle stats if they don't exist, and current health
        playerWarrior.currentHealth = playerWarrior.maxHealth;
        if (!playerWarrior.attack) playerWarrior.attack = 20;
        if (!playerWarrior.defense) playerWarrior.defense = 10;
        if (!playerWarrior.speed) playerWarrior.speed = 10;
        if (!playerWarrior.abilities) playerWarrior.abilities = [];
        if (!playerWarrior.signatureMove) playerWarrior.signatureMove = 'No Signature Move';


        // Randomly select an opponent (ensure it's not the same as the player)
        const availableOpponents = gameData.warriors.filter(w => w.id !== selectedCharacterId);
        if (availableOpponents.length === 0) {
            console.warn('No other warriors available to be an opponent! Using a generic dummy.');
            opponentWarrior = {
                id: 'training_dummy',
                name: "Training Dummy",
                universeId: 'unknown',
                img: 'placeholder_opponent.png', // Ensure you have a placeholder image or remove if not needed
                combatStyle: 'Static Target',
                abilities: [],
                signatureMove: 'None',
                maxHealth: 150,
                attack: 5,
                defense: 5,
                speed: 1
            };
        } else {
            const randomIndex = Math.floor(Math.random() * availableOpponents.length);
            opponentWarrior = JSON.parse(JSON.stringify(availableOpponents[randomIndex]));
        }

        // Add default battle stats for opponent
        opponentWarrior.currentHealth = opponentWarrior.maxHealth;
        if (!opponentWarrior.attack) opponentWarrior.attack = 18;
        if (!opponentWarrior.defense) opponentWarrior.defense = 12;
        if (!opponentWarrior.speed) opponentWarrior.speed = 8;
        if (!opponentWarrior.abilities) opponentWarrior.abilities = [];
        if (!opponentWarrior.signatureMove) opponentWarrior.signatureMove = 'None';


        displayWarrior(playerWarrior, playerWarriorDiv, 'player');
        displayWarrior(opponentWarrior, opponentWarriorDiv, 'opponent');
        logMessage(`A new battle begins! ${playerWarrior.name} vs ${opponentWarrior.name}!`);

        renderAbilityButtons(playerWarrior);
        determineFirstTurn();
    }

    // --- Display Warrior Details on Battle Page ---
    function displayWarrior(warrior, elementDiv, type) {
        elementDiv.querySelector('.warrior-img').src = warrior.img;
        elementDiv.querySelector('.warrior-name').textContent = warrior.name;
        updateHealthDisplay(warrior, elementDiv, type);
    }

    // --- Update Health Bar and Text ---
    function updateHealthDisplay(warrior, elementDiv, type) {
        const healthPercentage = (warrior.currentHealth / warrior.maxHealth) * 100;
        elementDiv.querySelector(`.health-bar`).style.width = `${healthPercentage}%`;
        elementDiv.querySelector('.health-text').textContent = `${Math.max(0, warrior.currentHealth)}/${warrior.maxHealth} HP`;

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
        battleLog.prepend(p);
        if (battleLog.children.length > 15) {
            battleLog.removeChild(battleLog.lastChild);
        }
    }

    // --- Determine which warrior goes first based on speed ---
    function determineFirstTurn() {
        if (playerWarrior.speed >= opponentWarrior.speed) {
            currentTurn = 'player';
            logMessage(`${playerWarrior.name} has higher or equal speed and goes first!`);
        } else {
            currentTurn = 'opponent';
            logMessage(`${opponentWarrior.name} has higher speed and goes first!`);
        }
        updateTurnDisplay();
        manageTurnControls();
        if (currentTurn === 'opponent') {
            setTimeout(opponentTurn, 1500); // Opponent acts after a short delay
        }
    }

    // --- Update Turn Display ---
    function updateTurnDisplay() {
        turnDisplay.textContent = `Current Turn: ${currentTurn === 'player' ? playerWarrior.name : opponentWarrior.name}`;
    }

    // --- Render Player Ability Buttons ---
    function renderAbilityButtons(warrior) {
        abilityButtonsDiv.innerHTML = '';
        warrior.abilities.forEach(ability => {
            const abilityBtn = document.createElement('button');
            abilityBtn.className = 'action-btn ability-btn';
            abilityBtn.textContent = ability;
            abilityBtn.dataset.abilityName = ability;
            abilityBtn.addEventListener('click', () => performAttack(warrior, opponentWarrior, 'ability', ability));
            abilityButtonsDiv.appendChild(abilityBtn);
        });
        if (warrior.signatureMove && warrior.signatureMove !== 'None') {
            const signatureBtn = document.createElement('button');
            signatureBtn.className = 'action-btn signature-move-btn';
            signatureBtn.textContent = warrior.signatureMove;
            signatureBtn.dataset.abilityName = warrior.signatureMove;
            signatureBtn.addEventListener('click', () => performAttack(warrior, opponentWarrior, 'signature', warrior.signatureMove));
            abilityButtonsDiv.appendChild(signatureBtn);
        }
    }

    // --- Core Attack Logic (handles basic, ability, signature, critical, miss) ---
    function performAttack(attacker, target, type, attackName = "Basic Attack") {
        // Prevent actions if it's not the correct turn or battle is over
        if (currentTurn === 'opponent' && attacker === playerWarrior) { // Player trying to act on opponent's turn
            logMessage("It's not your turn!");
            return;
        }
        if (currentTurn === 'player' && attacker === opponentWarrior) { // Opponent trying to act on player's turn
            // This should not happen with current logic, but good for robustness
            return;
        }

        if (attacker.currentHealth <= 0 || target.currentHealth <= 0) {
            logMessage("The battle is already over!");
            return;
        }

        let damage = 0;
        let outcomeMessage = '';
        const rand = Math.random();

        if (rand < MISS_CHANCE) {
            damage = 0;
            outcomeMessage = `${attacker.name}'s ${attackName} misses ${target.name}!`;
        } else {
            // Base damage calculation
            if (type === 'basic') {
                damage = Math.max(0, attacker.attack - target.defense / 2);
            } else if (type === 'ability') {
                damage = Math.max(0, attacker.attack * 1.2 - target.defense / 2); // Abilities do slightly more
            } else if (type === 'signature') {
                damage = Math.max(0, attacker.attack * 1.8 - target.defense / 2); // Signature moves deal significantly more
            }

            if (rand < CRITICAL_HIT_CHANCE + MISS_CHANCE) { // Adjust range for critical after miss chance
                damage *= CRITICAL_HIT_MULTIPLIER;
                outcomeMessage = `${attacker.name} uses ${attackName} and lands a CRITICAL HIT on ${target.name} for `;
            } else {
                outcomeMessage = `${attacker.name} uses ${attackName} on ${target.name} for `;
            }
            outcomeMessage += `${damage.toFixed(0)} damage!`;
        }
        
        target.currentHealth -= damage;
        logMessage(outcomeMessage);
        updateHealthDisplay(target, target === playerWarrior ? playerWarriorDiv : opponentWarriorDiv, target === playerWarrior ? 'player' : 'opponent');


        checkBattleEnd();
        // Only end turn if target is still alive and it's the current player's action
        if (target.currentHealth > 0 && currentTurn === 'player' && attacker === playerWarrior) {
            endPlayerTurn();
        } else if (target.currentHealth > 0 && currentTurn === 'opponent' && attacker === opponentWarrior) {
            // Opponent's turn ends naturally after action
            setTimeout(() => {
                currentTurn = 'player';
                updateTurnDisplay();
                manageTurnControls();
                logMessage("Opponent's turn ended. Your turn!");
            }, 1000);
        }
    }

    // --- Manage button states based on turn ---
    function manageTurnControls() {
        const playerActionButtons = document.querySelectorAll('#player-actions .action-btn');
        if (currentTurn === 'player') {
            playerActionButtons.forEach(btn => btn.disabled = false);
            endTurnBtn.disabled = false;
        } else {
            playerActionButtons.forEach(btn => btn.disabled = true);
            endTurnBtn.disabled = true;
        }
    }

    // --- Player turn ends ---
    function endPlayerTurn() {
        currentTurn = 'opponent';
        updateTurnDisplay();
        manageTurnControls();
        logMessage("Player's turn ended. Opponent's turn...");
        setTimeout(opponentTurn, 1500); // Opponent acts after a short delay
    }

    // --- Opponent Turn Logic (Slightly smarter AI) ---
    function opponentTurn() {
        if (opponentWarrior.currentHealth <= 0 || playerWarrior.currentHealth <= 0) {
            checkBattleEnd();
            return;
        }

        logMessage(`It's ${opponentWarrior.name}'s turn!`);

        let actionType = 'basic';
        let attackName = 'Basic Attack';

        const opponentHealthRatio = opponentWarrior.currentHealth / opponentWarrior.maxHealth;
        const playerHealthRatio = playerWarrior.currentHealth / playerWarrior.maxHealth;
        const rand = Math.random();

        // AI Logic:
        if (playerHealthRatio < 0.3 && rand < 0.7) { // Player is low health (e.g., < 30%), high chance to use strongest attack
            if (opponentWarrior.signatureMove && opponentWarrior.signatureMove !== 'None') {
                actionType = 'signature';
                attackName = opponentWarrior.signatureMove;
            } else if (opponentWarrior.abilities.length > 0) {
                actionType = 'ability';
                attackName = opponentWarrior.abilities[Math.floor(Math.random() * opponentWarrior.abilities.length)];
            }
        } else if (opponentWarrior.abilities.length > 0 && rand < 0.6) { // Opponent has abilities, and decent chance to use one
            actionType = 'ability';
            attackName = opponentWarrior.abilities[Math.floor(Math.random() * opponentWarrior.abilities.length)];
        } else if (opponentWarrior.signatureMove && opponentWarrior.signatureMove !== 'None' && rand < 0.2) { // Small chance for signature move if not used to finish
             actionType = 'signature';
             attackName = opponentWarrior.signatureMove;
        }
        // Else, actionType remains 'basic'

        performAttack(opponentWarrior, playerWarrior, actionType, attackName);
    }

    // --- Check for battle end condition ---
    function checkBattleEnd() {
        if (playerWarrior.currentHealth <= 0) {
            playerWarrior.currentHealth = 0;
            updateHealthDisplay(playerWarrior, playerWarriorDiv, 'player');
            logMessage(`*** ${playerWarrior.name} has been defeated! ${opponentWarrior.name} wins! ***`);
            attackBtn.disabled = true;
            abilityButtonsDiv.querySelectorAll('button').forEach(btn => btn.disabled = true);
            endTurnBtn.disabled = true;
            turnDisplay.textContent = "Battle Over!";
        } else if (opponentWarrior.currentHealth <= 0) {
            opponentWarrior.currentHealth = 0;
            updateHealthDisplay(opponentWarrior, opponentWarriorDiv, 'opponent');
            logMessage(`*** ${opponentWarrior.name} has been defeated! ${playerWarrior.name} wins! ***`);
            attackBtn.disabled = true;
            abilityButtonsDiv.querySelectorAll('button').forEach(btn => btn.disabled = true);
            endTurnBtn.disabled = true;
            turnDisplay.textContent = "Battle Over!";
        }
    }

    // --- Attack Button Event Listener ---
    attackBtn.addEventListener('click', () => {
        performAttack(playerWarrior, opponentWarrior, 'basic');
    });

    // --- End Turn Button Event Listener ---
    endTurnBtn.addEventListener('click', () => {
        if (currentTurn !== 'player') {
            logMessage("It's not your turn to end!");
            return;
        }
        logMessage(`${playerWarrior.name} ends their turn.`);
        endPlayerTurn();
    });

    // --- Return to Selection Button ---
    returnBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // --- Run on page load ---
    initializeBattle();
});
