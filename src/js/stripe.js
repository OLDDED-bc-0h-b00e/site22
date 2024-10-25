document.addEventListener('DOMContentLoaded', () => {
    const instagramImages = document.querySelector('.instagram-images');
    const instagramItems = document.querySelectorAll('.instagram-item');
    const totalItems = instagramItems.length;
    let currentIndex = 0;
    let isFirstRound = true;

    function cloneElements() {
        const clonedItemsBefore = Array.from(instagramItems).map(item => item.cloneNode(true));
        const clonedItemsAfter = Array.from(instagramItems).map(item => item.cloneNode(true));
        
        clonedItemsBefore.forEach(item => instagramImages.insertBefore(item, instagramImages.firstChild));
        clonedItemsAfter.forEach(item => instagramImages.appendChild(item));
    }

    function startAnimation() {
        instagramImages.style.transform = `translateX(-${100 * totalItems}%)`;

        function slideImages() {
            currentIndex++;
            const duration = isFirstRound ? 3 : 4;
            instagramImages.style.transition = `transform ${duration}s linear`;
            instagramImages.style.transform = `translateX(-${(totalItems + currentIndex) * 100 / (totalItems * 3)}%)`;

            if (currentIndex === totalItems) {
                setTimeout(() => {
                    instagramImages.style.transition = 'none';
                    instagramImages.style.transform = `translateX(-${100 * totalItems}%)`;
                    currentIndex = 0;
                    isFirstRound = false;

                    // Запускаем анимацию снова
                    requestAnimationFrame(() => {
                        instagramImages.style.transition = 'transform 4s linear';
                        slideImages();
                    });
                }, duration * 1000);
            } else {
                setTimeout(slideImages, duration * 1500);
            }
        }

        slideImages();
    }

    function checkImagesLoaded() {
        const images = instagramImages.querySelectorAll('img');
        let loadedImages = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        cloneElements();
                        startAnimation();
                    }
                });
            }
        });

        // Если все изображения уже загружены
        if (loadedImages === images.length) {
            cloneElements();
            startAnimation();
        }
    }

    checkImagesLoaded();
});