---
title: Memo
order: 10
hero:
  title: Memo
  actions:
    - text: GitHub
      link: https://github.com/undo-nothing/memo.git
footer: Open-source MIT Licensed | Copyright © 2021-present<br />Powered by undo
---

## 📒 目录介绍

```
├── docs                   文档存放路径
│   ├── index.md           首页展示
│   └── **.**              网站目录文档
├── .eslintrc.js           eslint 配置
├── .fatherrc.ts           father 配置
├── .umirc.ts              dumi 配置
└── tsconfig.json          typescript 配置
```

## 🤖 命令介绍

| 名称                  | 描述         | 备注                                                                 |
| --------------------- | ------------ | -------------------------------------------------------------------- |
| `npm run start`       | 项目启动     | 使用 [dumi](https://github.com/umijs/dumi)，组件开发和文档开发在一起 |
| `npm run docs:build`  | 文档打包     | -                                                                    |
| `npm run docs:deploy` | 文档发布     | 这里默认是使用了 GitHub Pages                                        |
| `npm run deploy`      | 文档打包发布 | -                                                                    |
