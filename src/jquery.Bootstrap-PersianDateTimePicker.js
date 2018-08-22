﻿/*
 * bootstrap persian date time picker jQuery Plugin
 * version : 3.0.0
 * https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
 *
 *
 * Written By Mohammad Dayyan, Mordad 1397
 * mds.soft@gmail.com - @mdssoft
 *
 * My weblog: mds-soft.persianblog.ir
 */

(function ($) {

    //#region jalali calendar

    function toJalaali(gy, gm, gd) {
        return d2j(g2d(gy, gm, gd));
    }
    function toGregorian(jy, jm, jd) {
        return d2g(j2d(jy, jm, jd));
    }
    function isValidJalaaliDate(jy, jm, jd) {
        return jy >= -61 && jy <= 3177 &&
            jm >= 1 && jm <= 12 &&
            jd >= 1 && jd <= jalaaliMonthLength(jy, jm);
    }
    function isLeapJalaaliYear(jy) {
        return jalCal(jy).leap === 0;
    }
    function jalaaliMonthLength(jy, jm) {
        if (jm <= 6) return 31;
        if (jm <= 11) return 30;
        if (isLeapJalaaliYear(jy)) return 30;
        return 29;
    }
    function jalCal(jy) {
        // Jalaali years starting the 33-year rule.
        var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178],
            bl = breaks.length,
            gy = jy + 621,
            leapJ = -14,
            jp = breaks[0],
            jm,
            jump = 1,
            leap,
            n,
            i;

        if (jy < jp || jy >= breaks[bl - 1])
            throw new Error('Invalid Jalaali year ' + jy);

        // Find the limiting years for the Jalaali year jy.
        for (i = 1; i < bl; i += 1) {
            jm = breaks[i];
            jump = jm - jp;
            if (jy < jm)
                break;
            leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
            jp = jm;
        }
        n = jy - jp;

        // Find the number of leap years from AD 621 to the beginning
        // of the current Jalaali year in the Persian calendar.
        leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
        if (mod(jump, 33) === 4 && jump - n === 4)
            leapJ += 1;

        // And the same in the Gregorian calendar (until the year gy).
        var leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

        // Determine the Gregorian date of Farvardin the 1st.
        var march = 20 + leapJ - leapG;

        // Find how many years have passed since the last leap year.
        if (jump - n < 6)
            n = n - jump + div(jump + 4, 33) * 33;
        leap = mod(mod(n + 1, 33) - 1, 4);
        if (leap === -1) leap = 4;

        return {
            leap: leap,
            gy: gy,
            march: march
        };
    }
    function j2d(jy, jm, jd) {
        var r = jalCal(jy);
        return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1;
    }
    function d2j(jdn) {
        var gy = d2g(jdn).gy, // Calculate Gregorian year (gy).
            jy = gy - 621,
            r = jalCal(jy),
            jdn1F = g2d(gy, 3, r.march),
            jd,
            jm,
            k;

        // Find number of days that passed since 1 Farvardin.
        k = jdn - jdn1F;
        if (k >= 0) {
            if (k <= 185) {
                // The first 6 months.
                jm = 1 + div(k, 31);
                jd = mod(k, 31) + 1;
                return {
                    jy: jy,
                    jm: jm,
                    jd: jd
                };
            } else {
                // The remaining months.
                k -= 186;
            }
        } else {
            // Previous Jalaali year.
            jy -= 1;
            k += 179;
            if (r.leap === 1)
                k += 1;
        }
        jm = 7 + div(k, 30);
        jd = mod(k, 30) + 1;
        return {
            jy: jy,
            jm: jm,
            jd: jd
        };
    }
    function g2d(gy, gm, gd) {
        var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
            div(153 * mod(gm + 9, 12) + 2, 5) +
            gd - 34840408;
        d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
        return d;
    }
    function d2g(jdn) {
        var j;
        j = 4 * jdn + 139361631;
        j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
        var i = div(mod(j, 1461), 4) * 5 + 308;;
        var gd = div(mod(i, 153), 5) + 1;
        var gm = mod(div(i, 153), 12) + 1;
        var gy = div(j, 1461) - 100100 + div(8 - gm, 6);
        return {
            gy: gy,
            gm: gm,
            gd: gd
        }
    }
    function div(a, b) {
        return ~~(a / b);
    }
    function mod(a, b) {
        return a - ~~(a / b) * b;
    }

    //#endregion jalali calendar

    var methods = {
        init: function (options) {
            var $this = $(this),
                settings = $.extend({
                    EnglishNumber: false,
                    Placement: 'bottom',
                    Trigger: 'click',
                    EnableTimePicker: false,
                    TargetSelector: '',
                    GroupId: '',
                    ToDate: false,
                    FromDate: false,
                    DisableBeforeToday: false,
                    Disabled: false,
                    Format: '',
                    IsGregorian: false,
                    GregorianStartDayIndex: 0,
                    InLine: false
                }, options);
            $this.data(mdPluginName, settings);
            if (isFirstTime) {
                bindEvents();
                isFirstTime = false;
            }
            return this.each(function () {
                var $this = $(this);
                $this.attr(mdDateTimePickerFlagAttributeName, '');
                $this.attr('data-trigger', settings.Trigger);
                $this.attr('data-enabletimepicker', settings.EnableTimePicker);
                $this.attr('data-mdformat', settings.Format == '' ? getDefaultFormat(settings.EnableTimePicker == 'true') : settings.Format);
                $this.attr('data-isline', settings.InLine.toString().toLowerCase());
                if (settings.TargetSelector.trim() != '')
                    $this.attr('data-targetselector', settings.TargetSelector);
                if (settings.GroupId.trim() != '')
                    $this.attr('data-groupid', settings.GroupId);
                if (settings.ToDate)
                    $this.attr('data-todate', settings.ToDate);
                if (settings.FromDate)
                    $this.attr('data-fromdate', settings.FromDate);
                if (settings.EnglishNumber)
                    $this.attr('data-englishnumber', settings.EnglishNumber);
                if (settings.DisableBeforeToday)
                    $this.attr('data-disablebeforetoday', true);
                if (settings.Disabled)
                    $this.attr('data-disabled', true);
                if (settings.IsGregorian) {
                    $this.attr('data-gregorianstartdayindex', settings.GregorianStartDayIndex);
                    $this.attr('data-isgregorian', true);
                }
                var initialDateTimeInJsonFormat;
                if (settings.IsGregorian) {
                    settings.EnglishNumber = true;
                    var selectedDateTime = parseGregorianDateTime(toEnglishNumber($this.val()));
                    initialDateTimeInJsonFormat = createDateTimeJson(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate(), selectedDateTime.getHours(), selectedDateTime.getMinutes(), selectedDateTime.getSeconds());
                } else {
                    initialDateTimeInJsonFormat = parsePersianDateTime($this.val());
                }
                var $calendarDivWrapper = settings.IsGregorian ?
                    createGregorianDateTimePickerHtml($this, initialDateTimeInJsonFormat, undefined, true) :
                    createPersianDateTimePickerHtml($this, initialDateTimeInJsonFormat, undefined, true);
                // نمایش تقویم
                if (settings.InLine) {
                    $this.append($calendarDivWrapper);
                } else {
                    $this.popover({
                        container: 'body',
                        content: $calendarDivWrapper,
                        html: true,
                        placement: settings.Placement,
                        title: 'انتخاب تاریخ',
                        trigger: 'manual',
                        template: '<div class="popover zIndexCorrected" role="tooltip"><div class="arrow"></div><h3 class="popover-title" data-name="md-datetimepicker-title" data-isgregorian="' + settings.IsGregorian + '"></h3><div class="popover-content" data-name="md-datetimepicker-popovercontent"></div></div>',
                    }).on(settings.Trigger, function () {
                        var isDisabled = $this.attr('data-disabled') != undefined && $this.attr('data-disabled').toLowerCase() == 'true',
                            isGregorian = $this.attr('data-isgregorian') != undefined && $this.attr('data-isgregorian').toLowerCase() == 'true';
                        if (isDisabled) return;
                        hideOthers($this);
                        showPopover($this);
                        updateDateTimePickerHtml(this, changeDateTimeEnum.TriggerFired, isGregorian);
                    });
                }

            });
        },
        getText: function () {

        },
        getDate: function () {

        },
        setDate: function (dateObject) {

        },
        setDatePersian: function (dateObject) {

        },
        hide: function () {

        },
        show: function () {

        },
        disable: function (isDisable) {

        }
    };

    $.fn.MdPersianDateTimePicker = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist in jquery.Bootstrap-PersianDateTimePicker');
            return false;
        }
    };

})(jQuery);