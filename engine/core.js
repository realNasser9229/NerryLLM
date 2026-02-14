async function nerryProcessInput(input) {
    const intent = await detectIntent(input);
    let response = await buildResponse(intent, input);
    response = await applyPersonality(response);
    return response;
}
