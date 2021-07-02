# datetime

datetime 模块提供用于处理日期和时间的类。

```
参见:
模块 calendar
通用日历相关函数

模块 time
时间的访问和转换

dateutil 包
具有扩展时区和解析支持的第三方库。
```

## 有效的类型

**class datetime.date**  
一个理想化的简单型日期，它假设当今的公历在过去和未来永远有效。 属性: year, month, and day。

**class datetime.time**  
一个独立于任何特定日期的理想化时间，它假设每一天都恰好等于 24*60*60 秒。 （这里没有“闰秒”的概念。） 包含属性: hour, minute, second, microsecond 和 tzinfo。

**class datetime.datetime**  
日期和时间的结合。属性：year, month, day, hour, minute, second, microsecond, and tzinfo.

**class datetime.timedelta**  
表示两个 date 对象或者 time 对象,或者 datetime 对象之间的时间间隔，精确到微秒。

**class datetime.tzinfo**  
一个描述时区信息对象的抽象基类。 用来给 datetime 和 time 类提供自定义的时间调整概念（例如处理时区和/或夏令时）。

**class datetime.timezone**  
一个实现了 tzinfo 抽象基类的子类，用于表示相对于 世界标准时间（UTC）的偏移量。

```
子类关系:
object
    timedelta
    tzinfo
        timezone
    time
    date
        datetime
```

## timedelta 类对象

timedelta 对象表示两个 date 或者 time 的时间间隔。

### class timedelta

class datetime.timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)

### timedelta 用法示例

```python
>>> # Components of another_year add up to exactly 365 days
>>> from datetime import timedelta
>>> year = timedelta(days=365)
>>> another_year = timedelta(weeks=40, days=84, hours=23,
...                          minutes=50, seconds=600)
>>> year == another_year
True
>>> year.total_seconds()
31536000.0


>>> from datetime import timedelta
>>> year = timedelta(days=365)
>>> ten_years = 10 * year
>>> ten_years
datetime.timedelta(days=3650)
>>> ten_years.days // 365
10
>>> nine_years = ten_years - year
>>> nine_years
datetime.timedelta(days=3285)
>>> three_years = nine_years // 3
>>> three_years, three_years.days // 365
(datetime.timedelta(days=1095), 3)
```

## date 对象

date 对象代表一个理想化历法中的日期（年、月和日)，公元 1 年 1 月 1 日是第 1 日，公元 1 年 1 月 2 日是第 2 日，依此类推

### date.today

classmethod date.today()
返回当前的本地日期。

### date.fromtimestamp

classmethod date.fromtimestamp(timestamp)  
返回对应于 POSIX 时间戳的当地时间，例如 time.time() 返回的就是时间戳。

### date.fromordinal

classmethod date.fromordinal(ordinal)  
返回对应于预期格列高利历序号的日期，其中公元 1 年 1 月 1 晶的序号为 1。

### date.fromisoformat

classmethod date.fromisoformat(date_string)  
返回一个对应于以 YYYY-MM-DD 格式给出的 date_string 的 date 对象:

```python
>>>
>>> from datetime import date
>>> date.fromisoformat('2019-12-04')
datetime.date(2019, 12, 4)
```

这是 date.isoformat() 的逆操作。 它只支持 YYYY-MM-DD 格式。

### date.fromisocalendar

classmethod date.fromisocalendar(year, week, day)
返回指定 year, week 和 day 所对应 ISO 历法日期的 date。 这是函数 date.isocalendar() 的逆操作。

### date.replace

date.replace(year=self.year, month=self.month, day=self.day)
返回一个具有同样值的日期，除非通过任何关键字参数给出了某些形参的新值。

示例:

```python
>>>
>>> from datetime import date
>>> d = date(2002, 12, 31)
>>> d.replace(day=26)
datetime.date(2002, 12, 26)
```

### date.timetuple

date.timetuple()
返回一个 time.struct_time，即 time.localtime() 所返回的类型。

hours, minutes 和 seconds 值均为 0，且 DST 旗标值为 -1。

d.timetuple() 等价于:

time.struct_time((d.year, d.month, d.day, 0, 0, 0, d.weekday(), yday, -1))
其中 yday = d.toordinal() - date(d.year, 1, 1).toordinal() + 1 是当前年份中的日期序号，1 月 1 日的序号为 1。

### date.toordinal

date.toordinal()
返回日期的预期格列高利历序号，其中公元 1 年 1 月 1 日的序号为 1。 对于任意 date 对象 d，date.fromordinal(d.toordinal()) == d。

### date.weekday

date.weekday()
返回一个整数代表星期几，星期一为 0，星期天为 6。例如， date(2002, 12, 4).weekday() == 2，表示的是星期三。参阅 isoweekday()。

### date.isoweekday

date.isoweekday()
返回一个整数代表星期几，星期一为 1，星期天为 7。例如：date(2002, 12, 4).isoweekday() == 3,表示星期三。参见 weekday(), isocalendar()。

### date.isocalendar

date.isocalendar()
返回一个三元元组，(ISO year, ISO week number, ISO weekday) 。

ISO 历法是一种被广泛使用的格列高利历。

ISO 年由 52 或 53 个完整星期构成，每个星期开始于星期一结束于星期日。 一个 ISO 年的第一个星期就是（格列高利）历法的一年中第一个包含星期四的星期。 这被称为 1 号星期，这个星期四所在的 ISO 年与其所在的格列高利年相同。

例如，2004 年的第一天是星期四，因此 ISO 2004 年的第一个星期开始于 2003 年 12 月 29 日星期一，结束于 2004 年 1 月 4 日星期日:

```python
>>>
>>> from datetime import date
>>> date(2003, 12, 29).isocalendar()
(2004, 1, 1)
>>> date(2004, 1, 4).isocalendar()
(2004, 1, 7)
```

### date.isoformat

date.isoformat()
返回一个以 ISO 8601 格式 YYYY-MM-DD 来表示日期的字符串:

```python
>>>
>>> from datetime import date
>>> date(2002, 12, 4).isoformat()
'2002-12-04'
这是 date.fromisoformat() 的逆操作。
```

### date.**str**

date.**str**()
对于日期对象 d, str(d) 等价于 d.isoformat() 。

### date.strftime

date.strftime(format)
返回一个由显式格式字符串所指明的代表日期的字符串。 表示时、分或秒的格式代码值将为 0。 要获取格式指令的完整列表请参阅 strftime() 和 strptime() 的行为。

### class:date 用法示例

计算距离特定事件天数的例子:

```python
>>>
>>> import time
>>> from datetime import date
>>> today = date.today()
>>> today
datetime.date(2007, 12, 5)
>>> today == date.fromtimestamp(time.time())
True
>>> my_birthday = date(today.year, 6, 24)
>>> if my_birthday < today:
...     my_birthday = my_birthday.replace(year=today.year + 1)
>>> my_birthday
datetime.date(2008, 6, 24)
>>> time_to_birthday = abs(my_birthday - today)
>>> time_to_birthday.days
202


>>> from datetime import date
>>> d = date.fromordinal(730920) # 730920th day after 1. 1. 0001
>>> d
datetime.date(2002, 3, 11)

>>> # Methods related to formatting string output
>>> d.isoformat()
'2002-03-11'
>>> d.strftime("%d/%m/%y")
'11/03/02'
>>> d.strftime("%A %d. %B %Y")
'Monday 11. March 2002'
>>> d.ctime()
'Mon Mar 11 00:00:00 2002'
>>> 'The {1} is {0:%d}, the {2} is {0:%B}.'.format(d, "day", "month")
'The day is 11, the month is March.'

>>> # Methods for to extracting 'components' under different calendars
>>> t = d.timetuple()
>>> for i in t:
...     print(i)
2002                # year
3                   # month
11                  # day
0
0
0
0                   # weekday (0 = Monday)
70                  # 70th day in the year
-1
>>> ic = d.isocalendar()
>>> for i in ic:
...     print(i)
2002                # ISO year
11                  # ISO week number
1                   # ISO day number ( 1 = Monday )

>>> # A date object is immutable; all operations produce a new object
>>> d.replace(year=2005)
datetime.date(2005, 3, 11)
```

## datetime 对象

datetime 对象是包含来自 date 对象和 time 对象的所有信息的单一对象。

构造器 ：

class datetime.datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, \*, fold=0)

### datetime.today

classmethod datetime.today()
返回表示当前地方时的 datetime 对象，其中 tzinfo 为 None。

等价于:

datetime.fromtimestamp(time.time())
另请参阅 now(), fromtimestamp()。

此方法的功能等价于 now()，但是不带 tz 形参。

### datetime.now

classmethod datetime.now(tz=None)
返回表示当前地方时的 date 和 time 对象。

如果可选参数 tz 为 None 或未指定，这就类似于 today()

如果 tz 不为 None，它必须是 tzinfo 子类的一个实例，并且当前日期和时间将被转换到 tz 时区。

此函数可以替代 today() 和 utcnow()。

### datetime.utcnow

classmethod datetime.utcnow()
返回表示当前 UTC 时间的 date 和 time，其中 tzinfo 为 None。

### datetime.utcfromtimestamp

classmethod datetime.utcfromtimestamp(timestamp)
返回对应于 POSIX 时间戳的 UTC datetime，其中 tzinfo 值为 None。 （结果为简单型对象。）

要得到一个感知型 datetime 对象，应调用 fromtimestamp():

### datetime.fromtimestamp

datetime.fromtimestamp(timestamp, timezone.utc)
在 POSIX 兼容的平台上，它等价于以下表达式:

datetime(1970, 1, 1, tzinfo=timezone.utc) + timedelta(seconds=timestamp)
不同之处在于后一种形式总是支持完整年份范围：从 MINYEAR 到 MAXYEAR 的开区间。

> 警告 由于简单型 datetime 对象会被许多 datetime 方法当作本地时间来处理，最好是使用感知型日期时间对象来表示 UTC 时间。 因此，创建表示特定 UTC 时间戳的日期时间对象的推荐方式是通过调用 datetime.fromtimestamp(timestamp, tz=timezone.utc)。

### datetime.fromordinal

classmethod datetime.fromordinal(ordinal)
返回对应于预期格列高利历序号的 datetime，其中公元 1 年 1 月 1 日的序号为 1。 除非 1 <= ordinal <= datetime.max.toordinal() 否则会引发 ValueError。 结果的 hour, minute, second 和 microsecond 值均为 0，并且 tzinfo 值为 None。

### datetime.combine

classmethod datetime.combine(date, time, tzinfo=self.tzinfo)
返回一个新的 datetime 对象，对象的日期部分等于给定的 date 对象的值，而其时间部分等于给定的 time 对象的值。 如果提供了 tzinfo 参数，其值会被用来设置结果的 tzinfo 属性，否则将使用 time 参数的 tzinfo 属性。

对于任意 datetime 对象 d，d == datetime.combine(d.date(), d.time(), d.tzinfo)。 如果 date 是一个 datetime 对象，它的时间部分和 tzinfo 属性会被忽略。

### datetime.fromisoformat

classmethod datetime.fromisoformat(date_string)
返回一个对应于 date.isoformat() 和 datetime.isoformat() 所提供的某一种 date_string 的 datetime 对象。

特别地，此函数支持以下格式的字符串：

YYYY-MM-DD[_HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]]
其中 _ 可以匹配任意的单个字符。

警告 此函数 并不 支持解析任意 ISO 8601 字符串 —— 它的目的只是作为 datetime.isoformat() 的逆操作。 在第三方包 dateutil 中提供了一个更完善的 ISO 8601 解析器 dateutil.parser.isoparse。
示例:

```python
>>>
>>> from datetime import datetime
>>> datetime.fromisoformat('2011-11-04')
datetime.datetime(2011, 11, 4, 0, 0)
>>> datetime.fromisoformat('2011-11-04T00:05:23')
datetime.datetime(2011, 11, 4, 0, 5, 23)
>>> datetime.fromisoformat('2011-11-04 00:05:23.283')
datetime.datetime(2011, 11, 4, 0, 5, 23, 283000)
>>> datetime.fromisoformat('2011-11-04 00:05:23.283+00:00')
datetime.datetime(2011, 11, 4, 0, 5, 23, 283000, tzinfo=datetime.timezone.utc)
>>> datetime.fromisoformat('2011-11-04T00:05:23+04:00')
datetime.datetime(2011, 11, 4, 0, 5, 23,
    tzinfo=datetime.timezone(datetime.timedelta(seconds=14400)))
```

### datetime.fromisocalendar

classmethod datetime.fromisocalendar(year, week, day)
返回以 year, week 和 day 值指明的 ISO 历法日期所对应的 datetime。 该 datetime 对象的非日期部分将使用其标准默认值来填充。 这是函数 datetime.isocalendar() 的逆操作。

### datetime.strptime

classmethod datetime.strptime(date_string, format)
返回一个对应于 date_string，根据 format 进行解析得到的 datetime 对象。

### datetime.min

最早的可表示 datetime，datetime(MINYEAR, 1, 1, tzinfo=None)。

### datetime.max

最晚的可表示 datetime，datetime(MAXYEAR, 12, 31, 23, 59, 59, 999999, tzinfo=None)。

### datetime.resolution

两个不相等的 datetime 对象之间可能的最小间隔，timedelta(microseconds=1)。

### datetime.year

在 MINYEAR 和 MAXYEAR 之间，包含边界。

### datetime.month

1 至 12（含）

### datetime.day

返回 1 到指定年月的天数间的数字。

### datetime.hour

取值范围是 range(24)。

### datetime.minute

取值范围是 range(60)。

### datetime.second

取值范围是 range(60)。

### datetime.microsecond

取值范围是 range(1000000)。

### datetime.tzinfo

作为 tzinfo 参数被传给 datetime 构造器的对象，如果没有传入值则为 None。

### datetime.fold

取值范围是 [0, 1]。 用于在重复的时间段中消除边界时间歧义。 （当夏令时结束时回拨时钟或由于政治原因导致当明时区的 UTC 时差减少就会出现重复的时间段。） 取值 0 (1) 表示两个时刻早于（晚于）所代表的同一边界时间。

### datetime.date

datetime.date()
返回具有同样 year, month 和 day 值的 date 对象。

### datetime.time

datetime.time()
返回具有同样 hour, minute, second, microsecond 和 fold 值的 time 对象。 tzinfo 值为 None。 另请参见 timetz() 方法。

### datetime.timetz

datetime.timetz()
返回具有同样 hour, minute, second, microsecond, fold 和 tzinfo 属性性的 time 对象。 另请参见 time() 方法。

### datetime.utcoffset

datetime.utcoffset()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.utcoffset(self)，并且在后者不返回 None 或者一个幅度小于一天的 timedelta 对象时将引发异常。

### datetime.dst

datetime.dst()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.dst(self)，并且在后者不返回 None 或者一个幅度小于一天的 timedelta 对象时将引发异常。

### datetime.tzname

datetime.tzname()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.tzname(self)，如果后者不返回 None 或者一个字符串对象则将引发异常。

### datetime.timetuple

datetime.timetuple()
返回一个 time.struct_time，即 time.localtime() 所返回的类型。

d.timetuple() 等价于:

time.struct_time((d.year, d.month, d.day,
d.hour, d.minute, d.second,
d.weekday(), yday, dst))

### datetime.utctimetuple

datetime.utctimetuple()
如果 datetime 实例 d 为简单型，这类似于 d.timetuple()，不同之处在于 tm_isdst 会强制设为 0，无论 d.dst() 返回什么结果。 DST 对于 UTC 时间永远无效。

如果 d 为感知型， d 会通过减去 d.utcoffset() 来标准化为 UTC 时间，并返回该标准化时间所对应的 time.struct_time。 tm_isdst 会强制设为 0。 请注意如果 d.year 为 MINYEAR 或 MAXYEAR 并且 UTC 调整超出一年的边界则可能引发 OverflowError。

> 警告 由于简单型 datetime 对象会被许多 datetime 方法当作本地时间来处理，最好是使用感知型日期时间来表示 UTC 时间；因此，使用 utcfromtimetuple 可能会给出误导性的结果。 如果你有一个表示 UTC 的简单型 datetime，请使用 datetime.replace(tzinfo=timezone.utc) 将其改为感知型，这样你才能使用 datetime.timetuple()。

### datetime.toordinal

datetime.toordinal()
返回日期的预期格列高利历序号。 与 self.date().toordinal() 相同。

### datetime.timestamp

datetime.timestamp()
返回对应于 datetime 实例的 POSIX 时间戳。 此返回值是与 time.time() 返回值类似的 float 对象。

简单型 datetime 实例会假定为代表本地时间，并且此方法依赖于平台的 C mktime() 函数来执行转换。 由于在许多平台上 datetime 支持的范围比 mktime() 更广，对于极其遥远的过去或未来此方法可能引发 OverflowError。

对于感知型 datetime 实例，返回值的计算方式为:

(dt - datetime(1970, 1, 1, tzinfo=timezone.utc)).total_seconds()

> 注解 没有一个方法能直接从表示 UTC 时间的简单型 datetime 实例获取 POSIX 时间戳。 如果你的应用程序使用此惯例并且你的系统时区不是设为 UTC，你可以通过提供 tzinfo=timezone.utc 来获取 POSIX 时间戳:

timestamp = dt.replace(tzinfo=timezone.utc).timestamp()
或者通过直接计算时间戳:

```python
timestamp = (dt - datetime(1970, 1, 1)) / timedelta(seconds=1)
datetime.weekday()
```

返回一个整数代表星期几，星期一为 0，星期天为 6。 相当于 self.date().weekday()。 另请参阅 isoweekday()。

### datetime.isoweekday

datetime.isoweekday()
返回一个整数代表星期几，星期一为 1，星期天为 7。 相当于 self.date().isoweekday()。 另请参阅 weekday(), isocalendar()。

### datetime.isocalendar

datetime.isocalendar()
返回一个 3 元组 (ISO 年份, ISO 周序号, ISO 周日期)。 等同于 self.date().isocalendar()。

datetime.isoformat(sep='T', timespec='auto')
返回一个以 ISO 8601 格式表示的日期和时间字符串：

YYYY-MM-DDTHH:MM:SS.ffffff，如果 microsecond 不为 0

YYYY-MM-DDTHH:MM:SS，如果 microsecond 为 0

如果 utcoffset() 返回值不为 None，则添加一个字符串来给出 UTC 时差：

YYYY-MM-DDTHH:MM:SS.ffffff+HH:MM[:SS[.ffffff]]，如果 microsecond 不为 0

YYYY-MM-DDTHH:MM:SS+HH:MM[:SS[.ffffff]]，如果 microsecond 为 0

示例:

```python
>>>
>>> from datetime import datetime, timezone
>>> datetime(2019, 5, 18, 15, 17, 8, 132263).isoformat()
'2019-05-18T15:17:08.132263'
>>> datetime(2019, 5, 18, 15, 17, tzinfo=timezone.utc).isoformat()
'2019-05-18T15:17:00+00:00'
可选参数 sep (默认为 'T') 为单个分隔字符，会被放在结果的日期和时间两部分之间。 例如:

>>>
>>> from datetime import tzinfo, timedelta, datetime
>>> class TZ(tzinfo):
...     """A time zone with an arbitrary, constant -06:39 offset."""
...     def utcoffset(self, dt):
...         return timedelta(hours=-6, minutes=-39)
...
>>> datetime(2002, 12, 25, tzinfo=TZ()).isoformat(' ')
'2002-12-25 00:00:00-06:39'
>>> datetime(2009, 11, 27, microsecond=100, tzinfo=TZ()).isoformat()
'2009-11-27T00:00:00.000100-06:39'
```

可选参数 timespec 要包含的额外时间组件值 (默认为 'auto')。它可以是以下值之一：

'auto': 如果 microsecond 为 0 则与 'seconds' 相同，否则与 'microseconds' 相同。

'hours': 以两个数码的 HH 格式 包含 hour。

'minutes': 以 HH:MM 格式包含 hour 和 minute。

'seconds': 以 HH:MM:SS 格式包含 hour, minute 和 second。

'milliseconds': 包含完整时间，但将秒值的小数部分截断至微秒。 格式为 HH:MM:SS.sss

'microseconds': 以 HH:MM:SS.ffffff 格式包含完整时间。

> 注解 排除掉的时间部分将被截断，而不是被舍入。

```python
>>>
>>> from datetime import datetime
>>> datetime.now().isoformat(timespec='minutes')
'2002-12-25T00:00'
>>> dt = datetime(2015, 1, 1, 12, 30, 59, 0)
>>> dt.isoformat(timespec='microseconds')
'2015-01-01T12:30:59.000000'
```

### datetime.**str**

datetime.**str**()
对于 datetime 实例 d，str(d) 等价于 d.isoformat(' ')。

### datetime.strftime

datetime.strftime(format)
返回一个由显式格式字符串所指明的代表日期和时间的字符串，要获取格式指令的完整列表，请参阅 strftime() 和 strptime() 的行为。

### datetime.**format**

datetime.**format**(format)
与 datetime.strftime() 相同。 此方法使得为 datetime 对象指定以 格式化字符串字面值 表示的格式化字符串以及使用 str.format() 进行格式化成为可能。 要获取格式指令的完整列表，请参阅 strftime() 和 strptime() 的行为。

### 用法示例: datetime

使用 datetime 对象的例子：

```python
>>> from datetime import datetime, date, time, timezone

>>> # Using datetime.combine()
>>> d = date(2005, 7, 14)
>>> t = time(12, 30)
>>> datetime.combine(d, t)
datetime.datetime(2005, 7, 14, 12, 30)

>>> # Using datetime.now()
>>> datetime.now()
datetime.datetime(2007, 12, 6, 16, 29, 43, 79043)   # GMT +1
>>> datetime.now(timezone.utc)
datetime.datetime(2007, 12, 6, 15, 29, 43, 79060, tzinfo=datetime.timezone.utc)

>>> # Using datetime.strptime()
>>> dt = datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
>>> dt
datetime.datetime(2006, 11, 21, 16, 30)

>>> # Using datetime.timetuple() to get tuple of all attributes
>>> tt = dt.timetuple()
>>> for it in tt:
...     print(it)
...
2006    # year
11      # month
21      # day
16      # hour
30      # minute
0       # second
1       # weekday (0 = Monday)
325     # number of days since 1st January
-1      # dst - method tzinfo.dst() returned None

>>> # Date in ISO format
>>> ic = dt.isocalendar()
>>> for it in ic:
...     print(it)
...
2006    # ISO year
47      # ISO week
2       # ISO weekday

>>> # Formatting a datetime
>>> dt.strftime("%A, %d. %B %Y %I:%M%p")
'Tuesday, 21. November 2006 04:30PM'
>>> 'The {1} is {0:%d}, the {2} is {0:%B}, the {3} is {0:%I:%M%p}.'.format(dt, "day", "month", "time")
'The day is 21, the month is November, the time is 04:30PM.'
```

以下示例定义了一个 tzinfo 子类，它捕获 Kabul, Afghanistan 时区的信息，该时区使用 +4 UTC 直到 1945 年，之后则使用 +4:30 UTC:

```python
from datetime import timedelta, datetime, tzinfo, timezone

class KabulTz(tzinfo):
    # Kabul used +4 until 1945, when they moved to +4:30
    UTC_MOVE_DATE = datetime(1944, 12, 31, 20, tzinfo=timezone.utc)

    def utcoffset(self, dt):
        if dt.year < 1945:
            return timedelta(hours=4)
        elif (1945, 1, 1, 0, 0) <= dt.timetuple()[:5] < (1945, 1, 1, 0, 30):
            # An ambiguous ("imaginary") half-hour range representing
            # a 'fold' in time due to the shift from +4 to +4:30.
            # If dt falls in the imaginary range, use fold to decide how
            # to resolve. See PEP495.
            return timedelta(hours=4, minutes=(30 if dt.fold else 0))
        else:
            return timedelta(hours=4, minutes=30)

    def fromutc(self, dt):
        # Follow same validations as in datetime.tzinfo
        if not isinstance(dt, datetime):
            raise TypeError("fromutc() requires a datetime argument")
        if dt.tzinfo is not self:
            raise ValueError("dt.tzinfo is not self")

        # A custom implementation is required for fromutc as
        # the input to this function is a datetime with utc values
        # but with a tzinfo set to self.
        # See datetime.astimezone or fromtimestamp.
        if dt.replace(tzinfo=timezone.utc) >= self.UTC_MOVE_DATE:
            return dt + timedelta(hours=4, minutes=30)
        else:
            return dt + timedelta(hours=4)

    def dst(self, dt):
        # Kabul does not observe daylight saving time.
        return timedelta(0)

    def tzname(self, dt):
        if dt >= self.UTC_MOVE_DATE:
            return "+04:30"
        return "+04"
上述 KabulTz 的用法:

>>>
>>> tz1 = KabulTz()

>>> # Datetime before the change
>>> dt1 = datetime(1900, 11, 21, 16, 30, tzinfo=tz1)
>>> print(dt1.utcoffset())
4:00:00

>>> # Datetime after the change
>>> dt2 = datetime(2006, 6, 14, 13, 0, tzinfo=tz1)
>>> print(dt2.utcoffset())
4:30:00

>>> # Convert datetime to another time zone
>>> dt3 = dt2.astimezone(timezone.utc)
>>> dt3
datetime.datetime(2006, 6, 14, 8, 30, tzinfo=datetime.timezone.utc)
>>> dt2
datetime.datetime(2006, 6, 14, 13, 0, tzinfo=KabulTz())
>>> dt2 == dt3
True
```

## time 对象

一个 time 对象代表某日的（本地）时间，它独立于任何特定日期，并可通过 tzinfo 对象来调整。

class datetime.time(hour=0, minute=0, second=0, microsecond=0, tzinfo=None, \*, fold=0)
所有参数都是可选的。

### time.min

早最的可表示 time, time(0, 0, 0, 0)。

### time.max

最晚的可表示 time, time(23, 59, 59, 999999)。

### time.resolution

两个不相等的 time 对象之间可能的最小间隔，timedelta(microseconds=1)，但是请注意 time 对象并不支持算术运算。

### time.hour

取值范围是 range(24)。

### time.minute

取值范围是 range(60)。

### time.second

取值范围是 range(60)。

### time.microsecond

取值范围是 range(1000000)。

### time.tzinfo

作为 tzinfo 参数被传给 time 构造器的对象，如果没有传入值则为 None。

### time.fold

取值范围是 [0, 1]。 用于在重复的时间段中消除边界时间歧义。 （当夏令时结束时回拨时钟或由于政治原因导致当明时区的 UTC 时差减少就会出现重复的时间段。） 取值 0 (1) 表示两个时刻早于（晚于）所代表的同一边界时间。

time 对象支持 time 与 time 的比较，当 a 时间在 b 之前时，则认为 a 小于 b。

### time.fromisoformat

classmethod time.fromisoformat(time_string)
返回对应于 time.isoformat() 所提供的某种 time_string 格式的 time。 特别地，此函数支持以下格式的字符串：

HH[:MM[:SS[.fff[fff]]]][+HH:MM[:SS[.ffffff]]]

> 警告 此方法 并不 支持解析任意 ISO 8601 字符串。 它的目的只是作为 time.isoformat() 的逆操作。

```python
>>>
>>> from datetime import time
>>> time.fromisoformat('04:23:01')
datetime.time(4, 23, 1)
>>> time.fromisoformat('04:23:01.000384')
datetime.time(4, 23, 1, 384)
>>> time.fromisoformat('04:23:01+04:00')
datetime.time(4, 23, 1, tzinfo=datetime.timezone(datetime.timedelta(seconds=14400)))
```

### time.replace

time.replace(hour=self.hour, minute=self.minute, second=self.second, microsecond=self.microsecond, tzinfo=self.tzinfo, \*, fold=0)
返回一个具有同样属性值的 time，除非通过任何关键字参数指定了某些属性值。 请注意可以通过指定 tzinfo=None 从一个感知型 time 创建一个简单型 time，而不必转换时间数据。

### time.isoformat

time.isoformat(timespec='auto')
返回表示为下列 ISO 8601 格式之一的时间字符串：

HH:MM:SS.ffffff，如果 microsecond 不为 0

HH:MM:SS，如果 microsecond 为 0

HH:MM:SS.ffffff+HH:MM[:SS[.ffffff]]，如果 utcoffset() 不返回 None

HH:MM:SS+HH:MM[:SS[.ffffff]]，如果 microsecond 为 0 并且 utcoffset() 不返回 None

可选参数 timespec 要包含的额外时间组件值 (默认为 'auto')。它可以是以下值之一：

'auto': 如果 microsecond 为 0 则与 'seconds' 相同，否则与 'microseconds' 相同。

'hours': 以两个数码的 HH 格式 包含 hour。

'minutes': 以 HH:MM 格式包含 hour 和 minute。

'seconds': 以 HH:MM:SS 格式包含 hour, minute 和 second。

'milliseconds': 包含完整时间，但将秒值的小数部分截断至微秒。 格式为 HH:MM:SS.sss

'microseconds': 以 HH:MM:SS.ffffff 格式包含完整时间。

注解 排除掉的时间部分将被截断，而不是被舍入。

```python
>>>
>>> from datetime import time
>>> time(hour=12, minute=34, second=56, microsecond=123456).isoformat(timespec='minutes')
'12:34'
>>> dt = time(hour=12, minute=34, second=56, microsecond=0)
>>> dt.isoformat(timespec='microseconds')
'12:34:56.000000'
>>> dt.isoformat(timespec='auto')
'12:34:56'
```

### time.**str**

time.**str**()
对于时间对象 t, str(t) 等价于 t.isoformat()。

### time.strftime

time.strftime(format)
返回一个由显式格式字符串所指明的代表时间的字符串。 要获取格式指令的完整列表，请参阅 strftime() 和 strptime() 的行为。

### time.**format**

time.**format**(format)
与 time.strftime() 相同。 此方法使得为 time 对象指定以 格式化字符串字面值 表示的格式化字符串以及使用 str.format() 进行格式化成为可能。 要获取格式指令的完整列表，请参阅 strftime() 和 strptime() 的行为。

### time.utcoffset

time.utcoffset()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.utcoffset(None)，并且在后者不返回 None 或一个幅度小于一天的 a timedelta 对象时将引发异常。

### time.dst

time.dst()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.dst(None)，并且在后者不返回 None 或者一个幅度小于一天的 timedelta 对象时将引发异常。

在 3.7 版更改: DST 差值不再限制为一个整数分钟值。

### time.tzname

time.tzname()
如果 tzinfo 为 None，则返回 None，否则返回 self.tzinfo.tzname(None)，如果后者不返回 None 或者一个字符串对象则将引发异常。

### 用法示例: time

使用 time 对象的例子:

```python
>>>
>>> from datetime import time, tzinfo, timedelta
>>> class TZ1(tzinfo):
...     def utcoffset(self, dt):
...         return timedelta(hours=1)
...     def dst(self, dt):
...         return timedelta(0)
...     def tzname(self,dt):
...         return "+01:00"
...     def  __repr__(self):
...         return f"{self.__class__.__name__}()"
...
>>> t = time(12, 10, 30, tzinfo=TZ1())
>>> t
datetime.time(12, 10, 30, tzinfo=TZ1())
>>> t.isoformat()
'12:10:30+01:00'
>>> t.dst()
datetime.timedelta(0)
>>> t.tzname()
'+01:00'
>>> t.strftime("%H:%M:%S %Z")
'12:10:30 +01:00'
>>> 'The {} is {:%H:%M}.'.format("time", t)
'The time is 12:10.'
```

## strftime() 和 strptime() 的行为

date, datetime 和 time 对象都支持 strftime(format) 方法，可用来创建由一个显式格式字符串所控制的表示时间的字符串。

相反地，datetime.strptime() 类会根据表示日期和时间的字符串和相应的格式字符串来创建一个 datetime 对象。

下表提供了 strftime() 与 strptime() 的高层级比较：

|          | strftime                         | strptime                                   |
| -------- | :------------------------------- | :----------------------------------------- |
| 用法     | 根据给定的格式将对象转换为字符串 | 将字符串解析为给定相应格式的 datetime 对象 |
| 方法类型 | 实例方法                         | 类方法                                     |
| 方法     | date; datetime; time             | datetime                                   |
| 签名     | strftime(format)                 | strptime(date_string, format)              |

## strftime() 和 strptime() Format Codes

以下列表显示了 1989 版 C 标准所要求的全部格式代码，它们在带有标准 C 实现的所有平台上均可用。

<table class="docutils align-default">
<colgroup>
<col style="width: 15%">
<col style="width: 43%">
<col style="width: 32%">
<col style="width: 9%">
</colgroup>
<thead>
<tr class="row-odd"><th class="head"><p>指令</p></th>
<th class="head"><p>含义</p></th>
<th class="head"><p>示例</p></th>
<th class="head"><p>注释</p></th>
</tr>
</thead>
<tbody>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%a</span></code></p></td>
<td><p>当地工作日的缩写。</p></td>
<td><div class="line-block">
<div class="line">Sun, Mon, ..., Sat
(en_US);</div>
<div class="line">So, Mo, ..., Sa
(de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%A</span></code></p></td>
<td><p>本地化的星期中每日的完整名称。</p></td>
<td><div class="line-block">
<div class="line">Sunday, Monday, ...,
Saturday (en_US);</div>
<div class="line">Sonntag, Montag, ...,
Samstag (de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%w</span></code></p></td>
<td><p>以十进制数显示的工作日，其中0表示星期日，6表示星期六。</p></td>
<td><p>0, 1, ..., 6</p></td>
<td></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%d</span></code></p></td>
<td><p>补零后，以十进制数显示的月份中的一天。</p></td>
<td><p>01, 02, ..., 31</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%b</span></code></p></td>
<td><p>当地月份的缩写。</p></td>
<td><div class="line-block">
<div class="line">Jan, Feb, ..., Dec
(en_US);</div>
<div class="line">Jan, Feb, ..., Dez
(de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%B</span></code></p></td>
<td><p>本地化的月份全名。</p></td>
<td><div class="line-block">
<div class="line">January, February,
..., December (en_US);</div>
<div class="line">Januar, Februar, ...,
Dezember (de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%m</span></code></p></td>
<td><p>补零后，以十进制数显示的月份。</p></td>
<td><p>01, 02, ..., 12</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%y</span></code></p></td>
<td><p>补零后，以十进制数表示的，不带世纪的年份。</p></td>
<td><p>00, 01, ..., 99</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%Y</span></code></p></td>
<td><p>十进制数表示的带世纪的年份。</p></td>
<td><p>0001, 0002, ..., 2013,
2014, ..., 9998, 9999</p></td>
<td><p>(2)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%H</span></code></p></td>
<td><p>以补零后的十进制数表示的小时（24 小时制）。</p></td>
<td><p>00, 01, ..., 23</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%I</span></code></p></td>
<td><p>以补零后的十进制数表示的小时（12 小时制）。</p></td>
<td><p>01, 02, ..., 12</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%p</span></code></p></td>
<td><p>本地化的 AM 或 PM 。</p></td>
<td><div class="line-block">
<div class="line">AM, PM (en_US);</div>
<div class="line">am, pm (de_DE)</div>
</div>
</td>
<td><p>(1),
(3)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%M</span></code></p></td>
<td><p>补零后，以十进制数显示的分钟。</p></td>
<td><p>00, 01, ..., 59</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%S</span></code></p></td>
<td><p>补零后，以十进制数显示的秒。</p></td>
<td><p>00, 01, ..., 59</p></td>
<td><p>(4),
(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%f</span></code></p></td>
<td><p>以十进制数表示的微秒，在左侧补零。</p></td>
<td><p>000000, 000001, ...,
999999</p></td>
<td><p>(5)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%z</span></code></p></td>
<td><p>UTC 偏移量，格式为 <code class="docutils literal notranslate"><span class="pre">±HHMM[SS[.ffffff]]</span></code> （如果是简单型对象则为空字符串）。</p></td>
<td><p>(空), +0000, -0400, +1030, +063415, -030712.345216</p></td>
<td><p>(6)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%Z</span></code></p></td>
<td><p>时区名称（如果对象为简单型则为空字符串）。</p></td>
<td><p>(空), UTC, EST, CST</p></td>
<td></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%j</span></code></p></td>
<td><p>以补零后的十进制数表示的一年中的日序号。</p></td>
<td><p>001, 002, ..., 366</p></td>
<td><p>(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%U</span></code></p></td>
<td><p>以补零后的十进制数表示的一年中的周序号（星期日作为每周的第一天）。 在新的一年中第一个星期日之前的所有日子都被视为是在第 0 周。</p></td>
<td><p>00, 01, ..., 53</p></td>
<td><p>(7),
(9)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%W</span></code></p></td>
<td><p>以十进制数表示的一年中的周序号（星期一作为每周的第一天）。 在新的一年中第一个第期一之前的所有日子都被视为是在第 0 周。</p></td>
<td><p>00, 01, ..., 53</p></td>
<td><p>(7),
(9)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%c</span></code></p></td>
<td><p>本地化的适当日期和时间表示。</p></td>
<td><div class="line-block">
<div class="line">Tue Aug 16 21:30:00
1988 (en_US);</div>
<div class="line">Di 16 Aug 21:30:00
1988 (de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%x</span></code></p></td>
<td><p>本地化的适当日期表示。</p></td>
<td><div class="line-block">
<div class="line">08/16/88 (None);</div>
<div class="line">08/16/1988 (en_US);</div>
<div class="line">16.08.1988 (de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-even"><td><p><code class="docutils literal notranslate"><span class="pre">%X</span></code></p></td>
<td><p>本地化的适当时间表示。</p></td>
<td><div class="line-block">
<div class="line">21:30:00 (en_US);</div>
<div class="line">21:30:00 (de_DE)</div>
</div>
</td>
<td><p>(1)</p></td>
</tr>
<tr class="row-odd"><td><p><code class="docutils literal notranslate"><span class="pre">%%</span></code></p></td>
<td><p>字面的 <code class="docutils literal notranslate"><span class="pre">'%'</span></code> 字符。</p></td>
<td><p>%</p></td>
<td></td>
</tr>
</tbody>
</table>

注释:

1. 由于此格式依赖于当前区域设置，因此对具体输出值应当保持谨慎预期。 字段顺序会发生改变（例如 "month/day/year" 与 "day/month/year"），并且输出可能包含使用区域设置所指定的默认编码格式的 Unicode 字符（例如如果当前区域为 ja_JP，则默认编码格式可能为 eucJP, SJIS 或 utf-8 中的一个；使用 locale.getlocale() 可确定当前区域设置的编码格式）。

2. strptime() 方法能够解析整个 [1, 9999] 范围内的年份，但 < 1000 的年份必须加零填充为 4 位数字宽度。

3. 当与 strptime() 方法一起使用时，如果使用 %I 指令来解析小时，%p 指令只影响输出小时字段。

4. 与 time 模块不同的是， datetime 模块不支持闰秒。

5. 当与 strptime() 方法一起使用时，%f 指令可接受一至六个数码及左边的零填充。 %f 是对 C 标准中格式字符集的扩展（但单独在 datetime 对象中实现，因此它总是可用）。

6. 对于简单型对象，%z and %Z 格式代码会被替换为空字符串。

7. 当与 strptime() 方法一起使用时，%U 和 %W 仅用于指定星期几和日历年份 (%Y) 的计算。

8. 类似于 %U 和 %W，%V 仅用于在 strptime() 格式字符串中指定星期几和 ISO 年份 (%G) 的计算。 还要注意 %G 和 %Y 是不可交换的。

9. 当于 strptime() 方法一起使用时，前导的零在格式 %d, %m, %H, %I, %M, %S, %J, %U, %W 和 %V 中是可选的。 格式 %y 不要求有前导的零。
