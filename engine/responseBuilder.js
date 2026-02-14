let knowledgeData = null;

async function loadKnowledge() {
    if (!knowledgeData) {
        const res = await fetch("data/knowledge.json");
        knowledgeData = await res.json();
    }
}

async function buildResponse(intent, input) {
    await loadKnowledge();

    const knowledge = knowledgeData[intent] || knowledgeData["default"];
    let template = knowledge.templates[Math.floor(Math.random() * knowledge.templates.length)];
    let response = template.replace("{topic}", input);

    // Optional: add extra knowledge details
    if (knowledge.details) {
        response += " " + knowledge.details[Math.floor(Math.random() * knowledge.details.length)];
    }

    return response;
}
