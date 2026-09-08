> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher → Object3D →*

# Mesh(网格)

表示基于三角形多边形网格的对象的类。

## 代码示例

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## 构造函数

### new Mesh( geometry : BufferGeometry, material : Material | Array.<Material> )

创建一个新网格。

**geometry**

网格的几何体。

**material**

网格的材质。

## 属性

### .count : number

该网格的实例数量。只能与 [WebGPURenderer](WebGPURenderer.html) 配合使用。

默认值为 `1`。

### .geometry : BufferGeometry

网格的几何体。

### .isMesh : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .material : Material | Array.<Material>

网格的材质。

默认值为 `MeshBasicMaterial`。

### .morphTargetDictionary : Object.<string, number> | undefined

一个字典,表示几何体中的变形目标(morph targets)。键为变形目标的名称,值为其属性索引。该成员默认为 `undefined`,只有当几何体中检测到变形目标时才会被设置。

默认值为 `undefined`。

### .morphTargetInfluences : Array.<number> | undefined

一个权重数组,取值通常在 `[0,1]` 范围内,指定每个变形被应用的程度。该成员默认为 `undefined`,只有当几何体中检测到变形目标时才会被设置。

默认值为 `undefined`。

## 方法

### .getVertexPosition( index : number, target : Vector3 ) : Vector3

返回给定索引处顶点在局部空间中的位置,会同时考虑变形目标与蒙皮(skinning)的当前动画状态。

**index**

顶点索引。

**target**

用于存放方法结果的目标对象。

**返回值:** 局部空间中的顶点位置。

### .raycast( raycaster : Raycaster, intersects : Array.<Object> )

计算投射光线与该对象之间的交点。

**raycaster**

光线投射器。

**intersects**

保存交点结果的目标数组。

**重写:** [Object3D#raycast](Object3D.html#raycast)

### .updateMorphTargets()

设置 [Mesh#morphTargetDictionary](Mesh.html#morphTargetDictionary) 与 [Mesh#morphTargetInfluences](Mesh.html#morphTargetInfluences) 的值,确保既有的变形目标能够影响该 3D 对象。

## 源码

[src/objects/Mesh.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js)
