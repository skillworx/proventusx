$(window).on('load', function () {
    // Please run it with window.onload, not with document.ready
    initSmoothScrolling('.blocks', 'smoothscroll');
});

function initSmoothScrolling(container, animation) {
    /*
       * @param {String} container Class or ID of the animation container
       * @param {String} animation Name of the animation, e.g. smoothscroll
       */
    var sliderWidth = 0;
    var animationWidth = 0;
    var sliderHeight = $('>div>div:first-of-type', container).outerHeight(false);

    $('>div>div', container).each(function () {
        animationWidth += $(this).outerWidth(false);
    });

    // detect number of visible slides
    var slidesVisible = $(container).width() / $('>div>div:first-of-type', container).outerWidth(false);
    slidesVisible = Math.ceil(slidesVisible);

    // count slides to determine animation speed
    var slidesNumber = $('>div>div', container).length;
    var speed = slidesNumber * 5;

    // append the tail
    $('>div>div', container).slice(0, slidesVisible).clone().appendTo($('>div', container));

    // Detect the slider width with appended tail
    $('>div>div', container).each(function () {
        sliderWidth += $(this).outerWidth(false);
    });

    // set slider dimensions
    $('>div', container).css({ 'width': sliderWidth, 'height': sliderHeight });

    // Insert styles to html
    $("<style type='text/css'>@keyframes " + animation + " { 0% { margin-left: 0px; } 100% { margin-left: -" + animationWidth + "px; } } " + $('>div>div:first-of-type', container).selector + " { -webkit-animation: " + animation + " " + speed + "s linear infinite; -moz-animation: " + animation + " " + speed + "s linear infinite; -ms-animation: " + animation + " " + speed + "s linear infinite; -o-animation: " + animation + " " + speed + "s linear infinite; animation: " + animation + " " + speed + "s linear infinite; }</style>").appendTo("head");

    // restart the animation (e.g. for safari & ie)
    var cl = $(container).attr("class");
    $(container).removeClass(cl).animate({ 'nothing': null }, 1, function () {
        $(this).addClass(cl);
    });
}


//Google analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-227919305-1');

$(document).ready(function () {
    $("#logo").hover(
        function () {
            $(this).attr("src", "./assets/img/I-O.gif");
        },
        function () {
            $(this).attr("src", "./assets/img/companyLogo.png");
        }
    );
});


//show hide company logo
var initialSrc;
var scrollSrc;

$(window).scroll(function () {
    var value = $(this).scrollTop();
    if (value > 100)
        $(".logo").attr("src", scrollSrc);
    else
        $(".logo").attr("src", initialSrc);
});

window.onscroll = checkNavClassNameHeaderType;
window.onload = checkNavClassNameHeaderType;

function checkNavClassNameHeaderType() {
    if (document.getElementsByTagName("html")[0].scrollTop > 0) {
        $("nav").addClass("nonTopNav");
    } else {
        $("nav").removeClass("nonTopNav");;
    }
}
//mobile button
$("nav button.menuButton").on("click", function () {
    $("body").toggleClass("activeNavLinks");
});

// Scroll Link Functionality
$(".scrollLink").on("click", function () {
    $("body").removeClass("activeNavLinks");
    var scrollTo = this.getAttribute("scrolllink");
    if (window.innerWidth <= 500) {
        $('html, body').animate({ scrollTop: $(scrollTo).offset().top - 65 }, 600, 'easeInOutExpo');
    } else {
        $('html, body').animate({ scrollTop: $(scrollTo).offset().top - 50 }, 600, 'easeInOutExpo');
    }
});

//typewriter effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = "";
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 110;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 20;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    new TypeWriter(txtElement, words, wait);
}

$(document).ready(function () {

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $('.arrow').addClass('fade');
        } else {
            $('.arrow').removeClass('fade');
        }
    })
});
