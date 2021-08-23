let inLine = false;
const normalDtpContainer = document.querySelector('[data-name="normal-dtp-container"]');
const inLineDtpContainer = document.querySelector('[data-name="in-line-dtp-container"]');
const groupIdTextBoxElement = document.querySelector('[data-name="group-id"]');
const dtp2ContainerElement = document.querySelector('[data-name="dtp2-container"]');
const inLineDtp2ContainerElement = document.querySelector('[data-name="in-line-dtp2-container"]');
const fromToDateTitleElements = document.querySelectorAll('[data-name="from-to-date-title"]');

const dtp1Element = document.getElementById('dtp1');
const dtp1 = new mds.MdsPersianDateTimePicker(dtp1Element, {
  targetTextSelector: '[data-name="dtp1-text"]',
  targetDateSelector: '[data-name="dtp1-date"]',
});
// activeDatePicker = dtp1;

const dtp2Element = document.getElementById('dtp2');
const dtp2 = new mds.MdsPersianDateTimePicker(dtp2Element, {
  targetTextSelector: '[data-name="dtp2-text"]',
  targetDateSelector: '[data-name="dtp2-date"]',
});

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
          break;
        case false:
          normalDtpContainer.hidden = false;
          inLineDtpContainer.hidden = true;
          inLine = false;
          break;
      }
      break;
    }
    case 'fromDate':
    case 'toDate': {
      switch (value) {
        case true:
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
      break;
    }
  }
  console.log(`${optionName} => ${value}`);
  switch (optionName) {
    case 'toDate':
    case 'fromDate':
      dtp1.updateOption('groupId', groupIdTextBoxElement.value);
      dtp2.updateOption('groupId', groupIdTextBoxElement.value);
      inLineDtp1.updateOption('groupId', "_" + groupIdTextBoxElement.value);
      inLineDtp2.updateOption('groupId', "_" + groupIdTextBoxElement.value);
      dtp1.updateOption('fromDate', value);
      dtp2.updateOption('toDate', value);
      inLineDtp1.updateOption('fromDate', value);
      inLineDtp2.updateOption('toDate', value);
      break;

    case 'inLine':
      break;

    default:
      dtp1.updateOption(optionName, value);
      inLineDtp1.updateOption(optionName, value);
      break;
  }
}