---
order: 1
nav:
  title: Python
  order: 1
---

# 风格规范

## 注释

> 确保对模块，函数，方法和行内注释使用正确的风格

#### 文档字符串

​ Python 有一种独一无二的的注释方式: 使用文档字符串. 文档字符串是包, 模块, 类或函数里的第一个语句. 这些字符串可以通过对象的\_\_doc\_\_成员被自动提取, 并且被 pydoc 所用. 我们对文档字符串的惯例是使用三重双引号”“”( [PEP-257](http://www.python.org/dev/peps/pep-0257/) ). 一个文档字符串应该这样组织: 首先是一行以句号, 问号或惊叹号结尾的概述(或者该文档字符串单纯只有一行). 接着是一个空行. 接着是文档字符串剩下的部分, 它应该与文档字符串的第一行的第一个引号对齐.

#### 函数和方法

一个函数必须要有文档字符串, 除非它满足以下条件:

1. 外部不可见
2. 非常短小
3. 简单明了

文档字符串应该包含函数做什么, 以及输入和输出的详细描述. 通常, 不应该描述”怎么做”, 除非是一些复杂的算法. 文档字符串应该提供足够的信息, 当别人编写代码调用该函数时, 他不需要看一行代码, 只要看文档字符串就可以了. 对于复杂的代码, 在代码旁边加注释会比使用文档字符串更有意义.

关于函数的几个方面应该在特定的小节中进行描述记录， 这几个方面如下文所述. 每节应该以一个标题行开始. 标题行以冒号结尾. 除标题行外, 节的其他内容应被缩进 2 个空格.

​ **Args**:

​ 列出每个参数的名字, 并在名字后使用一个冒号和一个空格, 分隔对该参数的描述.如果描述太长超过 了单行 80 字符,使用 2 或者 4 个空格的悬挂缩进(与文件其他部分保持一致). 描述应该包括所需的类型和 含义. 如果一个函数接受\*foo(可变长度参数列表)或者\*\*bar (任意关键字参数), 应该详细列出\*foo 和 \*\*bar.

​ **Returns: (或者 Yields: 用于生成器)**

​ 描述返回值的类型和语义. 如果函数返回 None, 这一部分可以省略.

​ **Raises:**

​ 列出与接口有关的所有异常.

```python
def fetch_bigtable_rows(big_table, keys, other_silly_variable=None):
    """Fetches rows from a Bigtable.

    Retrieves rows pertaining to the given keys from the Table instance
    represented by big_table.  Silly things may happen if
    other_silly_variable is not None.

    Args:
        big_table: An open Bigtable Table instance.
        keys: A sequence of strings representing the key of each table row
            to fetch.
        other_silly_variable: Another optional variable, that has a much
            longer name than the other args, and which does nothing.

    Returns:
        A dict mapping keys to the corresponding table row data
        fetched. Each row is represented as a tuple of strings. For
        example:

        {'Serak': ('Rigel VII', 'Preparer'),
         'Zim': ('Irk', 'Invader'),
         'Lrrr': ('Omicron Persei 8', 'Emperor')}

        If a key from the keys argument is missing from the dictionary,
        then that row was not found in the table.

    Raises:
        IOError: An error occurred accessing the bigtable.Table object.
    """
    pass
```

#### 类

​ 类应该在其定义下有一个用于描述该类的文档字符串. 如果你的类有公共属性(Attributes), 那么文档中应该有一个属性(Attributes)段. 并且应该遵守和函数参数相同的格式.

```python
class SampleClass(object):
    """Summary of class here.

    Longer class information....
    Longer class information....

    Attributes:
        likes_spam: A boolean indicating if we like SPAM or not.
        eggs: An integer count of the eggs we have laid.
    """

    def __init__(self, likes_spam=False):
        """Inits SampleClass with blah."""
        self.likes_spam = likes_spam
        self.eggs = 0

    def public_method(self):
        """Performs operation blah."""
```

#### 块注释和行注释

​ 最需要写注释的是代码中那些技巧性的部分. 如果你在下次 [代码审查](http://en.wikipedia.org/wiki/Code_review) 的时候必须解释一下, 那么你应该现在就给它写注释. 对于复杂的操作, 应该在其操作开始前写上若干行注释. 对于不是一目了然的代码, 应在其行尾添加注释.

```python
# We use a weighted dictionary search to find out where i is in
# the array.  We extrapolate position based on the largest num
# in the array and the array size and then do binary search to
# get the exact number.

if i & (i-1) == 0:        # True if i is 0 or a power of 2.
```

## 类

> 如果一个类不继承自其他类，就显式的从 object 继承. 嵌套类也一样.

```python
Yes: class SampleClass(object):
         pass


     class OuterClass(object):

         class InnerClass(object):
             pass


     class ChildClass(ParentClass):
         """Explicitly inherits from another class already."""
```

```python
No: class SampleClass:
        pass


    class OuterClass:

        class InnerClass:
            pass
```

继承自 `object` 是为了使属性(properties)正常工作, 并且这样可以保护你的代码, 使其不受 [PEP-3000](http://www.python.org/dev/peps/pep-3000/) 的一个特殊的潜在不兼容性影响. 这样做也定义了一些特殊的方法, 这些方法实现了对象的默认语义, 包括 `__new__, __init__, __delattr__, __getattribute__, __setattr__, __hash__, __repr__, and __str__` .

## 字符串

> 即使参数都是字符串，使用%操作符或者格式化方法格式化字符串

```python
Yes: x = a + b
     x = '%s, %s!' % (imperative, expletive)
     x = '{}, {}!'.format(imperative, expletive)
     x = 'name: %s; score: %d' % (name, n)
     x = 'name: {}; score: {}'.format(name, n)
```

```python
No: x = '%s%s' % (a, b)  # use + in this case
    x = '{}{}'.format(a, b)  # use + in this case
    x = imperative + ', ' + expletive + '!'
    x = 'name: ' + name + '; score: ' + str(n)
```

避免在循环中用+和+=操作符来累加字符串. 由于字符串是不可变的，这样做会创建不必要的临时对象，并且导致二次方而不是线性的运行时间. 作为替代方案，你可以将子串加入列表，然后在循环结束后用`.join`连接列表

```python
Yes: items = ['<table>']
     for last_name, first_name in employee_list:
         items.append('<tr><td>%s, %s</td></tr>' % (last_name, first_name))
     items.append('</table>')
     employee_table = ''.join(items)
```

```python
No: employee_table = '<table>'
    for last_name, first_name in employee_list:
        employee_table += '<tr><td>%s, %s</td></tr>' % (last_name, first_name)
    employee_table += '</table>'
```

## 导入格式

> 每个导入应该独占一行

```python
Yes: import os
     import sys
```

```python
No:  import os, sys
```

导入总应该放在文件顶部，位于模块注释和文档字符串之后，模块全局变量和常量之前. 导入应该按照从最通用到最不通用的顺序分组：

1. 标准库导入
2. 第三方库导入
3. 应用程序指定导入

每种分组中，应该根据每个模块的完整包路径字典序排序，忽略大小写.

```python
import foo
from foo import bar
from foo.bar import baz
from foo.bar import Quux
from Foob import ar
```

## 命名

> module_name, package_name, ClassName, method_name, ExceptionName, function_name, GLOBAL_VAR_NAME, instance_var_name, function_parameter_name, local_var_name

#### 应该避免的名称

1. 单字符名称，除了计数器和迭代器.
2. 包/模块名中的连字符(-)
3. 双下划线开头并结尾的名称(python 保留，例如\_\_init\_\_)

#### 命名约定

1. 所谓“内部(Internal)”表示仅模块内可用，或者在类内是保护或私有的.
2. <span style='color: red'>用单下划线(\_)开头表示模块变量或函数是 protected 的(使用 from module import \* 时不会包含)</span>
3. <span style='color: red'>用双下划线(\_\_)开头的实例变量或方法表示类内私有.</span>
4. 将相关的类和顶级函数放在同一个模块里.
5. 对类名使用大写字母开头的单词(如 CapWords, 即 Pascal 风格), 但是模块名应该用小写加下划线的方式(如 lower_with_under.py).

## 参考链接

- [Python 风格规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/python_style_rules/)
