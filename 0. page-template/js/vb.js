/*
 * Переменные, которые отвечают за скрытие значков вопросика и корзинки
 * у ссылок Задать вопрос и Корзина, соответственно, в хедере страницы
 */
var body;
var bodyMinWidth;
var divAsk;
var divCart;
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
}
// <<<