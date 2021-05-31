# Vagrant & Docker

> require
>
> - vritual box
> - vagrant
> - centos7 vagrant.box

## 安装 vagrant centos7

1. 配置 vagrantfile

```
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.6.0"

boxes = [
    {
        :name => "centos7-wdms",
        :eth1 => "192.168.205.140",
        :mem => "1024",
        :cpu => "1"
    }
]

Vagrant.configure(2) do |config|

  config.vm.box = "centos/7"
  boxes.each do |opts|
    config.vm.define opts[:name] do |config|
      config.vm.hostname = opts[:name]
      config.vm.provider "vmware_fusion" do |v|
        v.vmx["memsize"] = opts[:mem]
        v.vmx["numvcpus"] = opts[:cpu]
      end
      config.vm.provider "virtualbox" do |v|
        v.customize ["modifyvm", :id, "--memory", opts[:mem]]
        v.customize ["modifyvm", :id, "--cpus", opts[:cpu]]
      end
      config.vm.network :private_network, ip: opts[:eth1]
    end
  end
end
```

2. 安装并远程

```bash
vagrant up
vagrant ssh
su
```

3. 配置 xshell 远程

```bash
vim /etc/ssh/sshd_config
PasswordAuthentication yes
```

## centos7 Docker

### 安装 docker

[Docker 官网安装](https://docs.docker.com/engine/install/centos/)

[阿里云镜像参考](https://developer.aliyun.com/mirror/docker-ce?spm=a2c6h.13651102.0.0.12901b1171uGJ1)

```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
# step 1: 安装必要的一些系统工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Step 2: 添加软件源信息
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# Step 3
sudo sed -i 's+download.docker.com+mirrors.aliyun.com/docker-ce+' /etc/yum.repos.d/docker-ce.repo
# Step 4: 更新并安装Docker-CE
sudo yum makecache fast
sudo yum -y install docker-ce
# Step 4: 开启Docker服务
sudo service docker start
```

### 卸载 docker

```bash
sudo yum remove docker-ce docker-ce-cli containerd.io
sudo rm -rf /var/lib/docker
```

### 设置镜像加速器

[阿里云](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://slr9urwj.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 安装 docker-compose

[官方教程](https://docs.docker.com/compose/install/)

[daocloud 加速镜像](http://get.daocloud.io/#install-docker)

```bash
curl -L https://get.daocloud.io/docker/compose/releases/download/1.27.4/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

你可以通过修改 URL 中的版本，可以自定义您的需要的版本
