if (!jQuery) throw new Error("requires jQuery");

function numToHex(num) {
    var hex = num.toString(16);
    return 1 === hex.length ? "0" + hex : hex;
}

function getColor(red, green, blue) {
    return "#" + numToHex(red) + numToHex(green) + numToHex(blue);
}

function showHideColorPicker() {
    jQuery(".color-picker-toggle").each(function() {
        var colorPicker = getColorPicker(jQuery(this));
        var c = jQuery.Event("hide.vbcolorpicker");
        var c = colorPicker.hasClass("open") ? (colorPicker.trigger(c), c.isDefaultPrevented() ? true : (colorPicker.removeClass("open").trigger("hidden.vbcolorpicker"), void 0)) : true;
        return c;
    });
}

function getColorPicker(colorPickerInner) {
    return colorPickerInner.closest(".color-picker");
}

ColorPicker = function(colorPicker, options) {
    this.options = jQuery.extend(
        {},
        jQuery.fn.vbcolorpicker.defaults, 
        options
    );
    this.$element = jQuery(colorPicker);
    this.initPopover();
};

ColorPicker.prototype = {
    constructor: ColorPicker,
    initPalette: function() {
        var canvas, context2D, c;
        canvas = this.$element.find("canvas");
        context2D = canvas[0].getContext("2d");
        gradient = context2D.createLinearGradient(0, 0, canvas.width(), 0);
        gradient.addColorStop(0, "rgb(255, 255, 255)");
        gradient.addColorStop(.1, "rgb(255,   0,   0)");
        gradient.addColorStop(.25, "rgb(255,   0, 255)");
        gradient.addColorStop(.4, "rgb(0,     0, 255)");
        gradient.addColorStop(.55, "rgb(0,   255, 255)");
        gradient.addColorStop(.7, "rgb(0,   255,   0)");
        gradient.addColorStop(.85, "rgb(255, 255,   0)");
        gradient.addColorStop(1, "rgb(255,   0,   0)");
        context2D.fillStyle = gradient;
        
        context2D.fillRect(0, 0, context2D.canvas.width, context2D.canvas.height);
        gradient = context2D.createLinearGradient(0, 0, 0, canvas.height());
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(.5, "rgba(0,     0,   0, 0)");
        gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
        context2D.fillStyle = gradient;
        
        context2D.fillRect(0, 0, context2D.canvas.width, context2D.canvas.height);
    },
    initPopover: function() {
        this.$element.on("click.vbcolorpicker.data-api touchstart.vbcolorpicker.data-api", ".color-picker-toggle", ColorPicker.prototype.toggle)
                     .on("mousedown.vbcolorpicker.data-api", "canvas", ColorPicker.prototype.mouseDown)
                     .on("click.vbcolorpicker.data-api touchstart.vbcolorpicker.data-api", ".color-picker-popover", function() { return false });
        this.initPalette();
        this.$element.val(this.options.color);
    },
    updateVal: function(x, y) {
        var canvas, context2D, deltaX, deltaY, step, imageData, color;
        step = 5;
        canvas = this.$element.find("canvas");
        context2D = canvas[0].getContext("2d");
        deltaX = x - canvas.offset().left;
        deltaY = y - canvas.offset().top;
        deltaX = Math.round(deltaX / step) * step;
        deltaY = Math.round(deltaY / step) * step;
        0 > deltaX && (deltaX = 0);
        deltaX >= canvas.width() && (deltaX = canvas.width() - 1);
        0 > deltaY && (deltaY = 0);
        deltaY > canvas.height() && (deltaY = canvas.height());
        imageData = context2D.getImageData(deltaX, deltaY, 1, 1);
        color = getColor(imageData.data[0], imageData.data[1], imageData.data[2]);
        color !== this.$element.val() && (this.$element.val(color), this.$element.trigger("change.vbcolorpicker"));
    },
    mouseDown: function() {
        var colorPickerInner = jQuery(this);
        var colorPicker = getColorPicker(colorPickerInner);
        jQuery(document).on("mousemove.vbcolorpicker.data-api", {colorpicker: colorPicker}, ColorPicker.prototype.mouseMove)
                        .one("mouseup.vbcolorpicker.data-api", {colorpicker: colorPicker}, ColorPicker.prototype.mouseUp)
    },
    mouseMove: function(event) {
        var colorPicker;
        colorPicker = event.data.colorpicker;
        colorPicker.data("vbcolorpicker").updateVal(event.pageX, event.pageY)
    },
    mouseUp: function(event) {
        var colorPicker = event.data.colorpicker;
        colorPicker.data("vbcolorpicker").updateVal(event.pageX, event.pageY);
        jQuery(document).off("mousemove.vbcolorpicker.data-api");
        colorPicker.data("vbcolorpicker").options.close === true && showHideColorPicker();
    },
    toggle: function(event) {
        var colorPickerInner, colorPicker, isOpen;
        if (colorPickerInner = jQuery(this), colorPicker = getColorPicker(colorPickerInner), colorPicker.is(".disabled") || void 0 !== colorPicker.attr("disabled")) {
            return true;
        }
        if (isOpen = colorPicker.hasClass("open"), showHideColorPicker(), !isOpen) {
            if (colorPicker.trigger(event = jQuery.Event("show.vbcolorpicker")), event.isDefaultPrevented()) {
                return true;
            }
            colorPicker.toggleClass("open").trigger("shown.vbcolorpicker");
            colorPickerInner.focus();
        }
        return false;
    }
};

jQuery.fn.vbcolorpicker = function(options) {
    return this.each(function() {
        var colorPicker = jQuery(this);
        colorPicker.data("vbcolorpicker", new ColorPicker(this, options));
    })
};

jQuery.valHooks.div = {
    get: function(colorPicker) {
        return jQuery(colorPicker).find('input[type="hidden"]').val();
    },
    set: function(colorPicker, color) {
        jQuery(colorPicker).find(".color-picker-icon").css("background-color", color);
        jQuery(colorPicker).find('input[type="hidden"]').val(color);
    }
};

jQuery(document).ready(function() {
    jQuery(".color-picker").each(function() {
        var colorPicker = jQuery(this);
        colorPicker.vbcolorpicker(colorPicker.data());
    })
});

jQuery(document).on("click.vbcolorpicker.data-api", showHideColorPicker);