(function ($) {
    "use strict";

    // Spinner - CHANGED: Waits for window to fully load
    $(window).on('load', function () {
        if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
        }
    });

    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav: true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Fact Counter
    $(document).ready(function () {
        $('.counter-value').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });

    // --- Region Selection Logic ---
    $(document).ready(function () {
        const regionSelectorOverlay = $('#region-selector-overlay');
        const regionDropdownToggle = $('#regionDropdownToggle');
        const cookieName = 'user_region';
        const cookieDurationDays = 30;

        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
        }

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        function updateNavbarRegionText(region) {
            let regionText = "Region";
            let iconHtml = '<i class="fas fa-globe me-1"></i> ';

            if (region === 'dubai') {
                regionText = "🇦🇪 Dubai";
            } else if (region === 'london') {
                regionText = "🇬🇧 London";
            } else if (region === 'india') {
                regionText = "🇮🇳 Mumbai";
            }
            if (regionDropdownToggle.length) {
                regionDropdownToggle.html(`${iconHtml}${regionText}`);
            }
        }

        const chosenRegion = getCookie(cookieName);

        if (chosenRegion) {
            if (regionSelectorOverlay.length) {
                regionSelectorOverlay.hide();
            }
            updateNavbarRegionText(chosenRegion);
        } else {
            if (regionSelectorOverlay.length) {
                regionSelectorOverlay.show();
            }
            updateNavbarRegionText(null);
        }

        $('.region-card').on('click', function (e) {
            const selectedRegion = $(this).data('region');
            setCookie(cookieName, selectedRegion, cookieDurationDays);
            updateNavbarRegionText(selectedRegion);
            if (regionSelectorOverlay.length) {
                regionSelectorOverlay.fadeOut();
            }
        });

        $('.region-select-link').on('click', function (e) {
            const selectedRegion = $(this).data('region');
            setCookie(cookieName, selectedRegion, cookieDurationDays);
            updateNavbarRegionText(selectedRegion);
        });

    });

})(jQuery);