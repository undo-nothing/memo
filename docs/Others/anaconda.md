# Anaconda

## linux 安装

```
# 将anaconda的bin目录加入PATH，根据版本不同，也可能是~/anaconda3/bin
echo 'export PATH="~/anaconda2/bin:$PATH"' >> ~/.bashrc
# 更新bashrc以立即生效
source ~/.bashrc
```

## Conda 的环境管理

```bash
# 创建一个名为python37的环境
conda create --name python37 python=3.4

# 安装好后，使用activate激活某个环境
activate python37 # for Windows
source activate python37 # for Linux & Mac

# 退出环境
deactivate python37 # for Windows
source deactivate python37 # for Linux & Mac

# 删除一个已有的环境
conda remove --name python37 --all

# 查看当前环境下已安装的包
conda list

# 查看某个指定环境的已安装包
conda list -n python34

# 查找package信息
conda search numpy

# 安装package
conda install -n python34 numpy
# 如果不用-n指定环境名称，则被安装在当前活跃环境
# 也可以通过-c指定通过某个channel安装

# 更新package
conda update -n python34 numpy

# 删除package
conda remove -n python34 numpy
```

## 设置国内镜像

````bash
# 添加Anaconda的TUNA镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
# TUNA的help中镜像地址加有引号，需要去掉

# 设置搜索时显示通道地址
conda config --set show_channel_urls yes
```
````
