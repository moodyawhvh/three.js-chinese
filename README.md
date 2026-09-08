<div align="center">

# three.js 中文翻译版

**[中文版] three.js — 轻量易用、跨浏览器的 JavaScript 3D 图形库**

[![原项目](https://img.shields.io/badge/原项目-mrdoob--three.js-blue?style=flat-square&logo=github)](https://github.com/mrdoob/three.js)
[![中文文档](https://img.shields.io/badge/中文文档-README.zh--CN.md-orange?style=flat-square)](README.zh-CN.md)
[![GitHub Stars](https://img.shields.io/github/stars/mrdoob/three.js?style=flat-square&label=原项目Stars)](https://github.com/mrdoob/three.js/stargazers)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

</div>

---

> 这是 [mrdoob/three.js](https://github.com/mrdoob/three.js) 的中文翻译版本。
> 完整源代码请访问原项目:https://github.com/mrdoob/three.js

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

## 📖 项目简介

three.js 是一个旨在做到易用、轻量、跨浏览器、通用的 JavaScript 3D 库。当前官方构建只包含 WebGL 与 WebGPU 渲染器,但 SVG 和 CSS3D 渲染器也以插件(addons)形式提供。它是网页端 3D 可视化、数据展示、游戏与交互演示领域事实上的标准库之一。

## ✨ 主要特性

- **WebGL + WebGPU 双渲染器**:官方构建内置,覆盖现代浏览器主流图形接口
- **SVG / CSS3D 渲染器**:以 addons 形式提供,满足特殊渲染与降级需求
- **轻量跨浏览器**:专注核心 3D 能力,体积极小,各主流浏览器均可运行
- **易用 API**:场景、相机、几何体、材质、网格等概念清晰,几行代码即可跑起来
- **内置动画循环**:通过 `setAnimationLoop` 一行代码驱动逐帧渲染
- **海量官方示例**:数百个可直接运行的在线示例,覆盖常见 3D 场景
- **文档 / 手册 / Wiki 齐全**:官方文档、手册、迁移指南与社区问答一应俱全
- **活跃社区**:Discord、论坛、StackOverflow 上有大量使用者与开发者
- **npm 一键安装**:`three` 包发布于 npm,支持 jsDelivr 等 CDN 直接引用

## 📁 文件说明

| 文件 | 说明 |
|:-----|:-----|
| README.md | 本文件(中文简介) |
| README.zh-CN.md | 详细中文文档(完整汉化) |

## 🚀 快速开始

1. 用 npm 安装 three 库:

```sh
npm install three
```

2. 创建场景、相机、立方体,并用 WebGL 渲染器渲染(完整示例):

```javascript
import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
```

3. 一切正常的话,你会看到一个旋转的立方体效果(官方在线演示见原文档链接)。
4. 不需要完整历史记录的话,建议浅克隆仓库以大幅减少下载体积(完整历史约 2 GB):

```sh
git clone --depth=1 https://github.com/mrdoob/three.js.git
```

5. 升级版本前请先阅读官方 [迁移指南](https://github.com/mrdoob/three.js/wiki/Migration-Guide),版本变更日志见 [Releases](https://github.com/mrdoob/three.js/releases)。

完整源代码与最新版本请访问原项目:https://github.com/mrdoob/three.js

## 📞 联系方式

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

---

本项目为 [mrdoob/three.js](https://github.com/mrdoob/three.js) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证。

**如果觉得有用,请给原项目点个 Star!** ⭐
