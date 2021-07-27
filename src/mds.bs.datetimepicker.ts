﻿import { Popover } from "bootstrap";

export class MdsPersianDateTimePicker {
  constructor(element: Element, setting: MdsPersianDateTimePickerSetting) {

    if (!setting) setting = new MdsPersianDateTimePickerSetting();
    if (setting.toDate && setting.fromDate) throw new Error(`MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together`);
    if (!setting.groupId && (setting.toDate || setting.fromDate)) throw new Error(`MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'`);
    
    this.bsPopover = new Popover(element, {
      container: 'body',
      content: '',
      html: true,
      placement: setting.placement,
      title: ' ',
      trigger: 'manual',
      template: this.popoverHtmlTemplate,
      sanitize: false,
    });
  }

  // #region jalali calendar

  private toJalali(gy: number, gm: number, gd: number) {
    return this.d2j(this.g2d(gy, gm, gd));
  }

  private toGregorian(jy: number, jm: number, jd: number) {
    return this.d2g(this.j2d(jy, jm, jd));
  }

  private isValidJalaliDate(jy: number, jm: number, jd: number) {
    return jy >= -61 && jy <= 3177 &&
      jm >= 1 && jm <= 12 &&
      jd >= 1 && jd <= this.jalaliMonthLength(jy, jm);
  }

  private isLeapJalaliYear(jy: number) {
    return this.jalCal(jy).leap === 0;
  }

  private jalaliMonthLength(jy: number, jm: number) {
    if (jm <= 6) return 31;
    if (jm <= 11) return 30;
    if (this.isLeapJalaliYear(jy)) return 30;
    return 29;
  }

  private jalCal(jy: number) {
    // Jalali years starting the 33-year rule.
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
      throw new Error('Invalid Jalali year ' + jy);

    // Find the limiting years for the Jalali year jy.
    for (i = 1; i < bl; i += 1) {
      jm = breaks[i];
      jump = jm - jp;
      if (jy < jm)
        break;
      leapJ = leapJ + this.div(jump, 33) * 8 + this.div(this.mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;

    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalali year in the Persian calendar.
    leapJ = leapJ + this.div(n, 33) * 8 + this.div(this.mod(n, 33) + 3, 4);
    if (this.mod(jump, 33) === 4 && jump - n === 4)
      leapJ += 1;

    // And the same in the Gregorian calendar (until the year gy).
    var leapG = this.div(gy, 4) - this.div((this.div(gy, 100) + 1) * 3, 4) - 150;

    // Determine the Gregorian date of Farvardin the 1st.
    var march = 20 + leapJ - leapG;

    // Find how many years have passed since the last leap year.
    if (jump - n < 6)
      n = n - jump + this.div(jump + 4, 33) * 33;
    leap = this.mod(this.mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;

    return {
      leap: leap,
      gy: gy,
      march: march
    };
  }

  private j2d(jy: number, jm: number, jd: number) {
    var r = this.jalCal(jy);
    return this.g2d(r.gy, 3, r.march) + (jm - 1) * 31 - this.div(jm, 7) * (jm - 7) + jd - 1;
  }

  private d2j(jdn: number) {
    var gy = this.d2g(jdn).gy, // Calculate Gregorian year (gy).
      jy = gy - 621,
      r = this.jalCal(jy),
      jdn1F = this.g2d(gy, 3, r.march),
      jd,
      jm,
      k;

    // Find number of days that passed since 1 Farvardin.
    k = jdn - jdn1F;
    if (k >= 0) {
      if (k <= 185) {
        // The first 6 months.
        jm = 1 + this.div(k, 31);
        jd = this.mod(k, 31) + 1;
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
      // Previous Jalali year.
      jy -= 1;
      k += 179;
      if (r.leap === 1)
        k += 1;
    }
    jm = 7 + this.div(k, 30);
    jd = this.mod(k, 30) + 1;
    return {
      jy: jy,
      jm: jm,
      jd: jd
    };
  }

  private g2d(gy: number, gm: number, gd: number) {
    var d = this.div((gy + this.div(gm - 8, 6) + 100100) * 1461, 4) +
      this.div(153 * this.mod(gm + 9, 12) + 2, 5) +
      gd - 34840408;
    d = d - this.div(this.div(gy + 100100 + this.div(gm - 8, 6), 100) * 3, 4) + 752;
    return d;
  }

  private d2g(jdn: number) {
    var j;
    j = 4 * jdn + 139361631;
    j = j + this.div(this.div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    var i = this.div(this.mod(j, 1461), 4) * 5 + 308;
    var gd = this.div(this.mod(i, 153), 5) + 1;
    var gm = this.mod(this.div(i, 153), 12) + 1;
    var gy = this.div(j, 1461) - 100100 + this.div(8 - gm, 6);
    return {
      gy: gy,
      gm: gm,
      gd: gd
    };
  }

  private div(a: number, b: number) {
    return ~~(a / b);
  }

  private mod(a: number, b: number) {
    return a - ~~(a / b) * b;
  }

  //#endregion jalali calendar

  // #region Variables

  private bsPopover: Popover;

  private mdPersianDateTimePickerFlag = 'data-mds-date-time-picker';
  private modalHtmlTemplate = `<div class="modal fade mds-bootstrap-persian-datetime-picker-modal" tabindex="-1" role="dialog" aria-labelledby="mdDateTimePickerModalLabel" aria-hidden="true" ${this.mdPersianDateTimePickerFlag}>
<div class="modal-dialog modal-xl modal-dialog-centered" data-buttonselector="">
<div class="modal-content">
<div class="modal-body" data-name="mds-datetimepicker-body">
MD DateTimePicker Html
</div>
</div>
</div>
</div>
  `;
  private popoverHtmlTemplate = `<div class="popover mds-bootstrap-persian-datetime-picker-popover" role="tooltip" ${this.mdPersianDateTimePickerFlag}>
<div class="arrow"></div>
<h3 class="popover-header text-center" data-name="mds-datetimepicker-title"></h3>
<div class="popover-body p-0" data-name="mds-datetimepicker-body"></div>
</div>`;
  private popoverHeaderSelectYearHtmlTemplate = `<table class="table table-sm table-borderless text-center p-0 m-0 {{rtlCssClass}}">
<tr>
<th>
<a href="javascript:void(0)" title="{{previousText}}" data-year="{{latestPreviousYear}}" data-yearrangebuttonchange="-1"> &lt; </a>
</th>
<th>
{{yearsRangeText}}
</th>
<th>
<a href="javascript:void(0)" title="{{nextText}}" data-year="{{latestNextYear}}" data-yearrangebuttonchange="1"> &gt; </a>
</th>
</tr>
</table>`;
  private dateTimePickerYearsToSelectHtmlTemplate = `<table class="table table-sm text-center p-0 m-0">
<tbody>
{{yearsToSelectHtml}}
</tbody>
</table>`;

  private dateTimePickerHtmlTemplate = `<div class="mds-bootstrap-persian-datetime-picker-container {{rtlCssClass}}" ${this.mdPersianDateTimePickerFlag}>
<div class="select-year-inline-box w-0" data-name="dateTimePickerYearsButtonsContainer">
</div>
<div class="select-year-box w-0" data-name="dateTimePickerYearsToSelectContainer">
</div>
<table class="table table-sm text-center p-0 m-0">
<thead>
<tr {{selectedDateStringAttribute}}>
<th colspan="100" data-selecteddatestring>{{selectedDateString}}</th>
</tr>
</thead>
<tbody>
<tr>
{{monthsTdHtml}}
</tr>
</tbody>
<tfoot>
<tr {{timePickerAttribute}}>
<td colspan="100" class="border-0">
<table class="table table-sm table-borderless">
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
<button type="button" class="btn btn-light" title="{{goTodayText}}" data-go-today>{{todayDateString}}</button>
</td>
</tr>
</tfoot>
</table>
</div>`;

  private dateTimePickerMonthTableHtmlTemplate = `<td class="border-0" style="{{monthTdStyle}}" {{monthTdAttribute}} data-td-month>
<table class="table table-sm table-striped table-borderless">
<thead>
<tr {{monthNameAttribute}}>
<th colspan="100" class="border-0">
<table class="table table-sm table-borderless">
<thead>
<tr>
<th>
<button type="button" class="btn btn-light"> {{currentMonthInfo}} </button>
</th>
</tr>
</thead>
</table>
</th>
</tr>
<tr {{theadSelectDateButtonTrAttribute}}>
<td colspan="100" class="border-0">
<table class="table table-sm table-borderless">
<tr>
<th>
<button type="button" class="btn btn-light btn-sm" title="{{previousYearText}}" data-changedatebutton data-number="{{previousYearButtonDateNumber}}" {{previousYearButtonDisabledAttribute}}> &lt;&lt; </button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm" title="{{previousMonthText}}" data-changedatebutton data-number="{{previousMonthButtonDateNumber}}" {{previousMonthButtonDisabledAttribute}}> &lt; </button>
</th>
<th style="width: 120px;">
<div class="dropdown">
<button type="button" class="btn btn-light btn-sm dropdown-toggle" id="mdsBootstrapPersianDatetimePickerMonthSelectorButon"
data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
{{selectedMonthName}}
</button>
<div class="dropdown-menu" aria-labelledby="mdsBootstrapPersianDatetimePickerMonthSelectorButon">
<a class="dropdown-item {{selectMonth1ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth1DateNumber}}">{{monthName1}}</a>
<a class="dropdown-item {{selectMonth2ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth2DateNumber}}">{{monthName2}}</a>
<a class="dropdown-item {{selectMonth3ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth3DateNumber}}">{{monthName3}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth4ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth4DateNumber}}">{{monthName4}}</a>
<a class="dropdown-item {{selectMonth5ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth5DateNumber}}">{{monthName5}}</a>
<a class="dropdown-item {{selectMonth6ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth6DateNumber}}">{{monthName6}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth7ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth7DateNumber}}">{{monthName7}}</a>
<a class="dropdown-item {{selectMonth8ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth8DateNumber}}">{{monthName8}}</a>
<a class="dropdown-item {{selectMonth9ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth9DateNumber}}">{{monthName9}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth10ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth10DateNumber}}">{{monthName10}}</a>
<a class="dropdown-item {{selectMonth11ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth11DateNumber}}">{{monthName11}}</a>
<a class="dropdown-item {{selectMonth12ButtonCssClass}}" data-changedatebutton data-number="{{dropDownMenuMonth12DateNumber}}">{{monthName12}}</a>
</div>
</div>
</th>
<th style="width: 50px;">
<button type="button" class="btn btn-light btn-sm" select-year-button {{selectYearButtonDisabledAttribute}}>{{selectedYear}}</button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm" title="{{nextMonthText}}" data-changedatebutton data-number="{{nextMonthButtonDateNumber}}" {{nextMonthButtonDisabledAttribute}}> &gt; </button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm" title="{{nextYearText}}" data-changedatebutton data-number="{{nextYearButtonDateNumber}}" {{nextYearButtonDisabledAttribute}}> &gt;&gt; </button>
</th>
</tr>
</table>
</td>
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
</table>
</td>`;

  private triggerChangeCalling = false;
  private previousYearTextPersian = 'سال قبل';
  private previousMonthTextPersian = 'ماه قبل';
  private previousTextPersian = 'قبلی';
  private nextYearTextPersian = 'سال بعد';
  private nextMonthTextPersian = 'ماه بعد';
  private nextTextPersian = 'بعدی';
  private hourTextPersian = 'ساعت';
  private minuteTextPersian = 'دقیقه';
  private secondTextPersian = 'ثانیه';
  private goTodayTextPersian = 'برو به امروز';
  private previousText = 'Previous';
  private previousYearText = 'Previous Year';
  private previousMonthText = 'Previous Month';
  private nextText = 'Next';
  private nextYearText = 'Next Year';
  private nextMonthText = 'Next Month';
  private goTodayText = 'Go Today';
  private hourText = 'Hour';
  private minuteText = 'Minute';
  private secondText = 'Second';
  private shortDayNamesPersian = [
    'ش',
    'ی',
    'د',
    'س',
    'چ',
    'پ',
    'ج',
  ];
  private shortDayNames = [
    'SU',
    'MO',
    'TU',
    'WE',
    'TH',
    'FR',
    'SA',
  ];
  private monthNamesPersian = [
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
  ];
  private monthNames = [
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
  private weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  private weekDayNamesPersian = [
    'یک شنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
    'شنبه'
  ];

  // #endregion

  // #region Methods

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  show() {
    this.bsPopover.show();
  }
  hide() {
    this.bsPopover.hide();
  }
  toggle() {
    this.bsPopover.toggle();
  }
  enable() {
    this.bsPopover.enable();
  }
  disable() {
    this.bsPopover.disable();
  }
  update() {
    this.bsPopover.update();
  }
  getBsPopoverInstance() {
    return this.bsPopover;
  }

  // #endregion
}

enum AmPmEnum {
  am,
  pm,
  none
}

class MdsPersianDateTimePickerSetting {
  englishNumber = false;
  placement: "auto" | "top" | "bottom" | "left" | "right" | (() => void) = 'bottom';
  trigger = 'click';
  enableTimePicker = false;
  targetTextSelector = '';
  targetDateSelector = '';
  toDate = false;
  fromDate = false;
  groupId = '';
  disabled = false;
  textFormat = '';
  dateFormat = '';
  isGregorian = false;
  inLine = false;
  selectedDate: Date = null; // Date initial value
  selectedDateToShow = new Date();
  monthsToShow = [0, 0];
  yearOffset = 15;
  holiDays: Date[] = [];
  disabledDates: Date[] = [];
  disabledDays: Date[] = [];
  specialDates: Date[] = [];
  disableBeforeToday = false;
  disableAfterToday = false;
  disableBeforeDate: Date = null;
  disableAfterDate: Date = null;
  rangeSelector = false;
  rangeSelectorStartDate: Date = null;
  rangeSelectorEndDate: Date = null;
  modalMode = false;
  calendarViewOnChange = () => { };
  onDayClick = () => { }
}
