> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

# AnimationMixer(动画混合器)

`AnimationMixer` 是针对场景中某个特定对象的动画播放器。当场景中的多个对象需要各自独立地播放动画时,可以为每个对象各使用一个 `AnimationMixer`。

## 构造函数

### new AnimationMixer( root : Object3D )

创建一个新动画混合器。

**root**

要由该混合器播放其动画的对象。

## 属性

### .time : number

混合器的全局时间(单位:秒;混合器创建时从 `0` 开始计)。

默认值为 `0`。

### .timeScale : number

全局时间的缩放系数。

注意:把该成员设为 `0`,之后再恢复为 `1`,即可实现暂停/恢复该混合器控制的所有动作(action)。

默认值为 `1`。

## 方法

### .clipAction( clip : AnimationClip | string, optionalRoot : Object3D, blendMode : NormalAnimationBlendMode | AdditiveAnimationBlendMode ) : AnimationAction

返回传入动画剪辑(clip)对应的 [AnimationAction](AnimationAction.html) 实例。

如果与该剪辑和根对象参数匹配的动作尚不存在,该方法会自动创建。用相同的剪辑与根对象参数多次调用该方法,始终返回同一个动作。

**clip**

动画剪辑,或动画剪辑的名称。

**optionalRoot**

替代用的根对象。

**blendMode**

混合模式。

**返回值:** 动画动作。

### .existingAction( clip : AnimationClip | string, optionalRoot : Object3D ) : AnimationAction

返回传入剪辑对应的既有动画动作。

**clip**

动画剪辑,或动画剪辑的名称。

**optionalRoot**

替代用的根对象。

**返回值:** 动画动作。若未找到对应动作则返回 `null`。

### .getRoot() : Object3D

返回该混合器的根对象。

**返回值:** 混合器的根对象。

### .setTime( time : number ) : AnimationMixer

将混合器的全局时间设为指定时刻,并相应地更新动画。

当你需要跳转到动画中的精确时刻时,该方法非常有用。输入参数会乘以 [AnimationMixer#timeScale](AnimationMixer.html#timeScale) 进行缩放。

**time**

要设置的时间,单位为秒。

**返回值:** 该动画混合器的引用。

### .stopAllAction() : AnimationMixer

停用该混合器上此前调度的所有动作。

**返回值:** 该动画混合器的引用。

### .uncacheAction( clip : AnimationClip | string, optionalRoot : Object3D )

释放某个动作占用的全部内存资源。该动作由给定的剪辑与可选的根对象标识。使用该方法前,请确保先调用 [AnimationAction#stop](AnimationAction.html#stop) 将该动作停用。

**clip**

动画剪辑,或动画剪辑的名称。

**optionalRoot**

替代用的根对象。

### .uncacheClip( clip : AnimationClip )

释放某个剪辑占用的全部内存资源。使用该方法前,请确保先对所有相关动作调用 [AnimationAction#stop](AnimationAction.html#stop)。

**clip**

要解除缓存的剪辑。

### .uncacheRoot( root : Object3D )

释放某个根对象占用的全部内存资源。使用该方法前,请确保先对所有相关动作调用 [AnimationAction#stop](AnimationAction.html#stop);若混合器只作用于单个根对象,也可以直接调用 [AnimationMixer#stopAllAction](AnimationMixer.html#stopAllAction)。

**root**

要解除缓存的根对象。

### .update( deltaTime : number ) : AnimationMixer

推进混合器的全局时间并更新动画。

这一步通常在渲染循环中完成,传入来自 [Clock](Clock.html) 或 [Timer](Timer.html) 的间隔时间。

**deltaTime**

间隔时间,单位为秒。

**返回值:** 该动画混合器的引用。

## 源码

[src/animation/AnimationMixer.js](https://github.com/mrdoob/three.js/blob/master/src/animation/AnimationMixer.js)
