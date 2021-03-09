---
order: 0
nav:
  title: Django
  order: 2
---

# Django orm

## 模型

```python
# -*- coding:utf-8 -*-
from django.db import models

class Colors(models.Model):
    colors = models.CharField(max_length=10)
    def __str__(self):
        return self.colors

class Ball(models.Model):
    color = models.OneToOneField('Colors')
    description = models.CharField(max_length=10)
    def __str__(self):
        return self.description

class Clothes(models.Model):
    color = models.ForeignKey('Colors')
    description = models.CharField(max_length=10)
    def __str__(self):
        return self.description

class Child(models.Model):
    name = models.CharField(max_length=10)
    favor = models.ManyToManyField('Colors')
```

### 相关概念

- 一对一：子表从母表中选出一条数据一一对应。
- 一对多：子表从母表中选出一条数据一一对应，但母表中这条数据还可以被其他子表数据选择。
- 多对多：关联的两表可以互相选择。

### 应用场景

- 一对一：一般用于某张表的补充，比如用户基本信息是一张表，但并非每个用户都需要有登录的权限，不需要记录用户名和密码，此时，合理的做法就是新建一张记录登陆信息的表，与用户信息进行一对一的关联，可以方便的从子表查询母表信息或反向查询。
- 外键：有很多的应用场景，比如每个员工归属于一个部门，那么就可以让员工表的部门字段和部门表进行一对多关联，可以查询到一个员工归属于哪个部门，也可以反向查询某一部门有哪些员工。
- 多对多：比如公司服务器可能会有多种用途，归属于多个产品线当中，那么服务器与产品线之间就可以做成多对多，多对多在 A 表添加 ManyToMany 字段或者从 B 表添加，效果一致。

## 一对一

### 查

```python
# 子表查询母表，找到红球对应的颜色
# 写法1：
Ball.objects.get(description='红球').color.colors
# 写法2：
Colors.objects.get(ball__description='红球').colors

# 母表查询子表，找到红色对应的球的名字
# 写法1：
Colors.objects.get(colors='红').ball.description
# 写法2：
Ball.objects.get(color__colors='红').description
```

### 增

```python
# 添加一种颜色黑，并添加黑球
color_obj = Colors.object.create(colors='黑') # 先在母表中创建颜色，并实例化颜色对象
Ball.objects.create(color=color_obj, description='黑球') # 添加黑球信息
```

_备注：增添数据的三种常用方式_

```python
# 增添数据的四种写法
# 写法1：
color_obj = Colors.objects.create(colors='黑')
Ball.objects.create(color=color_obj, description='黑球')
# 写法1补充：
color_id = Colors.objects.create(colors='黑').id
Ball.objects.create(color_id=color_id, description='黑球')
# 写法2：
color_obj = Colors.objects.create(colors='黑')
ball_obj = Ball(color=color_obj, description='黑球')
ball_obj.save()
# 写法3(字典导入)：
color_obj = Colors.objects.create(colors='黑')
ball_dict = {'description': '黑球'}
Ball.objects.create(color=color_obj, **ball_dict)
# 写法4(多实例列表导入)：
ball_list = [ball1, ball2, ball3...]
Ball.objects.bulk_create(ball_list)
```

### 改

> `.get()`等同于`.filter().first()`。`get`能够返回`model`对象，但是只支持严格匹配，如果返回多条对象或者没有找到记录都会抛出异常；`filter`返回`QuerySet`对象，支持链式操作。

```python
color_obj = Colors.objects.get(colors='黑')
color_obj.colors = '灰'
color_obj.save()
Ball.objects.filter(description='黑球').update(color=color_obj, description='灰球') #update()是QuerySet的方法
```

_备注：修改数据的常见方式_

```python
# 更新一条数据
color_obj = Colors.objects.get(colors='黑')
color_obj.colors = '灰'
color_obj.save()
# 更新多条数据，把满足条件的球的description都变为灰球
# 写法1：
Ball.objects.filter(color__colors='红').update(description='灰球')
# 写法2：
up_dict = {'description': '灰球'}
Ball.objects.filter(id__gt=0).update(**up_dict)
```

### 删

```
Ball.objects.get(description='灰球').delete() #对象和QuerySet都有方法delete()
Colors.objects.filter(colors='灰').delete()

Colors.objects.all().delete()	#清空一张表
```

## 一对多(外键)

### 查

```python
# 外键表联合查询：

# 外键子表查询母表，与一对一子表查询母表形式一致
# 找到红夹克所属的颜色表中的颜色--返回：红
# 写法1：
Clothes.objects.get(description='红夹克').color.colors  #返回红
# 写法2，反向从母表入手：
Colors.objects.get(clothes__description='红夹克').colors

# 外键母表查询子表，与一对一形式不同，因为母表为"多"，不能像一对一一样通过.get().子表.子表字段的方式获取，但与多对多母表查询子表一致
# 找到颜色为红的所有服装--返回：[<Clothes: 红T恤>, <Clothes: 红夹克>]
# 写法1：
color_obj = Colors.objects.get(colors='红')
color_obj.clothes_set.all()  #子表小写_set的写法，实际上是一个QuerySet，可以用update,delete,all,filter等方法
# 写法2：
Clothes.objects.filter(color=Colors.objects.get(colors='红'))
# 写法2简便写法(推荐)：
Clothes.object.filter(color__colors='红')
# 写法3：
color_id = Colors.objects.get(colors='红').id  #通过母表取得颜色为红的id
Clothes.objects.filter(color_id=color_id)  #写法 filter(子表外键字段_母表主键=母表主键对象)
```

_备注：通过 QuerySet 的.value()方法，将 QuerySet 转化为 ValueQuerySet_

```python
Clothes.objects.filter(color=Colors.objects.get(colors='红')).value('color__colors', 'description')
# 简写形式补充：
Clothes.objects.filter(color__colors='红').values('color__colors', 'description')
# 返回
>>> [{'description': u'\u7ea2\u5185\u8863', 'color__colors': u'\u7ea2'}, {'description': u'\u7ea2\u5185\u88e4', 'color__colors': u'\u7ea2'}]
# 如果不加values()，返回的是[<Clothes: 红T恤>, <Clothes: 红夹克>]这样的QuerySet集合，通过values可以形成一个列表，列表中的每一个元素是一个字典，可以通过list()将ValueQuerySet转化为列表，之后返回给template

# 另外可以通过.values_list()将QuerySet转化为ValuesListQuerySet。返回：[(u'\u7ea2', u'\u7ea2\u889c\u5b50'), (u'\u7ea2', u'\u7ea2\u889c\u5b50')]
#得到的是一个列表，列表中是多个元组，每个元组是ValuesQuerySet中字典的value，常用于从models里将数据取出后动态添加到前端模板中的select选项中。
#通过forms.py从models取值传给前端select选项，需重启django后，select选项才能更新，可在定义form时，添加如下关键字保障动态更新select选项
# forms.py
from django import forms
class ClothesForm(forms.Form):
    color = forms.IntegerField(required=True, widget=forms.Select(),) #定义这个关键字段，当使用form时，colors表新增了颜色，前端ClothesForm的color字段的选项会自动更新
    def __init__(self, *args, **kwargs):
        super(ClothesForm, self).__init__(*args, **kwargs)
        self.fields['color'].widget.choices=Colors.objects.all().order_by('id').values_list('id', 'colors')
```

### 增

```python
# 增添子表数据，形式与一对一一致
# 添加颜色为绿的服装：小绿
# 方法1：
Clothes.objects.create(color=Colors.objects.get(colors='绿'), description='小绿')
# 方法1补充：
Clothes.objects.create(color_id=Colors.objects.get(colors='绿').id, description='小绿')
# 方法2：
c_obj = Clothes(color=Colors.objects.get(colors='绿'), description='小绿')
c_obj.save()
# 方法3、4参考一对一
```

### 改

```python
# 颜色为红的服装，description都更新为红T恤
# 写法1：
Clothes.objects.filter(color__colors='红').update(description='红T恤')
# 写法2：
Clothes.objects.filter(color_id=Colors.objects.get(colors='红').id).update(description='红T恤')
# 写法3：
colors_obj = Colors.objects.get(colors='红')
colors_obj.clothes_set.filter(id__gte=1).update(description='红T恤')
# 其他写法参考一对一的修改和外键的查询
```

### 删

```python
Clothes.objects.get(description='灰裙子').delete()
Clothes.objects.filter(colors='灰').delete()
```

## 多对多

### 查

```python
# 多对多子表查询母表，查找小明喜欢哪些颜色--返回:[<Colors: 红>, <Colors: 黄>, <Colors: 蓝>]
# 与一对多子表查询母表的形式不同，因为一对多查询的是母表的"一"；多对多查询的是母表的"多"
# 写法1：
child_obj = Child.objects.get(name='小明')
child_obj.favor.all()
# 写法2，反向从母表入手：
Colors.objects.filter(child__name='小明')	# 母表对象.filter(子表表名小写__子表字段名='过滤条件')


# 多对多母表查询子表，查找有哪些人喜欢黄色--返回:[<Child: 小明>, <Child: 小红>]
# 与一对多母表查询子表的形式完全一致，因为查到的都是QuerySet，一对多和多对多，都是在查询子表的"多"
# 写法1：
color_obj = Colors.objects.get(colors='黄')
color_obj.child_set.all()
# 写法2：
Child.objects.filter(favor=Colors.objects.get(colors='黄'))
# 写法2简便写法：
Child.objects.filter(favor__colors='黄')
# 写法3：
color_id = Colors.objects.get(colors='黄').id
Child.objects.filter(favor=color_id)
```

### 增与改(增添子表或母表数据参照一对一的增，多对多重点在于关系表的对应关系变更)

```python
# 添加子表关联关系
# 添加小虎并让他喜欢所有颜色
# 写法1：
child_obj = Child.objects.create(name='小虎')
colors_obj = Colors.objects.all()
child_obj.favor.add(*colors_obj)
# 写法2：
child_obj = Child.objects.get(name='小虎')
colors_obj = Colors.objects.all()
child_obj.favor = colors_obj
child_obj.save()
# 让小虎喜欢黄色和蓝色(两种写法和上边一致，只展示一种写法)
child_obj = Child.objects.get(name='小虎')
colors_obj = Colors.objects.filter(colors__in=['蓝', '黄'])
child_obj.favor.clear()	# 清空小虎已经喜欢的颜色(清空该对象多对多中间表的所有数据)
child_obj.favor.add(*colors_obj)  # add是追加模式，如果当前小虎已经喜欢了绿色，那么执行后小虎喜欢绿色
child_obj = Child.objects.get(name='小虎')
colors_obj = Colors.objects.get(colors='绿')
child_obj.favor.clear()
child_obj.favor.add(colors_obj) # 单个对象不需要*

# 添加母表关联关系
# 通过反向插入(从母表入手)的写法
child_obj = Child.objects.get(name='小虎')
colors_obj = Colors.objects.get(name='蓝')
colors_obj.child_set.add(child_obj)
# 让所有人都喜欢蓝色
children_obj = Child.objects.all()
colors_obj = Colors.objects.get(colors='蓝')
colors_obj.child_set.add(*children_obj)
# 关于_set写法，只有子表才有"子表名(小写)_set"的写法，得到的是一个QuerySet集合，后面可以接.add(), .remove(), .update(), .delete(), .clear()
# 另外，colors_obj.child_set.clear()是让所有喜欢的颜色里去掉蓝色，colors_obj.child_set.all().delete()是删除.child_set的所有人
```

### 删

```python
# 删除子表与母表关联关系
# 让小虎不喜欢任何颜色
# 写法1：
child_obj = Child.objects.get(name='小虎')
child_obj.favor = ''
child_obj.save()
# 写法2：
child_obj = Child.objects.get(name='小虎')
colors_obj = Colors.objects.all()
child_obj.favor.remove(*colors_obj)
# 写法3：
child_obj = Child.objects.get(name='小虎')
child_obj.favor.clear()

# 删除母表与子表关联关系
# 让所有人不再喜欢蓝色
# 写法1：
children_obj = Child.objects.all()
colors_obj = Colors.objects.get(colors='蓝')
colors_obj.child_set.remove(*children_obj)
# 写法2：
colors_obj = Colors.objects.get(colors='蓝')
colors_obj.child_set.clear()
```

### 删除多对多表数据

```python
# 删除子表数据
# 喜欢蓝色的所有人都删掉
colors_obj = Colors.objects.get(colors='蓝')
colors_obj.child_set.all().delete()	# 注意有.all()
# 删除所有child
Child.objects.all().delete()
```

### choice

```python
# choices相当于一个简化版外键，将特定的值相关联
class Child(models.Model):
    gender_choice = (
    	(0, 'Male'),
        (1, 'Female'),
    )
    name = models.CharField(max_length=10)
    favor = models.ManyToManyField('Colors')
    gender = models.IntegerField(choices=gender_choice, default=0)

    def __str__(self):
        return self.name

# views.py中调用
child_obj = Child.objects.get('小虎')
child_obj.gender	# 返回0或者1
child_obj.get_sex_display()	# 返回Male或者Female
# 对于设置了choices的字段，django提供了get_(字段名)_display()的方法取得所要展示的值
```
