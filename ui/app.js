async function handleSend() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    const userText = input.value.trim();
    if (!userText) return;

    chat.innerHTML += `<p class="user"><b>You:</b> ${userText}</p>`;

    const response = await nerryProcessInput(userText);

    chat.innerHTML += `<p class="ai"><b>Nerry:</b> ${response}</p>`;

    updateContext(userText, response);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;
}
