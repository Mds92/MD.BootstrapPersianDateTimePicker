# MD.BootstrapPersianDateTimePicker

![alt text](https://raw.githubusercontent.com/Mds92/MD.BootstrapPersianDateTimePicker/master/MD.BootstrapPersianDateTimePicker/Content/MD.PersianDateTimePicker.png "MD.BootstrapPersianDateTimePicker")

`MD.BootstrapPersianDateTimePicker` is a DateTimePicker plugin for jquery and Bootstrap.

#####Note:<br>
To see demo just open `View` folder and run the html files. Don't bild the project, it's not a C# project.
`MD.BootstrapPersianDateTimePicker` uses bootstrap [Popovers](http://getbootstrap.com/javascript/#popovers), so it has felexibility of bootstrap's popover.

There are two file in `Views` folder that you can learn how to use this plugin.

----
Install Using nuget:
##Install-Package MD.BootstrapPersianDateTimePicker
There are two approaches to use MdPersianDateTime
- Use JavaScript and jQuery as another jQuery's plugins.
You can use the folowing settings for this approach (you can omit them, so the plugin use the default values).
Placement string to determine popover placement.It's equals with bootstrap's popover placement. So it can be 'bottom', 'right', 'left', 'top'
Trigger string to determine the trigger of bootstrap popover to show DateTimePicker. like 'focus', 'click', 'mouseover', ...
EnableTimePicker boolean enables TimePicker on the html element's DateTimePicker. default is true
TargetSelector string determines the jQuery selector of the element to write the DateTime string into it .
GroupId string determines the group name in FromDate, ToDate filtering. you have to use this attribute if you wanna use the filter
ToDate boolean determines the html tags as ToDate filter.
FromDate boolean determines the html tags as FromDate filter

Sample :
```html
<script type="text/javascript">
    $('#textBoxInputId').MdPersianDateTimePicker({
        Placement: 'bottom', // default is 'bottom'
        Trigger: 'focus', // default is 'focus',
	EnableTimePicker: true, // default is true,
	TargetSelector: '', // default is empty,
	GroupId: '', // default is empty,
	ToDate: false, // default is false,
	FromDate: false, // default is false,
	EnglishNumber: false,
    });
</script>
```
- Use html tags attributes.
In this approach you can determine the settings with the following attributes:
```html
data-DateTimePicker="true"
data-Placement="bottom"
data-Trigger="focus"
data-EnableTimePicker="true"
data-TargetSelector="#fromDate1"
data-GroupId="group1"
data-ToDate="true"
data-FromDate="true"
data-EnglishNumber="true"
```

Sample :
```html
<button class="btn btn-default" data-MdDateTimePicker="true" data-TargetSelector="#input1" data-EnableTimePicker="true" data-Placement="left" data-Trigger="click">انتخاب تاریخ</button>
```
If you are using `.Net` for programming, I recommended to use the following library to parse and use PersianDateTime as easy as DateTime.
[MD.PersianDateTime](https://github.com/Mds92/MD.PersianDateTime)
