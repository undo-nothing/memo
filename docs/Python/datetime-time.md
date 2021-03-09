# time, datetime

## time

### time 类的数据构成

- time 类由 hour 小时、minute 分钟、second 秒、microsecond 毫秒和 tzinfo 五部分组成

`time([hour[, minute[, second[, microsecond[, tzinfo]]]]])`

- 相应的，time 类中就有上述五个变量来存储应该的值

```shell
>>> a = datetime.time(12,20,59,899)
>>> a
datetime.time(12, 20, 59, 899)
>>> a.hour
12
>>> a.minute
20
>>> a.second
59
>>> a.microsecond
899
>>> a.tzinfo
```

- 与 date 类一样，time 类也包含**getattribute**(...)方法可以读取相关属性：

```shell
>>> a.__getattribute__('hour')
12
>>> a.__getattribute__('minute')
20
>>> a.__getattribute__('second')
59
```

### time 类中的方法和属性

- 比较时间大小

|  方法名   | 方法说明       | 用法        |
| :-------: | -------------- | ----------- |
| **eq**(…) | 等于(x==y)     | x.**eq**(y) |
| **ge**(…) | 大于等于(x>=y) | x.**ge**(y) |
| **gt**(…) | 大于(x>y)      | x.**gt**(y) |
| **le**(…) | 小于等于(x<=y) | x.**le**(y) |
| **lt**(…) | 小于(x<y)      | x.**lt**(y) |
| **ne**(…) | 不等于(x!=y)   | x.**ne**(y) |

相关方法包括：**eq**(...), **ge**(...), **gt**(...), **le**(...), **lt**(...)， **ne**(...)
这里的方法与 date 类中定义的方法大同小异，使用方法与一样，示例如下：

```shell
>>> a = datetime.time(12,20,59,899)
>>> b = datetime.time(11,20,59,889)
>>> a.__eq__(b)
False
>>> a.__ne__(b)
True
>>> a.__ge__(b)
True
>>> a.__gt__(b)
True
>>> a.__le__(b)
False
>>> a.__lt__(b)
False
```

- **nonzero**(...)

判断时间对象是否非零，返回值为 True/False:

```shell
>>> a = datetime.time(12,20,59,899)
>>> a.__nonzero__()
True
```

- 其他属性

  **`max`：最大的时间表示数值：**

```shell
>>> datetime.time.max
datetime.time(23, 59, 59, 999999)
```

**`min`：最小的时间表示数值：**

```shell
>>> datetime.time.min
datetime.time(0, 0)
```

**`resolution`：时间间隔单位为分钟：**

```shell
>>> datetime.time.resolution
datetime.timedelta(0, 0, 1)
```

### 时间的字符串输出

- 如果你想将时间对象转化为字符串对象的话，可以用到**format**(...)方法以指定格式进行时间输出：

```shell
>>> a = datetime.time(12,20,59,899)
>>> a.__format__('%H:%M:%S')
'12:20:59'
```

与此方法等价的方法为 strftime(...)

```shell
>>> a = datetime.time(12,20,59,899)
>>> a.strftime('%H:%M:%S')
'12:20:59'
```

- ISO 标准输出

如果要使输出的时间字符符合 ISO 标准，请使用 isoformat(...):

```shell
>>> a = datetime.time(12,20,59,899)
>>> a.isoformat()
'12:20:59.000899'
```

- 如果只是相简单的获得时间的字符串，则使用**str**(...)

```shell
>>> a = datetime.time(12,20,59,899)
>>> a.__str__()
'12:20:59.000899'
```

## datetime

### datetime 类的数据构成

datetime 类其实是可以看做是 date 类和 time 类的合体，其大部分的方法和属性都继承于这二个类。

`datetime(year, month, day[, hour[, minute[, second[, microsecond[,tzinfo]]]]])`

### 专属于 datetime 的方法和属性

- date(…)：返回 datetime 对象的日期部分：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2017, 3, 22, 16, 9, 33, 494248)
>>> a.date()
datetime.date(2017, 3, 22)
```

- time(…)：返回 datetime 对象的时间部分：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2017, 3, 22, 16, 9, 33, 494248)
>>> a.time()
datetime.time(16, 9, 33, 494248)
```

- timetuple(…)：返回日期对应的 time.struct_time 对象：

````shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2020, 12, 07 14, 31, 49, 992000)
>>> a.struct_time()
time.struct_time(tm_year=2020, tm_mon=12, tm_mday=7, tm_hour=14, tm_min=31, tm_sec=49, tm_wday=0, tm_yday=342, tm_isdst=-1)```
````

- toordinal(…)：返回日期是是自 0001-01-01 开始的第多少天：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2020, 12, 07 14, 31, 49, 992000)
>>> a.toordinal()
737766
```

- weekday(…)：返回日期是星期几，[0, 6]，0 表示星期一：
- isoweekday(…)：返回日期是星期几，[1, 7], 1 表示星期一：
- isocalendar(…)：返回一个元组，格式为：(year, weekday, isoweekday)：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2020, 12, 07 14, 31, 49, 992000)
>>> a.weekday()
0
>>> a.isoweekday()
1
>>> a.isocalendar()
(2020, 50, 1)
```

- utctimetuple(…)：返回 UTC 时间元组：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2017, 3, 22, 16, 9, 33, 494248)
>>> a.utctimetuple()
time.struct_time(tm_year=2017, tm_mon=3, tm_mday=22, tm_hour=16, tm_min=9, tm_sec=33, tm_wday=2, tm_yday=81, tm_isdst=0)
```

- combine(…)：将一个 date 对象和一个 time 对象合并生成一个 datetime 对象：

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2017, 3, 22, 16, 9, 33, 494248)
>>>datetime.datetime.combine(a.date(),a.time())
datetime.datetime(2017, 3, 22, 16, 9, 33, 494248)
```

- now([tz])：返回一个表示当前本地时间的 datetime 对象，如果提供了参数 tz，则获取 tz 参数所指时区的本地时间；

```shell
>>> a = datetime.datetime.now()
>>> a
datetime.datetime(2017, 3, 22, 16, 9, 33,
```

- utcnow(…):返回当前日期时间的 UTC datetime 对象：

```shell
>>> a = datetime.datetime.utcnow()
>>> a
datetime.datetime(2017, 3, 22, 8, 26, 54, 935242)
```

- strptime(…)：根据 string, format 2 个参数，返回一个对应的 datetime 对象：

```shell
>>> datetime.datetime.strptime('2017-3-22 15:25','%Y-%m-%d %H:%M')
datetime.datetime(2017, 3, 22, 15, 25)
```

- utcfromtimestamp(…):UTC 时间戳的 datetime 对象，时间戳值为 time.time()：

```shell
>>> datetime.datetime.utcfromtimestamp(time.time())
datetime.datetime(2017, 3, 22, 8, 29, 7, 654272)
```

## python 中时间日期格式化符号

| 符号 | 说明                                      |
| :--: | ----------------------------------------- |
|  %y  | 两位数的年份表示（00-99）                 |
|  %Y  | 四位数的年份表示（000-9999）              |
|  %m  | 月份（01-12）                             |
|  %d  | 月内中的一天（0-31）                      |
|  %H  | 24 小时制小时数（0-23）                   |
|  %I  | 12 小时制小时数（01-12）                  |
|  %M  | 分钟数（00=59）                           |
|  %S  | 秒（00-59）                               |
|  %a  | 本地简化星期名称                          |
|  %A  | 本地完整星期名称                          |
|  %b  | 本地简化的月份名称                        |
|  %B  | 本地完整的月份名称                        |
|  %c  | 本地相应的日期表示和时间表示              |
|  %j  | 年内的一天（001-366）                     |
|  %p  | 本地 A.M.或 P.M.的等价符                  |
|  %U  | 一年中的星期数（00-53）星期天为星期的开始 |
|  %w  | 星期（0-6），星期天为星期的开始           |
|  %W  | 一年中的星期数（00-53）星期一为星期的开始 |
|  %x  | 本地相应的日期表示                        |
|  %X  | 本地相应的时间表示                        |
|  %Z  | 当前时区的名称                            |
|  %%  | %号本身                                   |
