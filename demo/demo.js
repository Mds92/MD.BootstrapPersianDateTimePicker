let activeDatePicker = undefined;
const normalDtpContainer = document.querySelector('[data-name="normal-dtp-container"]');
const inLineDtpContainer = document.querySelector('[data-name="in-line-dtp-container"]');

const dtp1Element = document.getElementById('dtp1');
const dtp1 = new mds.MdsPersianDateTimePicker(dtp1Element, {
  targetTextSelector: '[data-name="dtp1-text"]',
  targetDateSelector: '[data-name="dtp1-date"]',
});
activeDatePicker = dtp1;

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
  if (optionName == 'inLine') {
    switch (value) {
      case 'true':
        normalDtpContainer.setAttribute('hidden', '');
        inLineDtpContainer.removeAttribute('hidden');
        activeDatePicker = inLineDtp1;
        break;
      case 'false':
        normalDtpContainer.removeAttribute('hidden');
        inLineDtpContainer.setAttribute('hidden', '');
        activeDatePicker = dtp1;
        break;
    }
    // return;
  }
  console.log(`${optionName} => ${value}`);
  activeDatePicker.updateOption(optionName, value);
}