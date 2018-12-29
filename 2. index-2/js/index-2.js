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
 *  Текстовый баннер
 */
var pQuotes;
var initPQuotesTop;
var initPQuotesHeight;

var divSlogan;
var initDivSloganHeight;
var initDivSloganMarginTop;

var divBorderTops;
var divBorderBottoms;
var initTopDivBorderTops;
var initTopDivBorderBottoms;

var divSliderButtons;
var initDivSliderButtonsMarginTop;
var initShiftSliderButtons;
// <<<

/*
 *  Вкладки шагов
 */
var imgStep2;
var imgStep3;
var labelStep2;
var labelStep3;
var imgStep2Width;
var imgStep3Width;
var pStep2;
var pStep3;
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
     *  Текстовый баннер
     */
    pQuotes = document.querySelector("p.quotes");
    initPQuotesTop = getRealSizeOfElement(pQuotes, "top");
    initPQuotesHeight = getRealSizeOfElement(pQuotes, "height");
    
    divSlogan = document.querySelector("div.slogan");
    initDivSloganHeight = getRealSizeOfElement(divSlogan, "height");
    initDivSloganMarginTop = getRealSizeOfElement(divSlogan, "margin-top");
    
    divBorderTops = document.querySelectorAll("div.border.border-top");
    divBorderBottoms = document.querySelectorAll("div.border.border-bottom");
    initTopDivBorderTops = getRealSizeOfElement(divBorderTops[0], "top");
    initTopDivBorderBottoms = getRealSizeOfElement(divBorderBottoms[0], "top");
    
    divSliderButtons = document.querySelector("div.slider-buttons");
    initDivSliderButtonsMarginTop = getRealSizeOfElement(divSliderButtons, "margin-top");
    initShiftSliderButtons = initDivSloganMarginTop + initDivSloganHeight + initDivSliderButtonsMarginTop - initPQuotesTop - initPQuotesHeight;
    // <<<
    
    /*
     *  Вкладки шагов
     */
    imgStep2 = document.querySelector("div.help-slide-marks > label[for='help-slide-2'] > img");
    imgStep3 = document.querySelector("div.help-slide-marks > label[for='help-slide-3'] > img");
    pStep2 = document.querySelector("div.help-slide-marks > label[for='help-slide-2'] > p");
    pStep3 = document.querySelector("div.help-slide-marks > label[for='help-slide-3'] > p");
    imgStep2Width = getRealSizeOfElement(imgStep2, "width");
    imgStep3Width = getRealSizeOfElement(imgStep3, "width");
    labelStep2 = document.querySelector("div.help-slide-marks > label[for='help-slide-2']");
    labelStep3 = document.querySelector("div.help-slide-marks > label[for='help-slide-3']");
    // <<<
    
    checkBodySize(null);
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
     *  Текстовый баннер
     */
    deltaDivSloganHeight = getRealSizeOfElement(divSlogan, "height") - initDivSloganHeight;
    deltaPQuotesHeight = getRealSizeOfElement(pQuotes, "height") - initPQuotesHeight;
    
    pQuotes.style.top = deltaDivSloganHeight + initPQuotesTop - deltaPQuotesHeight / 2 + "px";
    for (var i = 0; i < divBorderTops.length; i++) {
        divBorderTops[i].style.top = initTopDivBorderTops + deltaDivSloganHeight + "px";
    }
    for (var i = 0; i < divBorderBottoms.length; i++) {
        divBorderBottoms[i].style.top = initTopDivBorderBottoms + deltaDivSloganHeight + "px";
    }
    
    var shiftSloganBanner = pQuotes.getBoundingClientRect().top - divSlogan.getBoundingClientRect().bottom;
    var MIN_SHIFT = 20;
    if (shiftSloganBanner < MIN_SHIFT) {
        var deltaShift = MIN_SHIFT - shiftSloganBanner;
        
        pQuotes.style.top = deltaShift + deltaDivSloganHeight + initPQuotesTop - deltaPQuotesHeight / 2 + "px";
        for (var i = 0; i < divBorderTops.length; i++) {
            divBorderTops[i].style.top = deltaShift + initTopDivBorderTops + deltaDivSloganHeight + "px";
        }
        for (var i = 0; i < divBorderBottoms.length; i++) {
            divBorderBottoms[i].style.top = deltaShift + initTopDivBorderBottoms + deltaDivSloganHeight + "px";
        }
    }
    
    var divSliderButtonsMarginTop = initShiftSliderButtons - initDivSloganMarginTop - getRealSizeOfElement(divSlogan, "height") + getRealSizeOfElement(pQuotes, "top") + getRealSizeOfElement(pQuotes, "height");
    divSliderButtons.style.marginTop = divSliderButtonsMarginTop + "px";
    // <<<
    
    /*
     *  Вкладки шагов
     */
    var imgStep2Right = getRealSizeOfElement(imgStep2, "left") + imgStep2Width + labelStep2.getBoundingClientRect().left;
    if (imgStep2Right > pStep2.getBoundingClientRect().left) {
        imgStep2.style.display = "none";
    } else {
        imgStep2.style.display = "block";
    }
    var imgStep3Right = getRealSizeOfElement(imgStep3, "left") + imgStep3Width + labelStep3.getBoundingClientRect().left;
    if (imgStep3Right > pStep3.getBoundingClientRect().left) {
        imgStep3.style.display = "none";
    } else {
        imgStep3.style.display = "block";
    }
    // <<<
}

window.onresize = checkBodySize; // действие по событию изменения размера окна
// <<<