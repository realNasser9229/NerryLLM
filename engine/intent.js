let intentsData = null;

async function loadIntents() {
    if (!intentsData) {
        const res = await fetch("data/intents.json");
        intentsData = await res.json();
    }
}

async function detectIntent(input) {
    await loadIntents();

    let bestIntent = null;
    let bestScore = 0;

    for (let intent in intentsData) {
        let score = 0;
        intentsData[intent].patterns.forEach(pattern => {
            if (input.toLowerCase().includes(pattern.toLowerCase())) {
                score += intentsData[intent].weight;
            }
        });
        if (score > bestScore) {
            bestScore = score;
            bestIntent = intent;
        }
    }

    return bestIntent || "default";
}
