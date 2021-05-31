# Dockerfile

## 什么是 Dockerfile

类似于脚本，将 docker 镜像，使用自动化的方式实现出来。

## Dockerfile 的作用

​ 找一个镜像： ubuntu

​ 创建一个容器： docker run ubuntu

​ 进入容器： docker exec -it 容器 命令

​ 操作： 各种应用配置

​ ....

​ 构造新镜像： docker commit

## Dockerfile 使用准则

1.大： 首字母必须大写 D

2.空： 尽量将`Dockerfile`放在空目录中。

3.单： 每个容器尽量只有一个功能。

4.少： 执行的命令越少越好。

## Dockerfile 使用命令

构建镜像命令格式

```
docker build -t [镜像名]:[版本号][dockerfile所在目录]
```

构建样例

```
docker build -t nginx:v0.2 /opt/dockerfile/nginx/
```

参数详解

- -t 指定构建后的镜像信息，
- `/opt/dockerfile/nginx/`则代表`Dockerfile`存放位置，如果是当前目录，则用 .(点)表示

## Dockerfile 基础指令详解

1. FROM

   ```
   格式：
   FROM <image>
   FROM <image>:<tag>。
   ```

   > 解释：FROM 是 `Dockerfile` 里的第一条而且只能是除了首行注释之外的第一条指令

2. MAINTAINER

   ```
   格式：
   MAINTAINER <name>
   ```

   > 解释：指定该`Dockerfile`文件的维护者信息。类似我们在 docker commit 时候使用-a 参数指定的信息

3. RUN

   ```
   格式：
   RUN <command>                                      (shell模式)
   RUN["executable", "param1","param2"]。            (exec 模式)
   ```

   > 解释：表示**当前镜像构建时候**运行的命令
   > shell 模式：类似于 /bin/bash -c command  
   > 举例： RUN echo hello  
   > exec 模式：类似于 RUN ["/bin/bash", "-c", "command"]  
   > 举例： RUN ["echo","hello"]

4. EXPOSE

   ```
   格式：
      EXPOSE <port> [<port>...]
   ```

   > 解释：
   > 设置 Docker 容器对外暴露的端口号，Docker 为了安全，不会自动对外打开端口，如果需要外部提供访问，还需要启动容器时增加-p 或者-P 参数对容器的端口进行分配。

5. ENTRYPOINT

   ```
   格式：
      ENTRYPOINT ["executable","param1","param2"]         (exec模式)
      ENTRYPOINT command param1 param2                     (shell模式)
   ```

   > 解释：每个 `Dockerfile` 中只能有一个 ENTRYPOINT，当指定多个时，只有最后一个起效。
