// Выбранные карты
let dealerSelectedCards = [];
let playerSelectedCards = [];

// Обработчики для карт дилера
document.querySelectorAll('#dealer-cards button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.getAttribute('data-card');
        if (dealerSelectedCards.includes(card)) {
            // Убираем карту, если она уже выбрана
            dealerSelectedCards = dealerSelectedCards.filter(c => c !== card);
            button.classList.remove('selected');
        } else {
            // Добавляем карту
            dealerSelectedCards.push(card);
            button.classList.add('selected');
        }
    });
});

// Обработчики для карт игрока
document.querySelectorAll('#player-cards button').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.getAttribute('data-card');
        if (playerSelectedCards.includes(card)) {
            // Убираем карту, если она уже выбрана
            playerSelectedCards = playerSelectedCards.filter(c => c !== card);
            button.classList.remove('selected');
        } else {
            // Добавляем карту
            playerSelectedCards.push(card);
            button.classList.add('selected');
        }
    });
});

// Кнопка расчета
document.getElementById('calculate-btn').addEventListener('click', () => {
    const deckCount = 1; // Количество колод (можно добавить выбор)
    const probability = calculateProbability(playerSelectedCards, dealerSelectedCards, deckCount);
    document.getElementById('result').innerText = `Вероятность выигрыша: ${probability}%`;
});

// Заглушка для расчета вероятности
function calculateProbability(playerCards, dealerCards, deckCount) {
    // Здесь будет логика расчета
    return (Math.random() * 100).toFixed(2); // Пример случайного числа
}
