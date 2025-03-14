function calculateProbability(playerCards, dealerCards, deckCount) {
    const simulations = 10000; // Количество симуляций
    let wins = 0;

    for (let i = 0; i < simulations; i++) {
        const simulatedDeck = createDeck(deckCount);
        const simulatedPlayerCards = [...playerCards];
        const simulatedDealerCards = [...dealerCards];

        // Симуляция игры
        const result = simulateGame(simulatedPlayerCards, simulatedDealerCards, simulatedDeck);
        if (result === 'win') wins++;
    }

    return ((wins / simulations) * 100).toFixed(2);
}

function createDeck(deckCount) {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (let i = 0; i < deckCount; i++) {
        for (const rank of ranks) {
            deck.push(rank);
        }
    }
    return deck;
}

function simulateGame(playerCards, dealerCards, deck) {
    // Логика симуляции игры
    // Возвращает 'win', 'lose' или 'draw'
    return 'win'; // Заглушка
}
