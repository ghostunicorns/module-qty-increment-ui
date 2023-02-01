define([
    'uiComponent',
    'jquery'
], function (Component, $) {
    'use strict';

    const increment = function ($inputElement) {
        let currentVal = parseFloat($inputElement.val()),
            maxQty = parseFloat($inputElement.attr('max')),
            incrementQty = parseFloat($inputElement.attr('step')),
            newVal = ((currentVal + incrementQty) > maxQty) ? maxQty : (currentVal + incrementQty);
        newVal = newVal - (newVal % incrementQty);
        newVal = Math.min(newVal, maxQty);

        $inputElement.val(parseFloat(newVal));
    };

    const decrement = function ($inputElement) {
        let currentVal = parseFloat($inputElement.val()),
            minQty = parseFloat($inputElement.attr('min')),
            incrementQty = parseFloat($inputElement.attr('step')),
            newVal = ((currentVal - incrementQty) < minQty) ? minQty : (currentVal - incrementQty);
        newVal = newVal - (newVal % incrementQty);
        newVal = Math.max(newVal, minQty);

        $inputElement.val(parseFloat(newVal));
    };

    const adjust = function ($inputElement) {
        let currentVal = parseFloat($inputElement.val()),
            newVal = currentVal,
            incrementQty = parseFloat($inputElement.attr('step')),
            diff = (currentVal % incrementQty);

        if (diff > 0) {
            newVal = currentVal - diff;
        }
        $inputElement.val(parseFloat(newVal));
    };

    const updateStateIncrement = function ($inputElement, $element) {
        let currentVal = parseFloat($inputElement.val()),
            maxQty = parseFloat($inputElement.attr('max'));

        if (currentVal === maxQty) {
            $element.addClass('disabled');
        } else {
            $element.removeClass('disabled');
        }
    };

    const updateStateDecrement = function ($inputElement, $element) {
        let currentVal = parseFloat($inputElement.val()),
            minQty = parseFloat($inputElement.attr('min'));

        if (currentVal === minQty) {
            $element.addClass('disabled');
        } else {
            $element.removeClass('disabled');
        }
    };

    return Component.extend({
        initialize: function (config, target) {
            this._super();
            let $input = $(target).find(config.inputSelector),
                $increment = $(target).find(config.incrementSelector),
                $decrement = $(target).find(config.decrementSelector);

            $increment.click(function () {
                increment($input);
                updateStateIncrement($input, $increment);
                updateStateDecrement($input, $decrement);
                $input.trigger("change");
            });
            $decrement.click(function () {
                decrement($input);
                updateStateIncrement($input, $increment);
                updateStateDecrement($input, $decrement);
                $input.trigger("change");
            });
            $input.blur(function () {
                adjust($input);
                updateStateIncrement($input, $increment);
                updateStateDecrement($input, $decrement);
                $input.trigger("change");
            });

            updateStateIncrement($input, $increment);
            updateStateDecrement($input, $decrement);
            $input.trigger("change");
        }
    });

});
