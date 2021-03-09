import { defineConfig } from 'dumi';

const repo = 'memo';

export default defineConfig({
  title: repo,
  favicon: '/images/icon.png',
  logo: '/images/icon.png',
  outputPath: 'docs-dist',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  mode: 'site',
  hash: false,
  base: '/',
  publicPath: '/',
});
