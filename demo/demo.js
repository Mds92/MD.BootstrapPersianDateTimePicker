let inLine = false;
const normalDtpContainer = document.querySelector('[data-name="normal-dtp-container"]');
const inLineDtpContainer = document.querySelector('[data-name="in-line-dtp-container"]');
const groupIdTextBoxElement = document.querySelector('[data-name="group-id"]');
const dtp2ContainerElement = document.querySelector('[data-name="dtp2-container"]');
const toDateFromDateRadioOptions = document.querySelectorAll('input[name="toDateFromDateRadioOptions"]');
const inLineDtp2ContainerElement = document.querySelector('[data-name="in-line-dtp2-container"]');
const fromToDateTitleElements = document.querySelectorAll('[data-name="from-to-date-title"]');
const textFormatElement = document.querySelector('[data-name="text-format"]');
const dateFormatElement = document.querySelector('[data-name="date-format"]');

const modalModeRadioOptions = document.querySelectorAll('input[name="modalModeRadioOptions"]');
const inLineRadioOptions = document.querySelectorAll('input[name="inLineRadioOptions"]');
const rangeSelectorRadioOptions = document.querySelectorAll('input[name="rangeSelectorRadioOptions"]');
const rangeSelectorMonthsToShowStartInputElements = document.querySelector('[data-name="rangeSelectorMonthsToShow-start"]');
const rangeSelectorMonthsToShowEndInputElements = document.querySelector('[data-name="rangeSelectorMonthsToShow-end"]');
const rangeSelectorMonthsToShowInputElements = document.querySelectorAll('[data-name^="rangeSelectorMonthsToShow"]');
rangeSelectorMonthsToShowInputElements.forEach(e => e.addEventListener('change', rangeSelectorMonthsToShowOnChange));

const dtp1Element = document.getElementById('dtp1');
const dtp1 = new mds.MdsPersianDateTimePicker(dtp1Element, {
  targetTextSelector: '[data-name="dtp1-text"]',
  targetDateSelector: '[data-name="dtp1-date"]',
});

textFormatElement.value = dtp1.setting.textFormat;
dateFormatElement.value = dtp1.setting.dateFormat;

const dtp2Element = document.getElementById('dtp2');
const dtp2 = new mds.MdsPersianDateTimePicker(dtp2Element, {
  targetTextSelector: '[data-name="dtp2-text"]',
  targetDateSelector: '[data-name="dtp2-date"]',
});

const inLineDtp1ColumnElement = document.querySelector('[data-name="in-line-dtp1-column"]');
const inLineDtp1Element = document.querySelector('[data-name="in-line-dtp1"]');
const inLineDtp1 = new mds.MdsPersianDateTimePicker(inLineDtp1Element, {
  inLine: true,
  targetTextSelector: '[data-name="in-line-dtp1-text"]',
  targetDateSelector: '[data-name="in-line-dtp1-date"]',
});

const inLineDtp2Element = document.querySelector('[data-name="in-line-dtp2"]');
const inLineDtp2 = new mds.MdsPersianDateTimePicker(inLineDtp2Element, {
  inLine: true,
  targetTextSelector: '[data-name="in-line-dtp2-text"]',
  targetDateSelector: '[data-name="in-line-dtp2-date"]',
});

function optionOnChange(optionName, value) {
  if (value == 'true')
    value = true;
  else if (value == 'false')
    value = false;

  switch (optionName) {
    case 'inLine': {
      switch (value) {
        case true:
          normalDtpContainer.hidden = true;
          inLineDtpContainer.hidden = false;
          inLine = true;
          modalModeRadioOptions.forEach(e => e.checked = e.value == 'false');
      break;
        case false:
          normalDtpContainer.hidden = false;
          inLineDtpContainer.hidden = true;
          inLine = false;
          break;
      }
      break;
    }

    case 'modalMode': {
      normalDtpContainer.hidden = false;
      inLineDtpContainer.hidden = true;
      inLineRadioOptions.forEach(e => e.checked = e.value == 'false');
      inLine = false;
      break;
    }

    case 'rangeSelector': {
      switch (value) {
        case true:
          // from/to date
          dtp2ContainerElement.hidden = true;
          inLineDtp2ContainerElement.hidden = true;
          groupIdTextBoxElement.setAttribute('readonly', '');
          fromToDateTitleElements.forEach(e => e.hidden = true);
          // ----------
          rangeSelectorMonthsToShowInputElements.forEach(e => e.removeAttribute('readonly'));
          toDateFromDateRadioOptions.forEach(e => e.checked = e.value == 'false');
          groupIdTextBoxElement.setAttribute('readonly', '');
          break;
        case false:
          rangeSelectorMonthsToShowStartInputElements.value = 0;
          rangeSelectorMonthsToShowEndInputElements.value = 0;
          rangeSelectorMonthsToShowInputElements.forEach(e => e.setAttribute('readonly', ''));
          rangeSelectorMonthsToShowOnChange();
          break;
      }
      break;
    }

    case 'fromDate':
    case 'toDate': {
      switch (value) {
        case true:
          // rangeSelector
          rangeSelectorMonthsToShowStartInputElements.value = 0;
          rangeSelectorMonthsToShowEndInputElements.value = 0;
          rangeSelectorMonthsToShowInputElements.forEach(e => e.setAttribute('readonly', ''));
          rangeSelectorRadioOptions.forEach(e => e.checked = e.value == 'false');
          // ----------
          dtp2ContainerElement.hidden = false;
          inLineDtp2ContainerElement.hidden = false;
          groupIdTextBoxElement.removeAttribute('readonly');
          fromToDateTitleElements.forEach(e => e.hidden = false);
          break;
        case false:
          dtp2ContainerElement.hidden = true;
          inLineDtp2ContainerElement.hidden = true;
          groupIdTextBoxElement.setAttribute('readonly', '');
          fromToDateTitleElements.forEach(e => e.hidden = true);
          break;
      }
      rangeSelectorMonthsToShowOnChange();
      break;
    }
  }

  console.log(`${optionName} => ${value}`);

  switch (optionName) {
    case 'rangeSelector':
      dtp1.updateOptions({
        toDate: false,
        fromDate: false,
        rangeSelector: true,
      });
      dtp2.updateOptions({
        toDate: false,
        fromDate: false,
      });
      inLineDtp1.updateOptions({
        toDate: false,
        fromDate: false,
        rangeSelector: true,
      });
      inLineDtp2.updateOptions({
        toDate: false,
        fromDate: false,
      });
      break;

    case 'toDate':
    case 'fromDate':
      dtp1.updateOptions({
        groupId: groupIdTextBoxElement.value,
        fromDate: value,
        rangeSelector: false,
      });
      dtp2.updateOptions({
        groupId: groupIdTextBoxElement.value,
        toDate: value,
        rangeSelector: false,
      });
      inLineDtp1.updateOptions({
        groupId: "_" + groupIdTextBoxElement.value,
        fromDate: value,
        rangeSelector: false,
      });
      inLineDtp2.updateOptions({
        groupId: "_" + groupIdTextBoxElement.value,
        toDate: value,
        rangeSelector: false,
      });
      break;

    case 'textFormat':
    case 'dateFormat':
      dtp1.updateOption(optionName, value);
      dtp1.updateSelectedDateText();
      dtp2.updateOption(optionName, value);
      dtp2.updateSelectedDateText();
      inLineDtp1.updateOption(optionName, value);
      inLineDtp1.updateSelectedDateText();
      inLineDtp2.updateOption(optionName, value);
      inLineDtp2.updateSelectedDateText();
      break;

    case 'inLine':
      dtp1.updateOptions({
        modalMode: false
      });
      dtp2.updateOptions({
        modalMode: false
      });
      break;

    case 'modalMode':
      dtp1.updateOption(optionName, value);
      dtp2.updateOption(optionName, value);
      break;

    case 'disabled':
      dtp1.updateOption(optionName, value);
      dtp2.updateOption(optionName, value);
      inLineDtp1.updateOption(optionName, value);
      inLineDtp2.updateOption(optionName, value);
      break;

    case 'isGregorian':
      dtp1.updateOption(optionName, value);
      dtp2.updateOption(optionName, value);
      dtp1.updateSelectedDateText();
      dtp2.updateSelectedDateText();
      inLineDtp1.updateOption(optionName, value);
      inLineDtp2.updateOption(optionName, value);
      inLineDtp1.updateSelectedDateText();
      inLineDtp2.updateSelectedDateText();
      break;

    case 'enableTimePicker':
      dtp1.updateOption(optionName, value);
      dtp1.updateSelectedDateText();
      inLineDtp1.updateOption(optionName, value);
      inLineDtp1.updateSelectedDateText();
      break;

    default:
      dtp1.updateOption(optionName, value);
      inLineDtp1.updateOption(optionName, value);
      break;
  }
}

function rangeSelectorMonthsToShowOnChange() {
  const start = Number(rangeSelectorMonthsToShowStartInputElements.value);
  const end = Number(rangeSelectorMonthsToShowEndInputElements.value);
  if (start == 0 && end == 0)
    inLineDtp1ColumnElement.setAttribute('class', 'col-5');
  else
    inLineDtp1ColumnElement.setAttribute('class', 'col-12');
  inLineDtp1Element.style.width = ''
  dtp1.updateOption('rangeSelectorMonthsToShow', [start, end]);
  inLineDtp1.updateOption('rangeSelectorMonthsToShow', [start, end]);
}