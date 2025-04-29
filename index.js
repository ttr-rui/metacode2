//轮播图
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const slideContainer = document.querySelector('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// 切换幻灯片
function goToSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

// 更新指示点
function updateDots() {
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

// 事件监听
document.querySelector('.prev-btn').addEventListener('click', () => goToSlide(currentIndex - 1));
document.querySelector('.next-btn').addEventListener('click', () => goToSlide(currentIndex + 1));

dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
});

// 自动播放（可选）
let autoPlay = setInterval(() => goToSlide(currentIndex + 1), 3000);

// 鼠标悬停暂停
slideContainer.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlay));
slideContainer.parentElement.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goToSlide(currentIndex + 1), 3000);
});