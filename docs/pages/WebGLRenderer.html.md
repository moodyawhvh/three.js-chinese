> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

# WebGLRenderer

该渲染器使用 WebGL 2 来显示场景。

自 `r163` 起不再支持 WebGL 1。

> 📝 本页原文超过 10000 字符,以下仅翻译核心章节(概述、构造函数、常用属性与方法);其余方法与类型定义(如 `Capabilities`、`Info`、`Options`、`ShadowMap` 等)请参阅[英文原版](https://github.com/mrdoob/three.js/blob/master/docs/pages/WebGLRenderer.html.md)。

## 构造函数

### new WebGLRenderer( parameters : WebGLRenderer~Options )

创建一个新 WebGL 渲染器。

**parameters**

配置参数。

## 属性

### .autoClear : boolean

渲染每一帧之前是否自动清空输出。

默认值为 `true`。

### .autoClearColor : boolean

当 [WebGLRenderer#autoClear](WebGLRenderer.html#autoClear) 为 `true` 时,是否清空颜色缓冲区。

默认值为 `true`。

### .autoClearDepth : boolean

当 [WebGLRenderer#autoClear](WebGLRenderer.html#autoClear) 为 `true` 时,是否清空深度缓冲区。

默认值为 `true`。

### .autoClearStencil : boolean

当 [WebGLRenderer#autoClear](WebGLRenderer.html#autoClear) 为 `true` 时,是否清空模板缓冲区。

默认值为 `true`。

### .capabilities : WebGLRenderer~Capabilities

保存当前渲染上下文能力(capabilities)的详细信息。

### .clippingPlanes : Array.<Plane>

用户自定义的裁剪平面,使用世界坐标。这些平面全局生效。空间中与平面点积为负的点会被裁掉。

### .coordinateSystem : WebGLCoordinateSystem | WebGPUCoordinateSystem (只读)

定义渲染器的坐标系。

在 `WebGLRenderer` 中,该值始终为 `WebGLCoordinateSystem`。

默认值为 `WebGLCoordinateSystem`。

### .debug : Object

包含调试配置项的对象。

*   `checkShaderErrors`: 若为 `true`,定义是否在编译与链接过程中检查材质着色器程序的错误。在生产环境中关闭该检查可以提升性能;但强烈建议在开发阶段保持开启。若着色器未能编译和链接,它将无法工作,对应材质也不会被渲染。
*   `onShaderError(gl, program, glVertexShader,glFragmentShader)`: 可用于自定义错误上报的回调函数。回调会收到 WebGL 上下文、一个 WebGLProgram 实例,以及分别代表顶点着色器与片元着色器的两个 WebGLShader 实例。指定自定义函数会停用默认的错误上报。

### .domElement : HTMLCanvasElement | OffscreenCanvas

渲染器绘制输出的画布。若未提供,渲染器会在构造函数中自动创建;你只需把它加进页面:

```js
document.body.appendChild( renderer.domElement );
```

### .extensions : Object

提供获取与检测 WebGL 扩展的方法。

*   `get(extensionName:string)`: 用于检查某个 WebGL 扩展是否受支持,可用时返回扩展对象。
*   `has(extensionName:string)`: 若扩展受支持则返回 `true`。

### .info : WebGLRenderer~Info

保存一系列关于 GPU 内存与渲染过程的统计信息,对调试与监控很有用。

默认情况下,这些数据在每次渲染调用时重置;但当每帧存在多次渲染通道时(例如使用后期处理),更适合按自定义节奏重置。首先,把 `autoReset` 设为 `false`:

```js
renderer.info.autoReset = false;
```

然后在每帧渲染完成后调用 `reset()`:

```js
renderer.info.reset();
```

### .isWebGLRenderer : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .localClippingEnabled : boolean

渲染器是否支持对象级裁剪平面。

默认值为 `false`。

### .outputColorSpace : SRGBColorSpace | LinearSRGBColorSpace

定义渲染器的输出色彩空间。

默认值为 `SRGBColorSpace`。

### .properties : Object

用于追踪其他对象(例如原生 WebGL 对象)的属性。

### .renderLists : Object

管理渲染器的渲染列表。

### .shadowMap : WebGLRenderer~ShadowMap

管理阴影的接口。

### .sortObjects : boolean

渲染器是否对对象进行排序。

注意:排序是为了尽量正确渲染含有一定透明度的对象。从原理上讲,排序并非在所有情况下都有效。根据应用的需要,也可能需要关闭排序并改用其他手段处理透明渲染,例如手动确定每个对象的渲染顺序。

默认值为 `true`。

### .state : Object

管理 WebGL 状态的接口。

### .toneMapping : NoToneMapping | LinearToneMapping | ReinhardToneMapping | CineonToneMapping | ACESFilmicToneMapping | CustomToneMapping | AgXToneMapping | NeutralToneMapping

渲染器的色调映射(tone mapping)技术。

默认值为 `NoToneMapping`。

### .toneMappingExposure : number

色调映射的曝光级别。

默认值为 `1`。

### .transmissionResolutionScale : number

透射(transmission)渲染目标的归一化分辨率缩放,以视口尺寸的百分比计。使用 [MeshPhysicalMaterial#transmission](MeshPhysicalMaterial.html#transmission) 时,调低该值可显著提升性能。

默认值为 `1`。

### .xr : WebXRManager

XR 管理器的引用。

## 方法

### .clear( color : boolean, depth : boolean, stencil : boolean )

告诉渲染器清空其颜色、深度或模板绘图缓冲区。该方法会把缓冲区初始化为当前清除色。

**color**

是否清空颜色缓冲区。

默认值为 `true`。

**depth**

是否清空深度缓冲区。

默认值为 `true`。

**stencil**

是否清空模板缓冲区。

默认值为 `true`。

### .clearColor()

清空颜色缓冲区。等价于调用 `renderer.clear( true, false, false )`。

### .clearDepth()

清空深度缓冲区。等价于调用 `renderer.clear( false, true, false )`。

### .clearStencil()

清空模板缓冲区。等价于调用 `renderer.clear( false, false, true )`。

### .compile( scene : Object3D, camera : Camera, targetScene : Scene ) : Set.<Material>

使用指定相机预编译场景中的所有材质。适合在首次渲染之前预编译着色器。若要向既有场景添加 3D 对象,可使用第三个可选参数指定目标场景。

注意:调用该方法前必须先配置好(目标)场景的光照与环境。

**scene**

要预编译的场景或其他类型的 3D 对象。

**camera**

相机。

**targetScene**

目标场景。

默认值为 `null`。

**返回值:** 预编译完成的材质集合。

### .compileAsync( scene : Object3D, camera : Camera, targetScene : Scene ) : Promise (async)

[WebGLRenderer#compile](WebGLRenderer.html#compile) 的异步版本。

该方法利用了 `KHR_parallel_shader_compile` WebGL 扩展,因此建议尽可能使用该版本的 `compile()`。

**scene**

要预编译的场景或其他类型的 3D 对象。

**camera**

相机。

**targetScene**

目标场景。

默认值为 `null`。

**返回值:** 一个 Promise,在给定场景可以渲染、且不会因着色器编译产生不必要卡顿时兑现。

### .dispose()

释放该实例分配的 GPU 相关资源。当应用中不再使用该实例时,应调用此方法。

### .getClearColor( target : Color ) : Color

返回清除色。

**target**

方法会把结果写入该目标对象。

**返回值:** 清除色。

### .getContext() : WebGL2RenderingContext

返回渲染上下文。

**返回值:** 渲染上下文。

### .getPixelRatio() : number

返回像素比。

**返回值:** 像素比。

### .getRenderTarget() : WebGLRenderTarget

返回当前激活的渲染目标。

**返回值:** 当前激活的渲染目标。若当前未设置渲染目标,则返回 `null`。

### .getSize( target : Vector2 ) : Vector2

以逻辑像素为单位返回渲染器尺寸。该方法不考虑像素比。

**target**

方法会把结果写入该目标对象。

**返回值:** 渲染器的逻辑像素尺寸。

### .getViewport( target : Vector4 ) : Vector4

返回视口(viewport)定义。

**target**

方法会把结果写入该目标对象。

**返回值:** 视口定义。

### .initTexture( texture : Texture )

初始化给定纹理。用于预加载纹理,而不必等到首次渲染时才上传(首次上传会因解码与 GPU 上传开销造成明显卡顿)。

**texture**

纹理。

### .readRenderTargetPixels( renderTarget : WebGLRenderTarget, x : number, y : number, width : number, height : number, buffer : TypedArray, activeCubeFaceIndex : number, textureIndex : number )

从给定渲染目标读取像素数据到给定缓冲区。

**renderTarget**

要读取的渲染目标。

**x**

复制区域起点的 `x` 坐标。

**y**

复制区域起点的 `y` 坐标。

**width**

复制区域的宽度。

**height**

复制区域的高度。

**buffer**

结果缓冲区。

**activeCubeFaceIndex**

激活的立方体面索引。

**textureIndex**

MRT 渲染目标的纹理索引。

默认值为 `0`。

### .readRenderTargetPixelsAsync( renderTarget : WebGLRenderTarget, x : number, y : number, width : number, height : number, buffer : TypedArray, activeCubeFaceIndex : number, textureIndex : number ) : Promise.<TypedArray> (async)

[WebGLRenderer#readRenderTargetPixels](WebGLRenderer.html#readRenderTargetPixels) 的异步、非阻塞版本。

建议尽可能使用该版本的 `readRenderTargetPixels()`。

**renderTarget**

要读取的渲染目标。

**x**

复制区域起点的 `x` 坐标。

**y**

复制区域起点的 `y` 坐标。

**width**

复制区域的宽度。

**height**

复制区域的高度。

**buffer**

结果缓冲区。

**activeCubeFaceIndex**

激活的立方体面索引。

**textureIndex**

MRT 渲染目标的纹理索引。

默认值为 `0`。

**返回值:** 一个 Promise,在读取完成时兑现,兑现值为以类型化数组表示的读取数据。

### .render( scene : Object3D, camera : Camera )

使用给定相机渲染给定场景(或其他类型的 3D 对象)。

渲染输出到此前通过 [WebGLRenderer#setRenderTarget](WebGLRenderer.html#setRenderTarget) 指定的渲染目标,或照常输出到画布。

默认情况下,渲染缓冲区会在渲染前被清空;将属性 `autoClear` 设为 `false` 可阻止该行为。若只想阻止清空某些缓冲区,可把 `autoClearColor`、`autoClearDepth` 或 `autoClearStencil` 设为 `false`。需要强制清空时,使用 [WebGLRenderer#clear](WebGLRenderer.html#clear)。

**scene**

要渲染的场景。

**camera**

相机。

### .resetState()

可用于重置内部 WebGL 状态。该方法主要用于在多个 WebGL 库之间共享同一个 WebGL 上下文的应用。

### .setAnimationLoop( callback : onAnimationCallback )

建议应用始终使用该方法定义动画循环,而不是手动使用 `requestAnimationFrame()`,以获得最佳兼容性。

**callback**

应用的动画循环。

### .setClearColor( color : Color, alpha : number )

设置清除色与透明度。

**color**

清除色。

**alpha**

清除透明度。

默认值为 `1`。

### .setPixelRatio( value : number )

设置像素比,并在必要时调整画布尺寸。

**value**

像素比。

### .setRenderTarget( renderTarget : WebGLRenderTarget, activeCubeFace : number, activeMipmapLevel : number )

设置激活的渲染目标。

**renderTarget**

要设置的渲染目标。传入 `null` 时,画布会成为激活的渲染目标。

**activeCubeFace**

使用立方体渲染目标时的激活立方体面;使用 3D 或数组渲染目标时,指示要渲染写入的 z 层。

默认值为 `0`。

**activeMipmapLevel**

激活的 mipmap 级别。

默认值为 `0`。

### .setSize( width : number, height : number, updateStyle : boolean )

把输出画布调整为 (width, height),同时考虑设备像素比,并将视口设为匹配该尺寸、起点为 (0, 0)。把 `updateStyle` 设为 `false` 可避免对输出画布做任何样式修改。

**width**

逻辑像素宽度。

**height**

逻辑像素高度。

**updateStyle**

是否更新画布的 `style` 属性。

默认值为 `true`。

### .setViewport( x : number | Vector4, y : number, width : number, height : number )

设置视口,渲染范围从 `(x, y)` 到 `(x + width, y + height)`。

**x**

视口起点左下角的水平坐标,单位为逻辑像素;也可以传入一个四分量向量,一次性给出视口的全部参数。

**y**

视口起点左下角的垂直坐标,单位为逻辑像素。

**width**

视口宽度,单位为逻辑像素。

**height**

视口高度,单位为逻辑像素。

## 源码

[src/renderers/WebGLRenderer.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js)
