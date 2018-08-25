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
        $htmlElements = [];

    var popverHtmlTemplate = `
<div class="popover zIndexCorrected" role="tooltip" ${mdDatePickerPopoverFlag}>
    <div class="arrow"></div>
    <h3 class="popover-header" data-name="mds-datetimepicker-title"></h3>
    <div class="popover-body" data-name="mds-datetimepicker-popoverbody"></div>
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
    <table class="table table-sm table-striped text-center">
        <thead>
            <tr>
                <th colspan="100">{{selectedDateString}}</th>
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
                                <th>
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
                                    <button class="btn btn-light btn-sm" data-year-button>{{selectedYear}}</button>
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
                                    <input type="text" value="00" title="{{hourText}}" value="{{hour}}" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" value="00" title="{{minuteText}}" value="{{minute}}" />
                                </td>
                                <td>:</td>
                                <td>
                                    <input type="text" value="00" title="{{secondText}}" value="{{second}}" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td colspan="100">
                    <button class="btn btn-light" title="{{goTodayText}}">{{todayDateString}}</button>
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

    //#region Events

    // کلیک روی روزها
    $(document).on('click', mdDatePickerContainerSelector + ' [data-day]', function () {
        var $this = $(this),
            $element = $this.parents(mdDatePickerFlagSelector + ':first'),
            setting = $element.data(mdPluginName),
            day = toEnglishNumber($this.text().trim());
        setting.selectedDate = new Date(setting.selectedDate.setDate(day));
        $element.data(mdPluginName, setting);
        hidePopover($(mdDatePickerPopoverSelector));
    });

    // کلیک روی سال انتخابی برای عوض کردن سال
    $(document).on('click', mdDatePickerContainerSelector + ' [data-year-button]', function () {
        $(mdDatePickerContainerSelector).find('.select-year-box').removeClass('w-0');
    });

    // مخفی کردن تقویم با کلیک روی جایی که تقویم نیست
    $('html').on('click', function (e) {
        var $target = $(e.target),
            hide = true,
            isDatePicker = $target.parents(mdDatePickerPopoverSelector).length > 0;
        if (isDatePicker) return;
        for (var i = 0; i < $htmlElements.length; i++) {
            var $item = $htmlElements[i];
            if (!hide || $target.is($item)) {
                hide = false;
                continue;
            }
            hide = true;
        }
        if (hide) hidePopover($(mdDatePickerPopoverSelector));
    });

    //#endregion

    //#region Functions

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

    function convertToNumber(year, month, day) {
        return Number(zeroPad(year) + zeroPad(month) + zeroPad(day));
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
            fromDateNumber: convertToNumber(fromDate.year, fromDate.month, fromDate.day),
            fromDateObject: fromDate,
            toDateNumber: convertToNumber(toDate.year, toDate.month, toDate.day),
            toDateObject: toDate
        };
    }

    function getDateTimePickerHtml($popoverDescriber) {
        var setting = $popoverDescriber.data(mdPluginName),
            selectedDateObject = setting.selectedDate,
            html = dateTimePickerHtmlTemplate;

        if (!selectedDateObject) throw new Error('مقدار تاریخ معتبر نمی باشد');

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
            dayNumberInString = 0,
            dayOfWeek = ''; // نام روز هفته

        //firstWeekDayNumber = getFirstDayOfPersianWeek(dateTimeJson.year, dateTimeJson.month),

        if (setting.isGregorian) {
            selectedDateTimeJson = getDateTimeJson1(selectedDateObject);
            todayDateTimeJson = getDateTimeJson1(new Date());
            firstWeekDayNumber = new Date(selectedDateTimeJson.year, selectedDateTimeJson.month - 1, 1).getDay();
            numberOfDaysInCurrentMonth = getDaysInMonth(selectedDateTimeJson.year, selectedDateTimeJson.month);
            numberOfDaysInPreviousMonth = getDaysInMonth(selectedDateTimeJson.year, selectedDateTimeJson.month - 1);
        } else {
            selectedDateTimeJson = getDateTimeJsonPersian1(selectedDateObject);
            todayDateTimeJson = getDateTimeJsonPersian1(new Date());
            firstWeekDayNumber = getDateTimeJsonPersian2(selectedDateTimeJson.year, selectedDateTimeJson.month, 1, 0, 0, 0).dayOfWeek + 1;
            numberOfDaysInCurrentMonth = getDaysInMonthPersian(selectedDateTimeJson.year, selectedDateTimeJson.month);
            numberOfDaysInPreviousMonth = getDaysInMonthPersian(selectedDateTimeJson.year - 1, selectedDateTimeJson.month - 1);
        }

        selectedYear = setting.englishNumber ? selectedDateTimeJson.year : toPersianNumber(selectedDateTimeJson.year);
        todayDateNumber = convertToNumber(todayDateTimeJson.year, todayDateTimeJson.month, todayDateTimeJson.day);
        selectedDateString = `${getWeekDayName(selectedDateTimeJson.dayOfWeek, setting.isGregorian)}، ${selectedDateTimeJson.day} ${getMonthName(selectedDateTimeJson.month - 1, setting.isGregorian)} ${selectedDateTimeJson.year}`;
        if (!setting.englishNumber) selectedDateString = toPersianNumber(selectedDateString);
        selectedMonthName = getMonthName(selectedDateTimeJson.month - 1, setting.isGregorian);
        todayDateString = `${setting.isGregorian ? 'Today,' : 'امروز،'} ${todayDateTimeJson.day} ${selectedMonthName} ${todayDateTimeJson.year}`;
        if (!setting.englishNumber) todayDateString = toPersianNumber(todayDateString);

        for (i = todayDateTimeJson.year - setting.yearOffset; i < todayDateTimeJson.year + setting.yearOffset; i++) {
            if (setting.englishNumber)
                yearsToSelectHtml += `<div class="col-3 text-center ${selectedDateTimeJson.year == i ? 'selected-year' : ''}" data-year>${i}</div>`;
            else
                yearsToSelectHtml += `<div class="col-3 text-center ${selectedDateTimeJson.year == i ? 'selected-year' : ''}" data-year>${toPersianNumber(i)}</div>`;
        }

        // روز های ماه قبل
        if (firstWeekDayNumber != 6) {
            for (i = numberOfDaysInPreviousMonth - firstWeekDayNumber; i < numberOfDaysInPreviousMonth; i++) {
                dayNumberInString = setting.englishNumber ? zeroPad(i) : toPersianNumber(zeroPad(i));
                $td = $('<td data-nm />').html(dayNumberInString);
                // روز جمعه
                if (!setting.isGregorian && tdNumber > 0 && tdNumber % 6 == 0)
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

            currentDateNumber = convertToNumber(selectedDateTimeJson.year, selectedDateTimeJson.month, i);
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
            else if (i == selectedDateTimeJson.day) {
                $td.addClass('bg-info');
                dayOfWeek = getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
            }

            // روز جمعه
            if (!setting.isGregorian && tdNumber == 6)
                $td.addClass('text-danger');
            // روز یکشنبه
            else if (setting.isGregorian && tdNumber == 0)
                $td.addClass('text-danger');

            // روزهای غیر فعال شده
            if (setting.disableBeforeToday && currentDateNumber < todayDateNumber)
                $td.attr('disabled', '');

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
            if (!setting.isGregorian && tdNumber > 0 && tdNumber % 6 == 0)
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
        html = html.replace(/{{hour}}/img, setting.englishNumber ? selectedDateTimeJson.hour : toPersianNumber(selectedDateTimeJson.hour));
        html = html.replace(/{{minute}}/img, setting.englishNumber ? selectedDateTimeJson.minute : toPersianNumber(selectedDateTimeJson.minute));
        html = html.replace(/{{second}}/img, setting.englishNumber ? selectedDateTimeJson.second : toPersianNumber(selectedDateTimeJson.second));
        return html;
    }

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
                        disableBeforeToday: false,
                        disabled: false,
                        format: '',
                        isGregorian: false,
                        gregorianStartDayIndex: 0,
                        inLine: false,
                        selectedDate: new Date(),
                        yearOffset: 30
                    }, options);
                $this.attr(mdDatePickerFlag, '');
                $htmlElements.push($this);
                if (setting.isGregorian)
                    setting.englishNumber = true;
                if (setting.enableTimePicker && !setting.format)
                    setting.format = 'yyyy/MM/dd   HH:mm:ss';
                else if (!setting.enableTimePicker && !setting.format)
                    setting.format = 'yyyy/MM/dd';

                $this.data(mdPluginName, setting);
                // نمایش تقویم
                if (setting.inLine) {
                    $this.append(getDateTimePickerHtml($this));
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
                        $this = $(this);
                        setting = $this.data(mdPluginName);
                        if (setting.disabled) return;
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