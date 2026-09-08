# three.js 中文文档

[![原项目](https://img.shields.io/badge/原项目-mrdoob--three.js-blue?style=flat-square&logo=github)](https://github.com/mrdoob/three.js)
[![微信联系](https://img.shields.io/badge/微信-uaycar-brightgreen?style=flat-square&logo=wechat)](#)

> 本文档是 [mrdoob/three.js](https://github.com/mrdoob/three.js) 官方 README 的中文翻译版本,版权归原作者所有。**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

## JavaScript 3D 库

该项目的目标是打造一个易用、轻量、跨浏览器、通用的 3D 库。当前官方构建只包含 WebGL 和 WebGPU 渲染器,但 SVG 和 CSS3D 渲染器也以插件(addons)形式提供。

相关链接:

[示例 Examples](https://threejs.org/examples/) &mdash;
[文档 Docs](https://threejs.org/docs/) &mdash;
[手册 Manual](https://threejs.org/manual/) &mdash;
[Wiki](https://github.com/mrdoob/three.js/wiki) &mdash;
[迁移指南](https://github.com/mrdoob/three.js/wiki/Migration-Guide) &mdash;
[提问 Questions](https://stackoverflow.com/questions/tagged/three.js) &mdash;
[论坛 Forum](https://discourse.threejs.org/) &mdash;
[Discord](https://discord.gg/56GBJwAnUS)

## 用法 Usage

下面这段代码会创建一个场景(scene)、一个相机(camera)和一个几何立方体,并把立方体加入场景。接着它为该场景和相机创建一个 `WebGL` 渲染器,并把渲染视口挂到 `document.body` 元素上。最后,它在场景内针对相机对立方体做逐帧动画。

```javascript
import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// 初始化

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

// 动画

function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}
```

如果一切顺利,你应该能看到官方在线演示的效果(见原 README 中的 jsfiddle 链接)。

## 克隆本仓库

连同完整历史一起克隆仓库会产生约 2 GB 的下载量。如果你不需要全部历史,可以使用 `depth` 参数显著减小下载体积。

```sh
git clone --depth=1 https://github.com/mrdoob/three.js.git
```

## 更新日志 Change log

版本发布记录见 [Releases](https://github.com/mrdoob/three.js/releases)。升级前建议阅读[迁移指南](https://github.com/mrdoob/three.js/wiki/Migration-Guide)。

---

**代部署 / 定制服务 / 技术咨询 请添加微信:uaycar**

本项目为 [mrdoob/three.js](https://github.com/mrdoob/three.js) 的中文翻译版本,所有代码版权归原项目作者所有,遵循其原始许可证。如果觉得有用,请给原项目点个 Star!⭐
