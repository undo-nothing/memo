# os.path

该模块在路径名上实现了一些有用的功能：如需读取或写入文件，请参见 open() ；有关访问文件系统的信息，请参见 os 模块。路径参数可以字符串或字节形式传递。我们鼓励应用程序将文件名表示为（Unicode）字符串。不幸的是，某些文件名在 Unix 上可能无法用字符串表示，因此在 Unix 上平台上需要支持任意文件名的应用程序，应使用字节对象来表示路径名。反之亦然，在 Windows 平台上仅使用字节对象，不能表示的所有文件名（以标准 mbcs 编码），因此 Windows 应用程序应使用字符串对象来访问所有文件。

> 注解 所有这些函数都仅接受字节或字符串对象作为其参数。如果返回路径或文件名，则结果是相同类型的对象。

## os.path.abspath

os.path.abspath(path)

返回路径 path 的绝对路径（标准化的）。

## os.path.basename

os.path.basename(path)

返回路径 path 的基本名称。这是将 path 传入函数 split() 之后，返回的一对值中的第二个元素。请注意，此函数的结果与 Unix basename 程序不同。Unix basename 在 '/foo/bar/' 上返回 'bar'，而 os.path.basename() 函数返回一个空字符串 ('')。

## os.path.commonpath

os.path.commonpath(paths)

接受包含多个路径的序列 paths，返回 paths 的最长公共子路径。如果 paths 同时包含绝对路径和相对路径，或 paths 在不同的驱动器上，或 paths 为空，则抛出 ValueError 异常。与 commonprefix() 不同，本方法返回有效路径。

## os.path.commonprefix

os.path.commonprefix(list)

接受包含多个路径的 列表，返回所有路径的最长公共前缀（逐字符比较）。如果 列表 为空，则返回空字符串 ('')。

```
>>> os.path.commonprefix(['/usr/lib', '/usr/local/lib'])
'/usr/l'

>>> os.path.commonpath(['/usr/lib', '/usr/local/lib'])
'/usr'
```

## os.path.dirname

os.path.dirname(path)

返回路径 path 的目录名称。这是将 path 传入函数 split() 之后，返回的一对值中的第一个元素。

## os.path.exists

os.path.exists(path)

如果 path 指向一个已存在的路径或已打开的文件描述符，返回 True。对于失效的符号链接，返回 False。在某些平台上，如果使用 os.stat() 查询到目标文件没有执行权限，即使 path 确实存在，本函数也可能返回 False。

## os.path.lexists

os.path.lexists(path)

如果 path 指向一个已存在的路径，返回 True。对于失效的符号链接，也返回 True。在缺失 os.lstat() 的平台上等同于 exists()。

## os.path.expandvars

os.path.expandvars(path)

输入带有环境变量的路径作为参数，返回展开变量以后的路径 \$name 或 \${name} 形式的子字符串被环境变量 name 的值替换。格式错误的变量名称和对不存在变量的引用保持不变。

在 Windows 上，除了 \$name 和 \${name} 外，还可以展开 %name%。

## os.path.getatime

os.path.getatime(path)

返回 path 的最后访问时间。返回值是一个浮点数，为纪元秒数（参见 time 模块）。如果该文件不存在或不可访问，则抛出 OSError 异常。

## os.path.getmtime

os.path.getmtime(path)

返回 path 的最后修改时间。返回值是一个浮点数，为纪元秒数（参见 time 模块）。如果该文件不存在或不可访问，则抛出 OSError 异常。

## os.path.getctime

os.path.getctime(path)

返回 path 在系统中的 ctime，在有些系统（比如 Unix）上，它是元数据的最后修改时间，其他系统（比如 Windows）上，它是 path 的创建时间。返回值是一个数，为纪元秒数（参见 time 模块）。如果该文件不存在或不可访问，则抛出 OSError 异常。

## os.path.getsize

os.path.getsize(path)

返回 path 的大小，以字节为单位。如果该文件不存在或不可访问，则抛出 OSError 异常。

## os.path.isabs

os.path.isabs(path)

如果 path 是一个绝对路径，则返回 True。在 Unix 上，它就是以斜杠开头，而在 Windows 上，它可以是去掉驱动器号后以斜杠（或反斜杠）开头。

## os.path.isfile

os.path.isfile(path)

如果 path 是 现有的 常规文件，则返回 True。本方法会跟踪符号链接，因此，对于同一路径，islink() 和 isfile() 都可能为 True。

## os.path.isdir

os.path.isdir(path)

如果 path 是 现有的 目录，则返回 True。本方法会跟踪符号链接，因此，对于同一路径，islink() 和 isdir() 都可能为 True。

## os.path.islink

os.path.islink(path)

如果 path 指向的 现有 目录条目是一个符号链接，则返回 True。如果 Python 运行时不支持符号链接，则总是返回 False。

## os.path.join

os.path.join(path, \*paths)

合理地拼接一个或多个路径部分。返回值是 path 和 \*paths 所有值的连接，每个非空部分后面都紧跟一个目录分隔符 (os.sep)，除了最后一部分。这意味着如果最后一部分为空，则结果将以分隔符结尾。如果参数中某个部分是绝对路径，则绝对路径前的路径都将被丢弃，并从绝对路径部分开始连接。

在 Windows 上，遇到绝对路径部分（例如 r'\foo'）时，不会重置盘符。如果某部分路径包含盘符，则会丢弃所有先前的部分，并重置盘符。请注意，由于每个驱动器都有一个“当前目录”，所以 os.path.join("c:", "foo") 表示驱动器 C: 上当前目录的相对路径 (c:foo)，而不是 c:\foo。

## os.path.normpath

os.path.normpath(path)

通过折叠多余的分隔符和对上级目录的引用来标准化路径名，所以 A//B、A/B/、A/./B 和 A/foo/../B 都会转换成 A/B。这个字符串操作可能会改变带有符号链接的路径的含义。在 Windows 上，本方法将正斜杠转换为反斜杠。要规范大小写，请使用 normcase()。

## os.path.realpath

os.path.realpath(path)

返回指定文件的规范路径，消除路径中存在的任何符号链接（如果操作系统支持）

## os.path.relpath

os.path.relpath(path, start=os.curdir)

返回从当前目录或 start 目录（可选）到达 path 之间要经过的相对路径。这仅仅是对路径的计算，不会访问文件系统来确认 path 或 start 的存在性或属性。

start 默认为 os.curdir。

## os.path.samefile

os.path.samefile(path1, path2)

如果两个路径都指向相同的文件或目录，则返回 True。这由设备号和 inode 号确定，在任一路径上调用 os.stat() 失败则抛出异常。

## os.path.sameopenfile

os.path.sameopenfile(fp1, fp2)

如果文件描述符 fp1 和 fp2 指向相同文件，则返回 True。

## os.path.split

os.path.split(path)

将路径 path 拆分为一对，即 (head, tail)，其中，tail 是路径的最后一部分，而 head 里是除最后部分外的所有内容。tail 部分不会包含斜杠，如果 path 以斜杠结尾，则 tail 将为空。如果 path 中没有斜杠，head 将为空。如果 path 为空，则 head 和 tail 均为空。head 末尾的斜杠会被去掉，除非它是根目录（即它仅包含一个或多个斜杠）。在所有情况下，join(head, tail) 指向的位置都与 path 相同（但字符串可能不同）。另请参见函数 dirname() 和 basename()。
