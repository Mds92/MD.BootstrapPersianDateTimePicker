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

    var mdDatePickerFlag = 'data-mdpersiandatetimepicker',
        mdDatePickerFlagSelector = '[' + mdDatePickerFlag + ']',
        mdDatePickerPopoverFlag = 'data-mdpersiandatetimepicker-popover',
        mdDatePickerPopoverSelector = '[' + mdDatePickerPopoverFlag + ']',
        mdDatePickerContainerFlag = 'data-mdpersiandatetimepicker-container',
        mdDatePickerContainerSelector = '[' + mdDatePickerContainerFlag + ']',
        mdPluginName = 'MdPersianDateTimePicker',
        triggerStart = false;

    var popverHtmlTemplate = `
<div class="popover mds-bootstrap-persian-datetime-picker-popover" role="tooltip" ${mdDatePickerPopoverFlag}>
    <div class="arrow"></div>
    <h3 class="popover-header text-center" data-name="mds-datetimepicker-title"></h3>
    <div class="popover-body p-0" data-name="mds-datetimepicker-popoverbody"></div>
</div>`;

    var dateTimePickerHtmlTemplate = `
<div class="mds-bootstrap-persian-datetime-picker-container {{rtlCssClass}}" ${mdDatePickerContainerFlag}>
    <div class="select-year-box w-0">
        <div class="container-fluid">
            <div class="row">
                {{yearsToSelectHtml}}
            </div>
        </div>
    </div>
    <table class="table table-sm table-striped text-center p-0 m-0">
        <thead>
            <tr class="{{selectedDateStringCssClass}}">
                <th colspan="100" data-selecteddatestring>{{selectedDateString}}</th>
            </tr>
            <tr>
                <th colspan="100">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{previousYearText}}" data-change-year="-1" {{previousYearButtonAttribute}}> &lt;&lt; </button>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{previousMonthText}}" data-change-month="-1" {{previousMonthButtonAttribute}}> &lt; </button>
                                </th>
                                <th style="width: 120px;">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm dropdown-toggle" type="button" id="mdsBootstrapPersianDatetimePickerMonthSelectorButon"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" {{selectMonthButtonAttribute}}>
                                            {{selectedMonthName}}
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="mdsBootstrapPersianDatetimePickerMonthSelectorButon">
                                            <a class="dropdown-item" data-dropdown-month="1">{{monthName1}}</a>
                                            <a class="dropdown-item" data-dropdown-month="2">{{monthName2}}</a>
                                            <a class="dropdown-item" data-dropdown-month="3">{{monthName3}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" data-dropdown-month="4">{{monthName4}}</a>
                                            <a class="dropdown-item" data-dropdown-month="5">{{monthName5}}</a>
                                            <a class="dropdown-item" data-dropdown-month="6">{{monthName6}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" data-dropdown-month="7">{{monthName7}}</a>
                                            <a class="dropdown-item" data-dropdown-month="8">{{monthName8}}</a>
                                            <a class="dropdown-item" data-dropdown-month="9">{{monthName9}}</a>
                                            <div class="dropdown-divider"></div>
                                            <a class="dropdown-item" data-dropdown-month="10">{{monthName10}}</a>
                                            <a class="dropdown-item" data-dropdown-month="11">{{monthName11}}</a>
                                            <a class="dropdown-item" data-dropdown-month="12">{{monthName12}}</a>
                                        </div>
                                    </div>
                                </th>
                                <th style="width: 50px;">
                                    <button class="btn btn-light btn-sm" select-year-button {{selectYearButtonAttribute}}>{{selectedYear}}</button>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{nextMonthText}}" data-change-month="1" {{nextMonthButtonAttribute}}> &gt; </button>
                                </th>
                                <th>
                                    <button class="btn btn-light btn-sm" title="{{nextYearText}}" data-change-year="1" {{nextYearButtonAttribute}}> &gt;&gt; </button>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </th>
            </tr>
        </thead>
        <tbody class="days">
            <tr>
                <td class="{{weekDayShortName1CssClass}}">{{weekDayShortName1}}</td>
                <td>{{weekDayShortName2}}</td>
                <td>{{weekDayShortName3}}</td>
                <td>{{weekDayShortName4}}</td>
                <td>{{weekDayShortName5}}</td>
                <td>{{weekDayShortName6}}</td>
                <td class="{{weekDayShortName7CssClass}}">{{weekDayShortName7}}</td>
            </tr>
            {{daysHtml}}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="100">
                    <table class="table {{datePickerDisplayClass}}">
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" title="{{hourText}}" value="{{hour}}" maxlength="2" data-clock="hour" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" title="{{minuteText}}" value="{{minute}}" maxlength="2" data-clock="minute" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" title="{{secondText}}" value="{{second}}" maxlength="2" data-clock="second" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="100">
                    <button class="btn btn-light" title="{{goTodayText}}" data-go-today>{{todayDateString}}</button>
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
        previousYearText = 'Previous year',
        previousMonthText = 'Previous month',
        nextYearText = 'Next year',
        nextMonthText = 'Next month',
        goTodayText = 'Go Today',
        hourText = 'hour',
        minuteText = 'minute',
        secondText = 'second',
        amPm = {
            am: 0,
            pm: 1,
            none: 2
        },
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
            'SU',
            'MO',
            'TU',
            'WE',
            'TH',
            'FR',
            'SA',
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
        ],
        weekDayNames = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        weekDayNamesPersian = [
            'یک شنبه',
            'دوشنبه',
            'سه شنبه',
            'چهارشنبه',
            'پنج شنبه',
            'جمعه',
            'شنبه'
        ];

    //#endregion

    //#region Functions

    function getPopoverDescriber($element) {
        // المانی را بر میگرداند که کاربر پلاگین را روی آن فعال کرده است
        var $popoverDescriber = $element.parents(mdDatePickerFlagSelector + ':first'); // inline
        // not inline
        if ($popoverDescriber.length <= 0) {
            $popoverDescriber = $element.parents(mdDatePickerPopoverSelector + ':first');
            $popoverDescriber = $('[aria-describedby="' + $popoverDescriber.attr('id') + '"]');
        }
        return $popoverDescriber;
    }
    function getSetting($element) {
        return getPopoverDescriber($element).data(mdPluginName);
    }
    function setSetting($element, setting) {
        return getPopoverDescriber($element).data(mdPluginName, setting);
    }
    function updateCalendarHtml1($element, setting) {
        var calendarHtml = getDateTimePickerHtml(setting),
            $container = setting.inLine ? $element.parents(mdDatePickerFlagSelector + ':first') : $element.parents('[data-name="mds-datetimepicker-popoverbody"]:first');
        selectedDateString = $(calendarHtml).find('[data-selecteddatestring]').text().trim();
        //$('#' + $this.attr('aria-describedby')).find('[data-name="mds-datetimepicker-title"]').html(selectedDateString);
        $container.html(getDateTimePickerHtml(setting));
    }
    function setSelectedText(setting) {
        var $target = $(setting.targetSelector),
            dateTimeJson = !setting.isGregorian ? getDateTimeJsonPersian1(setting.selectedDate) : getDateTimeJson1(setting.selectedDate);
        if ($target.length <= 0) return;
        switch ($target[0].tagName.toLowerCase()) {
            case 'input':
                $target.val(getDateTimeString(dateTimeJson, setting));
                break;
            default:
                $target.text(getDateTimeString(dateTimeJson, setting));
                break;
        }
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

    function getWeekDayName(englishWeekDayIndex, isGregorian) {
        if (!isGregorian) return weekDayNamesPersian[englishWeekDayIndex];
        return weekDayNames[englishWeekDayIndex];
    }

    function getWeekDayShortName(englishWeekDayIndex, isGregorian) {
        if (!isGregorian) return shortDayNamesPersian[englishWeekDayIndex];
        return shortDayNames[englishWeekDayIndex];
    }

    function getShortHour(hour) {
        var shortHour;
        if (hour > 12)
            shortHour = hour - 12;
        else
            shortHour = hour;
        return shortHour;
    }

    function getAmPm(hour, isGregorian) {
        var amPm;
        if (hour > 12) {
            if (isGregorian)
                amPm = 'PM';
            else
                amPm = 'ب.ظ';
        } else
            if (isGregorian)
                amPm = 'AM';
            else
                amPm = 'ق.ظ';
        return amPm;
    }

    function hideOthers($exceptThis) {
        $(mdDatePickerPopoverSelector).each(function () {
            var $thisPopover = $(this);
            if (!$exceptThis && $exceptThis.is($thisPopover)) return;
            hidePopover($thisPopover);
        });
    }

    function showPopover($element) {
        if (!$element) return;
        $element.popover('show');
    }

    function hidePopover($element) {
        if (!$element) return;
        $element.popover('hide');
    }

    function convertToNumber1(dateTimeJson) {
        return Number(zeroPad(dateTimeJson.year) + zeroPad(dateTimeJson.month) + zeroPad(dateTimeJson.day));
    }

    function convertToNumber2(year, month, day) {
        return Number(zeroPad(year) + zeroPad(month) + zeroPad(day));
    }

    function getDateTime1(yearPersian, monthPersian, dayPersian, hour, minute, second) {
        hour = !hour ? 0 : hour;
        minute = !minute ? 0 : minute;
        second = !second ? 0 : second;
        var gregorian = toGregorian(yearPersian, monthPersian, dayPersian);
        return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second);
    }

    function getDateTime2(dateTimeJsonPersian) {
        var gregorian = toGregorian(dateTimeJsonPersian.year, dateTimeJsonPersian.month, dateTimeJsonPersian.day);
        return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, dateTimeJsonPersian.hour, dateTimeJsonPersian.minute, dateTimeJsonPersian.second);
    }

    function getDateTimeJson1(dateTime) {
        return {
            year: dateTime.getFullYear(),
            month: dateTime.getMonth() + 1,
            day: dateTime.getDate(),
            hour: dateTime.getHours(),
            minute: dateTime.getMinutes(),
            second: dateTime.getSeconds(),
            dayOfWeek: dateTime.getDay()
        }
    }

    function getDateTimeJsonPersian1(dateTime) {
        var persianDate = toJalaali(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate());
        return {
            year: persianDate.jy,
            month: persianDate.jm,
            day: persianDate.jd,
            hour: dateTime.getHours(),
            minute: dateTime.getMinutes(),
            second: dateTime.getSeconds(),
            dayOfWeek: dateTime.getDay(),
        }
    }

    function getDateTimeJsonPersian2(yearPersian, monthPersian, dayPersian, hour, minute, second) {
        if (!isNumber(hour)) hour = 0;
        if (!isNumber(minute)) minute = 0;
        if (!isNumber(second)) second = 0;
        var gregorian = toGregorian(yearPersian, monthPersian, dayPersian);
        return getDateTimeJsonPersian1(new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second));
    }

    function isLeapYear(persianYear) {
        return isLeapJalaaliYear(persianYear);
    }

    function getDaysInMonthPersian(year, month) {
        var numberOfDaysInMonth = 31;
        if (month > 6 && month < 12)
            numberOfDaysInMonth = 30;
        else if (month == 12)
            numberOfDaysInMonth = isLeapYear(year) ? 30 : 29;
        return numberOfDaysInMonth;
    }

    function getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    }

    function zeroPad(nr, base) {
        if (nr == undefined || nr == '') return '00';
        if (base == undefined || base == '') base = '00';
        var len = (String(base).length - String(nr).length) + 1;
        return len > 0 ? new Array(len).join('0') + nr : nr;
    }

    function getDateTimeString(dateTimeJson, setting) {
        var gregorian = setting.isGregorian ?
            new Date(dateTimeJson.year, dateTimeJson.month, dateTimeJson.day, dateTimeJson.hour, dateTimeJson.minute, dateTimeJson.second) :
            toGregorian(dateTimeJson.year, dateTimeJson.month, dateTimeJson.day),
            dateTime = setting.isGregorian ? gregorian : new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, dateTimeJson.hour, dateTimeJson.minute, dateTimeJson.second),
            selectedDateTimeString = setting.format;

        /// فرمت های که پشتیبانی می شوند
        /// <para />
        /// yyyy: سال چهار رقمی
        /// <para />
        /// yy: سال دو رقمی
        /// <para />
        /// MMMM: نام فارسی ماه
        /// <para />
        /// MM: عدد دو رقمی ماه
        /// <para />
        /// M: عدد یک رقمی ماه
        /// <para />
        /// dddd: نام فارسی روز هفته
        /// <para />
        /// dd: عدد دو رقمی روز ماه
        /// <para />
        /// d: عدد یک رقمی روز ماه
        /// <para />
        /// HH: ساعت دو رقمی با فرمت 00 تا 24
        /// <para />
        /// H: ساعت یک رقمی با فرمت 0 تا 24
        /// <para />
        /// hh: ساعت دو رقمی با فرمت 00 تا 12
        /// <para />
        /// h: ساعت یک رقمی با فرمت 0 تا 12
        /// <para />
        /// mm: عدد دو رقمی دقیقه
        /// <para />
        /// m: عدد یک رقمی دقیقه
        /// <para />
        /// ss: ثانیه دو رقمی
        /// <para />
        /// s: ثانیه یک رقمی
        /// <para />
        /// fff: میلی ثانیه 3 رقمی
        /// <para />
        /// ff: میلی ثانیه 2 رقمی
        /// <para />
        /// f: میلی ثانیه یک رقمی
        /// <para />
        /// tt: ب.ظ یا ق.ظ
        /// <para />
        /// t: حرف اول از ب.ظ یا ق.ظ

        selectedDateTimeString = selectedDateTimeString.replace(/yyyy/mg, dateTimeJson.year);
        selectedDateTimeString = selectedDateTimeString.replace(/yy/mg, dateTimeJson.year % 100);
        selectedDateTimeString = selectedDateTimeString.replace(/MMMM/mg, getMonthName(dateTimeJson.month, setting.isGregorian));
        selectedDateTimeString = selectedDateTimeString.replace(/MM/mg, setting.isGregorian ? zeroPad(dateTimeJson.month + 1) : zeroPad(dateTimeJson.month));
        selectedDateTimeString = selectedDateTimeString.replace(/M/mg, setting.isGregorian ? dateTimeJson.month + 1 : dateTimeJson.month);
        selectedDateTimeString = selectedDateTimeString.replace(/dddd/mg, getWeekDayName(dateTime.getDay(), setting.isGregorian));
        selectedDateTimeString = selectedDateTimeString.replace(/dd/mg, zeroPad(dateTimeJson.day));
        selectedDateTimeString = selectedDateTimeString.replace(/d/mg, dateTimeJson.day);
        selectedDateTimeString = selectedDateTimeString.replace(/HH/mg, zeroPad(dateTime.getHours()));
        selectedDateTimeString = selectedDateTimeString.replace(/H/mg, dateTime.getHours());
        selectedDateTimeString = selectedDateTimeString.replace(/hh/mg, zeroPad(getShortHour(dateTime.getHours())));
        selectedDateTimeString = selectedDateTimeString.replace(/h/mg, zeroPad(dateTime.getHours()));
        selectedDateTimeString = selectedDateTimeString.replace(/mm/mg, zeroPad(dateTime.getMinutes()));
        selectedDateTimeString = selectedDateTimeString.replace(/m/mg, dateTime.getMinutes());
        selectedDateTimeString = selectedDateTimeString.replace(/ss/mg, zeroPad(dateTime.getSeconds()));
        selectedDateTimeString = selectedDateTimeString.replace(/s/mg, dateTime.getSeconds());
        selectedDateTimeString = selectedDateTimeString.replace(/fff/mg, zeroPad(dateTime.getMilliseconds(), '000'));
        selectedDateTimeString = selectedDateTimeString.replace(/ff/mg, zeroPad(dateTime.getMilliseconds() / 10));
        selectedDateTimeString = selectedDateTimeString.replace(/f/mg, dateTime.getMilliseconds() / 100);
        selectedDateTimeString = selectedDateTimeString.replace(/tt/mg, getAmPm(dateTime.getHours(), setting.isGregorian));
        selectedDateTimeString = selectedDateTimeString.replace(/t/mg, getAmPm(dateTime.getHours(), setting.isGregorian)[0]);

        if (!setting.englishNumber)
            selectedDateTimeString = toPersianNumber(selectedDateTimeString);

        return selectedDateTimeString;
    }

    function getLastDayDateOfPreviousMonth(dateTime, isGregorian) {
        var dateTimeLocal = dateTime;
        if (isGregorian) {
            var previousMonth = new Date(dateTimeLocal.setMonth(dateTimeLocal.getMonth() - 1)),
                daysInMonth = getDaysInMonth(previousMonth.getFullYear(), previousMonth.getMonth());
            return new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInMonth);
        }
        var dateTimeJsonPersian = getDateTimeJsonPersian1(dateTimeLocal);
        dateTimeJsonPersian.month += -1;
        if (dateTimeJsonPersian.month <= 0) {
            dateTimeJsonPersian.month = 12;
            dateTimeJsonPersian.year--;
        }
        if (dateTimeJsonPersian.month > 12) {
            dateTimeJsonPersian.year++;
            dateTimeJsonPersian.month = 1;
        }
        return getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, getDaysInMonthPersian(dateTimeJsonPersian.year, dateTimeJsonPersian.month));
    }

    function getFirstDayDateOfNextMonth(dateTime, isGregorian) {
        var dateTimeLocal = dateTime;
        if (isGregorian) {
            var nextMonth = new Date(dateTimeLocal.setMonth(dateTimeLocal.getMonth() + 1));
            return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
        }
        var dateTimeJsonPersian = getDateTimeJsonPersian1(dateTimeLocal);
        dateTimeJsonPersian.month += 1;
        if (dateTimeJsonPersian.month <= 0) {
            dateTimeJsonPersian.month = 12;
            dateTimeJsonPersian.year--;
        }
        if (dateTimeJsonPersian.month > 12) {
            dateTimeJsonPersian.year++;
            dateTimeJsonPersian.month = 1;
        }
        return getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, getDaysInMonthPersian(dateTimeJsonPersian.year, dateTimeJsonPersian.month));
    }

    function parsePersianDateTime(persianDateTimeInString, dateSeperatorPattern) {
        if (!dateSeperatorPattern) dateSeperatorPattern = "\/|-";
        dateSeperatorPattern = new RegExp(dateSeperatorPattern, 'img');
        persianDateTimeInString = toEnglishNumber(persianDateTimeInString);

        var month = 0,
            year = 0,
            day = 0,
            hour = 0,
            minute = 0,
            second = 0,
            miliSecond = 0,
            amPmEnum = amPm.none,
            containMonthSeperator = dateSeperatorPattern.test(persianDateTimeInString);

        persianDateTimeInString = persianDateTimeInString.replace(/&nbsp;/img, ' ');
        persianDateTimeInString = persianDateTimeInString.replace(/\s+/img, '-');
        persianDateTimeInString = persianDateTimeInString.replace(/\\/img, '-');
        persianDateTimeInString = persianDateTimeInString.replace(/ك/img, 'ک');
        persianDateTimeInString = persianDateTimeInString.replace(/ي/img, 'ی');
        persianDateTimeInString = persianDateTimeInString.replace(dateSeperatorPattern, '-');
        persianDateTimeInString = '-' + persianDateTimeInString + '-';

        // بدست آوردن ب.ظ یا ق.ظ
        if (persianDateTimeInString.indexOf('ق.ظ') > -1)
            amPmEnum = amPmEnum.AM;
        else if (persianDateTimeInString.indexOf('ب.ظ') > -1)
            amPmEnum = amPmEnum.PM;

        if (persianDateTimeInString.indexOf(':') > -1) // رشته ورودی شامل ساعت نیز هست
        {
            persianDateTimeInString = persianDateTimeInString.replace(/-*:-*/img, ':');
            hour = (persianDateTimeInString.match(/-\d{1,2}(?=:)/img)[0]).replace(/\D+/, '');
            var minuteAndSecondAndMiliSecondMatch = persianDateTimeInString.match(/:\d{1,2}(?=:?)/img);
            minute = minuteAndSecondAndMiliSecondMatch[0].replace(/\D+/, '');
            if (minuteAndSecondAndMiliSecondMatch[1] != undefined)
                second = minuteAndSecondAndMiliSecondMatch[1].replace(/\D+/, '');
            if (minuteAndSecondAndMiliSecondMatch[2] != undefined)
                miliSecond = minuteAndSecondAndMiliSecondMatch[2].replace(/\D+/, '');
        }

        if (containMonthSeperator) {
            var monthDayMath = persianDateTimeInString.match(/-\d{1,2}(?=-\d{1,2}[^:]|-)/img);

            // بدست آوردن ماه
            month = monthDayMath[0].replace(/\D+/, '');

            // بدست آوردن روز
            day = monthDayMath[1].replace(/\D+/, '');

            // بدست آوردن سال
            year = (persianDateTimeInString.match(/-\d{2,4}(?=-\d{1,2}[^:])/img)[0]).replace(/\D+/, '');
        } else {
            for (var i = 1; i < 12; i++) {
                var persianMonthName = getMonthName(i - 1, false);
                if (!persianDateTimeInString.indexOf(persianMonthName) > -1) continue;
                month = i;
                break;
            }

            // بدست آوردن روز
            var dayMatch = persianDateTimeInString.match(/-\d{1,2}(?=-)/img);
            if (dayMatch != null) {
                day = dayMatch[0].replace(/\D+/, '');
                persianDateTimeInString = persianDateTimeInString.replace(new RegExp('-' + day + '(?=-)', 'img'), '-');
            }

            // بدست آوردن سال
            var yearMatch = persianDateTimeInString.match(/-\d{4}(?=-)/img);
            if (yearMatch != null)
                year = yearMatch[0].replace(/\D+/, '');
            else {
                yearMatch = persianDateTimeInString.match(/-\d{2,4}(?=-)/img);
                if (yearMatch != null)
                    year = yearMatch[0].replace(/\D+/, '');
            }
        }

        var numericYear = Number(year);
        var numericMonth = Number(month);
        var numericDay = Number(day);
        var numericHour = Number(hour);
        var numericMinute = Number(minute);
        var numericSecond = Number(second);
        var numericMiliSecond = Number(miliSecond);

        if (numericYear <= 0)
            numericYear = persianDateTime[0];

        if (numericMonth <= 0)
            numericMonth = persianDateTime[1];

        if (numericDay <= 0)
            numericDay = persianDateTime[2];

        switch (amPmEnum) {
            case amPmEnum.PM:
                if (numericHour < 12)
                    numericHour = numericHour + 12;
                break;
            case amPmEnum.AM:
            case amPmEnum.None:
                break;
        }

        return getDateTimeJsonPersian2(numericYear, numericMonth, numericDay, numericHour, numericMinute, numericSecond, numericMiliSecond);
    }

    function parseGregorianDateTime(gregorianDateTimeString) {
        //بدست آوردن تاریخ قبلی که در تکست باکس وجود داشته
        gregorianDateTimeString = toEnglishNumber(gregorianDateTimeString);
        if (!gregorianDateTimeString) {
            var dateTime = new Date();
            dateTime.setHours(0);
            dateTime.setMinutes(0);
            dateTime.setSeconds(0);
            dateTime.setMilliseconds(0);
            return dateTime;
        }
        return new Date(gregorianDateTimeString);
    }

    function parsePersianFromDateToDateValues(fromDateString, toDateString, isGregorian) {
        if (!fromDateString && !toDateString) return undefined;
        var fromDate = !isGregorian ? parsePersianDateTime(fromDateString) : parseGregorianDateTime(fromDateString),
            toDate = !isGregorian ? parsePersianDateTime(toDateString) : parseGregorianDateTime(toDateString);
        return {
            fromDateNumber: convertToNumber1(fromDate),
            fromDateObject: fromDate,
            toDateNumber: convertToNumber1(toDate),
            toDateObject: toDate
        };
    }

    function getDateTimePickerHtml(setting, selectedDate) {
        var selectedDateObject = !selectedDate ? setting.selectedDate : selectedDate,
            selectedDateObjectTemp = selectedDateObject,
            html = dateTimePickerHtmlTemplate;

        if (!selectedDateObject) throw new Error('مقدار تاریخ معتبر نمی باشد');

        html = html.replace(/{{selectedDateStringCssClass}}/img, setting.inLine ? '' : 'd-none');
        html = html.replace(/{{rtlCssClass}}/img, setting.isGregorian ? '' : 'rtl');
        html = html.replace(/{{weekDayShortName1CssClass}}/img, setting.isGregorian ? 'text-danger' : '');
        html = html.replace(/{{weekDayShortName7CssClass}}/img, !setting.isGregorian ? 'text-danger' : '');
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
        html = html.replace(/{{datePickerDisplayClass}}/img, setting.enableTimePicker ? '' : 'd-none');
        html = html.replace(/{{weekDayShortName1}}/img, getWeekDayShortName(0, setting.isGregorian));
        html = html.replace(/{{weekDayShortName2}}/img, getWeekDayShortName(1, setting.isGregorian));
        html = html.replace(/{{weekDayShortName3}}/img, getWeekDayShortName(2, setting.isGregorian));
        html = html.replace(/{{weekDayShortName4}}/img, getWeekDayShortName(3, setting.isGregorian));
        html = html.replace(/{{weekDayShortName5}}/img, getWeekDayShortName(4, setting.isGregorian));
        html = html.replace(/{{weekDayShortName6}}/img, getWeekDayShortName(5, setting.isGregorian));
        html = html.replace(/{{weekDayShortName7}}/img, getWeekDayShortName(6, setting.isGregorian));

        var i = 0,
            firstWeekDayNumber = selectedDateObject.getDay(),
            cellNumber = 0,
            tdNumber = 0,
            yearsToSelectHtml = '',
            selectedYear = 0,
            selectedMonthName = '',
            selectedDateString = '',
            todayDateString = '',
            todayDateTimeJson = {}, // year, month, day, hour, minute, second
            selectedDateTimeJson = {}, // year, month, day, hour, minute, second
            numberOfDaysInCurrentMonth,
            $tr = $('<tr />'),
            $td = $('<td />'),
            daysHtml = '',
            currentDateNumber = 0,
            previousMonthDateNumber = 0,
            nextMonthDateNumber = 0,
            previousYearDateNumber = 0,
            nextYearDateNumber = 0,
            dayNumberInString = '0',
            dayOfWeek = '', // نام روز هفته
            previousYearButtonAttribute = '',
            previousMonthButtonAttribute = '',
            selectMonthButtonAttribute = '',
            selectYearButtonAttribute = '',
            nextMonthButtonAttribute = '',
            nextYearButtonAttribute = '';

        //firstWeekDayNumber = getFirstDayOfPersianWeek(dateTimeJson.year, dateTimeJson.month),

        if (setting.isGregorian) {
            selectedDateTimeJson = getDateTimeJson1(selectedDateObject);
            todayDateTimeJson = getDateTimeJson1(new Date());
            disableBeforeDateTimeJson = !setting.disableBeforeDate ? undefined : getDateTimeJson1(setting.disableBeforeDate);
            disableAfterDateTimeJson = !setting.disableAfterDate ? undefined : getDateTimeJson1(setting.disableAfterDate);
            firstWeekDayNumber = new Date(selectedDateTimeJson.year, selectedDateTimeJson.month - 1, 1).getDay();
            numberOfDaysInCurrentMonth = getDaysInMonth(selectedDateTimeJson.year, selectedDateTimeJson.month);
            numberOfDaysInPreviousMonth = getDaysInMonth(selectedDateTimeJson.year, selectedDateTimeJson.month - 1);
            previousMonthDateNumber = convertToNumber1(getDateTimeJson1(getLastDayDateOfPreviousMonth(selectedDateObject, true)));
            nextMonthDateNumber = convertToNumber1(getDateTimeJson1(getFirstDayDateOfNextMonth(selectedDateObject, true)));
            previousYearDateNumber = convertToNumber1(getDateTimeJson1(new Date(selectedDateObjectTemp.setFullYear(selectedDateObjectTemp.getFullYear() - 1))));
            nextYearDateNumber = convertToNumber1(getDateTimeJson1(new Date(selectedDateObjectTemp.setFullYear(selectedDateObjectTemp.getFullYear() + 1))));
        } else {
            selectedDateTimeJson = getDateTimeJsonPersian1(selectedDateObject);
            todayDateTimeJson = getDateTimeJsonPersian1(new Date());
            disableBeforeDateTimeJson = !setting.disableBeforeDate ? undefined : getDateTimeJsonPersian1(setting.disableBeforeDate);
            disableAfterDateTimeJson = !setting.disableAfterDate ? undefined : getDateTimeJsonPersian1(setting.disableAfterDate);
            firstWeekDayNumber = getDateTimeJsonPersian2(selectedDateTimeJson.year, selectedDateTimeJson.month, 1, 0, 0, 0).dayOfWeek;
            numberOfDaysInCurrentMonth = getDaysInMonthPersian(selectedDateTimeJson.year, selectedDateTimeJson.month);
            numberOfDaysInPreviousMonth = getDaysInMonthPersian(selectedDateTimeJson.year - 1, selectedDateTimeJson.month - 1);
            previousMonthDateNumber = convertToNumber1(getDateTimeJsonPersian1(getLastDayDateOfPreviousMonth(selectedDateObject, false)));
            nextMonthDateNumber = convertToNumber1(getDateTimeJsonPersian1(getFirstDayDateOfNextMonth(selectedDateObject, false)));
            previousYearDateNumber = convertToNumber1(getDateTimeJsonPersian1(new Date(selectedDateObjectTemp.setFullYear(selectedDateObjectTemp.getFullYear() - 1))));
            nextYearDateNumber = convertToNumber1(getDateTimeJsonPersian1(new Date(selectedDateObjectTemp.setFullYear(selectedDateObjectTemp.getFullYear() + 1))));
        }

        selectedYear = setting.englishNumber ? selectedDateTimeJson.year : toPersianNumber(selectedDateTimeJson.year);
        todayDateNumber = convertToNumber1(todayDateTimeJson);
        disableBeforeDateTimeNumber = !disableBeforeDateTimeJson ? undefined : convertToNumber1(disableBeforeDateTimeJson);
        disableAfterDateTimeNumber = !disableAfterDateTimeJson ? undefined : convertToNumber1(disableAfterDateTimeJson);
        selectedDateString = `${getWeekDayName(selectedDateTimeJson.dayOfWeek, setting.isGregorian)}، ${selectedDateTimeJson.day} ${getMonthName(selectedDateTimeJson.month - 1, setting.isGregorian)} ${selectedDateTimeJson.year}`;
        if (!setting.englishNumber) selectedDateString = toPersianNumber(selectedDateString);
        selectedMonthName = getMonthName(selectedDateTimeJson.month - 1, setting.isGregorian);
        todayDateString = `${setting.isGregorian ? 'Today,' : 'امروز،'} ${todayDateTimeJson.day} ${getMonthName(todayDateTimeJson.month - 1, setting.isGregorian)} ${todayDateTimeJson.year}`;
        if (!setting.englishNumber) todayDateString = toPersianNumber(todayDateString);

        if (setting.yearOffset <= 0) {
            previousYearButtonAttribute += 'disabled ';
            nextYearButtonAttribute += 'disabled ';
            selectYearButtonAttribute += 'disabled ';
        }
        for (i = todayDateTimeJson.year - setting.yearOffset; i < todayDateTimeJson.year + setting.yearOffset; i++) {
            if (setting.disableBeforeToday && i < todayDateTimeJson.year) continue;
            if (disableBeforeDateTimeJson && disableBeforeDateTimeJson.year && i < disableBeforeDateTimeJson.year) continue;
            if (disableAfterDateTimeJson && disableAfterDateTimeJson.year && i > disableAfterDateTimeJson.year) continue;
            if (setting.englishNumber)
                yearsToSelectHtml += `<div class="col-3 text-center" ${selectedDateTimeJson.year == i ? 'selected-year' : ''} data-year>${i}</div>`;
            else
                yearsToSelectHtml += `<div class="col-3 text-center" ${selectedDateTimeJson.year == i ? 'selected-year' : ''} data-year>${toPersianNumber(i)}</div>`;
        }

        // روز های ماه قبل
        if (firstWeekDayNumber != 6) {
            if (setting.isGregorian) firstWeekDayNumber--;
            for (i = numberOfDaysInPreviousMonth - firstWeekDayNumber; i <= numberOfDaysInPreviousMonth; i++) {
                dayNumberInString = setting.englishNumber ? zeroPad(i) : toPersianNumber(zeroPad(i));
                $td = $('<td data-nm />').html(dayNumberInString);
                // روز جمعه
                if (!setting.isGregorian && tdNumber == 6)
                    $td.addClass('text-danger');
                // روز یکشنبه
                else if (setting.isGregorian && tdNumber == 0)
                    $td.addClass('text-danger');
                $tr.append($td);
                cellNumber++;
                tdNumber++;
                if (tdNumber >= 7) {
                    tdNumber = 0;
                    daysHtml += $tr[0].outerHTML;
                    isTrAppended = true;
                    $tr = $('<tr />');
                }
            }
        }

        for (i = 1; i <= numberOfDaysInCurrentMonth; i++) {

            if (tdNumber >= 7) {
                tdNumber = 0;
                daysHtml += $tr[0].outerHTML;
                isTrAppended = true;
                $tr = $('<tr />');
            }

            currentDateNumber = convertToNumber2(selectedDateTimeJson.year, selectedDateTimeJson.month, i);
            dayNumberInString = setting.englishNumber ? zeroPad(i) : toPersianNumber(zeroPad(i));

            $td = $('<td data-day />').html(dayNumberInString);


            // امروز
            if (currentDateNumber == todayDateNumber) {
                $td.attr('data-today', '');
                // اگر نام روز هفته انتخاب شده در تکس باکس قبل از تاریخ امروز باشد
                // نباید دیگر نام روز هفته تغییر کند
                if (!dayOfWeek)
                    dayOfWeek = getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian)
            }
            // روز از قبل انتخاب شده
            // روزی که در تکس باکس انتخاب شده
            if (i == selectedDateTimeJson.day) {
                $td.attr('data-selectedday', '');
                dayOfWeek = getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
            }

            // روز جمعه
            if (!setting.isGregorian && tdNumber == 6)
                $td.addClass('text-danger');
            // روز یکشنبه
            else if (setting.isGregorian && tdNumber == 0)
                $td.addClass('text-danger');


            // روزهای غیر فعال شده
            if (setting.disableBeforeToday) {
                if (currentDateNumber < todayDateNumber) $td.attr('disabled', '');
                if (previousMonthDateNumber < todayDateNumber)
                    previousMonthButtonAttribute = 'disabled';
                if (previousYearDateNumber < todayDateNumber)
                    previousYearButtonAttribute = 'disabled';
            }
            if (setting.disableAfterToday) {
                if (currentDateNumber > todayDateNumber) $td.attr('disabled', '');
                if (nextMonthDateNumber > todayDateNumber)
                    nextMonthButtonAttribute = 'disabled';
                if (nextYearDateNumber > todayDateNumber)
                    nextYearButtonAttribute = 'disabled';
            }
            if (disableAfterDateTimeNumber) {
                if (currentDateNumber > disableAfterDateTimeNumber) $td.attr('disabled', '');
                if (nextMonthDateNumber > disableAfterDateTimeNumber)
                    nextMonthButtonAttribute = 'disabled';
                if (nextYearDateNumber > disableAfterDateTimeNumber)
                    nextYearButtonAttribute = 'disabled';
            }
            else if (disableBeforeDateTimeNumber) {
                if (currentDateNumber < disableBeforeDateTimeNumber) $td.attr('disabled', '');
                if (previousMonthDateNumber < disableBeforeDateTimeNumber)
                    previousMonthButtonAttribute = 'disabled';
                if (previousYearDateNumber < disableBeforeDateTimeNumber)
                    previousYearButtonAttribute = 'disabled';
            }

            $tr.append($td);
            isTrAppended = false;

            tdNumber++;
            cellNumber++;
        }

        if (tdNumber >= 7) {
            tdNumber = 0;
            daysHtml += $tr[0].outerHTML;
            isTrAppended = true;
            $tr = $('<tr />');
        }

        // روزهای ماه بعد
        for (i = 1; i <= 42 - cellNumber; i++) {
            dayNumberInString = setting.englishNumber ? zeroPad(i) : toPersianNumber(zeroPad(i));
            $td = $('<td data-nm />').html(dayNumberInString);
            // روز جمعه
            if (!setting.isGregorian && tdNumber == 6)
                $td.addClass('text-danger');
            // روز یکشنبه
            else if (setting.isGregorian && tdNumber == 0)
                $td.addClass('text-danger');
            $tr.append($td);
            tdNumber++;
            if (tdNumber >= 7) {
                tdNumber = 0;
                daysHtml += $tr[0].outerHTML;
                isTrAppended = true;
                $tr = $('<tr />');
            }
        }

        if (!isTrAppended) {
            daysHtml += $tr[0].outerHTML;
            isTrAppended = true;
        }

        html = html.replace(/{{yearsToSelectHtml}}/img, yearsToSelectHtml);
        html = html.replace(/{{selectedYear}}/img, selectedYear);
        html = html.replace(/{{selectedMonthName}}/img, selectedMonthName);
        html = html.replace(/{{selectedDateString}}/img, selectedDateString);
        html = html.replace(/{{daysHtml}}/img, daysHtml);
        html = html.replace(/{{todayDateString}}/img, todayDateString);
        html = html.replace(/{{hour}}/img, selectedDateTimeJson.hour);
        html = html.replace(/{{minute}}/img, selectedDateTimeJson.minute);
        html = html.replace(/{{second}}/img, selectedDateTimeJson.second);
        html = html.replace(/{{previousYearButtonAttribute}}/img, previousYearButtonAttribute);
        html = html.replace(/{{previousMonthButtonAttribute}}/img, previousMonthButtonAttribute);
        html = html.replace(/{{selectMonthButtonAttribute}}/img, selectMonthButtonAttribute);
        html = html.replace(/{{selectYearButtonAttribute}}/img, selectYearButtonAttribute);
        html = html.replace(/{{nextMonthButtonAttribute}}/img, nextMonthButtonAttribute);
        html = html.replace(/{{nextYearButtonAttribute}}/img, nextYearButtonAttribute);

        return html;
    }

    //#endregion

    //#region Events

    // کلیک روی روزها
    $(document).on('click', mdDatePickerContainerSelector + ' [data-day]', function () {
        var $this = $(this),
            disabled = $this.attr('disabled'),
            setting = getSetting($this),
            day = Number(toEnglishNumber($this.text().trim()));
        if (disabled) return;
        if (!setting.isGregorian) {
            var dateTimeJsonPersian = getDateTimeJsonPersian1(setting.selectedDate);
            dateTimeJsonPersian.day = day;
            setting.selectedDate = getDateTime2(dateTimeJsonPersian);
        }
        else
            setting.selectedDate = new Date(setting.selectedDate.setDate(day));
        setSetting($this, setting);
        setSelectedText(setting);
        if (!setting.inLine) hidePopover($(mdDatePickerPopoverSelector));
        else updateCalendarHtml1($this, setting);
    });

    // کلیک روی ماه های دراپ داون
    $(document).on('click', mdDatePickerContainerSelector + ' [data-dropdown-month]', function () {
        var $this = $(this),
            setting = getSetting($this),
            month = Number(toEnglishNumber($this.attr('data-dropdown-month').trim()));
        if (!setting.isGregorian) {
            var dateTimeJsonPersian = getDateTimeJsonPersian1(setting.selectedDate);
            dateTimeJsonPersian.month = month;
            setting.selectedDate = getDateTime2(dateTimeJsonPersian);
        }
        else
            setting.selectedDate = new Date(setting.selectedDate.setMonth(month));
        setSetting($this, setting);
        updateCalendarHtml1($this, setting);
    });

    // کلیک روی ماه بعد یا قبل
    $(document).on('click', mdDatePickerContainerSelector + ' [data-change-month]', function () {
        var $this = $(this),
            setting = getSetting($this),
            monthAdd = Number(toEnglishNumber($this.attr('data-change-month').trim()));
        if (!setting.isGregorian) {
            var dateTimeJsonPersian = getDateTimeJsonPersian1(setting.selectedDate);
            dateTimeJsonPersian.month += monthAdd;
            if (dateTimeJsonPersian.month <= 0) {
                dateTimeJsonPersian.month = 12;
                dateTimeJsonPersian.year--;
            }
            if (dateTimeJsonPersian.month > 12) {
                dateTimeJsonPersian.year++;
                dateTimeJsonPersian.month = 1;
            }
            setting.selectedDate = getDateTime2(dateTimeJsonPersian);
        }
        else
            setting.selectedDate = new Date(setting.selectedDate.setMonth(setting.selectedDate.getMonth() + monthAdd));
        setSetting($this, setting);
        updateCalendarHtml1($this, setting);
    });

    // کلیک روی سال بعد یا قبل
    $(document).on('click', mdDatePickerContainerSelector + ' [data-change-year]', function () {
        var $this = $(this),
            setting = getSetting($this),
            yearAdd = Number(toEnglishNumber($this.attr('data-change-year').trim()));
        if (!setting.isGregorian) {
            var dateTimeJsonPersian = getDateTimeJsonPersian1(setting.selectedDate);
            dateTimeJsonPersian.year += yearAdd;
            setting.selectedDate = getDateTime2(dateTimeJsonPersian);
        }
        else
            setting.selectedDate = new Date(setting.selectedDate.setFullYear(setting.selectedDate.getFullYear() + yearAdd));
        setSetting($this, setting);
        updateCalendarHtml1($this, setting);
    });

    // کلیک روی سال
    $(document).on('click', mdDatePickerContainerSelector + ' [data-year]', function () {
        var $this = $(this),
            setting = getSetting($this),
            year = Number(toEnglishNumber($this.text().trim()));
        $this.parents(mdDatePickerContainerSelector + ':first').find('.select-year-box').addClass('w-0');
        if (!setting.isGregorian) {
            var dateTimeJsonPersian = getDateTimeJsonPersian1(setting.selectedDate);
            dateTimeJsonPersian.year = year;
            setting.selectedDate = getDateTime2(dateTimeJsonPersian);
        }
        else
            setting.selectedDate = new Date(setting.selectedDate.setFullYear(year));
        setSetting($this, setting);
        updateCalendarHtml1($this, setting);
    });

    // عوض کردن ساعت
    $(document).on('blur', mdDatePickerContainerSelector + ' input[data-clock]', function () {
        var $this = $(this),
            $thisContainer = $this.parents(mdDatePickerContainerSelector + ':first'),
            $hour = $thisContainer.find('input[type="text"][data-clock="hour"]'),
            $minute = $thisContainer.find('input[type="text"][data-clock="minute"]'),
            $second = $thisContainer.find('input[type="text"][data-clock="second"]'),
            hour = Number($hour.val()),
            minute = Number($minute.val()),
            second = Number($second.val()),
            setting = getSetting($this);

        hour = !isNumber(hour) ? setting.selectedDate.getHours() : hour;
        minute = !isNumber(minute) ? setting.selectedDate.getMinutes() : minute;
        second = !isNumber(second) ? setting.selectedDate.getSeconds() : second;

        setting.selectedDate = new Date(setting.selectedDate.setHours(hour));
        setting.selectedDate = new Date(setting.selectedDate.setMinutes(minute));
        setting.selectedDate = new Date(setting.selectedDate.setSeconds(second));

        setSetting($this, setting);
        setSelectedText(setting);
    });

    // کلیک روی سال انتخابی برای عوض کردن سال
    $(document).on('click', mdDatePickerContainerSelector + ' [select-year-button]', function () {
        $(this).parents(mdDatePickerContainerSelector + ':first').find('.select-year-box').removeClass('w-0');
    });

    // برو به امروز
    $(document).on('click', mdDatePickerContainerSelector + ' [data-go-today]', function () {
        var $this = $(this),
            setting = getSetting($this);
        setting.selectedDate = new Date();
        setSetting($this, setting);
        updateCalendarHtml1($this, setting);
    });

    // مخفی کردن تقویم با کلیک روی جایی که تقویم نیست
    $('html').on('click', function (e) {
        if (triggerStart) return;
        var $target = $(e.target),
            $popoverDescriber = getPopoverDescriber($target);
        if ($popoverDescriber.length >= 1) return;
        hidePopover($(mdDatePickerPopoverSelector));
    });

    //#endregion

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this),
                    setting = $.extend({
                        englishNumber: false,
                        placement: 'bottom',
                        trigger: 'click',
                        enableTimePicker: false,
                        targetSelector: '',
                        groupId: '',
                        toDate: false,
                        fromDate: false,
                        disabled: false,
                        format: '',
                        isGregorian: false,
                        gregorianStartDayIndex: 0,
                        inLine: false,
                        selectedDate: new Date(),
                        yearOffset: 30,
                        holiDays: [],
                        disableBeforeToday: false,
                        disableAfterToday: false,
                        disableBeforeDate: undefined,
                        disableAfterDate: undefined
                    }, options);
                $this.attr(mdDatePickerFlag, '');
                if (setting.isGregorian)
                    setting.englishNumber = true;
                if (setting.enableTimePicker && !setting.format)
                    setting.format = 'yyyy/MM/dd   HH:mm:ss';
                else if (!setting.enableTimePicker && !setting.format)
                    setting.format = 'yyyy/MM/dd';

                $this.data(mdPluginName, setting);
                // نمایش تقویم
                if (setting.inLine) {
                    $this.append(getDateTimePickerHtml(setting));
                } else {
                    $this.popover({
                        container: 'body',
                        content: '',
                        html: true,
                        placement: setting.placement,
                        title: 'انتخاب تاریخ',
                        trigger: 'manual',
                        template: popverHtmlTemplate,
                    }).on(setting.trigger, function () {
                        triggerStart = true;
                        $this = $(this);
                        setting = $this.data(mdPluginName);
                        if (setting.disabled) return;
                        hideOthers($this);
                        showPopover($this);
                        setTimeout(function () {
                            var calendarHtml = getDateTimePickerHtml(setting),
                                selectedDateString = $(calendarHtml).find('[data-selecteddatestring]').text().trim();
                            $('#' + $this.attr('aria-describedby')).find('[data-name="mds-datetimepicker-title"]').html(selectedDateString);
                            $('#' + $this.attr('aria-describedby')).find('[data-name="mds-datetimepicker-popoverbody"]').html(calendarHtml);
                            triggerStart = false;
                        }, 10);
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