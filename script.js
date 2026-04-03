document.addEventListener('DOMContentLoaded', () => {
    const banners = [
        {
            id: 1,
            image: "image/1775227610378_GRAND%20EASTER%20HEIST%20Tournament%20%281%29.png",
            title: "500 000 €",
            subtitle: "Пасхальный турнир от Endorphina!"
        },
        {
            id: 2,
            image: "image/1763640463036_Fortune_Bags_Site_Promo_%28Banda%29.png",
            title: "Испытай Удачу",
            subtitle: "вместе с Fortune Bags!"
        },
        {
            id: 3,
            image: "image/1758107613594_New_games.png",
            title: "Свежак на районе!",
            subtitle: "Новые игры уже здесь!"
        },
        {
            id: 4,
            image: "image/1728721451245_Welcome.png",
            title: "750 ФС",
            subtitle: "Вот это приветственный БОНУС!"
        },
        {
            id: 5,
            image: "image/1728731135783_Wheel.png",
            title: "Колесо Фортуны",
            subtitle: "Крути колесо каждый день!"
        }
    ];
    const games = [
        { id: 1, name: "Gates of Olympus", provider: "Pragmatic", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 2, name: "Sweet Bonanza", provider: "Pragmatic", image: "image/Piggy.webp" },
        { id: 3, name: "Book of Dead", provider: "Play'n GO", image: "image/1769715461541_Pray20Six.webp" },
        { id: 4, name: "Razor Shark", provider: "Push Gaming", image: "image/Mummy.webp" },
        { id: 5, name: "Money Train 4", provider: "Relax", image: "image/Raceday.webp" },
        { id: 6, name: "Roulette Live", provider: "Evolution", image: "image/Eternal.webp" },
        { id: 7, name: "Blackjack VIP", provider: "Evolution", image: "image/Floating+Dragon+Megaways.webp" },
        { id: 8, name: "Mega Wheel", provider: "Pragmatic", image: "image/Princess+Suki.webp" },
        { id: 9, name: "Fruit Party", provider: "Pragmatic", image: "image/Santa+Mummy.webp" },
        { id: 10, name: "The Dog House", provider: "Pragmatic", image: "image/Treasures+of+Aztec.webp" },
        { id: 11, name: "Starburst", provider: "NetEnt", image: "image/Yakuza+Honor.webp" },
        { id: 12, name: "Gonzo's Quest", provider: "NetEnt", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 13, name: "Wolf Gold", provider: "Pragmatic", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 14, name: "Fire Joker", provider: "Play'n GO", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 15, name: "Bonanza", provider: "BTG", image: "image/1752687405755_320Volcanoes3.webp" },
        { id: 16, name: "Legacy of Dead", provider: "Play'n GO", image: "image/1752687405755_320Volcanoes3.webp" }
    ];
    let currentSlide = 0;
    const sliderContainer = document.getElementById('hero-slider');
    const indicatorsContainer = document.getElementById('slider-indicators');
    const totalSlides = banners.length;

    function initSlider() {
        if (!sliderContainer || !indicatorsContainer) return;
        
        sliderContainer.innerHTML = '';
        indicatorsContainer.innerHTML = '';

        banners.forEach((banner, index) => {
            const slide = document.createElement('div');
            slide.className = 'min-w-full h-full relative';
            slide.innerHTML = `
                <img src="${banner.image}" alt="${banner.title}" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-banda-dark via-transparent to-transparent opacity-80"></div>
                <div class="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
                    <h2 class="text-3xl md:text-5xl font-extrabold mb-2 text-white drop-shadow-lg">${banner.title}</h2>
                    <p class="text-lg md:text-xl text-gray-200 mb-4 drop-shadow-md">${banner.subtitle}</p>
                </div>
            `;
            sliderContainer.appendChild(slide);

            const dot = document.createElement('button');
            dot.className = `w-2.5 h-2.5 rounded-full transition-all ${index === 0 ? 'bg-banda-primary w-6' : 'bg-white/50'}`;
            dot.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(dot);
        });
    }

    function updateSlider() {
        if (!sliderContainer) return;
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        if (indicatorsContainer) {
            Array.from(indicatorsContainer.children).forEach((dot, index) => {
                dot.className = index === currentSlide 
                    ? 'w-6 h-2.5 rounded-full bg-banda-primary transition-all' 
                    : 'w-2.5 h-2.5 rounded-full bg-white/50 transition-all';
            });
        }
    }

    const nextSlide = () => { currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); };
    const prevSlide = () => { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSlider(); };
    const goToSlide = (idx) => { currentSlide = idx; updateSlider(); };
    document.getElementById('next-slide')?.addEventListener('click', nextSlide);
    document.getElementById('prev-slide')?.addEventListener('click', prevSlide);
    let slideInterval = setInterval(nextSlide, 5000);
    let currentGameLimit = 6;

    function renderGames(limit) {
        const grid = document.getElementById('games-grid');
        if (!grid) {
            console.error("КРИТИЧЕСКАЯ ОШИБКА: Элемент 'games-grid' не найден!");
            return;
        }
        
        grid.innerHTML = '';
        const gamesToShow = games.slice(0, limit);

        gamesToShow.forEach((game, index) => {
            const card = document.createElement('div');
            card.className = 'game-card group relative rounded-xl overflow-hidden bg-banda-card cursor-pointer border border-white/5 transition-all';
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s forwards`;

            card.innerHTML = `
                <div class="aspect-[4/3] overflow-hidden relative bg-banda-darker">
                    <img src="${game.image}" alt="${game.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                         onerror="this.src='https://placehold.co/400x300/232732/FFB800?text=BANDA+SLOT'">
                    <div class="play-overlay absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                        <button class="w-12 h-12 rounded-full bg-banda-primary text-banda-darker flex items-center justify-center mb-2 hover:scale-110 transition-transform">
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 ml-1"><path d="m7 3 14 9-14 9z"/></svg>
                        </button>
                        <span class="text-xs font-bold text-white uppercase tracking-wider">Играть</span>
                    </div>
                    <div class="absolute top-2 right-2">
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-black/70 text-white uppercase tracking-tighter">${game.provider}</span>
                    </div>
                </div>
                <div class="p-3">
                    <h3 class="font-medium text-sm truncate text-gray-200 group-hover:text-banda-primary transition-colors">${game.name}</h3>
                </div>
            `;
            grid.appendChild(card);
        });

        if (window.lucide) window.lucide.createIcons();
    }
    const loadMoreBtn = document.getElementById('load-more-games');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<div class="w-5 h-5 border-2 border-banda-primary border-t-transparent rounded-full animate-spin mx-auto"></div>';
            setTimeout(() => {
                currentGameLimit = games.length; 
                renderGames(currentGameLimit);
                this.style.display = 'none';
            }, 600);
        });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMobileBtn = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');
        document.body.classList.toggle('overflow-hidden');
    }

    mobileMenuBtn?.addEventListener('click', toggleMenu);
    closeMobileBtn?.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mobile-link').forEach(link => link.addEventListener('click', toggleMenu));
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('bg-banda-darker/95', 'shadow-2xl', 'py-2');
            header.classList.remove('py-0');
        } else {
            header.classList.remove('bg-banda-darker/95', 'shadow-2xl', 'py-2');
        }
    });
    initSlider();
    renderGames(currentGameLimit);
    if (window.lucide) window.lucide.createIcons();
});
