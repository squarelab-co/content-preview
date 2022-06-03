document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.parallax').addEventListener('scroll', function() {
        console.log(this.scrollTop);
        console.log($(".search-bar").offset().top);
        console.log("----------");
    });


    ScrollTrigger.create({
        trigger: "body",
        start: "100px",
        end: "200px",
        scrub: true,
        markers: true,
        onUpdate: ({progress}) => onUpdateSearchBar(progress),
        onLeave: ({progress, direction, isActive}) => onLeave(progress, direction, isActive),
        onEnterBack: ({progress, direction, isActive}) => onEnterBack(progress, direction, isActive),
    });

    function onUpdateSearchBar(progress) {

    }

    function onLeave(progress, direction, isActive) {

    }

    function onEnterBack(progress, direction, isActive) {

    }
});