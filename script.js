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
// Функция для подсказки
function getHint(playerCards, dealerCard) {
    const playerTotal = calculateHandTotal(playerCards);
    const dealerTotal = calculateHandTotal([dealerCard]);

    // Если у игрока туз и сумма 11 или меньше, считаем туз как 11
    const softTotal = playerCards.includes('A') && playerTotal <= 11;

    // Стандартная стратегия
    if (playerTotal >= 17) {
        return "Остановитесь (Stand)";
    } else if (playerTotal <= 11) {
        return "Берите карту (Hit)";
    } else if (softTotal) {
        // Мягкая рука (туз считается как 11)
        if (playerTotal >= 19) {
            return "Остановитесь (Stand)";
        } else if (playerTotal === 18 && dealerTotal >= 9) {
            return "Берите карту (Hit)";
        } else {
            return "Остановитесь (Stand)";
        }
    } else {
        // Жесткая рука (туз считается как 1)
        if (dealerTotal >= 7) {
            return "Берите карту (Hit)";
        } else if (playerTotal === 12 && dealerTotal <= 3) {
            return "Берите карту (Hit)";
        } else {
            return "Остановитесь (Stand)";
        }
    }
}

// Функция для расчета суммы карт
function calculateHandTotal(cards) {
    let total = 0;
    let aces = 0;

    cards.forEach(card => {
        if (card === 'A') {
            total += 11;
            aces++;
        } else if (['J', 'Q', 'K'].includes(card)) {
            total += 10;
        } else {
            total += parseInt(card);
        }
    });

    // Корректируем сумму, если тузы считаются как 1
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }

    return total;
}

// Обновим обработчик кнопки расчета
document.getElementById('calculate-btn').addEventListener('click', () => {
    const deckCount = 1; // Количество колод (можно добавить выбор)
    const probability = calculateProbability(playerSelectedCards, dealerSelectedCards, deckCount);
    document.getElementById('result').innerText = `Вероятность выигрыша: ${probability}%`;

    // Подсказка
    if (dealerSelectedCards.length > 0 && playerSelectedCards.length > 0) {
        const hint = getHint(playerSelectedCards, dealerSelectedCards[0]);
        document.getElementById('hint').innerText = `Совет: ${hint}`;
    } else {
        document.getElementById('hint').innerText = "Выберите карты дилера и игрока";
    }
});
}
