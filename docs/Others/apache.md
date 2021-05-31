# Apache

## 禁止某个目录访问

```
<Directory "${ProjectRoot}\files\license">
  Order allow,deny
  Deny from all
</Directory>
```
