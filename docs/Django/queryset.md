---
sidebarDepth: 3
---

# QuerySet 方法

## 返回 New QuerySet 的方法

### order_by

某个字段进行排序，默认为从小到大排序，如果想要从大到小可以在字段前加“-”,需要注意 order_by 可以传递多个参数，会按照先后级别进行排序，而且 order_by 还可以用 annotate 新增的字段来排序，注意：order_by 重复调用会只会保存最后一个。

### filter

返回一个`QuerySet`包含与给定查找参数匹配的新对象。

### exclude

返回一个新的`QuerySet`包含对象，这些对象与给定的查找参数*不*匹配。

### annotate

给 QuerySet 中的每一个对象都添加一个查询表达式。

### reverse

此方法可以反转查询集元素的返回顺序。

### distinct

返回在其 SQL 查询`QuerySet`中使用的新值。这样可以从查询结果中消除重复的行。

### values

提取需要的字段，默认会把全部都提取出来。返回的结果是 QuerySet，但是其中包裹的不是模型，而是字典。

### values_list

提取需要字段，返回 QuerySet，其中包裹的元组，如果数据只有一条，则可以使用`flat=True`进行扁平化处理，直接返回结果

### dates

`dates`（field，kind，order ='ASC'）

返回`QuerySet`，其结果是 datetime.date 代表的对象列表，这些对象代表的内容内特定种类的所有可用日期`QuerySet`。

`field`应该是`DateField`您的模型的名称。 `kind`应该是`"year"`，`"month"`或`"day"`。`datetime.date`结果列表中的每个 对象都将“截断”到给定 `type`。

- `"year"` 返回该字段的所有不同年份值的列表。
- `"month"` 返回该字段的所有不同年份/月份值的列表。
- `"day"` 返回该字段的所有不同年/月/日值的列表。

`order`（默认为`'ASC'`）应为`'ASC'`或 `'DESC'`。这指定了如何订购结果。

### datetimes

`datetimes`（_field_name_，_kind_，_order ='ASC'_，_tzinfo = None_）

返回`QuerySet`，其结果是 datetime.datetime 代表的对象列表，这些对象代表的内容内特定种类的所有可用日期`QuerySet`。

`field_name`应该是`DateTimeField`您的模型的名称。

`kind`应该是`"year"`，`"month"`，`"day"`，`"hour"`， `"minute"`或`"second"`。`datetime.datetime`结果列表中的每个对象都将“截断”到给定`type`。

`order`（默认为`'ASC'`）应为`'ASC'`或 `'DESC'`。这指定了如何订购结果。

`tzinfo`定义截断之前将日期时间转换为的时区。

### none

调用 none（）将创建一个查询集，该查询集从不返回任何对象，并且在访问结果时将不执行任何查询。

### all

返回当前（或子类）的副本。

### union

`union`（\*_ other_qs_，_all = False_）

使用 SQL 的`UNION`运算符合并两个或多个 QuerySets 的结果 。`UNION`默认情况下，仅选择不同的值。要允许重复值，请使用`all=True`参数。

### intersection

`intersection`（\*_ other_qs_）

使用 SQL 的`INTERSECT`运算符返回两个或多个`QuerySets`的共享元素 。

### difference

`difference`（\*_ other_qs_）

使用 SQL 的 EXCEPT 操作符只保留存在于第一个`QuerySet`中而不存在于其他`QuerySets`中的元素。

### select_related

`select_related`（\*_ fields_）

返回一个将“遵循”外键关系的查询集，并在执行查询时选择其他相关对象数据。在数据库有外键(ForeignKey)或一对一(OnetoOneField)的时候,使用 select_related 可以很好地减少数据库请求的次数, 从而提高性能。

### prefetch_related

`prefetch_related`（\*_ lookups_）

返回一个`QuerySet`，它将自动在单个批处理中为每个指定的查找检索相关对象。对于多对多字段（ManyToManyField）和一对多(ForeignKey)字段，可以使用 prefetch_related()来进行优化。

### extra

`extra`（_select = None_，_where = None_，_params = None_，_table = None_，_order_by = None_，_select_params = None_）

有些情况下，Django 的查询语法难以简单的表达复杂的 `WHERE` 子句，对于这种情况, Django 提供了 `extra()` `QuerySet`修改机制 — 它能在 `QuerySet`生成的 SQL 从句中注入新子句。

### defer

`defer`（\*_ fields_）

在某些复杂的数据建模情况下，您的模型可能包含很多字段，其中一些字段可能包含很多数据（例如，文本字段），或者需要昂贵的处理才能将它们转换为 Python 对象。如果在某些情况下使用查询集的结果，而在最初获取数据时却不知道是否需要这些特定字段，则可以告诉 Django 不要从数据库中检索它们。

### only

`only`（\*_ fields_）

`only()`方法与`defer()`方法相反。使用检索模型时不需要延迟的字段调用它。如果模型中几乎所有字段都需要延迟，那么使用 only()指定字段的补集可以得到更简单的代码。

### select_for_update

`select_for_update`（_nowait = False_，_skip_locked = False_）

返回一个查询集，该查询集将锁定行直到事务结束，从而在支持的数据库上生成一条 SQL 语句。

## 不返回 QuerySets 的方法

### get

`get`（_\*\* kwargs_）

返回与给定查找参数匹配的对象。

### create

`create`（_\*\* kwargs_）

一种方便的方法，可一步创建对象并将其全部保存。

### get_or_create

`get_or_create`(**defaults=None**,**\*\*kwargs**)

一种方便的方法，用于查找具有给定 kwargs 的对象(如果模型对所有字段都有默认值，则可能为空)，并在必要时创建一个对象。

### update_or_create

`update_or_create`(**defaults=None**,**\*\*kwargs**)

一种使用给定对象更新对象的便捷方法，`kwargs`如有必要，可以创建一个新对象。

### bulk_create

`bulk_create`（_objs_，_batch_size = None_）

此方法以一种有效的方式将提供的对象列表插入数据库（通常只有 1 个查询，无论有多少个对象）。

### count

返回一个整数，该整数表示数据库中与匹配的对象的数量。该`count()`方法永远不会引发异常。

### in_bulk

`in_bulk`（_id_list = None_）

获取主键值的列表，并返回将每个主键值映射到具有给定 ID 的对象实例的字典。如果未提供列表，则返回查询集中的所有对象。

### iterator

计算查询集(通过执行查询)并在结果上返回一个迭代器。查询集通常在内部缓存其结果，以便重复的计算不会导致额外的查询。相反，iterator()将直接读取结果，而不在 QuerySet 级别进行任何缓存(在内部，默认的迭代器调用 iterator()并缓存返回值)。对于返回大量只需要访问一次的对象的 QuerySet，这可以带来更好的性能并显著减少内存。

### latest

`latest`（_field_name = None_）

使用提供的 field_name 作为日期字段，按日期返回表中最新的对象。

### earliest

`earliest`（_field_name = None_）

earliest()除工作方式改变外，其他操作方式与 latest()相同。

### first

`first`**()**

返回查询集匹配的第一个对象，如果没有匹配对象，则返回 None。如果查询集没有定义排序，那么查询集将根据主键自动排序。

### last

`last`**()**

工作方式类似 first()，但返回查询集中的最后一个对象。

### aggregate

`aggregate`**(\*args, \*\*kwargs)**

返回通过查询集计算的聚合值(平均值、总和等)的字典。aggregate()的每个参数都指定一个将包含在返回的字典中的值。

### exists

`exists`**()**

如果查询集包含任何结果，则返回 True;如果没有，则返回 False。这尝试以最简单和最快的方式执行查询，但是它执行的查询与普通的 QuerySet 查询几乎相同。

### update

`update`**(\*\*\***kwargs**\*)**

对指定的字段执行 SQL update 查询，并返回匹配的行数(如果某些行已经有了新值，则可能不等于更新的行数)。

### delete

`delete`（）

对查询集中的所有行执行 SQL delete 查询，并返回删除的对象数量和每个对象类型的删除数量的字典。

### `as_manager`

类方法，该方法返回带有查询集方法副本的 Manager 实例。

## Field 查找

### `exact`

精确匹配。如果提供的用于比较的值是 None，它将被解释为 SQL NULL。

### `iexact`

不区分大小写的精确匹配。如果提供的用于比较的值是 None，它将被解释为 SQL NULL。

### `contains`

区分大小写的控制测试。

### `icontains`

不区分大小写的封闭测试。

### `in`

在一个给定的列表中。

### `gt`

大于。

### `gte`

大于或等于。

### `lt`

小于。

### `lte`

小于或等于。

### `startswith`

区分大小写的开始。

### `istartswith`

不区分大小写的开始。

### `endswith`

区分大小写的结尾。

### `iendswith`

不区分大小写的结尾。

### `range`

判断某个 field 的值是否在给定的区间中。

### `date`

对于 datetime 字段，将值强制转换为 date。允许链接其他字段查找。获取日期值。

### `year`

对于日期和日期时间字段，精确的年份匹配。允许链接其他字段查找。需要一个整数年。

### `month`

对于日期和日期时间字段，使用精确的月份匹配。允许链接其他字段查找。获取整数 1(一月)到 12(十二月)。

### `day`

对于日期和日期时间字段，精确的日期匹配。允许链接其他字段查找。需要一个整数天。

### `week`

对于 date 和 datetime 字段，根据 ISO-8601 返回周号(1-52 或 53)，即，星期从星期一开始，而第一星期在星期四或之前开始。

### `week_day`

对于日期和日期时间字段，“星期几”匹配。允许链接其他字段查找。

获取一个整数值，表示一周的日期从 1(星期日)到 7(星期六)。

### `time`

对于日期时间字段，将值强制转换为时间。允许链接其他字段查找。需要一个`datetime.time`值。

### `hour`

对于日期时间和时间字段，精确小时匹配。允许链接其他字段查找。取 0 到 23 之间的整数。

### `minute`

对于日期时间和时间字段，精确匹配分钟。允许链接其他字段查找。取 0 到 59 之间的整数。

### `second`

对于日期时间和时间字段，精确匹配秒。允许链接其他字段查找。取 0 到 59 之间的整数。

### `isnull`

取 True 或 False，分别对应于 IS NULL 和 IS NOT NULL 的 SQL 查询。

### `search`

布尔全文搜索，利用全文索引。这类似于包含，但由于采用全文索引，速度明显更快。

### `regex`

区分大小写的正则表达式匹配。

正则表达式语法就是所使用的数据库后端语法。对于 SQLite，它没有内置的正则表达式支持，该特性是由(Python)用户定义的 REGEXP 函数提供的，因此正则表达式语法与 Python 的 re 模块相同。

### `iregex`

不区分大小写的正则表达式匹配。

## 聚合函数

所有聚合具有以下共同参数：

#### expression：

引用模型上字段的字符串或查询表达式。

#### output_field：

表示返回值的模型字段的可选参数。

#### \*\*extra：

可为聚合生成的 SQL 提供额外上下文的关键字参数。

### `Avg`

`Avg`（_expression_，_output_field = FloatField（）_，_\*\* extra_）

返回给定表达式的平均值，该表达式必须为数值，除非指定了不同的 output_field。

### `Count`

`Count`（_expression_，_distinct = False_，_\*\* extra_）

返回通过提供的表达式关联的对象的数量。

### `Max`

`Max`（_expression_，_output_field = None_，_\*\* extra_）

返回给定表达式的最大值。

### `Min`

`Min`（_expression_，_output_field = None_，_\*\* extra_）

返回给定表达式的最小值。

### `StdDev`

`StdDev`（_expression_，_sample = False_，_\*\* extra_）

返回所提供表达式中数据的标准差。

### `Sum`

`Sum`（_expression_，_output_field = None_，_\*\* extra_）

计算给定表达式所有值的总和。

### `Variance`

`Variance`（_expression_，_sample = False_，_\*\* extra_）

返回提供的表达式中数据的方差。

## 参考链接

[QuerySetAPI 参考](https://docs.djangoproject.com/en/1.11/ref/models/querysets/)
