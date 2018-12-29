/*
 * Переменные, которые отвечают за скрытие значков вопросика и корзинки
 * у ссылок Задать вопрос и Корзина, соответственно, в хедере страницы
 */
var body;
var bodyMinWidth;
var divAsk;
var divCart;
// <<<

/*
 *  Главный баннер
 */
var divMainBanner;
var imgMainBannerWidth;
var aMainBanner;
// <<<

/*
 *  Баннер специальных предложений
 */
var divSpec;
var divLinks;
var initLeftDivSpec;
var widthDivSpec;
// <<<

/*
 *  Авторы в рейтинге
 */
var divShelfDivAuthorsBlockAList;
var initAuthorMarginRight;
var authorsCount;
var authorWidth;
// <<<

/*
 *  Полки и отступы между книгами на них
 */
var divShelves;
var shelfMaxWidth;

var divBookSliderInAList;
var initMarginRightDivBookSliderInA;
var widthDivBookSliderInAImg;

var divBookTitleSliderInAList;
var initMarginRightDivBookTitleSliderInA;
var initWidthDivBookTitleSliderInA;

var booksCountOnShelf = 5;
// <<<

var sliderInterval = 5;
var sliderButtonTurnOn = 0;
var slidesCount = 4;
var sliderButton1;
var sliderButton2;
var sliderButton3;
var sliderButton4;

/*
 *  Вспомогательные методы
 */
function getRealSizeOfElement(element, property) {
    var propertyStr = window.getComputedStyle(element, null).getPropertyValue(property);
    property = propertyStr.substring(0, propertyStr.lastIndexOf("px")) * 1; // умножение на 1, чтобы получить число, а не строку
    return property;
}

function addCSSRule(selector, rules) {
    var sheet = document.styleSheets[0];
	if ("addRule" in sheet) {
		sheet.addRule(selector, rules);
	} else if ("insertRule" in sheet) { // для Firefox (не будет работать для псевдоэлементов ::before и ::after)
        sheet.insertRule(selector + "{" + rules + "}");
	}
}
// <<<

/*
 *  Инициализация
 */
function init() {
    var browserDetect = navigator.userAgent.toLowerCase();
    if (browserDetect.indexOf("trident") > -1) {
        divLogoV = document.querySelector("span.logo-v");   
        divLogoV.classList.add('ie');
    }
    
    sliderButton1 = document.getElementById("slider-button-1");
    sliderButton2 = document.getElementById("slider-button-2");
    sliderButton3 = document.getElementById("slider-button-3");
    sliderButton4 = document.getElementById("slider-button-4");
        
    /*
     * Блок инициализации переменных, которые отвечают за скрытие значков вопросика и корзинки
     * у ссылок Задать вопрос и Корзина, соответственно, в хедере страницы
     */
    body = document.querySelector("body");
    bodyMinWidth = getRealSizeOfElement(body, "min-width");
    divAsk = document.querySelector("div.ask");
    divCart = document.querySelector("div.cart");
    // <<<
    
    /*
     *  Главный баннер
     */
    divMainBanner = document.querySelector("div.main-banner");
    imgMainBannerWidth = getRealSizeOfElement(document.querySelector("div.slider > a > img"), "width");
    aMainBanner = document.querySelector("div.slider > a");
    // <<<
    
    /*
     *  Полки и отступы между книгами на них
     */
    divShelves = document.querySelector("div.shelves");
    shelfMaxWidth = getRealSizeOfElement(divShelves, "max-width");
    
    divBookSliderInAList = document.querySelectorAll("div.book-slider-in > a");    
    initMarginRightDivBookSliderInA = getRealSizeOfElement(divBookSliderInAList[0], "margin-right");
    
    widthDivBookSliderInAImg = getRealSizeOfElement(document.querySelector("div.book-slider-in > a > img"), "width");
    
    divBookTitleSliderInAList = document.querySelectorAll("div.book-title-slider-in > a");
    initMarginRightDivBookTitleSliderInA = getRealSizeOfElement(divBookTitleSliderInAList[0], "margin-right");    
    initWidthDivBookTitleSliderInA = getRealSizeOfElement(divBookTitleSliderInAList[0], "width");
    // <<<
    
    /*
     *  Баннер специальных предложений
     */
    divSpec = document.querySelector("div.spec");
    divLinks = document.querySelector("div.links");
    initLeftDivSpec = getRealSizeOfElement(divSpec, "left");
    widthDivSpec = getRealSizeOfElement(divSpec, "width");
    // <<<
    
    /*
     *  Авторы в рейтинге
     */
    divShelfDivAuthorsBlockAList = document.querySelectorAll("div.shelf > div.authors-block > a");
    initAuthorMarginRight = getRealSizeOfElement(divShelfDivAuthorsBlockAList[0], "margin-right");
    authorsCount = divShelfDivAuthorsBlockAList.length; // по сути это константа равная 6
    authorWidth = getRealSizeOfElement(divShelfDivAuthorsBlockAList[0], "width"); // по сути это константа равная 120px
    // <<<
    
    checkBodySize(null);
}
// <<<

/*
 *  Перемещение книг по полкам
 */
function stepDivBookSliderIn(className, direction) {
    var divBookSliderIn = document.querySelector("div.book-slider-in." + className);
    var divBookTitleSliderIn = document.querySelector("div.book-title-slider-in." + className);
    var currentTransform = window.getComputedStyle(divBookSliderIn, null).getPropertyValue("transform");
    var deltaX = 935 * direction; // 935px - место занимаемое книгами на полке - константа 
    if (currentTransform != "none") {
        deltaX += currentTransform.split(',')[4] * 1; // * 1 - из строки в число
    }
    divBookSliderIn.style.transform = "translateX(" + deltaX + "px)";
    divBookTitleSliderIn.style.transform = "translateX(" + deltaX + "px)";
}

function rightArrowAction(className) {
    var firstDivBookSliderInA = document.querySelector("div.book-slider-in." + className + " > a:first-of-type");
    var divBookSliderOut = document.querySelector("div.book-slider-out." + className);
    var firstLeft = firstDivBookSliderInA.getBoundingClientRect().left;
    var containerLeft = divBookSliderOut.getBoundingClientRect().left;
    if (firstLeft < containerLeft) {
        stepDivBookSliderIn(className, +1);
    }
}

function leftArrowAction(className) {
    var lastDivBookSliderInA = document.querySelector("div.book-slider-in." + className + " > a:last-of-type");
    var divBookSliderOut = document.querySelector("div.book-slider-out." + className);
    var lastRight = lastDivBookSliderInA.getBoundingClientRect().right;
    var containerRight = divBookSliderOut.getBoundingClientRect().right;
    if (lastRight > containerRight) {
        stepDivBookSliderIn(className, -1);
    }
}
// <<<

/*
 *  При изменении размера окна
 */
function checkBodySize(event) {
    /*
     *  При малых размерах окна убираем значки вопроса и корзинки в верхней части хедера
     */
    if (body.clientWidth < 1.5 * bodyMinWidth) {
        divAsk.classList.add('hidden');
        divCart.classList.add('hidden');
    } else {
        divAsk.classList.remove('hidden');
        divCart.classList.remove('hidden');
    }
    // <<<
    
    /*
     *  Позиционирование картинки главного баннера в области отображения главного баннера
     */
    aMainBanner.style.left = (-(imgMainBannerWidth - getRealSizeOfElement(divMainBanner, "width")) / 2) + "px";
    // <<<
    
    /*
     *  Расстановка (интервалы и количество) книг по полкам в зависимости от размера окна
     */
    if (getRealSizeOfElement(divShelves, "width") < 0.735 * shelfMaxWidth) {
        booksCountOnShelf = 3;
    } else {
        booksCountOnShelf = 5;
    }
    // периодичность расстановки обложек
    var coverPeriod = widthDivBookSliderInAImg + initMarginRightDivBookSliderInA;
    if (booksCountOnShelf === 3) {
        coverPeriod += 4.2; // поправка для 3-х книг (эмпирическое значение)
    }
    // полное измение ширины полки
    var deltaMarginRightDivBookSliderInALast = shelfMaxWidth - getRealSizeOfElement(divShelves, "width");
    // то, как полное изменение сказывается на отступах между обложками книг
    var deltaMarginRightDivBookSliderInA = -deltaMarginRightDivBookSliderInALast / (booksCountOnShelf - 1);
    var newMarginRightDivBookSliderInA = initMarginRightDivBookSliderInA + deltaMarginRightDivBookSliderInA;
    if (booksCountOnShelf === 3) {
        newMarginRightDivBookSliderInA += coverPeriod;
    }
    // то, как полное изменение сказывается на ширине подписей к книгам
    var deltaWidthDivBookTitleSliderInA = -deltaMarginRightDivBookSliderInALast / (booksCountOnShelf - 1);
    var newWidthDivBookTitleSliderInA = initWidthDivBookTitleSliderInA + deltaWidthDivBookTitleSliderInA;
    if (booksCountOnShelf === 3) {
        newWidthDivBookTitleSliderInA += coverPeriod;
    }
    if (newMarginRightDivBookSliderInA > 15) { // не прижимать обложки к друг другу ближе, чем на 15 пикселей
        for (var i = 0; i < divBookSliderInAList.length; i++) {
            if (((i + 1) % booksCountOnShelf) === 0) {
                divBookSliderInAList[i].style.marginRight = initMarginRightDivBookSliderInA + deltaMarginRightDivBookSliderInALast + "px";
            } else {
                divBookSliderInAList[i].style.marginRight = newMarginRightDivBookSliderInA + "px";
            }
        }

        for (var i = 0; i < divBookTitleSliderInAList.length; i++) {
            divBookTitleSliderInAList[i].style.width = newWidthDivBookTitleSliderInA + "px";
            //addCSSRule("div.book-title-slider-in > a::before", "width: " + newWidthDivBookTitleSliderInA + "px;");
            
            var newMarginRightDivBookTitleSliderInA = initMarginRightDivBookTitleSliderInA;
            if (((i + 1) % booksCountOnShelf) === 0) {
                newMarginRightDivBookTitleSliderInA += deltaMarginRightDivBookSliderInALast - deltaWidthDivBookTitleSliderInA;
                if (booksCountOnShelf === 3) {
                    newMarginRightDivBookTitleSliderInA -= coverPeriod;
                }
            }
            divBookTitleSliderInAList[i].style.marginRight = newMarginRightDivBookTitleSliderInA + "px";
        }
    }
    // <<<
    
    /*
     *  Баннер специальных предложений
     */
    var bodyLeft = body.getBoundingClientRect().left;
    var divShelvesLeft = divShelves.getBoundingClientRect().left;
    if (divShelvesLeft - bodyLeft < widthDivSpec) {
        divSpec.style.display = "none";
    } else {
        var divLinksMarginLeft = getRealSizeOfElement(divLinks, "margin-left");
        var leftDivSpec = getRealSizeOfElement(divSpec, "left");
        var overlayDivSpecDivShelves = divLinksMarginLeft + leftDivSpec + widthDivSpec - divShelvesLeft;
        var wishedShift = initLeftDivSpec - leftDivSpec;
        if (overlayDivSpecDivShelves < 0 && wishedShift < -overlayDivSpecDivShelves) {
            divSpec.style.left = leftDivSpec + wishedShift + "px";
        } else {
            divSpec.style.left = leftDivSpec - overlayDivSpecDivShelves + "px";
        }        
        divSpec.style.display = "block";
    }
    // <<<
    
    /*
     *  Авторы в рейтинге
     */    
    var currentShelfWidth = getRealSizeOfElement(divShelves, "width"); // текущий размер полки
    var authorsBlockLeft = getRealSizeOfElement(document.querySelector("div.shelf > div.authors-block"), "left");
    var authorsCountToShow = Math.floor((currentShelfWidth - 2 * authorsBlockLeft) / authorWidth);
    if (authorsCountToShow > authorsCount) {
        authorsCountToShow = authorsCount;
    }
    var authorMarginRight = undefined;
    authorsCountToShow++;
    do {
        authorsCountToShow--;
        authorMarginRight = (currentShelfWidth - 2 * authorsBlockLeft - authorsCountToShow * authorWidth) / (authorsCountToShow - 1);
    } while (authorMarginRight < 15);
    for (var i = 0; i < authorsCountToShow; i++) {
        divShelfDivAuthorsBlockAList[i].style.display = "inline-block";
        divShelfDivAuthorsBlockAList[i].style.marginRight = authorMarginRight + "px";
    }
    for (var i = authorsCountToShow; i < divShelfDivAuthorsBlockAList.length; i++) {
        divShelfDivAuthorsBlockAList[i].style.display = "none";
    }
    // <<<
}

window.onresize = checkBodySize; // действие по событию изменения размера окна
// <<<



/*
 *
 *
 *  Будем думать
 *
 *
 */



function changeSlide() {
    // Нельзя кидать каждый раз одно и тоже событие,
    // поэтому я каждый раз создаю его заново
    var clickEvent = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": false
    });
    
    sliderButtonTurnOn = (sliderButtonTurnOn + 1) % slidesCount;
    if (sliderButtonTurnOn === 0) {
        sliderButton1.dispatchEvent(clickEvent);
    } else if (sliderButtonTurnOn === 1) {
        sliderButton2.dispatchEvent(clickEvent);
    } else if (sliderButtonTurnOn === 2) {
        sliderButton3.dispatchEvent(clickEvent);
    } else if (sliderButtonTurnOn === 3) {
        sliderButton4.dispatchEvent(clickEvent);
    }
}