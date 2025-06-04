document.addEventListener('DOMContentLoaded', () => {
    window.gameData = { // Made gameData a global property
        universes: [
            {
                id: 'trueflow',
                name: 'TrueFlow Universe',
                image: 'The TrueFlow Universe .png',
                uniqueMechanics: 'The TrueFlow Universe operates on seven core cosmic forces, each governing distinct aspects of reality manipulation, combat mechanics, and multiversal influence. It governs universal stability and controls battlefield flow, ensuring combat interactions follow structured sequences while allowing skilled warriors to manipulate engagement timing.'
            },
            {
                id: 'zephirion',
                name: 'Zephirion (Structured Order)',
                image: 'zephirion_universe_tab.png', // Placeholder for Zephirion image - add this file if you have it!
                uniqueMechanics: 'Cyclic battle mechanics based on strategic precision. A mechanized world of precise cycles; towering clockwork structures & time-controlled battlefields. Golden-hued energy grids flow through its metallic terrain, ensuring combat remains rhythmic and predetermined. Celestial time constructs hover above, regulating battles through pulse-driven synchronization.'
            },
            {
                id: 'nytherra',
                name: 'Nytherra (Hybrid Chaos)',
                image: 'Nytherra, The Fractured Dominion.png',
                uniqueMechanics: 'Fusion combat, where stability and disorder battle for control. A realm in constant flux, where structured cities battle against collapsing zones of uncontrolled energy. Shifting biomes, where reality alternates between structured fortresses and zones of entropy-fueled destruction. Energy storms disrupt battlefield conditions, forcing warriors to adapt to sudden environmental breakdowns.'
            },
            {
                id: 'shattered_dominion_nytherra',
                name: 'Shattered Dominion Nytherra (Pure Chaos)',
                image: 'Nytherra, The Shattered Dominion .png',
                uniqueMechanics: 'Reality breakdown mechanics, forcing warriors to fight in collapsing structures. A battlefield of pure destruction, featuring fragmented space, unstable debris storms, and reality-warping anomalies.'
            },
            {
                id: 'thought_nexus',
                name: 'Thought Nexus (Existence Through Willpower)',
                image: 'The Thought Nexus.png',
                uniqueMechanics: 'Combat relies on belief-driven mechanics, where perception shapes reality. A plane made entirely of willpower, where floating islands shape themselves based on warrior imagination. Reality shifts based on warriors\' beliefs, meaning landscapes are shaped by the strongest perceptions. Celestial mindstream currents flow through battlefields, allowing fighters to mentally enhance their surroundings.'
            },
            {
                id: 'constructive_domain',
                name: 'Constructive Domain (Living Constructs)',
                image: 'The Constructive Domain.png',
                uniqueMechanics: 'Fighters are sentient structures, meaning battlefields themselves become combatants. A universe where the battlefield itself is sentient, meaning cities, fortresses, and weapons think and evolve. Sentient fortresses, evolving battle constructs, and living cities that reshape combat environments dynamically. Intelligent corridors, weaponized structures, and adaptable terrain respond to warrior movements. Energy core pillars regulate battlefield mechanics, ensuring warriors fight within ever-changing fortifications.'
            },
            {
                id: 'evolving_frontier',
                name: 'Evolving Frontier (Unstable Evolution)',
                image: 'A Realm of Unstable Evolution .png',
                uniqueMechanics: 'Warriors mutate mid-battle, ensuring transformation and adaptation define combat. A shifting world, where landscapes mutate mid-battle, forcing warriors to adapt to new terrain instantly. A biome that mutates every few minutes, ensuring the terrain never remains stable. Floating ecosystems that regenerate, forcing warriors to adapt their physical forms to environmental shifts. Organic battle structures, allowing combatants to fuse with terrain to evolve mid-fight.'
            },
            {
                id: 'emotional_conflux',
                name: 'Emotional Conflux (Pure Emotion)',
                image: 'A Realm of Pure Emotion.png',
                uniqueMechanics: 'Battles operate on raw feeling, turning emotions into tangible combat forces. A cosmic battlefield shaped by psychological energy, where sadness forms voids, rage ignites flame storms, and joy stabilizes terrain. Unpredictable color shifts, where hues match dominant emotions, creating reactive energy fields. Reality distorts based on mental resilience, meaning weak-willed warriors alter the battlefield unintentionally.'
            },
            {
                id: 'invisible_dominion',
                name: 'Invisible Dominion (Unseen Warfare)',
                image: 'The Invisible Dominion.png',
                uniqueMechanics: 'Warriors fight through hidden interventions, altering reality without appearing in combat. A battlefield that does not appear, meaning only influence-driven warriors can perceive hidden combat sequences. Combat unfolds entirely through unseen energy, meaning warriors must detect shifts in undefined landscapes. Translucent structures phase in and out of reality, ensuring movement occurs beyond conventional visibility. Gravity distortions, preventing fighters from engaging in traditional combat styles.'
            },
            {
                id: 'paradox_nexus',
                name: 'Paradox Nexus (Contradiction-Based Reality)',
                image: 'The Paradox Nexus.png',
                uniqueMechanics: 'Battles unfold in self-conflicting sequences, where victory and defeat coexist. A realm where opposite forces coexist, featuring fire that freezes, light that darkens, and infinite loop zones. A battlefield where time moves forward and backward simultaneously, forcing warriors to battle in unstable timelines. Zones where energy behaves paradoxically light turns to darkness, heat creates ice, motion halts movement. Infinite loop corridors, forcing fighters into battle sequences that may never end.'
            },
            {
                id: 'symmetry_domain',
                name: 'Symmetry Domain (Absolute Synchronization)',
                image: 'The Symmetry Domain.png',
                uniqueMechanics: 'Combat occurs within structured rhythm, ensuring movements align with reality\'s harmony. Floating geometric landscapes, where perfect alignment shapes battlefield movement. Reality waves pulse in rhythmic sequences, ensuring structured combat mechanics remains intact. Holographic grid formations, regulating energy flow so that battle timing remains precise.'
            }
        ],
        warriors: [
            {
                id: 'saikou_venga',
                name: 'Saikou Venga',
                universeId: 'trueflow',
                img: 'saikouvenga.png',
                combatStyle: 'Cosmic Strategist and Reality Regulator',
                abilities: [
                    'Reality Bending',
                    'Cosmic Manipulation',
                    'Strategic Interventions',
                    'Multiversal Influence',
                    'Hidden Tactical Precision'
                ],
                signatureMove: 'Multiversal Game Reset',
                maxHealth: 120, // Example Stat
                attack: 25,     // Example Stat
                defense: 15,    // Example Stat
                speed: 10       // Example Stat (determines turn order in more complex systems)
            },
            {
                id: 'melvin_sewell',
                name: 'Melvin Sewell, M.Sc., Ph.D.',
                universeId: 'trueflow',
                img: 'melvinsewell.msc.phd.png',
                combatStyle: 'True Flow Force Warrior with Intellect and Strategic Adaptability',
                abilities: [
                    'Cosmic Precision',
                    'Reality-Level Influence',
                    'Philosophical Depth',
                    'Commands Structured & Chaotic Elements'
                ],
                signatureMove: 'True Flow Calibration',
                maxHealth: 110, // Example Stat
                attack: 22,     // Example Stat
                defense: 18,    // Example Stat
                speed: 8        // Example Stat
            },
            {
                id: 'vextris_prime',
                name: 'Vextris Prime – The War Engine',
                universeId: 'constructive_domain',
                img: 'Vextris Prime – The War Engine.png',
                combatStyle: 'Towering, sentient fortress with evolving battle constructs and dynamic adaptability.',
                abilities: [
                    'Seamlessly integrates weaponized extensions',
                    'Uses glowing energy cores',
                    'Commands fortress-like structures',
                    'Battlefield fights alongside them'
                ],
                signatureMove: 'Integrated Siege Mode',
                maxHealth: 180, // High Health
                attack: 20,
                defense: 30,    // High Defense
                speed: 3        // Low Speed
            },
            {
                id: 'xal_vorr',
                name: 'Xal\'Vorr – The Unstable Mutator',
                universeId: 'evolving_frontier',
                img: 'Xal’Vorr – The Unstable Mutator .png',
                combatStyle: 'Constant adaptation and transformation; form in perpetual flux.',
                abilities: [
                    'Organic armor mutating mid-battle',
                    'Glowing veins of unstable energy',
                    'Shifting limbs that alter based on combat conditions'
                ],
                signatureMove: 'Chaotic Apex Mutation',
                maxHealth: 100,
                attack: 28,     // High Attack
                defense: 12,
                speed: 15       // High Speed
            },
            {
                id: 'veythar_rageborn',
                name: 'Veythar Rageborn – The Manifestation of Wrath',
                universeId: 'emotional_conflux',
                img: 'Veythar Rageborn – The Manifestation of Wrath.png',
                combatStyle: 'Forged from pure fury, wielding raw, unrelenting energy.',
                abilities: [
                    'Radiates searing intensity',
                    'Burning scars and molten veins of rage-fueled power',
                    'Presence warps the battlefield through overwhelming wrath'
                ],
                signatureMove: 'Infernal Conflux',
                maxHealth: 115,
                attack: 30,     // Very High Attack
                defense: 10,
                speed: 8
            },
            {
                id: 'xel_thar_nyx',
                name: 'Xel\'thar Nyx – The Fearborn Phantom',
                universeId: 'invisible_dominion',
                img: 'Xel’thar Nyx – The Fearborn Phantom.png',
                combatStyle: 'Forged from the essence of fear, wielding enigmatic forces.',
                abilities: [
                    'Distorts visibility and perception',
                    'Creates phantom projections that unravel psyche',
                    'Shrouds form in shadow-born energy',
                    'Moves between dimensions unseen'
                ],
                signatureMove: 'Phantasmagoric Terror',
                maxHealth: 90,      // Low Health
                attack: 22,
                defense: 10,
                speed: 20           // Very High Speed (for evasion/turn order)
            },
            {
                id: 'vaelith_dualis',
                name: 'Vaelith Dualis – The Opposing Force',
                universeId: 'paradox_nexus',
                img: 'Vaelith Dualis – The Opposing Force.png',
                combatStyle: 'Embodies pure contradiction, wielding paradoxical forces.',
                abilities: [
                    'Form shifts between opposing states (creation/harmony vs. chaos/destruction)',
                    'Reverses energy flows',
                    'Manipulates paradox-driven combat mechanics',
                    'Maintains equilibrium amidst contradiction'
                ],
                signatureMove: 'Contradictory Cascade',
                maxHealth: 105,
                attack: 24,
                defense: 14,
                speed: 12
            },
            {
                id: 'xal_myr_veyna',
                name: 'Xal\'Myr Veyna – The Temporal Conductor',
                universeId: 'symmetry_domain',
                img: 'Xal’Myr Veyna – The Temporal Conductor.png',
                combatStyle: 'Master of time manipulation, wielding boundless forces.',
                abilities: [
                    'Governs rhythmic pulses of reality',
                    'Ensures battle sequences unfold in precise synchronization',
                    'Adorned with celestial clockwork patterns',
                    'Commands battlefield with absolute temporal control'
                ],
                signatureMove: 'Synchronized Chrono-Flow',
                maxHealth: 110,
                attack: 23,
                defense: 16,
                speed: 10
            },
            {
                id: 'the_forgotten_warden',
                name: 'The Forgotten Warden – Erasure-Based Combatant',
                universeId: 'invisible_dominion',
                img: 'The Forgotten Warden – Erasure-Based Combatant.png',
                combatStyle: 'Wields the power of erasure; opponents and structures fade from existence.',
                abilities: [
                    'Distorts memory and perception',
                    'Distorts battlefield stability',
                    'Makes engagements feel as though they never happened'
                ],
                signatureMove: 'Absolute Nullification',
                maxHealth: 95,
                attack: 26,
                defense: 13,
                speed: 18
            }
        ]
    };

    const universeSelectionDiv = document.getElementById('universe-selection');
    const characterListDiv = document.getElementById('character-list');
    // const selectedCharacterInfoDiv = document.getElementById('selected-character-info'); // No longer used for main display
    const startBattleBtn = document.getElementById('start-battle-btn'); // This button is removed from HTML
    const toggleLoreBtn = document.getElementById('toggle-lore-btn');
    const loreSection = document.getElementById('lore-section');
    const lorePdfFrame = document.getElementById('lore-pdf-frame');

    // New Modal Elements
    const characterDetailModal = document.getElementById('character-detail-modal');
    const modalCharacterInfoDiv = document.getElementById('modal-character-info');
    const closeButton = document.querySelector('.close-button');
    const startBattleModalBtn = document.getElementById('start-battle-modal-btn'); // Button inside the modal


    let currentUniverseId = null;
    let selectedCharacterId = null; // Will now be used to store ID for modal and battle start

    // Load PDF (assuming it's hosted externally now or not too large)
    if (lorePdfFrame) {
        // IMPORTANT: If your PDF was too large for GitHub, ensure this points to your externally hosted PDF link!
        // Example: lorePdfFrame.src = 'YOUR_EXTERNAL_PDF_LINK_HERE';
        lorePdfFrame.src = 'Ph.D Dissertation By Melvin Sewell.pdf'; // Keep this if you can host it locally/directly
    }

    // Toggle Lore Section
    if (toggleLoreBtn && loreSection) {
        toggleLoreBtn.addEventListener('click', () => {
            if (loreSection.style.display === 'block') {
                loreSection.style.display = 'none';
                toggleLoreBtn.textContent = 'Show Lore Section';
            } else {
                loreSection.style.display = 'block';
                toggleLoreBtn.textContent = 'Hide Lore Section';
            }
        });
    }

    // Render Universe Tabs
    function renderUniverseTabs() {
        universeSelectionDiv.innerHTML = ''; // Clear existing tabs
        window.gameData.universes.forEach(universe => { // Use window.gameData here
            const button = document.createElement('button');
            button.className = 'universe-tab';
            button.dataset.universeId = universe.id;
            button.textContent = universe.name;

            // ACTIVATE THESE LINES to add the background image
            if (universe.image) { // Only apply if an image path exists
                button.style.backgroundImage = `url('${universe.image}')`;
                button.classList.add('has-image'); // Add a class for specific image styling
            }

            button.addEventListener('click', () => {
                selectUniverse(universe.id);
            });
            universeSelectionDiv.appendChild(button);
        });
    }

    // Select Universe
    function selectUniverse(universeId) {
        currentUniverseId = universeId;
        selectedCharacterId = null; // Clear selected character when universe changes
        updateUniverseTabs();
        renderCharacterList();
        // clearCharacterDetails(); // No longer needed as details are in modal
    }

    // Update Universe Tab Styles
    function updateUniverseTabs() {
        document.querySelectorAll('.universe-tab').forEach(tab => {
            if (tab.dataset.universeId === currentUniverseId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }

    // Render Character List for selected universe
    function renderCharacterList() {
        characterListDiv.innerHTML = ''; // Clear existing characters
        if (!currentUniverseId) return;

        const currentUniverseWarriors = window.gameData.warriors.filter(warrior => warrior.universeId === currentUniverseId); // Use window.gameData

        currentUniverseWarriors.forEach(warrior => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.dataset.characterId = warrior.id;

            characterCard.innerHTML = `
                <img src="${warrior.img}" alt="${warrior.name} Portrait">
                <h3>${warrior.name}</h3>
                <p>${warrior.combatStyle}</p>
                <p>HP: ${warrior.maxHealth} | ATK: ${warrior.attack} | DEF: ${warrior.defense}</p>
            `;

            characterCard.addEventListener('click', () => {
                selectCharacter(warrior.id); // This will now open the modal
            });
            characterListDiv.appendChild(characterCard);
        });
    }

    // Select Character (Now opens Modal)
    function selectCharacter(characterId) {
        selectedCharacterId = characterId;
        updateCharacterCards(); // Keep for visual selection on main screen
        displayCharacterDetailsInModal(); // Display details in the modal
        characterDetailModal.style.display = 'flex'; // Show the modal (using flex to center)
    }

    // Update Character Card Styles
    function updateCharacterCards() {
        document.querySelectorAll('.character-card').forEach(card => {
            if (card.dataset.characterId === selectedCharacterId) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    // Display Character Details in Modal
    function displayCharacterDetailsInModal() {
        if (!selectedCharacterId) {
            modalCharacterInfoDiv.innerHTML = '<h2>No Warrior Selected</h2><p>Please select a warrior from the list.</p>';
            startBattleModalBtn.disabled = true;
            return;
        }

        const selectedWarrior = window.gameData.warriors.find(warrior => warrior.id === selectedCharacterId);
        if (!selectedWarrior) {
            modalCharacterInfoDiv.innerHTML = '<h2>Warrior Not Found</h2><p>The selected warrior could not be loaded.</p>';
            startBattleModalBtn.disabled = true;
            return;
        }

        const abilitiesList = selectedWarrior.abilities.map(ability => `<li>${ability}</li>`).join('');

        modalCharacterInfoDiv.innerHTML = `
            <h2>${selectedWarrior.name}</h2>
            <p><strong>Universe:</strong> ${window.gameData.universes.find(u => u.id === selectedWarrior.universeId)?.name || 'Unknown'}</p>
            <p><strong>Combat Style:</strong> ${selectedWarrior.combatStyle}</p>
            <p><strong>Stats:</strong> Max HP: ${selectedWarrior.maxHealth} | Attack: ${selectedWarrior.attack} | Defense: ${selectedWarrior.defense} | Speed: ${selectedWarrior.speed}</p>
            <h3>Abilities:</h3>
            <ul>${abilitiesList}</ul>
            <p><strong>Signature Move:</strong> ${selectedWarrior.signatureMove}</p>
        `;
        startBattleModalBtn.disabled = false; // Enable button once details are shown
    }

    // --- Modal Close Logic ---
    closeButton.addEventListener('click', () => {
        characterDetailModal.style.display = 'none';
        selectedCharacterId = null; // Clear selected character when modal closes
        updateCharacterCards(); // Remove 'selected' class from card
    });

    // Close the modal if user clicks outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === characterDetailModal) {
            characterDetailModal.style.display = 'none';
            selectedCharacterId = null; // Clear selected character when modal closes
            updateCharacterCards(); // Remove 'selected' class from card
        }
    });

    // Start Battle Button Event Listener (inside modal)
    startBattleModalBtn.addEventListener('click', () => {
        if (selectedCharacterId) {
            window.location.href = `battle.html?characterId=${selectedCharacterId}`;
        } else {
            alert('Please select a warrior first!'); // Should not happen if button is disabled correctly
        }
    });

    // Initial render
    renderUniverseTabs();
    selectUniverse('trueflow'); // Default to TrueFlow Universe on load
});