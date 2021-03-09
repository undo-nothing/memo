# Py2 to Py3

## asserts

将已弃用的[`unittest`](https://docs.python.org/zh-cn/3.8/library/unittest.html#module-unittest)方法替换为正确的。

| 从                          | 到                         |
| --------------------------- | -------------------------- |
| failUnlessEqual(a, b)       | assertEqual(a, b)          |
| assertEquals(a, b)          | assertEqual(a, b)          |
| failIfEqual(a, b)           | assertNotEqual(a, b)       |
| assertNotEquals(a, b)       | assertNotEqual(a, b)       |
| failUnless(a)               | assertTrue(a)              |
| assert\_(a)                 | assertTrue(a)              |
| failIf(a)                   | assertFalse(a)             |
| failUnlessRaises(exc, cal)  | assertRaises(exc, cal)     |
| failUnlessAlmostEqual(a, b) | assertAlmostEqual(a, b)    |
| assertAlmostEquals(a, b)    | assertAlmostEqual(a, b)    |
| failIfAlmostEqual(a, b)     | assertNotAlmostEqual(a, b) |
| assertNotAlmostEquals(a, b) | assertNotAlmostEqual(a, b) |

## dict

- `dict.iteritems()` --> [`dict.items()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.items)
- `dict.iterkeys()` --> [`dict.keys()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.keys)
- `dict.itervalues()` --> [`dict.values()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.values)
- `dict.viewitems()` --> [`dict.items()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.items)
- `dict.viewkeys()` --> [`dict.keys()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.keys)
- `dict.viewvalues()` --> [`dict.values()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.values)。

想获取原来 list 效果 [`dict.items()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.items)，[`dict.keys()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.keys) 和 [`dict.values()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#dict.values) ，需要调用用 [`list`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#list) 包装一层。

## except

将 `except X, T` 转换为 `except X as T`。

## **filter**

filter()返回可迭代对象而不是 list, 需要将 [`filter()`](https://docs.python.org/zh-cn/3.8/library/functions.html#filter) 函数用 [`list`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#list) 包装一层。

## **future**

移除 `from __future__ import new_feature` 语句。

## **has_key**

将 `dict.has_key(key)` 转换为 `key in dict`。

## **import**

检测 sibling imports，并将其转换成相对 import。

## **imports**

处理标准库模块的重命名。

## **imports2**

处理标准库中其他模块的重命名。这个修复器由于一些技术上的限制，因此和 [`imports`](https://docs.python.org/zh-cn/3.8/library/2to3.html#2to3fixer-imports) 拆分开了。

## **input**

将 `input(prompt)` 转换为 `eval(input(prompt))`。

## **long**

将 `long` 重命名为 [`int`](https://docs.python.org/zh-cn/3.8/library/functions.html#int)。

## **map**

map()返回可迭代对象而不是 list， 用 [`list`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#list) 包装 [`map()`](https://docs.python.org/zh-cn/3.8/library/functions.html#map)。

## **metaclass**

将老的元类语法（类体中的 `__metaclass__ = Meta`）替换为新的（`class X(metaclass=Meta)`）。

## ne

转换老的不等语法，将 `<>` 转为 `!=`。

## **next**

将迭代器的 `next()` 方法调用转为 [`next()`](https://docs.python.org/zh-cn/3.8/library/functions.html#next) 函数。也会将 [`next()`](https://docs.python.org/zh-cn/3.8/library/functions.html#next) 方法重命名为 [`__next__()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#iterator.__next__)。

## **nonzero**

将 `__nonzero__()` 转换为 [`__bool__()`](https://docs.python.org/zh-cn/3.8/reference/datamodel.html#object.__bool__)。

## **operator**

将 [`operator`](https://docs.python.org/zh-cn/3.8/library/operator.html#module-operator) 模块中的许多方法调用转为其他的等效函数调用。如果有需要，会添加适当的 `import` 语句，比如 `import collections.abc`。有以下转换映射：

| 从                             | 到                                        |
| ------------------------------ | ----------------------------------------- |
| operator.isCallable(obj)       | callable(obj)                             |
| operator.sequenceIncludes(obj) | operator.contains(obj)                    |
| operator.isSequenceType(obj)   | isinstance(obj, collections.abc.Sequence) |
| `operator.isMappingType(obj)`  | isinstance(obj, collections.abc.Mapping)  |
| operator.isNumberType(obj)     | isinstance(obj, numbers.Number)           |
| operator.repeat(obj, n)        | operator.mul(obj, n)                      |
| operator.irepeat(obj, n)       | operator.imul(obj, n)                     |

## **paren**

在列表生成式中增加必须的括号。例如将 `[x for x in 1, 2]` 转换为 `[x for x in (1, 2)]`。

## **print**

将 `print` 语句转换为 [`print()`](https://docs.python.org/zh-cn/3.8/library/functions.html#print) 函数。

## **raise**

将 `raise E, V` 转换为 `raise E(V)`，将 `raise E, V, T` 转换为 `raise E(V).with_traceback(T)`。如果 `E` 是元组，这样的转换是不正确的，因为用元组代替异常的做法在 3.0 中已经移除了。

## **repr**

将反引号 repr 表达式替换为 [`repr()`](https://docs.python.org/zh-cn/3.8/library/functions.html#repr) 函数。

## **standarderror**

将 `StandardError` 重命名为 [`Exception`](https://docs.python.org/zh-cn/3.8/library/exceptions.html#Exception)。

## **throw**

修复生成器的 `throw()` 方法的 API 变更。

## **types**

修复 [`type`](https://docs.python.org/zh-cn/3.8/library/functions.html#type) 模块中一些成员的移除引起的代码问题。

## **unicode**

将 `unicode` 重命名为 [`str`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#str)。

## **urllib**

将 [`urllib`](https://docs.python.org/zh-cn/3.8/library/urllib.html#module-urllib) 和 `urllib2` 重命名为 [`urllib`](https://docs.python.org/zh-cn/3.8/library/urllib.html#module-urllib) 包。

## **xrange**

将 `xrange()` 重命名为 [`range()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#range)，并用 [`list`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#list) 包装原有的 [`range()`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#range)。

## **xreadlines**

将 `for x in file.xreadlines()` 转换为 `for x in file`。

## **zip**

用 [`list`](https://docs.python.org/zh-cn/3.8/library/stdtypes.html#list) 包装 [`zip()`](https://docs.python.org/zh-cn/3.8/library/functions.html#zip)。如果使用了 `from future_builtins import zip` 的话会禁用。

## try except 语句的变化

2.x:

```python
try:
    ......
except Exception, e:
    ......
```

3.x:

```python
try:
    ......
except Exception as e:
    ......
```

## raise

raise E, V 变为 raise E(V)

## **打开文件**

2.x:

```python
 file(.....)

 open(.....)
```

3.x:

```python
只能用open(.....)
```

## 新式类与经典类

在 Python3.x 中默认的类都是新式类，在 Python2.x 中只有继承 object 才是新式类，没有写父类的是经典类。

## 编码

Python3 中字符串是 Unicode (utf-8)编码，支持中文做标识符。

```python
>>> 中国 = 'china'
>>> print(中国)
china
```

python2 中是 ASCII 编码，需要更改字符集才能正常支持中文，所以在.py 文件中会看到#-- coding: UTF-8 --。

```python
>>> str = "我爱北京天安门"
>>> str
'\xe6\x88\x91\xe7\x88\xb1\xe5\x8c\x97\xe4\xba\xac\xe5\xa4\xa9\xe5\xae\x89\xe9\x97\xa8'
>>> str = u"我爱北京天安门"
>>> str
u'\u6211\u7231\u5317\u4eac\u5929\u5b89\u95e8'
```

## **除法运算**

单斜杠/,Python2 中整数相除得整数，浮点小数相除得浮点；Python3 中结果总是浮点数。

```python
#python3
>>> print(10/5)
2.0
```

## 新增

新增 nonlocal 关键字

str 用于 Unicode 文本,bytes 用于二进制文本

新的迭代器方法 range,map,zip 等

新增集合解析与字典解析

新增环境管理器 with/as

支持多个环境管理器项 with A() as a, B() as b

扩展的序列解包 a, \*b = seq

统一所有类为新式类

增强**slot**类属性

## 参考

- [2to3 官方文档](https://docs.python.org/zh-cn/3.8/library/2to3.html)
