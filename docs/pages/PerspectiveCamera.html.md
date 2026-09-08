> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher → Object3D → Camera →*

# PerspectiveCamera(透视相机)

使用[透视投影](https://en.wikipedia.org/wiki/Perspective_\(graphical\))的相机。

这种投影模式用于模拟人眼的视觉方式,是渲染 3D 场景时最常用的投影模式。

## 代码示例

```js
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
```

## 构造函数

### new PerspectiveCamera( fov : number, aspect : number, near : number, far : number )

创建一个新透视相机。

**fov**

垂直视场角。

默认值为 `50`。

**aspect**

纵横比。

默认值为 `1`。

**near**

相机的近裁剪面。

默认值为 `0.1`。

**far**

相机的远裁剪面。

默认值为 `2000`。

## 属性

### .aspect : number

纵横比,通常为画布宽度 / 画布高度。

默认值为 `1`。

### .far : number

相机的远裁剪面。必须大于 [PerspectiveCamera#near](PerspectiveCamera.html#near) 的当前值。

默认值为 `2000`。

### .filmGauge : number

用于较大轴的胶片尺寸。默认值为 `35`(毫米)。除非 [PerspectiveCamera#filmOffset](PerspectiveCamera.html#filmOffset) 被设为非零值,否则该参数不影响投影矩阵。

默认值为 `35`。

### .filmOffset : number

水平偏移量,单位与 [PerspectiveCamera#filmGauge](PerspectiveCamera.html#filmGauge) 相同。

默认值为 `0`。

### .focus : number

用于立体显示(Stereoscopy)和景深效果的对象距离。除非正在使用 [StereoCamera](StereoCamera.html),否则该参数不影响投影矩阵。

默认值为 `10`。

### .fov : number

垂直视场角,自视口底部到顶部,单位为度。

默认值为 `50`。

### .isPerspectiveCamera : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .near : number

相机的近裁剪面。有效取值范围是大于 `0` 且小于 [PerspectiveCamera#far](PerspectiveCamera.html#far) 的当前值。

注意,与 [OrthographicCamera](OrthographicCamera.html) 不同,`0` _不是_ 透视相机近裁剪面的有效取值。

默认值为 `0.1`。

### .view : Object

表示视锥体窗口规格。该属性不应直接编辑,而应通过 [PerspectiveCamera#setViewOffset](PerspectiveCamera.html#setViewOffset) 与 [PerspectiveCamera#clearViewOffset](PerspectiveCamera.html#clearViewOffset) 操作。

默认值为 `null`。

### .zoom : number

相机的缩放系数。

默认值为 `1`。

## 方法

### .clearViewOffset()

从投影矩阵中移除视图偏移。

### .getEffectiveFOV() : number

在考虑 [PerspectiveCamera#zoom](PerspectiveCamera.html#zoom) 的前提下,返回当前垂直视场角(单位:度)。

**返回值:** 有效视场角(FOV)。

### .getFilmHeight() : number

返回胶片上图像的高度。若 [PerspectiveCamera#aspect](PerspectiveCamera.html#aspect) 大于等于 1(横幅格式),结果等于 [PerspectiveCamera#filmGauge](PerspectiveCamera.html#filmGauge)。

**返回值:** 胶片宽度。

### .getFilmWidth() : number

返回胶片上图像的宽度。若 [PerspectiveCamera#aspect](PerspectiveCamera.html#aspect) 大于等于 1(横幅格式),结果等于 [PerspectiveCamera#filmGauge](PerspectiveCamera.html#filmGauge)。

**返回值:** 胶片宽度。

### .getFocalLength() : number

根据当前 [PerspectiveCamera#fov](PerspectiveCamera.html#fov) 与 [PerspectiveCamera#filmGauge](PerspectiveCamera.html#filmGauge) 返回焦距。

**返回值:** 计算得到的焦距。

### .getViewBounds( distance : number, minTarget : Vector2, maxTarget : Vector2 )

计算沿观察方向给定距离处相机可视矩形的 2D 边界。将可视矩形的左下角与右上角坐标分别写入 `minTarget` 与 `maxTarget`。

**distance**

观察距离。

**minTarget**

可视矩形的左下角坐标会写入此向量。

**maxTarget**

可视矩形的右上角坐标会写入此向量。

### .getViewSize( distance : number, target : Vector2 ) : Vector2

计算沿观察方向给定距离处相机可视矩形的宽度与高度。

**distance**

观察距离。

**target**

用于存放结果的目标向量,其中 x 为宽度,y 为高度。

**返回值:** 视口尺寸。

### .setFocalLength( focalLength : number )

依据当前 [PerspectiveCamera#filmGauge](PerspectiveCamera.html#filmGauge),通过焦距设置 FOV。

默认胶片尺寸为 35,因此可以像 35mm(全画幅)相机那样指定焦距。

**focalLength**

焦距与胶片尺寸的取值必须使用相同单位。

### .setViewOffset( fullWidth : number, fullHeight : number, x : number, y : number, width : number, height : number )

在更大的视锥体中设置偏移。可用于多窗口或多显示器/多机协同的渲染场景。

例如,假设你有一块 3x2 的显示器阵列,每台显示器分辨率为 1920x1080,按如下网格排布:

```js
+---+---+---+
  | A | B | C |
  +---+---+---+
  | D | E | F |
  +---+---+---+
```

那么对每台显示器按如下方式调用:

```js
const w = 1920;
const h = 1080;
const fullWidth = w * 3;
const fullHeight = h * 2;
// --A--
camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
// --B--
camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
// --C--
camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
// --D--
camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
// --E--
camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
// --F--
camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
```

注意,各显示器并不要求尺寸相同,也不要求排成规整的网格。

**fullWidth**

多视图布局的总宽度。

**fullHeight**

多视图布局的总高度。

**x**

子相机的水平偏移。

**y**

子相机的垂直偏移。

**width**

子相机的宽度。

**height**

子相机的高度。

### .updateProjectionMatrix()

更新相机的投影矩阵。相机属性发生任何变化之后都必须调用该方法。

## 源码

[src/cameras/PerspectiveCamera.js](https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js)
