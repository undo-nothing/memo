# 代码备忘

## 修改系统环境变量 path

```python
def add_system_path(path_value, end=True):
    if platform.system() == 'Windows':
        import winreg
        key = winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE,
                               'SYSTEM\ControlSet001\Control\Session Manager\Environment')
        values = winreg.QueryValueEx(key, 'Path')[0].split(';')
        if path_value not in values:
            if end:
                values.append(path_value)
            else:
                values.insert(0, path_value)
            save_data = ';'.join(values)
            assert len(save_data) < 1024, 'Path length must less 1024.'
            winreg.SetValueEx(key, 'Path', 0, winreg.REG_SZ, save_data)
```
