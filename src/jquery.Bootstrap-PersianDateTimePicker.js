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

    //#region variabled

    var popverHtmlTemplate = `
<div class="popover zIndexCorrected" role="tooltip" data-mdpersiandatetimepicker>
    <div class="arrow"></div>
    <h3 class="popover-header" data-name="mds-datetimepicker-title"></h3>
    <div class="popover-body" data-name="mds-datetimepicker-popoverbody"></div>
</div>`;

    var dateTimePickerHtmlTemplate = `
<div class="mds-bootstrap-persian-datetime-picker-container rtl" style="min-width:100%; width: 100%; max-width:100%;">
    <table class="table table-sm table-striped text-center">
        <thead>
            <tr>
                <th colspan="100">{{selectedDate}}</th>
            </tr>
            <tr>
                <th colspan="100">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{previousYearText}}"> &lt;&lt; </button>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{previousMonthText}}"> &lt; </button>
                                </th>
                                <th colspan="3">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="mdsBootstrapPersianDatetimePickerMonthSelectorButon"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {{selectedMonthName}}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="mdsBootstrapPersianDatetimePickerMonthSelectorButon">
                                            <a class="dropdown-item">{{monthName1}}</a>
                                            <a class="dropdown-item">{{monthName2}}</a>
                                            <a class="dropdown-item">{{monthName3}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item">{{monthName4}}</a>
                                            <a class="dropdown-item">{{monthName5}}</a>
                                            <a class="dropdown-item">{{monthName6}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item">{{monthName7}}</a>
                                            <a class="dropdown-item">{{monthName8}}</a>
                                            <a class="dropdown-item">{{monthName9}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item">{{monthName10}}</a>
                                            <a class="dropdown-item">{{monthName11}}</a>
                                            <a class="dropdown-item">{{monthName12}}</a>
                                        </div>
                                    </div>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{nextMonthText}}"> &gt; </button>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{nextYearText}}"> &gt;&gt; </button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </th>
            </tr>
        </thead>
        <tbody class="days">
            {{daysHtml}}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="100">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" value="00" title="{{hourText}}" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" value="00" title="{{minuteText}}" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" value="00" title="{{secondText}}" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="100">
                    <button class="btn btn-light" title="{{goTodayText}}">{{todayDate}}</button>
                </td>
            </tr>
        </tfoot>
    </table>
</div>`;

    var previousYearTextPersian = 'سال قبل',
        previousMonthTextPersian = 'ماه قبل',
        nextYearTextPersian = 'سال بعد',
        nextMonthTextPersian = 'ماه بعد',
        hourTextPersian = 'ساعت',
        minuteTextPersian = 'دقیقه',
        secondTextPersian = 'ثانیه',
        goTodayTextPersian = 'برو به امروز',
        previousYearText = 'Previous Year',
        previousMonthText = 'Previous Month',
        nextYearText = 'Next Year',
        nextMonthText = 'Next Month',
        goTodayText = 'Go Today',
        hourText = 'Hour',
        minuteText = 'Minute',
        secondText = 'Second',
        mdPluginName = 'MdPersianDateTimePicker',
        initLoaded = false,
        shortDayNamesPersian = [
            'ش',
            'ی',
            'د',
            'س',
            'چ',
            'پ',
            'ج',
        ],
        shortDayNames = [
            'Su',
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
        ],
        monthNamesPersian = [
            'فروردین',
            'اردیبهشت',
            'خرداد',
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند'
        ],
        monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

    //#endregion

    //#region Functions

    function bindEvents() {
        // کلیک روی روزها
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="day"],[data-name="today"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DayChanged);
        });

        // عوض کردن ماه با انتخاب نام ماه از روی دراپ داون
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-monthname"]:not([disabled])', function () {
            var $this = $(this),
                selectedMonthNumber = Number($this.attr('data-monthnumber').trim());
            updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, undefined, selectedMonthNumber);
        });

        // کلیک روی دکمه ماه بعد
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-nextmonth"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseMonth);
        });

        // کلیک روی دکمه ماه قبل
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-previousmonth"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseMonth);
        });

        // عوض کردن سال با کلیک روی دراپ داون
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-yearnumber"]:not([disabled])', function () {
            var $this = $(this),
                selectedYearNumber = Number(toEnglishNumber($this.text().trim()));
            updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, undefined, undefined, selectedYearNumber);
        });

        // کلیک روی دکمه سال قبل
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-previousyear"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseYear);
        });

        // کلیک روی دکمه سال بعد
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-nextyear"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseYear);
        });

        // تغییر تقویم
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="md-persiandatetimepicker-switch"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.Switch);
        });

        // تغییر ساعت ، دقیقه و یا ثانیه
        $('.mds-bootstrap-persian-datetime-picker-container').on('change', 'input[data-name^="clock"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.ClockChanged);
        });

        // کلیک روی دکمه امروز
        $('.mds-bootstrap-persian-datetime-picker-container').on('click', '[data-name="go-today"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.GoToday);
        });
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function toPersianNumber(inputNumber1) {
        /* ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ */
        if (!inputNumber1) return '';
        var str1 = inputNumber1.toString().trim();
        if (!str1) return '';
        str1 = str1.replace(/0/img, '۰');
        str1 = str1.replace(/1/img, '۱');
        str1 = str1.replace(/2/img, '۲');
        str1 = str1.replace(/3/img, '۳');
        str1 = str1.replace(/4/img, '۴');
        str1 = str1.replace(/5/img, '۵');
        str1 = str1.replace(/6/img, '۶');
        str1 = str1.replace(/7/img, '۷');
        str1 = str1.replace(/8/img, '۸');
        str1 = str1.replace(/9/img, '۹');
        return str1;
    }

    function toEnglishNumber(inputNumber2) {
        if (!inputNumber2) return '';
        var str = inputNumber2.toString().trim();
        if (!str) return '';
        str = str.replace(/۰/img, '0');
        str = str.replace(/۱/img, '1');
        str = str.replace(/۲/img, '2');
        str = str.replace(/۳/img, '3');
        str = str.replace(/۴/img, '4');
        str = str.replace(/۵/img, '5');
        str = str.replace(/۶/img, '6');
        str = str.replace(/۷/img, '7');
        str = str.replace(/۸/img, '8');
        str = str.replace(/۹/img, '9');
        return str;
    }

    function getMonthName(monthIndex, isGregorian) {
        if (!isGregorian) return monthNamesPersian[monthIndex];
        return monthNames[monthIndex];
    }

    function hideOthers($exceptThis) {
        $('[data-mdpersiandatetimepicker]').each(function () {
            var $thisPopover = $(this);
            if (!$exceptThis && $exceptThis.is($thisPopover)) return;
            hidePopover($thisPopover);
        });
    };

    function showPopover($element) {
        if (!$element == undefined) return;
        $element.popover('show');
    };

    function hidePopover($elements) {
        //console.log(arguments.callee.caller);
        if (!$elements) return;
        $elements.each(function () {
            var $element = $(this);
            $element.popover('hide');
        });
    };

    function getDateTimePickerHtml($popoverDescriber) {
        var setting = $popoverDescriber.data(mdPluginName),
            value = $popoverDescriber.val().trim(),
            html = dateTimePickerHtmlTemplate;
        console.log(setting);
        html = html.replace(/{{previousYearText}}/img, setting.isGregorian ? previousYearText : previousYearTextPersian);
        html = html.replace(/{{previousMonthText}}/img, setting.isGregorian ? previousMonthText : previousMonthTextPersian);
        html = html.replace(/{{nextMonthText}}/img, setting.isGregorian ? nextMonthText : nextMonthTextPersian);
        html = html.replace(/{{nextYearText}}/img, setting.isGregorian ? nextYearText : nextYearTextPersian);
        html = html.replace(/{{hourText}}/img, setting.isGregorian ? hourText : hourTextPersian);
        html = html.replace(/{{minuteText}}/img, setting.isGregorian ? minuteText : minuteTextPersian);
        html = html.replace(/{{secondText}}/img, setting.isGregorian ? secondText : secondTextPersian);
        html = html.replace(/{{goTodayText}}/img, setting.isGregorian ? goTodayText : goTodayTextPersian);
        html = html.replace(/{{monthName1}}/img, getMonthName(0, setting.isGregorian));
        html = html.replace(/{{monthName2}}/img, getMonthName(1, setting.isGregorian));
        html = html.replace(/{{monthName3}}/img, getMonthName(2, setting.isGregorian));
        html = html.replace(/{{monthName4}}/img, getMonthName(3, setting.isGregorian));
        html = html.replace(/{{monthName5}}/img, getMonthName(4, setting.isGregorian));
        html = html.replace(/{{monthName6}}/img, getMonthName(5, setting.isGregorian));
        html = html.replace(/{{monthName7}}/img, getMonthName(6, setting.isGregorian));
        html = html.replace(/{{monthName8}}/img, getMonthName(7, setting.isGregorian));
        html = html.replace(/{{monthName9}}/img, getMonthName(8, setting.isGregorian));
        html = html.replace(/{{monthName10}}/img, getMonthName(9, setting.isGregorian));
        html = html.replace(/{{monthName11}}/img, getMonthName(10, setting.isGregorian));
        html = html.replace(/{{monthName12}}/img, getMonthName(11, setting.isGregorian));
        return html;
    }

    //#endregion

    var methods = {
        init: function (options) {
            var $this = $(this),
                settings = $.extend({
                    englishNumber: false,
                    placement: 'bottom',
                    trigger: 'click',
                    enableTimePicker: false,
                    targetSelector: '',
                    groupId: '',
                    toDate: false,
                    fromDate: false,
                    disableBeforeToday: false,
                    disabled: false,
                    format: '',
                    isGregorian: false,
                    gregorianStartDayIndex: 0,
                    inLine: false
                }, options);
            $this.data(mdPluginName, settings);
            if (!initLoaded) {
                bindEvents();
                initLoaded = false;
            }
            if (settings.isGregorian)
                settings.englishNumber = true;
            return this.each(function () {
                var $this = $(this),
                    calendarHtml = getDateTimePickerHtml($this);
                // نمایش تقویم
                if (settings.inLine) {
                    $this.append(calendarHtml);
                } else {
                    $this.popover({
                        container: 'body',
                        content: calendarHtml,
                        html: true,
                        placement: settings.placement,
                        title: 'انتخاب تاریخ',
                        trigger: 'manual',
                        template: popverHtmlTemplate,
                    }).on(settings.trigger, function () {
                        var isDisabled = $this.data(mdPluginName).disabled == true,
                            isGregorian = $this.data(mdPluginName).isGregorian == true;
                        if (isDisabled) return;
                        hideOthers($this);
                        showPopover($this);
                        //updateDateTimePickerHtml(this, changeDateTimeEnum.TriggerFired, isGregorian);
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