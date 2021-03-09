---
order: 0
nav:
  title: Python
  order: 1
---

# 语言规范

## 导入

> 仅对包和模块使用导入

- 使用`import x`来导入包和模块.
- 使用`from x import y`，其中 x 是包前缀，y 是不带前缀的模块名.
- 使用`from x import y as z`，如果两个要导入的模块都叫作 y 或者 y 太长了.

例如，模块`sound.effects.echo`可以用如下方式导入：

```python
from sound.effects import echo
...
echo.EchoFilter(input, output, delay=0.7, atten=4)
```

## 包

> 使用模块的全路径名来导入每个模块

- 所有的新代码都应该用完整包名来导入每个模块.

应该像下面这样导入：

```python
# Reference in code with complete name. (bad)
import sound.effects.echo

# Reference in code with just module name (preferred)
from sound.effects import echo
```

## 异常

> 允许使用异常，但必须小心

#### 定义

​ 异常是一种跳出代码块的正常控制流来处理错误或者其他异常条件的方式

异常必须遵循特定条件：

1. 像这样触发异常：`raise MyException("Error message")`或者`raise MyException`. 不要使用两个参数的形式(`raise MyException, "Error message"`)或者过时的字符串异常(`raise "Error message"`).

2. 模块或包应该定义自己的特定域的异常基类，这个基类应该从内建的 Exception 类继承. 模块的异常基类应该叫做"Error".

   ```python
   class Error(Exception):
    pass
   ```

3. 永远不要使用`except:`语句来捕获所有异常，也不要捕获`Exception`或者`StandardError`，除非你打算重新触发该异常，或者你已经在当前线程的最外层(记得还要打压一条错误信息). 在异常这方面，Python 非常宽容，`except:`会捕获包括 Python 语法错误在内的任何错误. 使用`except:`很容易隐藏真正的 bug.

4. 尽量减少 try/excpet 块中的代码量. try 块的体积越大，期望之外的异常就越容易被触发. 这种情况下，try/except 块将隐藏真正的错误.

5. 使用 finally 子句来执行那些无论 try 块中有没有异常都应该被执行的代码. 这对于清理资源非常有用，例如关闭文件.

6. 当捕获异常时，使用`as`而不要用逗号.例如

   ```python
   try:
       raise Error
   except Error as error:
       pass
   ```

## 全局变量

> 避免全局变量

#### 定义

​ 定义在模块级的变量.

避免使用全局变量，用类变量来代替. 但也有一些例外：

1. 脚本默认选项
2. 模块级常量. 例如：PI = 3.1415926. 常量名应该全大写，用下划线连接.
3. 有时候用全局变量来缓存值或者作为函数返回值很有用.
4. 如果需要，全局变量应该仅在模块内部可用，并通过模块级的公共函数来访问.

## 嵌套/局部/内部类或函数

> 鼓励使用嵌套/本地/内部类或函数

#### 定义

​ 类可以定义在方法，函数或者类中. 函数可以定义在方法或函数中. 封闭区间中定义的变量对嵌套函数是只读的(可变类型除外，比如 list).

<span style='color: red'>推荐使用.</span>

## 列表推导

> 可以在简单情况下使用

#### 定义

​ 列表推导与生成器表达式提供了一种简洁高效的方式来创建列表和迭代器，而不必借助 map(), filter()或者 lambda.

适用于简单情况，每个部分都应该单独置于一行：映射表达式，for 语句，过滤器表达式. 禁止多重 for 语句或过滤器表达式. 复杂情况下还是使用循环.

```python
Yes:
  result = []
  for x in range(10):
      for y in range(5):
          if x * y > 10:
              result.append((x, y))

  for x in xrange(5):
      for y in xrange(5):
          if x != y:
              for z in xrange(5):
                  if y != z:
                      yield (x, y, z)

  return ((x, complicated_transform(x))
          for x in long_generator_function(parameter)
          if x is not None)

  squares = [x * x for x in range(10)]

  eat(jelly_bean for jelly_bean in jelly_beans
      if jelly_bean.color == 'black')
```

```python
No:
  result = [(x, y) for x in range(10) for y in range(5) if x * y > 10]

  return ((x, y, z)
          for x in xrange(5)
          for y in xrange(5)
          if x != y
          for z in xrange(5)
          if y != z)
```

## 默认迭代器和操作符

> 如果类型支持，就使用默认迭代器和操作符. 比如列表，字典及文件等.

#### 定义

​ 容器类型，像字典和列表，定义了默认的迭代器和关系测试操作符(in 和 not in).

如果类型支持，就使用默认迭代器和操作符，例如列表，字典和文件. 内建类型也定义了迭代器方法. 优先考虑这些方法，而不是那些返回列表的方法. 当然，这样遍历容器时，你将不能修改容器.

```python
Yes:  for key in adict: ...
      if key not in adict: ...
      if obj in alist: ...
      for line in afile: ...
      for k, v in dict.iteritems(): ...
```

```python
No:   for key in adict.keys(): ...
      if not adict.has_key(key): ...
      for line in afile.readlines(): ...
```

## 函数与方法装饰器

> 如果好处很明显，就明智而谨慎的使用装饰器

#### 定义

​ 用于函数及方法的装饰器(也就是@标记). 最常见的装饰器是@classmethod 和@staticmethod，用于将常规函数转换成类方法或静态方法. 不过，装饰器也允许用户自定义装饰器. 下面两段代码是等效的：

```python
class C(object):
   @my_decorator
   def method(self):
       # method body ...
```

```python
class C(object):
    def method(self):
        # method body ...
    method = my_decorator(method)
```

如果好处很显然, 就明智而谨慎的使用装饰器. 装饰器应该遵守和函数一样的导入和命名规则. 装饰器的 python 文档应该清晰的说明该函数是一个装饰器. 请为装饰器编写单元测试.

避免装饰器自身对外界的依赖(即不要依赖于文件, socket, 数据库连接等), 因为装饰器运行时这些资源可能不可用(由 `pydoc` 或其它工具导入). 应该保证一个用有效参数调用的装饰器在所有情况下都是成功的.

## 参考链接

- [Python 语言规范](https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/python_language_rules/)
