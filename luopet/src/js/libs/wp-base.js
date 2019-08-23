/***
 * FUNCTIONS
 ***/
// Check mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var App = {
    SetToggle: function() {
        $('[data-component="toggle"]').each(function(index, el) {
            $(el).click(function(event) {
                event.preventDefault();
                type   = $(this).data('type');
                target = $(this).data('target');
                if (type == 'menu') {
                    $('body').toggleClass('_toggled');
                } else {
                    $(target).toggleClass('_hide');
                }
            });
        });
    },
    SetGaleria: function() {
        // Galeria
        $('[data-component=galeria]').each(function(index, el) {
            $(el).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                  enabled:true
                }
            });
        });

    },
    SetBanner: function() {
        // owl carousel
        $('[data-component=banner]').each(function(index, el) {
            $(this).addClass('owl-carousel');
            $(this).owlCarousel({
                loop            : true,
                items           : 1,
                autoplay        : true,
                autoplayTimeout : $(this).data("autoplay-timeout"),
                nav             : $(this).data("nav"),
                animateOut      : 'fadeOut',
                navText         : ['<i class="icon-left"></i>', '<i class="icon-right"></i>'],
                dots            : true,
            });
        });
    },
    SetCarouselMobile: function() {
        $('[data-component=carousel-mobile]').each(function(index, el) {
            $(document).ready(function() {
                if ( $(window).width() <= 768 ) {
                    startCarousel();
                } else {
                    stopCarousel();
                }
            });

            $(window).resize(function() {
                if ( $(window).width() <= 768 ) {
                    startCarousel();
                } else {
                    stopCarousel();
                }
            });

            function startCarousel(){
                $('[data-component=carousel-mobile]').addClass('owl-carousel');

                $('[data-component=carousel-mobile]').owlCarousel({
                    loop        : true,
                    autoplay    : true,
                    nav         : false,
                    dots        : false,
                    responsive  : {0:{items : 1},500:{items : $('[data-component=carousel-mobile]').data("items")}},
                });
            }
            function stopCarousel() {
                $('[data-component=carousel-mobile]').trigger('destroy.owl.carousel');
                $('[data-component=carousel-mobile]').removeClass('owl-carousel');
            }
        });
    },
    SetHeaderFixed: function($top) {
        $('[data-component=fixed]').each(function(index, el) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > $top) {
                    $('[data-component=fixed]').addClass('_fixed');
                } else {
                    $('[data-component=fixed]').removeClass('_fixed');
                }
            }); 
        }); 
    },
    SetimagesLoaded: function() {
        // imagesLoaded
        $('body').imagesLoaded().always( function( instance ) {
            $('body').addClass('loaded');
        });
    },
    SetAnimatescroll: function($padding) {

        // Scroll
        $('.scroll').on('click', function(event) {
            var data   = $(this).data('target');
            var href   = $(this).attr('href');
            var target = (data !== undefined) ? data : href;

            $(target).animatescroll({
                scrollSpeed: 800,
                easing: 'easeOutExpo',
                padding: $padding,
            });
        });

        $('body').scrollspy({
            target: '.Header nav',
            offset: $padding
        });
    },
    SetMaskInput: function() {
        // remove autocomplete
        $('form').attr('autocomplete', 'off').attr('autosuggest', 'off');

        // Input masks
        $("input.cpf").mask("999.999.999-99");
        $("input.cnpj").mask("99.999.999/9999-99");
        $("input.data").mask("99/99/9999");
        $("input.cep").mask("99999-999");
        $("input.hora").mask("99:99");
        $("input.telefone").focusout(function(){
            var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
            if(phone.length > 10) {
                element.mask("(99) 99999-999?9");
            } else {
                element.mask("(99) 9999-9999?9");
            }
        }).trigger('focusout');
    },
    SetInputError: function() {
        // Add error input
        $('._error li').each(function(item) {
            var item = $(this).attr('class');
            var element = document.getElementsByName(item)[0];
            
            element.classList.add("_error");
        });

        $('.modal').click('.modal-close', function(event) {
            $('.modal').hide();
            $('html').removeClass('_no-scroll');
        });
    },
    SetFormSuccess: function() {
        // Add class _success Form
        var $get_success = window.location.search.substring(1);

        if ($get_success == 'success=1') {
            $('.Form').addClass('_success');
            $('html').addClass('_no-scroll');

            // Landing page
            $('.Landing_page .download').toggleClass('_hide');
        }
    },
    SetWow: function($offset) {
        new WOW({
            offset: $offset
        }).init();
    },
};

$.gmap3(false);