# Markdown

> 1. Markdown*是什么*？  
>    **Markdown**是一种轻量级**标记语言**，它以纯文本形式(_易读、易写、易更改_)编写文档，并最终以 HTML 格式发布。  
>    **Markdown**也可以理解为将以 MARKDOWN 语法编写的语言转换成 HTML 内容的工具。
>
> 2. *为什么*要使用它？
>
> - 它是易读（看起来舒服）、易写（语法简单）、易更改**纯文本**。处处体现着**极简主义**的影子。
> - 兼容 HTML，可以转换为 HTML 格式发布。
> - 跨平台使用。

---

Markdown 语法主要分为如下几大部分：
**标题**，**段落**，**区块引用**，**代码区块**，**强调**，**列表**，**分割线**，**链接**，**图片**，**反斜杠 `\`**，**符号'`'**。

## 1. 标题

两种形式：  
1）使用`=`和`-`标记一级和二级标题。

> 一级标题  
> `=========`  
> 二级标题  
> `---------`

效果：

> 一级标题  
> =========  
> 二级标题  
> \---------

2）使用`#`，可表示 1-6 级标题。

> \# 一级标题  
> \## 二级标题  
> \### 三级标题  
> \#### 四级标题  
> \##### 五级标题  
> \###### 六级标题

效果：

> # 一级标题
>
> \## 二级标题
>
> ### 三级标题
>
> #### 四级标题
>
> ##### 五级标题
>
> ###### 六级标题

## 2. 段落

段落的前后要有空行，所谓的空行是指没有文字内容。若想在段内强制换行的方式是使用**两个以上**空格加上回车（引用中换行省略回车）。

## 3. 区块引用

在段落的每行或者只在第一行使用符号`>`,还可使用多个嵌套引用，如：

> \> 区块引用  
> \>> 嵌套引用

效果：

> 区块引用
>
> > 嵌套引用

## 4. 代码区块

代码区块的建立是在每行加上 4 个空格或者一个制表符（如同写代码一样）。如  
普通段落：

void main()  
{  
 printf("Hello, Markdown.");  
}

代码区块：

```c
void main()
{
    printf("Hello, Markdown.");
}
```

**注意**:需要和普通段落之间存在空行。

## 5. 强调

在强调内容两侧分别加上`*`或者`_`，如：

> \*斜体\*，\_斜体\_  
> \*\*粗体\*\*，\_\_粗体\_\_

效果：

> _斜体_，_斜体_  
> **粗体**，**粗体**

## 6. 列表

使用`·`、`+`、或`-`标记无序列表，如：

> \-（+\*） 第一项  
> \-（+\*） 第二项  
> \- （+\*）第三项

**注意**：标记后面最少有一个*空格*或*制表符*。若不在引用区块中，必须和前方段落之间存在空行。

效果：

> - 第一项
> - 第二项
> - 第三项

有序列表的标记方式是将上述的符号换成数字,并辅以`.`，如：

> 1 . 第一项  
> 2 . 第二项  
> 3 . 第三项

效果：

> 1. 第一项
> 2. 第二项
> 3. 第三项

## 7. 分割线

分割线最常使用就是三个或以上`*`，还可以使用`-`和`_`。

## 8. 链接

链接可以由两种形式生成：**行内式**和**参考式**。  
**行内式**：

> \[younghz 的 Markdown 库\]\(https://github.com/younghz/Markdown "Markdown"\)。

效果：

> [younghz 的 Markdown 库](https://github.com/younghz/Markdown 'Markdown')。

**参考式**：

> \[younghz 的 Markdown 库 1\]\[1\]  
> \[younghz 的 Markdown 库 2\]\[2\]  
> \[1\]:https://github.com/younghz/Markdown "Markdown"  
> \[2\]:https://github.com/younghz/Markdown "Markdown"

效果：

> [younghz 的 Markdown 库 1][1]  
> [younghz 的 Markdown 库 2][2]

[1]: https:://github.com/younghz/Markdown 'Markdown'
[2]: https:://github.com/younghz/Markdown 'Markdown'

**注意**：上述的`[1]:https:://github.com/younghz/Markdown "Markdown"`不出现在区块中。

## 9. 图片

添加图片的形式和链接相似，只需在链接的基础上前方加一个`！`。

> \![Markdown](/markdown.png)。

效果：

> ![Markdown](/markdown.png)

## 10. 反斜杠`\`

相当于**反转义**作用。使符号成为普通符号。

## 11. 符号'`'

起到标记作用。如：

> \`ctrl+a\`

效果：

> `ctrl+a`

## 12. 其它：

列表的使用(非 traditonal markdown)：

用`|`表示表格纵向边界，表头和表内容用`-`隔开，并可用`:`进行对齐设置，两边都有`:`则表示居中，若不加`:`则默认左对齐。

|    代码库    | 链接                                                                                  |
| :----------: | ------------------------------------------------------------------------------------- |
|   MarkDown   | [https://github.com/younghz/Markdown](https://github.com/younghz/Markdown 'Markdown') |
| MarkDownCopy | [https://github.com/younghz/Markdown](https://github.com/younghz/Markdown 'Markdown') |

关于其它扩展语法可参见具体工具的使用说明。

## 参考链接

- [younghz/Markdown(github)](https://github.com/younghz/Markdown)
