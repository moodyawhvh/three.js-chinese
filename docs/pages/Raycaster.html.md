> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

# Raycaster(光线投射器)

该类用于辅助进行光线投射(raycasting)。光线投射最常见的用途是鼠标拾取(判断鼠标在 3D 空间中悬停在哪个对象上),此外还有诸多其他用途。

## 构造函数

### new Raycaster( origin : Vector3, direction : Vector3, near : number, far : number )

创建一个新光线投射器。

**origin**

光线的投射起点向量。

**direction**

给出光线方向的(已归一化的)方向向量。

**near**

所有返回结果都比 near 更远。near 不能为负数。

默认值为 `0`。

**far**

所有返回结果都比 far 更近。far 不能小于 near。

默认值为 `Infinity`。

## 属性

### .camera : Camera

对依赖视角的对象(如广告牌式的精灵 Sprite)进行光线投射时所使用的相机。该字段可以手动设置,也会在调用 `setFromCamera()` 时被自动设置。

默认值为 `null`。

### .far : number

所有返回结果都比 far 更近。far 不能小于 near。

默认值为 `Infinity`。

### .layers : Layers

允许在执行相交测试时选择性地忽略某些 3D 对象。下面的代码示例确保光线投射器只对第 `1` 层上的 3D 对象生效:

```js
raycaster.layers.set( 1 );
object.layers.enable( 1 );
```

### .near : number

所有返回结果都比 near 更远。near 不能为负数。

默认值为 `0`。

### .params : Object

配置光线投射行为的参数对象,其结构如下:

```js
{
	Mesh: {},
	Line: { threshold: 1 },
	LOD: {},
	Points: { threshold: 1 },
	Sprite: {}
}
```

其中 `threshold` 是光线投射器与对象求交时的精度,单位为世界坐标单位。

### .ray : Ray

用于光线投射的光线(Ray)。

## 方法

### .intersectObject( object : Object3D, recursive : boolean, intersects : Array.<Raycaster~Intersection> ) : Array.<Raycaster~Intersection>

检测光线与该对象(可含其后代)之间的所有相交情况。返回的相交结果按距离排序,最近的在最前。

在判断光线是否与对象相交时,`Raycaster` 会委托给传入 3D 对象自身的 `raycast()` 方法。这使网格(Mesh)对光线投射的响应方式可以不同于线条(Line)或点(Points)。

注意:对网格而言,面必须朝向光线起点方向才能被检测到;光线从面背面穿过产生的相交不会被检测。若要与对象的正反两面都进行求交,需要将 [Material#side](Material.html#side) 设为 `THREE.DoubleSide`。

**object**

要与光线进行求交检测的 3D 对象。

**recursive**

若设为 `true`,则同时检测所有后代对象;否则只检测该对象本身。

默认值为 `true`。

**intersects**

存放方法结果的目标数组。

默认值为 `[]`。

**返回值:** 保存相交点的数组。

### .intersectObjects( objects : Array.<Object3D>, recursive : boolean, intersects : Array.<Raycaster~Intersection> ) : Array.<Raycaster~Intersection>

检测光线与这组对象(可含其后代)之间的所有相交情况。返回的相交结果按距离排序,最近的在最前。

**objects**

要与光线进行求交检测的一组 3D 对象。

**recursive**

若设为 `true`,则同时检测所有后代对象;否则只检测对象本身。

默认值为 `true`。

**intersects**

存放方法结果的目标数组。

默认值为 `[]`。

**返回值:** 保存相交点的数组。

### .set( origin : Vector3, direction : Vector3 )

通过复制参数值,以新的起点和方向更新光线。

**origin**

光线的投射起点向量。

**direction**

给出光线方向的(已归一化的)方向向量。

### .setFromCamera( coords : Vector2, camera : Camera )

使用给定坐标与相机,为内部光线计算新的起点和方向。

**coords**

鼠标的 2D 坐标,使用归一化设备坐标(NDC)。X 与 Y 分量取值应在 `-1` 到 `1` 之间。

**camera**

光线起点所在的相机。

### .setFromXRController( controller : WebXRController ) : Raycaster

使用给定的 WebXR 控制器,为内部光线计算新的起点和方向。

**controller**

要从中复制位置与方向的控制器。

**返回值:** 该光线投射器的引用。

## 类型定义

### .Intersection

光线投射相交测试得到的相交点信息。

**distance**  
number

从光线起点到相交点的距离。

**distanceToRay**  
number

部分 3D 对象(例如 [Points](Points.html))会提供相交点到光线上最近点的距离。其他对象上该值为 `undefined`。

**point**  
[Vector3](Vector3.html)

相交点,世界坐标系。

**face**  
Object

被相交的面。

**faceIndex**  
number

面的索引。

**object**  
[Object3D](Object3D.html)

被相交的 3D 对象。

**uv**  
[Vector2](Vector2.html)

相交点处的 U,V 坐标。

**uv1**  
[Vector2](Vector2.html)

相交点处的第二组 U,V 坐标。

**normal**  
[Vector3](Vector3.html)

相交点处插值得到的法向量。

**instanceId**  
number

光线与 [InstancedMesh](InstancedMesh.html) 相交所命中的实例索引号。

## 源码

[src/core/Raycaster.js](https://github.com/mrdoob/three.js/blob/master/src/core/Raycaster.js)
