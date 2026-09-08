> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher →*

# BufferGeometry(缓冲几何体)

网格(Mesh)、线条(Line)或点(Points)几何体的表示形式。它把顶点位置、面索引、法线、颜色、UV 以及自定义属性都放进缓冲区(buffer)中,从而降低把这些数据传给 GPU 的开销。

> 📝 本页原文超过 10000 字符,以下翻译核心章节;WebGPU 间接绘制相关内容(`.indirect`、`.indirectOffset`、`getIndirect()`、`setIndirect()`)与次要方法(`toJSON()`、`toNonIndexed()`、`computeTangents()`、`normalizeNormals()`)请参阅[英文原版](https://github.com/mrdoob/three.js/blob/master/docs/pages/BufferGeometry.html.md)。

## 代码示例

```js
const geometry = new THREE.BufferGeometry();
// 创建一个简单的正方形。我们复制了左上角和右下角的顶点,
// 因为每个顶点在每个三角形中都需要出现一次。
const vertices = new Float32Array( [
	-1.0, -1.0,  1.0, // v0
	 1.0, -1.0,  1.0, // v1
	 1.0,  1.0,  1.0, // v2
	 1.0,  1.0,  1.0, // v3
	-1.0,  1.0,  1.0, // v4
	-1.0, -1.0,  1.0  // v5
] );
// itemSize = 3,因为每个顶点有 3 个值(分量)
geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const mesh = new THREE.Mesh( geometry, material );
```

## 构造函数

### new BufferGeometry()

创建一个新几何体。

## 属性

### .attributes : Object.<string, (BufferAttribute|InterleavedBufferAttribute)>

该字典以要设置的属性名为键,以对应的缓冲区属性为值。请使用 `setAttribute()` 与 `getAttribute()` 访问该几何体的属性,不要直接操作此属性。

### .boundingBox : Box3

几何体的包围盒,可通过 `computeBoundingBox()` 计算。

默认值为 `null`。

### .boundingSphere : Sphere

几何体的包围球,可通过 `computeBoundingSphere()` 计算。

默认值为 `null`。

### .drawRange : Object

决定渲染几何体的哪个部分。不应直接设置,请使用 `setDrawRange()`。

### .groups : Array.<Object>

把几何体拆分成多个组(group),每组会在单独一次绘制调用(draw call)中渲染。这使几何体可以使用材质数组。

请使用 `addGroup()` 与 `clearGroups()` 编辑分组,不要直接修改该数组。

每个顶点和索引必须恰好属于一个组——组之间不得共享顶点或索引,也不得遗留未被使用的顶点或索引。

### .id : number (只读)

该几何体的 ID。

### .index : BufferAttribute

允许顶点在多个三角形之间复用,即所谓"索引三角形"(indexed triangles)。每个三角形关联三个顶点的索引,因此该属性为每个三角面存储其各顶点的索引。若未设置该属性,渲染器会假定每三个连续的位置数据构成一个三角形。

默认值为 `null`。

### .isBufferGeometry : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .morphAttributes : Object

保存该几何体变形目标(morph targets)的字典。

注意:几何体一旦被渲染过,其变形属性数据便不可再修改。必须调用 `dispose()` 并创建新的几何体实例。

### .morphTargetsRelative : boolean

用于控制变形目标的行为;设为 `true` 时,变形目标数据被视为相对偏移量,而非绝对位置/法线。

默认值为 `false`。

### .name : string

该几何体的名称。

### .userData : Object

可用于存储该几何体自定义数据的对象。不应在其中保存函数引用,因为函数不会被克隆。

### .uuid : string (只读)

该几何体的 UUID。

## 方法

### .addGroup( start : number, count : number, materialIndex : number )

向该几何体添加一个组。

**start**

该次绘制调用的第一个元素。对非索引几何体是第一个顶点,否则是第一个三角形索引。

**count**

指定该组包含多少个顶点(或索引)。

**materialIndex**

要使用的材质数组索引。

默认值为 `0`。

### .applyMatrix4( matrix : Matrix4 ) : BufferGeometry

将给定的 4x4 变换矩阵应用到该几何体。

**matrix**

要应用的矩阵。

**返回值:** 该实例的引用。

### .applyQuaternion( q : Quaternion ) : BufferGeometry

将四元数表示的旋转应用到该几何体。

**q**

要应用的四元数。

**返回值:** 该实例的引用。

### .center() : BufferGeometry

基于包围盒将几何体居中。

**返回值:** 该实例的引用。

### .clearGroups()

清空所有组。

### .clone() : BufferGeometry

返回一个复制了该实例取值的新几何体。

**返回值:** 该实例的克隆。

### .computeBoundingBox()

计算几何体的包围盒并更新 `boundingBox` 成员。引擎不会自动计算包围盒,必须由应用自行调用。若几何体顶点被修改,可能需要重新计算。

### .computeBoundingSphere()

计算几何体的包围球并更新 `boundingSphere` 成员。引擎会在需要时(如光线投射或视锥体裁剪)自动计算包围球。若几何体顶点被修改,可能需要重新计算。

### .computeVertexNormals()

为给定顶点数据计算顶点法线。对索引几何体,方法把每个顶点法线设为共享该顶点的各面法线的平均值;对非索引几何体,顶点不共享,方法把每个顶点法线设为其所属面的面法线。

### .copy( source : BufferGeometry ) : BufferGeometry

将给定几何体的取值复制到该实例。

**source**

要复制的几何体。

**返回值:** 该实例的引用。

### .deleteAttribute( name : string ) : BufferGeometry

删除给定名称的属性。

**name**

要删除的属性名。

**返回值:** 该实例的引用。

### .dispose()

释放该实例分配的 GPU 相关资源。当应用中不再使用该实例时,应调用此方法。

**触发事件:**

*   BufferGeometry#event:dispose

### .getAttribute( name : string ) : BufferAttribute | InterleavedBufferAttribute | undefined

返回给定名称的缓冲区属性。

**name**

属性名。

**返回值:** 缓冲区属性。未找到时返回 `undefined`。

### .getIndex() : BufferAttribute

返回该几何体的索引。

**返回值:** 索引。若未定义索引则返回 `null`。

### .hasAttribute( name : string ) : boolean

若该几何体存在给定名称的属性则返回 `true`。

**name**

属性名。

**返回值:** 该几何体是否存在给定名称的属性。

### .lookAt( vector : Vector3 ) : BufferGeometry

旋转几何体使其朝向 3D 空间中的某个点。这通常是一次性操作,不应在循环中反复调用。常规的实时网格旋转请使用 [Object3D#lookAt](Object3D.html#lookAt)。

**vector**

目标点。

**返回值:** 该实例的引用。

### .rotateX( angle : number ) : BufferGeometry

绕 X 轴旋转几何体。这通常是一次性操作,不应在循环中反复调用。常规的实时网格旋转请使用 [Object3D#rotation](Object3D.html#rotation)。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateY( angle : number ) : BufferGeometry

绕 Y 轴旋转几何体。这通常是一次性操作,不应在循环中反复调用。常规的实时网格旋转请使用 [Object3D#rotation](Object3D.html#rotation)。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .rotateZ( angle : number ) : BufferGeometry

绕 Z 轴旋转几何体。这通常是一次性操作,不应在循环中反复调用。常规的实时网格旋转请使用 [Object3D#rotation](Object3D.html#rotation)。

**angle**

角度,单位为弧度。

**返回值:** 该实例的引用。

### .scale( x : number, y : number, z : number ) : BufferGeometry

缩放几何体。这通常是一次性操作,不应在循环中反复调用。常规的实时网格缩放请使用 [Object3D#scale](Object3D.html#scale)。

**x**

x 方向缩放。

**y**

y 方向缩放。

**z**

z 方向缩放。

**返回值:** 该实例的引用。

### .setAttribute( name : string, attribute : BufferAttribute | InterleavedBufferAttribute ) : BufferGeometry

为给定名称设置属性。

**name**

属性名。

**attribute**

要设置的属性。

**返回值:** 该实例的引用。

### .setDrawRange( start : number, count : number )

设置该几何体的绘制范围。

**start**

对非索引几何体是第一个顶点,否则是第一个三角形索引。

**count**

对非索引 BufferGeometry,`count` 是要渲染的顶点数;对索引 BufferGeometry,`count` 是要渲染的索引数。

### .setFromPoints( points : Array.<Vector2> | Array.<Vector3> ) : BufferGeometry

基于给定的点数组创建 `position` 属性,从而定义几何体。数组元素可以是 2D 或 3D 向量;使用 2D 数据时,所有顶点的 `z` 坐标被设为 `0`。

若几何体已存在 `position` 属性,顶点数据会被数组数据覆盖,且数组长度必须与顶点数一致。

**points**

点数组。

**返回值:** 该实例的引用。

### .setIndex( index : Array.<number> | BufferAttribute ) : BufferGeometry

为该几何体设置索引。

**index**

要设置的索引。

**返回值:** 该实例的引用。

### .translate( x : number, y : number, z : number ) : BufferGeometry

平移几何体。这通常是一次性操作,不应在循环中反复调用。常规的实时网格平移请使用 [Object3D#position](Object3D.html#position)。

**x**

x 方向偏移。

**y**

y 方向偏移。

**z**

z 方向偏移。

**返回值:** 该实例的引用。

## 源码

[src/core/BufferGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/core/BufferGeometry.js)
