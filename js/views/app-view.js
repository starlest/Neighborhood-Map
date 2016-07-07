$(function () {
    $('.toggle-nav').click(function () {
        toggleNav();
    });
});

function toggleNav() {
    if ($('.site-wrapper').hasClass('show-nav')) {
        $('.site-wrapper').css('margin-right', '0px');
        $('.site-wrapper').removeClass('show-nav');
    } else {
        $('.site-wrapper').css('margin-right', '-300px');
        $('.site-wrapper').addClass('show-nav');
    }
}
