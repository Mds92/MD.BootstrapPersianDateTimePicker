let activeDatePicker = undefined;
const normalDtpContainer = document.querySelector('[data-name="normal-dtp-container"]');
const inLineDtpContainer = document.querySelector('[data-name="in-line-dtp-container"]');

const dtp1Element = document.getElementById('dtp1');
const dtp1 = new mds.MdsPersianDateTimePicker(dtp1Element, {
  targetTextSelector: '[data-name="dtp1-text"]',
  targetDateSelector: '[data-name="dtp1-date"]',
});
activeDatePicker = dtp1;

const dtp2ContainerElement = document.querySelector('[data-name="dtp2-container"]');
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

const inLineDtp2ContainerElement = document.querySelector('[data-name="in-line-dtp2-container"]');
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
          normalDtpContainer.setAttribute('hidden', '');
          inLineDtpContainer.removeAttribute('hidden');
          activeDatePicker = inLineDtp1;
          break;
        case false:
          normalDtpContainer.removeAttribute('hidden');
          inLineDtpContainer.setAttribute('hidden', '');
          activeDatePicker = dtp1;
          break;
      }
      break;
    }
    case 'fromDate':
    case 'toDate': {
      switch (value) {
        case true:
          dtp2ContainerElement.removeAttribute('hidden');
          inLineDtp2ContainerElement.removeAttribute('hidden');
          break;
        case false:
          dtp2ContainerElement.setAttribute('hidden', '');
          inLineDtp2ContainerElement.setAttribute('hidden', '');
          break;
      }
      break;
    }
  }
  console.log(`${optionName} => ${value}`);
  switch (optionName) {
    case 'toDate':
    case 'fromDate':
      activeDatePicker.updateOption('toDate', value);
      activeDatePicker.updateOption('fromDate', value);
      activeDatePicker.updateOption('groupId', value);
      break;

    default:
      activeDatePicker.updateOption(optionName, value);
      break;
  }
}