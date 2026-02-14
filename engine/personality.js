let personalityData = null;

async function loadPersonality() {
    if (!personalityData) {
        const res = await fetch("data/personality.json");
        personalityData = await res.json();
    }
}

async function applyPersonality(text) {
    await loadPersonality();

    // Inject slang randomly
    const slangChance = personalityData.slang_probability || 0.2;
    if (Math.random() < slangChance && personalityData.slang) {
        const slang = personalityData.slang[Math.floor(Math.random() * personalityData.slang.length)];
        text += " " + slang;
    }

    // Add signature style
    if (personalityData.signature_style) {
        const sig = personalityData.signature_style[Math.floor(Math.random() * personalityData.signature_style.length)];
        text += " " + sig;
    }

    return text;
}
