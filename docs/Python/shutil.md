---
sidebarDepth: 3
---

# shutil

shutil 模块提供了一系列对文件和文件集合的高阶操作。 特别是提供了一些支持文件拷贝和删除的函数。 对于单个文件的操作，请参阅 os 模块。

## 目录和文件操作

### shutil.copyfileobj

shutil.copyfileobj(fsrc, fdst[, length])

将文件类对象 fsrc 的内容拷贝到文件类对象 fdst。 整数值 length 如果给出则为缓冲区大小。 特别地， length 为负值表示拷贝数据时不对源数据进行分块循环处理；默认情况下会分块读取数据以避免不受控制的内存消耗。 请注意如果 fsrc 对象的当前文件位置不为 0，则只有从当前文件位置到文件末尾的内容会被拷贝。

### shutil.copyfile

shutil.copyfile(src, dst, \*, follow_symlinks=True)
将名为 src 的文件的内容（不包括元数据）拷贝到名为 dst 的文件并以尽可能高效的方式返回 dst。 src 和 dst 均为路径类对象或以字符串形式给出的路径名。

dst 必须是完整的目标文件名；对于接受目标目录路径的拷贝请参见 copy()。 如果 src 和 dst 指定了同一个文件，则将引发 SameFileError。

目标位置必须是可写的；否则将引发 OSError 异常。 如果 dst 已经存在，它将被替换。 特殊文件如字符或块设备以及管道无法用此函数来拷贝。

如果 follow_symlinks 为假值且 src 为符号链接，则将创建一个新的符号链接而不是拷贝 src 所指向的文件。

### shutil.copy

shutil.copy(src, dst, \*, follow_symlinks=True)

将文件 src 拷贝到文件或目录 dst。 src 和 dst 应为 路径类对象 或字符串。 如果 dst 指定了一个目录，文件将使用 src 中的基准文件名拷贝到 dst 中。 将返回新创建文件所对应的路径。

如果 follow_symlinks 为假值且 src 为符号链接，则 dst 也将被创建为符号链接。 如果 follow_symlinks 为真值且 src 为符号链接，dst 将成为 src 所指向的文件的一个副本。

copy() 会拷贝文件数据和文件的权限模式 (参见 os.chmod())。 其他元数据，例如文件的创建和修改时间不会被保留。 要保留所有原有的元数据，请改用 copy2() 。

### shutil.copy2

shutil.copy2(src, dst, \*, follow_symlinks=True)

类似于 copy()，区别在于 copy2() 还会尝试保留文件的元数据。

当 follow_symlinks 为假值且 src 为符号链接时，copy2() 会尝试将来自 src 符号链接的所有元数据拷贝到新创建的 dst 符号链接。 但是，此功能不是在所有平台上均可用。 在此功能部分或全部不可用的平台上，copy2() 将尽量保留所有元数据；copy2() 一定不会由于无法保留文件元数据而引发异常。

copy2() 会使用 copystat() 来拷贝文件元数据。 请参阅 copystat() 了解有关修改符号链接元数据的平台支持的更多信息。

### shutil.ignore_patterns

shutil.ignore_patterns(\*patterns)

这个工厂函数会创建一个函数，它可被用作 copytree() 的 ignore 可调用对象参数，以忽略那些匹配所提供的 glob 风格的 patterns 之一的文件和目录。 参见以下示例。

### shutil.copytree

shutil.copytree(src, dst, symlinks=False, ignore=None, copy_function=copy2, ignore_dangling_symlinks=False, dirs_exist_ok=False)

将以 src 为根起点的整个目录树拷贝到名为 dst 的目录并返回目标目录。 dirs_exist_ok 指明是否要在 dst 或任何丢失的父目录已存在的情况下引发异常。

目录的权限和时间会通过 copystat() 来拷贝，单个文件则会使用 copy2() 来拷贝。

如果 symlinks 为真值，源目录树中的符号链接会在新目录树中表示为符号链接，并且原链接的元数据在平台允许的情况下也会被拷贝；如果为假值或省略，则会将被链接文件的内容和元数据拷贝到新目录树。

当 symlinks 为假值时，如果符号链接所指向的文件不存在，则会在拷贝进程的末尾将一个异常添加到 Error 异常中的错误列表。 如果你希望屏蔽此异常那就将可选的 ignore_dangling_symlinks 旗标设为真值。 请注意此选项在不支持 os.symlink() 的平台上将不起作用。

如果给出了 ignore，它必须是一个可调用对象，该对象将接受 copytree() 所访问的目录以及 os.listdir() 所返回的目录内容列表作为其参数。 由于 copytree() 是递归地被调用的，ignore 可调用对象对于每个被拷贝目录都将被调用一次。 该可调用对象必须返回一个相对于当前目录的目录和文件名序列（即其第二个参数的子集）；随后这些名称将在拷贝进程中被忽略。 ignore_patterns() 可被用于创建这种基于 glob 风格模式来忽略特定名称的可调用对象。

如果发生了（一个或多个）异常，将引发一个附带原因列表的 Error。

如果给出了 copy_function，它必须是一个将被用来拷贝每个文件的可调用对象。 它在被调用时会将源路径和目标路径作为参数传入。 默认情况下，copy2() 将被使用，但任何支持同样签名（与 copy() 一致）都可以使用。

### shutil.rmtree

shutil.rmtree(path, ignore_errors=False, onerror=None)

删除一个完整的目录树；path 必须指向一个目录（但不能是一个目录的符号链接）。 如果 ignore_errors 为真值，删除失败导致的错误将被忽略；如果为假值或是省略，此类错误将通过调用由 onerror 所指定的处理程序来处理，或者如果此参数被省略则将引发一个异常。

> 注解 在支持必要的基于 fd 的函数的平台上，默认会使用 rmtree() 的可防御符号链接攻击的版本。 在其他平台上，rmtree() 较易遭受符号链接攻击：给定适当的时间和环境，攻击者可以操纵文件系统中的符号链接来删除他们在其他情况下无法访问的文件。 应用程序可以使用 rmtree.avoids_symlink_attacks 函数属性来确定此类情况具体是哪一些。

如果提供了 onerror，它必须为接受三个形参的可调用对象: function, path 和 excinfo。

第一个形参 function 是引发异常的函数；它依赖于具体的平台和实现。 第二个形参 path 将是传递给 function 的路径名。 第三个形参 excinfo 将是由 sys.exc_info() 所返回的异常信息。 由 onerror 所引发的异常将不会被捕获。

### shutil.move

shutil.move(src, dst, copy_function=copy2)

递归地将一个文件或目录 (src) 移至另一位置 (dst) 并返回目标位置。

如果目标是已存在的目录，则 src 会被移至该目录下。 如果目标已存在但不是目录，它可能会被覆盖，具体取决于 os.rename() 的语义。

如果目标是在当前文件系统中，则会使用 os.rename()。 在其他情况下，src 将被拷贝至 dst，使用的函数为 copy_function，然后目标会被移除。 对于符号链接，则将在 dst 之下或以其本身为名称创建一个指向 src 目标的新符号链接，并且 src 将被移除。

如果给出了 copy_function，则它必须为接受两个参数 src 和 dst 的可调用对象，并将在 os.rename() 无法使用时被用来将 src 拷贝到 dst。 如果源是一个目录，则会调用 copytree()，并向它传入 copy_function()。 默认的 copy_function 是 copy2()。 使用 copy() 作为 copy_function 允许在无法附带拷贝元数据时让移动操作成功执行，但其代价是不拷贝任何元数据。

### shutil.which

shutil.which(cmd, mode=os.F_OK | os.X_OK, path=None)

返回当给定的 cmd 被调用时将要运行的可执行文件的路径。 如果没有 cmd 会被调用则返回 None。

mode 是一个传递给 os.access() 的权限掩码，在默认情况下将确定文件是否存在并且为可执行文件。

当未指定 path 时，将会使用 os.environ() 的结果，返回 "PATH" 的值或回退为 os.defpath。

在 Windows 上当前目录总是会被添加为 path 的第一项，无论你是否使用默认值或提供你自己的路径，这是命令行终端在查找可执行文件时所采用的行为方式。 此外，当在 path 中查找 cmd 时，还会检查 PATHEXT 环境变量。 例如，如果你调用 shutil.which("python")，which() 将搜索 PATHEXT 来确定它要在 path 目录中查找 python.exe。 例如，在 Windows 上:

```
>>> shutil.which("python")
'C:\\Python33\\python.EXE'
```

### exception shutil.Error

此异常会收集在多文件操作期间所引发的异常。 对于 copytree()，此异常参数将是一个由三元组 (srcname, dstname, exception) 构成的列表。

## 归档操作

本模块也提供了用于创建和读取压缩和归档文件的高层级工具。 它们依赖于 zipfile 和 tarfile 模块。

### shutil.make_archive

shutil.make_archive(base_name, format[, root_dir[, base_dir[, verbose[, dry_run[, owner[, group[, logger]]]]]]])

创建一个归档文件（例如 zip 或 tar）并返回其名称。

base_name 是要创建的文件名称，包括路径，去除任何特定格式的扩展名。 format 是归档格式：为 "zip" (如果 zlib 模块可用), "tar", "gztar" (如果 zlib 模块可用), "bztar" (如果 bz2 模块可用) 或 "xztar" (如果 lzma 模块可用) 中的一个。

root_dir 是一个目录，它将作为归档文件的根目录，归档中的所有路径都将是它的相对路径；例如，我们通常会在创建归档之前用 chdir 命令切换到 root_dir。

base_dir 是我们要执行归档的起始目录；也就是说 base_dir 将成为归档中所有文件和目录共有的路径前缀。 base_dir 必须相对于 root_dir 给出。 请参阅 使用 base_dir 的归档程序示例 了解如何同时使用 base_dir 和 root_dir。

root_dir 和 base_dir 默认均为当前目录。

如果 dry_run 为真值，则不会创建归档文件，但将要被执行的操作会被记录到 logger。

owner 和 group 将在创建 tar 归档文件时被使用。 默认会使用当前的所有者和分组。

logger 必须是一个兼容 PEP 282 的对象，通常为 logging.Logger 的实例。

verbose 参数已不再使用并进入弃用状态。

### shutil.get_archive_formats

shutil.get_archive_formats()

返回支持的归档格式列表。 所返回序列中的每个元素为一个元组 (name, description)。

默认情况下 shutil 提供以下格式:

zip: ZIP 文件（如果 zlib 模块可用）。

tar: 未压缩的 tar 文件。 对于新归档文件将使用 POSIX.1-2001 pax 格式。

gztar: gzip 压缩的 tar 文件（如果 zlib 模块可用）。

bztar: bzip2 压缩的 tar 文件（如果 bz2 模块可用）。

xztar: xz 压缩的 tar 文件（如果 lzma 模块可用）。

你可以通过使用 register_archive_format() 注册新的格式或为任何现有格式提供你自己的归档器。

### shutil.register_archive_forma

shutil.register_archive_format(name, function[, extra_args[, description]])

为 name 格式注册一个归档器。

function 是将被用来解包归档文件的可调用对象。 该可调用对象将接收要创建文件的 base_name，再加上要归档内容的 base_dir (其默认值为 os.curdir)。 更多参数会被作为关键字参数传入: owner, group, dry_run 和 logger (与向 make_archive() 传入的参数一致)。

如果给出了 extra_args，则其应为一个 (name, value) 对的序列，将在归档器可调用对象被使用时作为附加的关键字参数。

description 由 get_archive_formats() 使用，它将返回归档器的列表。 默认值为一个空字符串。

### shutil.unregister_archive_format

shutil.unregister_archive_format(name)

从支持的格式中移除归档格式 name。

### shutil.unpack_archive

shutil.unpack_archive(filename[, extract_dir[, format]])

解包一个归档文件。 filename 是归档文件的完整路径。

extract_dir 是归档文件解包的目标目录名称。 如果未提供，则将使用当前工作目录。

format 是归档格式：应为 "zip", "tar", "gztar", "bztar" 或 "xztar" 之一。 或者任何通过 register_unpack_format() 注册的其他格式。 如果未提供，unpack_archive() 将使用归档文件的扩展名来检查是否注册了对应于该扩展名的解包器。 在未找到任何解包器的情况下，将引发 ValueError。

### shutil.register_unpack_format

shutil.register_unpack_format(name, extensions, function[, extra_args[, description]])

注册一个解包格式。 name 为格式名称而 extensions 为对应于该格式的扩展名列表，例如 Zip 文件的扩展名为 .zip。

function 是将被用来解包归档文件的可调用对象。 该可调用对象将接受归档文件的路径，加上该归档文件要被解包的目标目录。

如果提供了 extra_args，则其应为一个 (name, value) 元组的序列，将被作为关键字参数传递给该可调用对象。

可以提供 description 来描述该格式，它将被 get_unpack_formats() 返回。

### shutil.unregister_unpack_format

shutil.unregister_unpack_format(name)

撤销注册一个解包格式。 name 为格式的名称。

### shutil.get_unpack_formats

shutil.get_unpack_formats()

返回所有已注册的解包格式列表。 所返回序列中的每个元素为一个元组 (name, extensions, description)。

默认情况下 shutil 提供以下格式:

zip: ZIP 文件（只有在相应模块可用时才能解包压缩文件）。

tar: 未压缩的 tar 文件。

gztar: gzip 压缩的 tar 文件（如果 zlib 模块可用）。

bztar: bzip2 压缩的 tar 文件（如果 bz2 模块可用）。

xztar: xz 压缩的 tar 文件（如果 lzma 模块可用）。

你可以通过使用 register_unpack_format() 注册新的格式或为任何现有格式提供你自己的解包器。
