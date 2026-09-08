> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher →*

# Object3D(3D 对象)

这是 three.js 中大多数对象的基类,提供了一整套在 3D 空间中操作对象的属性与方法。

> 📝 本页原文超过 10000 字符,以下翻译核心章节(概述、构造函数、全部常用属性与常用方法);渲染回调(`onBeforeRender` / `onAfterRender` / `onBeforeShadow` / `onAfterShadow`)、`Events` 事件小节及个别次要方法请参阅[英文原版](https://github.com/mrdoob/three.js/blob/master/docs/pages/Object3D.html.md)。

## 构造函数

### new Object3D()

创建一个新 3D 对象。

## 属性

### .animations : Array.<AnimationClip>

保存该 3D 对象动画剪辑(AnimationClip)的数组。

### .castShadow : boolean

设为 `true` 时,该 3D 对象会被渲染进阴影贴图。

默认值为 `false`。

### .children : Array.<Object3D>

保存该实例所有子 3D 对象的数组。

### .customDepthMaterial : Material | undefined

渲染深度贴图时使用的自定义深度材质。只能用于网格(Mesh)类对象。使用 [DirectionalLight](DirectionalLight.html) 或 [SpotLight](SpotLight.html) 投射阴影时,如果你在顶点着色器中修改了顶点位置,必须指定自定义深度材质才能获得正确的阴影。

仅在 [WebGLRenderer](WebGLRenderer.html) 上下文中有效。

默认值为 `undefined`。

### .customDistanceMaterial : Material | undefined

与 [Object3D#customDepthMaterial](Object3D.html#customDepthMaterial) 相同,但用于 [PointLight](PointLight.html)。

仅在 [WebGLRenderer](WebGLRenderer.html) 上下文中有效。

默认值为 `undefined`。

### .frustumCulled : boolean

设为 `true` 时,该 3D 对象会参与视锥体裁剪(frustum culling)。

默认值为 `true`。

### .id : number (只读)

该 3D 对象的 ID。

### .isObject3D : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .layers : Layers

该 3D 对象的层级(Layers)归属。只有当对象与当前使用的相机至少共享一个层级时,对象才可见。该属性也可用于在使用 [Raycaster](Raycaster.html) 进行光线相交测试时过滤掉不需要的对象。

### .matrix : Matrix4

表示对象在局部空间中的变换矩阵。

### .matrixAutoUpdate : boolean

设为 `true` 时,引擎每帧都会根据 position、rotation、scale 自动计算局部矩阵。设为 `false` 时,应用需自行调用 `updateMatrix()` 重新计算局部矩阵。

所有 3D 对象的默认值由 `Object3D.DEFAULT_MATRIX_AUTO_UPDATE` 定义。

默认值为 `true`。

### .matrixWorld : Matrix4

表示对象在世界空间中的变换矩阵。若该 3D 对象没有父对象,则与局部变换矩阵相同。

### .matrixWorldAutoUpdate : boolean

设为 `true` 时,引擎会根据当前局部矩阵和对象的变换层级自动计算世界矩阵。设为 `false` 时,应用需负责直接更新 `matrixWorld` 属性来重算世界矩阵。

所有 3D 对象的默认值由 `Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE` 定义。

默认值为 `true`。

### .matrixWorldNeedsUpdate : boolean

设为 `true` 时,会在该帧计算世界矩阵,随后该属性被重置为 `false`。

默认值为 `false`。

### .modelViewMatrix : Matrix4

表示对象的模型-视图矩阵。

### .name : string

该 3D 对象的名称。

### .normalMatrix : Matrix3

表示对象的法线矩阵。

### .parent : Object3D

父对象的引用。

默认值为 `null`。

### .pivot : Vector3

旋转与缩放变换的轴心点。设置后,旋转和缩放将围绕该点而非对象原点进行。

默认值为 `null`。

### .position : Vector3

表示对象的局部位置。

默认值为 `(0,0,0)`。

### .quaternion : Quaternion

以四元数表示对象的局部旋转。

### .receiveShadow : boolean

设为 `true` 时,该 3D 对象会受场景中阴影的影响。

默认值为 `false`。

### .renderOrder : number

该值允许覆盖场景图对象的默认渲染顺序,不过不透明对象与透明对象仍各自独立排序。当为 [Group](Group.html) 实例设置该属性时,其所有后代对象会被一起排序、一起渲染。排序按渲染顺序从低到高进行。

默认值为 `0`。

### .rotation : Euler

以欧拉角(弧度)表示对象的局部旋转。

默认值为 `(0,0,0)`。

### .scale : Vector3

表示对象的局部缩放。

默认值为 `(1,1,1)`。

### .static : boolean

该 3D 对象是否视为静态对象。设为 `true` 表示该对象在初始渲染后不会发生变化,几何体与材质设置亦包括在内。静态 3D 对象可被渲染器略微加速处理,因为可以跳过某些状态检查。

仅在 [WebGPURenderer](WebGPURenderer.html) 上下文中有效。

默认值为 `false`。

### .type : string (只读)

`type` 属性用于在序列化/反序列化场景中识别对象类型。

### .up : Vector3

定义 3D 对象的 `up`(上方)方向,会影响 [Object3D#lookAt](Object3D.html#lookAt) 等方法产生的朝向。

所有 3D 对象的默认值由 `Object3D.DEFAULT_UP` 定义。

### .userData : Object

可用于存储该 3D 对象自定义数据的对象。不应在其中保存函数引用,因为函数不会被克隆。

### .uuid : string (只读)

该 3D 对象的 UUID。

### .visible : boolean

设为 `true` 时,该 3D 对象会被渲染。

默认值为 `true`。

### .DEFAULT_MATRIX_AUTO_UPDATE : boolean

新建 3D 对象时 [Object3D#matrixAutoUpdate](Object3D.html#matrixAutoUpdate) 的默认设置。

默认值为 `true`。

### .DEFAULT_MATRIX_WORLD_AUTO_UPDATE : boolean

新建 3D 对象时 [Object3D#matrixWorldAutoUpdate](Object3D.html#matrixWorldAutoUpdate) 的默认设置。

默认值为 `true`。

### .DEFAULT_UP : Vector3

对象的默认上方方向,同时用作 [DirectionalLight](DirectionalLight.html) 与 [HemisphereLight](HemisphereLight.html) 的默认位置。

默认值为 `(0,1,0)`。

## 方法

### .add( object : Object3D ) : Object3D

将给定的 3D 对象作为子对象添加到该 3D 对象。可以添加任意数量的对象。传入对象的现有父级会被移除,因为一个对象最多只能有一个父级。

**object**

要添加的 3D 对象。

**返回值:** 该实例的引用。

### .attach( object : Object3D ) : Object3D

将给定的 3D 对象添加为该 3D 对象的子对象,同时保持该对象的世界变换不变。该方法不支持含有非均匀缩放节点的场景图。

**object**

要挂载的 3D 对象。

**返回值:** 该实例的引用。

### .clear() : Object3D

移除所有子对象。

**返回值:** 该实例的引用。

### .clone( recursive : boolean ) : Object3D

返回一个复制了该实例取值的新 3D 对象。

**recursive**

设为 `true` 时,同时克隆该 3D 对象的所有后代。

默认值为 `true`。

**返回值:** 该实例的克隆。

### .copy( source : Object3D, recursive : boolean ) : Object3D

将给定 3D 对象的取值复制到该实例。

**source**

要复制的 3D 对象。

**recursive**

设为 `true` 时,同时克隆该 3D 对象的后代。

默认值为 `true`。

**返回值:** 该实例的引用。

### .getObjectById( id : number ) : Object3D | undefined

从该 3D 对象自身开始,遍历它及其子级,返回第一个 ID 匹配的对象。

**id**

ID。

**返回值:** 找到的 3D 对象。未找到时返回 `undefined`。

### .getObjectByName( name : string ) : Object3D | undefined

从该 3D 对象自身开始,遍历它及其子级,返回第一个名称匹配的对象。

**name**

名称。

**返回值:** 找到的 3D 对象。未找到时返回 `undefined`。

### .getObjectByProperty( name : string, value : any ) : Object3D | undefined

从该 3D 对象自身开始,遍历它及其子级,返回第一个指定属性值匹配的对象。

**name**

属性名。

**value**

属性值。

**返回值:** 找到的 3D 对象。未找到时返回 `undefined`。

### .getWorldDirection( target : Vector3 ) : Vector3

返回一个表示该 3D 对象在世界空间中("观察")方向的向量。

**target**

存放结果的目标向量。

**返回值:** 该 3D 对象在世界空间中的方向。

### .getWorldPosition( target : Vector3 ) : Vector3

返回一个表示该 3D 对象在世界空间中位置的向量。

**target**

存放结果的目标向量。

**返回值:** 该 3D 对象在世界空间中的位置。

### .getWorldQuaternion( target : Quaternion ) : Quaternion

返回一个表示该 3D 对象在世界空间中旋转的四元数。

**target**

存放结果的目标四元数。

**返回值:** 该 3D 对象在世界空间中的旋转。

### .getWorldScale( target : Vector3 ) : Vector3

返回一个表示该 3D 对象在世界空间中缩放的向量。

**target**

存放结果的目标向量。

**返回值:** 该 3D 对象在世界空间中的缩放。

### .localToWorld( vector : Vector3 ) : Vector3

把给定向量从该 3D 对象的局部空间转换到世界空间。

**vector**

要转换的向量。

**返回值:** 转换后的向量。

### .lookAt( x : number | Vector3, y : number, z : number )

旋转对象使其朝向世界空间中的一个点。

该方法不支持父级存在非均匀缩放的对象。

**x**

世界空间中的 x 坐标;也可以传入一个表示世界空间位置的向量。

**y**

世界空间中的 y 坐标。

**z**

世界空间中的 z 坐标。

### .raycast( raycaster : Raycaster, intersects : Array.<Object> ) (抽象方法)

抽象方法,用于求取投射光线与该 3D 对象之间的交点。可渲染的 3D 对象(如 [Mesh](Mesh.html)、[Line](Line.html)、[Points](Points.html))都会实现该方法以支持光线投射。

**raycaster**

光线投射器。

**intersects**

存放方法结果的数组。

### .remove( object : Object3D ) : Object3D

将给定的 3D 对象从该 3D 对象的子级中移除。可以移除任意数量的对象。

**object**

要移除的 3D 对象。

**返回值:** 该实例的引用。

### .removeFromParent() : Object3D

将该 3D 对象从其当前父级中移除。

**返回值:** 该实例的引用。

### .rotateOnAxis( axis : Vector3, angle : number ) : Object3D

使 3D 对象沿局部空间中的某个轴旋转。

**axis**

(已归一化的)轴向量。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateOnWorldAxis( axis : Vector3, angle : number ) : Object3D

使 3D 对象沿世界空间中的某个轴旋转。

**axis**

(已归一化的)轴向量。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateX( angle : number ) : Object3D

使 3D 对象绕局部空间的 X 轴旋转。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateY( angle : number ) : Object3D

使 3D 对象绕局部空间的 Y 轴旋转。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateZ( angle : number ) : Object3D

使 3D 对象绕局部空间的 Z 轴旋转。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .setRotationFromAxisAngle( axis : Vector3, angle : number )

以"轴-角"形式给定的旋转设置到该 3D 对象。

**axis**

(已归一化的)轴向量。

**angle**

角度,单位为弧度。

### .setRotationFromEuler( euler : Euler )

以欧拉角形式给定的旋转设置到该 3D 对象。

**euler**

欧拉角。

### .setRotationFromQuaternion( q : Quaternion )

以四元数形式给定的旋转设置到该 3D 对象。

**q**

四元数。

### .translateOnAxis( axis : Vector3, distance : number ) : Object3D

使 3D 对象沿局部空间中给定轴平移指定距离。

**axis**

(已归一化的)轴向量。

**distance**

距离,单位为世界坐标单位。

**返回值:** 该实例的引用。

### .translateX( distance : number ) : Object3D

使 3D 对象沿局部空间的 X 轴平移指定距离。

**distance**

距离,单位为世界坐标单位。

**返回值:** 该实例的引用。

### .translateY( distance : number ) : Object3D

使 3D 对象沿局部空间的 Y 轴平移指定距离。

**distance**

距离,单位为世界坐标单位。

**返回值:** 该实例的引用。

### .translateZ( distance : number ) : Object3D

使 3D 对象沿局部空间的 Z 轴平移指定距离。

**distance**

距离,单位为世界坐标单位。

**返回值:** 该实例的引用。

### .traverse( callback : function )

对该 3D 对象及其所有后代执行回调。

注意:不建议在回调内部修改场景图。

**callback**

用于处理当前 3D 对象的回调函数。

### .traverseVisible( callback : function )

与 [Object3D#traverse](Object3D.html#traverse) 类似,但回调只对可见的 3D 对象执行。不可见 3D 对象的后代不会被遍历。

注意:不建议在回调内部修改场景图。

**callback**

用于处理当前 3D 对象的回调函数。

### .updateMatrix()

根据当前的 position、rotation、scale 值重新计算并更新局部空间的变换矩阵。

### .updateMatrixWorld( force : boolean )

更新该 3D 对象及其后代的局部与世界变换矩阵。

为确保结果正确,该方法还会重算该 3D 对象的局部变换矩阵。局部矩阵与世界矩阵的计算可通过 [Object3D#matrixAutoUpdate](Object3D.html#matrixAutoUpdate) 与 [Object3D#matrixWorldAutoUpdate](Object3D.html#matrixWorldAutoUpdate) 两个标志控制,二者默认均为 `true`。若需要对矩阵更新过程做更精细的控制,可将它们设为 `false`。

**force**

设为 `true` 时,即使 [Object3D#matrixWorldNeedsUpdate](Object3D.html#matrixWorldNeedsUpdate) 为 `false`,也强制重算世界矩阵。

默认值为 `false`。

### .updateWorldMatrix( updateParents : boolean, updateChildren : boolean, force : boolean )

[Object3D#updateMatrixWorld](Object3D.html#updateMatrixWorld) 的替代版本,可对祖先与后代节点的更新做更细粒度的控制。

**updateParents**

是否更新祖先节点。

默认值为 `false`。

**updateChildren**

是否更新后代节点。

默认值为 `false`。

**force**

设为 `true` 时,即使 [Object3D#matrixWorldNeedsUpdate](Object3D.html#matrixWorldNeedsUpdate) 为 `false`,也强制重算世界矩阵。

默认值为 `false`。

### .worldToLocal( vector : Vector3 ) : Vector3

把给定向量从该 3D 对象的世界空间转换到局部空间。

**vector**

要转换的向量。

**返回值:** 转换后的向量。

## 源码

[src/core/Object3D.js](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js)
