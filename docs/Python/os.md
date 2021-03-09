# Python os

本模块提供了一种使用与操作系统相关的功能的便捷式途径。 如果你只是想读写一个文件，请参阅 open()，如果你想操作文件路径，请参阅 os.path 模块，如果你想读取通过命令行给出的所有文件中的所有行，请参阅 fileinput 模块。 为了创建临时文件和目录，请参阅 tempfile 模块，对于高级文件和目录处理，请参阅 shutil 模块。

## 操作系统

### sys.platform

操作系统名称

| 系统           | 值       |
| -------------- | -------- |
| AIX            | 'aix'    |
| Linux          | 'linux'  |
| Windows        | 'win32'  |
| Windows/Cygwin | 'cygwin' |
| macOS          | 'darwin  |

```python
if sys.platform.startswith('linux'):
    pass
else:
    pass

# or

if sys.platform == 'linux':
    pass
else:
    pass
```

## 文件和目录

### os.chdir

os.chdir(path)

修改当前工作目录。

### os.getcwd

os.getcwd()

返回表示当前工作目录的字符串。

### os.getenv

os.getenv(key, default=None)

如果存在，返回环境变量 key 的值，否则返回 default。 key ， default 和返回值均为 str 字符串类型。

### os.listdir

os.listdir(path='.')

返回一个包含由 path 指定目录中条目名称组成的列表。

该列表按任意顺序排列，并且不包括特殊条目 '.' 和 '..'

### os.mkdir

os.mkdir(path, mode=0o777, \*, dir_fd=None)

创建一个名为 path 的目录，应用以数字表示的权限模式 mode。

如果目录已存在，则抛出 FileExistsError 异常。

### os.makedirs

os.makedirs(name, mode=0o777, exist_ok=False)

递归目录创建函数。与 mkdir() 类似，但会自动创建到达最后一级目录所需要的中间目录。

如果 exist_ok 为 False (默认值)，则如果目标目录已存在将引发 FileExistsError。

### os.remove

os.remove(path, \*, dir_fd=None)

移除（删除）文件 path。如果 path 是目录，则抛出 IsADirectoryError 异常。请使用 rmdir() 删除目录。

本函数支持 基于目录描述符的相对路径。

在 Windows 上，尝试删除正在使用的文件会抛出异常。而在 Unix 上，虽然该文件的条目会被删除，但分配给文件的存储空间仍然不可用，直到原始文件不再使用为止。

本函数在语义上与 unlink() 相同。

### os.rename

os.rename(src, dst, \*, src_dir_fd=None, dst_dir_fd=None)

将文件或目录 src 重命名为 dst。如果 dst 已存在，则下列情况下将会操作失败，并抛出 OSError 的子类

### os.rmdir

os.rmdir(path, \*, dir_fd=None)

移除（删除）目录 path。如果目录不存在或不为空，则会分别抛出 FileNotFoundError 或 OSError 异常。要删除整个目录树，可以使用 shutil.rmtree()。

### os.scandir

os.scandir(path='.')

返回一个 os.DirEntry 对象的迭代器，它们对应于由 path 指定目录中的条目。 这些条目会以任意顺序生成，并且不包括特殊条目 '.' 和 '..'

```python
with os.scandir(path) as it:
    for entry in it:
        if entry.is_file():
            print(entry.name)
```

### os.unlink

os.unlink(path, \*, dir_fd=None)

移除（删除）文件 path。该函数在语义上与 remove() 相同，unlink 是其传统的 Unix 名称。请参阅 remove() 的文档以获取更多信息。

### os.walk

os.walk(top, topdown=True, onerror=None, followlinks=False)
生成目录树中的文件名，方式是按上->下或下->上顺序浏览目录树。对于以 top 为根的目录树中的每个目录（包括 top 本身），它都会生成一个三元组 (dirpath, dirnames, filenames)。

dirpath 是表示目录路径的字符串。 dirnames 是 dirpath 中子目录名称组成的列表 (excluding '.' and '..')。 filenames 是 dirpath 中非目录文件名称组成的列表。 请注意列表中的名称不带路径部分。 要获取 dirpath 中文件或目录的完整路径（以 top 打头），请执行 os.path.join(dirpath, name)。

如果可选参数 topdown 为 True 或未指定，则在所有子目录的三元组之前生成父目录的三元组（目录是自上而下生成的）。如果 topdown 为 False，则在所有子目录的三元组生成之后再生成父目录的三元组（目录是自下而上生成的）。无论 topdown 为何值，在生成目录及其子目录的元组之前，都将检索全部子目录列表。

当 topdown 为 True 时，调用者可以就地修改 dirnames 列表（也许用到了 del 或切片），而 walk() 将仅仅递归到仍保留在 dirnames 中的子目录内。这可用于减少搜索、加入特定的访问顺序，甚至可在继续 walk() 之前告知 walk() 由调用者新建或重命名的目录的信息。当 topdown 为 False 时，修改 dirnames 对 walk 的行为没有影响，因为在自下而上模式中，dirnames 中的目录是在 dirpath 本身之前生成的。

## 进程管理

### os.kill

os.kill(pid, sig)

将信号 sig 发送至进程 pid。特定平台上可用的信号常量定义在 signal 模块中

Windows 支持

### os.system

os.system(command)

在子 shell 中执行命令（字符串）。这是调用标准 C 函数 system() 来实现的，因此限制条件与该函数相同。对 sys.stdin 等的更改不会反映在执行命令的环境中。command 产生的任何输出将被发送到解释器标准输出流。

在 Unix 上，返回值是进程的退出状态，编码格式与为 wait() 指定的格式相同。注意，POSIX 没有指定 C 函数 system() 返回值的含义，因此 Python 函数的返回值与系统有关。

在 Windows 上，返回值是运行 command 后系统 Shell 返回的值。该 Shell 由 Windows 环境变量 COMSPEC: 给出：通常是 cmd.exe，它会返回命令的退出状态。在使用非原生 Shell 的系统上，请查阅 Shell 的文档。

subprocess 模块提供了更强大的工具来生成新进程并跟踪执行结果，使用该模块比使用本函数更好。参阅 subprocess 文档中的 使用 subprocess 模块替换旧函数 部分以获取有用的帮助。

可用性: Unix, Windows。

### os.times

os.times()

返回当前的全局进程时间。返回值是一个有 5 个属性的对象：

user - 用户时间

system - 系统时间

children_user - 所有子进程的用户时间

children_system - 所有子进程的系统时间

elapsed - 从过去的固定时间点起，经过的真实时间

为了向后兼容，该对象的行为也类似于五元组，按照 user，system，children_user，children_system 和 elapsed 顺序组成。

在 Unix 上请参阅 times(2) 和 times(3) 手册页，在 Windows 上请参阅 the GetProcessTimes MSDN 。在 Windows 上，只有 user 和 system 是已知的，其他属性均为零。

可用性: Unix, Windows。

## 随机数

### os.urandom

os.urandom(size)

返回大小为 size 的字符串，它是适合加密使用的随机字节。
