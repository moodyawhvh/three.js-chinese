> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher →*

# Material(材质)

材质的抽象基类。

材质定义了可渲染 3D 对象的外观。

> 📝 本页原文超过 10000 字符,以下翻译核心章节(概述、构造函数、常用属性与常用方法);模板缓冲(stencil)系列属性、`Events` 事件小节及 `customProgramCacheKey()`、`fromJSON()` 等次要方法请参阅[英文原版](https://github.com/mrdoob/three.js/blob/master/docs/pages/Material.html.md)。

## 构造函数

### new Material() (抽象)

创建一个新材质。

## 属性

### .allowOverride : boolean

是否允许使用 [Scene#overrideMaterial](Scene.html#overrideMaterial) 覆盖该材质。

默认值为 `true`。

### .alphaTest : number (只读)

设置执行 alpha 测试时使用的 alpha 阈值。不透明度低于该值的像素对应的材质将不会被渲染。

默认值为 `0`。

### .blending : NoBlending | NormalBlending | AdditiveBlending | SubtractiveBlending | MultiplyBlending | CustomBlending

定义材质的混合(blending)类型。

若希望 [Material#blendSrc](Material.html#blendSrc)、[Material#blendDst](Material.html#blendDst)、[Material#blendEquation](Material.html#blendEquation) 等自定义混合属性生效,必须将其设为 `CustomBlending`。

默认值为 `NormalBlending`。

### .blendDst : 混合因子枚举(见英文原版)

定义混合目标因子。

默认值为 `OneMinusSrcAlphaFactor`。

### .blendEquation : AddEquation | SubtractEquation | ReverseSubtractEquation | MinEquation | MaxEquation

定义混合方程。

默认值为 `AddEquation`。

### .blendSrc : 混合因子枚举(见英文原版)

定义混合源因子。

默认值为 `SrcAlphaFactor`。

### .clipIntersection : boolean

改变裁剪平面的行为:只裁剪各平面的交集,而非并集。

默认值为 `false`。

### .clipShadows : boolean

定义是否按该材质上指定的裁剪平面来裁剪阴影。

默认值为 `false`。

### .clippingPlanes : Array.<Plane>

用户自定义裁剪平面,以 THREE.Plane 对象、世界坐标指定。这些平面作用于挂载该材质的对象。空间中到平面的有符号距离为负的点会被裁掉(不渲染)。使用该功能需要 [WebGLRenderer#localClippingEnabled](WebGLRenderer.html#localClippingEnabled) 为 `true`。

默认值为 `null`。

### .colorWrite : boolean

是否渲染该材质的颜色。

可与 Object3D#renderOrder 结合使用,创建能够遮挡其他对象的不可见物体。

默认值为 `true`。

### .depthFunc : NeverDepth | AlwaysDepth | LessDepth | LessEqualDepth | EqualDepth | GreaterEqualDepth | GreaterDepth | NotEqualDepth

定义深度测试函数。

默认值为 `LessEqualDepth`。

### .depthTest : boolean

渲染该材质时是否启用深度测试。深度测试被禁用时,深度写入也会被一并隐式禁用。

默认值为 `true`。

### .depthWrite : boolean

渲染该材质时是否写入深度缓冲区。

绘制 2D 叠加层时,关闭深度写入往往很有用,可以把多层内容叠在一起而不产生 z-index 伪影。

默认值为 `true`。

### .dithering : boolean

是否对颜色应用抖动(dithering)以消除色带(banding)现象。

默认值为 `false`。

### .forceSinglePass : boolean

双面透明对象是否应以单通道(pass)渲染。

引擎默认用两次绘制调用渲染双面透明对象(先背面后正面)以缓解透明伪影。但在某些场景下这种做法不会带来质量提升,反而让绘制调用翻倍,例如渲染草丛精灵之类的平面植被。此时可将 `forceSinglePass` 设为 `true`,禁用双通道渲染以避免性能问题。

默认值为 `false`。

### .id : number (只读)

该材质的 ID。

### .isMaterial : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .name : string

该材质的名称。

### .needsUpdate : boolean

将该属性设为 `true` 表示材质需要重新编译。

默认值为 `false`。

### .opacity : number

定义材质的透明程度。`0.0` 表示完全透明,`1.0` 表示完全不透明。

若 [Material#transparent](Material.html#transparent) 未设为 `true`,材质会保持完全不透明,该值只影响其颜色。

默认值为 `1`。

### .polygonOffset : boolean

是否使用多边形偏移(polygon offset)。启用后,每个片元的深度值会在从相应顶点深度插值之后被偏移。该偏移在执行深度测试之前、写入深度缓冲区之前生效。

可用于渲染隐藏线图像、在表面贴花(decal)、渲染带高亮边的实体等场景。

默认值为 `false`。

### .polygonOffsetFactor : number

指定一个缩放因子,用于为每个多边形生成可变的深度偏移。

默认值为 `0`。

### .polygonOffsetUnits : number

乘以一个实现相关的值,生成恒定的深度偏移。

默认值为 `0`。

### .precision : 'highp' | 'mediump' | 'lowp'

为该材质覆盖渲染器的默认着色器精度。

默认值为 `null`。

### .premultipliedAlpha : boolean

是否预乘 alpha(透明度)值。

默认值为 `false`。

### .shadowSide : FrontSide | BackSide | DoubleSide

定义面的哪一侧投射阴影。若为 `null`,投射阴影的一侧按如下规则确定:

*   当 [Material#side](Material.html#side) 为 `FrontSide` 时,由背面投射阴影。
*   当 [Material#side](Material.html#side) 为 `BackSide` 时,由正面投射阴影。
*   当 [Material#side](Material.html#side) 为 `DoubleSide` 时,两侧都投射阴影。

默认值为 `null`。

### .side : FrontSide | BackSide | DoubleSide

定义渲染面的哪一侧——正面、背面或两者。

默认值为 `FrontSide`。

### .toneMapped : boolean

定义该材质是否按渲染器的色调映射设置进行色调映射。

渲染到渲染目标、使用后期处理或使用 `WebGPURenderer` 时该属性被忽略;在以上情形中,所有材质都会参与色调映射。

默认值为 `true`。

### .transparent : boolean

定义该材质是否透明。这会影响渲染流程,因为透明对象需要特殊处理,且会在不透明对象之后渲染。

设为 `true` 时,材质的透明程度由 [Material#opacity](Material.html#opacity) 控制。

默认值为 `false`。

### .type : string (只读)

`type` 属性用于在序列化/反序列化场景中识别对象类型。

### .userData : Object

可用于存储该材质自定义数据的对象。不应在其中保存函数引用,因为函数不会被克隆。

### .uuid : string (只读)

该材质的 UUID。

### .version : number (只读)

从 `0` 开始,记录 [Material#needsUpdate](Material.html#needsUpdate) 被设为 `true` 的次数。

默认值为 `0`。

### .vertexColors : boolean

设为 `true` 时,使用顶点颜色。

引擎同时支持 RGB 与 RGBA 顶点颜色,取决于使用三分量(RGB)还是四分量(RGBA)的颜色缓冲区属性。

默认值为 `false`。

### .visible : boolean

定义使用该材质的 3D 对象是否可见。

默认值为 `true`。

## 方法

### .clone() : Material

返回一个复制了该实例取值的新材质。

**返回值:** 该实例的克隆。

### .copy( source : Material ) : Material

将给定材质的取值复制到该实例。

**source**

要复制的材质。

**返回值:** 该实例的引用。

### .dispose()

释放该实例分配的 GPU 相关资源。当应用中不再使用该实例时,应调用此方法。

**触发事件:**

*   [Material#event:dispose](Material.html#event:dispose)

### .onBeforeCompile( shaderobject : Object, renderer : WebGLRenderer )

可选回调,在着色器程序编译前一刻执行。函数会收到着色器源码作为参数,适合用来修改内置材质。

该方法只能在 [WebGLRenderer](WebGLRenderer.html) 渲染时使用。定制材质的推荐做法是改用 `WebGPURenderer` 配合新的 Node Material 体系与 [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language)。

**shaderobject**

保存 uniforms 以及顶点、片元着色器源码的对象。

**renderer**

渲染器的引用。

### .setValues( values : Object )

可用于从参数对象设置默认值。这是一个通用实现,可用于不同类型的材质。

**values**

要设置的材质取值。

### .toJSON( meta : Object | string ) : Object

将材质序列化为 JSON。

**meta**

可选,保存序列化元信息的值。

参见:

*   [ObjectLoader#parse](ObjectLoader.html#parse)

**返回值:** 表示序列化后材质的 JSON 对象。

## 源码

[src/materials/Material.js](https://github.com/mrdoob/three.js/blob/master/src/materials/Material.js)
