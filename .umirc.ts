import { defineConfig } from 'dumi';

const repo = 'memo';

export default defineConfig({
  title: repo,
  favicon: './images/icon.png',
  logo: './images/icon.png',
  outputPath: 'docs-dist',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  mode: 'site',
  history:
    process.env.NODE_ENV === 'production'
      ? { type: 'hash' }
      : { type: 'browser' },
  hash: false,
  base: process.env.NODE_ENV === 'production' ? '/memo/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/memo/' : '/',
});
