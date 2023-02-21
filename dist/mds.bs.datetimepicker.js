import { Modal, Popover } from "bootstrap";
export class MdsPersianDateTimePicker {
    constructor(element, setting) {
        var _a;
        this.guid = '';
        this.bsPopover = null;
        this.bsModal = null;
        this.tempTitleString = '';
        this.hideYearsBox = (element, setting) => {
            if (setting.inLine) {
                const dtpInLine = element.closest('[data-mds-dtp-guid]');
                if (dtpInLine == null)
                    return;
                const dtpInlineHeaderElement = dtpInLine.querySelector('[mds-dtp-inline-header]');
                if (this.tempTitleString && dtpInlineHeaderElement != null)
                    dtpInlineHeaderElement.innerHTML = this.tempTitleString;
                const yearListBoxElement = dtpInLine.querySelector('[data-mds-dtp-year-list-box]');
                if (yearListBoxElement != null) {
                    yearListBoxElement.classList.add('w-0');
                    yearListBoxElement.innerHTML = '';
                }
                const inlineYearsContainerElement = dtpInLine.querySelector('[data-name="dtp-years-container"]');
                if (inlineYearsContainerElement != null) {
                    inlineYearsContainerElement.classList.add('w-0');
                    inlineYearsContainerElement.innerHTML = '';
                }
                dtpInLine.classList.remove('overflow-hidden');
            }
            else {
                const popoverOrModalElement = setting.modalMode ? this.getModal() : this.getPopover(element);
                if (popoverOrModalElement == null)
                    return;
                if (this.tempTitleString) {
                    if (setting.modalMode)
                        popoverOrModalElement.querySelector('[data-mds-dtp-title] .modal-title').innerHTML = this.tempTitleString;
                    else {
                        popoverOrModalElement.querySelector('[data-mds-dtp-title]').innerHTML = this.tempTitleString;
                    }
                    popoverOrModalElement.querySelector('[data-name="mds-dtp-body"]').removeAttribute('hidden');
                }
                const yearListBox = popoverOrModalElement.querySelector('[data-mds-dtp-year-list-box]');
                yearListBox.classList.add('w-0');
                yearListBox.innerHTML = '';
            }
        };
        this.showYearsBox = (element) => {
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance) {
                return;
            }
            const setting = instance.setting;
            const mdDatePickerContainer = setting.inLine ? element.closest('[data-mds-dtp-guid]') : element.closest('[data-mds-dtp]');
            if (mdDatePickerContainer == null)
                return;
            this.tempTitleString = setting.inLine
                ? mdDatePickerContainer.querySelector('[mds-dtp-inline-header]').textContent.trim()
                : mdDatePickerContainer.querySelector('[data-mds-dtp-title]').textContent.trim();
            const yearsToSelectObject = this.getYearsBoxBodyHtml(setting, 0);
            const dateTimePickerYearsToSelectHtml = yearsToSelectObject.html;
            const dateTimePickerYearsToSelectContainer = mdDatePickerContainer.querySelector('[data-mds-dtp-year-list-box]');
            this.setPopoverHeaderHtml(element, setting, this.getYearsBoxHeaderHtml(setting, yearsToSelectObject.yearStart, yearsToSelectObject.yearEnd));
            dateTimePickerYearsToSelectContainer.innerHTML = dateTimePickerYearsToSelectHtml;
            dateTimePickerYearsToSelectContainer.classList.remove('w-0');
            if (setting.inLine) {
                mdDatePickerContainer.classList.add('overflow-hidden');
                dateTimePickerYearsToSelectContainer.classList.add('inline');
            }
            else if (setting.modalMode) {
                mdDatePickerContainer.querySelector('[data-name="mds-dtp-body"]').setAttribute('hidden', '');
            }
            else {
                dateTimePickerYearsToSelectContainer.classList.remove('inline');
            }
        };
        this.changeYearList = (element) => {
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance) {
                return;
            }
            const setting = instance.setting;
            const isNext = element.getAttribute('data-year-range-button-change') == '1';
            const yearStart = Number(element.getAttribute('data-year'));
            const yearsToSelectObject = this.getYearsBoxBodyHtml(setting, isNext ? yearStart : yearStart - setting.yearOffset * 2);
            if (setting.inLine)
                element.closest('[data-mds-dtp-guid]').querySelector('[data-mds-dtp-year-list-box]').innerHTML = yearsToSelectObject.html;
            else
                element.closest('[data-mds-dtp]').querySelector('[data-mds-dtp-year-list-box]').innerHTML = yearsToSelectObject.html;
            this.setPopoverHeaderHtml(element, setting, this.getYearsBoxHeaderHtml(setting, yearsToSelectObject.yearStart, yearsToSelectObject.yearEnd));
        };
        this.setPopoverHeaderHtml = (element, setting, htmlString) => {
            if (this.bsPopover != null) {
                const popoverElement = this.getPopover(element);
                if (popoverElement == null)
                    return;
                popoverElement.querySelector('[data-mds-dtp-title]').innerHTML = htmlString;
            }
            else if (setting.inLine) {
                let inlineTitleBox = element.closest('[data-mds-dtp-guid]').querySelector('[data-name="dtp-years-container"]');
                inlineTitleBox.innerHTML = htmlString;
                inlineTitleBox.classList.remove('w-0');
            }
            else if (setting.modalMode) {
                let inlineTitleBox = element.closest('[data-mds-dtp-guid]').querySelector('[data-mds-dtp-title] .modal-title');
                inlineTitleBox.innerHTML = htmlString;
            }
        };
        this.updateCalendarBodyHtml = (element, setting, updatePopoverContent = false) => {
            const calendarHtml = this.getDateTimePickerBodyHtml(setting);
            const dtpInlineHeader = calendarHtml.match(/<th mds-dtp-inline-header\b[^>]*>(.*?)<\/th>/img)[0];
            this.tempTitleString = dtpInlineHeader;
            if (!setting.inLine && updatePopoverContent) {
                const popover = this.getBsPopoverInstance();
                if (!popover) {
                    console.error("mds.bs.datetimepicker: `BsPopoverInstance` is null!");
                    return;
                }
                popover.setContent({
                    '.popover-header': dtpInlineHeader,
                    '.popover-body': calendarHtml
                });
                return;
            }
            let containerElement = element.closest('[data-name="mds-dtp-body"]');
            if (containerElement == null) {
                containerElement = element.closest('[data-mds-dtp-guid]');
                if (containerElement == null) {
                    console.error("mds.bs.datetimepicker: `data-mds-dtp-guid` element not found !");
                    return;
                }
                if (setting.modalMode)
                    containerElement = containerElement.querySelector('[data-name="mds-dtp-body"]');
            }
            if (containerElement == null) {
                console.error("mds.bs.datetimepicker: `data-mds-dtp-guid` element not found!");
                return;
            }
            this.setPopoverHeaderHtml(element, setting, dtpInlineHeader.trim());
            containerElement.innerHTML = calendarHtml;
            this.hideYearsBox(element, setting);
            this.enableEvents();
            this.enableInLineEvents();
        };
        this.changeMonth = (element) => {
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance) {
                return;
            }
            if (instance.setting.disabled)
                return;
            const dateNumber = Number(element.getAttribute('data-number'));
            const setting = instance.setting;
            let selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow);
            selectedDateToShow = MdsPersianDateTimePicker.getDateTime4(dateNumber, selectedDateToShow, setting.isGregorian);
            setting.selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            MdsPersianDateTimePickerData.set(instance.guid, instance);
            this.updateCalendarBodyHtml(element, setting);
            if (setting.calendarViewOnChange != undefined)
                setting.calendarViewOnChange(selectedDateToShow);
        };
        this.selectDay = (element) => {
            var _a;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            if (instance.setting.disabled || element.getAttribute('disabled') != undefined)
                return;
            let dateNumber = Number(element.getAttribute('data-number'));
            const setting = instance.setting;
            const disabled = element.getAttribute('disabled') != undefined;
            if (setting.selectedDate != undefined && !setting.enableTimePicker) {
                setting.selectedDate.setHours(0);
                setting.selectedDate.setMinutes(0);
                setting.selectedDate.setSeconds(0);
            }
            let selectedDateJson = !setting.selectedDate ? null : MdsPersianDateTimePicker.getDateTimeJson1(setting.selectedDate);
            let selectedDateToShow = !setting.selectedDateToShow ? new Date() : MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow);
            let selectedDateToShowJson = MdsPersianDateTimePicker.getDateTimeJson1(selectedDateToShow);
            if (disabled) {
                if (setting.onDayClick != undefined)
                    setting.onDayClick(setting);
                return;
            }
            selectedDateToShow = MdsPersianDateTimePicker.getDateTime4(dateNumber, selectedDateToShow, setting.isGregorian);
            if (setting.rangeSelector) {
                if (setting.rangeSelectorStartDate != null && setting.rangeSelectorEndDate != null) {
                    setting.selectedRangeDate = [];
                    setting.rangeSelectorStartDate = null;
                    setting.rangeSelectorEndDate = null;
                    let closestSelector = '[data-mds-dtp]';
                    if (setting.inLine)
                        closestSelector = '[data-mds-dtp-guid]';
                    (_a = element.closest(closestSelector)) === null || _a === void 0 ? void 0 : _a.querySelectorAll('td.selected-range-days-start-end,td.selected-range-days').forEach(e => {
                        e.classList.remove('selected-range-days');
                        e.classList.remove('selected-range-days-start-end');
                    });
                }
                if (setting.rangeSelectorStartDate == undefined) {
                    element.classList.add('selected-range-days-start-end');
                    setting.rangeSelectorStartDate = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
                    setting.selectedDate = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
                    setting.selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
                }
                else if (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate == undefined) {
                    if (setting.rangeSelectorStartDate.getTime() >= selectedDateToShow.getTime())
                        return;
                    element.classList.add('selected-range-days-start-end');
                    setting.rangeSelectorEndDate = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
                    MdsPersianDateTimePicker.setSelectedData(setting);
                }
                MdsPersianDateTimePickerData.set(instance.guid, instance);
                if (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined) {
                    setting.selectedRangeDate = [MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorStartDate), MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorEndDate)];
                    if (!setting.inLine) {
                        instance.hide();
                    }
                    else
                        this.updateCalendarBodyHtml(element, setting);
                }
                return;
            }
            setting.selectedDate = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            if (setting.selectedDate != undefined && !setting.enableTimePicker) {
                setting.selectedDate.setHours(0);
                setting.selectedDate.setMinutes(0);
                setting.selectedDate.setSeconds(0);
            }
            setting.selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            if (selectedDateJson != undefined) {
                if (setting.enableTimePicker) {
                    selectedDateJson.hour = selectedDateToShowJson.hour;
                    selectedDateJson.minute = selectedDateToShowJson.minute;
                    selectedDateJson.second = selectedDateToShowJson.second;
                }
                else {
                    selectedDateJson.hour = 0;
                    selectedDateJson.minute = 0;
                    selectedDateJson.second = 0;
                }
                setting.selectedDate.setHours(selectedDateJson.hour);
                setting.selectedDate.setMinutes(selectedDateJson.minute);
                setting.selectedDate.setSeconds(selectedDateJson.second);
            }
            MdsPersianDateTimePickerData.set(instance.guid, instance);
            MdsPersianDateTimePicker.setSelectedData(setting);
            element.setAttribute('data-mds-dtp-selected-day', '');
            if (setting.toDate || setting.fromDate) {
                const toDateElement = document.querySelector(`[data-mds-dtp-group="${setting.groupId}"][data-to-date]`);
                const fromDateElement = document.querySelector(`[data-mds-dtp-group="${setting.groupId}"][data-from-date]`);
                if (setting.fromDate && toDateElement != undefined) {
                    const instance = MdsPersianDateTimePicker.getInstance(toDateElement);
                    if (instance != null) {
                        if (setting.inLine)
                            this.updateCalendarBodyHtml(toDateElement, instance.setting);
                        else
                            instance.initializeBsPopover(instance.setting);
                    }
                }
                else if (setting.toDate && fromDateElement != undefined) {
                    const instance = MdsPersianDateTimePicker.getInstance(fromDateElement);
                    if (instance != null) {
                        if (setting.inLine)
                            this.updateCalendarBodyHtml(fromDateElement, instance.setting);
                        else
                            instance.initializeBsPopover(instance.setting);
                    }
                }
                else
                    this.updateCalendarBodyHtml(element, setting);
            }
            else {
                this.updateCalendarBodyHtml(element, setting, true);
            }
            if (setting.onDayClick != undefined)
                setting.onDayClick(setting);
            if (!setting.inLine) {
                instance.hide();
            }
            else {
                element.closest(`[data-mds-dtp-guid="${this.guid}"]`)
                    .querySelectorAll('[data-day]')
                    .forEach(e => e.removeAttribute('data-mds-dtp-selected-day'));
            }
        };
        this.hoverOnDays = (e) => {
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            const setting = instance.setting;
            if (element.getAttribute('disabled') != undefined || !setting.rangeSelector ||
                (setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined))
                return;
            const dateNumber = Number(element.getAttribute('data-number'));
            const allDayElements = [].slice.call(document.querySelectorAll('td[data-day]'));
            allDayElements.forEach(e => {
                e.classList.remove('selected-range-days');
                e.classList.remove('selected-range-days-nm');
            });
            const allNextOrPrevMonthDayElements = [].slice.call(document.querySelectorAll('td[data-nm]'));
            allNextOrPrevMonthDayElements.forEach(e => {
                e.classList.remove('selected-range-days');
                e.classList.remove('selected-range-days-nm');
            });
            const rangeSelectorStartDate = !setting.rangeSelectorStartDate ? undefined : MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorStartDate);
            const rangeSelectorEndDate = !setting.rangeSelectorEndDate ? undefined : MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorEndDate);
            let rangeSelectorStartDateNumber = 0;
            let rangeSelectorEndDateNumber = 0;
            if (setting.isGregorian) {
                rangeSelectorStartDateNumber = !rangeSelectorStartDate ? 0 : MdsPersianDateTimePicker.convertToNumber3(rangeSelectorStartDate);
                rangeSelectorEndDateNumber = !rangeSelectorEndDate ? 0 : MdsPersianDateTimePicker.convertToNumber3(rangeSelectorEndDate);
            }
            else {
                rangeSelectorStartDateNumber = !rangeSelectorStartDate ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(rangeSelectorStartDate));
                rangeSelectorEndDateNumber = !rangeSelectorEndDate ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(rangeSelectorEndDate));
            }
            if (rangeSelectorStartDateNumber > 0 && dateNumber > rangeSelectorStartDateNumber) {
                for (var i1 = rangeSelectorStartDateNumber; i1 <= dateNumber; i1++) {
                    allDayElements.filter(e => e.getAttribute('data-number') == i1.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1)
                        .forEach(e => e.classList.add('selected-range-days'));
                    allNextOrPrevMonthDayElements.filter(e => e.getAttribute('data-number') == i1.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1)
                        .forEach(e => e.classList.add('selected-range-days-nm'));
                }
            }
            else if (rangeSelectorEndDateNumber > 0 && dateNumber < rangeSelectorEndDateNumber) {
                for (var i2 = dateNumber; i2 <= rangeSelectorEndDateNumber; i2++) {
                    allDayElements.filter(e => e.getAttribute('data-number') == i2.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1)
                        .forEach(e => e.classList.add('selected-range-days'));
                    allNextOrPrevMonthDayElements.filter(e => e.getAttribute('data-number') == i2.toString() && e.classList.value.indexOf('selected-range-days-start-end') <= -1)
                        .forEach(e => e.classList.add('selected-range-days-nm'));
                }
            }
        };
        this.goToday = (e) => {
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            const setting = instance.setting;
            setting.selectedDateToShow = new Date();
            MdsPersianDateTimePickerData.set(instance.guid, instance);
            this.updateCalendarBodyHtml(element, setting);
        };
        this.timeChanged = (e) => {
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            const setting = instance.setting;
            const value = element.value;
            if (!setting.enableTimePicker)
                return;
            if (setting.selectedDateToShow == undefined)
                setting.selectedDateToShow = new Date();
            let hour = Number(value.substr(0, 2));
            let minute = Number(value.substr(3, 2));
            setting.selectedDateToShow = new Date(setting.selectedDateToShow.setHours(hour));
            setting.selectedDateToShow = new Date(setting.selectedDateToShow.setMinutes(minute));
            if (setting.selectedDate == undefined)
                setting.selectedDate = new Date();
            setting.selectedDate = new Date(setting.selectedDate.setHours(hour));
            setting.selectedDate = new Date(setting.selectedDate.setMinutes(minute));
            MdsPersianDateTimePickerData.set(instance.guid, instance);
            MdsPersianDateTimePicker.setSelectedData(setting);
        };
        this.popoverInsertedEvent = (e) => {
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            const setting = instance.setting;
            this.hideYearsBox(element, setting);
        };
        this.popoverOrModalShownEvent = () => {
            this.enableEvents();
        };
        this.popoverOrModalHiddenEvent = () => {
            this.disableEvents();
        };
        this.selectCorrectClickEvent = (e) => {
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (!instance)
                return;
            if (instance != null && (instance.setting.disabled || instance.element.getAttribute('disabled') != undefined))
                return;
            if (element.getAttribute('mds-pdtp-select-year-button') != null) {
                instance.showYearsBox(element);
            }
            else if (element.getAttribute('data-mds-dtp-go-today') != null) {
                this.goToday(e);
            }
            else if (element.getAttribute('data-day') != null) {
                this.selectDay(element);
            }
            else if (element.getAttribute('data-mds-hide-year-list-box')) {
                this.hideYearsBox(element, instance.setting);
            }
            else if (element.getAttribute('data-change-date-button')) {
                this.changeMonth(element);
            }
            else if (element.getAttribute('data-year-range-button-change') != null && element.getAttribute('disabled') == null) {
                this.changeYearList(element);
            }
        };
        this.showPopoverEvent = (e) => {
            MdsPersianDateTimePickerData.getAll().forEach(i => i.hide());
            const element = e.target;
            const instance = MdsPersianDateTimePicker.getInstance(element);
            if (instance == null || instance.setting.disabled)
                return;
            instance.show();
        };
        this.hidePopoverEvent = (e) => {
            const element = e.target;
            if (element.tagName == 'HTML') {
                MdsPersianDateTimePickerData.getAll().forEach(i => !i.setting.modalMode ? i.hide() : () => { });
                return;
            }
            const isWithinDatePicker = element.closest('[data-mds-dtp]') != null || element.getAttribute('data-mds-dtp-guid') != null || element.getAttribute('data-mds-dtp-go-today') != null;
            if (!isWithinDatePicker) {
                MdsPersianDateTimePickerData.getAll().forEach(i => i.hide());
            }
        };
        setting = MdsPersianDateTimePicker.extend(new MdsPersianDateTimePickerSetting(), setting);
        if (!element)
            throw new Error(`MdsPersianDateTimePicker => element is null!`);
        if (setting.rangeSelector && (setting.toDate || setting.fromDate))
            throw new Error(`MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together`);
        if (setting.toDate && setting.fromDate)
            throw new Error(`MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together`);
        if (!setting.groupId && (setting.toDate || setting.fromDate))
            throw new Error(`MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'`);
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
        this.setting.selectedDate = setting.selectedDate ? MdsPersianDateTimePicker.getClonedDate(setting.selectedDate) : null;
        this.setting.selectedDateToShow = (_a = MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow)) !== null && _a !== void 0 ? _a : new Date();
        this.guid = MdsPersianDateTimePicker.newGuid();
        this.element = element;
        this.element.setAttribute("data-mds-dtp-guid", this.guid);
        MdsPersianDateTimePickerData.set(this.guid, this);
        this.initializeBsPopover(setting);
    }
    static toJalali(gy, gm, gd) {
        return this.d2j(this.g2d(gy, gm, gd));
    }
    static toGregorian(jy, jm, jd) {
        return this.d2g(this.j2d(jy, jm, jd));
    }
    static isLeapJalaliYear(jy) {
        return this.jalCal(jy).leap === 0;
    }
    static jalCal(jy) {
        let breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178], bl = breaks.length, gy = jy + 621, leapJ = -14, jp = breaks[0], jm, jump = 1, leap, n, i;
        if (jy < jp || jy >= breaks[bl - 1])
            throw new Error('Invalid Jalali year ' + jy);
        for (i = 1; i < bl; i += 1) {
            jm = breaks[i];
            jump = jm - jp;
            if (jy < jm)
                break;
            leapJ = leapJ + this.div(jump, 33) * 8 + this.div(this.mod(jump, 33), 4);
            jp = jm;
        }
        n = jy - jp;
        leapJ = leapJ + this.div(n, 33) * 8 + this.div(this.mod(n, 33) + 3, 4);
        if (this.mod(jump, 33) === 4 && jump - n === 4)
            leapJ += 1;
        let leapG = this.div(gy, 4) - this.div((this.div(gy, 100) + 1) * 3, 4) - 150;
        let march = 20 + leapJ - leapG;
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
    }
    static j2d(jy, jm, jd) {
        let r = this.jalCal(jy);
        return this.g2d(r.gy, 3, r.march) + (jm - 1) * 31 - this.div(jm, 7) * (jm - 7) + jd - 1;
    }
    static d2j(jdn) {
        let gy = this.d2g(jdn).gy, jy = gy - 621, r = this.jalCal(jy), jdn1F = this.g2d(gy, 3, r.march), jd, jm, k;
        k = jdn - jdn1F;
        if (k >= 0) {
            if (k <= 185) {
                jm = 1 + this.div(k, 31);
                jd = this.mod(k, 31) + 1;
                return {
                    jy: jy,
                    jm: jm,
                    jd: jd
                };
            }
            else {
                k -= 186;
            }
        }
        else {
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
    static g2d(gy, gm, gd) {
        let d = this.div((gy + this.div(gm - 8, 6) + 100100) * 1461, 4) +
            this.div(153 * this.mod(gm + 9, 12) + 2, 5) +
            gd - 34840408;
        d = d - this.div(this.div(gy + 100100 + this.div(gm - 8, 6), 100) * 3, 4) + 752;
        return d;
    }
    static d2g(jdn) {
        let j;
        j = 4 * jdn + 139361631;
        j = j + this.div(this.div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
        let i = this.div(this.mod(j, 1461), 4) * 5 + 308;
        let gd = this.div(this.mod(i, 153), 5) + 1;
        let gm = this.mod(this.div(i, 153), 12) + 1;
        let gy = this.div(j, 1461) - 100100 + this.div(8 - gm, 6);
        return {
            gy: gy,
            gm: gm,
            gd: gd
        };
    }
    static div(a, b) {
        return ~~(a / b);
    }
    static mod(a, b) {
        return a - ~~(a / b) * b;
    }
    initializeBsPopover(setting) {
        if (setting.rangeSelector && (setting.toDate || setting.fromDate))
            throw new Error(`MdsPersianDateTimePicker => You can not set true 'toDate' or 'fromDate' and 'rangeSelector' together`);
        if (setting.toDate && setting.fromDate)
            throw new Error(`MdsPersianDateTimePicker => You can not set true 'toDate' and 'fromDate' together`);
        if (!setting.groupId && (setting.toDate || setting.fromDate))
            throw new Error(`MdsPersianDateTimePicker => When you set 'toDate' or 'fromDate' true, you have to set 'groupId'`);
        if (setting.disabled) {
            this.element.setAttribute("disabled", '');
        }
        else {
            this.element.removeAttribute("disabled");
        }
        if (setting.toDate || setting.fromDate) {
            setting.rangeSelector = false;
            this.element.setAttribute("data-mds-dtp-group", setting.groupId);
            if (setting.toDate)
                this.element.setAttribute("data-to-date", 'true');
            else if (setting.fromDate)
                this.element.setAttribute("data-from-date", 'true');
        }
        if (!setting.rangeSelector) {
            setting.rangeSelectorMonthsToShow = [0, 0];
        }
        setTimeout(() => {
            this.dispose();
            const title = this.getPopoverHeaderTitle(setting);
            let datePickerBodyHtml = this.getDateTimePickerBodyHtml(setting);
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = datePickerBodyHtml;
            const dropDowns = tempDiv.querySelectorAll('.dropdown>button');
            dropDowns.forEach(e => {
                if (setting.disabled) {
                    e.setAttribute('disabled', '');
                    e.classList.add('disabled');
                }
                else {
                    e.removeAttribute('disabled');
                    e.classList.remove('disabled');
                }
            });
            datePickerBodyHtml = tempDiv.innerHTML;
            if (setting.modalMode == true) {
                this.setModalHtml(title, datePickerBodyHtml, setting);
                this.bsPopover = null;
                setTimeout(() => {
                    const el = this.getModal();
                    if (el != null) {
                        this.bsModal = new Modal(el);
                        this.enableMainEvents();
                    }
                }, 200);
            }
            else if (setting.inLine == true) {
                this.bsPopover = null;
                this.element.innerHTML = datePickerBodyHtml;
                this.enableInLineEvents();
            }
            else {
                this.bsPopover = new Popover(this.element, {
                    container: 'body',
                    content: datePickerBodyHtml,
                    title: title,
                    html: true,
                    placement: setting.placement,
                    trigger: 'manual',
                    template: MdsPersianDateTimePicker.popoverHtmlTemplate,
                    sanitize: false,
                });
                this.enableMainEvents();
            }
            this.tempTitleString = title;
        }, setting.inLine ? 10 : 500);
    }
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    static extend(...args) {
        for (let i = 1; i < args.length; i++)
            for (let key in args[i])
                if (args[i].hasOwnProperty(key))
                    args[0][key] = args[i][key];
        return args[0];
    }
    static getClonedDate(dateTime) {
        return new Date(dateTime.getTime());
    }
    static getDateTimeJson1(dateTime) {
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
    }
    static getDateTimeJson2(dateNumber) {
        return {
            year: Math.floor(dateNumber / 10000),
            month: Math.floor(dateNumber / 100) % 100,
            day: dateNumber % 100,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            dayOfWeek: -1
        };
    }
    static getDateTimeJsonPersian1(dateTime) {
        let persianDate = this.toJalali(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate());
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
    }
    static getDateTimeJsonPersian2(yearPersian, monthPersian, dayPersian, hour, minute, second) {
        if (!this.isNumber(hour))
            hour = 0;
        if (!this.isNumber(minute))
            minute = 0;
        if (!this.isNumber(second))
            second = 0;
        let gregorian = this.toGregorian(yearPersian, monthPersian, dayPersian);
        return MdsPersianDateTimePicker.getDateTimeJsonPersian1(new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second));
    }
    static getWeekDayName(englishWeekDayIndex, isGregorian) {
        if (!isGregorian)
            return this.weekDayNamesPersian[englishWeekDayIndex];
        return this.weekDayNames[englishWeekDayIndex];
    }
    static getMonthName(monthIndex, isGregorian) {
        if (monthIndex < 0)
            monthIndex = 11;
        else if (monthIndex > 11)
            monthIndex = 0;
        if (!isGregorian)
            return this.monthNamesPersian[monthIndex];
        return this.monthNames[monthIndex];
    }
    static getWeekDayShortName(englishWeekDayIndex, isGregorian) {
        if (!isGregorian)
            return this.shortDayNamesPersian[englishWeekDayIndex];
        return this.shortDayNames[englishWeekDayIndex];
    }
    static isLeapYear(persianYear) {
        return this.isLeapJalaliYear(persianYear);
    }
    static getDaysInMonthPersian(year, month) {
        let numberOfDaysInMonth = 31;
        if (month > 6 && month < 12)
            numberOfDaysInMonth = 30;
        else if (month == 12)
            numberOfDaysInMonth = this.isLeapYear(year) ? 30 : 29;
        return numberOfDaysInMonth;
    }
    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    static getLastDayDateOfPreviousMonth(dateTime, isGregorian) {
        let dateTimeLocal = MdsPersianDateTimePicker.getClonedDate(dateTime);
        if (isGregorian) {
            let previousMonth = new Date(dateTimeLocal.getFullYear(), dateTimeLocal.getMonth() - 1, 1), daysInMonth = MdsPersianDateTimePicker.getDaysInMonth(previousMonth.getFullYear(), previousMonth.getMonth());
            return new Date(previousMonth.getFullYear(), previousMonth.getMonth(), daysInMonth);
        }
        let dateTimeJsonPersian = MdsPersianDateTimePicker.getDateTimeJsonPersian1(dateTimeLocal);
        dateTimeJsonPersian.month += -1;
        if (dateTimeJsonPersian.month <= 0) {
            dateTimeJsonPersian.month = 12;
            dateTimeJsonPersian.year--;
        }
        else if (dateTimeJsonPersian.month > 12) {
            dateTimeJsonPersian.year++;
            dateTimeJsonPersian.month = 1;
        }
        return MdsPersianDateTimePicker.getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, MdsPersianDateTimePicker.getDaysInMonthPersian(dateTimeJsonPersian.year, dateTimeJsonPersian.month));
    }
    static getFirstDayDateOfNextMonth(dateTime, isGregorian) {
        let dateTimeLocal = MdsPersianDateTimePicker.getClonedDate(dateTime);
        if (isGregorian) {
            let nextMonth = new Date(dateTimeLocal.getFullYear(), dateTimeLocal.getMonth() + 1, 1);
            return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
        }
        let dateTimeJsonPersian = MdsPersianDateTimePicker.getDateTimeJsonPersian1(dateTimeLocal);
        dateTimeJsonPersian.month += 1;
        if (dateTimeJsonPersian.month <= 0) {
            dateTimeJsonPersian.month = 12;
            dateTimeJsonPersian.year--;
        }
        if (dateTimeJsonPersian.month > 12) {
            dateTimeJsonPersian.year++;
            dateTimeJsonPersian.month = 1;
        }
        return MdsPersianDateTimePicker.getDateTime1(dateTimeJsonPersian.year, dateTimeJsonPersian.month, 1);
    }
    static getDateTime1(yearPersian, monthPersian, dayPersian, hour, minute, second) {
        if (!this.isNumber(hour))
            hour = 0;
        if (!this.isNumber(minute))
            minute = 0;
        if (!this.isNumber(second))
            second = 0;
        let gregorian = this.toGregorian(yearPersian, monthPersian, dayPersian);
        return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, hour, minute, second);
    }
    static getDateTime2(dateTimeJsonPersian) {
        if (!dateTimeJsonPersian.hour)
            dateTimeJsonPersian.hour = 0;
        if (!dateTimeJsonPersian.minute)
            dateTimeJsonPersian.minute = 0;
        if (!dateTimeJsonPersian.second)
            dateTimeJsonPersian.second = 0;
        let gregorian = this.toGregorian(dateTimeJsonPersian.year, dateTimeJsonPersian.month, dateTimeJsonPersian.day);
        return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd, dateTimeJsonPersian.hour, dateTimeJsonPersian.minute, dateTimeJsonPersian.second);
    }
    static getDateTime3(dateTimeJson) {
        return new Date(dateTimeJson.year, dateTimeJson.month - 1, dateTimeJson.day, dateTimeJson.hour, dateTimeJson.minute, dateTimeJson.second);
    }
    static getDateTime4(dateNumber, dateTime, isGregorian) {
        let dateTimeJson = MdsPersianDateTimePicker.getDateTimeJson2(dateNumber);
        if (!isGregorian) {
            let dateTimeJsonPersian = MdsPersianDateTimePicker.getDateTimeJsonPersian1(dateTime);
            dateTimeJsonPersian.year = dateTimeJson.year;
            dateTimeJsonPersian.month = dateTimeJson.month;
            dateTimeJsonPersian.day = dateTimeJson.day;
            dateTime = this.getDateTime2(dateTimeJsonPersian);
        }
        else
            dateTime = new Date(dateTimeJson.year, dateTimeJson.month - 1, dateTimeJson.day, dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds());
        return dateTime;
    }
    static getLesserDisableBeforeDate(setting) {
        let resultDate = null;
        const dateNow = new Date();
        if (setting.disableBeforeToday && setting.disableBeforeDate) {
            if (setting.disableBeforeDate.getTime() <= dateNow.getTime())
                resultDate = MdsPersianDateTimePicker.getClonedDate(setting.disableBeforeDate);
            else
                resultDate = dateNow;
        }
        else if (setting.disableBeforeDate)
            resultDate = MdsPersianDateTimePicker.getClonedDate(setting.disableBeforeDate);
        else if (setting.disableBeforeToday)
            resultDate = dateNow;
        if (resultDate == null)
            return null;
        if (setting.isGregorian)
            return MdsPersianDateTimePicker.getDateTimeJson1(resultDate);
        return MdsPersianDateTimePicker.getDateTimeJsonPersian1(resultDate);
    }
    static getBiggerDisableAfterDate(setting) {
        let resultDate = null;
        const dateNow = new Date();
        if (setting.disableAfterDate && setting.disableAfterToday) {
            if (setting.disableAfterDate.getTime() >= dateNow.getTime())
                resultDate = MdsPersianDateTimePicker.getClonedDate(setting.disableAfterDate);
            else
                resultDate = dateNow;
        }
        else if (setting.disableAfterDate)
            resultDate = MdsPersianDateTimePicker.getClonedDate(setting.disableAfterDate);
        else if (setting.disableAfterToday)
            resultDate = dateNow;
        if (resultDate == null)
            return null;
        if (setting.isGregorian)
            return MdsPersianDateTimePicker.getDateTimeJson1(resultDate);
        return MdsPersianDateTimePicker.getDateTimeJsonPersian1(resultDate);
    }
    static addMonthToDateTimeJson(dateTimeJson, addedMonth, isGregorian) {
        const dateTimeJson1 = Object.assign({}, dateTimeJson);
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
        return MdsPersianDateTimePicker.getDateTimeJson1(this.getDateTime3(dateTimeJson1));
    }
    static convertToNumber1(dateTimeJson) {
        return Number(MdsPersianDateTimePicker.zeroPad(dateTimeJson.year) + MdsPersianDateTimePicker.zeroPad(dateTimeJson.month) + MdsPersianDateTimePicker.zeroPad(dateTimeJson.day));
    }
    static convertToNumber2(year, month, day) {
        return Number(MdsPersianDateTimePicker.zeroPad(year) + MdsPersianDateTimePicker.zeroPad(month) + MdsPersianDateTimePicker.zeroPad(day));
    }
    static convertToNumber3(dateTime) {
        return MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(dateTime));
    }
    static correctOptionValue(optionName, value) {
        const setting = new MdsPersianDateTimePickerSetting();
        Object.keys(setting).filter(key => key === optionName).forEach(key => {
            switch (typeof setting[key]) {
                case 'number':
                    value = +value;
                    break;
                case 'string':
                    value = value.toString();
                    break;
                case 'boolean':
                    value = !!value;
                    break;
                case 'object':
                    if (setting[key] instanceof Date) {
                        value = new Date(value);
                    }
                    else if (Array.isArray(setting[key])) {
                        switch (optionName) {
                            case 'holidays':
                            case 'disabledDates':
                            case 'specialDates':
                            case 'selectedRangeDate':
                                value.forEach((item, i) => {
                                    value[i] = new Date(item);
                                });
                                break;
                            case 'disabledDays':
                            case 'rangeSelectorMonthsToShow':
                                value.forEach((item, i) => {
                                    value[i] = +item;
                                });
                                break;
                        }
                    }
                    break;
            }
        });
        return value;
    }
    static getShortHour(hour) {
        let shortHour;
        if (hour > 12)
            shortHour = hour - 12;
        else
            shortHour = hour;
        return shortHour;
    }
    static getAmPm(hour, isGregorian) {
        let amPm;
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
    }
    static addMonthToDateTime(dateTime, addedMonth, isGregorian) {
        let dateTimeJson;
        if (!isGregorian) {
            dateTimeJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(dateTime);
            dateTimeJson = MdsPersianDateTimePicker.addMonthToDateTimeJson(dateTimeJson, addedMonth, isGregorian);
            return this.getDateTime2(dateTimeJson);
        }
        dateTimeJson = MdsPersianDateTimePicker.getDateTimeJson1(dateTime);
        dateTimeJson = MdsPersianDateTimePicker.addMonthToDateTimeJson(dateTimeJson, addedMonth, isGregorian);
        return this.getDateTime3(dateTimeJson);
    }
    static isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    static toPersianNumber(inputNumber1) {
        if (!inputNumber1)
            return '';
        let str1 = inputNumber1.toString().trim();
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
    }
    static toEnglishNumber(inputNumber1) {
        if (!inputNumber1)
            return '';
        let str1 = inputNumber1.toString().trim();
        if (!str1)
            return '';
        str1 = str1.replace(/۰/img, '0');
        str1 = str1.replace(/۱/img, '1');
        str1 = str1.replace(/۲/img, '2');
        str1 = str1.replace(/۳/img, '3');
        str1 = str1.replace(/۴/img, '4');
        str1 = str1.replace(/۵/img, '5');
        str1 = str1.replace(/۶/img, '6');
        str1 = str1.replace(/۷/img, '7');
        str1 = str1.replace(/۸/img, '8');
        str1 = str1.replace(/۹/img, '9');
        return str1;
    }
    static zeroPad(nr, base) {
        if (nr == undefined || nr == '')
            return '00';
        if (base == undefined || base == '')
            base = '00';
        let len = (String(base).length - String(nr).length) + 1;
        return len > 0 ? new Array(len).join('0') + nr : nr;
    }
    static getDateTimeString(dateTimeJson, format, isGregorian, persianNumber) {
        format = format.replace(/yyyy/mg, dateTimeJson.year.toString());
        format = format.replace(/yy/mg, (dateTimeJson.year % 100).toString());
        format = format.replace(/MMMM/mg, MdsPersianDateTimePicker.getMonthName(dateTimeJson.month - 1, isGregorian));
        format = format.replace(/MM/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.month));
        format = format.replace(/M/mg, dateTimeJson.month.toString());
        format = format.replace(/dddd/mg, MdsPersianDateTimePicker.getWeekDayName(dateTimeJson.dayOfWeek, isGregorian));
        format = format.replace(/dd/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.day));
        format = format.replace(/d/mg, dateTimeJson.day.toString());
        format = format.replace(/HH/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.hour));
        format = format.replace(/H/mg, dateTimeJson.hour.toString());
        format = format.replace(/hh/mg, MdsPersianDateTimePicker.zeroPad(this.getShortHour(dateTimeJson.hour).toString()));
        format = format.replace(/h/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.hour));
        format = format.replace(/mm/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.minute));
        format = format.replace(/m/mg, dateTimeJson.minute.toString());
        format = format.replace(/ss/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.second));
        format = format.replace(/s/mg, dateTimeJson.second.toString());
        format = format.replace(/fff/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.millisecond, '000'));
        format = format.replace(/ff/mg, MdsPersianDateTimePicker.zeroPad(dateTimeJson.millisecond / 10));
        format = format.replace(/f/mg, (dateTimeJson.millisecond / 100).toString());
        format = format.replace(/tt/mg, this.getAmPm(dateTimeJson.hour, isGregorian));
        format = format.replace(/t/mg, this.getAmPm(dateTimeJson.hour, isGregorian)[0]);
        if (persianNumber)
            format = MdsPersianDateTimePicker.toPersianNumber(format);
        return format;
    }
    static getSelectedDateTimeTextFormatted(setting) {
        if (setting.selectedDate == undefined)
            return '';
        if (!setting.enableTimePicker) {
            setting.selectedDate.setHours(0);
            setting.selectedDate.setMinutes(0);
            setting.selectedDate.setSeconds(0);
        }
        if (setting.rangeSelector && setting.rangeSelectorStartDate != undefined && setting.rangeSelectorEndDate != undefined)
            return MdsPersianDateTimePicker.getDateTimeString(!setting.isGregorian ? MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.rangeSelectorStartDate) : MdsPersianDateTimePicker.getDateTimeJson1(setting.rangeSelectorStartDate), setting.textFormat, setting.isGregorian, setting.persianNumber) + ' - ' +
                MdsPersianDateTimePicker.getDateTimeString(!setting.isGregorian ? MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.rangeSelectorEndDate) : MdsPersianDateTimePicker.getDateTimeJson1(setting.rangeSelectorEndDate), setting.textFormat, setting.isGregorian, setting.persianNumber);
        return MdsPersianDateTimePicker.getDateTimeString(!setting.isGregorian ? MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.selectedDate) : MdsPersianDateTimePicker.getDateTimeJson1(setting.selectedDate), setting.textFormat, setting.isGregorian, setting.persianNumber);
    }
    static getSelectedDateFormatted(setting) {
        if ((!setting.rangeSelector && !setting.selectedDate) ||
            (setting.rangeSelector && !setting.rangeSelectorStartDate && !setting.rangeSelectorEndDate))
            return '';
        if (setting.rangeSelector)
            return MdsPersianDateTimePicker.getDateTimeString(MdsPersianDateTimePicker.getDateTimeJson1(setting.rangeSelectorStartDate), setting.dateFormat, true, setting.persianNumber) + ' - ' +
                MdsPersianDateTimePicker.getDateTimeString(MdsPersianDateTimePicker.getDateTimeJson1(setting.rangeSelectorEndDate), setting.dateFormat, true, setting.persianNumber);
        return MdsPersianDateTimePicker.getDateTimeString(MdsPersianDateTimePicker.getDateTimeJson1(setting.selectedDate), setting.dateFormat, true, setting.persianNumber);
    }
    static getDisabledDateObject(setting) {
        var _a, _b;
        let disableBeforeDateTimeJson = this.getLesserDisableBeforeDate(setting);
        let disableAfterDateTimeJson = this.getBiggerDisableAfterDate(setting);
        if ((setting.fromDate || setting.toDate) && setting.groupId) {
            const toDateElement = document.querySelector(`[data-mds-dtp-group="${setting.groupId}"][data-to-date]`);
            const fromDateElement = document.querySelector(`[data-mds-dtp-group="${setting.groupId}"][data-from-date]`);
            if (toDateElement != null && setting.fromDate) {
                const toDateSetting = (_a = MdsPersianDateTimePicker.getInstance(toDateElement)) === null || _a === void 0 ? void 0 : _a.setting;
                const toDateSelectedDate = !toDateSetting ? null : toDateSetting.selectedDate;
                disableAfterDateTimeJson = !toDateSelectedDate ? null : setting.isGregorian ? MdsPersianDateTimePicker.getDateTimeJson1(toDateSelectedDate) : MdsPersianDateTimePicker.getDateTimeJsonPersian1(toDateSelectedDate);
            }
            else if (fromDateElement != null && setting.toDate) {
                const fromDateSetting = (_b = MdsPersianDateTimePicker.getInstance(fromDateElement)) === null || _b === void 0 ? void 0 : _b.setting;
                const fromDateSelectedDate = !fromDateSetting ? null : fromDateSetting.selectedDate;
                disableBeforeDateTimeJson = !fromDateSelectedDate ? null : setting.isGregorian ? MdsPersianDateTimePicker.getDateTimeJson1(fromDateSelectedDate) : MdsPersianDateTimePicker.getDateTimeJsonPersian1(fromDateSelectedDate);
            }
        }
        return [disableBeforeDateTimeJson, disableAfterDateTimeJson];
    }
    static setSelectedData(setting) {
        const targetTextElement = setting.targetTextSelector ? document.querySelector(setting.targetTextSelector) : undefined;
        const targetDateElement = setting.targetDateSelector ? document.querySelector(setting.targetDateSelector) : undefined;
        const changeEvent = new Event('change');
        if (targetTextElement != undefined) {
            const dateTimeTextFormat = this.getSelectedDateTimeTextFormatted(setting);
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
            const dateTimeFormat = this.toEnglishNumber(this.getSelectedDateFormatted(setting));
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
    }
    getPopover(element) {
        let popoverId = element.getAttribute('aria-describedby');
        if (popoverId == undefined || popoverId == '')
            return element.closest('[data-mds-dtp]');
        return document.getElementById(popoverId.toString());
    }
    getModal() {
        return document.querySelector(`.modal[data-mds-dtp-guid="${this.guid}"]`);
    }
    setModalHtml(title, datePickerBodyHtml, setting) {
        const prevModalElement = this.getModal();
        if (prevModalElement == null) {
            let modalHtml = MdsPersianDateTimePicker.modalHtmlTemplate;
            modalHtml = modalHtml.replace(/\{\{guid\}\}/img, this.guid);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHtml;
            tempDiv.querySelector('[data-mds-dtp-title] .modal-title').innerHTML = title;
            tempDiv.querySelector('[data-name="mds-dtp-body"]').innerHTML = datePickerBodyHtml;
            document.querySelector('body').appendChild(tempDiv);
        }
        else {
            prevModalElement.querySelector('[data-mds-dtp-title] .modal-title').innerHTML = title;
            prevModalElement.querySelector('[data-name="mds-dtp-body"]').innerHTML = datePickerBodyHtml;
        }
        const modalDialogElement = document.querySelector(`[data-mds-dtp-guid="${this.guid}"] .modal-dialog`);
        if (modalDialogElement != null) {
            if (setting.rangeSelector) {
                if (setting.rangeSelectorMonthsToShow[0] > 0 || setting.rangeSelectorMonthsToShow[1] > 0)
                    modalDialogElement.classList.add('modal-xl');
                else
                    modalDialogElement.classList.remove('modal-xl');
            }
            else {
                modalDialogElement.classList.remove('modal-xl');
            }
        }
        else {
            console.warn("mds.bs.datetimepicker: element with `data-mds-dtp-guid` selector not found !");
        }
    }
    getYearsBoxBodyHtml(setting, yearToStart) {
        setting.yearOffset = Number(setting.yearOffset);
        const selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow);
        const disabledDateObj = MdsPersianDateTimePicker.getDisabledDateObject(setting);
        const disableBeforeDateTimeJson = disabledDateObj[0];
        const disableAfterDateTimeJson = disabledDateObj[1];
        let html = MdsPersianDateTimePicker.dateTimePickerYearsToSelectHtmlTemplate;
        let yearsBoxHtml = '';
        let todayDateTimeJson;
        let selectedDateTimeToShowJson;
        let counter = 1;
        if (setting.isGregorian) {
            selectedDateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJson1(selectedDateToShow);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJson1(new Date());
        }
        else {
            selectedDateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(selectedDateToShow);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(new Date());
        }
        counter = 1;
        const yearStart = yearToStart ? yearToStart : todayDateTimeJson.year - setting.yearOffset;
        const yearEnd = yearToStart ? yearToStart + setting.yearOffset * 2 : todayDateTimeJson.year + setting.yearOffset;
        for (let i = yearStart; i < yearEnd; i++) {
            let disabledAttr = '';
            if (disableBeforeDateTimeJson != null) {
                disabledAttr = i < disableBeforeDateTimeJson.year ? 'disabled' : '';
            }
            if (!disabledAttr && disableAfterDateTimeJson != null) {
                disabledAttr = i > disableAfterDateTimeJson.year ? 'disabled' : '';
            }
            let currentYearDateTimeJson = MdsPersianDateTimePicker.getDateTimeJson2(MdsPersianDateTimePicker.convertToNumber2(i, selectedDateTimeToShowJson.month, MdsPersianDateTimePicker.getDaysInMonthPersian(i, selectedDateTimeToShowJson.month)));
            let currentYearDisabledAttr = '';
            let yearText = setting.isGregorian ? i.toString() : MdsPersianDateTimePicker.toPersianNumber(i);
            let yearDateNumber = MdsPersianDateTimePicker.convertToNumber2(i, selectedDateTimeToShowJson.month, 1);
            let todayAttr = todayDateTimeJson.year == i ? 'data-current-year="true"' : '';
            let selectedYearAttr = selectedDateTimeToShowJson.year == i ? 'data-selected-year' : '';
            let selectedYearTitle = '';
            if (todayAttr)
                selectedYearTitle = setting.isGregorian ? MdsPersianDateTimePicker.currentYearText : MdsPersianDateTimePicker.currentYearTextPersian;
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
            yearsBoxHtml += `
<td class="text-center" title="${selectedYearTitle}" ${todayAttr} ${selectedYearAttr}>
  <button class="btn btn-sm btn-light w-100" type="button" data-change-date-button="true" data-number="${yearDateNumber}" ${currentYearDisabledAttr} ${disabledAttr}>${yearText}</button>
</td>
`;
            if (counter == 5)
                yearsBoxHtml += '</tr>';
            counter++;
            if (counter > 5)
                counter = 1;
        }
        html = html.replace(/\{\{yearsBoxHtml\}\}/img, yearsBoxHtml);
        html = html.replace(/\{\{cancelText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.cancelText : MdsPersianDateTimePicker.cancelTextPersian);
        if (setting.inLine && setting.yearOffset > 15)
            html += '<div style="height: 30px;"></div>';
        return {
            yearStart,
            yearEnd,
            html
        };
    }
    getYearsBoxHeaderHtml(setting, yearStart, yearEnd) {
        const yearsRangeText = ` ${yearStart} - ${yearEnd - 1} `;
        const disabledDateObj = MdsPersianDateTimePicker.getDisabledDateObject(setting);
        let html = MdsPersianDateTimePicker.popoverHeaderSelectYearHtmlTemplate;
        html = html.replace(/\{{rtlCssClass\}\}/img, setting.isGregorian ? '' : 'rtl');
        html = html.replace(/\{{dirAttrValue\}\}/img, setting.isGregorian ? 'ltr' : 'rtl');
        html = html.replace(/\{\{yearsRangeText\}\}/img, setting.isGregorian ? yearsRangeText : MdsPersianDateTimePicker.toPersianNumber(yearsRangeText));
        html = html.replace(/\{\{previousText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.previousText : MdsPersianDateTimePicker.previousTextPersian);
        html = html.replace(/\{\{nextText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.nextText : MdsPersianDateTimePicker.nextTextPersian);
        html = html.replace(/\{\{latestPreviousYear\}\}/img, yearStart > yearEnd ? yearEnd.toString() : yearStart.toString());
        html = html.replace(/\{\{latestNextYear\}\}/img, yearStart > yearEnd ? yearStart.toString() : yearEnd.toString());
        html = html.replace(/\{\{prevYearButtonAttr\}\}/img, disabledDateObj[0] != null && yearStart - 1 < disabledDateObj[0].year ? 'disabled' : '');
        html = html.replace(/\{\{nextYearButtonAttr\}\}/img, disabledDateObj[1] != null && yearEnd + 1 > disabledDateObj[1].year ? 'disabled' : '');
        return html;
    }
    getDateTimePickerMonthHtml(setting, isNextMonth, isPrevMonth) {
        let selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow);
        let selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
        let selectedDateTime = setting.selectedDate != undefined ? MdsPersianDateTimePicker.getClonedDate(setting.selectedDate) : undefined;
        let isNextOrPrevMonth = isNextMonth || isPrevMonth;
        let html = MdsPersianDateTimePicker.dateTimePickerMonthTableHtmlTemplate;
        html = html.replace(/\{\{guid\}\}/img, this.guid);
        html = html.replace(/\{\{monthTdAttribute\}\}/img, isNextMonth ? 'data-next-month' : isPrevMonth ? 'data-prev-month' : '');
        html = html.replace(/\{\{monthNameAttribute\}\}/img, !isNextOrPrevMonth ? 'hidden' : '');
        html = html.replace(/\{\{theadSelectDateButtonTrAttribute\}\}/img, !isNextOrPrevMonth ? '' : 'hidden');
        html = html.replace(/\{\{weekDayShortName1CssClass\}\}/img, setting.isGregorian ? 'text-danger' : '');
        html = html.replace(/\{\{weekDayShortName7CssClass\}\}/img, !setting.isGregorian ? 'text-danger' : '');
        html = html.replace(/\{\{previousYearText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.previousYearText : MdsPersianDateTimePicker.previousYearTextPersian);
        html = html.replace(/\{\{previousMonthText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.previousMonthText : MdsPersianDateTimePicker.previousMonthTextPersian);
        html = html.replace(/\{\{nextMonthText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.nextMonthText : MdsPersianDateTimePicker.nextMonthTextPersian);
        html = html.replace(/\{\{nextYearText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.nextYearText : MdsPersianDateTimePicker.nextYearTextPersian);
        html = html.replace(/\{\{monthName1\}\}/img, MdsPersianDateTimePicker.getMonthName(0, setting.isGregorian));
        html = html.replace(/\{\{monthName2\}\}/img, MdsPersianDateTimePicker.getMonthName(1, setting.isGregorian));
        html = html.replace(/\{\{monthName3\}\}/img, MdsPersianDateTimePicker.getMonthName(2, setting.isGregorian));
        html = html.replace(/\{\{monthName4\}\}/img, MdsPersianDateTimePicker.getMonthName(3, setting.isGregorian));
        html = html.replace(/\{\{monthName5\}\}/img, MdsPersianDateTimePicker.getMonthName(4, setting.isGregorian));
        html = html.replace(/\{\{monthName6\}\}/img, MdsPersianDateTimePicker.getMonthName(5, setting.isGregorian));
        html = html.replace(/\{\{monthName7\}\}/img, MdsPersianDateTimePicker.getMonthName(6, setting.isGregorian));
        html = html.replace(/\{\{monthName8\}\}/img, MdsPersianDateTimePicker.getMonthName(7, setting.isGregorian));
        html = html.replace(/\{\{monthName9\}\}/img, MdsPersianDateTimePicker.getMonthName(8, setting.isGregorian));
        html = html.replace(/\{\{monthName10\}\}/img, MdsPersianDateTimePicker.getMonthName(9, setting.isGregorian));
        html = html.replace(/\{\{monthName11\}\}/img, MdsPersianDateTimePicker.getMonthName(10, setting.isGregorian));
        html = html.replace(/\{\{monthName12\}\}/img, MdsPersianDateTimePicker.getMonthName(11, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName1\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(0, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName2\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(1, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName3\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(2, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName4\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(3, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName5\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(4, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName6\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(5, setting.isGregorian));
        html = html.replace(/\{\{weekDayShortName7\}\}/img, MdsPersianDateTimePicker.getWeekDayShortName(6, setting.isGregorian));
        const disabledDateObj = MdsPersianDateTimePicker.getDisabledDateObject(setting);
        let i = 0, j = 0, firstWeekDayNumber, cellNumber = 0, tdNumber = 0, selectedDateNumber = 0, selectedMonthName = '', todayDateTimeJson, dateTimeToShowJson, numberOfDaysInCurrentMonth = 0, numberOfDaysInPreviousMonth = 0, tr = document.createElement('TR'), td = document.createElement("TD"), daysHtml = '', currentDateNumber = 0, previousMonthDateNumber = 0, nextMonthDateNumber = 0, previousYearDateNumber = 0, nextYearDateNumber = 0, rangeSelectorStartDate = !setting.rangeSelector || setting.rangeSelectorStartDate == undefined ? undefined : MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorStartDate), rangeSelectorEndDate = !setting.rangeSelector || setting.rangeSelectorEndDate == undefined ? undefined : MdsPersianDateTimePicker.getClonedDate(setting.rangeSelectorEndDate), rangeSelectorStartDateNumber = 0, rangeSelectorEndDateNumber = 0, dayNumberInString = '0', dayOfWeek = '', monthsDateNumberAndAttr = {
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
            dateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJson1(selectedDateToShowTemp);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJson1(new Date());
            firstWeekDayNumber = new Date(dateTimeToShowJson.year, dateTimeToShowJson.month - 1, 1).getDay();
            selectedDateNumber = !selectedDateTime ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(selectedDateTime));
            numberOfDaysInCurrentMonth = MdsPersianDateTimePicker.getDaysInMonth(dateTimeToShowJson.year, dateTimeToShowJson.month - 1);
            numberOfDaysInPreviousMonth = MdsPersianDateTimePicker.getDaysInMonth(dateTimeToShowJson.year, dateTimeToShowJson.month - 2);
            previousMonthDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(MdsPersianDateTimePicker.getLastDayDateOfPreviousMonth(selectedDateToShowTemp, true)));
            nextMonthDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(MdsPersianDateTimePicker.getFirstDayDateOfNextMonth(selectedDateToShowTemp, true)));
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            previousYearDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(new Date(selectedDateToShowTemp.setFullYear(selectedDateToShowTemp.getFullYear() - 1))));
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            nextYearDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(new Date(selectedDateToShowTemp.setFullYear(selectedDateToShowTemp.getFullYear() + 1))));
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            rangeSelectorStartDateNumber = !setting.rangeSelector || !rangeSelectorStartDate ? 0 : MdsPersianDateTimePicker.convertToNumber3(rangeSelectorStartDate);
            rangeSelectorEndDateNumber = !setting.rangeSelector || !rangeSelectorEndDate ? 0 : MdsPersianDateTimePicker.convertToNumber3(rangeSelectorEndDate);
            for (i = 1; i <= 12; i++) {
                monthsDateNumberAndAttr['month' + i.toString() + 'DateNumber'] = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(new Date(selectedDateToShowTemp.setMonth(i - 1))));
                selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            }
            for (i = 0; i < setting.holidays.length; i++) {
                holidaysDateNumbers.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(setting.holidays[i])));
            }
            for (i = 0; i < setting.disabledDates.length; i++) {
                disabledDatesNumber.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(setting.disabledDates[i])));
            }
            for (i = 0; i < setting.specialDates.length; i++) {
                specialDatesNumber.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJson1(setting.specialDates[i])));
            }
        }
        else {
            dateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(selectedDateToShowTemp);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(new Date());
            firstWeekDayNumber = MdsPersianDateTimePicker.getDateTimeJsonPersian2(dateTimeToShowJson.year, dateTimeToShowJson.month, 1, 0, 0, 0).dayOfWeek;
            selectedDateNumber = !selectedDateTime ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(selectedDateTime));
            numberOfDaysInCurrentMonth = MdsPersianDateTimePicker.getDaysInMonthPersian(dateTimeToShowJson.year, dateTimeToShowJson.month);
            numberOfDaysInPreviousMonth = MdsPersianDateTimePicker.getDaysInMonthPersian(dateTimeToShowJson.year - 1, dateTimeToShowJson.month - 1);
            previousMonthDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(MdsPersianDateTimePicker.getLastDayDateOfPreviousMonth(selectedDateToShowTemp, false)));
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            nextMonthDateNumber = MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(MdsPersianDateTimePicker.getFirstDayDateOfNextMonth(selectedDateToShowTemp, false)));
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            previousYearDateNumber = MdsPersianDateTimePicker.convertToNumber2(dateTimeToShowJson.year - 1, dateTimeToShowJson.month, dateTimeToShowJson.day);
            nextYearDateNumber = MdsPersianDateTimePicker.convertToNumber2(dateTimeToShowJson.year + 1, dateTimeToShowJson.month, dateTimeToShowJson.day);
            selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            rangeSelectorStartDateNumber = !setting.rangeSelector || !rangeSelectorStartDate ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(rangeSelectorStartDate));
            rangeSelectorEndDateNumber = !setting.rangeSelector || !rangeSelectorEndDate ? 0 : MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(rangeSelectorEndDate));
            for (i = 1; i <= 12; i++) {
                monthsDateNumberAndAttr['month' + i.toString() + 'DateNumber'] = MdsPersianDateTimePicker.convertToNumber2(dateTimeToShowJson.year, i, MdsPersianDateTimePicker.getDaysInMonthPersian(dateTimeToShowJson.year, i));
                selectedDateToShowTemp = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
            }
            for (i = 0; i < setting.holidays.length; i++) {
                holidaysDateNumbers.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.holidays[i])));
            }
            for (i = 0; i < setting.disabledDates.length; i++) {
                disabledDatesNumber.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.disabledDates[i])));
            }
            for (i = 0; i < setting.specialDates.length; i++) {
                specialDatesNumber.push(MdsPersianDateTimePicker.convertToNumber1(MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.specialDates[i])));
            }
        }
        let todayDateNumber = MdsPersianDateTimePicker.convertToNumber1(todayDateTimeJson);
        let selectedYear = setting.isGregorian ? dateTimeToShowJson.year.toString() : MdsPersianDateTimePicker.toPersianNumber(dateTimeToShowJson.year);
        let disableBeforeDateTimeNumber = !disableBeforeDateTimeJson ? undefined : MdsPersianDateTimePicker.convertToNumber1(disableBeforeDateTimeJson);
        let disableAfterDateTimeNumber = !disableAfterDateTimeJson ? undefined : MdsPersianDateTimePicker.convertToNumber1(disableAfterDateTimeJson);
        let currentMonthInfo = MdsPersianDateTimePicker.getMonthName(dateTimeToShowJson.month - 1, setting.isGregorian) + ' ' + dateTimeToShowJson.year.toString();
        if (!setting.isGregorian)
            currentMonthInfo = MdsPersianDateTimePicker.toPersianNumber(currentMonthInfo);
        selectedMonthName = MdsPersianDateTimePicker.getMonthName(dateTimeToShowJson.month - 1, setting.isGregorian);
        if (setting.yearOffset <= 0) {
            previousYearButtonDisabledAttribute = 'disabled';
            nextYearButtonDisabledAttribute = 'disabled';
            selectYearButtonDisabledAttribute = 'disabled';
        }
        if (!setting.isGregorian && firstWeekDayNumber != 6 || setting.isGregorian && firstWeekDayNumber != 0) {
            if (setting.isGregorian)
                firstWeekDayNumber--;
            let previousMonthDateTimeJson = MdsPersianDateTimePicker.addMonthToDateTimeJson(dateTimeToShowJson, -1, setting.isGregorian);
            for (i = numberOfDaysInPreviousMonth - firstWeekDayNumber; i <= numberOfDaysInPreviousMonth; i++) {
                currentDateNumber = MdsPersianDateTimePicker.convertToNumber2(previousMonthDateTimeJson.year, previousMonthDateTimeJson.month, i);
                dayNumberInString = setting.isGregorian ? MdsPersianDateTimePicker.zeroPad(i) : MdsPersianDateTimePicker.toPersianNumber(MdsPersianDateTimePicker.zeroPad(i));
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
                if (!setting.isGregorian && tdNumber == 6)
                    td.classList.add('text-danger');
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
        for (i = 1; i <= numberOfDaysInCurrentMonth; i++) {
            if (tdNumber >= 7) {
                tdNumber = 0;
                daysHtml += tr.outerHTML;
                isTrAppended = true;
                tr = document.createElement('TR');
            }
            currentDateNumber = MdsPersianDateTimePicker.convertToNumber2(dateTimeToShowJson.year, dateTimeToShowJson.month, i);
            dayNumberInString = setting.isGregorian ? MdsPersianDateTimePicker.zeroPad(i) : MdsPersianDateTimePicker.toPersianNumber(MdsPersianDateTimePicker.zeroPad(i));
            td = document.createElement('TD');
            td.setAttribute('data-day', '');
            td.setAttribute('data-number', currentDateNumber.toString());
            td.innerHTML = dayNumberInString;
            if (currentDateNumber == todayDateNumber) {
                td.setAttribute('data-today', '');
                td.setAttribute('title', setting.isGregorian ? MdsPersianDateTimePicker.todayText : MdsPersianDateTimePicker.todayTextPersian);
                if (!dayOfWeek)
                    dayOfWeek = MdsPersianDateTimePicker.getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
            }
            if (!setting.rangeSelector && selectedDateNumber == currentDateNumber) {
                td.setAttribute('data-mds-dtp-selected-day', '');
                dayOfWeek = MdsPersianDateTimePicker.getWeekDayName(tdNumber - 1 < 0 ? 0 : tdNumber - 1, setting.isGregorian);
            }
            for (j = 0; j < holidaysDateNumbers.length; j++) {
                if (holidaysDateNumbers[j] != currentDateNumber)
                    continue;
                td.classList.add('text-danger');
                break;
            }
            if (!setting.isGregorian && tdNumber == 6) {
                td.classList.add('text-danger');
            }
            else if (setting.isGregorian && tdNumber == 0) {
                td.classList.add('text-danger');
            }
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
        let nextMonthDateTimeJson = MdsPersianDateTimePicker.addMonthToDateTimeJson(dateTimeToShowJson, 1, setting.isGregorian);
        for (i = 1; i <= 42 - cellNumber; i++) {
            dayNumberInString = setting.isGregorian ? MdsPersianDateTimePicker.zeroPad(i) : MdsPersianDateTimePicker.toPersianNumber(MdsPersianDateTimePicker.zeroPad(i));
            currentDateNumber = MdsPersianDateTimePicker.convertToNumber2(nextMonthDateTimeJson.year, nextMonthDateTimeJson.month, i);
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
            if (!setting.isGregorian && tdNumber == 6)
                td.classList.add('text-danger');
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
    }
    getPopoverHeaderTitle(setting) {
        let selectedDateToShowJson;
        let title = '';
        if (setting.isGregorian) {
            selectedDateToShowJson = MdsPersianDateTimePicker.getDateTimeJson1(setting.selectedDateToShow);
        }
        else {
            selectedDateToShowJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(setting.selectedDateToShow);
        }
        if (setting.rangeSelector) {
            const startDate = MdsPersianDateTimePicker.addMonthToDateTime(setting.selectedDateToShow, -setting.rangeSelectorMonthsToShow[0], setting.isGregorian);
            const endDate = MdsPersianDateTimePicker.addMonthToDateTime(setting.selectedDateToShow, setting.rangeSelectorMonthsToShow[1], setting.isGregorian);
            let statDateJson;
            let endDateJson;
            if (setting.isGregorian) {
                statDateJson = MdsPersianDateTimePicker.getDateTimeJson1(startDate);
                endDateJson = MdsPersianDateTimePicker.getDateTimeJson1(endDate);
            }
            else {
                statDateJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(startDate);
                endDateJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(endDate);
            }
            const startMonthName = MdsPersianDateTimePicker.getMonthName(statDateJson.month - 1, setting.isGregorian);
            const endMonthName = MdsPersianDateTimePicker.getMonthName(endDateJson.month - 1, setting.isGregorian);
            title = `${startMonthName} ${statDateJson.year} - ${endMonthName} ${endDateJson.year}`;
        }
        else
            title = `${MdsPersianDateTimePicker.getMonthName(selectedDateToShowJson.month - 1, setting.isGregorian)} ${selectedDateToShowJson.year}`;
        if (!setting.isGregorian)
            title = MdsPersianDateTimePicker.toPersianNumber(title);
        return title;
    }
    getDateTimePickerBodyHtml(setting) {
        let selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(setting.selectedDateToShow);
        let html = MdsPersianDateTimePicker.dateTimePickerHtmlTemplate;
        html = html.replace(/\{\{inlineAttr\}\}/img, setting.inLine ? 'data-inline' : '');
        html = html.replace(/\{\{rtlCssClass\}\}/img, setting.isGregorian ? '' : 'rtl');
        html = html.replace(/\{\{selectedDateStringAttribute\}\}/img, setting.inLine ? '' : 'hidden');
        html = html.replace(/\{\{goTodayText\}\}/img, setting.isGregorian ? MdsPersianDateTimePicker.goTodayText : MdsPersianDateTimePicker.goTodayTextPersian);
        html = html.replace(/\{\{timePickerAttribute\}\}/img, setting.enableTimePicker ? '' : 'hidden');
        const disabledDays = MdsPersianDateTimePicker.getDisabledDateObject(setting);
        let title = '';
        let todayDateString = '';
        let todayDateTimeJson;
        let selectedDateTimeToShowJson;
        let disableBeforeDateTimeJson = disabledDays[0];
        let disableAfterDateTimeJson = disabledDays[1];
        if (setting.isGregorian) {
            selectedDateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJson1(selectedDateToShow);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJson1(new Date());
        }
        else {
            selectedDateTimeToShowJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(selectedDateToShow);
            todayDateTimeJson = MdsPersianDateTimePicker.getDateTimeJsonPersian1(new Date());
        }
        title = this.getPopoverHeaderTitle(setting);
        todayDateString = `${setting.isGregorian ? 'Today,' : 'امروز،'} ${todayDateTimeJson.day} ${MdsPersianDateTimePicker.getMonthName(todayDateTimeJson.month - 1, setting.isGregorian)} ${todayDateTimeJson.year}`;
        if (!setting.isGregorian) {
            todayDateString = MdsPersianDateTimePicker.toPersianNumber(todayDateString);
        }
        if (disableAfterDateTimeJson != undefined && disableAfterDateTimeJson.year <= selectedDateTimeToShowJson.year && disableAfterDateTimeJson.month < selectedDateTimeToShowJson.month)
            selectedDateToShow = setting.isGregorian ? new Date(disableAfterDateTimeJson.year, disableAfterDateTimeJson.month - 1, 1) : MdsPersianDateTimePicker.getDateTime1(disableAfterDateTimeJson.year, disableAfterDateTimeJson.month, disableAfterDateTimeJson.day);
        if (disableBeforeDateTimeJson != undefined && disableBeforeDateTimeJson.year >= selectedDateTimeToShowJson.year && disableBeforeDateTimeJson.month > selectedDateTimeToShowJson.month)
            selectedDateToShow = setting.isGregorian ? new Date(disableBeforeDateTimeJson.year, disableBeforeDateTimeJson.month - 1, 1) : MdsPersianDateTimePicker.getDateTime1(disableBeforeDateTimeJson.year, disableBeforeDateTimeJson.month, disableBeforeDateTimeJson.day);
        let monthsTdHtml = '';
        let numberOfNextMonths = setting.rangeSelectorMonthsToShow[1] <= 0 ? 0 : setting.rangeSelectorMonthsToShow[1];
        let numberOfPrevMonths = setting.rangeSelectorMonthsToShow[0] <= 0 ? 0 : setting.rangeSelectorMonthsToShow[0];
        numberOfPrevMonths *= -1;
        for (let i1 = numberOfPrevMonths; i1 < 0; i1++) {
            setting.selectedDateToShow = MdsPersianDateTimePicker.addMonthToDateTime(MdsPersianDateTimePicker.getClonedDate(selectedDateToShow), i1, setting.isGregorian);
            monthsTdHtml += this.getDateTimePickerMonthHtml(setting, false, true);
        }
        setting.selectedDateToShow = MdsPersianDateTimePicker.getClonedDate(selectedDateToShow);
        monthsTdHtml += this.getDateTimePickerMonthHtml(setting, false, false);
        for (let i2 = 1; i2 <= numberOfNextMonths; i2++) {
            setting.selectedDateToShow = MdsPersianDateTimePicker.addMonthToDateTime(MdsPersianDateTimePicker.getClonedDate(selectedDateToShow), i2, setting.isGregorian);
            monthsTdHtml += this.getDateTimePickerMonthHtml(setting, true, false);
        }
        let totalMonthNumberToShow = Math.abs(numberOfPrevMonths) + 1 + numberOfNextMonths;
        let monthTdStyle = totalMonthNumberToShow > 1 ? 'width: ' + (100 / totalMonthNumberToShow).toString() + '%;' : '';
        monthsTdHtml = monthsTdHtml.replace(/\{\{monthTdStyle\}\}/img, monthTdStyle);
        html = html.replace(/\{\{dtpInlineHeader\}\}/img, title);
        html = html.replace(/\{\{todayDateString\}\}/img, todayDateString);
        html = html.replace(/\{\{time\}\}/img, `${MdsPersianDateTimePicker.zeroPad(selectedDateTimeToShowJson.hour)}:${MdsPersianDateTimePicker.zeroPad(selectedDateTimeToShowJson.minute)}`);
        html = html.replace(/\{\{monthsTdHtml\}\}/img, monthsTdHtml);
        return html;
    }
    enableMainEvents() {
        if (this.setting.inLine)
            return;
        if (this.bsPopover != null) {
            this.element.addEventListener('shown.bs.popover', this.popoverOrModalShownEvent);
            this.element.addEventListener('hidden.bs.popover', this.popoverOrModalHiddenEvent);
            this.element.addEventListener('inserted.bs.popover', this.popoverInsertedEvent);
            this.element.addEventListener('click', this.showPopoverEvent, true);
        }
        else if (this.bsModal != null) {
            const modalElement = this.getModal();
            if (modalElement == null) {
                console.error("mds.bs.datetimepicker: `modalElement` not found!");
                return;
            }
            modalElement.addEventListener('shown.bs.modal', this.popoverOrModalShownEvent);
            modalElement.addEventListener('hidden.bs.modal', this.popoverOrModalHiddenEvent);
        }
    }
    enableInLineEvents() {
        if (!this.setting.inLine)
            return;
        setTimeout(() => {
            var _a;
            const dtp = document.querySelector(`[data-mds-dtp-guid="${this.guid}"]`);
            if (dtp != null) {
                (_a = dtp.querySelector('[data-mds-dtp-time]')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.timeChanged, false);
                dtp.addEventListener('click', this.selectCorrectClickEvent);
                dtp.querySelectorAll('[data-day]').forEach(e => e.addEventListener('mouseenter', this.hoverOnDays, true));
            }
        }, 100);
    }
    enableEvents() {
        if (this.setting.inLine)
            return;
        setTimeout(() => {
            document.addEventListener('click', this.selectCorrectClickEvent, false);
            document.querySelector('html').addEventListener('click', this.hidePopoverEvent, true);
            document.querySelectorAll('[data-mds-dtp-time]').forEach(e => e.addEventListener('change', this.timeChanged, false));
            document.querySelectorAll('[data-mds-dtp] [data-day]').forEach(e => e.addEventListener('mouseenter', this.hoverOnDays, true));
        }, 500);
    }
    disableEvents() {
        var _a, _b;
        document.removeEventListener('click', this.selectCorrectClickEvent);
        document.querySelector('html').removeEventListener('click', this.hidePopoverEvent);
        (_a = document.querySelectorAll('[data-mds-dtp-time]')) === null || _a === void 0 ? void 0 : _a.forEach(e => e.removeEventListener('change', this.timeChanged));
        document.querySelectorAll('[data-mds-dtp] [data-day]').forEach(e => e.removeEventListener('mouseenter', this.hoverOnDays));
        const dtp = document.querySelector(`[data-mds-dtp-guid="${this.guid}"]`);
        if (dtp != null) {
            dtp.removeEventListener('click', this.selectCorrectClickEvent, false);
            (_b = dtp.querySelectorAll('[data-day]')) === null || _b === void 0 ? void 0 : _b.forEach(e => e.removeEventListener('mouseenter', this.hoverOnDays, true));
        }
    }
    show() {
        var _a, _b;
        (_a = this.bsModal) === null || _a === void 0 ? void 0 : _a.show();
        (_b = this.bsPopover) === null || _b === void 0 ? void 0 : _b.show();
    }
    hide() {
        var _a, _b;
        (_a = this.bsModal) === null || _a === void 0 ? void 0 : _a.hide();
        (_b = this.bsPopover) === null || _b === void 0 ? void 0 : _b.hide();
    }
    toggle() {
        if (this.bsPopover == null)
            return;
        this.bsPopover.toggle();
    }
    enable() {
        this.setting.disabled = false;
        this.element.removeAttribute("disabled");
        MdsPersianDateTimePickerData.set(this.guid, this);
        if (this.bsPopover != null)
            this.bsPopover.enable();
    }
    disable() {
        this.setting.disabled = true;
        this.element.setAttribute("disabled", '');
        MdsPersianDateTimePickerData.set(this.guid, this);
        if (this.bsPopover != null)
            this.bsPopover.disable();
    }
    updatePosition() {
        var _a, _b;
        (_a = this.bsPopover) === null || _a === void 0 ? void 0 : _a.update();
        (_b = this.bsModal) === null || _b === void 0 ? void 0 : _b.handleUpdate();
    }
    updateSelectedDateText() {
        MdsPersianDateTimePicker.setSelectedData(this.setting);
    }
    dispose() {
        if (this.bsPopover != null)
            this.bsPopover.dispose();
        if (this.bsModal != null)
            this.bsModal.dispose();
        this.element.removeEventListener('click', this.showPopoverEvent);
        this.bsPopover = null;
        this.bsModal = null;
    }
    getBsPopoverInstance() {
        return this.bsPopover;
    }
    getBsModalInstance() {
        return this.bsModal;
    }
    getText() {
        return MdsPersianDateTimePicker.getSelectedDateFormatted(this.setting);
    }
    getSelectedDate() {
        return this.setting.selectedDate;
    }
    getSelectedDateRange() {
        return this.setting.selectedRangeDate;
    }
    setDate(date) {
        this.updateOptions({
            selectedDate: date,
            selectedDateToShow: date
        });
    }
    setDatePersian(yearPersian, monthPersian, dayPersian) {
        const gregorianDateJson = MdsPersianDateTimePicker.toGregorian(yearPersian, monthPersian, dayPersian);
        const date = new Date(gregorianDateJson.gy, gregorianDateJson.gm, gregorianDateJson.gd);
        this.updateOptions({
            selectedDate: date,
            selectedDateToShow: date
        });
    }
    setDateRange(startDate, endDate) {
        this.updateOptions({
            selectedDate: startDate,
            selectedDateToShow: startDate,
            selectedRangeDate: [startDate, endDate]
        });
    }
    clearDate() {
        this.updateOptions({
            selectedDate: null,
            selectedDateToShow: new Date(),
        });
    }
    updateOption(optionName, value) {
        if (!optionName)
            return;
        value = MdsPersianDateTimePicker.correctOptionValue(optionName, value);
        this.setting[optionName] = value;
        MdsPersianDateTimePickerData.set(this.guid, this);
        this.initializeBsPopover(this.setting);
    }
    updateOptions(options) {
        Object.keys(options).forEach((key) => {
            this.setting[key] = MdsPersianDateTimePicker.correctOptionValue(key, options[key]);
        });
        MdsPersianDateTimePickerData.set(this.guid, this);
        this.initializeBsPopover(this.setting);
    }
    static getInstance(element) {
        var _a, _b, _c, _d, _e;
        let elementGuid = element.getAttribute('data-mds-dtp-guid');
        if (!elementGuid) {
            elementGuid = (_b = (_a = element.closest('[data-mds-dtp-guid]')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-mds-dtp-guid')) !== null && _b !== void 0 ? _b : null;
            if (!elementGuid) {
                const id = (_c = element.closest('[data-mds-dtp]')) === null || _c === void 0 ? void 0 : _c.getAttribute('id');
                if (!id)
                    return null;
                elementGuid = (_e = (_d = document.querySelector('[aria-describedby="' + id + '"]')) === null || _d === void 0 ? void 0 : _d.getAttribute('data-mds-dtp-guid')) !== null && _e !== void 0 ? _e : null;
                if (!elementGuid)
                    return null;
            }
        }
        ;
        return MdsPersianDateTimePickerData.get(elementGuid);
    }
}
MdsPersianDateTimePicker.modalHtmlTemplate = `<div data-mds-dtp data-mds-dtp-guid="{{guid}}" class="modal fade mds-bs-persian-datetime-picker-modal" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header" data-mds-dtp-title="true">
<h5 class="modal-title">Modal title</h5>
</div>
<div class="modal-body">
  <div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>
  <div data-name="mds-dtp-body"></div>
</div>
</div>
</div>
</div>`;
MdsPersianDateTimePicker.popoverHtmlTemplate = `<div class="popover mds-bs-persian-datetime-picker-popover" role="tooltip" data-mds-dtp>
<div class="popover-arrow"></div>
<h3 class="popover-header text-center p-1" data-mds-dtp-title="true"></h3>
<div class="popover-body p-0" data-name="mds-dtp-body"></div>
</div>`;
MdsPersianDateTimePicker.popoverHeaderSelectYearHtmlTemplate = `<table class="table table-sm table-borderless text-center p-0 m-0 {{rtlCssClass}}" dir="{{dirAttrValue}}">
<tr>
<th>
<button type="button" class="btn btn-sm btn-light w-100" title="{{previousText}}" data-year="{{latestPreviousYear}}" data-year-range-button-change="-1" {{prevYearButtonAttr}}> &lt; </button>
</th>
<th class="pt-1">
{{yearsRangeText}}
</th>
<th>
<button type="button" class="btn btn-sm btn-light w-100" title="{{nextText}}" data-year="{{latestNextYear}}" data-year-range-button-change="1" {{nextYearButtonAttr}}> &gt; </button>
</th>
</tr>
</table>`;
MdsPersianDateTimePicker.dateTimePickerYearsToSelectHtmlTemplate = `<table class="table table-sm text-center p-0 m-0">
<tbody>
{{yearsBoxHtml}}
<tr>
<td colspan="100" class="text-center">
<button class="btn btn-sm btn-light w-100" data-mds-hide-year-list-box="true">{{cancelText}}</button>
</td>
</tr>
</tbody>
</table>`;
MdsPersianDateTimePicker.dateTimePickerHtmlTemplate = `<div class="mds-bs-dtp-container {{rtlCssClass}}" {{inlineAttr}}>
<div class="select-year-inline-box w-0" data-name="dtp-years-container">
</div>
<div class="select-year-box w-0" data-mds-dtp-year-list-box="true"></div>
<table class="table table-sm text-center p-0 m-0">
<thead>
<tr {{selectedDateStringAttribute}}>
<th mds-dtp-inline-header colspan="100">{{dtpInlineHeader}}</th>
</tr>
</thead>
<tbody>
<tr>
{{monthsTdHtml}}
</tr>
</tbody>
<tfoot>
<tr {{timePickerAttribute}}>
<td colspan="100" class="text-center border-0">
<input type="time" value="{{time}}" maxlength="2" data-mds-dtp-time />
</td>
</tr>
<tr>
<td colspan="100">
<button type="button" class="btn btn-light" title="{{goTodayText}}" data-mds-dtp-go-today>{{todayDateString}}</button>
</td>
</tr>
</tfoot>
</table>
</div>`;
MdsPersianDateTimePicker.dateTimePickerMonthTableHtmlTemplate = `<td class="border-0" style="{{monthTdStyle}}" {{monthTdAttribute}} data-td-month>
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
<button type="button" class="btn btn-light btn-sm w-100" title="{{previousYearText}}" data-change-date-button="true" data-number="{{previousYearButtonDateNumber}}" {{previousYearButtonDisabledAttribute}}> &lt;&lt; </button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm w-100" title="{{previousMonthText}}" data-change-date-button="true" data-number="{{previousMonthButtonDateNumber}}" {{previousMonthButtonDisabledAttribute}}> &lt; </button>
</th>
<th style="width: 120px;">
<div class="dropdown">
<button type="button" class="btn btn-light btn-sm dropdown-toggle w-100" id="mdtp-month-selector-button-{{guid}}"
data-bs-toggle="dropdown" aria-expanded="false">
{{selectedMonthName}}
</button>
<div class="dropdown-menu" aria-labelledby="mdtp-month-selector-button-{{guid}}">
<a class="dropdown-item {{selectMonth1ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth1DateNumber}}">{{monthName1}}</a>
<a class="dropdown-item {{selectMonth2ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth2DateNumber}}">{{monthName2}}</a>
<a class="dropdown-item {{selectMonth3ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth3DateNumber}}">{{monthName3}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth4ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth4DateNumber}}">{{monthName4}}</a>
<a class="dropdown-item {{selectMonth5ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth5DateNumber}}">{{monthName5}}</a>
<a class="dropdown-item {{selectMonth6ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth6DateNumber}}">{{monthName6}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth7ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth7DateNumber}}">{{monthName7}}</a>
<a class="dropdown-item {{selectMonth8ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth8DateNumber}}">{{monthName8}}</a>
<a class="dropdown-item {{selectMonth9ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth9DateNumber}}">{{monthName9}}</a>
<div class="dropdown-divider"></div>
<a class="dropdown-item {{selectMonth10ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth10DateNumber}}">{{monthName10}}</a>
<a class="dropdown-item {{selectMonth11ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth11DateNumber}}">{{monthName11}}</a>
<a class="dropdown-item {{selectMonth12ButtonCssClass}}" data-change-date-button="true" data-number="{{dropDownMenuMonth12DateNumber}}">{{monthName12}}</a>
</div>
</div>
</th>
<th style="width: 50px;">
<button type="button" class="btn btn-light btn-sm w-100" mds-pdtp-select-year-button {{selectYearButtonDisabledAttribute}}>{{selectedYear}}</button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm w-100" title="{{nextMonthText}}" data-change-date-button="true" data-number="{{nextMonthButtonDateNumber}}" {{nextMonthButtonDisabledAttribute}}> &gt; </button>
</th>
<th>
<button type="button" class="btn btn-light btn-sm w-100" title="{{nextYearText}}" data-change-date-button="true" data-number="{{nextYearButtonDateNumber}}" {{nextYearButtonDisabledAttribute}}> &gt;&gt; </button>
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
MdsPersianDateTimePicker.previousYearTextPersian = 'سال قبل';
MdsPersianDateTimePicker.previousMonthTextPersian = 'ماه قبل';
MdsPersianDateTimePicker.previousTextPersian = 'قبلی';
MdsPersianDateTimePicker.nextYearTextPersian = 'سال بعد';
MdsPersianDateTimePicker.nextMonthTextPersian = 'ماه بعد';
MdsPersianDateTimePicker.nextTextPersian = 'بعدی';
MdsPersianDateTimePicker.todayTextPersian = 'امروز';
MdsPersianDateTimePicker.goTodayTextPersian = 'برو به امروز';
MdsPersianDateTimePicker.cancelTextPersian = 'انصراف';
MdsPersianDateTimePicker.currentYearTextPersian = 'سال جاری';
MdsPersianDateTimePicker.previousText = 'Previous';
MdsPersianDateTimePicker.previousYearText = 'Previous Year';
MdsPersianDateTimePicker.previousMonthText = 'Previous Month';
MdsPersianDateTimePicker.nextText = 'Next';
MdsPersianDateTimePicker.nextYearText = 'Next Year';
MdsPersianDateTimePicker.nextMonthText = 'Next Month';
MdsPersianDateTimePicker.todayText = 'Today';
MdsPersianDateTimePicker.goTodayText = 'Go Today';
MdsPersianDateTimePicker.cancelText = 'Cancel';
MdsPersianDateTimePicker.currentYearText = 'Current Year';
MdsPersianDateTimePicker.shortDayNamesPersian = [
    'ش',
    'ی',
    'د',
    'س',
    'چ',
    'پ',
    'ج',
];
MdsPersianDateTimePicker.shortDayNames = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa',
];
MdsPersianDateTimePicker.monthNamesPersian = [
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
MdsPersianDateTimePicker.monthNames = [
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
MdsPersianDateTimePicker.weekDayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
MdsPersianDateTimePicker.weekDayNamesPersian = [
    'یک شنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
    'شنبه'
];
MdsPersianDateTimePicker.convertDateToString = (date, isGregorian, format) => {
    return MdsPersianDateTimePicker.getDateTimeString(!isGregorian ? MdsPersianDateTimePicker.getDateTimeJsonPersian1(date) : MdsPersianDateTimePicker.getDateTimeJson1(date), format, isGregorian, !isGregorian);
};
MdsPersianDateTimePicker.convertDateToJalali = (date) => {
    const dateTimeJson1 = MdsPersianDateTimePicker.getDateTimeJson1(date);
    const jalaliJsonModel = MdsPersianDateTimePicker.toJalali(dateTimeJson1.year, dateTimeJson1.month, dateTimeJson1.day);
    return {
        year: jalaliJsonModel.jy,
        month: jalaliJsonModel.jm,
        day: jalaliJsonModel.jd,
    };
};
export class MdsPersianDateTimePickerSetting {
    constructor() {
        this.placement = 'bottom';
        this.enableTimePicker = false;
        this.targetTextSelector = '';
        this.targetDateSelector = '';
        this.toDate = false;
        this.fromDate = false;
        this.groupId = '';
        this.disabled = false;
        this.textFormat = '';
        this.dateFormat = '';
        this.isGregorian = false;
        this.inLine = false;
        this.selectedDate = null;
        this.selectedDateToShow = new Date();
        this.yearOffset = 15;
        this.holidays = [];
        this.disabledDates = [];
        this.disabledDays = [];
        this.specialDates = [];
        this.disableBeforeToday = false;
        this.disableAfterToday = false;
        this.disableBeforeDate = null;
        this.disableAfterDate = null;
        this.rangeSelector = false;
        this.rangeSelectorStartDate = null;
        this.rangeSelectorEndDate = null;
        this.rangeSelectorMonthsToShow = [0, 0];
        this.selectedRangeDate = [];
        this.modalMode = false;
        this.persianNumber = false;
        this.calendarViewOnChange = (_) => { };
        this.onDayClick = (_) => { };
    }
}
const MdsPersianDateTimePickerElementMap = new Map();
var MdsPersianDateTimePickerData = {
    set(key, instance) {
        if (!MdsPersianDateTimePickerElementMap.has(key)) {
            MdsPersianDateTimePickerElementMap.set(key, instance);
            return;
        }
        MdsPersianDateTimePickerElementMap.set(key, instance);
    },
    get(key) {
        return MdsPersianDateTimePickerElementMap.get(key) || null;
    },
    getAll() {
        return Array.from(MdsPersianDateTimePickerElementMap, ([_name, value]) => value);
    },
    remove(key) {
        if (!MdsPersianDateTimePickerElementMap.has(key)) {
            return;
        }
        MdsPersianDateTimePickerElementMap.delete(key);
    }
};
//# sourceMappingURL=mds.bs.datetimepicker.js.map