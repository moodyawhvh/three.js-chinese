> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher → Object3D →*

# Group(组)

该类与 [Object3D](Object3D.html) 几乎完全相同,其目的是让"成组操作对象"在语法上更加清晰直观。

## 代码示例

```js
// 创建一个组,并把两个立方体加入其中。
// 此后这两个立方体便可作为一个整体进行旋转 / 缩放等操作。
const group = new THREE.Group();
group.add( meshA );
group.add( meshB );
scene.add( group );
```

## 构造函数

### new Group()

## 属性

### .isGroup : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

## 源码

[src/objects/Group.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Group.js)
