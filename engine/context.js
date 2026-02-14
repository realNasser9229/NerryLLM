let conversationHistory = [];

function updateContext(userInput, aiResponse) {
    conversationHistory.push({ user: userInput, ai: aiResponse });
    if (conversationHistory.length > 5) {
        conversationHistory.shift();
    }
}

function getContext() {
    return conversationHistory;
}
