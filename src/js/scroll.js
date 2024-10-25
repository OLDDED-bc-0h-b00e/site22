let timer;
let timerDuration = 1500; // Время в миллисекундах, когда ползунок исчезнет
SmoothScroll({
animationTime: 800, // Время анимации прокрутки
stepSize: 75, // Размер шага прокрутки в пикселях
accelerationDelta: 30, // Ускорение скроллаs
accelerationMax: 2, // Максимальное ускорение
keyboardSupport: true, // Поддержка клавиатуры
arrowScroll: 50, // Шаг прокрутки стрелками на клавиатуре в пикселях
pulseAlgorithm: true, // Алгоритм пульсации
pulseScale: 4, // Масштаб пульсации
pulseNormalize: 1, // Нормализация пульсации
touchpadSupport: true, // Поддержка тачпада
});

document.addEventListener('DOMContentLoaded', function () {
    const thumb = document.querySelector('.custom-scrollbar-thumb-md');
    const scrollbar = document.querySelector('.custom-scrollbar-md');
    const ucScroll = document.querySelector('.uc-scroll-md');
    let isDragging = false;
    let startY, startThumbTop;
    function updateThumbHeight() {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const thumbHeight = clientHeight / scrollHeight * clientHeight;
    thumb.style.height = thumbHeight + 'px';
    }
    function updateScroll() {
    const scrollPercentage = thumb.offsetTop / (scrollbar.offsetHeight - thumb.offsetHeight);
    const scrollAmount = scrollPercentage * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo(0, scrollAmount);
    }
    function resetTimer() {
    clearTimeout(timer); 
    timer = setTimeout(function() {
    thumb.classList.add('hide'); 
    }, timerDuration); 
    }
    updateThumbHeight();
    resetTimer(); 
    window.addEventListener('resize', updateThumbHeight); 
    window.addEventListener('scroll', function () {
    thumb.classList.remove('hide'); 
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const thumbPosition = scrollPercentage * (scrollbar.offsetHeight - thumb.offsetHeight);
    thumb.style.top = thumbPosition + 'px';
    resetTimer(); 
    });
    thumb.addEventListener('mousedown', function (e) {
    isDragging = true;
    startY = e.clientY;
    startThumbTop = thumb.offsetTop;
    resetTimer(); 
    });
    document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    thumb.style.top = Math.min(scrollbar.offsetHeight - thumb.offsetHeight, Math.max(0, startThumbTop + deltaY)) + 'px';
    updateScroll();
    resetTimer(); 
    });
    thumb.addEventListener('mouseenter', function () {
    clearTimeout(timer);
    });
    thumb.addEventListener('mouseleave', function () {
    resetTimer();
    });
    document.addEventListener('mouseup', function () {
    isDragging = false;
    resetTimer(); 
    });
    scrollbar.addEventListener('mouseenter', function () {
    thumb.classList.remove('hide');
    thumb.classList.add('active');
    ucScroll.classList.add('active');
    });
    scrollbar.addEventListener('mouseleave', function () {
    ucScroll.classList.remove('active');
    resetTimer(); 
    });
    scrollbar.addEventListener('mousedown', function () {
    thumb.classList.remove('hide');
    thumb.classList.add('active');
    ucScroll.classList.remove('active');
    resetTimer(); 
    });
    scrollbar.addEventListener('mouseup', function () {
    resetTimer(); 
    });
    });