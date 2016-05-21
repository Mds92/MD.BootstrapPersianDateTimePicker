/*
 * bootstrap persian date time picker jQuery Plugin
 * version : 1.7.3.4
 *
 *
 *
 * Written By Mohammad Dayyan, from دی 1393
 * mds.soft@gmail.com - 0903-3339923
 *
 * My weblog: mds-soft.persianblog.ir
*/

(function ($) {

    var mdDateTimePickerFlagAttributeName = 'data-MdPersianDateTimePicker',
        mdDateTimePickerFlagSelector = '[' + mdDateTimePickerFlagAttributeName + ']',
        mdDateTimeIsShowingAttributeName = 'data-MdPersianDateTimePickerShowing',
        mdSelectedDateTimeAttributeName = 'data-MdPersianDateTimePickerSelectedDateTime',
        mdDateTimePickerWrapperAttribute = 'data-name="Md-PersianDateTimePicker"',
        mdDateTimePickerWrapperSelector = '[' + mdDateTimePickerWrapperAttribute + ']',
        isFirstTime = true,
        changeDateTimeEnum = {
            IncreaseMonth: 1,
            DecreaseMonth: 2,
            IncreaseYear: 3,
            DecreaseYear: 4,
            GoToday: 5,
            ClockChanged: 6,
            DayChanged: 7,
            TriggerFired: 8,
            OnEvent: 9
        };

    function getPersianWeekDayNameWithEnglishIndex(englishWeekDayIndex) {
        switch (englishWeekDayIndex) {
            case 0:
                return "یک شنبه";
            case 1:
                return "دوشنبه";
            case 2:
                return "سه شنبه";
            case 3:
                return "چهار شنبه";
            case 4:
                return "پنج شنبه";
            case 5:
                return "جمعه";
            case 6:
                return "شنبه";
            default:
                return "";
        }
    }
    function getPersianWeekDayNameWithPersianIndex(persianWeekDayIndex) {
        switch (persianWeekDayIndex) {
            case 0:
                return "شنبه";
            case 1:
                return "یکشنبه";
            case 2:
                return "دوشنبه";
            case 3:
                return "سه شنبه";
            case 4:
                return "چهارشنبه";
            case 5:
                return "پنج شنبه";
            case 6:
                return "جمعه";
            default:
                return "";
        }
    }

    function getFirstDayOfWeek(persianYear, persianMonth) {
        var gregorianDate = toGregorian(persianYear, persianMonth, 01),
            date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd),
            dayOfWeek = 0;
        switch (date.getDay()) {
            case 0:
                dayOfWeek = 2; // یک شنبه
                break;

            case 1:
                dayOfWeek = 3; // دو شنبه
                break;

            case 2:
                dayOfWeek = 4; // سه شنبه
                break;

            case 3:
                dayOfWeek = 5; // چهار شنبه
                break;

            case 4:
                dayOfWeek = 6; // پنج شنبه
                break;

            case 5:
                dayOfWeek = 7; // جمعه
                break;

            case 6:
                dayOfWeek = 1; // شنبه
                break;
        }
        return dayOfWeek;
    }
    function getTodayCalendarInPersian() {
        var today = new Date(),
            persianDate = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        return [persianDate.jy, persianDate.jm, persianDate.jd, getPersianWeekDayNameWithEnglishIndex(today.getDay())];
    }
    function isLeapYear(persianYear) {
        return isLeapJalaaliYear(persianYear);
    }

    function zeroPad(nr, base) {
        if (nr == undefined || nr == '') return '00';
        if (base == undefined || base == '') base = '00';
        var len = (String(base).length - String(nr).length) + 1;
        return len > 0 ? new Array(len).join('0') + nr : nr;
    }
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function toPersianNumber(inputNumber1) {
        /* ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ */
        if (inputNumber1 == undefined) return '';
        var str1 = $.trim(inputNumber1.toString());
        if (str1 == '') return '';
        str1 = str1.replace(/0/g, '۰');
        str1 = str1.replace(/1/g, '۱');
        str1 = str1.replace(/2/g, '۲');
        str1 = str1.replace(/3/g, '۳');
        str1 = str1.replace(/4/g, '۴');
        str1 = str1.replace(/5/g, '۵');
        str1 = str1.replace(/6/g, '۶');
        str1 = str1.replace(/7/g, '۷');
        str1 = str1.replace(/8/g, '۸');
        str1 = str1.replace(/9/g, '۹');
        return str1;
    }
    function toEnglishNumber(inputNumber2) {
        if (inputNumber2 == undefined) return '';
        var str = $.trim(inputNumber2.toString());
        if (str == "") return "";
        str = str.replace(/۰/g, '0');
        str = str.replace(/۱/g, '1');
        str = str.replace(/۲/g, '2');
        str = str.replace(/۳/g, '3');
        str = str.replace(/۴/g, '4');
        str = str.replace(/۵/g, '5');
        str = str.replace(/۶/g, '6');
        str = str.replace(/۷/g, '7');
        str = str.replace(/۸/g, '8');
        str = str.replace(/۹/g, '9');
        return str;
    }
    function getPersianMonth(monthNumber) {
        switch (monthNumber) {
            case 1:
                return "فروردین";
            case 2:
                return "اردیبهشت";
            case 3:
                return "خرداد";
            case 4:
                return "تیر";
            case 5:
                return "مرداد";
            case 6:
                return "شهریور";
            case 7:
                return "مهر";
            case 8:
                return "آبان";
            case 9:
                return "آذر";
            case 10:
                return "دی";
            case 11:
                return "بهمن";
            case 12:
                return "اسفند";
            default:
                return "";
        }
    }

    function increaseOneMonth(dateObject) {
        dateObject.Month = dateObject.Month + 1;
        if (dateObject.Month > 12) {
            dateObject.Month = 1;
            dateObject.Year = dateObject.Year + 1;
        }
    }
    function increaseOneYear(dateObject) {
        dateObject.Year = dateObject.Year + 1;
    }
    function decreaseOneMonth(dateObject) {
        dateObject.Month = dateObject.Month - 1;
        if (dateObject.Month < 1) {
            dateObject.Month = 12;
            dateObject.Year = dateObject.Year - 1;
        }
    }
    function decreaseOneYear(dateObject) {
        dateObject.Year = dateObject.Year - 1;
    }

    function getDateTimeString(dateTimeInJsonFormat, enableTimePicker, isEnglishNumber) {
        var yearString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Year) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Year)),
            monthString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Month) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Month)),
            dayString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Day) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Day)),
            hourString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Hour) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Hour)),
            minuteString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Minute) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Minute)),
            secondString = isEnglishNumber ? zeroPad(dateTimeInJsonFormat.Second) : toPersianNumber(zeroPad(dateTimeInJsonFormat.Second)),
            selectedDateTimeString = yearString + '/' + monthString + '/' + dayString;
        if (enableTimePicker)
            selectedDateTimeString = selectedDateTimeString + '  ' + hourString + ':' + minuteString + ':' + secondString;
        return selectedDateTimeString;
    }

    function createDateTimeJson(year, month, day, hour, minute, second) {
        if (!isNumber(hour)) hour = 0;
        if (!isNumber(minute)) minute = 0;
        if (!isNumber(second)) second = 0;
        return { Year: year, Month: month, Day: day, Hour: hour, Minute: minute, Second: second };
    }

    // تبدیل تاریخ به عدد برای مقایسه
    function convertToNumber(year, month, day) {
        return Number(zeroPad(year) + zeroPad(month) + zeroPad(day));
    }
    function convertDateObjectToNumber(dateObject) {
        return Number(zeroPad(dateObject.Year) + zeroPad(dateObject.Month) + zeroPad(dateObject.Day));
    }

    // تصحیح عدد روز بر اساس ماه و سال
    function fixDate(year, month, day) {
        if (month >= 7 && month <= 11 && day > 30)
            day = 30;
        if (month >= 12 && day >= 30 && !isLeapYear(year))
            day = 29;
        return {
            Year: year,
            Month: month,
            Day: day
        }
    }

    function parsePreviousDateTimeValue(persianDateTimeString) {
        //بدست آوردن تاریخ قبلی که در تکست باکس وجود داشته
        var previousDateTime = toEnglishNumber(persianDateTimeString).replace(/\s+/, '-'),
            year,
            month,
            day,
            hour = 0,
            minute = 0,
            second = 0;

        if (previousDateTime != '') {
            year = Number(previousDateTime.match(/\d{2,4}(?=\/\d{1,2}\/)/im));
            month = Number(previousDateTime.match(/\d{1,2}(?=\/\d{1,2})(?!\/\d{1,2}\/)/im));
            day = previousDateTime.match(/(\d{1,2})(-|$)/im);
            day = day != undefined && day.length >= 1 ? Number(day[1]) : 0;
        } else {
            var todayPersianDate = getTodayCalendarInPersian();
            year = todayPersianDate[0];
            month = todayPersianDate[1];
            day = todayPersianDate[2];
        }

        if (previousDateTime.indexOf(':') > 0) { // بدست آوردن مقادیر ساعت و مقدار دهی آنها
            hour = Number(previousDateTime.match(/\d{1,2}(?=:\d{1,2}:)/im));
            minute = Number(previousDateTime.match(/\d{1,2}(?=:)(?!:\d{1,2}:)/im));
            second = Number(previousDateTime.match(/:(\d+$)/im)[1]);
        }

        var fixedDate = fixDate(year, month, day);
        year = fixedDate.Year;
        month = fixedDate.Month;
        day = fixedDate.Day;

        return createDateTimeJson(year, month, day, hour, minute, second);
    }
    function parseFromDateToDateValues(fromDateString, toDateString) {
        if ((toDateString == undefined || toDateString == '') &&
            (fromDateString == undefined || fromDateString == '')) return undefined;

        toDateString = toEnglishNumber(toDateString).replace(/\s+/, '-');
        fromDateString = toEnglishNumber(fromDateString).replace(/\s+/, '-');

        var year, month, day,
            fromDateObject = undefined,
            fromDateNumber = undefined,
            toDateObject = undefined,
            toDateNumber = undefined;

        if (fromDateString != undefined && fromDateString != '') {
            year = Number(fromDateString.match(/\d{2,4}(?=\/\d{1,2}\/)/im));
            month = Number(fromDateString.match(/\d{1,2}(?=\/\d{1,2})(?!\/\d{1,2}\/)/im));
            day = fromDateString.match(/(\d{1,2})(-|$)/im);
            day = day != undefined && day.length >= 1 ? Number(day[1]) : 0;
            fromDateNumber = convertToNumber(year, month, day);
            fromDateObject = {
                Year: year,
                Month: month,
                Day: day
            };
        }

        if (toDateString != undefined && toDateString != '') {
            year = Number(toDateString.match(/\d{2,4}(?=\/\d{1,2}\/)/im));
            month = Number(toDateString.match(/\d{1,2}(?=\/\d{1,2})(?!\/\d{1,2}\/)/im));
            day = toDateString.match(/(\d{1,2})(-|$)/im);
            day = day != undefined && day.length >= 1 ? Number(day[1]) : 0;
            toDateNumber = convertToNumber(year, month, day);
            toDateObject = {
                Year: year,
                Month: month,
                Day: day
            };
        }

        return {
            FromDateNumber: fromDateNumber,
            FromDateObject: fromDateObject,
            ToDateNumber: toDateNumber,
            ToDateObject: toDateObject
        };
    }

    // درست کردن اچ تی ام ال دیت تایم پیکر
    // مقدار برگشتی تعیین میکند آیا مقدار تاریخ باید به روز شود یا نه
    function createDateTimePickerHtml($popoverDescriber, dateTimeInJsonFormat, writeDateString, initializing) {
        var triggerName = $popoverDescriber.attr('data-trigger'),
            persianTodayDateTemp = getTodayCalendarInPersian(), // تاریخ شمسی امروز
            currentYearNumber = persianTodayDateTemp[0],
            currentMonthNumber = persianTodayDateTemp[1],
            currentDayNumber = persianTodayDateTemp[2],
            todayDateTimeString = 'امروز، ' + persianTodayDateTemp[3] + ' ' + toPersianNumber(currentDayNumber) + ' ' + getPersianMonth(currentMonthNumber) + ' ' + toPersianNumber(currentYearNumber),
            $calendarMainTable = $('<table class="table table-striped" />'),
            $calendarHeader = $('<tr><td colspan="100" style="padding:5px;"><table class="table" data-name="Md-PersianDateTimePicker-HeaderTable"><tr><td><button type="button" class="btn btn-default btn-xs" title="سال بعد" data-name="Md-PersianDateTimePicker-NextYear">&lt;&lt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="ماه بعد" data-name="Md-PersianDateTimePicker-NextMonth">&lt;</button></td><td><div class="dropdown" style="min-width:50px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianYear" data-toggle="dropdown" aria-expanded="true" data-name="Md-PersianDateTimePicker-TitleYear">1393</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianYear"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-YearNumber">1394</a></li></ul></div></td><td ><div class="dropdown" style="min-width:73px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianMonths" data-toggle="dropdown" aria-expanded="true" data-name="Md-PersianDateTimePicker-TitleMonth">نام ماه</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianMonths"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="1">فروردین</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="2">اردیبهشت</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="3">خرداد</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="4">تیر</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="5">مرداد</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="6">شهریور</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="7">مهر</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="8">آبان</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="9">آذر</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="10">دی</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="11">بهمن</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-MonthName" data-MonthNumber="12">اسفند</a></li></ul></div></td><td><button type="button" class="btn btn-default btn-xs" title="ماه قبل" data-name="Md-PersianDateTimePicker-PreviousMonth">&gt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="سال قبل" data-name="Md-PersianDateTimePicker-PreviousYear">&gt;&gt;</button></td></tr></table></td></tr><tr data-name="Md-PersianDateTimePicker-WeekDaysNames"><td>ش</td><td>ی</td><td>د</td><td>س</td><td>چ</td><td>پ</td><td class="text-danger">ج</td></tr>'),
            $monthsTitlesDropDown = $calendarHeader.find('.dropdown-menu[aria-labelledby="dropdownMenuPersianMonths"]'),
            $calendarTimePicker = $('<tr><td colspan="100" style="padding: 2px;"><table class="table" data-name="Md-PersianDateTimePicker-TimePicker"><tr><td><input type="text" class="form-control" data-name="Clock-Hour" maxlength="2" /></td><td>:</td><td><input type="text" class="form-control" data-name="Clock-Minute" maxlength="2" /></td><td>:</td><td><input type="text" class="form-control" data-name="Clock-Second" maxlength="2" /></td></tr></table></td></tr>'),
            $calendarFooter = $('<tr><td colspan="100"><a class="" href="javascript:void(0);" data-name="go-today">' + todayDateTimeString + '</a></td></tr>'),
            $calendarDivWrapper = $('<div ' + mdDateTimePickerWrapperAttribute + ' />'),
            targetSelector = $popoverDescriber.attr('data-TargetSelector'),
            $target = targetSelector == undefined || targetSelector == '' ? $popoverDescriber : $(targetSelector),
            enableTimePicker = $popoverDescriber.attr('data-EnableTimePicker') == 'true',
            isFromDate = $popoverDescriber.attr('data-FromDate'),
            isToDate = $popoverDescriber.attr('data-ToDate'),
            groupId = $popoverDescriber.attr('data-GroupId'),
            englishNumber = $popoverDescriber.attr('data-EnglishNumber') == 'true',
            fromDateString = '',
            toDateString = '',
            fromDateToDateJson = undefined,
            $nextMonthButton = $calendarHeader.find('[data-name="Md-PersianDateTimePicker-NextMonth"]'),
            $nextYearButton = $calendarHeader.find('[data-name="Md-PersianDateTimePicker-NextYear"]'),
            $previousMonthButton = $calendarHeader.find('[data-name="Md-PersianDateTimePicker-PreviousMonth"]'),
            $previousYearButton = $calendarHeader.find('[data-name="Md-PersianDateTimePicker-PreviousYear"]');

        // اگر متغیر زیر تعریف نشده بود مقدار داخل تارگت را گرفته و استفاده می کند
        if (dateTimeInJsonFormat == undefined) {
            dateTimeInJsonFormat = parsePreviousDateTimeValue($.trim($target.val()));
        }

        var fixedDate = fixDate(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day),
            currentDateNumber = convertToNumber(fixedDate.Year, fixedDate.Month, fixedDate.Day);
        dateTimeInJsonFormat.Year = fixedDate.Year;
        dateTimeInJsonFormat.Month = fixedDate.Month;
        dateTimeInJsonFormat.Day = fixedDate.Day;

        // افزودن دراپ داون سال
        var $yearDropDown = $calendarHeader.find('[aria-labelledby="dropdownMenuPersianYear"]');
        $yearDropDown.html('');

        var yearForDropDown = dateTimeInJsonFormat == undefined ? currentYearNumber : dateTimeInJsonFormat.Year;
        for (var k = yearForDropDown - 5; k <= yearForDropDown + 5; k++) {
            var $dropDownYear = $('<li role="presentation" data-year="' + k + '"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="Md-PersianDateTimePicker-YearNumber">' + toPersianNumber(k) + '</a></li>');
            if (k == currentYearNumber)
                $dropDownYear.addClass('bg-info');
            $yearDropDown.append($dropDownYear);
        }

        //بدست آوردن تاریخ قبلی که در تکست باکس وجود داشته
        if (enableTimePicker) {
            $calendarTimePicker.find('[data-name="Clock-Hour"]').val(zeroPad(dateTimeInJsonFormat.Hour));
            $calendarTimePicker.find('[data-name="Clock-Minute"]').val(zeroPad(dateTimeInJsonFormat.Minute));
            $calendarTimePicker.find('[data-name="Clock-Second"]').val(zeroPad(dateTimeInJsonFormat.Second));
        }

        if (dateTimeInJsonFormat.Year <= 0) dateTimeInJsonFormat.Year = 1393;
        if (dateTimeInJsonFormat.Month <= 0) dateTimeInJsonFormat.Month = 1;
        if (dateTimeInJsonFormat.Day <= 0) dateTimeInJsonFormat.Day = 1;

        // درست کردن ماه
        if (dateTimeInJsonFormat.Month > 12) {
            dateTimeInJsonFormat.Month = 1;
            dateTimeInJsonFormat.Year = dateTimeInJsonFormat.Year + 1;
        }

        // اطلاعات ماه جاری
        var numberOfDaysInCurrentMonth = 31;
        if (dateTimeInJsonFormat.Month > 6 && dateTimeInJsonFormat.Month < 12)
            numberOfDaysInCurrentMonth = 30;
        else if (dateTimeInJsonFormat.Month == 12)
            numberOfDaysInCurrentMonth = isLeapYear(dateTimeInJsonFormat.Year) ? 30 : 29;

        // اطلاعات ماه قبلی
        var numberOfDaysInPreviousMonth = 31;
        if (dateTimeInJsonFormat.Month - 1 > 6 && dateTimeInJsonFormat.Month - 1 < 12)
            numberOfDaysInPreviousMonth = 30;
        else if (dateTimeInJsonFormat.Month - 1 == 12)
            numberOfDaysInPreviousMonth = isLeapYear(dateTimeInJsonFormat.Year - 1) ? 30 : 29;

        // بدست آوردن نام ماه و عدد سال
        // مثال: دی 1393
        var persianMonthName = getPersianMonth(dateTimeInJsonFormat.Month);
        $calendarHeader.find('[data-name="Md-PersianDateTimePicker-TitleMonth"]').html(persianMonthName);
        $calendarHeader.find('[data-name="Md-PersianDateTimePicker-TitleYear"]').html(toPersianNumber(dateTimeInJsonFormat.Year));
        $calendarMainTable.append($calendarHeader);

        // from date, to date
        if (groupId != undefined && groupId != '') {
            if (isFromDate != undefined && isFromDate == 'true') { // $popoverDescriber is `from date`, so we have to find `to date`
                fromDateString = dateTimeInJsonFormat.Year.toString() + '/' + dateTimeInJsonFormat.Month.toString() + '/' + dateTimeInJsonFormat.Day.toString();
                var $toDatePopoverDescriber = $('[data-GroupId="' + groupId + '"][data-ToDate]'),
                    toDateTargetSelector = $toDatePopoverDescriber.attr('data-TargetSelector'),
                    $toDateTarget = toDateTargetSelector != undefined && toDateTargetSelector != '' ? $(toDateTargetSelector) : $toDatePopoverDescriber;
                toDateString = $toDateTarget.val();
            }
            else if (isToDate != undefined && isToDate == 'true') {  // $popoverDescriber is `to date`, so we have to find `from date`
                toDateString = dateTimeInJsonFormat.Year.toString() + '/' + dateTimeInJsonFormat.Month.toString() + '/' + dateTimeInJsonFormat.Day.toString();
                var $fromDatePopoverDescriber = $('[data-GroupId="' + groupId + '"][data-FromDate]'),
                    fromDateTargetSelector = $fromDatePopoverDescriber.attr('data-TargetSelector'),
                    $fromDateTarget = fromDateTargetSelector != undefined && fromDateTargetSelector != '' ? $(fromDateTargetSelector) : $fromDatePopoverDescriber;
                fromDateString = $fromDateTarget.val();
            }
            if (toDateString != '' || fromDateString != '')
                fromDateToDateJson = parseFromDateToDateValues(fromDateString, toDateString);

            // اگر از تاریخ انتخاب شده بزرگتر از - تا تاریخ - بود
            if (isFromDate && fromDateToDateJson.ToDateNumber != undefined && currentDateNumber > fromDateToDateJson.ToDateNumber && !initializing) {
                dateTimeInJsonFormat.Year = fromDateToDateJson.ToDateObject.Year;
                dateTimeInJsonFormat.Month = fromDateToDateJson.ToDateObject.Month;
                dateTimeInJsonFormat.Day = fromDateToDateJson.ToDateObject.Day;
                $target.val(getDateTimeString(dateTimeInJsonFormat, enableTimePicker, englishNumber));
                $popoverDescriber.trigger(triggerName);
                return;
            }

            if (isToDate && fromDateToDateJson.FromDateNumber != undefined && currentDateNumber < fromDateToDateJson.FromDateNumber && !initializing) {
                dateTimeInJsonFormat.Year = fromDateToDateJson.FromDateObject.Year;
                dateTimeInJsonFormat.Month = fromDateToDateJson.FromDateObject.Month;
                dateTimeInJsonFormat.Day = fromDateToDateJson.FromDateObject.Day;
                $target.val(getDateTimeString(dateTimeInJsonFormat, enableTimePicker, englishNumber));
                $popoverDescriber.trigger(triggerName);
                return;
            }
        }

        var i = 0,
            firstWeekDayNumber = getFirstDayOfWeek(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month),
            cellNumber = 0,
            tdNumber = 0,
            dayOfWeek = '', // نام روز هفته
            isTrAppended = true,
            $tr = $('<tr />');

        // روز های ماه پیش
        if (firstWeekDayNumber != 1)
            for (i = firstWeekDayNumber - 2; i >= 0; i--) {
                $tr.append($('<td data-name="disabled-day" />').html(toPersianNumber(zeroPad(numberOfDaysInPreviousMonth - i))));
                cellNumber++;
                tdNumber++;
            }

        for (i = 1; i <= numberOfDaysInCurrentMonth; i++) {

            if (tdNumber >= 7) {
                tdNumber = 0;
                $calendarMainTable.append($tr);
                isTrAppended = true;
                $tr = $('<tr />');
            }

            var dayNumberInString = toPersianNumber(zeroPad(i)),
                currentDateNumber = convertToNumber(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, i),
                isToday = i == currentDayNumber && dateTimeInJsonFormat.Month == currentMonthNumber && dateTimeInJsonFormat.Year == currentYearNumber;
                $td = $('<td data-name="day" />').html(dayNumberInString);

            // امروز
            if (isToday) {
                $td.addClass('bg-primary').attr('data-name', 'today');
                // اگر نام روز هفته انخاب شده در تکس باکس قبل از تاریخ امروز باشد
                // نباید دیگر نام روز هفته تغییر کند
                if (dayOfWeek == '') 
                    dayOfWeek = getPersianWeekDayNameWithPersianIndex(tdNumber);
            }
            // روز از قبل انتخاب شده
            // روزی که در تکس باکس انتخاب شده
            else if (i == dateTimeInJsonFormat.Day) {
                $td.addClass('bg-info');
                dayOfWeek = getPersianWeekDayNameWithPersianIndex(tdNumber);
            }
            // روز جمعه
            else if (tdNumber > 0 && tdNumber % 6 == 0)
                $td.addClass('text-danger');

            // بررسی از تاریخ، تا تاریخ
            if (fromDateToDateJson != undefined &&
                ((isToDate && fromDateToDateJson.FromDateNumber != undefined && currentDateNumber < fromDateToDateJson.FromDateNumber) ||
                (isFromDate && fromDateToDateJson.ToDateNumber != undefined && currentDateNumber > fromDateToDateJson.ToDateNumber))) {
                $td.attr('data-name', 'disabled-day');
            }

            $tr.append($td);
            isTrAppended = false;

            tdNumber++;
            cellNumber++;
        }

        $previousMonthButton.removeClass('disabled').removeAttr('disabled');
        $previousYearButton.removeClass('disabled').removeAttr('disabled');
        $nextMonthButton.removeClass('disabled').removeAttr('disabled');
        $nextYearButton.removeClass('disabled').removeAttr('disabled');

        // غیر فعال کردن دکمه های ماه بعد و سال بعد و یا ماه قبل و سال قبل
        if (fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined) {

            // دکمه های ماه قبل و سال قبل

            if (isToDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year
                && fromDateToDateJson.FromDateObject.Month >= fromDateToDateJson.ToDateObject.Month) {
                $previousMonthButton.addClass('disabled').attr('disabled', 'disabled');
                $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
            }

            if (isToDate && fromDateToDateJson.FromDateObject.Year >= fromDateToDateJson.ToDateObject.Year) {
                $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
            }

            // دکمه های سال بعد و ماه بعد

            if (isFromDate && fromDateToDateJson.ToDateObject.Year == fromDateToDateJson.FromDateObject.Year
                && fromDateToDateJson.ToDateObject.Month <= fromDateToDateJson.FromDateObject.Month) {
                $nextMonthButton.addClass('disabled').attr('disabled', 'disabled');
                $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
            }

            if (isFromDate && fromDateToDateJson.ToDateObject.Year <= fromDateToDateJson.FromDateObject.Year) {
                $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
            }

            // غیر فعال کردن سال های خارج از رنج
            $yearDropDown.find('li[data-year]').each(function () {
                var $thisLi = $(this),
                    year = Number($thisLi.attr('data-year'));
                if ((isFromDate && year > fromDateToDateJson.ToDateObject.Year) ||
                    (isToDate && year < fromDateToDateJson.FromDateObject.Year))
                    $thisLi.addClass('disabled').children('a').attr('disabled', 'disabled');
                else
                    $thisLi.removeClass('disabled').children('a').removeAttr('disabled');
            });

            // غیر فعال کردن ماه های خارج از رنج
            $monthsTitlesDropDown.find('a[data-monthnumber]').each(function () {
                var $thisA = $(this),
                    month = Number($thisA.attr('data-monthnumber'))
                $li = $thisA.parents('li:first');
                if (isToDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year
                    && fromDateToDateJson.FromDateObject.Month > month) {
                    $li.addClass('disabled').children('a').attr('disabled', 'disabled');
                }
                if (isFromDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year
                    && fromDateToDateJson.ToDateObject.Month < month) {
                    $li.addClass('disabled').children('a').attr('disabled', 'disabled');
                }
            });
        }
        // \\

        // روزهای ماه بعد
        if (cellNumber < 42) {
            for (i = 1; i <= 42 - cellNumber; i++) {
                if (tdNumber >= 7) {
                    tdNumber = 0;
                    $calendarMainTable.append($tr);
                    isTrAppended = true;
                    $tr = $('<tr />');
                }
                else if (!isTrAppended) {
                    $calendarMainTable.append($tr);
                    isTrAppended = true;
                }
                $tr.append($('<td data-name="disabled-day" />').html(toPersianNumber(zeroPad(i))));
                tdNumber++;
            }
        }

        if (enableTimePicker)
            $calendarMainTable.append($calendarTimePicker);
        $calendarMainTable.append($calendarFooter);
        $calendarDivWrapper.append($calendarMainTable);

        // عوض کردن عنوان popover
        $('[data-name="Md-DateTimePicker-Title"]').html(dayOfWeek + '، ' + toPersianNumber(zeroPad(dateTimeInJsonFormat.Day)) + ' ' + persianMonthName + ' ' + toPersianNumber(zeroPad(dateTimeInJsonFormat.Year)));

        // آیا محتویات تکس باکس باید تغییر کند ؟
        if (writeDateString) {
            if (fromDateToDateJson != undefined) {
                //var previousSelectedDateNumber = convertDateStringToNumber($target.val()); // تاریخی که از قبل در تکس باکس بوده و قبلا انتخاب شده است
                var selectedDateNumber = convertToNumber(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day); // تاریخ انتخاب شده فعلی
                if (!((isToDate && fromDateToDateJson.FromDateNumber != undefined && selectedDateNumber < fromDateToDateJson.FromDateNumber) ||
                (isFromDate && fromDateToDateJson.ToDateNumber != undefined && selectedDateNumber > fromDateToDateJson.ToDateNumber))) {
                    $target.val(getDateTimeString(dateTimeInJsonFormat, enableTimePicker, englishNumber));
                    $target.trigger('change');
                }
            } else {
                $target.val(getDateTimeString(dateTimeInJsonFormat, enableTimePicker, englishNumber));
                $target.trigger('change');
            }
        }

        $popoverDescriber.attr(mdSelectedDateTimeAttributeName, JSON.stringify(dateTimeInJsonFormat));

        return $calendarDivWrapper;
    }

    // نمایش popover
    function showPopover($element) {
        if ($element == undefined || $element.attr(mdDateTimeIsShowingAttributeName) == 'true') return;
        $element.attr(mdDateTimeIsShowingAttributeName, true);
        $element.popover('show');
    };

    // مخفی کردن popover
    function hidePopover($elements) {
        //console.log(arguments.callee.caller);
        if ($elements == undefined) return;
        $elements.each(function () {
            var $element = $(this);
            if ($element.attr(mdDateTimeIsShowingAttributeName) == 'false') return;
            $element.attr(mdDateTimeIsShowingAttributeName, false);
            $element.popover('hide');
        });
    };

    // مخفی کردن سایر تقویم ها به جز تقویم مورد نظر
    function hideOthers($exceptThis) {
        var allMdDateTimePickers = $(mdDateTimePickerFlagSelector);
        allMdDateTimePickers.each(function () {
            var $thisPopover = $(this);
            if ($exceptThis.is($thisPopover)) return;
            hidePopover($thisPopover);
        });
    };

    function updateDateTimePickerHtml(senderObject, changeEnum, newMonthNumber, newYearNumber) {
        var $senderObject = $(senderObject),
            $wrapper = $senderObject.parents(mdDateTimePickerWrapperSelector),
            $popoverDescriber = $wrapper.length > 0 ? $('[aria-describedby*="' + $wrapper.parents('.popover').attr('id') + '"]') : undefined,
            newDateTimeInJsonFormat = $popoverDescriber != undefined && $popoverDescriber.attr(mdSelectedDateTimeAttributeName) != undefined && $popoverDescriber.attr(mdSelectedDateTimeAttributeName) != '' ? JSON.parse($popoverDescriber.attr(mdSelectedDateTimeAttributeName)) : undefined,
            writeDateString = true;

        switch (changeEnum) {
            // ماه بعدی
            case changeDateTimeEnum.IncreaseMonth:
                increaseOneMonth(newDateTimeInJsonFormat);
                break;

                // ماه قبلی
            case changeDateTimeEnum.DecreaseMonth:
                decreaseOneMonth(newDateTimeInJsonFormat);
                break;

                // سال بعدی
            case changeDateTimeEnum.IncreaseYear:
                increaseOneYear(newDateTimeInJsonFormat);
                break;

                // سال قبلی
            case changeDateTimeEnum.DecreaseYear:
                decreaseOneYear(newDateTimeInJsonFormat);
                break;

                // برو به امروز
            case changeDateTimeEnum.GoToday:
                var todayDateTimeInJsonFormat = parsePreviousDateTimeValue('');
                newDateTimeInJsonFormat.Year = todayDateTimeInJsonFormat.Year;
                newDateTimeInJsonFormat.Month = todayDateTimeInJsonFormat.Month;
                newDateTimeInJsonFormat.Day = todayDateTimeInJsonFormat.Day;
                break;

                // تغییر در ساعت
            case changeDateTimeEnum.ClockChanged:
                newDateTimeInJsonFormat.Hour = $wrapper.find('input[type="text"][data-name="Clock-Hour"]').val();
                newDateTimeInJsonFormat.Minute = $wrapper.find('input[type="text"][data-name="Clock-Minute"]').val();
                newDateTimeInJsonFormat.Second = $wrapper.find('input[type="text"][data-name="Clock-Second"]').val();
                if (newDateTimeInJsonFormat.Hour > 23)
                    newDateTimeInJsonFormat.Hour = 0;
                if (newDateTimeInJsonFormat.Minute > 59)
                    newDateTimeInJsonFormat.Minute = 0;
                if (newDateTimeInJsonFormat.Second > 59)
                    newDateTimeInJsonFormat.Second = 0;
                break;

                // تغییر روز
            case changeDateTimeEnum.DayChanged:
                newDateTimeInJsonFormat.Day = Number(toEnglishNumber($.trim($senderObject.text())));
                hidePopover($popoverDescriber);
                break;

                // هنگامی که رویداد 
                // trigger
                // رخ می دهد
            case changeDateTimeEnum.TriggerFired:
                writeDateString = false;
                $popoverDescriber = $senderObject;
                var $popover = $('#' + $popoverDescriber.attr('aria-describedby'));
                $wrapper = $popover.find(mdDateTimePickerWrapperSelector);
                break;

                // تغییر ماه و سال
            case changeDateTimeEnum.OnEvent:
                if (newMonthNumber != undefined)
                    newDateTimeInJsonFormat.Month = newMonthNumber;
                if (newYearNumber != undefined)
                    newDateTimeInJsonFormat.Year = newYearNumber;
                break;
        }

        $wrapper.replaceWith(createDateTimePickerHtml($popoverDescriber, newDateTimeInJsonFormat, writeDateString));
    }

    function bindEvents() {
        // کلیک روی روزها
        $(document).on('click', '[data-name="day"],[data-name="today"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DayChanged);
        });

        // عوض کردن ماه با انتخاب نام ماه از روی دراپ داون
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-MonthName"]:not([disabled])', function () {
            var $this = $(this),
                selectedMonthNumber = Number($.trim($this.attr('data-MonthNumber')));
            updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, selectedMonthNumber);
        });

        // کلیک روی دکمه ماه بعد
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-NextMonth"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseMonth);
        });

        // کلیک روی دکمه ماه قبل
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-PreviousMonth"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseMonth);
        });

        // عوض کردن سال با کلیک روی دراپ داون
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-YearNumber"]:not([disabled])', function () {
            var $this = $(this),
                selectedYearNumber = Number(toEnglishNumber($.trim($this.text())));
            updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, undefined, selectedYearNumber);
        });

        // کلیک روی دکمه سال قبل
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-PreviousYear"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseYear);
        });

        // کلیک روی دکمه سال بعد
        $(document).on('click', '[data-name="Md-PersianDateTimePicker-NextYear"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseYear);
        });

        // numeric textbox
        $(document).on('keydown', 'input[type="text"][data-name^="Clock"]', function (e) {
            // if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) return false;
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                return false;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
            return true;
        });
        // تغییر ساعت ، دقیقه و یا ثانیه
        $(document).on('blur', 'input[type="text"][data-name^="Clock"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.ClockChanged);
            return true;
        });

        // انتخاب عدد داخل تکس باکس های تایم در هنگام فوکوس روی آنها
        $(document).on('focus', 'input[type="text"][data-name^="Clock"]', function () {
            $(this).select();
        });

        // کلیک روی دکمه امروز
        $(document).on('click', '[data-name="go-today"]', function () {
            updateDateTimePickerHtml(this, changeDateTimeEnum.GoToday);
        });
    }

    var methods = {
        init: function (options) {
            var settings = $.extend(
            {
                EnglishNumber: false,
                Placement: 'bottom',
                Trigger: 'focus',
                EnableTimePicker: true,
                TargetSelector: '',
                GroupId: '',
                ToDate: false,
                FromDate: false,
                Disabled: false
            }, options);

            if (isFirstTime) {
                bindEvents();
                isFirstTime = false;
            }

            return this.each(function () {
                var $this = $(this);

                $this.attr(mdDateTimePickerFlagAttributeName, '');

                $this.attr('data-trigger', settings.Trigger);
                $this.attr('data-EnableTimePicker', settings.EnableTimePicker);
                if ($.trim(settings.TargetSelector) != '')
                    $this.attr('data-TargetSelector', settings.TargetSelector);
                if ($.trim(settings.GroupId) != '')
                    $this.attr('data-GroupId', settings.GroupId);
                if (settings.ToDate)
                    $this.attr('data-ToDate', settings.ToDate);
                if (settings.FromDate)
                    $this.attr('data-FromDate', settings.FromDate);
                if (settings.EnglishNumber)
                    $this.attr('data-EnglishNumber', settings.EnglishNumber);
                if (settings.Disabled)
                    $this.attr('data-disabled', true);

                var initialDateTimeInJsonFormat = parsePreviousDateTimeValue($this.val()),
                    $calendarDivWrapper = createDateTimePickerHtml($this, initialDateTimeInJsonFormat, undefined, true);

                // نمایش تقویم
                $this.popover({
                    container: 'body',
                    content: $calendarDivWrapper,
                    html: true,
                    placement: settings.Placement,
                    title: 'انتخاب تاریخ',
                    trigger: 'manual',
                    template: '<div class="popover zIndexCorrected" role="tooltip"><div class="arrow"></div><h3 class="popover-title" data-name="Md-DateTimePicker-Title"></h3><div class="popover-content" data-name="Md-DateTimePicker-PopoverContent"></div></div>'
                }).on(settings.Trigger, function () {
                    var isDisabled = $this.attr('data-disabled') != undefined && $this.attr('data-disabled').toLowerCase() == 'true';
                    if (isDisabled) return;
                    hideOthers($this);
                    showPopover($this);
                    updateDateTimePickerHtml(this, changeDateTimeEnum.TriggerFired);
                });
            });
        },
        disable: function(isDisable) {
            return this.each(function() {
                var $this = $(this);
                $this.attr('data-disabled', isDisable);
            });
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

    // مخفی کردن تقویم با کلیک روی جایی که تقویم نیست
    $('html').on('click', function (e) {
        var $target = $(e.target),
            $parentTarget1 = $target.parents(),// اگر المان کلیک شده دارای تارگت باشد
            $parentTarget2 = $target.parents(mdDateTimePickerFlagSelector), // اگر روی تقویم کلیک شده باشد این متغیر مقدار میگیرد
            regex = new RegExp(mdDateTimePickerFlagAttributeName, 'im'),
            hasFlag = false;

        if ($parentTarget2.length > 0) {
            hasFlag = true;
        }

        // بررسی اتریبیوت ها برای پیدا کردن فلگ دیت پیکر
        // اگر فلگ پیدا شد نشان دهنده این است که تارگت یک دیت پیکر است
        if (!hasFlag)
            $.each(e.target.attributes, function () {
                if (this.specified && regex.test(this.name) && !hasFlag) {
                    hasFlag = true;
                    return;
                }
            });

        if (!hasFlag && $parentTarget1.length > 0)
            for (var i = 0; i < $parentTarget1.length; i++) {
                $.each($parentTarget1[i].attributes, function () {
                    if (this.specified && regex.test(this.name) && !hasFlag) {
                        hasFlag = true;
                        return;
                    }
                });
            }

        // مخفی کردن تقویم در صورتی که خارج از تقویم کلیک شده باشد
        if (!$target.hasClass('popover') && // اگر روی تقویم کلیک نشده بود
            !hasFlag && // اگر فلگ نداشت
            $target.parents('.popover.in').length == 0) // اگر روی تقویم کلیک نشده بود
        {
            hidePopover($(mdDateTimePickerFlagSelector));
        }
    });

    //////////////////////////////////////////////////////////////
    /// فعال کرن خودکار پلاگین با گذاشتن اتریبیوت روی تگ ها
    //////////////////////////////////////////////////////////////

    this.EnableMdDateTimePickers = function () {
        var $dateTimePickers = $('[data-MdDateTimePicker="true"],[data-mddatetimepicker="true"]');
        $dateTimePickers.each(function () {
            var $this = $(this),
                trigger = $this.attr('data-trigger'),
                placement = $this.attr('data-Placement'),
                enableTimePicker = $this.attr('data-EnableTimePicker'),
                targetSelector = $this.attr('data-TargetSelector'),
                groupId = $this.attr('data-GroupId'),
                toDate = $this.attr('data-ToDate'),
                fromDate = $this.attr('data-FromDate');
                disable = $this.attr('data-disabled') != undefined && $this.attr('data-disabled').toLowerCase() == 'true';
            if (!$this.is(':input') && $this.css('cursor') == 'auto')
                $this.css({ cursor: 'pointer' });
            $this.MdPersianDateTimePicker({
                Placement: placement,
                Trigger: trigger,
                EnableTimePicker: enableTimePicker != undefined ? enableTimePicker : false,
                TargetSelector: targetSelector != undefined ? targetSelector : '',
                GroupId: groupId != undefined ? groupId : '',
                ToDate: toDate != undefined ? toDate : '',
                FromDate: fromDate != undefined ? fromDate : '',
                Disabled: disable
            });
        });
    }

    $(document).ready(function () {
        EnableMdDateTimePickers();
    });

})(jQuery);