> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher → Object3D →*

# Scene(场景)

场景(Scene)允许你设置 three.js 要渲染的内容以及渲染发生的位置。网格(Mesh)、线条(Line)、灯光(Light)等 3D 对象都放置在这里。

## 构造函数

### new Scene()

创建一个新场景。

## 属性

### .background : Color | Texture

定义场景的背景。有效输入包括:

*   一个颜色值(Color),用于定义纯色背景。
*   一张纹理(Texture),用于定义(平面)纹理背景。
*   立方体贴图纹理或等距柱状(equirectangular)纹理,用于定义天空盒。

默认值为 `null`。

### .backgroundBlurriness : number

设置背景的模糊程度。仅对赋给 [Scene#background](Scene.html#background) 的环境贴图生效。有效输入为 `0` 到 `1` 之间的浮点数。

默认值为 `0`。

### .backgroundIntensity : number

衰减背景的颜色强度。仅对背景纹理生效。

默认值为 `1`。

### .backgroundRotation : Euler

背景的旋转量,以弧度为单位。仅对赋给 [Scene#background](Scene.html#background) 的环境贴图生效。

默认值为 `(0,0,0)`。

### .environment : Texture

为场景中所有物理材质设置环境贴图。但无法覆盖已赋给材质 `envMap` 属性的既有纹理。

默认值为 `null`。

### .environmentIntensity : number

衰减环境的颜色强度。仅对赋给 [Scene#environment](Scene.html#environment) 的环境贴图生效。

默认值为 `1`。

### .environmentRotation : Euler

环境贴图的旋转量,以弧度为单位。仅在场景使用 [Scene#environment](Scene.html#environment) 时对物理材质生效。

默认值为 `(0,0,0)`。

### .fog : Fog | FogExp2

一个雾(Fog)实例,定义影响场景中所有渲染对象的雾效类型。

默认值为 `null`。

### .isScene : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .overrideMaterial : Material

强制场景中的所有对象都使用指定材质渲染。可以通过将 [Material#allowOverride](Material.html#allowOverride) 设为 `false`,把某些材质排除在强制覆盖之外。

默认值为 `null`。

## 源码

[src/scenes/Scene.js](https://github.com/mrdoob/three.js/blob/master/src/scenes/Scene.js)
