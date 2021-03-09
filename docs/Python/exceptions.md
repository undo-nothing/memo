# 异常处理

## 所有异常及警告

```
BaseException             所有异常的基类
 +-- SystemExit              解释器请求退出
 +-- KeyboardInterrupt          用户中断执行(通常是输入^C)
 +-- GeneratorExit            生成器(generator)发生异常来通知退出
 +-- Exception               常规错误的基类
      +-- StopIteration              迭代器没有更多值
      +-- StopAsyncIteration              必须通过异步迭代器对象的__anext__()方法引发以停止迭代
      +-- ArithmeticError                 所有数值计算错误的基类
      |    +-- FloatingPointError             浮点计算错误
      |    +-- OverflowError                  数值运算超出最大限制
      |    +-- ZeroDivisionError              除(或取模)零 (所有数据类型
      +-- AssertionError                  断言语句失败
      +-- AttributeError                  对象没有这个属性
      +-- BufferError                    与缓冲区相关的操作时引发
      +-- EOFError                        没有内建输入,到达EOF 标记
      +-- ImportError                     导入失败
      |    +-- ModuleNotFoundError        找不到模块
      +-- LookupError                     无效数据查询的基类
      |    +-- IndexError                      序列中没有此索引(index)
      |    +-- KeyError                        映射中没有这个键
      +-- MemoryError                     内存溢出错误
      +-- NameError                       未声明、初始化对象
      |    +-- UnboundLocalError              访问未初始化的本地变量
      +-- OSError                         操作系统错误，
      |    +-- BlockingIOError               操作将阻塞对象设置为非阻塞操作
      |    +-- ChildProcessError             子进程上的操作失败
      |    +-- ConnectionError               与连接相关的异常的基类
      |    |    +-- BrokenPipeError             在已关闭写入的套接字上写入
      |    |    +-- ConnectionAbortedError      连接尝试被对等方中止
      |    |    +-- ConnectionRefusedError      连接尝试被对等方拒绝
      |    |    +-- ConnectionResetError        连接由对等方重置
      |    +-- FileExistsError               创建已存在的文件或目录
      |    +-- FileNotFoundError             请求不存在的文件或目录
      |    +-- InterruptedError              系统调用被输入信号中断
      |    +-- IsADirectoryError             在目录上请求文件操作
      |    +-- NotADirectoryError            在不是目录的事物上请求目录操作
      |    +-- PermissionError              在没有访问权限的情况下运行操作
      |    +-- ProcessLookupError            进程不存在
      |    +-- TimeoutError                  系统函数在系统级别超时
      +-- ReferenceError                弱引用试图访问已经垃圾回收了的对象
      +-- RuntimeError                  一般的运行时错误
      |    +-- NotImplementedError      尚未实现的方法
      |    +-- RecursionError           解释器检测到超出最大递归深度
      +-- SyntaxError                   Python 语法错误
      |    +-- IndentationError         缩进错误
      |         +-- TabError          Tab 和空格混用
      +-- SystemError              一般的解释器系统错误
      +-- TypeError               对类型无效的操作
      +-- ValueError              传入无效的参数
      |    +-- UnicodeError             Unicode 相关的错误
      |         +-- UnicodeDecodeError     Unicode 解码时的错误
      |         +-- UnicodeEncodeError     Unicode 编码时错误
      |         +-- UnicodeTranslateError  Unicode 转换时错误
      +-- Warning                       警告的基类
           +-- DeprecationWarning          关于被弃用的特征的警告
           +-- PendingDeprecationWarning   关于构造将来语义会有改变的警告
           +-- RuntimeWarning           可疑的运行行为的警告
           +-- SyntaxWarning            可疑的语法的警告
           +-- UserWarning              用户代码生成的警告
           +-- FutureWarning            有关已弃用功能的警告的基类
           +-- ImportWarning            模块导入时可能出错的警告的基类
           +-- UnicodeWarning           与Unicode相关的警告的基类
           +-- BytesWarning             bytes和bytearray相关的警告的基类
           +-- ResourceWarning           与资源使用相关的警告的基类
```

### 重要异常

- Exception
- ArithmeticError
  - FloatingPointError
  - OverflowError
  - ZeroDivisionError
- AssertionError
- LookupError
  - IndexError
  - KeyError
- OSError
- Warning

## 常用异常处理例子

```python
# 捕获一个异常，只打印异常信详细息
try:
    1 // 0
except Exception:
    import traceback
    traceback.print_exc()

# 捕获一个异常，将异常的信息返回
try:
    1 // 0
except Exception as e:
    error_msg = str(e)

# 捕获一个异常，处理后将其重新抛出
try:
    1 // 0
except Exception as e:
    # do some things
    raise e

# 捕获一个异常，处理后抛出一个新异常
try:
    1 // 0
except Exception as e:
    # do some things
    raise Exception('new error msg') from e

# 不管是否捕获异常，都将执行相关代码
try:
    1 // 0
except Exception as e:
    # do some things
    raise Exception('new error msg') from e
finally:
    # do some clean things
    pass

```

## 关于 finally, else

- 如果在执行 try 子句期间发生了异常，该异常可由一个 except 子句进行处理。 如果异常没有被某个 except 子句所处理，则该异常会在 finally 子句执行之后被重新引发。

- 异常也可能在 except 或 else 子句执行期间发生。 同样地，该异常会在 finally 子句执行之后被重新引发。

- 如果在执行 try 语句时遇到一个 break, continue 或 return 语句，则 finally 子句将在执行 break, continue 或 return 语句之前被执行。

- 如果 finally 子句中包含一个 return 语句，则返回值将来自 finally 子句的某个 return 语句的返回值，而非来自 try 子句的 return 语句的返回值

- else 子句中的代码将在代码没有运行错误的情况下运行，当报错了不会运行

```python
>>> def divide(x, y):
...     try:
...         result = x / y
...     except ZeroDivisionError:
...         print("division by zero!")
...     else:
...         print("result is", result)
...     finally:
...         print("executing finally clause")
...
>>> divide(2, 1)
result is 2.0
executing finally clause
>>> divide(2, 0)
division by zero!
executing finally clause
>>> divide("2", "1")
executing finally clause
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in divide
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```

## 自定义一个异常

- 异常通常应该直接或间接地从 Exception 类派生。
- 大多数异常都定义为名称以“Error”结尾，类似于标准异常的命名。

## 参考

- [错误和异常](https://docs.python.org/zh-cn/3.9/tutorial/errors.html#tut-userexceptions)
- [内置异常](https://docs.python.org/zh-cn/3.7/library/exceptions.html#base-classes)
