window.addEventListener('DOMContentLoaded', function () {

    // Вспомогательная функция выбора селектора

    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    // Вспомогательная функция слушателя события

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    //Простой слушатель события при прокрутке

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    // ==========================================

    const openMenu = select('.open');
    const closeMenu = select('.close');
    const nav = select('.header-nav');
    const body = select('body');


    openMenu.addEventListener('click', () => {
        nav.classList.add('active');
        body.classList.add('lock');
    })
    closeMenu.addEventListener('click', () => {
        nav.classList.remove('active');
        body.classList.remove('lock');
    })

    // Переключение header-scrolled в header при прокрутке страницы на 100px

    let selectHeader = select('#header');
    
    function headerScrolled() {
        if (window.scrollY > 100) {
            selectHeader.classList.add('header-scrolled')
        } else {
            selectHeader.classList.remove('header-scrolled')
        }
    }

    document.addEventListener('scroll', headerScrolled);


    // if (selectHeader) {
    //     const headerScrolled = () => {
    //         if (window.scrollY > 100) {
    //             selectHeader.classList.add('header-scrolled')
    //         } else {
    //             selectHeader.classList.remove('header-scrolled')
    //         }
    //     }
    //     window.addEventListener('load', headerScrolled);
    //     onscroll(document, headerScrolled);
    // }

    // ==========================================

    // Прокрутка до элемента со смещением заголовка

    const scrollto = (el) => {
        const header = select('#header');
        const offset = header.offsetHeight;
        const elementPos = select(el).offsetTop;

        console.log(offset);
        
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })

        window.addEventListener('load', scrollto);
    }

    // ==========================================

    // Прокрутка вверх на ккнопку

    const backtotop = select('.back-to-top');

    if (backtotop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 400) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
            }
        }
        window.addEventListener('load', toggleBackToTop);
        onscroll(document, toggleBackToTop);
    }

    // ==========================================

    // Прелоадер 

    const preloader = select('#preloader');

    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    // ==========================================

    // Swiper.js

    const swiper = new Swiper(".swiper-container", {
        // Количество слайдов на экране
        slidesPerView: 'auto',
        // Центрирование
        centeredSlides: true,
        // Отступ между слайдами
        spaceBetween: 0,
        // Бесконечная прокрутка
        loop: true,
        // Автопрокрутка
        autoplay: {
            delay: 5000,
        },
        speed: 700,
        // Навигация
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // ==========================================

    // Typed.js

    const typed = select('.typed'); // контейнер
    if (typed) {
        // строка с атрибутом data-typed-items
        let typed_strings = typed.getAttribute('data-typed-items');
        // разбиваем эту строку на массив из слов
        typed_strings = typed_strings.split(',');
        // инициализация библиотеки
        new Typed('.typed', {
            strings: typed_strings, // наш массив
            loop: true, // повтор бесконечно
            typeSpeed: 100, // скорость печати символа
            backSpeed: 50, // скорость удаления символа
            backDelay: 3000 // задержка до удаления
        });
    }

});