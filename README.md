# MD.BootstrapPersianDateTimePicker

![MD.BootstrapPersianDateTimePicker](https://raw.githubusercontent.com/Mds92/MD.BootstrapPersianDateTimePicker/master/MD.BootstrapPersianDateTimePicker/Content/MD.PersianDateTimePicker1.png "MD.BootstrapPersianDateTimePicker")
![MD.BootstrapPersianDateTimePicker](https://raw.githubusercontent.com/Mds92/MD.BootstrapPersianDateTimePicker/master/MD.BootstrapPersianDateTimePicker/Content/MD.PersianDateTimePicker2.png "MD.BootstrapPersianDateTimePicker")

`MD.BootstrapPersianDateTimePicker` is a DateTimePicker plugin for jquery and Bootstrap 3.

##### Note:<br>
**To see demo just open `Demo` folder and run the html files. Don't build the project, it's not a C# project.**
`MD.BootstrapPersianDateTimePicker` uses bootstrap [Popovers](http://getbootstrap.com/javascript/#popovers), so it has felexibility of bootstrap's popover.

There is a file in `Manual` folder that you can learn how to use this plugin.

----
Installing:
## Install-Package MD.BootstrapPersianDateTimePicker
## npm install md.bootstrappersiandatetimepicker

There are two approaches to use MdPersianDateTime
- Use JavaScript and jQuery as another jQuery's plugins.
You can use the folowing settings for this approach (you can omit them, so the plugin use the default values).
Placement string to determine popover placement.It's equals with bootstrap's popover placement. So it can be 'bottom', 'right', 'left', 'top'
Trigger string to determine the trigger of bootstrap popover to show DateTimePicker. like 'focus', 'click', 'mouseover', ...
EnableTimePicker boolean enables TimePicker on the html element's DateTimePicker. default is true
TargetSelector string determines the jQuery selector of the element to write the DateTime string into it .
GroupId string determines the group name in FromDate, ToDate filtering. you have to use this attribute if you wanna use the filter
ToDate boolean determines the html tags as ToDate filter.
FromDate boolean determines the html tags as FromDate filter.
Disabled boolean determines whether date picker show or not.

Sample :
```html
<script type="text/javascript">
    $('#textBoxInputId').MdPersianDateTimePicker({
		Placement: 'left',		
		Trigger: 'click',
		EnableTimePicker: false,
		TargetSelector: '#ElementId',
		GroupId: '',
		ToDate: false,
		FromDate: false,
		DisableBeforeToday: false,
		Disabled: false,
		Format: 'yyyy/MM/dd',		
		IsGregorian: false,
		EnglishNumber: false,
    });
</script>
```
- Use html tags attributes.
In this approach you can determine the settings with the following attributes:
```html
data-mddatetimepicker="true"
data-placement="bottom"
data-trigger="focus"
data-enabletimepicker="true"
data-targetselector="#fromDate1"
data-groupid="group1"
data-todate="true"
data-fromdate="true"
data-englishnumber="true"
data-disabled="false"
data-isgregorian="false"
data-format="yyyy/MM/dd"
data-disablebeforetoday="false"
```

Sample :
```html
<button class="btn btn-default" data-MdDateTimePicker="true" data-TargetSelector="#input1" data-EnableTimePicker="true" data-Placement="left" data-Trigger="click">انتخاب تاریخ</button>
```
```javascript
//Supported format
yyyy: سال چهار رقمی
yy: سال دو رقمی
MMMM: نام فارسی ماه
MM: عدد دو رقمی ماه
M: عدد یک رقمی ماه
dddd: نام فارسی روز هفته
dd: عدد دو رقمی روز ماه
d: عدد یک رقمی روز ماه
HH: ساعت دو رقمی با فرمت 00 تا 24
H: ساعت یک رقمی با فرمت 0 تا 24
hh: ساعت دو رقمی با فرمت 00 تا 12
h: ساعت یک رقمی با فرمت 0 تا 12
mm: عدد دو رقمی دقیقه
m: عدد یک رقمی دقیقه
ss: ثانیه دو رقمی
s: ثانیه یک رقمی
fff: میلی ثانیه 3 رقمی
ff: میلی ثانیه 2 رقمی
f: میلی ثانیه یک رقمی
tt: ب.ظ یا ق.ظ
t: حرف اول از ب.ظ یا ق.ظ
```

If you are using `.Net` for programming, I recommended to use the following library to parse and use PersianDateTime as easy as DateTime.
[MD.PersianDateTime](https://github.com/Mds92/MD.PersianDateTime)

<a href='https://pledgie.com/campaigns/31713'><img alt='Click here to lend your support to: Help me to develop MD.BootstrapPersianDateTimePicker jQuery and JavaScript-plugin on Bootstrap and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31713.png?skin_name=chrome' border='0' ></a>
