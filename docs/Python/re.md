---
sidebarDepth: 3
---

# 正则表达式

## 特殊符号及用法

<table>
  <style>
  .mark-sapn {
      background-color:rgb(175, 238, 238)
  }
  </style>
  <tbody>
    <tr>
      <td><strong>字符</strong></td>
      <td><strong>含义</strong></td>
    </tr>
    <tr>
      <td>.</td>
      <td> 表示匹配除了换行符外的任何字符<br>
        注：通过设置 re.DOTALL 标志可以使 <font class='mark-sapn'>.</font> 匹配任何字符（包含换行符）</td>
    </tr>
    <tr>
      <td>|</td>
      <td>
        <font class='mark-sapn'>A | B</font>，表示匹配正则表达式 A 或者 B
      </td>
    </tr>
    <tr>
      <td>^</td>
      <td> 1. （脱字符）匹配输入字符串的开始位置<br>
           2. 如果设置了 re.MULTILINE 标志，<font class='mark-sapn'>^</font> 也匹配换行符之后的位置</td>
    </tr>
    <tr>
      <td>$</td>
      <td> 1. 匹配输入字符串的结束位置<br>
           2. 如果设置了 re.MULTILINE 标志，<font class='mark-sapn'>$</font> 也匹配换行符之前的位置</td>
    </tr>
    <tr>
      <td>\</td>
      <td> 1. 将一个普通字符变成特殊字符，例如 <font class='mark-sapn'>\d</font> 表示匹配所有十进制数字<br>
           2. 解除元字符的特殊功能，例如 <font class='mark-sapn'>\.</font> 表示匹配点号本身<br>
           3. 引用序号对应的子组所匹配的字符串<br>
           4. 详见下方列举</td>
    </tr>
    <tr>
      <td>[...]</td>
      <td> 字符类，匹配所包含的任意一个字符<br>
        注1：连字符 <font class='mark-sapn'>-</font> 如果出现在字符串中间表示字符范围描述；如果如果出现在首位则仅作为普通字符<br>
        注2：特殊字符仅有反斜线 <font class='mark-sapn'>\</font> 保持特殊含义，用于转义字符。其它特殊字符如 <font class='mark-sapn'>*</font>、<font class='mark-sapn'>+</font>、<font class='mark-sapn'>?</font> 等均作为普通字符匹配<br>
        注3：脱字符 <font class='mark-sapn'>^</font> 如果出现在首位则表示匹配不包含其中的任意字符；如果 <font class='mark-sapn'>^</font> 出现在字符串中间就仅作为普通字符匹配<br>
      </td>
    </tr>
    <tr>
      <td>{M,N}</td>
      <td> M 和 N 均为非负整数，其中 M &lt;= N，表示前边的 RE 匹配 M ~ N 次<br>
        注1：{M,} 表示至少匹配 M 次<br>
        注2：{,N} 等价于 {0,N}<br>
        注3：{N} 表示需要匹配 N 次</td>
    </tr>
    <tr>
      <td>*</td>
      <td> 匹配前面的子表达式零次或多次，等价于 {0,}</td>
    </tr>
    <tr>
      <td>+</td>
      <td> 匹配前面的子表达式一次或多次，等价于 {1,}</td>
    </tr>
    <tr>
      <td>?</td>
      <td> 匹配前面的子表达式零次或一次，等价于 {0,1}</td>
    </tr>
    <tr>
      <td>*?, +?, ??</td>
      <td> 默认情况下 <font class='mark-sapn'>*</font>、<font class='mark-sapn'>+</font> 和 <font class='mark-sapn'>?</font> 的匹配模式是贪婪模式（即会尽可能多地匹配符合规则的字符串）；<font class='mark-sapn'>*?</font>、<font class='mark-sapn'>+?</font> 和 <font class='mark-sapn'>??</font> 表示启用对应的非贪婪模式。<br>
           <i>举个栗子：对于字符串 "FishCCC"，正则表达式 <font class='mark-sapn'>FishC+</font> 会匹配整个字符串，而 <font class='mark-sapn'>FishC+?</font> 则匹配 "FishC"。</i></td>
    </tr>
    <tr>
      <td>{M,N}?</td>
      <td> 同上，启用非贪婪模式，即只匹配 M 次</td>
    </tr>
    <tr>
      <td>(...)</td>
      <td>匹配圆括号中的正则表达式，或者指定一个子组的开始和结束位置<br>
        注：子组的内容可以在匹配之后被 <font class='mark-sapn'>\数字</font> 再次引用 <br>
           <i>举个栗子：<font class='mark-sapn'>(\w+) \1</font> 可以字符串 "FishC FishC.com" 中的 "FishC FishC"（注意有空格）</i></td>
    </tr>
    <tr>
      <td>(?...)</td>
      <td>
        <font class='mark-sapn'>(?</font> 开头的表示为正则表达式的扩展语法（下边这些是 Python 支持的所有扩展语法）
      </td>
    </tr>
    <tr>
      <td>(?aiLmsux)</td>
      <td> 1. <font class='mark-sapn'>(?</font> 后可以紧跟着 'a'，'i'，'L'，'m'，'s'，'u'，'x' 中的一个或多个字符，只能在正则表达式的开头使用<br>
           2. 每一个字符对应一种匹配标志：re-A（只匹配 ASCII 字符），re-I（忽略大小写），re-L（区域设置），re-M（多行模式）, re-S（. 匹配任何符号），re-X（详细表达式），包含这些字符将会影响整个正则表达式的规则<br>
           3. 当你不想通过 re.compile() 设置正则表达式标志，这种方法就非常有用啦<br>
        注意，由于 <font class='mark-sapn'>(?x)</font> 决定正则表达式如何被解析，所以它应该总是被放在最前边（最多允许前边有空白符）。如果 <font class='mark-sapn'>(?x)</font> 的前边是非空白字符，那么 <font class='mark-sapn'>(?x)</font> 就发挥不了作用了。</td>
    </tr>
    <tr>
      <td>(?:...)</td>
      <td> 非捕获组，即该子组匹配的字符串无法从后边获取</td>
    </tr>
    <tr>
      <td>(?P&lt;name&gt;...)</td>
      <td> 命名组，通过组的名字（name）即可访问到子组匹配的字符串</td>
    </tr>
    <tr>
      <td>(?P=name)</td>
      <td>反向引用一个命名组，它匹配指定命名组匹配的任何内容 </td>
    </tr>
    <tr>
      <td>(?#...)</td>
      <td> 注释，括号中的内容将被忽略</td>
    </tr>
    <tr>
      <td>(?=...)</td>
      <td> 前向肯定断言。如果当前包含的正则表达式（这里以 ... 表示）在当前位置成功匹配，则代表成功，否则失败。一旦该部分正则表达式被匹配引擎尝试过，就不会继续进行匹配了；剩下的模式在此断言开始的地方继续尝试。<br>
           <i>举个栗子：<font class='mark-sapn'>love(?=FishC)</font> 只匹配后边紧跟着 "FishC" 的字符串 "love"</i></td>
    </tr>
    <tr>
      <td>(?!...)</td>
      <td> 前向否定断言。这跟前向肯定断言相反（不匹配则表示成功，匹配表示失败）。<br>
           <i>举个栗子：<font class='mark-sapn'>FishC(?!\.com)</font> 只匹配后边不是 ".com" 的字符串 "FishC" </i> </td>
    </tr>
    <tr>
      <td>(?&lt;=...)</td>
      <td>后向肯定断言。跟前向肯定断言一样，只是方向相反。<br>
           <i>举个栗子：<font class='mark-sapn'>(?&lt;=love)FishC</font> 只匹配前边紧跟着 "love" 的字符串 "FishC"</i></td>
    </tr>
    <tr>
      <td>(?&lt;!...)</td>
      <td> 后向否定断言。跟前向肯定断言一样，只是方向相反。<br>
           <i>举个栗子：<font class='mark-sapn'>(?&lt;!FishC)\.com</font> 只匹配前边不是 "FishC" 的字符串 ".com"</i></td>
    </tr>
    <tr>
      <td>(?(id/name)yes-pattern|no-pattern)</td>
      <td> 1. 如果子组的序号或名字存在的话，则尝试 yes-pattern 匹配模式；否则尝试 no-pattern 匹配模式<br>
           2. no-pattern 是可选的<br>
           <i>举个栗子：<font class='mark-sapn'>(&lt;)?(\w+@\w+(?:\.\w+)+)(?(1)&gt;|$)</font> 是一个匹配邮件格式的正则表达式，可以匹配 &lt;user@fishc.com&gt; 和 'user@fishc.com'，但是不会匹配 '&lt;user@fishc.com' 或 'user@fishc.com&gt;'</i></td>
    </tr>
    <tr>
      <td>\</td>
      <td> 下边列举了由字符 '\' 和另一个字符组成的特殊含义。注意，'\' + 元字符的组合可以解除元字符的特殊功能</td>
    </tr>
    <tr>
      <td>\序号</td>
      <td> 1. 引用序号对应的子组所匹配的字符串，子组的序号从 1 开始计算<br>
           2. 如果序号是以 0 开头，或者 3 个数字的长度。那么不会被用于引用对应的子组，而是用于匹配八进制数字所表示的 ASCII 码值对应的字符<br>
           <i>举个栗子：<font class='mark-sapn'>(.+) \1</font> 会匹配 "FishC FishC" 或 "55 55"，但不会匹配 "FishCFishC"（注意，因为子组后边还有一个空格）</i></td>
    </tr>
    <tr>
      <td>\A</td>
      <td> 匹配输入字符串的开始位置</td>
    </tr>
    <tr>
      <td>\Z</td>
      <td> 匹配输入字符串的结束位置</td>
    </tr>
    <tr>
      <td>\b</td>
      <td> 匹配一个单词边界，单词被定义为 Unicode 的字母数字或下横线字符<br>
           <i>举个栗子：<font class='mark-sapn'>\bFishC\b</font> 会匹配字符串 "love FishC"、FishC." 或 "(FishC)"</i></td>
    </tr>
    <tr>
      <td>\B</td>
      <td> 匹配非单词边界，其实就是与 \b 相反<br>
           <i>举个栗子：<font class='mark-sapn'>py\B</font></i><i> 会匹配字符串 "python"、"py3"&nbsp;&nbsp;或 "py2"，但不会匹配 "py&nbsp;&nbsp;"、"py." 或&nbsp;&nbsp;"py!"</i></td>
    </tr>
    <tr>
      <td>\d</td>
      <td> 1. 对于 Unicode（str 类型）模式：匹配任何一个数字，包括 [0-9] 和其他数字字符；如果开启了 re.ASCII 标志，就只匹配 [0-9]<br>
           2. 对于 8 位（bytes 类型）模式：匹配 [0-9] 中任何一个数字</td>
    </tr>
    <tr>
      <td>\D</td>
      <td>匹配任何非 Unicode 的数字，其实就是与 \d 相反；如果开启了 re.ASCII 标志，则相当于匹配 [^0-9]</td>
    </tr>
    <tr>
      <td>\s</td>
      <td> 1. 对于 Unicode（str 类型）模式：匹配 Unicode 中的空白字符（包括 [ \t\n\r\f\v] 以及其他空白字符）；如果开启了 re.ASCII 标志，就只匹配 [ \t\n\r\f\v]<br>
           2. 对于 8 位（bytes 类型）模式：匹配 ASCII 中定义的空白字符，即 [ \t\n\r\f\v]</td>
    </tr>
    <tr>
      <td>\S</td>
      <td>匹配任何非 Unicode 中的空白字符，其实就是与 \s 相反；如果开启了 re.ASCII 标志，则相当于匹配 [^ \t\n\r\f\v]</td>
    </tr>
    <tr>
      <td>\w</td>
      <td> 1. 对于 Unicode（str 类型）模式：匹配任何 Unicode 的单词字符，基本上所有语言的字符都可以匹配，当然也包括数字和下横线；如果开启了 re.ASCII 标志，就只匹配 [a-zA-Z0-9_]<br>
           2. 对于 8 位（bytes 类型）模式：匹配 ASCII 中定义的字母数字，即 [a-zA-Z0-9_]</td>
    </tr>
    <tr>
      <td>\W</td>
      <td> 匹配任何非 Unicode 的单词字符，其实就是与 \w 相反；如果开启了 re.ASCII 标志，则相当于 [^a-zA-Z0-9_]</td>
    </tr>
    <tr>
      <td>转义符号</td>
      <td> 正则表达式还支持大部分 Python 字符串的转义符号：\a，\b，\f，\n，\r，\t，\u，\U，\v，\x，\\<br>
        注1：\b 通常用于匹配一个单词边界，只有在字符类中才表示“退格”<br>
        注2：\u 和 \U 只有在 Unicode 模式下才会被识别<br>
        注3：八进制转义（\数字）是有限制的，如果第一个数字是 0，或者如果有 3 个八进制数字，那么就被认为是八进制数；其他情况则被认为是子组引用；至于字符串，八进制转义总是最多只能是 3 个数字的长度</td>
    </tr>
  </tbody>
</table>

## Python 正则符号分类

### 1.元字符

下边是元字符的完整列表它们不匹配任何字符,只是简单地表示成功或失败，因此这些字符也称之为零宽断言。

```
.   ^   $   *   +   ?   { }   [ ]   \   |   ( )
```

元字符详情解释:

```
. #表示匹配除了换行符外的任何字符注：通过设置 re.DOTALL 标志可以使 . 匹配任何字符（包含换行符）】
| #A | B，表示匹配正则表达式 A 或者 B
^ #匹配字符串的开头 (补充在 [^a-2] 和 [a-z^] 代表不同意思)，设置了 re.MULTILINE 标志，^ 也匹配换行符之后的位置】
$ #匹配字符串的末尾,设置了 re.MULTILINE 标志，$ 也匹配换行符之前的位置】

\
'''
 1. 将一个普通字符变成特殊字符，例如 \d 表示匹配所有十进制数字 (补充：这是个重点)
 2. 解除元字符的特殊功能，例如 \. 表示匹配点号本身
 3. 引用序号对应的子组所匹配的字符串
 4.注意，'\' + 元字符的组合可以解除元字符的特殊功能 (如 \? = '?')
'''

[...]
'''
字符类，匹配所包含的任意一个字符 (补充 [.] 这时.就是一个点)
注1：连字符 - 如果出现在字符串中间表示字符范围描述；如果如果出现在首位则仅作为普通字符
注2：特殊字符仅有反斜线 \ 保持特殊含义，用于转义字符。其它特殊字符如 *、+、? 等均作为普通字符匹配
注3：脱字符 ^ 如果出现在首位则表示匹配不包含其中的任意字符；如果 ^ 出现在字符串中间就仅作为普通字符匹配
'''

{M,N}
''' M 和 N 均为非负整数，其中 M <= N，表示前边的 RE 匹配 M ~ N 次
    注1：{M,} 表示至少匹配 M 次
    注2：{,N} 等价于 {0,N}
    注3：{N} 表示需要匹配 N 次
'''

* #匹配前面的子表达式零次或多次，等价于 {0,}
+ #匹配前面的子表达式一次或多次，等价于 {1,}】
? #匹配前面的子表达式零次或一次，等价于 {0,1}】

*?, +?, ?? #默认情况下匹配模式是贪婪模式即会尽可能多地匹配符合规则的字符串;.*?、+? 和 ?? 表示启用对应的非贪婪模式。

{M,N}? #同上，启用非贪婪模式，即只匹配 M 次(最小次数)

(...) #匹配圆括号中的正则表达式，或者指定一个子组的开始和结束位置注：子组的内容可以在匹配之后被 \数字 再次引用
```

### 2.特殊字符

下边列举了由字符 ‘\’ 和另一个字符组成的特殊含义。

```
\序号   #重点与难点
'''
\1...\9 #匹配第n个分组的内容
1. 引用序号对应的子组所匹配的字符串，子组的序号从 1 开始计算 (会进行细细讲解)
2. 如果序号是以 0 开头，或者 3 个数字的长度。那么不会被用于引用对应的子组，而是用于匹配八进制数字所表示的 ASCII 码值对应的字符
举个栗子：(.+) \1 会匹配 "FishC FishC" 或 "55 55"，但不会匹配 "FishCFishC"（注意，因为子组后边还有一个空格）
'''

\A  #匹配字符串开始位置
\Z  #匹配字符串结束位置，如果是存在换行,只匹配到换行前的结束字符串。

\b  #匹匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。
\B  #匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。

\d  #匹配任意数字，等价于 [0-9]对于 8 位（bytes 类型）模式：匹配 [0-9] 中任何一个数字
\D  #匹配非数字等价于 [^0-9]其实就是与 \d 相反

\s  #str 类型模式：的空白字符包括 [ \t\n\r\f\v] 以及其他空白字符
\S  #匹配任何非空白字符，其实就是与 \s 相反;如果开启了 re.ASCII 标志，则相当于匹配 [^ \t\n\r\f\v]

\w  #匹配数字字母下划线 [a-zA-Z0-9_]
\W  #匹配非数字字母下划线其实就是与 \w 相反；如果开启了 re.ASCII 标志，则相当于 [^a-zA-Z0-9_]

'''转义符号'''

正则表达式还支持大部分 Python 字符串的转义符号：\a，\b，\f，\n，\r，\t，\u，\U，\v，\x，\\
注1：\b 通常用于匹配一个单词边界，只有在字符类中才表示“退格”
注2：\u 和 \U 只有在 Unicode 模式下才会被识别
注3：八进制转义（\数字）是有限制的，如果第一个数字是 0，或者如果有 3 个八进制数字，那么就被认为是八进制数；其他情况则被认为是子组引用；至于字符串，八进制转义总是最多只能是 3 个数字的长度
```

正则基础案例

```python
#正则匹配案例
import re

###########（1）元符号 ################
re.search(r'.','www.baidu.com')  #match='w' #匹配任意一个字符
re.search(r'\.','baidu.com')     #match='.'
re.search(r'[.]','baidu.com')    #同上

re.search(r'BAI(C|D)U','BAIDU.com')    # match='BAIDU'

re.search(r'^Regular','Regular Expression')      # match='Regular'
re.search(r'Expression$','Regular Expression')   # match='Expression'

re.search(r'[a-z]*','love.com')  # match='love'
re.findall(r'[a-z]','love.com')  # ['l', 'o', 'v', 'e', 'c', 'o', 'm']

re.search(r'chat*',"Im chatweb")      # 实际建议使用
re.search(r'chat{0,}',"Im chatweb")  # match='chat'

re.findall(r'web+',"web.web.com")     # 实际建议使用
re.findall(r'web{1,}',"Im chatweb")   # ['web', 'web']

re.findall(r'web?',"webchatweb")        # 实际建议使用
re.findall(r'web{0,1}',"webchatweb")    # ['web', 'web']

re.findall(r'(weiyi){0,2}',"weiyi weiyi")    # 配置连续出现两次 ['weiyi', '', 'weiyi', '']

re.findall(r'[\n]',"This is a\n")          # ['\n']
re.findall(r'[^a-z]',"weiyigeek.github.io\n")   # 排除 a-z ['W', 'G', '.', '\n']
re.findall(r'[a-z^]',"weiyigeek.github.io\n")   # 排除 A-Z ['e', 'i', 'y', 'i', 'e', 'e', 'k', 'c', 'l', 'u', 'b']

#贪婪模式
re.search(r"<.+>","<html><title>我是标题</title></html>")  #match='<html><title>我是标题</title></html>'
re.search(r"<.+?>","<html><title>我是标题</title></html>") #<re.Match object; span=(0, 6), match='<html>'>


###########（2）特殊符号 ################
re.search(r'\145','12e213llo.com')         # <re.Match object; span=(2, 3), match='e'>
re.findall(r'\bweiyi\b','www.weiyi.com')   # ['weiyi']
re.findall(r'\bweiyi\b','www. weiyi_.com')  # []

re.findall(r'\dweiyi\b','1024weiyi.com')  #'4weiyi']  #单词边界匹配 weiyi love
re.findall(r'\sweiyi\b','\tweiyi.com')    # ['\tweiyi']

re.findall(r'(\w+) \1','FishC FishC.com')      # ['FishC']  #注意里面空格的不同 表示匹配两次相同的字符后面是
re.findall(r'(\w+)\1','FishCFishC.com')        # ['FishC']

re.search(r'[0-9]{0,3}?','123weiyiGeek123.com')  #<re.Match object; span=(0, 0), match=''>
```

### 3.分组

在正则表达式中，使用元字符 ( ) 来划分组,它们将包含在内部的表达式组合在一起，所以你可以对一个组的内容使用重复操作的元字符\*?+等;

```
############################## 重点.START ############################################
(?...) #? 开头的表示为正则表达式的扩展语法（下边这些是 Python 支持的所有扩展语法
(?aiLmsux)
'''
1. (? 后可以紧跟着 'a'，'i'，'L'，'m'，'s'，'u'，'x' 中的一个或多个字符，只能在正则表达式的开头使用

2. 每一个字符对应一种匹配标志，包含这些字符将会影响整个正则表达式的规则
re-A（只匹配 ASCII 字符），
re-I（忽略大小写），
re-L（区域设置），本地化识别(local-aware)
re-M（多行模式）,
re-S（. 匹配任何符号），
re-X（详细表达式）
re-U (根据Unicode字符集解析字符，该标志影响\w \W \b \B)


3. 当你不想通过 re.compile() 设置正则表达式标志这种方法就非常有用啦（注意点）
注意，由于 (?x) 决定正则表达式如何被解析，所以它应该总是被放在最前边（最多允许前边有空白符）。
如果 (?x) 的前边是非空白字符，那么 (?x) 就发挥不了作用了。
'''

(?:...)  #非捕获组，即该子组匹配的字符串无法从后边获取(后面会用到)
(?P<name>...)  #命名组,通过组的名字（name）即可访问到子组匹配的字符串 （注意点）
(?P=name)      #反向引用一个命名组，它匹配指定命名组匹配的任何内容
(?#...)    #注释，括号中的内容将被忽略

(?=...)
'''
前向肯定断言。如果当前包含的正则表达式（这里以 ... 表示）在当前位置成功匹配则代表成功，否则失败。
一旦该部分正则表达式被匹配引擎尝试过，就不会继续进行匹配了；剩下的模式在此断言开始的地方继续尝试。
'''
(?!...)   #前向否定断言。这跟前向肯定断言相反（不匹配则表示成功，匹配表示失败）。
(?<=...)  #后向肯定断言。跟前向肯定断言一样，只是方向相反。
(?<!...)  #后向否定断言。跟前向肯定断言一样，只是方向相反。

(?(id/name)yes-pattern|no-pattern)
'''
    1. 如果子组的序号或名字存在的话，则尝试 yes-pattern 匹配模式；否则尝试 no-pattern 匹配模式
    2. no-pattern 是可选的
'''
```

案例：

```python

#举个栗子：love(?=weiyi) 只匹配字符串后边紧跟着 "weiyi" 的字符串 "love" (括号里面都不会输出,但会进行匹配)
>>> re.search('love(?=weiyi)','loveweiyi stusdy')  #匹配前
<re.Match object; span=(0, 4), match='love'>

#举个栗子：weiyi(?!\.com) 只匹配字符串后边不是 ".com" 的字符串 "weiyi" (括号里面都不会输出,但会进行匹配)
>>> re.search('weiyi(?!\.com)','weiyi.club')  #匹配前
<re.Match object; span=(0, 5), match='weiyi'>

#举个栗子：(?<=weiyi)\.com 只匹配字符串前边是 "weiyi" 的字符串 ".com" (括号里面都不会输出,但会进行匹配)
>>> re.search('(?<=weiyi)\.com','weiyi.com')  #匹配后
<re.Match object; span=(5, 9), match='.com'>

#举个栗子：(?<!weiyi)\.com 只匹配前边不是 "weiyi" 的字符串 ".com" (括号里面都不会输出,但会进行匹配)
>>> re.search('(?<!weiyi)\.com','weiyii.com')   #匹配后
<re.Match object; span=(6, 10), match='.com'>

#举个栗子：(<)?(\[email protected]\w+(?:\.\w+)+)(?(1)>|$) 是一个匹配邮件格式的正则表达式，可以匹配 <[email protected]> 和 '[email protected]'，但是不会匹配 '<[email protected]' 或 '[email protected]>'
>>> re.search('(<)?(\[email protected]\w+(?:\.\w+)+)(?(1)>|$)','[email protected]')  #注意前后的(<)(>)
<re.Match object; span=(0, 13), match='[email protected]'>
>>> re.search('(<)?(\[email protected]\w+(?:\.\w+)+)(?(1)>|$)','<[email protected]>')
<re.Match object; span=(0, 15), match='<[email protected]>'>
```

## re 模块详解

Python 通过 re 模块为正则表达式引擎提供一个接口，同时允许你将正则表达式编译成模式对象，并用它们来进行匹配;re 模块仅仅是作为 C 的扩展模块包含在 Python 中，就像 socket 模块和 zlib 模块;

正则表达式对象 re.RegexObject 与 re.MatchObject:

1. re.compile() 返回 RegexObject 对象。
2. re.match() 和 re.search 返回 re.MatchObject 对象;

正则表达式修饰符 - 可选标志(flags)
描述：可选标志修饰符来控制匹配的模式,另外多个标志还可以同时使用（通过“|”），如：re.I | re.M 就是同时设置 I 和 M 标志。

```
re.I|IGNORECASE #使匹配对大小写不敏感
re.L|LOCALE     #做本地化识别（locale-aware）匹配,示特殊字符集 \w, \W, \b, \B, \s, \S 依赖于当前环境
re.M|MULTILINE  #多行匹配，影响 ^ 和 $
re.S|DOTALL     #使得 . 匹配任何符号，包括换行符,这个标志仅对 Unicode 模式有意义，并忽略字节模式。
re.A|ASCII      #使得转义符号如 \w，\b，\s 和 \d 只能匹配 ASCII 字符,这个标志仅对 Unicode 模式有意义，并忽略字节模式。
re.U|UNICODE    #根据Unicode字符集解析字符,这个标志影响 \w, \W, \b, \B.
re.X|VERBOSE    #使你的正则表达式可以写得更好看和更有条理，因为使用了这个标志，空格会被忽略（除了出现在字符类中和使用反斜杠转义的空格）；这个标志同时允许你在正则表达式字符串中使用注释，
                # 符号后边的内容是注释，不会递交给匹配引擎（除了出现在字符类中和使用反斜杠转义的 #  （后面详解）

Match匹配对象包含了很多方法和属性：
start() 返回匹配的开始位置
end() 返回匹配的结束位置
span() 返回一个元组表示匹配位置（开始，结束）
group(num=0) 返回匹配的字符串,输入参数表示提取元组
groups() 返回一个包含所有小组字符串的元组，从 1 到 所含的小组号。

(1) re.compile(pattern[, flags])： 编译正则表达式如果您需要重复的使用某个表达式的时候使用,生成一个正则表达式（ Pattern ）对象
(2) re.match(pattern, string, flags=0) :扫描整个字符串并返回第一个成功的匹配。 （只匹配一次,成功返回一个匹配的对象，否则返回None）
(3) re.search(pattern, string, flags=0) :遍历字符串，找到正则表达式匹配的第一个位置（只匹配一次,成功返回一个匹配的对象，否则返回None）
(4) re.findall(string[, pos[, endpos]]) :遍历字符串（位置点：pos,endpos），找到正则表达式匹配的所有位置，并以列表的形式返回
(5) re.findite(pattern, string, flags=0):遍历字符串，找到正则表达式匹配的所有位置，并以迭代器的形式返回
(6) re.sub(pattern, repl, string, count=0)：用于替换字符串中的匹配项(repl替换字符/函数,count=替换次数0表全部)
(7) re.split(pattern, string[, maxsplit=0, flags=0]) ：匹配的子串将字符串分割后返回列表 | maxsplit分隔次数

re全局函数与re.compile编译正则表达式比较：

1. 程序是大量的使用正则表达式（例如在一个循环中使用）,那么建议你使用后一种方法，因为预编译的话可以节省一些函数调用。
2. 但如果是在循环外部，由于得益于内部缓存机制,两者效率相差无几。
```

案例 1：

```python
#功能：re 模块基础方法

import re

'''
re.compile 案例
'''
p = re.compile(r'[a-z]+',re.M|re.I)    #编译正则表达式 = r'[a-z]{0,}'
print(p,p.match('abcdefg'))   #返回匹配对象 re.compile('[a-z]+', re.IGNORECASE|re.MULTILINE)  match='abcdefg'
print(p.match('abcdefg',1,3))  #从'b'的位置开始匹配，匹配两个字符


'''
re.match 案例
'''
print(re.match('www', 'www.weiyigeek.com').span())  # 在起始位置匹配  span=(0, 3)
print(re.match('com', 'www.baidu.com'))          # 不在起始位置匹配 None
matchObj = re.match( r'(.*) are (.*?) .*', "Cats are smarter than dogs", re.M|re.I)  #任意匹配除换行符（\n、\r）之外的字符
if matchObj: #判断是否为NONE
   print ("matchObj.group() : ", matchObj.group())   #元组的形式 上面整个字符串
   print ("matchObj.group(1) : ", matchObj.group(1)) #匹配的第一个元组 Cats
   print ("matchObj.group(2) : ", matchObj.group(2)) # 匹配的第二元组 smarter
else:
   print ("No match!!")


'''
re.search 案例
'''
print(re.search('www', 'www.weiyigeek.com').span())    # 在起始位置匹配 (0, 3)
print(re.search('com', 'www.weiyigeek.com').span())    # 不在起始位置匹配  （注意这里与上面match的不同） (11, 14)
print(re.search(r'\d+','123a456').group())       # 返回匹配的字符串 123
print(re.search(r'\d+','123a456').start())       # 返回0 , end 返回 3


'''
re.findall 案例
'''
p = re.compile(r'\d+')
print(p.findall('3只甲鱼，15条腿，多出的3条在哪里？')) #['3', '15', '3']
print(p.findall('run88Weiyi123google456', 0, 10))   #['88']  指定查找位置前10个字符
print(p.findall('run88Weiyi123google456',5))       #从W开始匹配 ['123', '456']


'''
re.finditer 案例
'''
it = re.finditer(r"\d+","12a32bc43jf3")
for match in it:
    print (match.group(),end=" ")  #12 32 43 3

iterator = p.finditer('3只甲鱼,15条腿,多出的3条在哪里？')
print(iterator)   # <callable_iterator object at 0x00000250DC49DA20>
for each in iterator:
    print(each.group(),each.span())
# 3 (0, 1)
# 15 (5, 7)
# 3 (13, 14)


'''
re.sub 案例
'''
string = '2004-959-559 # 这是一个电话号码'
print(re.sub(r'#.*$', "", string)) # 删除注释 2004-959-559
print(re.sub(r'\D', "", string))  # 匹配电话号码 2004959559

>>> p = re.compile('x*')
>>> p.sub('-', 'abxd')
'-a-b-d-'

def double(matched):  # 将匹配的数字乘于 2 （值得学习）
    value = int(matched.group('value'))
    print(value)
    return str(value * 2)
print(re.sub('(?P<value>\d+)', double, 'A23G4HFD567'))  #采用了分组匹配数字
############# 执行结果 ##################
# 23
# 4
# 567
# A46G8HFD1134

######## 值得学习 #########
>>> def hexrepl(match):
...     "Return the hex string for a decimal number"
...     value = int(match.group())
...     return hex(value)
...
>>> p = re.compile(r'\d+')
>>> p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
'Call 0xffd2 for printing, 0xc000 for user code.'
#你需要指定正则表达式标志，那么你必须使用后者；或者使用模式内嵌修正器，例如 sub("(?i)b+", "x", "bbbb BBBB") 返回 'x x'。

'''
re.split 案例
'''
re.split('\,', 'weiyigeek,weiyigeek, weiyigeek.') #['weiyigeek', 'weiyigeek', ' weiyigeek.']
p = re.compile(r'\W+')
>>> p.split('This is a test, short and sweet, of split().')   #分隔符是任何非字母数字字符：
['This', 'is', 'a', 'test', 'short', 'and', 'sweet', 'of', 'split', '']

#如果使用了捕获组，那么作为分隔符的值也会被返回：
p2 = re.compile(r'(\W+)')
>>> p2.split('This... is a test.')
['This', '... ', 'is', ' ', 'a', ' ', 'test', '.', '']


####补充比较 match / search ###
#match() 函数只会检查 RE 是否在字符串的开始处匹配，而 search() 会遍历整个字符串搜索匹配的内容
>>> print(re.match('super', 'superstition').span())
(0, 5)
>>> print(re.match('super', 'insuperable'))
None

>>> print(re.search('super', 'superstition').span())
(0, 5)
>>> print(re.search('super', 'insuperable').span())
(2, 7)
```

补充：

- 没有任何匹配的话 match() 和 search() 会返回 None,否则返回一个匹配对象 match object
- re.match 与 re.search 的区别,前者只匹配字符串的开始,后者匹配整个字符串直到找到一个匹配。
- 如果列表很大那么使用返回迭代器的效率要高很多

为了匹配反斜杠这个字符，我们需要在字符串中使用四个反斜杠才行。所以在正则表达式中频繁地使用反斜杠,会造成反斜杠风暴，进而导致你的字符串极其难懂,强烈建议使用原始字符串来表达正则表达式。

```
正则字符串   原始字符串(推荐)
"ab*"           r"ab*"
"\\\\section"   r"\\section"
"\\w+\\s+\\1"   r"\w+\s+\1"
```

在这些 REs 中，当编译正则表达式时指定 re.VERBOSE 标志是非常有帮助的。因为它允许你可以编辑正则表达式的格式，使之更清楚。
案例：

```python
#使用和没有使用re.VERBOSE之间的对比
charref = re.compile(r"""
 &[#]                # 开始数字引用
 (
     0[0-7]+         # 八进制格式
   | [0-9]+          # 十进制格式
   | x[0-9a-fA-F]+   # 十六进制格式
 )
 ;                   # 结尾分号
""", re.VERBOSE)

#没有设置 VERBOSE 标志
charref = re.compile("&#(0[0-7]+|[0-9]+|x[0-9a-fA-F]+);")

pat = re.compile(r"""
 \s*                             # Skip leading whitespace
 (?P<header>[^:]+)   # Header name
 \s* :                           # Whitespace, and a colon
 (?P<value>.*?)          # The header's value -- *? used to
                                  # lose the following trailing whitespace
 \s*$                           # Trailing whitespace to end-of-line
""", re.VERBOSE)
# 同样的内容，下边这个要难读得多：
pat = re.compile(r"\s*(?P<header>[^:]+)\s*:(?P<value>.*?)\s*$")
```

## re 分组 (重点难点)

描述：分组显示的方法

- group([group1, …]) 方法用于获得一个或多个分组匹配的字符串，当要获得整个匹配的子串时，可直接使用 group() 或 group(0)；
- start([group]) 方法用于获取分组匹配的子串在整个字符串中的起始位置（子串第一个字符的索引），参数默认值为 0；
- end([group]) 方法用于获取分组匹配的子串在整个字符串中的结束位置（子串最后一个字符的索引+1），参数默认值为 0；
- span([group]) 方法返回 (start(group), end(group))。
  案例：

```python
#分组案例：

#案例1：
>>>import re
>>> pattern = re.compile(r'([a-z]+) ([a-z]+)', re.I)   # re.I 表示忽略大小写
>>> m = pattern.match('Hello World Wide Web')

>>> print m                               # 匹配成功，返回一个 Match 对象 <_sre.SRE_Match object at 0x10bea83e8>
>>> m.group(0)                            # 返回匹配成功的整个子串 'Hello World'
>>> m.span(0)                             # 返回匹配成功的整个子串的索引 (0, 11)

>>> m.group(1)                            # 返回第一个分组匹配成功的子串 'Hello'
>>> m.span(1)                             # 返回第一个分组匹配成功的子串的索引  (0, 5)

>>> m.group(2)                            # 返回第二个分组匹配成功的子串 'World'
>>> m.span(2)                             # 返回第二个分组匹配成功的子串  (6, 11)

>>> m.groups()                            # 等价于 (m.group(1), m.group(2), ...) ('Hello', 'World')
>>> m.group(3)                            # 不存在第三个分组  IndexError: no such group

#案例2：
>>> p = re.compile('(a)b')
>>> m = p.match('ab')
>>> m.group()  #'ab'
>>> m.group(0)  'ab'
>>> m.group(1)  'a'  #显示元组本身字符

# 子组的索引值是从左到右进行编号，子组也允许嵌套，因此我们可以通过从左往右来统计左括号 ( 来确定子组的序号。
>>> p = re.compile('(a(b)c)d')
>>> m = p.match('abcd')
>>> m.group(0)
'abcd'
>>> m.group(1)
'abc'
>>> m.group(2)
'b'
>>> m.group(2,1,0) #该方法可以一次传入多个子组的序号
('b', 'abc', 'abcd')
```

### 1.非捕获组和命名组

它们都使用了一个公共的正则表达式扩展语法;精心设计的正则表达式可能会划分很多组，这些组不仅可以匹配相关的子串，还能够对正则表达式本身进行分组和结构化。

产生原因：复杂的正则表达式中，由于有太多的组因此通过组的序号来跟踪和使用会变得困难。

正则表达式的(?…)扩展语法：

- 问号 ? 紧跟在左小括号 ( 后边，本身是一个语法错误的写法，因为 ? 前边没有东西可以重复，所以这样就解决了兼容性的问题（理由是语法正确的正则表达式肯定不会这么写嘛~）。
- 然后紧跟在 ? 后边的字符则表示哪些扩展语法会被使用。例如 (?=foo) 表示一种新的扩展功能（前向断言），(?:foo) 则表示另一种扩展功能（一个包含子串 foo 的非捕获组）。
  非捕获组:

“捕获”就是匹配的意思啦，普通的子组都是捕获组，因为它们能从字符串中匹配到数据。
非捕获组案例：

```python
>>> m = re.match("([abc])+", "abc")  #捕获组
>>> m.groups()
('c',)
>>> m = re.match("(?:[abc])+", "abc") #非捕获组   #<re.Match object; span=(0, 3), match='abc'>
>>> m.groups()
()
```

除了你不能从非捕获组获得匹配的内容之外，其他的非捕获组跟普通子组没有什么区别了。你可以在里边放任何东西，使用重复功能的元字符，或者跟其他子组进行嵌套（捕获的或者非捕获的子组都可以）。

当你需要修改一个现有的模式的时候，(?:…) 是非常有用的。原始是添加一个非捕获组并不会影响到其他（捕获）组的序号。值得一提的是，在搜索的速度上，捕获组和非捕获组的速度是没有任何区别的。

命名组:
普通子组我们使用序列来访问它们，命名组则可以使用一个有意义的名字来进行访问。
命名组的语法是 Python 特有的扩展语法：(?P)。很明显< > 里边的 name 就是命名组的名字啦。命名组除了有一个名字标识之外，跟其他捕获组是一样的。

命名组案例：

```python
>>> p = re.compile(r'(?P<word>\b\w+\b)')
>>> m = p.search( '(((( Lots of punctuation )))' )
>>> m.group('word')   #采用命名组关键字来访问
'Lots'
>>> m.group(1)
'Lots'

#比如下面的案例使用了命名组, 很明显，使用 m.group('zonem') 访问匹配内容要比使用数字 9 更简单明了。
InternalDate = re.compile(r'INTERNALDATE "'
        r'(?P<day>[ 123][0-9])-(?P<mon>[A-Z][a-z][a-z])-'
        r'(?P<year>[0-9][0-9][0-9][0-9])'
        r'(?P<hour>[0-9][0-9]):(?P<min>[0-9][0-9]):(?P<sec>[0-9][0-9])'
        r'(?P<zonen>[-+])(?P<zoneh>[0-9][0-9])(?P<zonem>[0-9][0-9])'
        r'"')

#正则表达式中，反向引用的语法像 (...)\1 是使用序号的方式来访问子组；在命名组里，显然也是有对应的变体：使用名字来代替序号。其扩展语法是 (?P=name)，
#含义是该 name 指向的组需要在当前位置再次引用。那么搜索两个单词的正则表达式可以写成 (\b\w+)\s+\1，也可以写成 (?P<word>\b\w+)\s+(?P=word)：
>>> p = re.compile(r'(?P<word>\b\w+)\s+(?P=word)')
>>> p.search('Paris in the the spring').group()
'the the'
```

### 2.分组进阶高级前向断言

```python
#需求与问题解决
.*[.].*$  #$ 确保字符串剩余的部分都包含在扩展名中。
#所以这个正则表达式可以匹配 fishc.txt，foo.bar，autoexec.bat，sendmail.cf，printers.conf 等。
.*[.][^b].*$ # 这里为了排除 bat，我们先尝试排除扩展名的第一个字符为非 b。但这是错误的开始，因为 foo.bar 后缀名的第一个字符也是 b。
.*[.]([^b]..|.[^a].|..[^t])$ #改进,这样正好可以接受 foo.bar，排除 autoexec.bat。但问题又来了，这样的正则表达式要求扩展名必须是三个字符，比如 sendmail.cf 就会被排除掉。
.*[.]([^b].?.?|.[^a]?.?|..?[^t]?)$ # 在第三次尝试中，我们让第二个和第三个字符变成可选的。这样就可以匹配稍短的扩展名，比如 sendmail.cf。

.*[.](?!bat$).*$  #一个前向否定断言就可以解决你的难题
.*[.](?!bat$|exe$).*$  #有了前向否定断言，要同时排除 bat 和 exe 扩展名，也变得相当容易


'''
'''

#将匹配被 { 和 } 括起来的单词 section，并将 section 替换成 subsection：
>>> p = re.compile('section{ ( [^}]* ) }', re.VERBOSE) #将匹配到的元组进行切换
>>> p.sub(r'subsection{\1}','section{First} section{second}')
'subsection{First} subsection{second}'
#1. 大家还记得吗？这里开启了 re.VERBOSE，空格将被忽略。因为这里一堆符号，用空格隔开看着才不会乱糟糟的......2. 这里 r'subsection{\1}' 使用 \1 引用匹配模式中的 ([^}]*) 匹配的字符串内容。

#使用 Python 的扩展语法 (?P<name>...) 指定命名组，引用命名组的语法是 \g<name>。\g<name> 会将名字为 name 的组匹配的字符串替换进去。另外，\g<数字> 是通过组的序号进行引用。
#\g<2> 其实就相当于 \2，但我们更提倡使用 \g<2>，因为这样可以避免歧义。例如，\g<2>0 的含义是引用序号为 2 的组，然后后边匹配一个字符 '0'，而你写成 \20 就会被认为是引用序号为 20 的组了。
>>> p = re.compile('section{ (?P<name> [^}]* ) }', re.VERBOSE)
>>> p.sub(r'subsection{\1}','section{First}')  #这里\20 表示分组(20) 而使用\g<2>0 表示序号为2的组
'subsection{First}'
>>> p.sub(r'subsection{\g<1>}','section{First}')  #关键点(分组1)
'subsection{First}'
>>> p.sub(r'subsection{\g<name>}','section{First}')
'subsection{First}'
```

补充提示：

- 有几对小括号就是分成了几个子组，例如 (a)(b) 和 (a(b)) 都是由两个子组构成的。
- Python 的字符串中会使用反斜杠加数字的方式来表示数字的值对应的 ASCII 字符，所以在使用反向索引的正则表达式中，我们依然强调要使用原始字符串。
- 反向引用指的是你可以在后面的位置使用先前匹配过的内容，用法是反斜杠加上数字。例如 \1 表示引用前边成功匹配的序号为 1 的子组。

## 参考链接

[官方文档](https://docs.python.org/zh-cn/3.8/library/re.html)
[Python3 正则表达式特殊符号及用法](https://cloud.tencent.com/developer/article/1728598)
[FishC 鱼 C 论坛](https://fishc.com.cn/forum.php?mod=viewthread&tid=57691&extra=page%3D1%26filter%3Dtypeid%26typeid%3D403)

## 修改记录

| 作者   | 描述 | 时间       |
| ------ | ---- | ---------- |
| damien | 初稿 | 2021-02-07 |
