# OpenSSL

## 基础知识

- **SSL**

  SSL 证书也叫安全证书或者数字证书，SSL 证书是数字证书的一种，跟驾驶证、护照、营业执照电子副本类似。SSL 证书是一种国际通用的 Web 安全标准，主要通过对敏感数据加密来防止各种攻击非法读取重要信息，保证数据的完整性和安全性，避免受到数据劫持和钓鱼攻击等。

- **HTTPS**

  HTTPS （全称：Hyper Text Transfer Protocol over SecureSocket Layer），是以安全为目标的 HTTP 通道，在 HTTP 的基础上通过传输加密和身份认证保证了传输过程的安全性 。HTTPS 在 HTTP 的基础下加入 SSL 层，HTTPS 的安全基础是 SSL，因此加密的详细内容就需要 SSL。

- **CA 机构颁发 SSL 证书**

  CA(Certificate Authority)就是电子认证的意思。权威可靠的 CA 机构有挺多的，比如国外的有：Comodo、RapidSSL、GeoTrust，国内的有：CFCA(中国人民银行联合 12 家银行建立的金融 CFCA 安全认证中心)、CTCA(中国电信认证中心)
  CA 机构颁发 SSL 证书是受信任的 SSL 证书，会被浏览器信任认可，安全加密服务与安全扫描相关 CA 配套服务。

- **自签名 SSL 证书**

  自己生成的 SSL 证书，不是 CA 机构颁发的 SSL 证书，就是自签名证书。自签名 SSL 证书不会被浏览器信任，数据被泄漏级劫持安全漏洞安全风险较高。可以在 PC 上安装自签名 SSL 证书对应的公钥证书，使浏览器信任认可。

  自签名的 SSL 证书也存在一些安全隐患：

  - 最容易受到 SSL 中间人攻击
  - 支持非常不安全的 SSL V2.0 协议
  - 支持使用不安全的 1024 位非对称密钥对（加长密钥 2048）

## 生成 CA 根证书

1. 生成 ca 密钥，得到 ca.key

```
openssl genrsa -out ca.key 4096
```

2. 生成 ca 证书签发请求，得到 ca.csr

```
openssl req \
  -new \
  -sha256 \
  -out ca.csr \
  -key ca.key \
  -config ca.conf

Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:XXX
Locality Name (eg, city) [Default City]:
Organization Name (eg, company) [Default Company Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:XXX CA
Email Address []:

A challenge password []:
An optional company name []:
```

以上内容选填

3. 生成 ca 根证书，得到 ca.crt

```
openssl x509 \
    -req \
    -days 3650 \
    -in ca.csr \
    -signkey ca.key \
    -out ca.crt
```

## 生成签名 ssl 证书

1. 生成秘钥，得到 server.key

```
openssl genrsa -out server.key 2048
```

2. 生成证书签发请求，得到 server.csr

```
openssl req \
  -new \
  -sha256 \
  -out server.csr \
  -key server.key

Country Name (2 letter code) [XX]:CN
State or Province Name (full name) []:
Locality Name (eg, city) [Default City]:
Organization Name (eg, company) [Default Company Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (eg, your name or your server's hostname) []:****
Email Address []:

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:******
An optional company name []:
```

以上内容选填

3. 生成公钥配置文件，alt_names 内包括所有合法的浏览器访问地址，不包括在内的访问会被浏览器标识为不安全

```
vi server.conf
```

```
[ req ]
req_extensions = req_ext

[ req_ext ]
subjectAltName = @alt_names

[alt_names]
DNS.1   = www.dns1.com
DNS.2   = www.dns2.com
IP.1    = XXX.XXX.XXX.XXX
IP.2    = XXX.XXX.XXX.XXX
```

3. 用 CA 证书生成终端用户证书，得到 server.crt

```
openssl x509 -req \
  -days 3650 \
  -CA ca.crt \
  -CAkey ca.key \
  -CAcreateserial \
  -in server.csr \
  -out server.crt \
  -extensions req_ext \
  -extfile server.conf
```

## Apache ssl 证书使用

[腾讯云文档 Apache 服务器 SSL 证书安装部署](https://cloud.tencent.com/document/product/400/35243)

## Nginx ssl 证书使用

[腾讯云文档 Apache 服务器 SSL 证书安装部署](https://cloud.tencent.com/document/product/400/35244)
