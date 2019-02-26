<p align="center">
  <a href="https://github.com/zlq4863947/dripjs" target="blank">
    <img src="https://cdn.jsdelivr.net/npm/dripjs/dripjs.svg" width="320" alt="Dripjs Logo" />
  </a>
</p>
<p align="center">用于构建高效且可扩展的交易程序的渐进式Node.js开源量化框架</p>
<p align="center">
<a href="https://www.npmjs.com/package/dripjs"><img src="https://img.shields.io/npm/v/dripjs.svg" alt="NPM Version" />
<a href="https://www.npmjs.com/package/dripjs"><img src="https://img.shields.io/badge/license-GPL_3.0-green.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/dripjs"><img src="https://img.shields.io/npm/dm/dripjs.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.com/zlq4863947/dripjs"><img src="https://travis-ci.com/zlq4863947/dripjs.svg?branch=master&t=6" alt="Tiavis" /></a>
<a href="https://coveralls.io/github/zlq4863947/dripjs?branch=master"><img src="https://coveralls.io/repos/github/zlq4863947/dripjs/badge.svg?branch=master&t=6" alt="Coverage" /></a>
<a href="https://gitter.im/drip-js/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img src="https://badges.gitter.im/drip-js.svg" alt="Gitter" /></a>
<a href="https://www.paypal.me/zlq4863947"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
</p>

# 简介

see the <a href="https://github.com/zlq4863947/dripjs/blob/master/README_EN.md">English</a>

**Drip.js**旨在提供一个开箱即用的量化交易程序体系架构，允许开发者轻松创建高可用、可扩展且易于维护的量化交易程序。

## 设计哲学

让量化开发者将大部分精力、时间花费在核心:交易策略的开发上。
**Drip.js**提供除此之外的一切，使得开发者不必再为重复造轮子而苦恼

## 安装

由于此框架全部模块化，可以使用下面命令安装到您的程序中

```shell
npm install dripjs
```

如果只想用框架中的某子模块

```shell
// 假设想要使用bitmex api模块时
npm install dripjs-bitmex
```

## 使用

```typescript
import { IntelligenceFactory } from 'dripjs';

const pair = 'XBTUSD';
const bitmex = IntelligenceFactory.create(Bitmex, {
  apiKey: `xx`,
  apiSecret: `zz`,
  testnet: false,
});
bitmex.getTransaction$(pair).subscribe((transaction) => {
  console.log(transaction);
});
setTimeout(() => {
  bitmex.stopTransaction(pair);
  bitmex.destory();
}, 2000);
```

## 模块列表

| 模块名                                                       | 描述                                                 |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| [dripjs](https://www.npmjs.com/package/dripjs)               | 框架主模块，可使用全部子模块                         |
| [dripjs-common](https://www.npmjs.com/package/dripjs-common) | 通用函数模块                                         |
| [dripjs-types](https://www.npmjs.com/package/dripjs-types)   | 类型定义模块                                         |
| [dripjs-bitmex](https://www.npmjs.com/package/dripjs-bitmex) | bitmex 交易接口模块(包含 rest 接口和 websocket 接口) |

## 参考文档

- 设计[文档](https://github.com/zlq4863947/dripjs/tree/master/docs)
- 接口[文档](https://drip-trader.github.io/dripjs-docs)

## 框架功能

> 此框架正在开发中，暂定实现如下功能，以后会陆续增加其他功能

- 数据获取 - 通过交易所、数据库(回测时)
- 数据本地保存
- 方便日后回测
- 回测
- 生成策略模型
- 交易评级
- 实盘交易
