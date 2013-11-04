var Compass = {
    /**
     * Initilize the theme
     */
    init: function () {
        // Trigger hover to show trigger title
        $('.triggers li').hover(
            function () {
                var title = $('a', this).data('title');

                $('.description').show().html(title);
            },
            function () {
                $('.description').hide().html('');
            }
        );

        // Trigger click
        $('.triggers li a').on('click', function () {
            var type = $(this).data('type');
        });

        // Page close
        $('.close-page').on('click', function () {
            $('.page').removeClass('show');
            $('.main').removeClass('hide');
            
            setTimeout(function () {
                $('.pages').hide();
            }, 300);
        });

        this.loader.start();

        this.arrange();

        this.preload();

        $.address.init(function(event) {
            $('a').not('[href^="http"]').address(function(e) {
                return $(this).attr('href').replace(location.pathname, '');
            });
        }).change(function(event) {
            var url = (event.value.charAt(0) === '/') ? event.value.substr(1) : event.value;

            if (url) {
                if ($('.pages[id="'+ url +'"]').length) {
                    $('#swipebox-close').trigger('click');
                    $('.pages').hide();
                    $('.pages[id="'+ url +'"]').show();
                    $('.page').addClass('show');
                    $('.main').addClass('hide');
                } else {
                    var load_page = setTimeout(function () {
                        if ($('.pages[id="'+ url +'"]').length) {
                            $('.pages[id="'+ url +'"]').show();
                            $('.page').addClass('show');
                            $('.main').addClass('hide');

                            clearInterval(load_page);
                            
                            return;
                        }
                    }, 500);
                }
            } else {
                $('#swipebox-close').trigger('click');
                $('.page').removeClass('show');
                $('.main').removeClass('hide');

                setTimeout(function () {
                    $('.pages').hide();
                }, 300);
            }
        });

        var ready = setInterval(function () {
            var error = 0;

            $('.triggers li a[data-type="page"]').each(function () {
                var url = $(this).attr('href');

                if (!$('.pages[id="'+ url +'"]').length) {
                    error += 1;
                }
            });

            if (!error) {
                $.event.trigger({
                    type: 'Compass'
                });

                clearInterval(ready);
            }
        }, 500);
    },

    /**
     * Arrange triggers
     */
    arrange: function() {
        var total = $('.triggers li').size();
        var degree = 360/total;

        if ("TransitionEvent" in window || "WebKitTransitionEvent" in window || "OTransitionEvent" in window) {

            $('.triggers li').each(function (i) {
                var animate = i+1;
                var trigger_rotate = degree*i;
                var icon_rotate = 45-trigger_rotate;

                var trigger_css = {
                    'transform': 'rotate('+ trigger_rotate +'deg) translate(0, -160px)',
                    'animation-delay': '1.'+ animate +'s'
                };

                var icon_css = {
                    'transform': 'rotate('+ icon_rotate +'deg)'
                };

                $(this).css(trigger_css);
                $(this).find('i').css(icon_css);
            });

            $('.main').addClass('animate');
        } else {
            var radius = 175;
            var angle = 0;
            var step = (2*Math.PI) / $('.triggers li').length;

            $('.triggers li').each(function (i) {
                var x = Math.round(200/2 + radius * Math.cos(angle) - $(this).width()/2);
                var y = Math.round(200/2 + radius * Math.sin(angle) - $(this).height()/2);
                
                $(this).css({
                    left: x + 'px',
                    top: y + 'px'
                });

                angle += step;
            });

            $('.triggers').css({ 'margin-left': '-100px', 'margin-top': '-150px' })
            $('.triggers li').css('opacity', '1');
        }
    },
    
    /**
     * Pre-load content
     */
    preload: function () {
        $('.triggers li a[data-type="page"]').each(function (i) {
            var pageName = $(this).attr('href'),
                     url = $(this).data('url') || pageName;
            // $.get(url, function (data) {
            //     var page = $('<div />', { 'class': 'pages', 'id': pageName }).hide().html(data);

            //     $('.page .content').append(page);
            // });
        });

        this.loader.stop();
    },

    /**
     * Loader
     * @type {Object}
     */
    loader: {
        start: function () {
            $('.loader').addClass('show');
        },
        stop: function () {
            $('.loader').removeClass('show');
        }
    }
};

// Initlize Compass
Compass.init();