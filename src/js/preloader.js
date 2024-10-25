window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    let progress = 0;

    // Функция для обновления прогресса
    const updateProgress = setInterval(() => {
        progress += 1; // Увеличиваем прогресс на 1%
        progressBar.style.width = progress + '%'; // Устанавливаем ширину полоски
        progressText.textContent = progress + '%'; // Обновляем текст

        // Если прогресс достиг 100%, останавливаем интервал
        if (progress >= 100) {
            clearInterval(updateProgress);
            // Добавляем класс для перемещения прелоадера вверх
            preloader.classList.add('move-up');

            // Показываем контент через некоторое время
            setTimeout(() => {
                content.style.display = 'block'; // Показываем контент
            }, 500); // Задержка перед показом контента
        }
    }, 50); // Интервал обновления прогресса (50 мс)
});