    (function ($) {
        "use strict";

        // Spinner
        var spinner = function () {
            setTimeout(function () {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 1);
        };
        spinner();


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
        //James

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

        // --- Region Selection Logic Start ---
        $(document).ready(function () {
            const regionSelectorOverlay = $('#region-selector-overlay');
            const regionDropdownToggle = $('#regionDropdownToggle');
            const cookieName = 'user_region';
            const cookieDurationDays = 30; // How long to remember the choice

            // Function to set a cookie
            function setCookie(name, value, days) {
                var expires = "";
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toUTCString();
                }
                // Ensure path=/ and SameSite=Lax for broader compatibility
                document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
            }

            // Function to get a cookie
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

            // Function to update the navbar dropdown text
            function updateNavbarRegionText(region) {
                let regionText = "Region"; // Default
                let iconHtml = '<i class="fas fa-globe me-1"></i> '; // Default icon

                if (region === 'dubai') {
                    regionText = "🇦🇪 Dubai";
                } else if (region === 'london') {
                    regionText = "🇬🇧 London";
                } else if (region === 'mumbai') {
                    regionText = "🇮🇳 Mumbai";
                }
                // Update the dropdown toggle HTML
                if (regionDropdownToggle.length) { // Check if the element exists
                    regionDropdownToggle.html(`${iconHtml}${regionText}`);
                }
            }

            // --- Initial Check on Page Load ---
            const chosenRegion = getCookie(cookieName);

            if (chosenRegion) {
                // If cookie exists, hide the overlay and update navbar
                if (regionSelectorOverlay.length) { // Check if overlay exists
                    regionSelectorOverlay.hide();
                }
                updateNavbarRegionText(chosenRegion);
                // Optional redirection logic here if needed (e.g., for path-based sites)
                // console.log("Region cookie found:", chosenRegion);
            } else {
                // If no cookie, ensure the overlay is shown
                if (regionSelectorOverlay.length) { // Check if overlay exists
                    regionSelectorOverlay.show();
                }
                // Ensure navbar shows default text
                updateNavbarRegionText(null);
            }

            // --- Event Handlers ---

            // Handle clicks on region cards in the overlay
            $('.region-card').on('click', function (e) {
                // We generally want the link's default behavior (navigation)
                // If you need to do something *before* navigating, uncomment preventDefault
                // e.preventDefault();

                const selectedRegion = $(this).data('region');
                const targetUrl = $(this).attr('href');

                // Set the cookie
                setCookie(cookieName, selectedRegion, cookieDurationDays);
                console.log("Region selected via overlay, cookie set:", selectedRegion);

                // Update navbar immediately (in case navigation is slow or SPA)
                updateNavbarRegionText(selectedRegion);

                // Hide the selector visually
                if (regionSelectorOverlay.length) {
                    regionSelectorOverlay.fadeOut();
                }

                // If you prevented default navigation, trigger it here:
                // window.location.href = targetUrl;
            });

            // Handle clicks on region links within the navbar dropdown
            $('.region-select-link').on('click', function (e) {
                // We generally want the link's default behavior (navigation)
                // If you need to do something *before* navigating, uncomment preventDefault
                // e.preventDefault();

                const selectedRegion = $(this).data('region');
                const targetUrl = $(this).attr('href');

                // Set/Update the cookie
                setCookie(cookieName, selectedRegion, cookieDurationDays);
                console.log("Region selected via dropdown, cookie updated:", selectedRegion);

                // Update navbar immediately
                updateNavbarRegionText(selectedRegion);

                // If you prevented default navigation, trigger it here:
                // window.location.href = targetUrl;
            });

        });
        // --- Region Selection Logic End ---

    })(jQuery);