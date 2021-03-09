# Dockerfile/Docker-compose

## 1. 什么是 Dockerfile

- 类似于脚本，将 docker 镜像，使用自动化的方式实现出来。

## 2.Dockerfile 的作用

​ 找一个镜像： ubuntu

​ 创建一个容器： docker run ubuntu

​ 进入容器： docker exec -it 容器 命令

​ 操作： 各种应用配置

​ ....

​ 构造新镜像： docker commit

## 3.Dockerfile 使用准则

1.大： 首字母必须大写 D

2.空： 尽量将`Dockerfile`放在空目录中。

3.单： 每个容器尽量只有一个功能。

4.少： 执行的命令越少越好。

###1.Dockerfile 使用命令

- 构建镜像命令格式：

  - docker build -t [镜像名]:[版本号][dockerfile所在目录]

- 构建样例：

  - ```
    docker build -t nginx:v0.2 /opt/dockerfile/nginx/
    ```

- 参数详解：

  - -t 指定构建后的镜像信息，
  - `/opt/dockerfile/nginx/`则代表`Dockerfile`存放位置，如果是当前目录，则用 .(点)表示

## Dockerfile 快速入门

### 1.**准备环境**

1. 创建`Dockerfile`专用目录

- ```
  - mkdir/docker/images/ssh -p
  - cd/docker/images/ssh
  ```

- ```
  - ssh-keygen-t rsa
  - cat~/.ssh/id_rsa.pub > authorized_keys
  ```

* ```
  cp/etc/apt/sources.list ./
  ```

### 2. 增加软件源

- ```
  ADD sources.list /etc/apt/sources.list
  ```

### 3. 安装 ssh 服务

- ```
  RUN apt-get update && apt-get install -y openssh-server curl vim net-tools&& mkdir -p /var/run/sshd && mkdir -p /root/.ssh && sed-i "s/.*pam_loginuid.so/#&/" /etc/pam.d/sshd && apt-getautoclean && apt-get clean && apt-get autoremove
  ```

1. 复制配置文件到相应位置,并赋予脚本可执行权限

   - ```
     ADD authorized_keys /root/.ssh/authorized_keys
     ```

2. 对外端口

   - ```
     EXPOSE 22
     ```

3. 启动 ssh

   - ```
     ENTRYPOINT["/usr/sbin/sshd","-D"]
     ```

1) **构建镜像**

```
docker build -t ubuntu -ssh .
```

1. **效果查看**

   - ```
     使用新镜像启动一个容器，查看效果
     docker run -d -p 10086:22 ubuntu-ssh

     容器检查
     docker ps
     docker port c03d146b64d4

     ssh查看效果
     ssh 192.168.8.14 -p 10086
     ```

## 基础指令详解

1. FROM

   ```
   格式：
   FROM <image>
   FROM <image>:<tag>。
   ```

   解释：

   - FROM 是 `Dockerfile` 里的第一条而且只能是除了首行注释之外的第一条指令

2. MAINTAINER

   ```
   格式：
   MAINTAINER <name>
   ```

   解释：

   - 指定该`Dockerfile`文件的维护者信息。类似我们在 docker commit 时候使用-a 参数指定的信息

3. RUN

   ```
   格式：
   RUN <command>                                      (shell模式)
   RUN["executable", "param1","param2"]。            (exec 模式)
   ```

   解释：

   - 表示**当前镜像构建时候**运行的命令
   - 注释：
     - shell 模式：类似于 /bin/bash -c command
       - 举例： RUN echo hello
     - exec 模式：类似于 RUN ["/bin/bash", "-c", "command"]
       - 举例： RUN ["echo","hello"]

4. EXPOSE

   ```
   格式：
      EXPOSE <port> [<port>...]
   ```

   解释：

   - 设置 Docker 容器对外暴露的端口号，Docker 为了安全，不会自动对外打开端口，如果需要外部提供访问，还需要启动容器时增加-p 或者-P 参数对容器的端口进行分配。

5. ENTRYPOINT

   ```
   格式：
      ENTRYPOINT ["executable","param1","param2"]         (exec模式)
      ENTRYPOINT command param1 param2                     (shell模式)
   ```

   解释：

   - 每个 `Dockerfile` 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。

## docker，docker-compose 安装

#### 第一步

- 切换 yum 源：
  - https://blog.csdn.net/wangshuminjava/article/details/84380308
  - https://blog.csdn.net/qq_39157144/article/details/94717837

#### 第二步

#### 1. 安装 docker

- Centos：https://www.runoob.com/docker/centos-docker-install.html
- Ubuntu：https://www.cnblogs.com/leoshi/archive/2004/01/13/12742276.html

#### 2.安装 docker-compose

- 下载地址：http://get.daocloud.io/
- apt 地址：https://blog.csdn.net/diligent_lee/article/details/79098302

#### 第三步

#### 1. 把项目放到服务器上

- 比如： 在 home 目录下建一个 root 文件夹,把项目放在里面

#### 2.在项目应用目录下建 `Dockerfile` 文件

```dockerfile
# 从仓库拉取 带有 python 3.7 的 Linux 环境
FROM python:3.7

# 设置 python 环境变量
ENV PYTHONUNBUFFERED 1

# 添加这两行
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev -y

# 创建 code 文件夹并将其设置为工作目录
RUN mkdir /code
WORKDIR /code
# 更新 pip
RUN pip install pip -U -i https://mirrors.aliyun.com/pypi/simple/
# 将 requirements.txt 复制到容器的 code 目录
ADD requirements.txt /code/
# 安装库 并使用阿里源安装
RUN pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
# 将当前目录复制到容器的 code 目录
ADD . /code/
```

| `FROM python:3.7`             | 指令从仓库拉取一个包含 python 3.7 的 Linux 操作系统环境                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `RUN` 和 `WORKDIR`            | 指令都是针对容器的，功能是在**docker 容器里**创建目录、并将其设置为工作目录；注意**宿主机**是没有这个目录的 |
| `ADD requirements.txt /code/` | 意思是将**宿主机**当前目录（即 `Dockerfile` 所在目录）的 `requirements.txt` 文件复制到容器的 `/code` 目录中 |
| `ADD . /code/`                | 把当前目录所有内容复制到容器 `/code/` 目录，注意中间那个**点**                                              |

#### 3.在项目根目录下建 `docker-compose.yml`文件

```
version: "3"
services:
  app:
    restart: always
    build: .  # '点'代表当前目录
    dockerfile:./c/d/Dockerfile
    command: "python3 manage.py runserver 0.0.0.0:8000"
    volumes:
      - .:/code
    ports:
      - "8000:8000"
    depends_on:
      - db
    container_name: docker-web-container
  db:
    image: mysql:5.7
    volumes:
      - "./mysql:/var/lib/mysql"
    ports:
      - "3306:3306"
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=mypassword
      - MYSQL_DATABASE=django_app
```

|     常用参数     |                                                                                                                                                           |
| :--------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    `version`     | 代表 `docker-compose.yml` 的版本，目前最新版为 3                                                                                                          |
|    `restart`     | 除正常工作外，容器会在任何时候重启，比如遭遇 bug、进程崩溃、docker 重启等情况                                                                             |
|     `build`      | 指定一个包含`Dockerfile`的路径，并通过此 `Dockerfile` 来构建容器镜像。注意那个 **"."** ,代表当前目录                                                      |
|   `dockerfile`   | 如果需要指定额外的编译镜像的`Dockefile` 文件，可以通过该指令来指定。                                                                                      |
|    `command`     | 容器运行时需要执行的命令。这里就是我们很熟悉的运行开发服务器了                                                                                            |
|    `volumes`     | **卷，这是个很重要的概念**。宿主机和容器目录的映射。                                                                                                      |
|     `ports`      | 定义了宿主机和容器的端口映射；**宿主机端口映射到本容器的端口**                                                                                            |
|   `depends_on`   | 意思是此容器需要等待 `db` 容器启动完毕才能够启动                                                                                                          |
|     `image`      | 从仓库拉取 MySQL 5.7 镜像。可以自己定版本                                                                                                                 |
| `container_name` | 指定容器名称。默认将会使用 `项目名称_服务名称_序号` 这样的格式。 需要注意，指定容器名称后，该服务将无法进行扩展，因为 Docker 不允许多个容器具有相同的名称 |
|  `environment`   | 定义容器的环境变量，设置了 MySQL 的 root 用户的密码、数据库的名称。                                                                                       |
|     其他参数     |                                                                                                                                                           |
| `cgroup_parent`  | 指定父`cgroup` 组，意味着将继承该组的资源限制。 例如：`cgroup_parent: cgroups_1`                                                                          |
|    `devices`     | 指定设备映射关系。 例如: devices: \- "/dev/ttyUSB1:/dev/ttyUSB0"                                                                                          |
|      `dns`       | 自定义 DNS 服务器。可以是一个值，也可以是一个列表。                                                                                                       |
|   `dns_search`   | 配置 DNS 搜索域。可以是一个值，也可以是一个列表。                                                                                                         |
|     `expose`     | 暴露端口，但不映射到宿主机，只被连接的服务访问。                                                                                                          |
|    `extends`     | 基于其它模板文件进行扩展。 例如我们已经有了一个 `webapp` 服务，定义一个基础模板文件为 `common.yml`。                                                      |
|     详细链接     | `https://blog.csdn.net/jiangyu1013/article/details/82772363`                                                                                              |

#### 4.修改 Django 的 setting.py 中数据库的配置

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'django_app',
        'USER': 'root',
        'PASSWORD': 'mypassword',
        'HOST': 'db', #注意 HOST 填写的是docker容器的名称，即 db
        'PORT': '3306',
        'OPTIONS': {'charset': 'utf8'},
    }
}
```

<u>注意：请先确认没有其他程序占用了 3306 端口，比如宿主机安装的 MySQL。</u>

#### 5.运行 docker

```dockerfile
docker-compose up
```

#### 第四步安装`nginx`

#### 1.安装`nginx`

```yum install nginx
yum install nginx
```

#### 2.进入`nginx`的目录

```
cd /etc/nginx/conf.d
```

#### 3.编辑你的前端项目配置

```
vi your_name.conf
```

`**your_name.conf` 是自己随便取的名字,只要是`xxx.conf`就行\*\*

```nginx
server {
    listen 80;
    server_name localhost; #有域名放域名,没域名就是 localhost

    location / {
        root /wwwroot/h5; #这里放前端项目目录地址
        index index.html;
    }
}
```

保存退出编辑

---

#### 额外：

虚拟机 ping 不通百度：https://blog.csdn.net/shunnianlv/article/details/89247215

## BioTime2.7 部署--使用 dockerfile/docker-compose

#### 1. 确定服务，为每个服务编写一个`dockerfile`文件，生成单独的容器，使用`docker-compose`关联。

- 哥伦比亚为例

  - `nignx`

    - ```dockerfile
      FROM nginx:1.12.0

      RUN rm -rf /etc/nginx/nginx.conf
      COPY ./compose/production/nginx/nginx.conf /etc/nginx/
      ```

  - `postgres`

    - ```dockerfile
      FROM postgres:11

      COPY ./compose/production/postgres/postgresql.conf /postgresql.conf

      COPY ./compose/production/postgres/backup.sh /usr/local/bin/backup
      RUN chmod +x /usr/local/bin/backup

      COPY ./compose/production/postgres/restore.sh /usr/local/bin/restore
      RUN chmod +x /usr/local/bin/restore

      COPY ./compose/production/postgres/list-backups.sh /usr/local/bin/list-backups
      RUN chmod +x /usr/local/bin/list-backups
      ```

  - `redis`

    - ```dockerfile
      FROM redis:5.0
      ```

  - `web`

    - ```dockerfile
      FROM python:2.7

      RUN apt-get update && \
          apt-get install -y openssl build-essential libopenblas-dev \
          netcat \
          gettext

      ENV PYTHONDONTWRITEBYTECODE 1
      ENV PYTHONUNBUFFERED 1
      RUN  mkdir /app
      COPY . /app
      COPY ./compose/production/web/point.sh /point.sh
      RUN chmod +x /entrypoint.sh
      EXPOSE 8000
      WORKDIR /app
      ENV PIPENV_VENV_IN_PROJECT 1

      RUN pip install -r requirments.txt
      ```

  - `memcached`

    - ```dockerfile
      ############################################################
      # Dockerfile to run Memcached Containers
      # Based on Ubuntu Image
      ############################################################

      # Set the base image to use to Ubuntu
      FROM ubuntu

      # Set the file maintainer (your name - the file's author)
      MAINTAINER cSphere

      然后我们就可以开始安装Memcached
      # Install Memcached
      RUN apt-get install -y memcached

      设置默认对外开放的容器端口：
      # Port to expose (default: 11211)
      EXPOSE 11211

      设置默认的执行命令和入口（例如Memcached进程）：
      # Set the user to run Memcached daemon
      USER daemon

      # Set the entrypoint to memcached binary
      ENTRYPOINT memcached

      # Default Memcached run command arguments
      CMD ["-u", "root", "-m", "128"]
      ```

#### 2. 编写`docker-compose.yml`

- ```shell
  version: '2'
  services:
    nginx:
      build:
        context: .
        dockerfile: ./compose/production/nginx/Dockerfile
      restart: unless-stopped
      container_name: nginx
      ports:
        - "8001:8001"
        - "8000:8000"
      volumes:
        - .:/app
        - ./compose/production/nginx/conf.d:/etc/nginx/conf.d
      depends_on:
        - web

    web:
      build:
        context: .
        dockerfile: ./compose/production/web/Dockerfile
      restart: unless-stopped
      container_name: django
      command: bash -c "python manage.py migrate && python manage.py collectstatic --noinput && python manage.py createdefault && gunicorn mysite.wsgi --worker-class=gevent -b 0.0.0.0:8000 -w 4"
      depends_on:
        - db
        - redis
      volumes:
        - .:/app
      expose:
        - "8000"
      env_file: .env

    db:
      build:
        context: .
        dockerfile: ./compose/production/postgres/Dockerfile
      restart: unless-stopped
      container_name: postgres
      volumes:
        - ./compose/production/postgres/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d
      ports:
        - "5432:5432"
      env_file: .env

    redis:
      image: redis:3.0
      restart: unless-stopped
      container_name: redis
      command: redis-server /usr/local/etc/redis/redis.conf
      volumes:
       - ./compose/production/redis/redis.conf:/usr/local/etc/redis/redis.conf

    memcached:
      build:
        context: .
        dockerfile: ./compos/production/memcached/Dockerfile
      image: memcached
      restart: unless-stopped
      ports:
       - 11211:11211
      container_name: col-memcached

    worker:
      build:
        context: .
        dockerfile: ./compose/production/web/Dockerfile
      restart: unless-stopped
      container_name: celery_worker
      command: bash -c "python manage.py celery worker -c 20 --loglevel=info"
      volumes:
        - .:/app
      depends_on:
        - redis
      links:
        - redis
      env_file: .env
  ```

#### 3. 若以上信息都编写完成

- 执行：`docker-compose build/docker-compose up`开始创建镜像

#### 4. 安装，部署错误解决

1. 执行`docker-compose up`中出现问题。

   - 解决思路：
     - 文件提示为缺少文件，因为 python 版本问题，需要在 Docker 中下安装`pyodbc`的相关依赖。
     - 修改 web 下`dockerfile`文件。

2. 在运行至`requirements.txt`报错。

   - 解决思路：

     - 出现此错误，一般是因为多次执行了`docker-compose build`导致。

       解决方法：执行`docker-compose down`

     - 还有一种可能就是需要添加镜像源。

   - 若出现此情况，需要换镜像源。

3) 安装相关依赖出现报错。

   - 解决思路：

     - 可能是网络问题，再次执行`docker-compose build`，若不行在看以下方法。

     - 更新文件，Error 报的信息显示是这个包向 source 里的资源下载失败了，但是原因是多种多样的，这里做了个总结

     - source 本身的问题，根据提示，我们首先应当 apt-get update 一下 source,如果在 apt-get update 后依然报这个 error，那就说明这个 source 本省就有错误，尝试 apt-get update--fix-missing 后依旧报这个 error，果断换 source。

     - 输入命令：`sudo cp sources.list sources.list.bak`就是先将`sources.list`备份到`sources.list.bak`将 /etc/apt/sources.list 的内容换成：最后`sudo apt-get update`一下就 OK 了

     - ```shell
       # deb cdrom:[Ubuntu 16.04 LTS _Xenial Xerus_ - Release amd64 (20160420.1)]/ xenial main restricted
       deb-src http://archive.ubuntu.com/ubuntu xenial main restricted #Added by software-properties
       deb http://mirrors.aliyun.com/ubuntu/ xenial main restricted
       deb-src http://mirrors.aliyun.com/ubuntu/ xenial main restricted multiverse universe #Added by software-properties
       deb http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted
       deb-src http://mirrors.aliyun.com/ubuntu/ xenial-updates main restricted multiverse universe #Added by software-properties
       deb http://mirrors.aliyun.com/ubuntu/ xenial universe
       deb http://mirrors.aliyun.com/ubuntu/ xenial-updates universe
       deb http://mirrors.aliyun.com/ubuntu/ xenial multiverse
       deb http://mirrors.aliyun.com/ubuntu/ xenial-updates multiverse
       deb http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse
       deb-src http://mirrors.aliyun.com/ubuntu/ xenial-backports main restricted universe multiverse #Added by software-properties
       deb http://archive.canonical.com/ubuntu xenial partner
       deb-src http://archive.canonical.com/ubuntu xenial partner
       deb http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted
       deb-src http://mirrors.aliyun.com/ubuntu/ xenial-security main restricted multiverse universe #Added by software-properties
       deb http://mirrors.aliyun.com/ubuntu/ xenial-security universe
       deb http://mirrors.aliyun.com/ubuntu/ xenial-security multiverse
       ```

4) 安装 docker 执行：`sudo apt-get remove docker docker-engine docker.io`

   ```
   报错：
   E: 无法获得锁 /var/lib/dpkg/lock - open (11: 资源暂时不可用)
   E: 无法锁定管理目录(/var/lib/dpkg/)，是否有其他进程正占用它？

   ```

   解决：`ps -e | grep apt`删除进程`kill -9 xx`

## 修改记录

| 作者  | 描述 |    时间    |
| :---: | :--: | :--------: |
| Hardy | 初稿 | 2020-12-28 |
