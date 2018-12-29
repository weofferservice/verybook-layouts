var minWindowWidth = parseInt($('.search-results .left-column').css('margin-left')) +
                     parseInt($('.search-results .left-column').css('min-width')) +
                     parseInt($('.search-results .left-column').css('margin-right')) +
                     parseInt($('.search-results .right-column').css('margin-left')) +
                     parseInt($('.search-results .right-column').css('min-width')) +
                     parseInt($('.search-results .right-column').css('margin-right'));

var bannerColumn = $('.search-results .column').filter(columnFilter);

var resizer = function() {    
    if ($(window).width() < minWindowWidth) {
        bannerColumn.hide();
    } else {
        bannerColumn.show();
    }
}

$(document).ready(resizer);
$(window).resize(resizer);
