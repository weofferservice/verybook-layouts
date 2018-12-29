var coversOut = null;
var coversIn = null;
var titlesIn = null;
var leftArrow = null;
var rightArrow = null;

$(document).ready(function() {
    coversOut = $('.shelf').find('.book-slider-out');
    coversIn = coversOut.find('.book-slider-in');
    titlesIn = $('.shelf').find('.book-title-slider-out').find('.book-title-slider-in');
    
    leftArrow = $('.shelf-part.arrow.left-arrow');
    rightArrow = $('.shelf-part.arrow.right-arrow');
    
    leftArrow.click(function() {
        shelfShift(true);
    });
    rightArrow.click(function() {
        shelfShift(false);
    });
});

/**
 *  1. Расчет в процентах позволяет не беспокоиться о том, что юзер будет менять размеры окна браузера.
 *  2. Поставил стоперы if (leftPercent >= -100), чтобы нельзя было мотать полку сверх меры.
 *  3. После включения transient, т.е. плавной промотки полки, пришлось поставить проверку if (leftPercent % 100 === 0) на то, что предыдущая промотка завершена и можно снова ниживать на стрелочки.
 */
function shelfShift(isLeftArrow) {
    if (coversOut && coversIn && titlesIn) {
        var shelfWidth = coversOut.width();
        var leftPx = parseInt(coversIn.css('left'));
        var leftPercent = 100 * leftPx / shelfWidth;
        if (leftPercent % 100 === 0) {
            if (isLeftArrow) {
                if (leftPercent >= -100) {
                    coversIn.css('left', (leftPercent - 100) + "%");
                    titlesIn.css('left', (leftPercent - 100) + "%");
                }
            } else {
                if (leftPercent <= -100) {
                    coversIn.css('left', (leftPercent + 100) + "%");
                    titlesIn.css('left', (leftPercent + 100) + "%");
                }
            }
        }
    }
}