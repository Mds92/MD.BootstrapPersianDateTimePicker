/*!
 * 
 * Bootstrap 5+ Persian Date Time Picker jQuery Plugin
 * https://github.com/Mds92/MD.BootstrapPersianDateTimePicker
 * version : 4.0.0
 * Written By Mohammad Dayyan, Mordad 1397 - 1400
 * mds.soft@gmail.com - @mdssoft
 *
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 348:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(914);
var ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(672);
var ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;
if (typeof ___EXPOSE_LOADER_GLOBAL_THIS___["mds"] === 'undefined') ___EXPOSE_LOADER_GLOBAL_THIS___["mds"] = ___EXPOSE_LOADER_IMPORT___;
module.exports = ___EXPOSE_LOADER_IMPORT___;


/***/ }),

/***/ 672:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// eslint-disable-next-line func-names
module.exports = function () {
  if (typeof globalThis === "object") {
    return globalThis;
  }

  var g;

  try {
    // This works if eval is allowed (see CSP)
    // eslint-disable-next-line no-new-func
    g = this || new Function("return this")();
  } catch (e) {
    // This works if the window reference is available
    if (typeof window === "object") {
      return window;
    } // This works if the self reference is available


    if (typeof self === "object") {
      return self;
    } // This works if the global reference is available


    if (typeof __webpack_require__.g !== "undefined") {
      return __webpack_require__.g;
    }
  }

  return g;
}();

/***/ }),

/***/ 914:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(217)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports, bootstrap_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.MdsPersianDateTimePickerSetting = exports.MdsPersianDateTimePicker = void 0;
    var MdsPersianDateTimePicker = /** @class */ (function () {
        function MdsPersianDateTimePicker(element, setting) {
            var _this = this;
            //#endregion jalali calendar
            // #region Template
            this.modalHtmlTemplate = "<div class=\"modal fade mds-bs-persian-datetime-picker-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mdDateTimePickerModalLabel\" aria-hidden=\"true\" data-mds-dtp>\n<div class=\"modal-dialog modal-xl modal-dialog-centered\" data-button-selector>\n<div class=\"modal-content\">\n<div class=\"modal-body\" data-name=\"mds-dtp-body\">\nMD DateTimePicker Html\n</div>\n</div>\n</div>\n</div>\n  ";
            this.popoverHtmlTemplate = "<div class=\"popover mds-bs-persian-datetime-picker-popover\" role=\"tooltip\" data-mds-dtp>\n<div class=\"popover-arrow\"></div>\n<h3 class=\"popover-header text-center p-1\" mds-dtp-title=\"true\"></h3>\n<div class=\"popover-body p-0\" data-name=\"mds-dtp-body\"></div>\n</div>";
            this.popoverHeaderSelectYearHtmlTemplate = "<table class=\"table table-sm table-borderless text-center p-0 m-0 {{rtlCssClass}}\" dir=\"{{dirAttrValue}}\">\n<tr>\n<th>\n<button type=\"button\" class=\"btn btn-sm btn-light\" title=\"{{previousText}}\" data-year=\"{{latestPreviousYear}}\" data-year-range-button-change=\"-1\" {{prevYearButtonAttr}}> &lt; </button>\n</th>\n<th class=\"pt-1\">\n{{yearsRangeText}}\n</th>\n<th>\n<button type=\"button\" class=\"btn btn-sm btn-light\" title=\"{{nextText}}\" data-year=\"{{latestNextYear}}\" data-year-range-button-change=\"1\" {{nextYearButtonAttr}}> &gt; </button>\n</th>\n</tr>\n</table>";
            this.dateTimePickerYearsToSelectHtmlTemplate = "<table class=\"table table-sm text-center p-0 m-0\">\n<tbody>\n{{yearsBoxHtml}}\n<tr>\n<td colspan=\"100\" class=\"text-center\">\n<button class=\"btn btn-sm btn-light\" data-mds-hide-year-list-box=\"true\">{{cancelText}}</button>\n</td>\n</tr>\n</tbody>\n</table>";
            this.dateTimePickerHtmlTemplate = "<div class=\"mds-bs-dtp-container {{rtlCssClass}}\" {{inlineAttr}}>\n<div class=\"select-year-inline-box w-0\" data-name=\"dtp-years-container\">\n</div>\n<div class=\"select-year-box w-0\" data-mds-dtp-year-list-box=\"true\"></div>\n<table class=\"table table-sm text-center p-0 m-0\">\n<thead>\n<tr {{selectedDateStringAttribute}}>\n<th mds-dtp-inline-header colspan=\"100\">{{dtpInlineHeader}}</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n{{monthsTdHtml}}\n</tr>\n</tbody>\n<tfoot>\n<tr {{timePickerAttribute}}>\n<td colspan=\"100\" class=\"text-center border-0\">\n<input type=\"time\" value=\"{{time}}\" maxlength=\"2\" data-mds-dtp-time />\n</td>\n</tr>\n<tr>\n<td colspan=\"100\">\n<button type=\"button\" class=\"btn btn-light\" title=\"{{goTodayText}}\" data-mds-dtp-go-today>{{todayDateString}}</button>\n</td>\n</tr>\n</tfoot>\n</table>\n</div>";
            this.dateTimePickerMonthTableHtmlTemplate = "<td class=\"border-0\" style=\"{{monthTdStyle}}\" {{monthTdAttribute}} data-td-month>\n<table class=\"table table-sm table-striped table-borderless\">\n<thead>\n<tr {{monthNameAttribute}}>\n<th colspan=\"100\" class=\"border-0\">\n<table class=\"table table-sm table-borderless\">\n<thead>\n<tr>\n<th>\n<button type=\"button\" class=\"btn btn-light\"> {{currentMonthInfo}} </button>\n</th>\n</tr>\n</thead>\n</table>\n</th>\n</tr>\n<tr {{theadSelectDateButtonTrAttribute}}>\n<td colspan=\"100\" class=\"border-0\">\n<table class=\"table table-sm table-borderless\">\n<tr>\n<th>\n<button type=\"button\" class=\"btn btn-light btn-sm\" title=\"{{previousYearText}}\" data-change-date-button=\"true\" data-number=\"{{previousYearButtonDateNumber}}\" {{previousYearButtonDisabledAttribute}}> &lt;&lt; </button>\n</th>\n<th>\n<button type=\"button\" class=\"btn btn-light btn-sm\" title=\"{{previousMonthText}}\" data-change-date-button=\"true\" data-number=\"{{previousMonthButtonDateNumber}}\" {{previousMonthButtonDisabledAttribute}}> &lt; </button>\n</th>\n<th style=\"width: 120px;\">\n<div class=\"dropdown\">\n<button type=\"button\" class=\"btn btn-light btn-sm dropdown-toggle\" id=\"mdsBootstrapPersianDatetimePickerMonthSelectorButon\"\ndata-bs-toggle=\"dropdown\" aria-expanded=\"false\">\n{{selectedMonthName}}\n</button>\n<div class=\"dropdown-menu\" aria-labelledby=\"mdsBootstrapPersianDatetimePickerMonthSelectorButon\">\n<a class=\"dropdown-item {{selectMonth1ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth1DateNumber}}\">{{monthName1}}</a>\n<a class=\"dropdown-item {{selectMonth2ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth2DateNumber}}\">{{monthName2}}</a>\n<a class=\"dropdown-item {{selectMonth3ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth3DateNumber}}\">{{monthName3}}</a>\n<div class=\"dropdown-divider\"></div>\n<a class=\"dropdown-item {{selectMonth4ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth4DateNumber}}\">{{monthName4}}</a>\n<a class=\"dropdown-item {{selectMonth5ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth5DateNumber}}\">{{monthName5}}</a>\n<a class=\"dropdown-item {{selectMonth6ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth6DateNumber}}\">{{monthName6}}</a>\n<div class=\"dropdown-divider\"></div>\n<a class=\"dropdown-item {{selectMonth7ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth7DateNumber}}\">{{monthName7}}</a>\n<a class=\"dropdown-item {{selectMonth8ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth8DateNumber}}\">{{monthName8}}</a>\n<a class=\"dropdown-item {{selectMonth9ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth9DateNumber}}\">{{monthName9}}</a>\n<div class=\"dropdown-divider\"></div>\n<a class=\"dropdown-item {{selectMonth10ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth10DateNumber}}\">{{monthName10}}</a>\n<a class=\"dropdown-item {{selectMonth11ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth11DateNumber}}\">{{monthName11}}</a>\n<a class=\"dropdown-item {{selectMonth12ButtonCssClass}}\" data-change-date-button=\"true\" data-number=\"{{dropDownMenuMonth12DateNumber}}\">{{monthName12}}</a>\n</div>\n</div>\n</th>\n<th style=\"width: 50px;\">\n<button type=\"button\" class=\"btn btn-light btn-sm\" mds-pdtp-select-year-button {{selectYearButtonDisabledAttribute}}>{{selectedYear}}</button>\n</th>\n<th>\n<button type=\"button\" class=\"btn btn-light btn-sm\" title=\"{{nextMonthText}}\" data-change-date-button=\"true\" data-number=\"{{nextMonthButtonDateNumber}}\" {{nextMonthButtonDisabledAttribute}}> &gt; </button>\n</th>\n<th>\n<button type=\"button\" class=\"btn btn-light btn-sm\" title=\"{{nextYearText}}\" data-change-date-button=\"true\" data-number=\"{{nextYearButtonDateNumber}}\" {{nextYearButtonDisabledAttribute}}> &gt;&gt; </button>\n</th>\n</tr>\n</table>\n</td>\n</tr>\n</thead>\n<tbody class=\"days\">\n<tr>\n  <td class=\"{{weekDayShortName1CssClass}}\">{{weekDayShortName1}}</td>\n  <td>{{weekDayShortName2}}</td>\n  <td>{{weekDayShortName3}}</td>\n  <td>{{weekDayShortName4}}</td>\n  <td>{{weekDayShortName5}}</td>\n  <td>{{weekDayShortName6}}</td>\n  <td class=\"{{weekDayShortName7CssClass}}\">{{weekDayShortName7}}</td>\n</tr>\n{{daysHtml}}\n</tbody>\n</table>\n</td>";
            this.previousYearTextPersian = 'سال قبل';
            this.previousMonthTextPersian = 'ماه قبل';
            this.previousTextPersian = 'قبلی';
            this.nextYearTextPersian = 'سال بعد';
            this.nextMonthTextPersian = 'ماه بعد';
            this.nextTextPersian = 'بعدی';
            this.todayTextPersian = 'امروز';
            this.goTodayTextPersian = 'برو به امروز';
            this.cancelTextPersian = 'انصراف';
            this.currentYearTextPersian = 'سال جاری';
            this.previousText = 'Previous';
            this.previousYearText = 'Previous Year';
            this.previousMonthText = 'Previous Month';
            this.nextText = 'Next';
            this.nextYearText = 'Next Year';
            this.nextMonthText = 'Next Month';
            this.todayText = 'Today';
            this.goTodayText = 'Go Today';
            this.cancelText = 'Cancel';
            this.currentYearText = 'Current Year';
            this.shortDayNamesPersian = [
                'ش',
                'ی',
                'د',
                'س',
                'چ',
                'پ',
                'ج',
            ];
            this.shortDayNames = [
                'Su',
                'Mo',
                'Tu',
                'We',
                'Th',
                'Fr',
                'Sa',
            ];
            this.monthNamesPersian = [
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
            this.monthNames = [
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
            this.weekDayNames = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            this.weekDayNamesPersian = [
                'یک شنبه',
                'دوشنبه',
                'سه شنبه',
                'چهارشنبه',
                'پنج شنبه',
                'جمعه',
                'شنبه'
            ];
            // #endregion
            // #region Properties
            this.guid = '';
            this.tempTitleString = '';
            this.triggerChangeCalling = false;
            this.hideYearsBox = function (element, setting) {
                if (setting.inLine) {
                    var dtpInLine = element.closest('[data-mds-dtp-guid]');
                    if (_this.tempTitleString)
                        dtpInLine.querySelector('[mds-dtp-inline-header]').innerHTML = _this.tempTitleString;
                    var yearListBox = dtpInLine.querySelector('[data-mds-dtp-year-list-box]');
                    yearListBox.classList.add('w-0');
                    yearListBox.innerHTML = '';
                    var inlineYearsContainer = dtpInLine.querySelector('[data-name="dtp-years-container"]');
                    inlineYearsContainer.classList.add('w-0');
                    inlineYearsContainer.innerHTML = '';
                }
                else {
                    if (_this.tempTitleString)
                        _this.getPopover(document.querySelector("[data-mds-dtp-guid=\"" + _this.guid + "\"]")).querySelector('[mds-dtp-title]').innerHTML = _this.tempTitleString;
                    var yearListBox = _this.getPopover(_this.element).querySelector('[data-mds-dtp-year-list-box]');
                    yearListBox.classList.add('w-0');
                    yearListBox.innerHTML = '';
                }
            };
            this.changeYearList = function (element) {
                // کلیک روی دکمه های عوض کردن رنج سال انتخابی
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                var isNext = element.getAttribute('data-year-range-button-change') == '1';
                var yearStart = Number(element.getAttribute('data-year'));
                var yearsToSelectObject = _this.getYearsBoxBodyHtml(setting, isNext ? yearStart : yearStart - setting.yearOffset * 2);
                if (setting.inLine)
                    element.closest('[data-mds-dtp-guid]').querySelector('[data-mds-dtp-year-list-box]').innerHTML = yearsToSelectObject.html;
                else
                    element.closest('[data-mds-dtp]').querySelector('[data-mds-dtp-year-list-box]').innerHTML = yearsToSelectObject.html;
                _this.setPopoverHeaderHtml(element, setting.inLine, _this.getYearsBoxHeaderHtml(setting, yearsToSelectObject.yearStart, yearsToSelectObject.yearEnd));
            };
            this.showYearsBox = function (element) {
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                _this.tempTitleString = setting.inLine
                    ? document.querySelector('[mds-dtp-inline-header]').textContent.trim()
                    : document.querySelector('[data-mds-dtp]').querySelector('[mds-dtp-title]').textContent.trim();
                var yearsToSelectObject = _this.getYearsBoxBodyHtml(setting, 0);
                var dateTimePickerYearsToSelectHtml = yearsToSelectObject.html;
                var mdDatePickerContainerSelector = setting.inLine
                    ? element.closest('[data-mds-dtp-guid]')
                    : element.closest('[data-mds-dtp]');
                var dateTimePickerYearsToSelectContainer = mdDatePickerContainerSelector.querySelector('[data-mds-dtp-year-list-box]');
                _this.setPopoverHeaderHtml(element, setting.inLine, _this.getYearsBoxHeaderHtml(setting, yearsToSelectObject.yearStart, yearsToSelectObject.yearEnd));
                dateTimePickerYearsToSelectContainer.innerHTML = dateTimePickerYearsToSelectHtml;
                dateTimePickerYearsToSelectContainer.classList.remove('w-0');
                if (setting.inLine)
                    dateTimePickerYearsToSelectContainer.classList.add('inline');
                else
                    dateTimePickerYearsToSelectContainer.classList.remove('inline');
            };
            this.setPopoverHeaderHtml = function (element, isInLine, htmlString) {
                // element = المانی که روی آن فعالیتی انجام شده و باید عنوان تقویم آن عوض شود    
                if (!isInLine) {
                    var popoverElement = _this.getPopover(element);
                    popoverElement.querySelector('[mds-dtp-title]').innerHTML = htmlString;
                }
                else {
                    var inlineTitleBox = element.closest('[data-mds-dtp-guid]').querySelector('[data-name="dtp-years-container"]');
                    inlineTitleBox.innerHTML = htmlString;
                    inlineTitleBox.classList.remove('w-0');
                }
            };
            this.updateCalendarBodyHtml = function (element, setting) {
                var calendarHtml = _this.getDateTimePickerBodyHtml(setting);
                var containerElement = !setting.inLine
                    ? element.closest('[data-name="mds-dtp-body"]')
                    : element.closest('[data-mds-dtp-guid]');
                var dtpInlineHeader = calendarHtml.match(/<th mds-dtp-inline-header\b[^>]*>(.*?)<\/th>/img)[0];
                _this.tempTitleString = dtpInlineHeader;
                _this.setPopoverHeaderHtml(element, setting.inLine, dtpInlineHeader.trim());
                containerElement.innerHTML = calendarHtml;
                _this.enableEvents();
                _this.enableInLineEvents();
            };
            this.changeMonth = function (element) {
                var instance = MdsPersianDateTimePicker.getInstance(element);
                if (instance.setting.disabled)
                    return;
                var dateNumber = Number(element.getAttribute('data-number'));
                var setting = instance.setting;
                var selectedDateToShow = instance.getClonedDate(setting.selectedDateToShow);
                selectedDateToShow = _this.getDateTime4(dateNumber, selectedDateToShow, setting.isGregorian);
                setting.selectedDateToShow = _this.getClonedDate(selectedDateToShow);
                MdsPersianDateTimePickerData.set(instance.guid, instance);
                _this.updateCalendarBodyHtml(element, setting);
                if (setting.calendarViewOnChange != undefined)
                    setting.calendarViewOnChange(selectedDateToShow);
            };
            this.selectDay = function (element) {
                // کلیک روی روزها
                // انتخاب روز
                var instance = MdsPersianDateTimePicker.getInstance(element);
                if (instance.setting.disabled || element.getAttribute('disabled') != undefined)
                    return;
                var dateNumber = Number(element.getAttribute('data-number'));
                var setting = instance.setting;
                var disabled = element.getAttribute('disabled') != undefined;
                var selectedDateJson = setting.selectedDate == undefined ? undefined : _this.getDateTimeJson1(setting.selectedDate);
                var selectedDateToShow = _this.getClonedDate(setting.selectedDateToShow);
                var selectedDateToShowJson = selectedDateToShow == undefined ? undefined : _this.getDateTimeJson1(selectedDateToShow);
                if (disabled) {
                    if (setting.onDayClick != undefined)
                        setting.onDayClick(setting);
                    return;
                }
                selectedDateToShow = _this.getDateTime4(dateNumber, selectedDateToShow, setting.isGregorian);
                if (setting.rangeSelector) { // اگر رنج سلکتور فعال بود
                    if (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined) {
                        setting.selectedRangeDate = [];
                        setting.rangeSelectorStartDate = undefined;
                        setting.rangeSelectorEndDate = undefined;
                        element.closest('[data-mds-dtp]').querySelectorAll('td.selected-range-days-start-end,td.selected-range-days')
                            .forEach(function (e) {
                            e.classList.remove('selected-range-days');
                            e.classList.remove('selected-range-days-start-end');
                        });
                    }
                    if (setting.rangeSelectorStartDate == undefined) {
                        element.classList.add('selected-range-days-start-end');
                        setting.rangeSelectorStartDate = _this.getClonedDate(selectedDateToShow);
                        setting.selectedDate = _this.getClonedDate(selectedDateToShow);
                        setting.selectedDateToShow = _this.getClonedDate(selectedDateToShow);
                    }
                    else if (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate == undefined) {
                        if (setting.rangeSelectorStartDate.getTime() >= selectedDateToShow.getTime())
                            return;
                        element.classList.add('selected-range-days-start-end');
                        setting.rangeSelectorEndDate = _this.getClonedDate(selectedDateToShow);
                        _this.setSelectedData(setting);
                    }
                    MdsPersianDateTimePickerData.set(instance.guid, instance);
                    if (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined) {
                        setting.selectedRangeDate = [_this.getClonedDate(setting.rangeSelectorStartDate), _this.getClonedDate(setting.rangeSelectorEndDate)];
                        if (!setting.inLine) {
                            instance.hide();
                        }
                        else
                            _this.updateCalendarBodyHtml(element, setting);
                    }
                    return;
                }
                var daysElements = [];
                if (setting.inLine) {
                    daysElements = [].slice.call(element.closest('[data-mds-dtp-guid]').querySelectorAll('[data-day]'));
                }
                else {
                    daysElements = [].slice.call(_this.getPopover(element).querySelectorAll('[data-day]'));
                }
                element.setAttribute('data-mds-dtp-selected-day', '');
                setting.selectedDate = _this.getClonedDate(selectedDateToShow);
                setting.selectedDateToShow = _this.getClonedDate(selectedDateToShow);
                if (selectedDateJson != undefined) {
                    selectedDateJson.hour = selectedDateToShowJson.hour;
                    selectedDateJson.minute = selectedDateToShowJson.minute;
                    selectedDateJson.second = selectedDateToShowJson.second;
                    setting.selectedDate.setHours(selectedDateJson.hour);
                    setting.selectedDate.setMinutes(selectedDateJson.minute);
                    setting.selectedDate.setSeconds(selectedDateJson.second);
                }
                MdsPersianDateTimePickerData.set(instance.guid, instance);
                _this.setSelectedData(setting);
                if (!setting.inLine) {
                    instance.hide();
                }
                if (setting.toDate || setting.fromDate) {
                    // وقتی روی روز یکی از تقویم ها کلیک می شود
                    // باید تقویم دیگر نیز تغییر کند و روزهایی از آن غیر فعال شود
                    var toDateElement = document.querySelector("[data-mds-dtp-group=\"" + setting.groupId + "\"][data-to-date]");
                    var fromDateElement = document.querySelector("[data-mds-dtp-group=\"" + setting.groupId + "\"][data-from-date]");
                    if (setting.fromDate && toDateElement != undefined) {
                        var instance_1 = MdsPersianDateTimePicker.getInstance(toDateElement);
                        if (setting.inLine)
                            _this.updateCalendarBodyHtml(toDateElement, instance_1.setting);
                        else
                            instance_1.initializeBsPopover(instance_1.setting);
                    }
                    else if (setting.toDate && fromDateElement != undefined) {
                        var instance_2 = MdsPersianDateTimePicker.getInstance(fromDateElement);
                        if (setting.inLine)
                            _this.updateCalendarBodyHtml(fromDateElement, instance_2.setting);
                        else
                            instance_2.initializeBsPopover(instance_2.setting);
                    }
                    else
                        _this.updateCalendarBodyHtml(element, setting);
                }
                else {
                    _this.updateCalendarBodyHtml(element, setting);
                }
                if (setting.onDayClick != undefined)
                    setting.onDayClick(setting);
            };
            this.hoverOnDays = function (e) {
                // هاور روی روزها
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                if (element.getAttribute('disabled') != undefined || !setting.rangeSelector ||
                    (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined))
                    return;
                var dateNumber = Number(element.getAttribute('data-number'));
                var allDayElements = [].slice.call(document.querySelectorAll('td[data-day]'));
                allDayElements.forEach(function (e) {
                    e.classList.remove('selected-range-days');
                    e.classList.remove('selected-range-days-nm');
                });
                var allNextOrPrevMonthDayElements = [].slice.call(document.querySelectorAll('td[data-nm]'));
                allNextOrPrevMonthDayElements.forEach(function (e) {
                    e.classList.remove('selected-range-days');
                    e.classList.remove('selected-range-days-nm');
                });
                var rangeSelectorStartDate = !setting.rangeSelectorStartDate ? undefined : _this.getClonedDate(setting.rangeSelectorStartDate);
                var rangeSelectorEndDate = !setting.rangeSelectorEndDate ? undefined : _this.getClonedDate(setting.rangeSelectorEndDate);
                var rangeSelectorStartDateNumber = 0;
                var rangeSelectorEndDateNumber = 0;
                if (setting.isGregorian) {
                    rangeSelectorStartDateNumber = !rangeSelectorStartDate ? 0 : _this.convertToNumber3(rangeSelectorStartDate);
                    rangeSelectorEndDateNumber = !rangeSelectorEndDate ? 0 : _this.convertToNumber3(rangeSelectorEndDate);
                }
                else {
                    rangeSelectorStartDateNumber = !rangeSelectorStartDate ? 0 : _this.convertToNumber1(_this.getDateTimeJsonPersian1(rangeSelectorStartDate));
                    rangeSelectorEndDateNumber = !rangeSelectorEndDate ? 0 : _this.convertToNumber1(_this.getDateTimeJsonPersian1(rangeSelectorEndDate));
                }
                if (rangeSelectorStartDateNumber > 0 && dateNumber > rangeSelectorStartDateNumber) {
                    for (var i1 = rangeSelectorStartDateNumber; i1 <= dateNumber; i1++) {
                        allDayElements.filter(function (e) { return e.getAttribute('data-number') == i1.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1; })
                            .forEach(function (e) { return e.classList.add('selected-range-days'); });
                        allNextOrPrevMonthDayElements.filter(function (e) { return e.getAttribute('data-number') == i1.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1; })
                            .forEach(function (e) { return e.classList.add('selected-range-days-nm'); });
                    }
                }
                else if (rangeSelectorEndDateNumber > 0 && dateNumber < rangeSelectorEndDateNumber) {
                    for (var i2 = dateNumber; i2 <= rangeSelectorEndDateNumber; i2++) {
                        allDayElements.filter(function (e) { return e.getAttribute('data-number') == i2.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1; })
                            .forEach(function (e) { return e.classList.add('selected-range-days'); });
                        allNextOrPrevMonthDayElements.filter(function (e) { return e.getAttribute('data-number') == i2.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1; })
                            .forEach(function (e) { return e.classList.add('selected-range-days-nm'); });
                    }
                }
            };
            this.goToday = function (e) {
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                setting.selectedDateToShow = new Date();
                MdsPersianDateTimePickerData.set(instance.guid, instance);
                _this.updateCalendarBodyHtml(element, setting);
            };
            this.timeChanged = function (e) {
                // عوض کردن ساعت
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                var value = element.value;
                if (!setting.enableTimePicker)
                    return;
                if (setting.selectedDateToShow == undefined)
                    setting.selectedDateToShow = new Date();
                var hour = Number(value.substr(0, 2));
                var minute = Number(value.substr(3, 2));
                setting.selectedDateToShow = new Date(setting.selectedDateToShow.setHours(hour));
                setting.selectedDateToShow = new Date(setting.selectedDateToShow.setMinutes(minute));
                if (setting.selectedDate == undefined)
                    setting.selectedDate = new Date();
                setting.selectedDate = new Date(setting.selectedDate.setHours(hour));
                setting.selectedDate = new Date(setting.selectedDate.setMinutes(minute));
                MdsPersianDateTimePickerData.set(instance.guid, instance);
                _this.setSelectedData(setting);
            };
            this.popoverInsertedEvent = function (e) {
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                var setting = instance.setting;
                _this.hideYearsBox(element, setting);
            };
            this.popoverShownEvent = function () {
                _this.enableEvents();
            };
            this.popoverHiddenEvent = function (e) {
                _this.disableEvents();
            };
            this.selectCorrectClickEvent = function (e) {
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                if (element.getAttribute('mds-pdtp-select-year-button') != null) {
                    instance.showYearsBox(element);
                }
                else if (element.getAttribute('data-day') != null) {
                    _this.selectDay(element);
                }
                else if (element.getAttribute('data-mds-hide-year-list-box')) {
                    _this.hideYearsBox(element, instance.setting);
                }
                else if (element.getAttribute('data-change-date-button')) {
                    _this.changeMonth(element);
                }
                else if (element.getAttribute('data-year-range-button-change') != null && element.getAttribute('disabled') == null) {
                    _this.changeYearList(element);
                }
            };
            this.showPopoverEvent = function (e) {
                MdsPersianDateTimePickerData.getAll().forEach(function (i) { return i.hide(); });
                var element = e.target;
                var instance = MdsPersianDateTimePicker.getInstance(element);
                if (instance.setting.disabled)
                    return;
                instance.show();
            };
            this.hidePopoverEvent = function (e) {
                var element = e.target;
                if (element.tagName == 'HTML') {
                    MdsPersianDateTimePickerData.getAll().forEach(function (i) { return i.hide(); });
                    return;
                }
                var isWithinDatePicker = element.closest('[data-mds-dtp]') != null || element.getAttribute('data-mds-dtp-guid') != null || element.getAttribute('data-mds-dtp-go-today') != null;
                if (!isWithinDatePicker) {
                    MdsPersianDateTimePickerData.getAll().forEach(function (i) { return i.hide(); });
                }
            };
            setting = this.extend(new MdsPersianDateTimePickerSetting(), setting);
            if (!element)
                throw new Error("MdsPersianDateTimePicker => element is null!");
            if (setting.rangeSelector && (setting.toDate || setting.fromDate))
                throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together");
            if (setting.toDate && setting.fromDate)
                throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together");
            if (!setting.groupId && (setting.toDate || setting.fromDate))
                throw new Error("MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'");
            if (!setting.textFormat) {
                setting.textFormat = 'yyyy/MM/dd';
                if (setting.enableTimePicker)
                    setting.textFormat += ' HH:mm';
            }
            if (!setting.dateFormat) {
                setting.dateFormat = 'yyyy/MM/dd';
                if (setting.enableTimePicker)
                    setting.dateFormat += ' HH:mm';
            }
            if (setting.yearOffset > 15)
                setting.yearOffset = 15;
            this.setting = setting;
            this.setting.selectedDate = setting.selectedDate ? this.getClonedDate(setting.selectedDate) : null;
            this.setting.selectedDateToShow = setting.selectedDateToShow ? this.getClonedDate(setting.selectedDateToShow) : this.getClonedDate(setting.selectedDate);
            this.guid = this.newGuid();
            this.element = element;
            this.element.setAttribute("data-mds-dtp-guid", this.guid);
            MdsPersianDateTimePickerData.set(this.guid, this);
            this.initializeBsPopover(setting);
        }
        // #region jalali calendar
        MdsPersianDateTimePicker.prototype.toJalali = function (gy, gm, gd) {
            return this.d2j(this.g2d(gy, gm, gd));
        };
        MdsPersianDateTimePicker.prototype.toGregorian = function (jy, jm, jd) {
            return this.d2g(this.j2d(jy, jm, jd));
        };
        MdsPersianDateTimePicker.prototype.isValidJalaliDate = function (jy, jm, jd) {
            return jy >= -61 && jy <= 3177 &&
                jm >= 1 && jm <= 12 &&
                jd >= 1 && jd <= this.jalaliMonthLength(jy, jm);
        };
        MdsPersianDateTimePicker.prototype.isLeapJalaliYear = function (jy) {
            return this.jalCal(jy).leap === 0;
        };
        MdsPersianDateTimePicker.prototype.jalaliMonthLength = function (jy, jm) {
            if (jm <= 6)
                return 31;
            if (jm <= 11)
                return 30;
            if (this.isLeapJalaliYear(jy))
                return 30;
            return 29;
        };
        MdsPersianDateTimePicker.prototype.jalCal = function (jy) {
            // Jalali years starting the 33-year rule.
            var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178], bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0], jm, jump = 1, leap, n, i;
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
            if (leap === -1)
                leap = 4;
            return {
                leap: leap,
                gy: gy,
                march: march
            };
        };
        MdsPersianDateTimePicker.prototype.j2d = function (jy, jm, jd) {
            var r = this.jalCal(jy);
            return this.g2d(r.gy, 3, r.march) + (jm - 1) * 31 - this.div(jm, 7) * (jm - 7) + jd - 1;
        };
        MdsPersianDateTimePicker.prototype.d2j = function (jdn) {
            var gy = this.d2g(jdn).gy, // Calculate Gregorian year (gy).
            jy = gy - 621, r = this.jalCal(jy), jdn1F = this.g2d(gy, 3, r.march), jd, jm, k;
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
                }
                else {
                    // The remaining months.
                    k -= 186;
                }
            }
            else {
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
        };
        MdsPersianDateTimePicker.prototype.g2d = function (gy, gm, gd) {
            var d = this.div((gy + this.div(gm - 8, 6) + 100100) * 1461, 4) +
                this.div(153 * this.mod(gm + 9, 12) + 2, 5) +
                gd - 34840408;
            d = d - this.div(this.div(gy + 100100 + this.div(gm - 8, 6), 100) * 3, 4) + 752;
            return d;
        };
        MdsPersianDateTimePicker.prototype.d2g = function (jdn) {
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
        };
        MdsPersianDateTimePicker.prototype.div = function (a, b) {
            return ~~(a / b);
        };
        MdsPersianDateTimePicker.prototype.mod = function (a, b) {
            return a - ~~(a / b) * b;
        };
        // #endregion
        // #region Methods
        MdsPersianDateTimePicker.prototype.initializeBsPopover = function (setting) {
            var _this = this;
            // Validation
            if (setting.rangeSelector && (setting.toDate || setting.fromDate))
                throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together");
            if (setting.toDate && setting.fromDate)
                throw new Error("MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together");
            if (!setting.groupId && (setting.toDate || setting.fromDate))
                throw new Error("MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'");
            // \\
            if (setting.disabled)
                this.element.setAttribute("disabled", '');
            if (setting.toDate || setting.fromDate) {
                this.element.setAttribute("data-mds-dtp-group", setting.groupId);
                if (setting.toDate)
                    this.element.setAttribute("data-to-date", 'true');
                else if (setting.fromDate)
                    this.element.setAttribute("data-from-date", 'true');
            }
            setTimeout(function () {
                _this.dispose();
                var title = _this.getPopoverHeaderTitle(setting);
                var html = _this.getDateTimePickerBodyHtml(setting);
                if (setting.inLine == true) {
                    _this.bsPopover = null;
                    _this.element.innerHTML = html;
                    _this.enableInLineEvents();
                }
                else {
                    _this.bsPopover = new bootstrap_1.Popover(_this.element, {
                        container: 'body',
                        content: html,
                        title: title,
                        html: true,
                        placement: setting.placement,
                        trigger: 'manual',
                        template: _this.popoverHtmlTemplate,
                        sanitize: false,
                    });
                    _this.enableMainEvents();
                }
                _this.tempTitleString = title;
            }, setting.inLine ? 10 : 500);
        };
        MdsPersianDateTimePicker.prototype.newGuid = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        };
        MdsPersianDateTimePicker.prototype.extend = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var i = 1; i < args.length; i++)
                for (var key in args[i])
                    if (args[i].hasOwnProperty(key))
                        args[0][key] = args[i][key];
            return args[0];
        };
        MdsPersianDateTimePicker.prototype.getClonedDate = function (dateTime) {
            return new Date(dateTime.getTime());
        };
        MdsPersianDateTimePicker.prototype.getDateTimeJson1 = function (dateTime) {
            return {
                year: dateTime.getFullYear(),
                month: dateTime.getMonth() + 1,
                day: dateTime.getDate(),
                hour: dateTime.getHours(),
                minute: dateTime.getMinutes(),
                second: dateTime.getSeconds(),
                millisecond: dateTime.getMilliseconds(),
                dayOfWeek: dateTime.getDay()
            };
        };
        MdsPersianDateTimePicker.prototype.getDateTimeJson2 = function (dateNumber) {
            return {
                year: Math.floor(dateNumber / 10000),
                month: Math.floor(dateNumber / 100) % 100,
                day: dateNumber % 100,
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0,
                dayOfWeek: null
            };
        };
        MdsPersianDateTimePicker.prototype.getDateTimeJsonPersian1 = function (dateTime) {
            var persianDate = this.toJalali(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate());
            return {
                year: persianDate.jy,
                month: persianDate.jm,
                day: persianDate.jd,
                hour: dateTime.getHours(),
                minute: dateTime.getMinutes(),
                second: dateTime.getSeconds(),
                millisecond: dateTime.getMilliseconds(),
                dayOfWeek: dateTime.getDay(),
            };
        };
        MdsPersianDateTimePicker.prototype.getDateTimeJsonPersian2 = function (yearPersian, monthPersian, dayPersian, hour, minute, second) {
            if (!this.isNumber(hour))
                hour = 0;
            if (!this.isNumber(minute))
                minute = 0;
            if (!this.isNumber(second))
                second = 0;
            var gregorian = this.toGregorian(yearPersian, monthPersian, dayPersian);
            return this.getDateTimeJsonPersian1(new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second));
        };
        MdsPersianDateTimePicker.prototype.getWeekDayName = function (englishWeekDayIndex, isGregorian) {
            if (!isGregorian)
                return this.weekDayNamesPersian[englishWeekDayIndex];
            return this.weekDayNames[englishWeekDayIndex];
        };
        MdsPersianDateTimePicker.prototype.getMonthName = function (monthIndex, isGregorian) {
            if (monthIndex < 0)
                monthIndex = 11;
            else if (monthIndex > 11)
                monthIndex = 0;
            if (!isGregorian)
                return this.monthNamesPersian[monthIndex];
            return this.monthNames[monthIndex];
        };
        MdsPersianDateTimePicker.prototype.getWeekDayShortName = function (englishWeekDayIndex, isGregorian) {
            if (!isGregorian)
                return this.shortDayNamesPersian[englishWeekDayIndex];
            return this.shortDayNames[englishWeekDayIndex];
        };
        MdsPersianDateTimePicker.prototype.isLeapYear = function (persianYear) {
            return this.isLeapJalaliYear(persianYear);
        };
        MdsPersianDateTimePicker.prototype.getDaysInMonthPersian = function (year, month) {
            var numberOfDaysInMonth = 31;
            if (month > 6 && month < 12)
                numberOfDaysInMonth = 30;
            else if (month == 12)
                numberOfDaysInMonth = this.isLeapYear(year) ? 30 : 29;
            return numberOfDaysInMonth;
        };
        MdsPersianDateTimePicker.prototype.getDaysInMonth = function (year, month) {
            return new Date(year, month + 1, 0).getDate();
        };
        MdsPersianDateTimePicker.prototype.getLastDayDateOfPreviousMonth = function (dateTime, isGregorian) {
            var dateTimeLocal = this.getClonedDate(dateTime);
            if (isGregorian) {
                var previousMonth = new Date(dateTimeLocal.getFullYear(), dateTimeLocal.getMonth() - 1, 1), daysInMonth = this.getDaysInMonth(previousMonth.getFullYear(), previousMonth.getMonth());
                return new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInMonth);
            }
            var dateTimeJsonPersian = this.getDateTimeJsonPersian1(dateTimeLocal);
            dateTimeJsonPersian.month += -1;
            if (dateTimeJsonPersian.month <= 0) {
                dateTimeJsonPersian.month = 12;
                dateTimeJsonPersian.year--;
            }
            else if (dateTimeJsonPersian.month > 12) {
                dateTimeJsonPersian.year++;
                dateTimeJsonPersian.month = 1;
            }
            return this.getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, this.getDaysInMonthPersian(dateTimeJsonPersian.year, dateTimeJsonPersian.month));
        };
        MdsPersianDateTimePicker.prototype.getFirstDayDateOfNextMonth = function (dateTime, isGregorian) {
            var dateTimeLocal = this.getClonedDate(dateTime);
            if (isGregorian) {
                var nextMonth = new Date(dateTimeLocal.getFullYear(), dateTimeLocal.getMonth() + 1, 1);
                return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
            }
            var dateTimeJsonPersian = this.getDateTimeJsonPersian1(dateTimeLocal);
            dateTimeJsonPersian.month += 1;
            if (dateTimeJsonPersian.month <= 0) {
                dateTimeJsonPersian.month = 12;
                dateTimeJsonPersian.year--;
            }
            if (dateTimeJsonPersian.month > 12) {
                dateTimeJsonPersian.year++;
                dateTimeJsonPersian.month = 1;
            }
            return this.getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, 1);
        };
        MdsPersianDateTimePicker.prototype.getDateTime1 = function (yearPersian, monthPersian, dayPersian, hour, minute, second) {
            if (!this.isNumber(hour))
                hour = 0;
            if (!this.isNumber(minute))
                minute = 0;
            if (!this.isNumber(second))
                second = 0;
            var gregorian = this.toGregorian(yearPersian, monthPersian, dayPersian);
            return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second);
        };
        MdsPersianDateTimePicker.prototype.getDateTime2 = function (dateTimeJsonPersian) {
            if (!dateTimeJsonPersian.hour)
                dateTimeJsonPersian.hour = 0;
            if (!dateTimeJsonPersian.minute)
                dateTimeJsonPersian.minute = 0;
            if (!dateTimeJsonPersian.second)
                dateTimeJsonPersian.second = 0;
            var gregorian = this.toGregorian(dateTimeJsonPersian.year, dateTimeJsonPersian.month, dateTimeJsonPersian.day);
            return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, dateTimeJsonPersian.hour, dateTimeJsonPersian.minute, dateTimeJsonPersian.second);
        };
        MdsPersianDateTimePicker.prototype.getDateTime3 = function (dateTimeJson) {
            return new Date(dateTimeJson.year, dateTimeJson.month - 1, dateTimeJson.day, dateTimeJson.hour, dateTimeJson.minute, dateTimeJson.second);
        };
        MdsPersianDateTimePicker.prototype.getDateTime4 = function (dateNumber, dateTime, isGregorian) {
            var dateTimeJson = this.getDateTimeJson2(dateNumber);
            if (!isGregorian) {
                var dateTimeJsonPersian = this.getDateTimeJsonPersian1(dateTime);
                dateTimeJsonPersian.year = dateTimeJson.year;
                dateTimeJsonPersian.month = dateTimeJson.month;
                dateTimeJsonPersian.day = dateTimeJson.day;
                dateTime = this.getDateTime2(dateTimeJsonPersian);
            }
            else
                dateTime = new Date(dateTimeJson.year, dateTimeJson.month - 1, dateTimeJson.day, dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds());
            return dateTime;
        };
        MdsPersianDateTimePicker.prototype.getLesserDisableBeforeDate = function (setting) {
            // دریافت تاریخ کوچکتر
            // از بین تاریخ های غیر فعال شده در گذشته
            var resultDate = null;
            var dateNow = new Date();
            if (setting.disableBeforeToday && setting.disableBeforeDate) {
                if (setting.disableBeforeDate.getTime() <= dateNow.getTime())
                    resultDate = this.getClonedDate(setting.disableBeforeDate);
                else
                    resultDate = dateNow;
            }
            else if (setting.disableBeforeDate)
                resultDate = this.getClonedDate(setting.disableBeforeDate);
            else if (setting.disableBeforeToday)
                resultDate = dateNow;
            if (resultDate == null)
                return null;
            if (setting.isGregorian)
                return this.getDateTimeJson1(resultDate);
            return this.getDateTimeJsonPersian1(resultDate);
        };
        MdsPersianDateTimePicker.prototype.getBiggerDisableAfterDate = function (setting) {
            // دریافت تاریخ بزرگتر
            // از بین تاریخ های غیر فعال شده در آینده
            var resultDate = null;
            var dateNow = new Date();
            if (setting.disableAfterDate && setting.disableAfterToday) {
                if (setting.disableAfterDate.getTime() >= dateNow.getTime())
                    resultDate = this.getClonedDate(setting.disableAfterDate);
                else
                    resultDate = dateNow;
            }
            else if (setting.disableAfterDate)
                resultDate = this.getClonedDate(setting.disableAfterDate);
            else if (setting.disableAfterToday)
                resultDate = dateNow;
            if (resultDate == null)
                return null;
            if (setting.isGregorian)
                return this.getDateTimeJson1(resultDate);
            return this.getDateTimeJsonPersian1(resultDate);
        };
        MdsPersianDateTimePicker.prototype.addMonthToDateTimeJson = function (dateTimeJson, addedMonth, isGregorian) {
            // وقتی نیاز هست تا ماه یا روز به تاریخی اضافه کنم
            // پس از اضافه کردن ماه یا روز این متد را استفاده میکنم تا سال و ماه
            // با مقادیر جدید تصحیح و برگشت داده شوند
            var dateTimeJson1 = Object.assign({}, dateTimeJson);
            dateTimeJson1.day = 1;
            dateTimeJson1.month += addedMonth;
            if (!isGregorian) {
                if (dateTimeJson1.month <= 0) {
                    dateTimeJson1.month = 12;
                    dateTimeJson1.year--;
                }
                if (dateTimeJson1.month > 12) {
                    dateTimeJson1.year++;
                    dateTimeJson1.month = 1;
                }
                return dateTimeJson1;
            }
            return this.getDateTimeJson1(this.getDateTime3(dateTimeJson1));
        };
        MdsPersianDateTimePicker.prototype.convertToNumber1 = function (dateTimeJson) {
            return Number(this.zeroPad(dateTimeJson.year) + this.zeroPad(dateTimeJson.month) + this.zeroPad(dateTimeJson.day));
        };
        MdsPersianDateTimePicker.prototype.convertToNumber2 = function (year, month, day) {
            return Number(this.zeroPad(year) + this.zeroPad(month) + this.zeroPad(day));
        };
        MdsPersianDateTimePicker.prototype.convertToNumber3 = function (dateTime) {
            return this.convertToNumber1(this.getDateTimeJson1(dateTime));
        };
        MdsPersianDateTimePicker.prototype.convertToNumber4 = function (dateTime) {
            return Number(this.zeroPad(dateTime.getFullYear()) + this.zeroPad(dateTime.getMonth()) + this.zeroPad(dateTime.getDate()));
        };
        MdsPersianDateTimePicker.prototype.getShortHour = function (hour) {
            var shortHour;
            if (hour > 12)
                shortHour = hour - 12;
            else
                shortHour = hour;
            return shortHour;
        };
        MdsPersianDateTimePicker.prototype.getAmPm = function (hour, isGregorian) {
            var amPm;
            if (hour > 12) {
                if (isGregorian)
                    amPm = 'PM';
                else
                    amPm = 'ب.ظ';
            }
            else if (isGregorian)
                amPm = 'AM';
            else
                amPm = 'ق.ظ';
            return amPm;
        };
        MdsPersianDateTimePicker.prototype.addMonthToDateTime = function (dateTime, addedMonth, isGregorian) {
            var dateTimeJson;
            if (!isGregorian) {
                dateTimeJson = this.getDateTimeJsonPersian1(dateTime);
                dateTimeJson = this.addMonthToDateTimeJson(dateTimeJson, addedMonth, isGregorian);
                return this.getDateTime2(dateTimeJson);
            }
            dateTimeJson = this.getDateTimeJson1(dateTime);
            dateTimeJson = this.addMonthToDateTimeJson(dateTimeJson, addedMonth, isGregorian);
            return this.getDateTime3(dateTimeJson);
        };
        MdsPersianDateTimePicker.prototype.isNumber = function (n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        };
        MdsPersianDateTimePicker.prototype.toPersianNumber = function (inputNumber1) {
            /* ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ */
            if (!inputNumber1)
                return '';
            var str1 = inputNumber1.toString().trim();
            if (!str1)
                return '';
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
        };
        MdsPersianDateTimePicker.prototype.toEnglishNumber = function (inputNumber2) {
            if (!inputNumber2)
                return '';
            var str = inputNumber2.toString().trim();
            if (!str)
                return '';
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
        };
        MdsPersianDateTimePicker.prototype.zeroPad = function (nr, base) {
            if (nr == undefined || nr == '')
                return '00';
            if (base == undefined || base == '')
                base = '00';
            var len = (String(base).length - String(nr).length) + 1;
            return len > 0 ? new Array(len).join('0') + nr : nr;
        };
        MdsPersianDateTimePicker.prototype.getDateTimeString = function (dateTimeJson, format, isGregorian, englishNumber) {
            if (isGregorian)
                englishNumber = true;
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
            format = format.replace(/yyyy/mg, dateTimeJson.year.toString());
            format = format.replace(/yy/mg, (dateTimeJson.year % 100).toString());
            format = format.replace(/MMMM/mg, this.getMonthName(dateTimeJson.month - 1, isGregorian));
            format = format.replace(/MM/mg, this.zeroPad(dateTimeJson.month));
            format = format.replace(/M/mg, dateTimeJson.month.toString());
            format = format.replace(/dddd/mg, this.getWeekDayName(dateTimeJson.dayOfWeek, isGregorian));
            format = format.replace(/dd/mg, this.zeroPad(dateTimeJson.day));
            format = format.replace(/d/mg, dateTimeJson.day.toString());
            format = format.replace(/HH/mg, this.zeroPad(dateTimeJson.hour));
            format = format.replace(/H/mg, dateTimeJson.hour.toString());
            format = format.replace(/hh/mg, this.zeroPad(this.getShortHour(dateTimeJson.hour).toString()));
            format = format.replace(/h/mg, this.zeroPad(dateTimeJson.hour));
            format = format.replace(/mm/mg, this.zeroPad(dateTimeJson.minute));
            format = format.replace(/m/mg, dateTimeJson.minute.toString());
            format = format.replace(/ss/mg, this.zeroPad(dateTimeJson.second));
            format = format.replace(/s/mg, dateTimeJson.second.toString());
            format = format.replace(/fff/mg, this.zeroPad(dateTimeJson.millisecond, '000'));
            format = format.replace(/ff/mg, this.zeroPad(dateTimeJson.millisecond / 10));
            format = format.replace(/f/mg, (dateTimeJson.millisecond / 100).toString());
            format = format.replace(/tt/mg, this.getAmPm(dateTimeJson.hour, isGregorian));
            format = format.replace(/t/mg, this.getAmPm(dateTimeJson.hour, isGregorian)[0]);
            if (!englishNumber)
                format = this.toPersianNumber(format);
            return format;
        };
        MdsPersianDateTimePicker.prototype.getSelectedDateTimeTextFormatted = function (setting) {
            if (setting.selectedDate == undefined)
                return '';
            if (setting.rangeSelector && setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined)
                return this.getDateTimeString(!setting.isGregorian ? this.getDateTimeJsonPersian1(setting.rangeSelectorStartDate) : this.getDateTimeJson1(setting.rangeSelectorStartDate), setting.textFormat, setting.isGregorian, setting.isGregorian) + ' - ' +
                    this.getDateTimeString(!setting.isGregorian ? this.getDateTimeJsonPersian1(setting.rangeSelectorEndDate) : this.getDateTimeJson1(setting.rangeSelectorEndDate), setting.textFormat, setting.isGregorian, setting.isGregorian);
            return this.getDateTimeString(!setting.isGregorian ? this.getDateTimeJsonPersian1(setting.selectedDate) : this.getDateTimeJson1(setting.selectedDate), setting.textFormat, setting.isGregorian, setting.isGregorian);
        };
        MdsPersianDateTimePicker.prototype.getSelectedDateFormatted = function (setting) {
            // دریافت رشته تاریخ انتخاب شده
            if ((!setting.rangeSelector && !setting.selectedDate == undefined) ||
                (setting.rangeSelector && setting.rangeSelectorStartDate == undefined && setting.rangeSelectorEndDate == undefined))
                return '';
            if (setting.rangeSelector)
                return this.getDateTimeString(this.getDateTimeJson1(setting.rangeSelectorStartDate), setting.dateFormat, true, true) + ' - ' +
                    this.getDateTimeString(this.getDateTimeJson1(setting.rangeSelectorEndDate), setting.dateFormat, true, true);
            return this.getDateTimeString(this.getDateTimeJson1(setting.selectedDate), setting.dateFormat, true, true);
        };
        MdsPersianDateTimePicker.prototype.getDisabledDateObject = function (setting) {
            var disableBeforeDateTimeJson = this.getLesserDisableBeforeDate(setting);
            var disableAfterDateTimeJson = this.getBiggerDisableAfterDate(setting);
            // بررسی پراپرتی های از تاریخ، تا تاریخ
            if ((setting.fromDate || setting.toDate) && setting.groupId) {
                var toDateElement = document.querySelector('[data-mds-dtp-group="' + setting.groupId + '"][data-to-date]');
                var fromDateElement = document.querySelector('[data-mds-dtp-group="' + setting.groupId + '"][data-from-date]');
                if (toDateElement != null && setting.fromDate) {
                    var toDateSetting = MdsPersianDateTimePicker.getInstance(toDateElement).setting;
                    var toDateSelectedDate = toDateSetting.selectedDate;
                    disableAfterDateTimeJson = !toDateSelectedDate ? undefined : setting.isGregorian ? this.getDateTimeJson1(toDateSelectedDate) : this.getDateTimeJsonPersian1(toDateSelectedDate);
                }
                else if (fromDateElement != null && setting.toDate) {
                    var fromDateSetting = MdsPersianDateTimePicker.getInstance(fromDateElement).setting;
                    var fromDateSelectedDate = fromDateSetting.selectedDate;
                    disableBeforeDateTimeJson = !fromDateSelectedDate ? undefined : setting.isGregorian ? this.getDateTimeJson1(fromDateSelectedDate) : this.getDateTimeJsonPersian1(fromDateSelectedDate);
                }
            }
            return [disableBeforeDateTimeJson, disableAfterDateTimeJson];
        };
        MdsPersianDateTimePicker.prototype.setSelectedData = function (setting) {
            var targetTextElement = setting.targetTextSelector ? document.querySelector(setting.targetTextSelector) : undefined;
            var targetDateElement = setting.targetDateSelector ? document.querySelector(setting.targetDateSelector) : undefined;
            var changeEvent = new Event('change');
            if (targetTextElement != undefined) {
                this.triggerChangeCalling = true;
                var dateTimeTextFormat = this.getSelectedDateTimeTextFormatted(setting);
                switch (targetTextElement.tagName.toLowerCase()) {
                    case 'input':
                        targetTextElement.value = dateTimeTextFormat;
                        break;
                    default:
                        targetTextElement.innerHTML = dateTimeTextFormat;
                        break;
                }
                targetTextElement.dispatchEvent(changeEvent);
            }
            if (targetDateElement != undefined) {
                var dateTimeFormat = this.getSelectedDateFormatted(setting);
                this.triggerChangeCalling = true;
                switch (targetDateElement.tagName.toLowerCase()) {
                    case 'input':
                        targetDateElement.value = dateTimeFormat;
                        break;
                    default:
                        targetDateElement.innerHTML = dateTimeFormat;
                        break;
                }
                targetDateElement.dispatchEvent(changeEvent);
            }
        };
        MdsPersianDateTimePicker.prototype.getPopover = function (element) {
            var popoverId = element.getAttribute('aria-describedby');
            if (popoverId == undefined || popoverId == '')
                return element.closest('[data-mds-dtp]');
            return document.getElementById(popoverId.toString());
        };
        MdsPersianDateTimePicker.prototype.getYearsBoxBodyHtml = function (setting, yearToStart) {
            // بدست آوردن اچ تی ام ال انتخاب سال
            // yearToStart سال شروع
            var selectedDateToShow = this.getClonedDate(setting.selectedDateToShow);
            var disabledDateObj = this.getDisabledDateObject(setting);
            var disableBeforeDateTimeJson = disabledDateObj[0];
            var disableAfterDateTimeJson = disabledDateObj[1];
            var html = this.dateTimePickerYearsToSelectHtmlTemplate;
            var yearsBoxHtml = '';
            var todayDateTimeJson;
            var selectedDateTimeToShowJson;
            var counter = 1;
            if (setting.isGregorian) {
                selectedDateTimeToShowJson = this.getDateTimeJson1(selectedDateToShow);
                todayDateTimeJson = this.getDateTimeJson1(new Date());
            }
            else {
                selectedDateTimeToShowJson = this.getDateTimeJsonPersian1(selectedDateToShow);
                todayDateTimeJson = this.getDateTimeJsonPersian1(new Date());
            }
            counter = 1;
            var yearStart = yearToStart ? yearToStart : todayDateTimeJson.year - setting.yearOffset;
            var yearEnd = yearToStart ? yearToStart + setting.yearOffset * 2 : todayDateTimeJson.year + setting.yearOffset;
            for (var i = yearStart; i < yearEnd; i++) {
                var disabledAttr = i < (disableBeforeDateTimeJson === null || disableBeforeDateTimeJson === void 0 ? void 0 : disableBeforeDateTimeJson.year) || i > (disableAfterDateTimeJson === null || disableAfterDateTimeJson === void 0 ? void 0 : disableAfterDateTimeJson.year) ? 'disabled' : '';
                var currentYearDateTimeJson = this.getDateTimeJson2(this.convertToNumber2(i, selectedDateTimeToShowJson.month, this.getDaysInMonthPersian(i, selectedDateTimeToShowJson.month)));
                var currentYearDisabledAttr = '';
                var yearText = setting.isGregorian ? i.toString() : this.toPersianNumber(i);
                var yearDateNumber = this.convertToNumber2(i, selectedDateTimeToShowJson.month, 1);
                var todayAttr = todayDateTimeJson.year == i ? 'data-current-year="true"' : '';
                var selectedYearAttr = selectedDateTimeToShowJson.year == i ? 'data-selected-year' : '';
                var selectedYearTitle = '';
                if (todayAttr)
                    selectedYearTitle = setting.isGregorian ? this.currentYearText : this.currentYearTextPersian;
                if (disableBeforeDateTimeJson != undefined && disableBeforeDateTimeJson.year != undefined && currentYearDateTimeJson.year < disableBeforeDateTimeJson.year)
                    currentYearDisabledAttr = 'disabled';
                if (disableAfterDateTimeJson != undefined && disableAfterDateTimeJson.year != undefined && currentYearDateTimeJson.year > disableAfterDateTimeJson.year)
                    currentYearDisabledAttr = 'disabled';
                if (setting.disableBeforeToday && currentYearDateTimeJson.year < todayDateTimeJson.year)
                    currentYearDisabledAttr = 'disabled';
                if (setting.disableAfterToday && currentYearDateTimeJson.year > todayDateTimeJson.year)
                    currentYearDisabledAttr = 'disabled';
                if (counter == 1)
                    yearsBoxHtml += '<tr>';
                yearsBoxHtml += "\n<td class=\"text-center\" title=\"" + selectedYearTitle + "\" " + todayAttr + " " + selectedYearAttr + ">\n  <button class=\"btn btn-sm btn-light\" type=\"button\" data-change-date-button=\"true\" data-number=\"" + yearDateNumber + "\" " + currentYearDisabledAttr + " " + disabledAttr + ">" + yearText + "</button>\n</td>\n";
                if (counter == 5)
                    yearsBoxHtml += '</tr>';
                counter++;
                if (counter > 5)
                    counter = 1;
            }
            html = html.replace(/\{\{yearsBoxHtml\}\}/img, yearsBoxHtml);
            html = html.replace(/\{\{cancelText\}\}/img, setting.isGregorian ? this.cancelText : this.cancelTextPersian);
            return {
                yearStart: yearStart,
                yearEnd: yearEnd,
                html: html
            };
        };
        MdsPersianDateTimePicker.prototype.getYearsBoxHeaderHtml = function (setting, yearStart, yearEnd) {
            var yearsRangeText = " " + yearStart + " - " + (yearEnd - 1) + " ";
            var disabledDateObj = this.getDisabledDateObject(setting);
            var html = this.popoverHeaderSelectYearHtmlTemplate;
            html = html.replace(/\{{rtlCssClass\}\}/img, setting.isGregorian ? '' : 'rtl');
            html = html.replace(/\{{dirAttrValue\}\}/img, setting.isGregorian ? 'ltr' : 'rtl');
            html = html.replace(/\{\{yearsRangeText\}\}/img, setting.isGregorian ? yearsRangeText : this.toPersianNumber(yearsRangeText));
            html = html.replace(/\{\{previousText\}\}/img, setting.isGregorian ? this.previousText : this.previousTextPersian);
            html = html.replace(/\{\{nextText\}\}/img, setting.isGregorian ? this.nextText : this.nextTextPersian);
            html = html.replace(/\{\{latestPreviousYear\}\}/img, yearStart > yearEnd ? yearEnd.toString() : yearStart.toString());
            html = html.replace(/\{\{latestNextYear\}\}/img, yearStart > yearEnd ? yearStart.toString() : yearEnd.toString());
            html = html.replace(/\{\{prevYearButtonAttr\}\}/img, disabledDateObj[0] != null && yearStart - 1 < disabledDateObj[0].year ? 'disabled' : '');
            html = html.replace(/\{\{nextYearButtonAttr\}\}/img, disabledDateObj[1] != null && yearEnd + 1 > disabledDateObj[1].year ? 'disabled' : '');
            return html;
        };
        MdsPersianDateTimePicker.prototype.getDateTimePickerMonthHtml = function (setting, isNextMonth, isPrevMonth) {
            var selectedDateToShow = this.getClonedDate(setting.selectedDateToShow);
            var selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
            var selectedDateTime = setting.selectedDate != undefined ? this.getClonedDate(setting.selectedDate) : undefined;
            var isNextOrPrevMonth = isNextMonth || isPrevMonth;
            var html = this.dateTimePickerMonthTableHtmlTemplate;
            html = html.replace(/\{\{monthTdAttribute\}\}/img, isNextMonth ? 'data-next-month' : isPrevMonth ? 'data-prev-month' : '');
            html = html.replace(/\{\{monthNameAttribute\}\}/img, !isNextOrPrevMonth ? 'hidden' : '');
            html = html.replace(/\{\{theadSelectDateButtonTrAttribute\}\}/img, setting.inLine || !isNextOrPrevMonth ? '' : 'hidden');
            html = html.replace(/\{\{weekDayShortName1CssClass\}\}/img, setting.isGregorian ? 'text-danger' : '');
            html = html.replace(/\{\{weekDayShortName7CssClass\}\}/img, !setting.isGregorian ? 'text-danger' : '');
            html = html.replace(/\{\{previousYearText\}\}/img, setting.isGregorian ? this.previousYearText : this.previousYearTextPersian);
            html = html.replace(/\{\{previousMonthText\}\}/img, setting.isGregorian ? this.previousMonthText : this.previousMonthTextPersian);
            html = html.replace(/\{\{nextMonthText\}\}/img, setting.isGregorian ? this.nextMonthText : this.nextMonthTextPersian);
            html = html.replace(/\{\{nextYearText\}\}/img, setting.isGregorian ? this.nextYearText : this.nextYearTextPersian);
            html = html.replace(/\{\{monthName1\}\}/img, this.getMonthName(0, setting.isGregorian));
            html = html.replace(/\{\{monthName2\}\}/img, this.getMonthName(1, setting.isGregorian));
            html = html.replace(/\{\{monthName3\}\}/img, this.getMonthName(2, setting.isGregorian));
            html = html.replace(/\{\{monthName4\}\}/img, this.getMonthName(3, setting.isGregorian));
            html = html.replace(/\{\{monthName5\}\}/img, this.getMonthName(4, setting.isGregorian));
            html = html.replace(/\{\{monthName6\}\}/img, this.getMonthName(5, setting.isGregorian));
            html = html.replace(/\{\{monthName7\}\}/img, this.getMonthName(6, setting.isGregorian));
            html = html.replace(/\{\{monthName8\}\}/img, this.getMonthName(7, setting.isGregorian));
            html = html.replace(/\{\{monthName9\}\}/img, this.getMonthName(8, setting.isGregorian));
            html = html.replace(/\{\{monthName10\}\}/img, this.getMonthName(9, setting.isGregorian));
            html = html.replace(/\{\{monthName11\}\}/img, this.getMonthName(10, setting.isGregorian));
            html = html.replace(/\{\{monthName12\}\}/img, this.getMonthName(11, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName1\}\}/img, this.getWeekDayShortName(0, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName2\}\}/img, this.getWeekDayShortName(1, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName3\}\}/img, this.getWeekDayShortName(2, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName4\}\}/img, this.getWeekDayShortName(3, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName5\}\}/img, this.getWeekDayShortName(4, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName6\}\}/img, this.getWeekDayShortName(5, setting.isGregorian));
            html = html.replace(/\{\{weekDayShortName7\}\}/img, this.getWeekDayShortName(6, setting.isGregorian));
            var disabledDateObj = this.getDisabledDateObject(setting);
            var i = 0, j = 0, firstWeekDayNumber, cellNumber = 0, tdNumber = 0, selectedDateNumber = 0, selectedMonthName = '', todayDateTimeJson, // year, month, day, hour, minute, second
            dateTimeToShowJson, // year, month, day, hour, minute, second
            numberOfDaysInCurrentMonth = 0, numberOfDaysInPreviousMonth = 0, tr = document.createElement('TR'), td = document.createElement("TD"), daysHtml = '', currentDateNumber = 0, previousMonthDateNumber = 0, nextMonthDateNumber = 0, previousYearDateNumber = 0, nextYearDateNumber = 0, rangeSelectorStartDate = !setting.rangeSelector || setting.rangeSelectorStartDate == undefined ? undefined : this.getClonedDate(setting.rangeSelectorStartDate), rangeSelectorEndDate = !setting.rangeSelector || setting.rangeSelectorEndDate == undefined ? undefined : this.getClonedDate(setting.rangeSelectorEndDate), rangeSelectorStartDateNumber = 0, rangeSelectorEndDateNumber = 0, dayNumberInString = '0', dayOfWeek = '', // نام روز هفته
            monthsDateNumberAndAttr = {
                month1DateNumber: 0,
                month2DateNumber: 0,
                month3DateNumber: 0,
                month4DateNumber: 0,
                month5DateNumber: 0,
                month6DateNumber: 0,
                month7DateNumber: 0,
                month8DateNumber: 0,
                month9DateNumber: 0,
                month10DateNumber: 0,
                month11DateNumber: 0,
                month12DateNumber: 0,
                selectMonth1ButtonCssClass: '',
                selectMonth2ButtonCssClass: '',
                selectMonth3ButtonCssClass: '',
                selectMonth4ButtonCssClass: '',
                selectMonth5ButtonCssClass: '',
                selectMonth6ButtonCssClass: '',
                selectMonth7ButtonCssClass: '',
                selectMonth8ButtonCssClass: '',
                selectMonth9ButtonCssClass: '',
                selectMonth10ButtonCssClass: '',
                selectMonth11ButtonCssClass: '',
                selectMonth12ButtonCssClass: '',
            }, holidaysDateNumbers = [], disabledDatesNumber = [], specialDatesNumber = [], disableBeforeDateTimeJson = disabledDateObj[0], disableAfterDateTimeJson = disabledDateObj[1], previousYearButtonDisabledAttribute = '', previousMonthButtonDisabledAttribute = '', selectYearButtonDisabledAttribute = '', nextMonthButtonDisabledAttribute = '', nextYearButtonDisabledAttribute = '', isTrAppended = false;
            if (setting.isGregorian) {
                dateTimeToShowJson = this.getDateTimeJson1(selectedDateToShowTemp);
                todayDateTimeJson = this.getDateTimeJson1(new Date());
                firstWeekDayNumber = new Date(dateTimeToShowJson.year, dateTimeToShowJson.month - 1, 1).getDay();
                selectedDateNumber = !selectedDateTime ? 0 : this.convertToNumber1(this.getDateTimeJson1(selectedDateTime));
                numberOfDaysInCurrentMonth = this.getDaysInMonth(dateTimeToShowJson.year, dateTimeToShowJson.month - 1);
                numberOfDaysInPreviousMonth = this.getDaysInMonth(dateTimeToShowJson.year, dateTimeToShowJson.month - 2);
                previousMonthDateNumber = this.convertToNumber1(this.getDateTimeJson1(this.getLastDayDateOfPreviousMonth(selectedDateToShowTemp, true)));
                nextMonthDateNumber = this.convertToNumber1(this.getDateTimeJson1(this.getFirstDayDateOfNextMonth(selectedDateToShowTemp, true)));
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                previousYearDateNumber = this.convertToNumber1(this.getDateTimeJson1(new Date(selectedDateToShowTemp.setFullYear(selectedDateToShowTemp.getFullYear() - 1))));
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                nextYearDateNumber = this.convertToNumber1(this.getDateTimeJson1(new Date(selectedDateToShowTemp.setFullYear(selectedDateToShowTemp.getFullYear() + 1))));
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                rangeSelectorStartDateNumber = !setting.rangeSelector || !rangeSelectorStartDate ? 0 : this.convertToNumber3(rangeSelectorStartDate);
                rangeSelectorEndDateNumber = !setting.rangeSelector || !rangeSelectorEndDate ? 0 : this.convertToNumber3(rangeSelectorEndDate);
                for (i = 1; i <= 12; i++) {
                    monthsDateNumberAndAttr['month' + i.toString() + 'DateNumber'] = this.convertToNumber1(this.getDateTimeJson1(new Date(selectedDateToShowTemp.setMonth(i - 1))));
                    selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                }
                for (i = 0; i < setting.holidays.length; i++) {
                    holidaysDateNumbers.push(this.convertToNumber1(this.getDateTimeJson1(setting.holidays[i])));
                }
                for (i = 0; i < setting.disabledDates.length; i++) {
                    disabledDatesNumber.push(this.convertToNumber1(this.getDateTimeJson1(setting.disabledDates[i])));
                }
                for (i = 0; i < setting.specialDates.length; i++) {
                    specialDatesNumber.push(this.convertToNumber1(this.getDateTimeJson1(setting.specialDates[i])));
                }
            }
            else {
                dateTimeToShowJson = this.getDateTimeJsonPersian1(selectedDateToShowTemp);
                todayDateTimeJson = this.getDateTimeJsonPersian1(new Date());
                firstWeekDayNumber = this.getDateTimeJsonPersian2(dateTimeToShowJson.year, dateTimeToShowJson.month, 1, 0, 0, 0).dayOfWeek;
                selectedDateNumber = !selectedDateTime ? 0 : this.convertToNumber1(this.getDateTimeJsonPersian1(selectedDateTime));
                numberOfDaysInCurrentMonth = this.getDaysInMonthPersian(dateTimeToShowJson.year, dateTimeToShowJson.month);
                numberOfDaysInPreviousMonth = this.getDaysInMonthPersian(dateTimeToShowJson.year - 1, dateTimeToShowJson.month - 1);
                previousMonthDateNumber = this.convertToNumber1(this.getDateTimeJsonPersian1(this.getLastDayDateOfPreviousMonth(selectedDateToShowTemp, false)));
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                nextMonthDateNumber = this.convertToNumber1(this.getDateTimeJsonPersian1(this.getFirstDayDateOfNextMonth(selectedDateToShowTemp, false)));
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                previousYearDateNumber = this.convertToNumber2(dateTimeToShowJson.year - 1, dateTimeToShowJson.month, dateTimeToShowJson.day);
                nextYearDateNumber = this.convertToNumber2(dateTimeToShowJson.year + 1, dateTimeToShowJson.month, dateTimeToShowJson.day);
                selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                rangeSelectorStartDateNumber = !setting.rangeSelector || !rangeSelectorStartDate ? 0 : this.convertToNumber1(this.getDateTimeJsonPersian1(rangeSelectorStartDate));
                rangeSelectorEndDateNumber = !setting.rangeSelector || !rangeSelectorEndDate ? 0 : this.convertToNumber1(this.getDateTimeJsonPersian1(rangeSelectorEndDate));
                for (i = 1; i <= 12; i++) {
                    monthsDateNumberAndAttr['month' + i.toString() + 'DateNumber'] = this.convertToNumber2(dateTimeToShowJson.year, i, this.getDaysInMonthPersian(dateTimeToShowJson.year, i));
                    selectedDateToShowTemp = this.getClonedDate(selectedDateToShow);
                }
                for (i = 0; i < setting.holidays.length; i++) {
                    holidaysDateNumbers.push(this.convertToNumber1(this.getDateTimeJsonPersian1(setting.holidays[i])));
                }
                for (i = 0; i < setting.disabledDates.length; i++) {
                    disabledDatesNumber.push(this.convertToNumber1(this.getDateTimeJsonPersian1(setting.disabledDates[i])));
                }
                for (i = 0; i < setting.specialDates.length; i++) {
                    specialDatesNumber.push(this.convertToNumber1(this.getDateTimeJsonPersian1(setting.specialDates[i])));
                }
            }
            var todayDateNumber = this.convertToNumber1(todayDateTimeJson);
            var selectedYear = setting.isGregorian ? dateTimeToShowJson.year.toString() : this.toPersianNumber(dateTimeToShowJson.year);
            var disableBeforeDateTimeNumber = !disableBeforeDateTimeJson ? undefined : this.convertToNumber1(disableBeforeDateTimeJson);
            var disableAfterDateTimeNumber = !disableAfterDateTimeJson ? undefined : this.convertToNumber1(disableAfterDateTimeJson);
            var currentMonthInfo = this.getMonthName(dateTimeToShowJson.month - 1, setting.isGregorian) + ' ' + dateTimeToShowJson.year.toString();
            if (!setting.isGregorian)
                currentMonthInfo = this.toPersianNumber(currentMonthInfo);
            selectedMonthName = this.getMonthName(dateTimeToShowJson.month - 1, setting.isGregorian);
            if (setting.yearOffset <= 0) {
                previousYearButtonDisabledAttribute = 'disabled';
                nextYearButtonDisabledAttribute = 'disabled';
                selectYearButtonDisabledAttribute = 'disabled';
            }
            // روز های ماه قبل
            if (!setting.isGregorian && firstWeekDayNumber != 6 || setting.isGregorian && firstWeekDayNumber != 0) {
                if (setting.isGregorian)
                    firstWeekDayNumber--;
                var previousMonthDateTimeJson = this.addMonthToDateTimeJson(dateTimeToShowJson, -1, setting.isGregorian);
                for (i = numberOfDaysInPreviousMonth - firstWeekDayNumber; i <= numberOfDaysInPreviousMonth; i++) {
                    currentDateNumber = this.convertToNumber2(previousMonthDateTimeJson.year, previousMonthDateTimeJson.month, i);
                    dayNumberInString = setting.isGregorian ? this.zeroPad(i) : this.toPersianNumber(this.zeroPad(i));
                    td = document.createElement('TD');
                    td.setAttribute('data-nm', '');
                    td.setAttribute('data-number', currentDateNumber.toString());
                    td.innerHTML = dayNumberInString;
                    if (setting.rangeSelector) {
                        if (currentDateNumber == rangeSelectorStartDateNumber || currentDateNumber == rangeSelectorEndDateNumber)
                            td.classList.add('selected-range-days-start-end');
                        else if (rangeSelectorStartDateNumber > 0 && rangeSelectorEndDateNumber > 0 && currentDateNumber > rangeSelectorStartDateNumber && currentDateNumber < rangeSelectorEndDateNumber)
                            td.classList.add('selected-range-days-nm');
                    }
                    // روز جمعه
                    if (!setting.isGregorian && tdNumber == 6)
                        td.classList.add('text-danger');
                    // روز یکشنبه
                    else if (setting.isGregorian && tdNumber == 0)
                        td.classList.add('text-danger');
                    tr.appendChild(td);
                    cellNumber++;
                    tdNumber++;
                    if (tdNumber >= 7) {
                        tdNumber = 0;
                        daysHtml += tr.outerHTML;
                        isTrAppended = true;
                        tr = document.createElement('TR');
                    }
                }
            }
            // روزهای ماه جاری
            for (i = 1; i <= numberOfDaysInCurrentMonth; i++) {
                if (tdNumber >= 7) {
                    tdNumber = 0;
                    daysHtml += tr.outerHTML;
                    isTrAppended = true;
                    tr = document.createElement('TR');
                }
                // عدد روز
                currentDateNumber = this.convertToNumber2(dateTimeToShowJson.year, dateTimeToShowJson.month, i);
                dayNumberInString = setting.isGregorian ? this.zeroPad(i) : this.toPersianNumber(this.zeroPad(i));
                td = document.createElement('TD');
                td.setAttribute('data-day', '');
                td.setAttribute('data-number', currentDateNumber.toString());
                td.innerHTML = dayNumberInString;
                // امروز
                if (currentDateNumber == todayDateNumber) {
                    td.setAttribute('data-today', '');
                    td.setAttribute('title', setting.isGregorian ? this.todayText : this.todayTextPersian);
                    // اگر نام روز هفته انتخاب شده در تکس باکس قبل از تاریخ امروز باشد
                    // نباید دیگر نام روز هفته تغییر کند
                    if (!dayOfWeek)
                        dayOfWeek = this.getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
                }
                // روز از قبل انتخاب شده
                if (!setting.rangeSelector && selectedDateNumber == currentDateNumber) {
                    td.setAttribute('data-mds-dtp-selected-day', '');
                    dayOfWeek = this.getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
                }
                // روزهای تعطیل
                for (j = 0; j < holidaysDateNumbers.length; j++) {
                    if (holidaysDateNumbers[j] != currentDateNumber)
                        continue;
                    td.classList.add('text-danger');
                    break;
                }
                // روز جمعه شمسی
                if (!setting.isGregorian && tdNumber == 6) {
                    td.classList.add('text-danger');
                }
                // روز یکشنبه میلادی
                else if (setting.isGregorian && tdNumber == 0) {
                    td.classList.add('text-danger');
                }
                // روزهای غیر فعال شده
                if (setting.disableBeforeToday) {
                    if (currentDateNumber < todayDateNumber)
                        td.setAttribute('disabled', '');
                    if (nextMonthDateNumber < todayDateNumber)
                        nextMonthButtonDisabledAttribute = 'disabled';
                    if (nextYearDateNumber < todayDateNumber)
                        nextYearButtonDisabledAttribute = 'disabled';
                    if (previousMonthDateNumber < todayDateNumber)
                        previousMonthButtonDisabledAttribute = 'disabled';
                    if (previousYearDateNumber < todayDateNumber)
                        previousYearButtonDisabledAttribute = 'disabled';
                    for (j = 1; j <= 12; j++) {
                        if (monthsDateNumberAndAttr['month' + j.toString() + 'DateNumber'] < todayDateNumber)
                            monthsDateNumberAndAttr['selectMonth' + j.toString() + 'ButtonCssClass'] = 'disabled';
                    }
                }
                if (setting.disableAfterToday) {
                    if (currentDateNumber > todayDateNumber)
                        td.setAttribute('disabled', '');
                    if (nextMonthDateNumber > todayDateNumber)
                        nextMonthButtonDisabledAttribute = 'disabled';
                    if (nextYearDateNumber > todayDateNumber)
                        nextYearButtonDisabledAttribute = 'disabled';
                    if (previousMonthDateNumber > todayDateNumber)
                        previousMonthButtonDisabledAttribute = 'disabled';
                    if (previousYearDateNumber > todayDateNumber)
                        previousYearButtonDisabledAttribute = 'disabled';
                    for (j = 1; j <= 12; j++) {
                        if (monthsDateNumberAndAttr['month' + j.toString() + 'DateNumber'] > todayDateNumber)
                            monthsDateNumberAndAttr['selectMonth' + j.toString() + 'ButtonCssClass'] = 'disabled';
                    }
                }
                if (disableAfterDateTimeNumber) {
                    if (currentDateNumber > disableAfterDateTimeNumber)
                        td.setAttribute('disabled', '');
                    if (nextMonthDateNumber > disableAfterDateTimeNumber)
                        nextMonthButtonDisabledAttribute = 'disabled';
                    if (nextYearDateNumber > disableAfterDateTimeNumber)
                        nextYearButtonDisabledAttribute = 'disabled';
                    if (previousMonthDateNumber > disableAfterDateTimeNumber)
                        previousMonthButtonDisabledAttribute = 'disabled';
                    if (previousYearDateNumber > disableAfterDateTimeNumber)
                        previousYearButtonDisabledAttribute = 'disabled';
                    for (j = 1; j <= 12; j++) {
                        if (monthsDateNumberAndAttr['month' + j.toString() + 'DateNumber'] > disableAfterDateTimeNumber)
                            monthsDateNumberAndAttr['selectMonth' + j.toString() + 'ButtonCssClass'] = 'disabled';
                    }
                }
                if (disableBeforeDateTimeNumber) {
                    if (currentDateNumber < disableBeforeDateTimeNumber)
                        td.setAttribute('disabled', '');
                    if (nextMonthDateNumber < disableBeforeDateTimeNumber)
                        nextMonthButtonDisabledAttribute = 'disabled';
                    if (nextYearDateNumber < disableBeforeDateTimeNumber)
                        nextYearButtonDisabledAttribute = 'disabled';
                    if (previousMonthDateNumber < disableBeforeDateTimeNumber)
                        previousMonthButtonDisabledAttribute = 'disabled';
                    if (previousYearDateNumber < disableBeforeDateTimeNumber)
                        previousYearButtonDisabledAttribute = 'disabled';
                    for (j = 1; j <= 12; j++) {
                        if (monthsDateNumberAndAttr['month' + j.toString() + 'DateNumber'] < disableBeforeDateTimeNumber)
                            monthsDateNumberAndAttr['selectMonth' + j.toString() + 'ButtonCssClass'] = 'disabled';
                    }
                }
                for (j = 0; j < disabledDatesNumber.length; j++) {
                    if (currentDateNumber == disabledDatesNumber[j])
                        td.setAttribute('disabled', '');
                }
                for (j = 0; j < specialDatesNumber.length; j++) {
                    if (currentDateNumber == specialDatesNumber[j])
                        td.setAttribute('data-special-date', '');
                }
                if (setting.disabledDays != null && setting.disabledDays.length > 0 && setting.disabledDays.indexOf(tdNumber) >= 0) {
                    td.setAttribute('disabled', '');
                }
                // \\
                if (setting.rangeSelector) {
                    if (currentDateNumber == rangeSelectorStartDateNumber || currentDateNumber == rangeSelectorEndDateNumber)
                        td.classList.add('selected-range-days-start-end');
                    else if (rangeSelectorStartDateNumber > 0 && rangeSelectorEndDateNumber > 0 && currentDateNumber > rangeSelectorStartDateNumber && currentDateNumber < rangeSelectorEndDateNumber)
                        td.classList.add('selected-range-days');
                }
                tr.appendChild(td);
                isTrAppended = false;
                tdNumber++;
                cellNumber++;
            }
            if (tdNumber >= 7) {
                tdNumber = 0;
                daysHtml += tr.outerHTML;
                isTrAppended = true;
                tr = document.createElement('TR');
            }
            // روزهای ماه بعد
            var nextMonthDateTimeJson = this.addMonthToDateTimeJson(dateTimeToShowJson, 1, setting.isGregorian);
            for (i = 1; i <= 42 - cellNumber; i++) {
                dayNumberInString = setting.isGregorian ? this.zeroPad(i) : this.toPersianNumber(this.zeroPad(i));
                currentDateNumber = this.convertToNumber2(nextMonthDateTimeJson.year, nextMonthDateTimeJson.month, i);
                td = document.createElement('TD');
                td.setAttribute('data-nm', '');
                td.setAttribute('data-number', currentDateNumber.toString());
                td.innerHTML = dayNumberInString;
                if (setting.rangeSelector) {
                    if (currentDateNumber == rangeSelectorStartDateNumber || currentDateNumber == rangeSelectorEndDateNumber)
                        td.classList.add('selected-range-days-start-end');
                    else if (rangeSelectorStartDateNumber > 0 && rangeSelectorEndDateNumber > 0 && currentDateNumber > rangeSelectorStartDateNumber && currentDateNumber < rangeSelectorEndDateNumber)
                        td.classList.add('selected-range-days-nm');
                }
                // روز جمعه
                if (!setting.isGregorian && tdNumber == 6)
                    td.classList.add('text-danger');
                // روز یکشنبه
                else if (setting.isGregorian && tdNumber == 0)
                    td.classList.add('text-danger');
                tr.appendChild(td);
                tdNumber++;
                if (tdNumber >= 7) {
                    tdNumber = 0;
                    daysHtml += tr.outerHTML;
                    isTrAppended = true;
                    tr = document.createElement('TR');
                }
            }
            if (!isTrAppended) {
                daysHtml += tr.outerHTML;
                isTrAppended = true;
            }
            html = html.replace(/\{\{currentMonthInfo\}\}/img, currentMonthInfo);
            html = html.replace(/\{\{selectedYear\}\}/img, selectedYear);
            html = html.replace(/\{\{selectedMonthName\}\}/img, selectedMonthName);
            html = html.replace(/\{\{daysHtml\}\}/img, daysHtml);
            html = html.replace(/\{\{previousYearButtonDisabledAttribute\}\}/img, previousYearButtonDisabledAttribute);
            html = html.replace(/\{\{previousYearButtonDateNumber\}\}/img, previousYearDateNumber.toString());
            html = html.replace(/\{\{previousMonthButtonDisabledAttribute\}\}/img, previousMonthButtonDisabledAttribute);
            html = html.replace(/\{\{previousMonthButtonDateNumber\}\}/img, previousMonthDateNumber.toString());
            html = html.replace(/\{\{selectYearButtonDisabledAttribute\}\}/img, selectYearButtonDisabledAttribute);
            html = html.replace(/\{\{nextMonthButtonDisabledAttribute\}\}/img, nextMonthButtonDisabledAttribute);
            html = html.replace(/\{\{nextMonthButtonDateNumber\}\}/img, nextMonthDateNumber.toString());
            html = html.replace(/\{\{nextYearButtonDisabledAttribute\}\}/img, nextYearButtonDisabledAttribute);
            html = html.replace(/\{\{nextYearButtonDateNumber\}\}/img, nextYearDateNumber.toString());
            html = html.replace(/\{\{dropDownMenuMonth1DateNumber\}\}/img, monthsDateNumberAndAttr.month1DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth2DateNumber\}\}/img, monthsDateNumberAndAttr.month2DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth3DateNumber\}\}/img, monthsDateNumberAndAttr.month3DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth4DateNumber\}\}/img, monthsDateNumberAndAttr.month4DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth5DateNumber\}\}/img, monthsDateNumberAndAttr.month5DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth6DateNumber\}\}/img, monthsDateNumberAndAttr.month6DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth7DateNumber\}\}/img, monthsDateNumberAndAttr.month7DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth8DateNumber\}\}/img, monthsDateNumberAndAttr.month8DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth9DateNumber\}\}/img, monthsDateNumberAndAttr.month9DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth10DateNumber\}\}/img, monthsDateNumberAndAttr.month10DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth11DateNumber\}\}/img, monthsDateNumberAndAttr.month11DateNumber);
            html = html.replace(/\{\{dropDownMenuMonth12DateNumber\}\}/img, monthsDateNumberAndAttr.month12DateNumber);
            html = html.replace(/\{\{selectMonth1ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth1ButtonCssClass);
            html = html.replace(/\{\{selectMonth2ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth2ButtonCssClass);
            html = html.replace(/\{\{selectMonth3ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth3ButtonCssClass);
            html = html.replace(/\{\{selectMonth4ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth4ButtonCssClass);
            html = html.replace(/\{\{selectMonth5ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth5ButtonCssClass);
            html = html.replace(/\{\{selectMonth6ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth6ButtonCssClass);
            html = html.replace(/\{\{selectMonth7ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth7ButtonCssClass);
            html = html.replace(/\{\{selectMonth8ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth8ButtonCssClass);
            html = html.replace(/\{\{selectMonth9ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth9ButtonCssClass);
            html = html.replace(/\{\{selectMonth10ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth10ButtonCssClass);
            html = html.replace(/\{\{selectMonth11ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth11ButtonCssClass);
            html = html.replace(/\{\{selectMonth12ButtonCssClass\}\}/img, monthsDateNumberAndAttr.selectMonth12ButtonCssClass);
            return html;
        };
        MdsPersianDateTimePicker.prototype.getPopoverHeaderTitle = function (setting) {
            var selectedDateToShowJson;
            var title = '';
            if (setting.isGregorian) {
                selectedDateToShowJson = this.getDateTimeJson1(setting.selectedDateToShow);
            }
            else {
                selectedDateToShowJson = this.getDateTimeJsonPersian1(setting.selectedDateToShow);
            }
            if (setting.rangeSelector) {
                var startDate = this.addMonthToDateTime(setting.selectedDateToShow, -setting.rangeSelectorMonthsToShow[0], setting.isGregorian);
                var endDate = this.addMonthToDateTime(setting.selectedDateToShow, setting.rangeSelectorMonthsToShow[1], setting.isGregorian);
                var statDateJson = void 0;
                var endDateJson = void 0;
                if (setting.isGregorian) {
                    statDateJson = this.getDateTimeJson1(startDate);
                    endDateJson = this.getDateTimeJson1(endDate);
                }
                else {
                    statDateJson = this.getDateTimeJsonPersian1(startDate);
                    endDateJson = this.getDateTimeJsonPersian1(endDate);
                }
                var startMonthName = this.getMonthName(statDateJson.month - 1, setting.isGregorian);
                var endMonthName = this.getMonthName(endDateJson.month - 1, setting.isGregorian);
                title = startMonthName + " " + statDateJson.year + " - " + endMonthName + " " + endDateJson.year;
            }
            else
                title = this.getMonthName(selectedDateToShowJson.month - 1, setting.isGregorian) + " " + selectedDateToShowJson.year;
            if (!setting.isGregorian)
                title = this.toPersianNumber(title);
            return title;
        };
        MdsPersianDateTimePicker.prototype.getDateTimePickerBodyHtml = function (setting) {
            var selectedDateToShow = this.getClonedDate(setting.selectedDateToShow);
            var html = this.dateTimePickerHtmlTemplate;
            html = html.replace(/\{\{inlineAttr\}\}/img, setting.inLine ? 'data-inline' : '');
            html = html.replace(/\{\{rtlCssClass\}\}/img, setting.isGregorian ? '' : 'rtl');
            html = html.replace(/\{\{selectedDateStringAttribute\}\}/img, setting.inLine ? '' : 'hidden');
            html = html.replace(/\{\{goTodayText\}\}/img, setting.isGregorian ? this.goTodayText : this.goTodayTextPersian);
            html = html.replace(/\{\{timePickerAttribute\}\}/img, setting.enableTimePicker ? '' : 'hidden');
            var disabledDays = this.getDisabledDateObject(setting);
            var title = '';
            var todayDateString = '';
            var todayDateTimeJson;
            var selectedDateTimeToShowJson;
            var disableBeforeDateTimeJson = disabledDays[0];
            var disableAfterDateTimeJson = disabledDays[1];
            if (setting.isGregorian) {
                selectedDateTimeToShowJson = this.getDateTimeJson1(selectedDateToShow);
                todayDateTimeJson = this.getDateTimeJson1(new Date());
            }
            else {
                selectedDateTimeToShowJson = this.getDateTimeJsonPersian1(selectedDateToShow);
                todayDateTimeJson = this.getDateTimeJsonPersian1(new Date());
            }
            title = this.getPopoverHeaderTitle(setting);
            todayDateString = (setting.isGregorian ? 'Today,' : 'امروز،') + " " + todayDateTimeJson.day + " " + this.getMonthName(todayDateTimeJson.month - 1, setting.isGregorian) + " " + todayDateTimeJson.year;
            if (!setting.isGregorian) {
                todayDateString = this.toPersianNumber(todayDateString);
            }
            if (disableAfterDateTimeJson != undefined && disableAfterDateTimeJson.year <= selectedDateTimeToShowJson.year && disableAfterDateTimeJson.month < selectedDateTimeToShowJson.month)
                selectedDateToShow = setting.isGregorian ? new Date(disableAfterDateTimeJson.year, disableAfterDateTimeJson.month - 1, 1) : this.getDateTime1(disableAfterDateTimeJson.year, disableAfterDateTimeJson.month, disableAfterDateTimeJson.day);
            if (disableBeforeDateTimeJson != undefined && disableBeforeDateTimeJson.year >= selectedDateTimeToShowJson.year && disableBeforeDateTimeJson.month > selectedDateTimeToShowJson.month)
                selectedDateToShow = setting.isGregorian ? new Date(disableBeforeDateTimeJson.year, disableBeforeDateTimeJson.month - 1, 1) : this.getDateTime1(disableBeforeDateTimeJson.year, disableBeforeDateTimeJson.month, disableBeforeDateTimeJson.day);
            var monthsTdHtml = '';
            var numberOfNextMonths = setting.rangeSelectorMonthsToShow[1] <= 0 ? 0 : setting.rangeSelectorMonthsToShow[1];
            var numberOfPrevMonths = setting.rangeSelectorMonthsToShow[0] <= 0 ? 0 : setting.rangeSelectorMonthsToShow[0];
            numberOfPrevMonths *= -1;
            for (var i1 = numberOfPrevMonths; i1 < 0; i1++) {
                setting.selectedDateToShow = this.addMonthToDateTime(this.getClonedDate(selectedDateToShow), i1, false);
                monthsTdHtml += this.getDateTimePickerMonthHtml(setting, false, true);
            }
            setting.selectedDateToShow = this.getClonedDate(selectedDateToShow);
            monthsTdHtml += this.getDateTimePickerMonthHtml(setting, false, false);
            for (var i2 = 1; i2 <= numberOfNextMonths; i2++) {
                setting.selectedDateToShow = this.addMonthToDateTime(this.getClonedDate(selectedDateToShow), i2, false);
                monthsTdHtml += this.getDateTimePickerMonthHtml(setting, true, false);
            }
            var totalMonthNumberToShow = Math.abs(numberOfPrevMonths) + 1 + numberOfNextMonths;
            var monthTdStyle = totalMonthNumberToShow > 1 ? 'width: ' + (100 / totalMonthNumberToShow).toString() + '%;' : '';
            monthsTdHtml = monthsTdHtml.replace(/\{\{monthTdStyle\}\}/img, monthTdStyle);
            html = html.replace(/\{\{dtpInlineHeader\}\}/img, title);
            html = html.replace(/\{\{todayDateString\}\}/img, todayDateString);
            html = html.replace(/\{\{time\}\}/img, this.zeroPad(selectedDateTimeToShowJson.hour) + ":" + this.zeroPad(selectedDateTimeToShowJson.minute));
            html = html.replace(/\{\{monthsTdHtml\}\}/img, monthsTdHtml);
            return html;
        };
        MdsPersianDateTimePicker.prototype.enableMainEvents = function () {
            if (this.setting.inLine)
                return;
            this.element.addEventListener('shown.bs.popover', this.popoverShownEvent);
            this.element.addEventListener('hidden.bs.popover', this.popoverHiddenEvent);
            this.element.addEventListener('inserted.bs.popover', this.popoverInsertedEvent);
            this.element.addEventListener('click', this.showPopoverEvent, true);
        };
        MdsPersianDateTimePicker.prototype.enableInLineEvents = function () {
            var _this = this;
            if (!this.setting.inLine)
                return;
            setTimeout(function () {
                var dtp = document.querySelector("[data-mds-dtp-guid=\"" + _this.guid + "\"]");
                dtp.querySelector('[data-mds-dtp-time]').addEventListener('change', _this.timeChanged, false);
                dtp.querySelector('[data-mds-dtp-go-today]').addEventListener('click', _this.goToday, false);
                dtp.addEventListener('click', _this.selectCorrectClickEvent);
                dtp.querySelectorAll('[data-mds-dtp] [data-day]').forEach(function (e) { return e.addEventListener('mouseenter', _this.hoverOnDays, true); });
            }, 100);
        };
        MdsPersianDateTimePicker.prototype.enableEvents = function () {
            var _this = this;
            if (this.setting.inLine)
                return;
            setTimeout(function () {
                document.querySelector('[data-mds-dtp-time]').addEventListener('change', _this.timeChanged, false);
                document.querySelector('[data-mds-dtp-go-today]').addEventListener('click', _this.goToday, false);
                document.addEventListener('click', _this.selectCorrectClickEvent, false);
                document.querySelector('html').addEventListener('click', _this.hidePopoverEvent, true);
                document.querySelectorAll('[data-mds-dtp] [data-day]').forEach(function (e) { return e.addEventListener('mouseenter', _this.hoverOnDays, true); });
            }, 100);
        };
        MdsPersianDateTimePicker.prototype.disableEvents = function () {
            var _this = this;
            var _a, _b, _c, _d, _e;
            document.removeEventListener('click', this.selectCorrectClickEvent);
            (_a = document.querySelector('[data-mds-dtp-time]')) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.timeChanged);
            (_b = document.querySelector('[data-mds-dtp-go-today]')) === null || _b === void 0 ? void 0 : _b.removeEventListener('click', this.goToday);
            document.querySelector('html').removeEventListener('click', this.hidePopoverEvent);
            document.querySelectorAll('[data-mds-dtp] [data-day]').forEach(function (e) { return e.removeEventListener('mouseenter', _this.hoverOnDays); });
            var dtp = document.querySelector("[data-mds-dtp-guid=\"" + this.guid + "\"]");
            if (dtp != null) {
                (_c = dtp.querySelector('[data-mds-dtp-time]')) === null || _c === void 0 ? void 0 : _c.removeEventListener('change', this.timeChanged, false);
                (_d = dtp.querySelector('[data-mds-dtp-go-today]')) === null || _d === void 0 ? void 0 : _d.removeEventListener('click', this.goToday, false);
                dtp.removeEventListener('click', this.selectCorrectClickEvent, false);
                (_e = dtp.querySelectorAll('[data-mds-dtp] [data-day]')) === null || _e === void 0 ? void 0 : _e.forEach(function (e) { return e.removeEventListener('mouseenter', _this.hoverOnDays, true); });
            }
        };
        /**
         * نمایش تقویم
         */
        MdsPersianDateTimePicker.prototype.show = function () {
            if (this.bsPopover == null)
                return;
            this.bsPopover.show();
        };
        /**
         * مخفی کردن تقویم
         */
        MdsPersianDateTimePicker.prototype.hide = function () {
            if (this.bsPopover == null)
                return;
            this.bsPopover.hide();
        };
        /**
         * مخفی یا نمایش تقویم
         */
        MdsPersianDateTimePicker.prototype.toggle = function () {
            if (this.bsPopover == null)
                return;
            this.bsPopover.toggle();
        };
        /**
         * فعال کردن تقویم
         */
        MdsPersianDateTimePicker.prototype.enable = function () {
            this.setting.disabled = false;
            this.element.removeAttribute("disabled");
            MdsPersianDateTimePickerData.set(this.guid, this);
            this.bsPopover.enable();
        };
        /**
         * غیر فعال کردن تقویم
         */
        MdsPersianDateTimePicker.prototype.disable = function () {
            this.setting.disabled = true;
            this.element.setAttribute("disabled", '');
            MdsPersianDateTimePickerData.set(this.guid, this);
            this.bsPopover.disable();
        };
        /**
         * بروز کردن محل قرار گرفتن تقویم
         */
        MdsPersianDateTimePicker.prototype.updatePosition = function () {
            this.bsPopover.update();
        };
        /**
         * به روز کردن متن نمایش تاریخ روز انتخاب شده
         */
        MdsPersianDateTimePicker.prototype.updateSelectedDateText = function () {
            this.setSelectedData(this.setting);
        };
        /**
         * از بین بردن تقویم
         */
        MdsPersianDateTimePicker.prototype.dispose = function () {
            if (this.bsPopover != null)
                this.bsPopover.dispose();
            this.element.removeEventListener('click', this.showPopoverEvent);
            this.bsPopover = null;
        };
        /**
         * دریافت اینستنس پاپ آور بوت استرپ
         */
        MdsPersianDateTimePicker.prototype.getBsPopoverInstance = function () {
            return this.bsPopover;
        };
        /**
         * بروز کردن تنظیمات تقویم
         * @param optionName نام آپشن مورد نظر
         * @param value مقدار
         */
        MdsPersianDateTimePicker.prototype.updateOption = function (optionName, value) {
            this.setting[optionName] = value;
            MdsPersianDateTimePickerData.set(this.guid, this);
            this.initializeBsPopover(this.setting);
        };
        /**
         * دریافت اینستنس تقویم از روی المانی که تقویم روی آن فعال شده است
         * @param element المانی که تقویم روی آن فعال شده
         * @returns اینستنس تقویم
         */
        MdsPersianDateTimePicker.getInstance = function (element) {
            var _a, _b;
            var elementGuid = element.getAttribute('data-mds-dtp-guid');
            if (!elementGuid) {
                elementGuid = (_a = element.closest('[data-mds-dtp-guid]')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-mds-dtp-guid');
                if (!elementGuid) {
                    var id = (_b = element.closest('[data-mds-dtp]')) === null || _b === void 0 ? void 0 : _b.getAttribute('id');
                    if (!id)
                        return null;
                    elementGuid = document.querySelector('[aria-describedby="' + id + '"]').getAttribute('data-mds-dtp-guid');
                    if (!elementGuid)
                        return null;
                }
            }
            ;
            return MdsPersianDateTimePickerData.get(elementGuid);
        };
        return MdsPersianDateTimePicker;
    }());
    exports.MdsPersianDateTimePicker = MdsPersianDateTimePicker;
    var AmPmEnum;
    (function (AmPmEnum) {
        AmPmEnum[AmPmEnum["am"] = 0] = "am";
        AmPmEnum[AmPmEnum["pm"] = 1] = "pm";
        AmPmEnum[AmPmEnum["none"] = 2] = "none";
    })(AmPmEnum || (AmPmEnum = {}));
    var MdsPersianDateTimePickerSetting = /** @class */ (function () {
        function MdsPersianDateTimePickerSetting() {
            /**
             * محل قرار گرفتن تقویم
             */
            this.placement = 'bottom';
            /**
             * فعال بودن تایم پیکر
             */
            this.enableTimePicker = false;
            /**
             * سلکتور نمایش روز انتخاب شده
             */
            this.targetTextSelector = '';
            /**
             * سلکتور ذخیره تاریخ میلادی، برای روز انتخاب شده
             */
            this.targetDateSelector = '';
            /**
             * آیا تقویم برای کنترل روز پایانی تاریخ است
             */
            this.toDate = false;
            /**
             * آیا تقویم برای کنترل روز شروع تاریخ است
             */
            this.fromDate = false;
            /**
             * شناسه گروه در حالتی که از
             * toDate
             * و
             * fromDate
             * استفاده شده است
             */
            this.groupId = '';
            /**
             * آیا تقویم غیر فعال است؟
             */
            this.disabled = false;
            /**
             * فرمت نمایش روز انتخاب شده تقویم
             */
            this.textFormat = '';
            /**
             * فرمت ذخیره تاریخ میلادی انتخاب شده
             */
            this.dateFormat = '';
            /**
             * آیا تقویم میلادی استفاده شود؟
             */
            this.isGregorian = false;
            /**
             * آیا تقویم به صورت این لاین نمایش داده شود؟
             */
            this.inLine = false;
            /**
             * تاریخ انتخاب شده
             */
            this.selectedDate = null;
            /**
             * تاریخی که نمایش تقویم از آن شروع می شود
             */
            this.selectedDateToShow = new Date();
            /**
             * تعداد سال های قابل نمایش در لیست سال های قابل انتخاب
             */
            this.yearOffset = 15;
            /**
             * تاریخ میلادی روزهای تعطیل
             */
            this.holidays = [];
            /**
             * تاریخ میلادی روزهای غیر فعال
             */
            this.disabledDates = [];
            /**
             * عدد روزهایی از هفته که غیر فعال هستند
             */
            this.disabledDays = [];
            /**
             * تاریخ میلادی روزهای خاص
             */
            this.specialDates = [];
            /**
             * آیا روزهای قبل از امروز غیر فعال شوند؟
             */
            this.disableBeforeToday = false;
            /**
             * آیا روزهای بعد از امروز غیر فعال شوند؟
             */
            this.disableAfterToday = false;
            /**
             * روزهای قبل از این تاریخ غیر فعال شود
             */
            this.disableBeforeDate = null;
            /**
             * روزهای بعد از این تاریخ غیر فعال شود
             */
            this.disableAfterDate = null;
            /**
             * آیا تقویم به صورت انتخاب بازه نمایش داده شود؟
             */
            this.rangeSelector = false;
            /**
             * تاریخ شروع تقویم در مد انتخاب بازه تاریخی برای نمایش
             */
            this.rangeSelectorStartDate = null;
            /**
             * تاریخ پایان تقویم در مد انتخاب بازه تاریخی برای نمایش
             */
            this.rangeSelectorEndDate = null;
            /**
             * تعداد ماه های قابل نمایش در قابلیت انتخاب بازه تاریخی
             */
            this.rangeSelectorMonthsToShow = [0, 0];
            /**
             * تاریخ های انتخاب شده در مد بازه انتخابی
             */
            this.selectedRangeDate = [];
            /**
             * آیا تقویم به صورت مدال نمایش داده شود
             */
            this.modalMode = false;
            /**
             * رویداد عوض شدن ماه و تاریخ در دیت پیکر
             * @param _ تاریخ ماه انتخابی
             */
            this.calendarViewOnChange = function (_) { };
            /**
             * رویداد انتخاب روز در دیت پیکر
             * @param _ تمامی تنظیمات دیت پیکر
             */
            this.onDayClick = function (_) { };
        }
        return MdsPersianDateTimePickerSetting;
    }());
    exports.MdsPersianDateTimePickerSetting = MdsPersianDateTimePickerSetting;
    var MdsPersianDateTimePickerElementMap = new Map();
    var MdsPersianDateTimePickerData = {
        set: function (key, instance) {
            if (!MdsPersianDateTimePickerElementMap.has(key)) {
                MdsPersianDateTimePickerElementMap.set(key, instance);
                return;
            }
            MdsPersianDateTimePickerElementMap.set(key, instance);
        },
        get: function (key) {
            return MdsPersianDateTimePickerElementMap.get(key) || null;
        },
        getAll: function () {
            return Array.from(MdsPersianDateTimePickerElementMap, function (_a) {
                var name = _a[0], value = _a[1];
                return value;
            });
        },
        remove: function (key) {
            if (!MdsPersianDateTimePickerElementMap.has(key)) {
                return;
            }
            MdsPersianDateTimePickerElementMap.delete(key);
        }
    };
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),

/***/ 217:
/***/ ((module) => {

"use strict";
module.exports = bootstrap;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(348);
/******/ 	
/******/ })()
;
//# sourceMappingURL=mds.bs.datetimepicker.js.map