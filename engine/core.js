// Hold all data in memory
let NERRY_DATA = {
    intents: null,
    knowledge: null,
    personality: null
};

// Load all JSON once at startup
async function nerryLoadData() {
    if (!NERRY_DATA.intents) {
        NERRY_DATA.intents = await fetch("data/intents.json").then(r => r.json());
    }
    if (!NERRY_DATA.knowledge) {
        NERRY_DATA.knowledge = await fetch("data/knowledge.json").then(r => r.json());
    }
    if (!NERRY_DATA.personality) {
        NERRY_DATA.personality = await fetch("data/personality.json").then(r => r.json());
    }
    console.log("✅ Nerry Data Loaded");
}

// Detect intent using cached data
async function detectIntent(input) {
    if (!NERRY_DATA.intents) await nerryLoadData();
    let bestIntent = "default";
    let bestScore = 0;
    for (let intent in NERRY_DATA.intents) {
        let score = 0;
        NERRY_DATA.intents[intent].patterns.forEach(p => {
            if (input.toLowerCase().includes(p.toLowerCase())) score += NERRY_DATA.intents[intent].weight;
        });
        if (score > bestScore) { bestScore = score; bestIntent = intent; }
    }
    return bestIntent;
}

// Build response using cached knowledge
async function buildResponse(intent, input) {
    if (!NERRY_DATA.knowledge) await nerryLoadData();
    const knowledge = NERRY_DATA.knowledge[intent] || NERRY_DATA.knowledge["default"];
    let template = knowledge.templates[Math.floor(Math.random() * knowledge.templates.length)];
    let response = template.replace("{topic}", input);
    if (knowledge.details && knowledge.details.length > 0) {
        response += " " + knowledge.details[Math.floor(Math.random() * knowledge.details.length)];
    }
    return response;
}

// Apply personality using cached data
async function applyPersonality(text) {
    if (!NERRY_DATA.personality) await nerryLoadData();
    const p = NERRY_DATA.personality;
    if (Math.random() < (p.slang_probability || 0.2) && p.slang) {
        text += " " + p.slang[Math.floor(Math.random() * p.slang.length)];
    }
    if (p.signature_style) {
        text += " " + p.signature_style[Math.floor(Math.random() * p.signature_style.length)];
    }
    return text;
}

// Full input → output
async function nerryProcessInput(input) {
    await nerryLoadData(); // Ensure all data is loaded
    const intent = await detectIntent(input);
    let response = await buildResponse(intent, input);
    response = await applyPersonality(response);
    return response;
}
