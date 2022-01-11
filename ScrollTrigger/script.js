document.addEventListener('DOMContentLoaded', () => {
    const swiper = $(".swiper")[0];
    const swiperHeight = $(".swiper").height();
    const swiperHeightHalf = swiperHeight * .5;

    //swiper
    ScrollTrigger.create({
        start: "top",
        end: swiperHeight + "px",
        scrub: true,
        markers: true,
        onUpdate: ({progress}) => onUpdateSwiper(progress),
    });

    function onUpdateSwiper(progress) {
        swiper.style.transform = "translateY(" + swiperHeightHalf * progress + "px)";
    }

    //searchBar
    const searchBar = $(".search-bar")[0];
    const header = $(".header")[0];
    const title = $(".title")[0];
    ScrollTrigger.create({
        start: swiperHeightHalf + "px",
        end: $(".search-bar").offset().top + "px",
        scrub: true,
        markers: true,
        onUpdate: ({progress}) => onUpdateSearchBar(progress),
        onLeave: ({progress, direction, isActive}) => onLeave(progress, direction, isActive),
        onEnterBack: ({progress, direction, isActive}) => onEnterBack(progress, direction, isActive),
    });

    function onUpdateSearchBar(progress) {
        const regress = 1 - progress;
        searchBar.style.filter = "drop-shadow(0px 8px 18px rgba(0, 0, 0," + .12 * regress + "))";
        searchBar.style.marginLeft = 24 * regress;
        searchBar.style.marginRight = 24 * regress;
    }

    function onLeave(progress, direction, isActive) {
        console.log("onLeave", progress, direction, isActive);
        header.style.background = "rgba(255, 255, 255, 0.92)";
        header.style.backdropFilter = "blur(6px)";
        title.style.opacity = 1;
        searchBar.style.opacity = 0;
    }

    function onEnterBack(progress, direction, isActive) {
        header.style.background = "transparent";
        header.style.backdropFilter = "none";
        title.style.opacity = 0;
        searchBar.style.opacity = 1;
    }
});