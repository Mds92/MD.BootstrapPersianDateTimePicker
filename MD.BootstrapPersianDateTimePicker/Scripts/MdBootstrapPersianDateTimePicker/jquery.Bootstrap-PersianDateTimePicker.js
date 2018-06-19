/*
 * bootstrap persian date time picker jQuery Plugin
 * version : 2.3.1.0
 * https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
 *
 *
 * Written By Mohammad Dayyan, from Dey 1393
 * mds.soft@gmail.com - @mdssoft
 *
 * My weblog: mds-soft.persianblog.ir
 */

(function ($) {

  var mdPluginName = 'MdPersianDateTimePicker',
    mdDateTimePickerFlagAttributeName = 'data-mdpersiandatetimepicker',
    mdDateTimePickerFlagSelector = '[' + mdDateTimePickerFlagAttributeName + ']',
    mdDateTimeIsShowingAttributeName = 'data-mdpersiandatetimepickershowing',
    mdSelectedDateTimeAttributeName = 'data-mdpersiandatetimepickerselecteddatetime',
    mdDateTimePickerWrapperAttribute = 'data-name="md-persiandatetimepicker"',
    mdDateTimePickerWrapperSelector = '[' + mdDateTimePickerWrapperAttribute + ']',
    isFirstTime = true,
    amPmEnumEnum = {
      AM: 0,
      PM: 1,
      None: 2
    },
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

  function getGregorianWeekDayName(englishWeekDayIndex) {
    //var culture = navigator.language || navigator.userLanguage;
    switch (englishWeekDayIndex) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }

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

  function getFirstDayOfPersianWeek(persianYear, persianMonth) {
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

  function getFirstDayOfGregorianWeek(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function getTodayCalendarInPersian() {
    var today = new Date(),
      persianDate = toJalaali(today.getFullYear(), today.getMonth() + 1, today.getDate());
    //return [persianDate.jy, persianDate.jm, persianDate.jd, getPersianWeekDayNameWithEnglishIndex(today.getDay())];

    return {
      Year: persianDate.jy,
      Month: persianDate.jm,
      Day: persianDate.jd,
      Hour: today.getHours(),
      Minute: today.getMinutes(),
      Second: today.getSeconds(),
      WeekDayPersianName: getPersianWeekDayNameWithEnglishIndex(today.getDay())
    }
  }

  function getCalendarInPersian(year, month, day, hour, minute, second) {
    var persianDate = toJalaali(year, month, day);

    return {
      Year: persianDate.jy,
      Month: persianDate.jm,
      Day: persianDate.jd,
      Hour: hour,
      Minute: minute,
      Second: second,
      //            WeekDayPersianName: getPersianWeekDayNameWithEnglishIndex(date.getDay())
    }
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
    var str1 = inputNumber1.toString().trim();
    if (str1 == '') return '';
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
    if (inputNumber2 == undefined) return '';
    var str = inputNumber2.toString().trim();
    if (str == "") return "";
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

  function getGregorianMonth(monthNumber) {
    switch (monthNumber) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "";
    }
  }

  function increaseOneMonth(dateObject, isGregorian) {
    if (isGregorian) {
      var date = new Date(dateObject.Year, dateObject.Month, dateObject.Day);
      date.setMonth(date.getMonth() + 1);
      dateObject.Year = date.getFullYear();
      dateObject.Month = date.getMonth();
    } else {
      dateObject.Month = dateObject.Month + 1;
      if (dateObject.Month > 12) {
        dateObject.Month = 1;
        dateObject.Year = dateObject.Year + 1;
      }
    }
  }

  function increaseOneYear(dateObject, isGregorian) {
    if (isGregorian) {
      var date = new Date(dateObject.Year, dateObject.Month, dateObject.Day);
      date.setYear(date.getFullYear() + 1);
      dateObject.Year = date.getFullYear();
    } else {
      dateObject.Year = dateObject.Year + 1;
    }
  }

  function decreaseOneMonth(dateObject, isGregorian) {
    if (isGregorian) {
      var date = new Date(dateObject.Year, dateObject.Month, dateObject.Day);
      date.setMonth(date.getMonth() - 1);
      dateObject.Year = date.getFullYear();
      dateObject.Month = date.getMonth();
    } else {
      dateObject.Month = dateObject.Month - 1;
      if (dateObject.Month < 1) {
        dateObject.Month = 12;
        dateObject.Year = dateObject.Year - 1;
      }
    }
  }

  function decreaseOneYear(dateObject, isGregorian) {
    if (isGregorian) {
      var date = new Date(dateObject.Year, dateObject.Month, dateObject.Day);
      date.setYear(date.getFullYear() - 1);
      dateObject.Year = date.getFullYear();
    } else {
      dateObject.Year = dateObject.Year - 1;
    }
  }

  function switchDatetime(dateObject, isGregorian) {
    if (isGregorian) {
      return dateObject = getGregorianFromJalaali(dateObject.Year, dateObject.Month, dateObject.Day, dateObject.Hour, dateObject.Minute, dateObject.Second);
    } else {
      return dateObject = getCalendarInPersian(dateObject.Year, dateObject.Month + 1, dateObject.Day, dateObject.Hour, dateObject.Minute, dateObject.Second);
    }
  }

  function getGregorianFromJalaali(year, month, day, hour, minute, second) {

    var gregorianDateObject = toGregorian(year, month, day);
    return {
      Year: gregorianDateObject.gy,
      Month: gregorianDateObject.gm - 1,
      Day: gregorianDateObject.gd,
      Hour: hour,
      Minute: minute,
      Second: second
    };

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

  function getDefaultFormat(enableTimePicker) {
    var defaultFormat = 'yyyy/MM/dd';
    if (enableTimePicker)
      defaultFormat += ' HH:mm:ss';
    return defaultFormat;
  }

  function getDateTimeString(dateTimeInJsonFormat, format, isEnglishNumber, isGregorian) {
    var gregorian = isGregorian ?
      new Date(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day, dateTimeInJsonFormat.Hour, dateTimeInJsonFormat.Minute, dateTimeInJsonFormat.Second) :
      toGregorian(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day),
      miladiDate = isGregorian ? gregorian : new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, dateTimeInJsonFormat.Hour, dateTimeInJsonFormat.Minute, dateTimeInJsonFormat.Second),
      selectedDateTimeString = format;

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

    selectedDateTimeString = selectedDateTimeString.replace(/yyyy/mg, dateTimeInJsonFormat.Year);
    selectedDateTimeString = selectedDateTimeString.replace(/yy/mg, dateTimeInJsonFormat.Year % 100);
    selectedDateTimeString = selectedDateTimeString.replace(/MMMM/mg, isGregorian ? getGregorianMonth(dateTimeInJsonFormat.Month) : getPersianMonth(dateTimeInJsonFormat.Month));
    selectedDateTimeString = selectedDateTimeString.replace(/MM/mg, isGregorian ? zeroPad(dateTimeInJsonFormat.Month + 1) : zeroPad(dateTimeInJsonFormat.Month));
    selectedDateTimeString = selectedDateTimeString.replace(/M/mg, isGregorian ? dateTimeInJsonFormat.Month + 1 : dateTimeInJsonFormat.Month);
    selectedDateTimeString = selectedDateTimeString.replace(/dddd/mg, isGregorian ? getGregorianWeekDayName(miladiDate.getDay()) : getPersianWeekDayNameWithEnglishIndex(miladiDate.getDay()));
    selectedDateTimeString = selectedDateTimeString.replace(/dd/mg, zeroPad(dateTimeInJsonFormat.Day));
    selectedDateTimeString = selectedDateTimeString.replace(/d/mg, dateTimeInJsonFormat.Day);
    selectedDateTimeString = selectedDateTimeString.replace(/HH/mg, zeroPad(miladiDate.getHours()));
    selectedDateTimeString = selectedDateTimeString.replace(/H/mg, miladiDate.getHours());
    selectedDateTimeString = selectedDateTimeString.replace(/hh/mg, zeroPad(getShortHour(miladiDate.getHours())));
    selectedDateTimeString = selectedDateTimeString.replace(/h/mg, zeroPad(miladiDate.getHours()));
    selectedDateTimeString = selectedDateTimeString.replace(/mm/mg, zeroPad(miladiDate.getMinutes()));
    selectedDateTimeString = selectedDateTimeString.replace(/m/mg, miladiDate.getMinutes());
    selectedDateTimeString = selectedDateTimeString.replace(/ss/mg, zeroPad(miladiDate.getSeconds()));
    selectedDateTimeString = selectedDateTimeString.replace(/s/mg, miladiDate.getSeconds());
    selectedDateTimeString = selectedDateTimeString.replace(/fff/mg, zeroPad(miladiDate.getMilliseconds(), '000'));
    selectedDateTimeString = selectedDateTimeString.replace(/ff/mg, zeroPad(miladiDate.getMilliseconds() / 10));
    selectedDateTimeString = selectedDateTimeString.replace(/f/mg, miladiDate.getMilliseconds() / 100);
    selectedDateTimeString = selectedDateTimeString.replace(/tt/mg, getAmPm(miladiDate.getHours(), isGregorian));
    selectedDateTimeString = selectedDateTimeString.replace(/t/mg, getAmPm(miladiDate.getHours(), isGregorian)[0]);

    if (!isEnglishNumber)
      selectedDateTimeString = toPersianNumber(selectedDateTimeString);

    return selectedDateTimeString;
  }

  function setTargetValue($popoverDescriber, dateTimeInJsonFormat, isGregorian) {
    var targetSelector = $popoverDescriber.attr('data-targetselector'),
      $target = $(targetSelector),
      format = $popoverDescriber.attr('data-mdformat'),
      englishNumber = isGregorian || $popoverDescriber.attr('data-englishnumber') == 'true',
      value = getDateTimeString(dateTimeInJsonFormat, format, englishNumber, isGregorian);
    if ($target.is('input'))
      $target.val(value);
    else
      $target.html(value);
    $popoverDescriber.attr(mdSelectedDateTimeAttributeName, JSON.stringify(dateTimeInJsonFormat));
    $target.trigger('change');
  }

  function setTargetValue1($target, value, senderObject) {
    if ($target.is('input')) {
      $target.val(value);
      var $senderObject = $(senderObject);
      if ($senderObject.attr('data-inline') == 'true') {
        var isGregorian = $senderObject.attr('data-isgregorian') == 'true',
          dateTimeInJsonFormat = {};
        if (isGregorian) {
          var dateTime = parseGregorianDateTime(value);
          dateTimeInJsonFormat.Year = dateTime.getFullYear();
          dateTimeInJsonFormat.Month = dateTime.getMonth();
          dateTimeInJsonFormat.Day = dateTime.getDate();
          dateTimeInJsonFormat.Hour = dateTime.getHours();
          dateTimeInJsonFormat.Minute = dateTime.getMinutes();
          dateTimeInJsonFormat.Second = dateTime.getSeconds();
        } else
          dateTimeInJsonFormat = parsePersianDateTime(value);
        updateDateTimePickerHtml($senderObject.find('thead'), changeDateTimeEnum.OnEvent, isGregorian,
          dateTimeInJsonFormat.Month,
          dateTimeInJsonFormat.Year,
          dateTimeInJsonFormat.Day);
      }
    } else
      $target.html(value);
  }

  function getTargetValue($popoverDescriber) {
    var targetSelector = $popoverDescriber.attr('data-targetselector'),
      $target = $(targetSelector),
      value;
    if ($target.is('input'))
      value = $target.val().trim();
    else
      value = $target.text().trim();
    return toEnglishNumber(value);
  }

  function getTargetDate($target, isGregorian) {
    var targetValue = toEnglishNumber(getTargetValue1($target));
    if (targetValue == '') return undefined;
    if (isGregorian)
      return parseGregorianDateTime(targetValue);
    var dateTimeInJsonFormat = parsePersianDateTime(targetValue),
      gregorianJson = toGregorian(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day);
    return new Date(gregorianJson.gy, gregorianJson.gm - 1, gregorianJson.gd, dateTimeInJsonFormat.Hour, dateTimeInJsonFormat.Minute, dateTimeInJsonFormat.Second);
  }

  function getTargetValue1($target) {
    var targetValue;
    if ($target.is('input'))
      targetValue = $target.val();
    else
      targetValue = $target.text();
    return targetValue.trim();
  }


  function createDateTimeJson(year, month, day, hour, minute, second) {
    if (!isNumber(hour)) hour = 0;
    if (!isNumber(minute)) minute = 0;
    if (!isNumber(second)) second = 0;
    return {
      Year: year,
      Month: month,
      Day: day,
      Hour: hour,
      Minute: minute,
      Second: second
    };
  }

  // تبدیل تاریخ به عدد برای مقایسه
  function convertToNumber(year, month, day) {
    return Number(zeroPad(year) + zeroPad(month) + zeroPad(day));
  }

  // تصحیح عدد روز بر اساس ماه و سال
  function fixPersianDate(year, month, day) {
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

  function parsePersianDateTime(persianDateTimeInString, dateSeperatorPattern) {
    var persianDateTime = getTodayCalendarInPersian();
    if (persianDateTimeInString == '')
      return createDateTimeJson(persianDateTime.Year, persianDateTime.Month, persianDateTime.Day, persianDateTime.Hour, persianDateTime.Minute, persianDateTime.Second);

    if (dateSeperatorPattern == undefined || dateSeperatorPattern == '')
      dateSeperatorPattern = "\/|-";
    dateSeperatorPattern = new RegExp(dateSeperatorPattern, 'mg');
    //Convert persian and arabic digit to english to avoid throwing exception in Parse method
    persianDateTimeInString = toEnglishNumber(persianDateTimeInString);

    var month = '0',
      year = '0',
      day = '0',
      hour = '0',
      minute = '0',
      second = '0',
      miliSecond = '0';
    var amPmEnum = amPmEnumEnum.None,
      containMonthSeperator = dateSeperatorPattern.test(persianDateTimeInString);

    persianDateTimeInString = persianDateTimeInString.replace(/&nbsp;/img, " ");
    persianDateTimeInString = persianDateTimeInString.replace(/\s+/img, "-");
    persianDateTimeInString = persianDateTimeInString.replace(/\\/img, "-");
    persianDateTimeInString = persianDateTimeInString.replace(/ك/img, "ک");
    persianDateTimeInString = persianDateTimeInString.replace(/ي/img, "ی");
    persianDateTimeInString = persianDateTimeInString.replace(dateSeperatorPattern, "-");
    persianDateTimeInString = '-' + persianDateTimeInString + '-';

    // بدست آوردن ب.ظ یا ق.ظ
    if (persianDateTimeInString.indexOf('ق.ظ') > -1)
      amPmEnum = amPmEnum.AM;
    else if (persianDateTimeInString.indexOf('ب.ظ') > -1)
      amPmEnum = amPmEnum.PM;

    if (persianDateTimeInString.indexOf(':') > -1) // رشته ورودی شامل ساعت نیز هست
    {
      persianDateTimeInString = persianDateTimeInString.replace(/-*:-*/img, ":");
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
        var persianMonthName = getPersianMonth(i);
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

    return createDateTimeJson(numericYear, numericMonth, numericDay, numericHour, numericMinute, numericSecond, numericMiliSecond);
  }

  function parsePersianFromDateToDateValues(fromDateString, toDateString) {
    if ((toDateString == undefined || toDateString == '') &&
      (fromDateString == undefined || fromDateString == '')) return undefined;

    var fromDate = parsePersianDateTime(fromDateString),
      toDate = parsePersianDateTime(toDateString);

    return {
      FromDateNumber: convertToNumber(fromDate.Year, fromDate.Month, fromDate.Day),
      FromDateObject: fromDate,
      ToDateNumber: convertToNumber(toDate.Year, toDate.Month, toDate.Day),
      ToDateObject: toDate
    };
  }

  function parseGregorianDateTime(gregorianDateTimeString) {
    //بدست آوردن تاریخ قبلی که در تکست باکس وجود داشته
    gregorianDateTimeString = toEnglishNumber(gregorianDateTimeString);
    if (gregorianDateTimeString.trim() == '') {
      var dateTime = new Date();
      dateTime.setHours(0);
      dateTime.setMinutes(0);
      dateTime.setSeconds(0);
      dateTime.setMilliseconds(0);
      return dateTime;
    }
    return new Date(gregorianDateTimeString);
  }

  // درست کردن اچ تی ام ال دیت تایم پیکر
  // مقدار برگشتی تعیین میکند آیا مقدار تاریخ باید به روز شود یا نه
  function createPersianDateTimePickerHtml($popoverDescriber, dateTimeInJsonFormat, writeDateString, initializing) {
    var triggerName = $popoverDescriber.attr('data-trigger'),
      persianTodayDateTemp = getTodayCalendarInPersian(), // تاریخ شمسی امروز
      currentYearNumber = persianTodayDateTemp.Year,
      currentMonthNumber = persianTodayDateTemp.Month,
      currentDayNumber = persianTodayDateTemp.Day,
      todayDateNumber = convertToNumber(currentYearNumber, currentMonthNumber, currentDayNumber),
      todayDateTimeString = 'امروز، ' + persianTodayDateTemp.WeekDayPersianName + ' ' + toPersianNumber(currentDayNumber) + ' ' + getPersianMonth(currentMonthNumber) + ' ' + toPersianNumber(currentYearNumber),
      $calendarMainTable = $('<table class="table table-striped" />'),
      $calendarMainTableBody = $('<tbody />'),
      $calendarHeader = $('<thead><tr><td colspan="100" style="padding:5px;"><table class="table" data-name="md-persiandatetimepicker-headertable"><tr><td><button type="button" class="btn btn-default btn-xs" title="سال بعد" data-name="md-persiandatetimepicker-nextyear">&lt;&lt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="ماه بعد" data-name="md-persiandatetimepicker-nextmonth">&lt;</button></td><td><div class="dropdown" style="min-width:50px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianYear" data-toggle="dropdown" aria-expanded="true" data-name="md-persiandatetimepicker-titleyear">1393</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianYear"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-yearnumber">1394</a></li></ul></div></td><td ><div class="dropdown" style="min-width:73px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianMonths" data-toggle="dropdown" aria-expanded="true" data-name="md-persiandatetimepicker-titlemonth">نام ماه</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianMonths"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="1">فروردین</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="2">اردیبهشت</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="3">خرداد</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="4">تیر</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="5">مرداد</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="6">شهریور</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="7">مهر</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="8">آبان</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="9">آذر</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="10">دی</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="11">بهمن</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="12">اسفند</a></li></ul></div></td><td><button type="button" class="btn btn-default btn-xs" title="ماه قبل" data-name="md-persiandatetimepicker-previousmonth">&gt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="سال قبل" data-name="md-persiandatetimepicker-previousyear">&gt;&gt;</button></td></tr></table></td></tr><tr data-name="md-persiandatetimepicker-weekdaysnames"><td>ش</td><td>ی</td><td>د</td><td>س</td><td>چ</td><td>پ</td><td class="text-danger">ج</td></tr></thead>'),
      $monthsTitlesDropDown = $calendarHeader.find('.dropdown-menu[aria-labelledby="dropdownMenuPersianMonths"]'),
      $calendarTimePicker = $('<tr><td colspan="100" style="padding: 2px;"><table class="table" data-name="md-persiandatetimepicker-timepicker"><tr><td><input type="number" class="form-control" data-name="clock-hour" min="0" max="23" /></td><td>:</td><td><input type="number" class="form-control" data-name="clock-minute" min="0" max="59" /></td><td>:</td><td><input type="number" class="form-control" data-name="clock-second" min="0" max="59" /></td></tr></table></td></tr>'),
      $calendarFooter = $('<tfoot><tr><td colspan="100"><a class="" href="javascript:void(0);" data-name="go-today">' + todayDateTimeString + '</a></td></tr></tfoot>'),
      $calendarDivWrapper = $('<div ' + mdDateTimePickerWrapperAttribute + ' />'),
      enableTimePicker = $popoverDescriber.attr('data-enabletimepicker') == 'true',
      isFromDate = $popoverDescriber.attr('data-fromdate'),
      isToDate = $popoverDescriber.attr('data-todate'),
      groupId = $popoverDescriber.attr('data-groupid'),
      disableBeforeToday = $popoverDescriber.attr('data-disablebeforetoday') == 'true',
      fromDateString = '',
      toDateString = '',
      fromDateToDateJson = undefined,
      $nextMonthButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-nextmonth"]'),
      $nextYearButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-nextyear"]'),
      $previousMonthButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-previousmonth"]'),
      $previousYearButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-previousyear"]');

    // اگر متغیر زیر تعریف نشده بود مقدار را از داخل تارگت گرفته و استفاده می کند
    if (dateTimeInJsonFormat == undefined) {
      var selectedDateTimeValue = $popoverDescriber.attr(mdSelectedDateTimeAttributeName);
      if (selectedDateTimeValue != undefined && selectedDateTimeValue.trim() != '') {
        try {
          dateTimeInJsonFormat = JSON.parse(selectedDateTimeValue);
        } catch (e) {
          dateTimeInJsonFormat = parsePersianDateTime(getTargetValue($popoverDescriber));
        }
      } else
        dateTimeInJsonFormat = parsePersianDateTime(getTargetValue($popoverDescriber));
    }

    var fixedDate = fixPersianDate(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day),
      currentDateNumber = convertToNumber(fixedDate.Year, fixedDate.Month, fixedDate.Day);
    dateTimeInJsonFormat.Year = fixedDate.Year;
    dateTimeInJsonFormat.Month = fixedDate.Month;
    dateTimeInJsonFormat.Day = fixedDate.Day;

    // افزودن دراپ داون سال
    var $yearDropDown = $calendarHeader.find('[aria-labelledby="dropdownMenuPersianYear"]');
    $yearDropDown.html('');

    var yearForDropDown = dateTimeInJsonFormat.Year;
    for (var k = yearForDropDown - 40; k <= yearForDropDown + 5; k++) {
      var $dropDownYear = $('<li role="presentation" data-year="' + k + '"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-yearnumber">' + toPersianNumber(k) + '</a></li>');
      if (k == currentYearNumber)
        $dropDownYear.addClass('bg-info');
      $yearDropDown.append($dropDownYear);
    }

    //بدست آوردن تاریخ قبلی که در تکست باکس وجود داشته
    if (enableTimePicker) {
      $calendarTimePicker.find('[data-name="clock-hour"]').val(zeroPad(dateTimeInJsonFormat.Hour));
      $calendarTimePicker.find('[data-name="clock-minute"]').val(zeroPad(dateTimeInJsonFormat.Minute));
      $calendarTimePicker.find('[data-name="clock-second"]').val(zeroPad(dateTimeInJsonFormat.Second));
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
    $calendarHeader.find('[data-name="md-persiandatetimepicker-titlemonth"]').html(persianMonthName);
    $calendarHeader.find('[data-name="md-persiandatetimepicker-titleyear"]').html(toPersianNumber(dateTimeInJsonFormat.Year));
    $calendarMainTable.append($calendarHeader);

    // from date, to date
    if (groupId != undefined && groupId != '') {
      if (isFromDate != undefined && isFromDate == 'true') { // $popoverDescriber is `from date`, so we have to find `to date`
        fromDateString = dateTimeInJsonFormat.Year.toString() + '/' + dateTimeInJsonFormat.Month.toString() + '/' + dateTimeInJsonFormat.Day.toString();
        var $toDatePopoverDescriber = $('[data-groupid="' + groupId + '"][data-todate]'),
          toDateTargetSelector = $toDatePopoverDescriber.attr('data-targetselector'),
          $toDateTarget = toDateTargetSelector != undefined && toDateTargetSelector != '' ? $(toDateTargetSelector) : $toDatePopoverDescriber;
        toDateString = $toDateTarget.val();
      } else if (isToDate != undefined && isToDate == 'true') { // $popoverDescriber is `to date`, so we have to find `from date`
        toDateString = dateTimeInJsonFormat.Year.toString() + '/' + dateTimeInJsonFormat.Month.toString() + '/' + dateTimeInJsonFormat.Day.toString();
        var $fromDatePopoverDescriber = $('[data-groupid="' + groupId + '"][data-fromdate]'),
          fromDateTargetSelector = $fromDatePopoverDescriber.attr('data-targetselector'),
          $fromDateTarget = fromDateTargetSelector != undefined && fromDateTargetSelector != '' ? $(fromDateTargetSelector) : $fromDatePopoverDescriber;
        fromDateString = $fromDateTarget.val();
      }
      if (toDateString != '' || fromDateString != '') {
        fromDateToDateJson = parsePersianFromDateToDateValues(fromDateString, toDateString);
        if (fromDateString == undefined || fromDateString.trim() == '') {
          fromDateToDateJson.FromDateObject = undefined;
          fromDateToDateJson.FromDateNumber = undefined;
        }
        if (toDateString == undefined || toDateString.trim() == '') {
          fromDateToDateJson.ToDateObject = undefined;
          fromDateToDateJson.ToDateNumber = undefined;
        }
      }

      // اگر از تاریخ انتخاب شده بزرگتر از - تا تاریخ - بود
      if (isFromDate && fromDateToDateJson.ToDateNumber != undefined && currentDateNumber > fromDateToDateJson.ToDateNumber && !initializing) {
        dateTimeInJsonFormat.Year = fromDateToDateJson.ToDateObject.Year;
        dateTimeInJsonFormat.Month = fromDateToDateJson.ToDateObject.Month;
        dateTimeInJsonFormat.Day = fromDateToDateJson.ToDateObject.Day;
        setTargetValue($popoverDescriber, dateTimeInJsonFormat);
        $popoverDescriber.trigger(triggerName);
        return '';
      }

      if (isToDate && fromDateToDateJson.FromDateNumber != undefined && currentDateNumber < fromDateToDateJson.FromDateNumber && !initializing) {
        dateTimeInJsonFormat.Year = fromDateToDateJson.FromDateObject.Year;
        dateTimeInJsonFormat.Month = fromDateToDateJson.FromDateObject.Month;
        dateTimeInJsonFormat.Day = fromDateToDateJson.FromDateObject.Day;
        setTargetValue($popoverDescriber, dateTimeInJsonFormat);
        $popoverDescriber.trigger(triggerName);
        return '';
      }
    }

    var i = 0,
      firstWeekDayNumber = getFirstDayOfPersianWeek(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month),
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
        $calendarMainTableBody.append($tr);
        isTrAppended = true;
        $tr = $('<tr />');
      }

      var dayNumberInString = toPersianNumber(zeroPad(i)),
        currentLoopDateNumber = convertToNumber(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, i),
        $td = $('<td data-name="day" />').html(dayNumberInString);

      // امروز
      if (currentLoopDateNumber == todayDateNumber) {
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
      if (
        fromDateToDateJson != undefined &&
        ((isToDate && fromDateToDateJson.FromDateNumber != undefined && currentLoopDateNumber < fromDateToDateJson.FromDateNumber) ||
          (isFromDate && fromDateToDateJson.ToDateNumber != undefined && currentLoopDateNumber > fromDateToDateJson.ToDateNumber))
      )
        $td.attr('data-name', 'disabled-day');

      // روزهای غیر فعال شده
      if (disableBeforeToday && currentLoopDateNumber < todayDateNumber)
        $td.attr('data-name', 'disabled-day');

      $tr.append($td);
      isTrAppended = false;

      tdNumber++;
      cellNumber++;
    }

    $previousMonthButton.removeClass('disabled').removeAttr('disabled');
    $previousYearButton.removeClass('disabled').removeAttr('disabled');
    $nextMonthButton.removeClass('disabled').removeAttr('disabled');
    $nextYearButton.removeClass('disabled').removeAttr('disabled');

    //بررسی دکمه های غیرفعال قبل از امروز
    if (disableBeforeToday && currentYearNumber == dateTimeInJsonFormat.Year && currentMonthNumber >= dateTimeInJsonFormat.Month) {
      $previousMonthButton.addClass('disabled').attr('disabled', 'disabled');
      $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
    }

    if (disableBeforeToday && currentYearNumber >= dateTimeInJsonFormat.Year) {
      $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
    }

    // غیر فعال کردن دکمه های ماه بعد و سال بعد و یا ماه قبل و سال قبل
    if (fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined) {

      // دکمه های ماه قبل و سال قبل
      if (isToDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year && fromDateToDateJson.FromDateObject.Month >= fromDateToDateJson.ToDateObject.Month) {
        $previousMonthButton.addClass('disabled').attr('disabled', 'disabled');
        $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      if (isToDate && fromDateToDateJson.FromDateObject.Year >= fromDateToDateJson.ToDateObject.Year) {
        $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      // دکمه های سال بعد و ماه بعد

      if (isFromDate && fromDateToDateJson.ToDateObject.Year == fromDateToDateJson.FromDateObject.Year &&
        fromDateToDateJson.ToDateObject.Month <= fromDateToDateJson.FromDateObject.Month) {
        $nextMonthButton.addClass('disabled').attr('disabled', 'disabled');
        $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      if (isFromDate && fromDateToDateJson.ToDateObject.Year <= fromDateToDateJson.FromDateObject.Year) {
        $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      // غیر فعال کردن ماه های خارج از رنج
      $monthsTitlesDropDown.find('a[data-monthnumber]').each(function () {
        var $thisA = $(this),
          month = Number($thisA.attr('data-monthnumber')),
          $li = $thisA.parents('li:first');
        if (isToDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year &&
          fromDateToDateJson.FromDateObject.Month > month) {
          $li.addClass('disabled').children('a').attr('disabled', 'disabled');
        }
        if (isFromDate && fromDateToDateJson.FromDateObject.Year == fromDateToDateJson.ToDateObject.Year &&
          fromDateToDateJson.ToDateObject.Month < month) {
          $li.addClass('disabled').children('a').attr('disabled', 'disabled');
        }
      });
    }
    // \\

    // غیر فعال کردن سال های خارج از رنج
    $yearDropDown.find('li[data-year]').each(function () {
      var $thisLi = $(this),
        year = Number($thisLi.attr('data-year'));
      if ((fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined && isFromDate && year > fromDateToDateJson.ToDateObject.Year) ||
        (fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined && isToDate && year < fromDateToDateJson.FromDateObject.Year) ||
        (disableBeforeToday && year < currentYearNumber))
        $thisLi.addClass('disabled').children('a').attr('disabled', 'disabled');
      else
        $thisLi.removeClass('disabled').children('a').removeAttr('disabled');
    });

    // روزهای ماه بعد
    if (cellNumber < 42) {
      for (i = 1; i <= 42 - cellNumber; i++) {
        if (tdNumber >= 7) {
          tdNumber = 0;
          $calendarMainTableBody.append($tr);
          isTrAppended = true;
          $tr = $('<tr />');
        } else if (!isTrAppended) {
          $calendarMainTableBody.append($tr);
          isTrAppended = true;
        }
        $tr.append($('<td data-name="disabled-day" />').html(toPersianNumber(zeroPad(i))));
        tdNumber++;
      }
    }

    if (enableTimePicker)
      $calendarMainTableBody.append($calendarTimePicker);
    $calendarMainTable.append($calendarMainTableBody);
    $calendarMainTable.append($calendarFooter);
    $calendarDivWrapper.append($calendarMainTable);

    // عوض کردن عنوان popover
    $('[data-name="md-datetimepicker-title"]').html(dayOfWeek + '، ' + toPersianNumber(zeroPad(dateTimeInJsonFormat.Day)) + ' ' + persianMonthName + ' ' + toPersianNumber(zeroPad(dateTimeInJsonFormat.Year)));

    // آیا محتویات تکس باکس باید تغییر کند ؟
    if (writeDateString) {
      if (fromDateToDateJson != undefined) {
        var selectedDateNumber = convertToNumber(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day); // تاریخ انتخاب شده فعلی
        if (!((isToDate && fromDateToDateJson.FromDateNumber != undefined && selectedDateNumber < fromDateToDateJson.FromDateNumber) ||
            (isFromDate && fromDateToDateJson.ToDateNumber != undefined && selectedDateNumber > fromDateToDateJson.ToDateNumber))) {
          setTargetValue($popoverDescriber, dateTimeInJsonFormat);
        }
      } else {
        setTargetValue($popoverDescriber, dateTimeInJsonFormat);
      }
    }

    $popoverDescriber.attr(mdSelectedDateTimeAttributeName, JSON.stringify(dateTimeInJsonFormat));

    return $calendarDivWrapper;
  }

  function createGregorianDateTimePickerHtml($popoverDescriber, dateTimeInJsonFormat, writeDateString, initializing) {
    var triggerName = $popoverDescriber.attr('data-trigger'),
      gregorianDateTime = new Date(),
      todayGregorianDateTime = new Date(), // تاریخ امروز
      currentYearNumber = todayGregorianDateTime.getFullYear(),
      currentMonthNumber = todayGregorianDateTime.getMonth(),
      todayDateTimeString = 'Today; ' + todayGregorianDateTime.toDateString(),
      $calendarMainTable = $('<table class="table table-striped" />'),
      $calendarMainTableBody = $('<tbody />'),
      $calendarHeader = $('<thead><tr><td colspan="100" style="padding:5px;"><table class="table" data-name="md-persiandatetimepicker-headertable"><tr><td><button type="button" class="btn btn-default btn-xs" title="Next Year" data-name="md-persiandatetimepicker-nextyear">&lt;&lt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="Next Month" data-name="md-persiandatetimepicker-nextmonth">&lt;</button></td><td><div class="dropdown" style="min-width:50px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianYear" data-toggle="dropdown" aria-expanded="true" data-name="md-persiandatetimepicker-titleyear">2016</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianYear"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-yearnumber">2016</a></li></ul></div></td><td><div class="dropdown" style="min-width:73px;"><button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuPersianMonths" data-toggle="dropdown" aria-expanded="true" data-name="md-persiandatetimepicker-titlemonth">Month</button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenuPersianMonths"><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="0">January</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="1">February</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="2">March</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="3">April</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="4">May</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="5">June</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="6">July</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="7">August</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="8">September</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="9">October</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="10">November</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-monthname" data-monthnumber="11">December</a></li></ul></div></td><td><button type="button" class="btn btn-default btn-xs" title="Previous Month" data-name="md-persiandatetimepicker-previousmonth">&gt;</button></td><td><button type="button" class="btn btn-default btn-xs" title="Previous Year" data-name="md-persiandatetimepicker-previousyear">&gt;&gt;</button></td></tr></table></td></tr><tr data-name="md-persiandatetimepicker-weekdaysnames"><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td class="text-danger">Fr</td><td>Sa</td></tr></thead>'),
      $monthsTitlesDropDown = $calendarHeader.find('.dropdown-menu[aria-labelledby="dropdownMenuPersianMonths"]'),
      $calendarTimePicker = $('<tr><td colspan="100" style="padding: 2px;"><table class="table" data-name="md-persiandatetimepicker-timepicker"><tr><td><input type="number" class="form-control" data-name="clock-hour" min="0" max="23" /></td><td>:</td><td><input type="number" class="form-control" data-name="clock-minute" min="0" max="59" /></td><td>:</td><td><input type="number" class="form-control" data-name="clock-second" min="0" max="59" /></td></tr></table></td></tr>'),
      $calendarFooter = $('<tfoot><tr><td colspan="100"><a class="" href="javascript:void(0);" data-name="go-today">' + todayDateTimeString + '</a></td></tr></tfoot>'),
      $calendarDivWrapper = $('<div ' + mdDateTimePickerWrapperAttribute + ' data-isgregorian="true" />'),
      enableTimePicker = $popoverDescriber.attr('data-enabletimepicker') == 'true',
      isFromDate = $popoverDescriber.attr('data-fromdate'),
      isToDate = $popoverDescriber.attr('data-todate'),
      groupId = $popoverDescriber.attr('data-groupid'),
      disableBeforeToday = $popoverDescriber.attr('data-disablebeforetoday') == 'true',
      gregorianStartDayIndex = Number($popoverDescriber.attr('data-gregorianstartdayindex')),
      fromDateToDateJson = undefined,
      $nextMonthButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-nextmonth"]'),
      $nextYearButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-nextyear"]'),
      $previousMonthButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-previousmonth"]'),
      $previousYearButton = $calendarHeader.find('[data-name="md-persiandatetimepicker-previousyear"]');

    // اگر متغیر زیر تعریف نشده بود مقدار را از داخل تارگت گرفته و استفاده می کند
    if (dateTimeInJsonFormat == undefined) {
      var selectedDateTimeValue = $popoverDescriber.attr(mdSelectedDateTimeAttributeName);
      if (selectedDateTimeValue != undefined && selectedDateTimeValue.trim() != '') {
        try {
          dateTimeInJsonFormat = JSON.parse(selectedDateTimeValue);
        } catch (e) {}
      } else {
        gregorianDateTime = parseGregorianDateTime(getTargetValue($popoverDescriber));
        dateTimeInJsonFormat = createDateTimeJson(gregorianDateTime.getFullYear(), gregorianDateTime.getMonth(),
          gregorianDateTime.getDate(), gregorianDateTime.getHours(), gregorianDateTime.getMinutes(),
          gregorianDateTime.getSeconds());
      }
    } else
      gregorianDateTime = new Date(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day, dateTimeInJsonFormat.Hour, dateTimeInJsonFormat.Minute, dateTimeInJsonFormat.Second);

    // افزودن دراپ داون سال
    var $yearDropDown = $calendarHeader.find('[aria-labelledby="dropdownMenuPersianYear"]');
    $yearDropDown.html('');

    var yearForDropDown = dateTimeInJsonFormat.Year;
    for (var k = yearForDropDown - 5; k <= yearForDropDown + 5; k++) {
      var $dropDownYear = $('<li role="presentation" data-year="' + k + '"><a role="menuitem" tabindex="-1" href="javascript:void(0);" data-name="md-persiandatetimepicker-yearnumber">' + k + '</a></li>');
      if (k == currentYearNumber)
        $dropDownYear.addClass('bg-info');
      $yearDropDown.append($dropDownYear);
    }

    //بدست آوردن ساعت قبلی که در تکست باکس وجود داشته
    if (enableTimePicker) {
      $calendarTimePicker.find('[data-name="clock-hour"]').val(zeroPad(gregorianDateTime.getHours()));
      $calendarTimePicker.find('[data-name="clock-minute"]').val(zeroPad(gregorianDateTime.getMinutes()));
      $calendarTimePicker.find('[data-name="clock-second"]').val(zeroPad(gregorianDateTime.getSeconds()));
    }

    // اطلاعات ماه جاری
    var numberOfDaysInCurrentMonth = new Date(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month + 1, 0).getDate();
    // اطلاعات ماه قبلی
    var previousMonthDateTime = new Date(new Date(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day).setMonth(dateTimeInJsonFormat.Month - 1)),
      numberOfDaysInPreviousMonth = new Date(previousMonthDateTime.getFullYear(), previousMonthDateTime.getMonth() + 1, 0).getDate();

    // بدست آوردن نام ماه و عدد سال
    // مثال: دی 1393
    var gregorianMonthName = getGregorianMonth(dateTimeInJsonFormat.Month);
    $calendarHeader.find('[data-name="md-persiandatetimepicker-titlemonth"]').html(gregorianMonthName);
    $calendarHeader.find('[data-name="md-persiandatetimepicker-titleyear"]').html(dateTimeInJsonFormat.Year);
    $calendarMainTable.append($calendarHeader);

    // from date, to date
    if (groupId != undefined && groupId != '') {
      var fromDateTime = null,
        toDateTime = null;
      if (fromDateToDateJson == undefined)
        fromDateToDateJson = {};
      if (isFromDate != undefined && isFromDate == 'true') { // $popoverDescriber is `from date`, so we have to find `to date`
        var $toDatePopoverDescriber = $('[data-groupid="' + groupId + '"][data-todate]'),
          toDateTargetValue = getTargetValue($toDatePopoverDescriber);
        toDateTime = toDateTargetValue == '' ? undefined : parseGregorianDateTime(toDateTargetValue);
        fromDateToDateJson.ToDateObject = toDateTime;
        fromDateToDateJson.FromDateObject = gregorianDateTime;
      } else if (isToDate != undefined && isToDate == 'true') { // $popoverDescriber is `to date`, so we have to find `from date`
        var $fromDatePopoverDescriber = $('[data-groupid="' + groupId + '"][data-fromdate]'),
          fromDateTargetValue = getTargetValue($fromDatePopoverDescriber);
        fromDateTime = fromDateTargetValue == '' ? undefined : parseGregorianDateTime(fromDateTargetValue);
        fromDateToDateJson.FromDateObject = fromDateTime;
        fromDateToDateJson.ToDateObject = gregorianDateTime;
      }

      // اگر از تاریخ انتخاب شده بزرگتر از - تا تاریخ - بود
      if (isFromDate != undefined && isFromDate == 'true' && toDateTime != null && gregorianDateTime > toDateTime && !initializing) {
        dateTimeInJsonFormat.Year = toDateTime.getFullYear();
        dateTimeInJsonFormat.Month = toDateTime.getMonth();
        dateTimeInJsonFormat.Day = toDateTime.getDate();
        setTargetValue($popoverDescriber, dateTimeInJsonFormat, true);
        $popoverDescriber.trigger(triggerName);
        return '';
      }

      if (isToDate != undefined && isToDate == 'true' && fromDateTime != null && gregorianDateTime < fromDateTime && !initializing) {
        dateTimeInJsonFormat.Year = fromDateTime.getFullYear();
        dateTimeInJsonFormat.Month = fromDateTime.getMonth();
        dateTimeInJsonFormat.Day = fromDateTime.getDate();
        setTargetValue($popoverDescriber, dateTimeInJsonFormat, true);
        $popoverDescriber.trigger(triggerName);
        return '';
      }
    }

    var i = 0,
      firstWeekDayNumber = getFirstDayOfGregorianWeek(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month),
      cellNumber = 0,
      tdIndex = 0,
      dayOfWeek = '', // نام روز هفته
      isTrAppended = true,
      $tr = $('<tr />');

    // روز های ماه پیش
    if (firstWeekDayNumber != gregorianStartDayIndex)
      for (i = firstWeekDayNumber; i > gregorianStartDayIndex; i--) {
        $tr.append($('<td data-name="disabled-day" />').html(zeroPad(numberOfDaysInPreviousMonth - i + 1)));
        cellNumber++;
        tdIndex++;
      }

    for (i = 1; i <= numberOfDaysInCurrentMonth; i++) {

      if (tdIndex >= 7) {
        tdIndex = 0;
        $calendarMainTableBody.append($tr);
        isTrAppended = true;
        $tr = $('<tr />');
      }

      var dayNumberInString = zeroPad(i),
        currentLoopDateObject = new Date(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, i),
        $td = $('<td data-name="day" />').html(dayNumberInString);

      // امروز
      if (currentLoopDateObject == todayGregorianDateTime) {
        $td.addClass('bg-primary').attr('data-name', 'today');
        // اگر نام روز هفته انخاب شده در تکس باکس قبل از تاریخ امروز باشد
        // نباید دیگر نام روز هفته تغییر کند
        if (dayOfWeek == '')
          dayOfWeek = getGregorianWeekDayName(tdIndex);
      }
      // روز از قبل انتخاب شده
      // روزی که در تکس باکس انتخاب شده
      else if (i == dateTimeInJsonFormat.Day) {
        $td.addClass('bg-info');
        dayOfWeek = getGregorianWeekDayName(tdIndex);
      }
      // روز جمعه
      else if (tdIndex > 0 && tdIndex % 5 == 0)
        $td.addClass('text-danger');

      // بررسی از تاریخ، تا تاریخ
      if (
        fromDateToDateJson != undefined &&
        (((isToDate != undefined && isToDate == 'true') && fromDateToDateJson.FromDateObject != undefined && currentLoopDateObject < fromDateToDateJson.FromDateObject) ||
          ((isFromDate != undefined && isFromDate == 'true') && fromDateToDateJson.ToDateObject != undefined && currentLoopDateObject > fromDateToDateJson.ToDateObject))
      )
        $td.attr('data-name', 'disabled-day');

      // روزهای غیر فعال شده
      if (disableBeforeToday && currentLoopDateObject < todayGregorianDateTime)
        $td.attr('data-name', 'disabled-day');

      $tr.append($td);
      isTrAppended = false;

      tdIndex++;
      cellNumber++;
    }

    $previousMonthButton.removeClass('disabled').removeAttr('disabled');
    $previousYearButton.removeClass('disabled').removeAttr('disabled');
    $nextMonthButton.removeClass('disabled').removeAttr('disabled');
    $nextYearButton.removeClass('disabled').removeAttr('disabled');

    //بررسی دکمه های غیرفعال قبل از امروز
    if (disableBeforeToday && currentYearNumber == dateTimeInJsonFormat.Year && currentMonthNumber >= dateTimeInJsonFormat.Month) {
      $previousMonthButton.addClass('disabled').attr('disabled', 'disabled');
      $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
    }

    if (disableBeforeToday && currentYearNumber >= dateTimeInJsonFormat.Year) {
      $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
    }

    // غیر فعال کردن دکمه های ماه بعد و سال بعد و یا ماه قبل و سال قبل
    if (fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined) {
      // دکمه های ماه قبل و سال قبل
      if (isToDate != undefined && isToDate == 'true' && fromDateToDateJson.FromDateObject.getFullYear() == fromDateToDateJson.ToDateObject.getFullYear() &&
        fromDateToDateJson.FromDateObject.getMonth() >= fromDateToDateJson.ToDateObject.getMonth()) {
        $previousMonthButton.addClass('disabled').attr('disabled', 'disabled');
        $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      if (isToDate != undefined && isToDate == 'true' && fromDateToDateJson.FromDateObject.getFullYear() >= fromDateToDateJson.ToDateObject.getFullYear()) {
        $previousYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      // دکمه های سال بعد و ماه بعد

      if (isFromDate != undefined && isFromDate == 'true' && fromDateToDateJson.ToDateObject.getFullYear() == fromDateToDateJson.FromDateObject.getFullYear() &&
        fromDateToDateJson.ToDateObject.getMonth() <= fromDateToDateJson.FromDateObject.getMonth()) {
        $nextMonthButton.addClass('disabled').attr('disabled', 'disabled');
        $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      if (isFromDate != undefined && isFromDate == 'true' && fromDateToDateJson.ToDateObject.getFullYear() <= fromDateToDateJson.FromDateObject.getFullYear()) {
        $nextYearButton.addClass('disabled').attr('disabled', 'disabled');
      }

      // غیر فعال کردن ماه های خارج از رنج
      $monthsTitlesDropDown.find('a[data-monthnumber]').each(function () {
        var $thisA = $(this),
          month = Number($thisA.attr('data-monthnumber')),
          $li = $thisA.parents('li:first');
        if (isToDate && fromDateToDateJson.FromDateObject.getFullYear() == fromDateToDateJson.ToDateObject.getFullYear() &&
          fromDateToDateJson.FromDateObject.getMonth() > month) {
          $li.addClass('disabled').children('a').attr('disabled', 'disabled');
        }
        if (isFromDate && fromDateToDateJson.FromDateObject.getFullYear() == fromDateToDateJson.ToDateObject.getFullYear() &&
          fromDateToDateJson.ToDateObject.getMonth() < month) {
          $li.addClass('disabled').children('a').attr('disabled', 'disabled');
        }
      });
    }
    // \\

    // غیر فعال کردن سال های خارج از رنج
    $yearDropDown.find('li[data-year]').each(function () {
      var $thisLi = $(this),
        year = Number($thisLi.attr('data-year'));
      if ((fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined && isFromDate && year > fromDateToDateJson.ToDateObject.getFullYear()) ||
        (fromDateToDateJson != undefined && fromDateToDateJson.FromDateObject != undefined && fromDateToDateJson.ToDateObject != undefined && isToDate && year < fromDateToDateJson.FromDateObject.getFullYear()) ||
        (disableBeforeToday && year < currentYearNumber))
        $thisLi.addClass('disabled').children('a').attr('disabled', 'disabled');
      else
        $thisLi.removeClass('disabled').children('a').removeAttr('disabled');
    });

    // روزهای ماه بعد
    if (cellNumber < 42) {
      for (i = 1; i <= 42 - cellNumber; i++) {
        if (tdIndex >= 7) {
          tdIndex = 0;
          $calendarMainTableBody.append($tr);
          isTrAppended = true;
          $tr = $('<tr />');
        } else if (!isTrAppended) {
          $calendarMainTableBody.append($tr);
          isTrAppended = true;
        }
        $tr.append($('<td data-name="disabled-day" />').html(zeroPad(i)));
        tdIndex++;
      }
    }

    if (enableTimePicker)
      $calendarMainTableBody.append($calendarTimePicker);
    $calendarMainTable.append($calendarMainTableBody);
    $calendarMainTable.append($calendarFooter);
    $calendarDivWrapper.append($calendarMainTable);

    // عوض کردن عنوان popover
    $('[data-name="md-datetimepicker-title"]').html(dayOfWeek + '، ' +
      zeroPad(dateTimeInJsonFormat.Day) + ' ' + gregorianMonthName + ' ' +
      zeroPad(dateTimeInJsonFormat.Year));

    // آیا محتویات تکس باکس باید تغییر کند ؟
    if (writeDateString) {
      if (fromDateToDateJson != undefined) {
        var selectedDateNumber = convertToNumber(dateTimeInJsonFormat.Year, dateTimeInJsonFormat.Month, dateTimeInJsonFormat.Day); // تاریخ انتخاب شده فعلی
        if (!((isToDate && fromDateToDateJson.FromDateNumber != undefined && selectedDateNumber < fromDateToDateJson.FromDateNumber) ||
            (isFromDate && fromDateToDateJson.ToDateNumber != undefined && selectedDateNumber > fromDateToDateJson.ToDateNumber))) {
          setTargetValue($popoverDescriber, dateTimeInJsonFormat, true);
        }
      } else {
        setTargetValue($popoverDescriber, dateTimeInJsonFormat, true);
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
    $(mdDateTimePickerFlagSelector).each(function () {
      var $thisPopover = $(this);
      if ($exceptThis != undefined && $exceptThis.is($thisPopover)) return;
      hidePopover($thisPopover);
    });
  };

  var isGregorianState = false;

  function updateDateTimePickerHtml(senderObject, changeEnum, isGregorian, newMonthNumber, newYearNumber, newDayNumber) {
    isGregorianState = (isGregorian == undefined || isGregorian == isGregorianState) ? isGregorianState : isGregorian;
    var $senderObject = $(senderObject),
      $mainBlock = $senderObject.parents('[data-mddatetimepicker="true"]:first'),
      inLine = $mainBlock.attr('data-inline') == 'true',
      $wrapper = $senderObject.parents(mdDateTimePickerWrapperSelector),
      $popoverDescriber = $wrapper.length > 0 ? $('[aria-describedby*="' + $wrapper.parents('.popover').attr('id') + '"]') : undefined,
      newDateTimeInJsonFormat = !inLine && $popoverDescriber != undefined && $popoverDescriber.length > 0 && $popoverDescriber.attr(mdSelectedDateTimeAttributeName) != undefined && $popoverDescriber.attr(mdSelectedDateTimeAttributeName) != '' ?
      JSON.parse($popoverDescriber.attr(mdSelectedDateTimeAttributeName)) :
      undefined,
      writeDateString = true;

    if (inLine) {
      $popoverDescriber = $mainBlock;
      newDateTimeInJsonFormat = JSON.parse($mainBlock.attr(mdSelectedDateTimeAttributeName));
      isGregorianState = $popoverDescriber.attr('data-isgregorian') == 'true';
    } else if (isGregorianState == undefined && $popoverDescriber != undefined && $popoverDescriber.length > 0)
      isGregorianState = $popoverDescriber.attr('data-isgregorian') == 'true';

    switch (changeEnum) {
      // ماه بعدی
      case changeDateTimeEnum.IncreaseMonth:
        increaseOneMonth(newDateTimeInJsonFormat, isGregorianState);
        break;

        // ماه قبلی
      case changeDateTimeEnum.DecreaseMonth:
        decreaseOneMonth(newDateTimeInJsonFormat, isGregorianState);
        break;

        // سال بعدی
      case changeDateTimeEnum.IncreaseYear:
        increaseOneYear(newDateTimeInJsonFormat, isGregorianState);
        break;

        // سال قبلی
      case changeDateTimeEnum.DecreaseYear:
        decreaseOneYear(newDateTimeInJsonFormat, isGregorianState);
        break;

        // برو به امروز
      case changeDateTimeEnum.GoToday:
        var todayDateTime = isGregorianState ? new Date() : parsePersianDateTime('');
        newDateTimeInJsonFormat.Year = isGregorianState ? todayDateTime.getFullYear() : todayDateTime.Year;
        newDateTimeInJsonFormat.Month = isGregorianState ? todayDateTime.getMonth() : todayDateTime.Month;
        newDateTimeInJsonFormat.Day = isGregorianState ? todayDateTime.getDate() : todayDateTime.Day;
        break;

        // تغییر در ساعت
      case changeDateTimeEnum.ClockChanged:
        newDateTimeInJsonFormat.Hour = $wrapper.find('input[data-name="clock-hour"]').val();
        newDateTimeInJsonFormat.Minute = $wrapper.find('input[data-name="clock-minute"]').val();
        newDateTimeInJsonFormat.Second = $wrapper.find('input[data-name="clock-second"]').val();
        if (newDateTimeInJsonFormat.Hour > 23)
          newDateTimeInJsonFormat.Hour = 0;
        if (newDateTimeInJsonFormat.Minute > 59)
          newDateTimeInJsonFormat.Minute = 0;
        if (newDateTimeInJsonFormat.Second > 59)
          newDateTimeInJsonFormat.Second = 0;
        setTargetValue($popoverDescriber, newDateTimeInJsonFormat, isGregorianState);
        return;

        // تغییر روز
      case changeDateTimeEnum.DayChanged:
        newDateTimeInJsonFormat.Day = Number(toEnglishNumber($senderObject.text().trim()));
        hidePopover($popoverDescriber);
        break;

        // هنگامی که رویداد 
        // trigger
        // رخ می دهد
      case changeDateTimeEnum.TriggerFired:
        writeDateString = false;
        $popoverDescriber = $senderObject;
        var $popover = $('#' + $popoverDescriber.attr('aria-describedby'));
        var $target = $($popoverDescriber.attr('data-targetselector'));
        if ($target.is(':input')) {
          if (isGregorianState) {
            var selectedDateTime = parseGregorianDateTime($target.val());
            newDateTimeInJsonFormat = createDateTimeJson(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate(), selectedDateTime.getHours(), selectedDateTime.getMinutes(), selectedDateTime.getSeconds());
          } else {
            newDateTimeInJsonFormat = parsePersianDateTime($target.val());
          }
        }
        $wrapper = $popover.find(mdDateTimePickerWrapperSelector);
        break;

        // تغییر ماه و سال و روز
      case changeDateTimeEnum.OnEvent:
        if (newMonthNumber != undefined)
          newDateTimeInJsonFormat.Month = newMonthNumber;
        if (newYearNumber != undefined)
          newDateTimeInJsonFormat.Year = newYearNumber;
        if (newDayNumber != undefined)
          newDateTimeInJsonFormat.Day = newDayNumber;
        break;
        //تغییر تقویم
      case changeDateTimeEnum.Switch:
        isGregorianState = !isGregorianState;
        $popoverDescriber.attr('data-isgregorian', isGregorianState);
        newDateTimeInJsonFormat = switchDatetime(newDateTimeInJsonFormat, isGregorianState);
        break;
    }

    $wrapper.replaceWith(isGregorianState ?
      createGregorianDateTimePickerHtml($popoverDescriber, newDateTimeInJsonFormat, writeDateString) :
      createPersianDateTimePickerHtml($popoverDescriber, newDateTimeInJsonFormat, writeDateString));
  }

  function bindEvents() {
    // کلیک روی روزها
    $(document).on('click', '[data-name="day"],[data-name="today"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.DayChanged);
    });

    // عوض کردن ماه با انتخاب نام ماه از روی دراپ داون
    $(document).on('click', '[data-name="md-persiandatetimepicker-monthname"]:not([disabled])', function () {
      var $this = $(this),
        selectedMonthNumber = Number($this.attr('data-monthnumber').trim());
      updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, undefined, selectedMonthNumber);
    });

    // کلیک روی دکمه ماه بعد
    $(document).on('click', '[data-name="md-persiandatetimepicker-nextmonth"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseMonth);
    });

    // کلیک روی دکمه ماه قبل
    $(document).on('click', '[data-name="md-persiandatetimepicker-previousmonth"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseMonth);
    });

    // عوض کردن سال با کلیک روی دراپ داون
    $(document).on('click', '[data-name="md-persiandatetimepicker-yearnumber"]:not([disabled])', function () {
      var $this = $(this),
        selectedYearNumber = Number(toEnglishNumber($this.text().trim()));
      updateDateTimePickerHtml(this, changeDateTimeEnum.OnEvent, undefined, undefined, selectedYearNumber);
    });

    // کلیک روی دکمه سال قبل
    $(document).on('click', '[data-name="md-persiandatetimepicker-previousyear"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.DecreaseYear);
    });

    // کلیک روی دکمه سال بعد
    $(document).on('click', '[data-name="md-persiandatetimepicker-nextyear"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.IncreaseYear);
    });

    // تغییر تقویم
    $(document).on('click', '[data-name="md-persiandatetimepicker-switch"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.Switch);
    });

    // تغییر ساعت ، دقیقه و یا ثانیه
    $(document).on('change', 'input[data-name^="clock"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.ClockChanged);
    });

    // کلیک روی دکمه امروز
    $(document).on('click', '[data-name="go-today"]', function () {
      updateDateTimePickerHtml(this, changeDateTimeEnum.GoToday);
    });
  }

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
    getDate: function () {
      var $this = $(this),
        settings = $this.data(mdPluginName),
        isGregorian = settings.IsGregorian != undefined ? settings.IsGregorian : false,
        $target = $(settings.TargetSelector);
      if ($target.length <= 0) throw 'TargetSelector is wrong, no elements found';
      return getTargetDate($target, isGregorian);
    },
    setDate: function (dateObject) {
      return this.each(function () {
        var $this = $(this),
          settings = $this.data(mdPluginName),
          isGregorian = settings.IsGregorian,
          dateTimeInJsonFormat,
          $target = $(settings.TargetSelector);
        if ($target.length <= 0) throw 'TargetSelector is wrong, no elements found';
        if (isGregorian)
          dateTimeInJsonFormat = createDateTimeJson(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), dateObject.getHours(), dateObject.getMinutes(), dateObject.getSeconds());
        else {
          var jalaliDate = toJalaali(dateObject.getFullYear(), dateObject.getMonth() + 1, dateObject.getDate());
          dateTimeInJsonFormat = createDateTimeJson(jalaliDate.jy, jalaliDate.jm, jalaliDate.jd, dateObject.getHours(), dateObject.getMinutes(), dateObject.getSeconds());
        }
        $this.attr(mdSelectedDateTimeAttributeName, JSON.stringify(dateTimeInJsonFormat));
        setTargetValue($this, dateTimeInJsonFormat, isGregorian);
      });
    },
    getValue: function () {
      var $this = $(this),
        settings = $this.data(mdPluginName),
        $target = $(settings.TargetSelector);
      if ($target.length <= 0) throw 'TargetSelector is wrong, no elements found';
      return getTargetValue1($target);
    },
    setValue: function (value) {
      return this.each(function () {
        var $this = $(this),
          settings = $this.data(mdPluginName),
          $target = $(settings.TargetSelector);
        setTargetValue1($target, value, this);
      });
    },
    hide: function () {
      return this.each(function () {
        hideOthers();
      });
    },
    show: function () {
      return this.each(function () {
        var $this = $(this),
          settings = $this.data(mdPluginName);
        $this.trigger(settings.Trigger);
      });
    },
    disable: function (isDisable) {
      return this.each(function () {
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
      $parentTarget1 = $target.parents(), // اگر المان کلیک شده دارای تارگت باشد
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
      hidePopover($(mdDateTimePickerFlagSelector));
  });

  //////////////////////////////////////////////////////////////
  /// فعال کرن خودکار پلاگین با گذاشتن اتریبیوت روی تگ ها
  //////////////////////////////////////////////////////////////

  this.EnableMdDateTimePickers = function () {
    var $dateTimePickers = $('[data-mddatetimepicker="true"]');
    $dateTimePickers.each(function () {
      var $this = $(this),
        trigger = $this.attr('data-trigger'),
        placement = $this.attr('data-Placement'),
        enableTimePicker = $this.attr('data-enabletimepicker'),
        targetSelector = $this.attr('data-targetselector'),
        groupId = $this.attr('data-groupid'),
        toDate = $this.attr('data-todate'),
        fromDate = $this.attr('data-fromdate'),
        disableBeforeToday = $this.attr('data-disablebeforetoday'),
        englishNumber = $this.attr('data-englishnumber'),
        disable = $this.attr('data-disabled') != undefined && $this.attr('data-disabled').toLowerCase() == 'true',
        format = $this.attr('data-mdformat'),
        gregorianStartDayIndex = $this.attr('data-gregorianstartdayindex') == undefined ? 0 : Number($this.attr('data-gregorianstartdayindex')),
        isGregorian = $this.attr('data-isgregorian') == 'true',
        inLine = $this.attr('data-inline') == 'true';
      if (!isNumber(gregorianStartDayIndex)) gregorianStartDayIndex = 0;
      if (!$this.is(':input') && $this.css('cursor') == 'auto') $this.css({
        cursor: 'pointer'
      });
      if (inLine) trigger = 'manual';
      if (trigger == undefined || trigger == '') trigger = 'click';
      var settings = {
        Placement: placement,
        EnglishNumber: englishNumber == 'true',
        Trigger: trigger,
        EnableTimePicker: enableTimePicker == 'true',
        TargetSelector: targetSelector != undefined ? targetSelector : '',
        GroupId: groupId != undefined ? groupId : '',
        ToDate: toDate != undefined ? toDate : '',
        FromDate: fromDate != undefined ? fromDate : '',
        DisableBeforeToday: disableBeforeToday == 'true',
        Disabled: disable,
        Format: format == undefined || format == '' ? getDefaultFormat(enableTimePicker == 'true') : format,
        GregorianStartDayIndex: gregorianStartDayIndex,
        IsGregorian: isGregorian,
        InLine: inLine
      };
      $this.MdPersianDateTimePicker(settings);
    });
  }

  $(document).ready(function () {
    EnableMdDateTimePickers();
  });

})(jQuery);